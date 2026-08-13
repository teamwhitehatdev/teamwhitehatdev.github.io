import React, { useState, useEffect } from 'react';
import { ExternalLink, Sparkles, X } from 'lucide-react';

export const GumroadModal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 font-mono select-none">
      <div className="bg-gradient-to-b from-gray-900 via-black to-lime-950/80 border-2 border-lime-500/60 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-[0_0_50px_rgba(132,204,22,0.25)] relative overflow-hidden text-center">
        <div className="flex justify-between items-center pb-2 border-b border-gray-800">
          <span className="text-xs font-bold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span>EXCLUSIVE DIGITAL DISCOUNTS</span>
          </span>
          {countdown === 0 && (
            <button onClick={onComplete} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <h3 className="text-xl font-black font-rajdhani text-white uppercase">
          DISCOVER TOP DIGITAL RESOURCES & PRODUCTS ON GUMROAD
        </h3>

        <p className="text-xs text-gray-300 font-sans">
          Explore curated templates, ebooks, software tools, and digital assets designed to accelerate your Virtual Assistant and development career.
        </p>

        <a
          href="https://gumroad.com/discover?a=815255139"
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={onComplete}
          className="block w-full py-3.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-black font-rajdhani text-sm uppercase rounded-xl shadow-xl hover:opacity-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>EXPLORE GUMROAD PRODUCTS NOW</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
export default GumroadModal;
