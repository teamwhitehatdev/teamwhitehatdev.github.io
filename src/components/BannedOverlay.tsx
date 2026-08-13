import React from 'react';
import { AlertOctagon } from 'lucide-react';

export const BannedOverlay: React.FC<{ userIp: string }> = ({ userIp }) => (
  <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center font-mono select-none">
    <AlertOctagon className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
    <h1 className="text-3xl font-black text-red-500 uppercase tracking-widest mb-2 font-rajdhani">ACCESS DENIED • IP BANNED</h1>
    <p className="text-sm text-gray-400 max-w-md mb-4">
      Your IP address <span className="text-red-400 font-bold">{userIp}</span> has been flagged by Team WhiteHat Dev Security Sentinel for suspicious traffic or violation of terms.
    </p>
    <div className="text-xs text-gray-600 border border-gray-900 p-3 rounded-xl bg-gray-950">
      SYSTEM PROTECTION SENTINEL • AES-256 ENCRYPTED FIREWALL ACTIVE
    </div>
  </div>
);
export default BannedOverlay;
