import React from 'react';
import { Sparkles, ExternalLink, ArrowRight, CheckCircle2, ShieldCheck, Tag, CreditCard } from 'lucide-react';

export const AtomeCardPanel: React.FC = () => {
  const ATOME_REFERRAL_LINK = "https://www.atome.ph/s/cbcqZc5Ak";

  return (
    <div className="bg-gradient-to-b from-yellow-950/40 via-black to-cyan-950/50 border-2 border-yellow-400/60 rounded-3xl p-5 sm:p-6 space-y-6 shadow-2xl font-mono select-none">
      
      {/* PANEL HEADER */}
      <div className="space-y-2 border-b border-yellow-400/30 pb-4">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          <span>EXCLUSIVE ATOME CARD PERK</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black font-rajdhani text-white uppercase tracking-wider leading-tight">
          WIN UP TO P7,800 CASHBACK WITH ATOME CARD!
        </h3>
        <p className="text-xs text-gray-300 font-sans leading-relaxed">
          Congratulations! Here’s your chance to win up to P7,800 cashback. Register for Atome Card with our official referral link to get started. It’s super easy!
        </p>
        <a
          href={ATOME_REFERRAL_LINK}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-yellow-400 via-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl shadow-lg hover:scale-105 transition-all mt-2"
        >
          <span>REGISTER FOR ATOME CARD NOW &rarr;</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* ABOUT ATOME SERVICE & ATOME CARD DESCRIPTION */}
      <div className="bg-black/80 border border-yellow-500/30 p-4 rounded-2xl space-y-3 font-sans text-xs">
        <h4 className="text-sm font-black font-rajdhani text-yellow-400 uppercase flex items-center space-x-1.5">
          <CreditCard className="w-4 h-4 text-yellow-400" />
          <span>ABOUT ATOME SERVICE &amp; ATOME CARD</span>
        </h4>
        <p className="text-gray-300 leading-relaxed">
          Atome Card is a revolutionary payment solution that empowers shoppers and freelancers to buy what they love today and pay later in up to <strong className="text-white">12 monthly installments with 0% interest</strong>. Accepted everywhere Mastercard is welcomed!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
          <div className="p-2 bg-yellow-950/40 border border-yellow-500/30 rounded-lg text-center space-y-0.5">
            <span className="text-yellow-300 font-bold block">12 MONTHS</span>
            <span className="text-[9px] text-gray-400 block font-sans">Flexible Pay Later</span>
          </div>
          <div className="p-2 bg-lime-950/40 border border-lime-500/30 rounded-lg text-center space-y-0.5">
            <span className="text-lime-300 font-bold block">0% INTEREST</span>
            <span className="text-[9px] text-gray-400 block font-sans">Monthly Purchases</span>
          </div>
          <div className="p-2 bg-cyan-950/40 border border-cyan-500/30 rounded-lg text-center space-y-0.5">
            <span className="text-cyan-300 font-bold block">P200,000</span>
            <span className="text-[9px] text-gray-400 block font-sans">Spending Limit</span>
          </div>
        </div>
      </div>

      {/* 4 CLICKABLE INFOGRAPHIC & BANNER IMAGE ADS */}
      <div className="space-y-5">
        
        {/* ATOME IMAGE AD 1: HOW TO GET ATOME CARD & P7,800 CASHBACK */}
        <div className="bg-black/90 border border-yellow-400/40 rounded-2xl p-3.5 space-y-3 shadow-lg hover:border-yellow-400 transition-all group">
          <div className="flex items-center justify-between font-mono">
            <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5 text-lime-400" />
              <span>STEP-BY-STEP GUIDE</span>
            </span>
            <span className="bg-yellow-400/20 text-yellow-300 text-[9px] font-bold px-2 py-0.5 rounded border border-yellow-400/40">
              P7,800 CASHBACK
            </span>
          </div>

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

          <h4 className="text-xs font-black font-rajdhani text-white uppercase leading-snug">
            How to get Atome Card — Claim P7,800 Cashback &amp; iPhone Perks!
          </h4>

          <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
            1. Register with mobile &rarr; 2. Download Atome app &rarr; 3. Apply for 100 points &rarr; 4. Get approved &amp; claim your P7,800 cashback!
          </p>

          <a
            href={ATOME_REFERRAL_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-lime-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>CLAIM P7,800 CASHBACK NOW &rarr;</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ATOME IMAGE AD 2: PAY IN 12 MONTHS, 0% INTEREST, P200K LIMIT */}
        <div className="bg-black/90 border border-lime-400/40 rounded-2xl p-3.5 space-y-3 shadow-lg hover:border-lime-400 transition-all group">
          <div className="flex items-center justify-between font-mono">
            <span className="text-[10px] text-lime-400 font-bold uppercase tracking-widest flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5 text-lime-400" />
              <span>SPENDING BENEFITS</span>
            </span>
            <span className="bg-lime-400/20 text-lime-300 text-[9px] font-bold px-2 py-0.5 rounded border border-lime-400/40">
              0% INTEREST
            </span>
          </div>

          <a
            href={ATOME_REFERRAL_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="block relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-lime-400 transition-all"
          >
            <img
              src="./images/atome/media_1786727286320.png"
              alt="Pay in 12 months, 0% interest, Up to P200,000 spending limit"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          <h4 className="text-xs font-black font-rajdhani text-white uppercase leading-snug">
            Pay in 12 Months with 0% Interest &amp; Up to P200,000 Spending Limit
          </h4>

          <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
            Shop online, purchase freelancing software, and pay for daily groceries with zero annual fees.
          </p>

          <a
            href={ATOME_REFERRAL_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="w-full py-2.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>APPLY FOR P200K LIMIT CARD &rarr;</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ATOME IMAGE AD 3: SAY HELLO TO SHOPPING EVERYWHERE WITH EASE */}
        <div className="bg-black/90 border border-purple-400/40 rounded-2xl p-3.5 space-y-3 shadow-lg hover:border-purple-400 transition-all group">
          <div className="flex items-center justify-between font-mono">
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5 text-purple-400" />
              <span>SHOPPING FREEDOM</span>
            </span>
            <span className="bg-purple-400/20 text-purple-300 text-[9px] font-bold px-2 py-0.5 rounded border border-purple-400/40">
              MASTERCARD
            </span>
          </div>

          <a
            href={ATOME_REFERRAL_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="block relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-purple-400 transition-all"
          >
            <img
              src="./images/atome/media__1786786314625.png"
              alt="Say hello to shopping everywhere with ease"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          <h4 className="text-xs font-black font-rajdhani text-white uppercase leading-snug">
            Say Hello to Shopping Everywhere with Ease — Worldwide Acceptance
          </h4>

          <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
            Use your physical or digital Atome Card online and in stores worldwide anywhere Mastercard is accepted.
          </p>

          <a
            href={ATOME_REFERRAL_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="w-full py-2.5 bg-gradient-to-r from-purple-400 to-pink-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>GET ATOME CARD FREE &rarr;</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ATOME IMAGE AD 4: TIKTOK SHOP P50 OFF PERK */}
        <div className="bg-black/90 border border-pink-500/40 rounded-2xl p-3.5 space-y-3 shadow-lg hover:border-pink-400 transition-all group">
          <div className="flex items-center justify-between font-mono">
            <span className="text-[10px] text-pink-400 font-bold uppercase tracking-widest flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5 text-pink-400" />
              <span>TIKTOK PERK</span>
            </span>
            <span className="bg-pink-500/20 text-pink-300 text-[9px] font-bold px-2 py-0.5 rounded border border-pink-500/40">
              P50 OFF ORDER
            </span>
          </div>

          <a
            href={ATOME_REFERRAL_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="block relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-pink-400 transition-all"
          >
            <img
              src="./images/atome/atome-tiktok-shop.png"
              alt="TikTok Shop x Atome Card P50 Off First Order"
              className="w-full h-auto max-h-72 object-contain bg-black group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          <h4 className="text-xs font-black font-rajdhani text-white uppercase leading-snug">
            P50 Off Your First TikTok Shop Order with Atome Card!
          </h4>

          <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
            Shop on TikTok Shop app (min spend P500) and pay using Atome Card for instant P50 discount.
          </p>

          <a
            href={ATOME_REFERRAL_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="w-full py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>CLAIM TIKTOK SHOP DISCOUNTS &rarr;</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </div>
  );
};
export default AtomeCardPanel;
