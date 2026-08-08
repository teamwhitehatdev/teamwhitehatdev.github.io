import React, { useState, useEffect } from 'react';
import { X, Smartphone, ExternalLink, ShieldCheck } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/initialData';

export const PlayStoreModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Show modal once on initial visit or revisit
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsOpen(false);
    }
  }, [isOpen, countdown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono">
      <div className="relative w-full max-w-md bg-gray-900 border border-cyan-500/50 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-300">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center space-x-2 text-xs text-lime-400">
            <ShieldCheck className="w-4 h-4" />
            <span>OFFICIAL GOOGLE PLAY DEVELOPER PROFILE</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="text-center space-y-4 py-2">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
            <Smartphone className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold font-rajdhani text-white uppercase tracking-wider">
              EXPLORE OUR MOBILE APPS
            </h3>
            <p className="text-xs text-gray-400">
              Download published Android apps & mobile tools directly on the Google Play Store.
            </p>
          </div>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-gradient-to-r from-lime-400 to-cyan-500 text-black font-bold font-rajdhani rounded-xl text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-lime-500/20"
          >
            <span>OPEN GOOGLE PLAY DEVELOPER PROFILE</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 5-Second Auto Close Footer */}
        <div className="text-center pt-2 border-t border-gray-800 text-[11px] text-gray-500">
          Auto closing in <span className="text-lime-400 font-bold">{countdown}s</span>...
        </div>
      </div>
    </div>
  );
};

export default PlayStoreModal;
