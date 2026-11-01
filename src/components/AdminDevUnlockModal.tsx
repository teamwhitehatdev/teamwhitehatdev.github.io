import React, { useState } from 'react';
import { Lock, Unlock, ShieldCheck, X, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';
import { verifyAdminCredentials, revokeAdminSession, isUserAdminOrDeveloper } from '../utils/adminAuth';

interface AdminDevUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

export const AdminDevUnlockModal: React.FC<AdminDevUnlockModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess
}) => {
  const [username, setUsername] = useState('admin');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const isCurrentlyAdmin = isUserAdminOrDeveloper();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const verified = verifyAdminCredentials(username, pin);
    if (verified) {
      setSuccessMsg('Authentication successful! Developer & Admin editing mode unlocked.');
      setPin('');
      if (onAuthSuccess) onAuthSuccess();
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 1200);
    } else {
      setErrorMsg('Invalid developer/admin credentials. Access denied for general visitors.');
    }
  };

  const handleLock = () => {
    revokeAdminSession();
    setSuccessMsg('Developer & Admin mode locked. Now browsing in Visitor & Reader mode.');
    setTimeout(() => {
      onClose();
      setSuccessMsg('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border-2 border-slate-300 rounded-3xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden">
        {/* Subtle Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">
                Developer &amp; Admin Gate
              </h3>
              <p className="text-[11px] font-mono text-slate-500">
                Strict access control for niche contents &amp; tool configurations
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-mono font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {isCurrentlyAdmin ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Developer &amp; Admin Mode is Currently ACTIVE</span>
                </div>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
                  You have full privileges to edit niche topics, add custom niches, modify showcase builds, and update referral URLs.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLock}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock &amp; Return to Visitor Mode</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold text-xs transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="text-xs text-slate-600 leading-relaxed">
                Visitors, readers, and viewers have read-only access. Only verified developers and administrators may enter their credentials to modify or add niche contents.
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-slate-700 block uppercase mb-1">
                  Username:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or developer"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-950 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-slate-700 block uppercase mb-1">
                  Master Security PIN:
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-950 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlock Admin / Developer Mode</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold text-xs transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
