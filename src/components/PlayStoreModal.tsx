import React, { useState, useEffect } from 'react';
import { Smartphone, ExternalLink, X, Shield, Star } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/constants';

export const PlayStoreModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full font-mono animate-slideUp">
      <div className="bg-gradient-to-br from-gray-950 via-black to-cyan-950/90 border-2 border-cyan-500/60 p-4 rounded-2xl space-y-3 shadow-2xl relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2 text-cyan-300 font-extrabold text-xs uppercase">
          <Smartphone className="w-4 h-4 text-lime-400 animate-pulse" />
          <span>OFFICIAL ANDROID APPS SHOWCASE</span>
        </div>

        <h4 className="text-sm font-black font-rajdhani text-white uppercase">
          DOWNLOAD WHITEHAT DEV APPS ON GOOGLE PLAY
        </h4>

        <p className="text-xs text-gray-300 font-sans leading-relaxed">
          Explore our published developer utilities, mobile productivity tools, and cybersecurity apps on the official Google Play Store.
        </p>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="block w-full py-2.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 flex items-center justify-center space-x-1.5"
        >
          <span>OPEN GOOGLE PLAY STORE</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
export default PlayStoreModal;
