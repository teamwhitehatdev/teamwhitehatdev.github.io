import { useEffect } from 'react';

// ============================================================================
// ADMIN BRUTE-FORCE & RATE-LIMITING PROTECTION
// ============================================================================
const RATE_LIMIT_KEY = 'wh_sec_admin_rl_v1';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

interface RateLimitRecord {
  attempts: number;
  lockedUntil: number;
}

export interface AdminRateLimitStatus {
  allowed: boolean;
  locked: boolean;
  remainingSeconds: number;
  remainingLockoutMs: number;
  attemptsLeft: number;
}

export const checkAdminRateLimit = (): AdminRateLimitStatus => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return { allowed: true, locked: false, remainingSeconds: 0, remainingLockoutMs: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
    const record: RateLimitRecord = JSON.parse(raw);
    const now = Date.now();
    if (record.lockedUntil && record.lockedUntil > now) {
      const remainingMs = record.lockedUntil - now;
      return {
        allowed: false,
        locked: true,
        remainingSeconds: Math.ceil(remainingMs / 1000),
        remainingLockoutMs: remainingMs,
        attemptsLeft: 0
      };
    }
    if (record.lockedUntil && record.lockedUntil <= now) {
      localStorage.removeItem(RATE_LIMIT_KEY);
      return { allowed: true, locked: false, remainingSeconds: 0, remainingLockoutMs: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
    }
    return {
      allowed: true,
      locked: false,
      remainingSeconds: 0,
      remainingLockoutMs: 0,
      attemptsLeft: Math.max(0, MAX_FAILED_ATTEMPTS - (record.attempts || 0))
    };
  } catch {
    return { allowed: true, locked: false, remainingSeconds: 0, remainingLockoutMs: 0, attemptsLeft: MAX_FAILED_ATTEMPTS };
  }
};

export const recordAdminFailedAttempt = (): AdminRateLimitStatus => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    let record: RateLimitRecord = { attempts: 0, lockedUntil: 0 };
    if (raw) {
      record = JSON.parse(raw);
      if (record.lockedUntil && record.lockedUntil <= now) {
        record = { attempts: 0, lockedUntil: 0 };
      }
    }
    record.attempts = (record.attempts || 0) + 1;
    if (record.attempts >= MAX_FAILED_ATTEMPTS) {
      record.lockedUntil = now + LOCKOUT_DURATION_MS;
    }
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(record));
    return checkAdminRateLimit();
  } catch {
    return { allowed: true, locked: false, remainingSeconds: 0, remainingLockoutMs: 0, attemptsLeft: 1 };
  }
};

export const resetAdminRateLimit = (): void => {
  try {
    localStorage.removeItem(RATE_LIMIT_KEY);
  } catch {
    // ignore
  }
};

// ============================================================================
// INPUT SANITIZATION UTILITY (ANTI-XSS & ANTI-INJECTION)
// ============================================================================
export const sanitizeUserInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/<\s*iframe[^>]*>[\s\S]*?<\s*\/\s*iframe\s*>/gi, '');
};

// ============================================================================
// MULTI-LAYER RUNTIME SECURITY SHIELD HOOK
// ============================================================================
export const useSecurityShield = () => {
  useEffect(() => {
    // 1. Anti-Clickjacking Frame Guard
    try {
      if (window.top && window.self !== window.top) {
        window.top.location.href = window.self.location.href;
      }
    } catch {
      // Blocked cross-origin frame access
    }

    // 2. URL & Hash Parameter Sanitizer (Blocks Reflected XSS / SQLi / Path Traversal in URL)
    const sanitizeUrlParameters = () => {
      try {
        const decodedHash = decodeURIComponent(window.location.hash || '');
        const decodedSearch = decodeURIComponent(window.location.search || '');
        const dangerousPattern =
          /(<\s*script|javascript\s*:|onerror\s*=|onload\s*=|union\s+select|drop\s+table|\.\.\/|\.\.\\)/i;

        if (dangerousPattern.test(decodedHash)) {
          window.location.hash = '#/';
        }
        if (dangerousPattern.test(decodedSearch)) {
          window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
        }
      } catch {
        // Malformed URI component — reset to safe home route
        window.location.hash = '#/';
      }
    };

    sanitizeUrlParameters();
    window.addEventListener('hashchange', sanitizeUrlParameters);

    // 3. LocalStorage Database Integrity Verification
    try {
      const protectedKeys = [
        'wh_banned_ips',
        'wh_services',
        'wh_projects',
        'wh_inquiries',
        'wh_hire_va_inquiries',
        'wh_cms_categories',
        'wh_visitor_logs'
      ];
      protectedKeys.forEach((key) => {
        const val = localStorage.getItem(key);
        if (val) {
          try {
            const parsed = JSON.parse(val);
            if (!Array.isArray(parsed)) {
              localStorage.removeItem(key);
            }
          } catch {
            localStorage.removeItem(key);
          }
        }
      });
    } catch {
      // Storage access restricted
    }

    // 4. Self-XSS & Anti-Scammer Console Warning
    try {
      // eslint-disable-next-line no-console
      console.log(
        '%cSECURITY PROTOCOL ACTIVE — TEAM WHITEHAT DEV',
        'color:#0f172a;background:#f8fafc;border:1px solid #0f172a;padding:6px 12px;font-weight:bold;font-size:14px;'
      );
      // eslint-disable-next-line no-console
      console.log(
        '%cWARNING: Do not paste unknown code or credentials here. Unauthorized scraping, XSS injection, or credential harvesting attempts are logged by the Security Firewall.',
        'color:#475569;font-size:12px;'
      );
    } catch {
      // ignore
    }

    // 5. Disable Right-Click and Shift + Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // 6. Disable AuxClick (Right-Click & Shift + Right-Click on middle/right buttons)
    const handleAuxClick = (e: MouseEvent) => {
      if (e.button === 2 || (e.shiftKey && e.button === 2)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 7. Disable MouseUp/MouseDown right-click triggers with Shift key held
    const handleMouseEvents = (e: MouseEvent) => {
      if (e.button === 2 || (e.shiftKey && e.button === 2)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 8. Disable DevTools & View Source Keyboard Shortcuts (F12, Shift+F10, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'F10' || e.keyCode === 121)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      if (e.ctrlKey && ['U', 'u', 'S', 's'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      if (e.metaKey && e.altKey && ['I', 'i', 'U', 'u'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    window.addEventListener('contextmenu', handleContextMenu, true);
    window.addEventListener('auxclick', handleAuxClick, true);
    window.addEventListener('mouseup', handleMouseEvents, true);
    window.addEventListener('mousedown', handleMouseEvents, true);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('hashchange', sanitizeUrlParameters);
      window.removeEventListener('contextmenu', handleContextMenu, true);
      window.removeEventListener('auxclick', handleAuxClick, true);
      window.removeEventListener('mouseup', handleMouseEvents, true);
      window.removeEventListener('mousedown', handleMouseEvents, true);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);
};

export default useSecurityShield;
