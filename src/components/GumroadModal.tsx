import React, { useEffect, useState } from 'react';
import { ShoppingBag, ExternalLink, Sparkles, X, Clock } from 'lucide-react';

interface GumroadModalProps {
  onComplete: () => void;
}

export const GumroadModal: React.FC<GumroadModalProps> = ({ onComplete }) => {
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-mono">
      <div className="bg-gradient-to-b from-gray-900 via-black to-cyan-950/90 border-2 border-cyan-500/60 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
        
        {/* TOP AUTO-CLOSE NOTICE BAR */}
        <div className="flex items-center justify-between text-xs text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 p-2.5 rounded-xl font-bold">
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-lime-400 animate-spin" />
            <span>OFFICIAL PARTNER PROMO</span>
          </span>
          <span className="flex items-center space-x-1 text-gray-300">
            <Clock className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
            <span>AUTO-CLOSING IN {timeLeft}S</span>
          </span>
        </div>

        <button
          onClick={onComplete}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/60 p-1.5 rounded-full border border-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
            <ShoppingBag className="w-8 h-8 animate-bounce" />
          </div>

          <h3 className="text-2xl font-black font-rajdhani text-white uppercase tracking-wider">
            GUMROAD VA DIGITAL CREATOR KITS
          </h3>

          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Accelerate your Virtual Assistant freelancing career! Access client proposal templates, cold outreach pitch decks, and digital ebooks.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href={GUMROAD_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={onComplete}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 text-black font-extrabold font-rajdhani text-sm uppercase rounded-xl text-center shadow-xl hover:opacity-95 transition-all flex items-center justify-center space-x-2"
          >
            <span>EXPLORE GUMROAD KITS NOW</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onComplete}
            className="w-full py-2 bg-black/60 text-gray-400 hover:text-white font-bold text-xs uppercase rounded-xl border border-gray-800 transition-all"
          >
            CONTINUE TO HOMEPAGE &rarr;
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden border border-gray-800">
          <div
            className="bg-gradient-to-r from-cyan-400 to-lime-400 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 4) * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
};
export default GumroadModal;
