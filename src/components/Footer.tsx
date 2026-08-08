import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/initialData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 border-t border-gray-800 py-6 font-mono text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center space-x-2 text-white font-rajdhani font-bold">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>WHITE HAT DEV • WEB & APPLICATION DEVELOPER</span>
        </div>

        <div className="flex items-center space-x-2 text-lime-400 text-[11px]">
          <Lock className="w-3.5 h-3.5" />
          <span>SECURITY_LEVEL: MAXIMUM • SSL_ENCRYPTED_256</span>
        </div>

        <div className="text-[11px] text-gray-500">
          © {new Date().getFullYear()} Team White Hat Dev. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
