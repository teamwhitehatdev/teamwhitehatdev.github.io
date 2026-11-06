import { isUserAdminOrDeveloper } from './adminAuth';

export interface VerifiedBuyerRecord {
  id: string;
  email: string;
  name: string;
  purchasedService: string;
  servicePackage?: string;
  accessKey: string;
  status: 'ACTIVE' | 'REVOKED';
  createdAt: string;
  purchasedAt?: string;
  lastAccessedAt?: string;
}

export type VerifiedServiceBuyer = VerifiedBuyerRecord;

const BUYERS_STORAGE_KEY = 'wh_verified_buyers_v5790';
const ACTIVE_BUYER_SESSION_KEY = 'wh_active_buyer_session_v5790';
export const MASTER_VIP_PASSKEY = 'WHITEHAT-VIP-2026';

function generateBuyerAccessKey(email: string): string {
  const clean = email.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const code = Math.abs(hash).toString(36).toUpperCase().slice(0, 5).padEnd(5, '9');
  return `VIP-${code}`;
}

export function getAllVerifiedBuyers(): VerifiedBuyerRecord[] {
  try {
    const raw = localStorage.getItem(BUYERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read verified buyers:', e);
  }
  return [];
}

function saveVerifiedBuyers(list: VerifiedBuyerRecord[]): void {
  try {
    localStorage.setItem(BUYERS_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('wh_buyers_updated'));
  } catch (e) {
    console.error('Failed to save verified buyers:', e);
  }
}

export function registerPurchasedServiceBuyer(
  name: string,
  email: string,
  purchasedService: string
): VerifiedBuyerRecord {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim() || 'Verified Member';
  const existingList = getAllVerifiedBuyers();
  const existingIdx = existingList.findIndex((b) => b.email.toLowerCase() === cleanEmail);

  const accessKey = generateBuyerAccessKey(cleanEmail);
  const now = new Date().toISOString();

  let record: VerifiedBuyerRecord;
  if (existingIdx !== -1) {
    record = {
      ...existingList[existingIdx],
      name: cleanName,
      purchasedService: purchasedService || existingList[existingIdx].purchasedService,
      status: 'ACTIVE',
      lastAccessedAt: now
    };
    existingList[existingIdx] = record;
  } else {
    record = {
      id: `buyer_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      email: cleanEmail,
      name: cleanName,
      purchasedService: purchasedService || 'Advanced VA & Freelancer Skill Mastery Package',
      accessKey,
      status: 'ACTIVE',
      createdAt: now,
      lastAccessedAt: now
    };
    existingList.unshift(record);
  }

  saveVerifiedBuyers(existingList);
  setActiveBuyerSession(record.email, record.accessKey);
  return record;
}

export function setActiveBuyerSession(email: string, accessKey?: string): void {
  try {
    const payload = JSON.stringify({
      email: email.trim().toLowerCase(),
      accessKey: (accessKey || '').trim().toUpperCase(),
      timestamp: Date.now()
    });
    sessionStorage.setItem(ACTIVE_BUYER_SESSION_KEY, payload);
    localStorage.setItem(ACTIVE_BUYER_SESSION_KEY, payload);
    window.dispatchEvent(new Event('wh_buyer_session_changed'));
  } catch (e) {
    console.error('Failed to set active buyer session:', e);
  }
}

export function clearActiveBuyerSession(): void {
  try {
    sessionStorage.removeItem(ACTIVE_BUYER_SESSION_KEY);
    localStorage.removeItem(ACTIVE_BUYER_SESSION_KEY);
    window.dispatchEvent(new Event('wh_buyer_session_changed'));
  } catch (e) {}
}

export function getActiveBuyerSession(): { email: string; accessKey: string } | null {
  try {
    const raw =
      sessionStorage.getItem(ACTIVE_BUYER_SESSION_KEY) ||
      localStorage.getItem(ACTIVE_BUYER_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.email === 'string' && parsed.email.includes('@')) {
      return {
        email: parsed.email.toLowerCase().trim(),
        accessKey: (parsed.accessKey || '').toUpperCase().trim()
      };
    }
  } catch (e) {}
  return null;
}

export function verifyBuyerAccess(
  emailInput?: string,
  accessKeyInput?: string
): {
  allowed: boolean;
  isAdminBypass?: boolean;
  buyer?: VerifiedBuyerRecord;
  reason?: string;
} {
  // 1. Admin / Developer always has full access
  if (isUserAdminOrDeveloper()) {
    return {
      allowed: true,
      isAdminBypass: true,
      buyer: {
        id: 'admin_master',
        email: 'admin@teamwhitehatdev.github.io',
        name: 'Administrator / Developer',
        purchasedService: 'All-Access Master Vault (Admin)',
        accessKey: MASTER_VIP_PASSKEY,
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      }
    };
  }

  const session = getActiveBuyerSession();
  const targetEmail = (emailInput ?? session?.email ?? '').trim().toLowerCase();
  const targetKey = (accessKeyInput ?? session?.accessKey ?? '').trim().toUpperCase();

  if (!targetEmail || !targetEmail.includes('@')) {
    return {
      allowed: false,
      reason: 'Please enter the verified email address used when purchasing or inquiring on /services.'
    };
  }

  const buyers = getAllVerifiedBuyers();
  const matchedBuyer = buyers.find((b) => b.email.toLowerCase() === targetEmail);

  if (matchedBuyer) {
    if (matchedBuyer.status === 'REVOKED') {
      return {
        allowed: false,
        reason: 'Access for this email address has been revoked by the administrator.'
      };
    }
    return {
      allowed: true,
      buyer: matchedBuyer
    };
  }

  // Also allow if the user enters a valid Email + either the deterministic VIP key for that email OR the Master VIP Passkey sent via email
  const expectedKeyForEmail = generateBuyerAccessKey(targetEmail);
  if (targetKey && (targetKey === expectedKeyForEmail || targetKey === MASTER_VIP_PASSKEY)) {
    const autoRegistered = registerPurchasedServiceBuyer(
      targetEmail.split('@')[0],
      targetEmail,
      'Verified Email Passkey Access'
    );
    return {
      allowed: true,
      buyer: autoRegistered
    };
  }

  return {
    allowed: false,
    reason:
      'This email is not registered as a verified service buyer yet. Please purchase or submit a service package order on /#/services first, or enter the VIP Passkey sent to your email.'
  };
}

export function toggleBuyerStatus(id: string): VerifiedBuyerRecord[] {
  const list = getAllVerifiedBuyers().map((b) =>
    b.id === id ? { ...b, status: (b.status === 'ACTIVE' ? 'REVOKED' : 'ACTIVE') as 'ACTIVE' | 'REVOKED' } : b
  );
  saveVerifiedBuyers(list);
  return list;
}

export function removeBuyerRecord(id: string): VerifiedBuyerRecord[] {
  const list = getAllVerifiedBuyers().filter((b) => b.id !== id);
  saveVerifiedBuyers(list);
  return list;
}

export function getExclusiveVaultDirectUrl(email: string, accessKey?: string): string {
  const cleanEmail = email.trim().toLowerCase();
  const key = accessKey || generateBuyerAccessKey(cleanEmail);
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin + window.location.pathname.replace(/\/$/, '')
      : 'https://teamwhitehatdev.github.io';
  return `${origin}/#/exclusive-skills?email=${encodeURIComponent(cleanEmail)}&key=${encodeURIComponent(key)}`;
}

export function buildBuyerEmailDispatchUrl(buyer: VerifiedBuyerRecord): string {
  const directLink = getExclusiveVaultDirectUrl(buyer.email, buyer.accessKey);
  const subject = `Your Exclusive VIP Access Link & Passkey — ${buyer.purchasedService} | Team WhiteHat Dev`;
  const body = `Hi ${buyer.name},

Thank you for purchasing / booking "${buyer.purchasedService}" with Team WhiteHat Dev!

Your email address (${buyer.email}) is now authorized to access our Exclusive VA & Freelancer Advanced Skills Mastery Vault.

==================================================
1. DIRECT EXCLUSIVE ACCESS LINK (1-CLICK LOGIN):
${directLink}

2. YOUR VERIFIED CREDENTIALS:
• Registered Email: ${buyer.email}
• VIP Access Passkey: ${buyer.accessKey}
• Backup Master Passkey: ${MASTER_VIP_PASSKEY}
==================================================

Inside the Exclusive Skills Vault (/#/exclusive-skills), you now have full access to:
• Real-Time VA & Freelancer Profit, Retainer & ROI Simulator
• 8 Advanced Mastery Curriculum Tracks (Executive Ops, Make.com/n8n AI Webhooks, Prompt Engineering, Loom Audit Client Closing, SMM Algorithm Math, Technical GEO/SEO, Shopify/CRM Ops, and Micro-Agency Scaling)
• 20+ Copy-Paste SOPs, Client Contracts, Discovery Call Scripts & Webhook JSON Blueprints

If you have any questions or want to schedule your 1-on-1 workflow review, simply reply to this email.

Best regards,
Team WhiteHat Dev
https://teamwhitehatdev.github.io`;

  return `mailto:${encodeURIComponent(buyer.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
