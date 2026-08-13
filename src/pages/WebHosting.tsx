import React from 'react';
import { ExternalLink, Sparkles, Server } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const WebHosting: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";

  return (
    <div className="space-y-10 font-mono max-w-7xl mx-auto pb-10">
      
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-cyan-950/90 border border-cyan-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Server className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>RECOMMENDED WEB HOSTING FOR VIRTUAL ASSISTANTS & DEVELOPERS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-rajdhani text-white uppercase tracking-wide leading-tight">
          LAUNCH YOUR WEBSITES & CLIENT PORTFOLIOS WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400">HOSTINGER CLOUD & VPS</span>
        </h1>

        {/* HOSTINGER PROMO BANNER IMAGE */}
        <div className="rounded-2xl overflow-hidden border-2 border-lime-400/50 shadow-2xl">
          <img src="./media_1786586391503.png" alt="Hostinger Referral Banner Deals" className="w-full h-auto max-h-72 object-cover" />
        </div>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans max-w-4xl">
          Whether you are an aspiring Virtual Assistant building your personal portfolio, a web developer hosting client sites, or an entrepreneur launching an e-commerce platform, high-speed reliable web hosting is mandatory. Hostinger provides ultra-fast NVMe storage, 99.9% uptime, free SSL certificates, automated daily backups, and 24/7 customer support.
        </p>

        {/* EXCLUSIVE DISCOUNT BANNER */}
        <div className="bg-gradient-to-r from-lime-950/80 via-black to-cyan-950/80 border-2 border-lime-400/60 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>SPECIAL OFFER • UP TO 75% OFF + FREE DOMAIN & SSL</span>
            </span>
            <p className="text-xs text-white font-sans font-bold">
              Use Referral Code: <span className="text-lime-300 font-mono underline bg-black px-2 py-0.5 rounded">DPDCABINCEHM</span>
            </p>
          </div>

          <a
            href={HOSTINGER_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl hover:opacity-95 transition-all shadow-lg flex items-center space-x-2"
          >
            <span>CLAIM HOSTINGER DISCOUNT NOW</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
};
export default WebHosting;
