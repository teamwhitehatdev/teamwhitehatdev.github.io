import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

export const AtomeCardPanel: React.FC = () => {
  const ATOME_REFERRAL_LINK = "https://www.atome.ph/s/cbcqZc5Ak";

  return (
    <div className="bg-gradient-to-b from-yellow-950/40 via-black to-cyan-950/50 border-2 border-yellow-400/60 rounded-3xl p-5 space-y-4 shadow-2xl font-mono select-none">
      
      {/* COMPACT PANEL HEADER */}
      <div className="flex items-center justify-between border-b border-yellow-400/30 pb-3">
        <span className="text-xs font-bold text-yellow-300 uppercase tracking-widest flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span>FEATURED ATOME PERK</span>
        </span>
        <span className="bg-yellow-400/20 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-400/40">
          WIN P7,800 CASHBACK
        </span>
      </div>

      {/* SINGLE MAIN ATOME CARD SHOWCASE (CLEAN, NO DUPLICATION, NO SPENDING BENEFITS CONTAINER) */}
      <div className="bg-black/90 border border-yellow-400/40 rounded-2xl p-4 space-y-3 shadow-lg hover:border-yellow-400 transition-all group">
        
        {/* CLICKABLE SINGLE MAIN HERO IMAGE */}
        <a
          href={ATOME_REFERRAL_LINK}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="block relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-yellow-400 transition-all"
        >
          <img
            src="./images/atome/media_1786726859766.png"
            alt="How to get Atome Card & Win P7,800 Cashback"
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        <div className="space-y-1">
          <h4 className="text-sm font-black font-rajdhani text-white uppercase leading-snug">
            Atome Card — Win Up to P7,800 Cashback Rewards
          </h4>
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Register for Atome Card with our official referral link to get started and claim your P7,800 cashback rewards.
          </p>
        </div>

        {/* PROMINENT DIRECT REFERRAL LINK BUTTON */}
        <a
          href={ATOME_REFERRAL_LINK}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="w-full py-2.5 bg-gradient-to-r from-yellow-400 via-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1.5 mt-2"
        >
          <span>CLAIM ATOME CASHBACK PERKS &rarr;</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
export default AtomeCardPanel;
