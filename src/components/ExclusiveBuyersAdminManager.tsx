import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  Mail,
  UserPlus,
  CheckCircle2,
  Trash2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Ban,
  Crown
} from 'lucide-react';
import { HUDPanel } from './HUDPanel';
import {
  getAllVerifiedBuyers,
  registerPurchasedServiceBuyer,
  toggleBuyerStatus,
  removeBuyerRecord,
  getExclusiveVaultDirectUrl,
  buildBuyerEmailDispatchUrl,
  VerifiedServiceBuyer
} from '../utils/exclusiveSkillsAuth';

interface ExclusiveBuyersAdminManagerProps {
  showToast?: (msg: string) => void;
}

export const ExclusiveBuyersAdminManager: React.FC<ExclusiveBuyersAdminManagerProps> = ({
  showToast
}) => {
  const [buyers, setBuyers] = useState<VerifiedServiceBuyer[]>(() => getAllVerifiedBuyers());
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPackage, setNewPackage] = useState(
    'Executive VA & Advanced Skill Mastery Starter Pack ($5 / hr ($49 / week))'
  );

  const refreshBuyers = () => {
    setBuyers(getAllVerifiedBuyers());
  };

  useEffect(() => {
    window.addEventListener('wh_verified_buyers_updated', refreshBuyers);
    return () => window.removeEventListener('wh_verified_buyers_updated', refreshBuyers);
  }, []);

  const handleAddBuyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newEmail.includes('@')) return;
    const record = registerPurchasedServiceBuyer(
      newName.trim() || 'Verified VIP Client',
      newEmail.trim(),
      newPackage.trim()
    );
    setNewName('');
    setNewEmail('');
    refreshBuyers();
    if (showToast) {
      showToast(`Whitelisted ${record.email} (VIP Key: ${record.accessKey}) for /#/exclusive-skills`);
    }
  };

  const handleCopyVipUrl = (buyer: VerifiedServiceBuyer) => {
    const url = getExclusiveVaultDirectUrl(buyer.email, buyer.accessKey);
    navigator.clipboard.writeText(url);
    if (showToast) {
      showToast(`Copied personalized VIP Vault URL for ${buyer.email}`);
    }
  };

  return (
    <HUDPanel
      title={`Exclusive Skills Vault — Verified Buyer Email Filter & VIP Access Manager (/#/exclusive-skills — ${buyers.length} Buyers)`}
      badge="Email Gate & VIP Keys"
    >
      <div className="space-y-5 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-extrabold text-amber-300 uppercase tracking-wider text-[11px]">
              <Crown className="w-4 h-4" />
              <span>Restricted Purchased-Clients-Only Portal (/#/exclusive-skills)</span>
            </div>
            <p className="text-slate-300 text-xs">
              Visitors who have not purchased/claimed a service package on <code className="text-white font-mono">/#/services</code> are blocked by email filtering. Approve buyer emails below or send their personalized VIP Access Link via email.
            </p>
          </div>
          <a
            href="#/exclusive-skills"
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shrink-0"
          >
            <span>Open Exclusive Vault</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ADD / WHITELIST NEW BUYER EMAIL FORM */}
        <form
          onSubmit={handleAddBuyer}
          className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
        >
          <div className="md:col-span-3">
            <label className="font-bold text-slate-700 block pb-1">Buyer / Student Name:</label>
            <input
              type="text"
              placeholder="e.g. Maria Santos"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900"
            />
          </div>
          <div className="md:col-span-3">
            <label className="font-bold text-slate-700 block pb-1">Verified Buyer Email (Required):</label>
            <input
              type="email"
              placeholder="buyer@email.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900"
            />
          </div>
          <div className="md:col-span-4">
            <label className="font-bold text-slate-700 block pb-1">Purchased Service Package:</label>
            <input
              type="text"
              value={newPackage}
              onChange={(e) => setNewPackage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Authorize Email</span>
            </button>
          </div>
        </form>

        {/* VERIFIED BUYERS TABLE / CARDS */}
        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {buyers.map((buyer) => (
            <div
              key={buyer.id}
              className={`p-3.5 rounded-2xl border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 ${
                buyer.status === 'ACTIVE'
                  ? 'bg-white border-slate-200'
                  : 'bg-rose-50/40 border-rose-200 opacity-75'
              }`}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">{buyer.name}</span>
                  <span className="font-mono font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                    {buyer.email}
                  </span>
                  <span className="font-mono font-black text-slate-800 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded flex items-center gap-1">
                    <KeyRound className="w-3 h-3 text-slate-700" />
                    <span>{buyer.accessKey}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      buyer.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {buyer.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Package: <strong className="text-slate-700">{buyer.purchasedService || buyer.servicePackage}</strong> • Authorized:{' '}
                  {new Date(buyer.createdAt || buyer.purchasedAt || Date.now()).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyVipUrl(buyer)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy VIP Link</span>
                </button>

                <a
                  href={buildBuyerEmailDispatchUrl(buyer)}
                  className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email VIP Access Link</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    toggleBuyerStatus(buyer.id);
                    refreshBuyers();
                    if (showToast) {
                      showToast(`Updated access status for ${buyer.email}`);
                    }
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {buyer.status === 'ACTIVE' ? (
                    <>
                      <Ban className="w-3.5 h-3.5 text-rose-600" />
                      <span>Revoke</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Restore</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    removeBuyerRecord(buyer.id);
                    refreshBuyers();
                    if (showToast) {
                      showToast(`Removed buyer ${buyer.email}`);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 cursor-pointer"
                  title="Remove Buyer Email"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HUDPanel>
  );
};

export default ExclusiveBuyersAdminManager;
