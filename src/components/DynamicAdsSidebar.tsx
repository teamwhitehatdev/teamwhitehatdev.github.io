import React from 'react';
import { HUDPanel } from './HUDPanel';
import { Sparkles, Server, ShoppingBag, ExternalLink, Zap } from 'lucide-react';

export const DynamicAdsSidebar: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";

  const hostingerFeatureAds = [
    {
      id: 'h_auto',
      badge: 'LIMITED-TIME AUTOMATION',
      code: '75% OFF + FREE DOMAIN',
      img: './media_1786678717227.png',
      title: 'AUTOMATE WITHOUT WORK',
      desc: 'Welcome new subscribers, run drip campaigns, send abandoned cart emails and more.',
      link: HOSTINGER_LINK,
      btn: 'GET HOSTINGER HOSTING (CODE: DPDCABINCEHM)',
      gradient: 'from-gray-900 via-black to-lime-950/90',
      border: 'border-lime-500/60',
      textClr: 'text-lime-400',
      btnGrad: 'from-lime-400 to-cyan-400 text-black'
    },
    {
      id: 'h_weekly',
      badge: 'HOSTINGER AI CAMPAIGNS',
      code: 'AUTOMATED IDEAS',
      img: './media_1786678717242.png',
      title: 'WEEKLY CAMPAIGN IDEAS',
      desc: 'AI studies your business to suggest ready-to-go campaign ideas every week.',
      link: HOSTINGER_LINK,
      btn: 'CLAIM HOSTINGER DEALS (75% OFF)',
      gradient: 'from-gray-900 via-black to-cyan-950/90',
      border: 'border-cyan-500/60',
      textClr: 'text-cyan-400',
      btnGrad: 'from-cyan-400 to-lime-400 text-black'
    },
    {
      id: 'h_subject',
      badge: 'HOSTINGER AI EMAIL SUITE',
      code: 'MATCHED CONTENT',
      img: './media_1786678717364.png',
      title: 'SUBJECT LINES WRITTEN FOR YOU',
      desc: 'Proven subject lines matched to your content. Just pick your favorite.',
      link: HOSTINGER_LINK,
      btn: 'START ON HOSTINGER TODAY',
      gradient: 'from-gray-900 via-black to-purple-950/90',
      border: 'border-purple-500/60',
      textClr: 'text-purple-400',
      btnGrad: 'from-purple-500 to-cyan-400 text-white'
    }
  ];

  return (
    <div className="space-y-6 font-mono">
      
      {/* HEADER LABEL */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-2 border-lime-400/60 p-3 rounded-2xl text-center space-y-1 shadow-xl">
        <div className="flex items-center justify-center space-x-1.5 text-lime-400 font-extrabold text-xs uppercase tracking-widest">
          <Server className="w-4 h-4 animate-pulse" />
          <span>OFFICIAL HOSTINGER PROMO COLUMN</span>
        </div>
        <p className="text-[10px] text-gray-400 font-sans">
          Use Referral Code <span className="text-lime-300 font-bold">DPDCABINCEHM</span> for 75% OFF + Free Domain!
        </p>
      </div>

      {/* 3 HOSTINGER CARDS DISPLAYED VERTICALLY */}
      {hostingerFeatureAds.map((ad) => (
        <div key={ad.id} className={`bg-gradient-to-br ${ad.gradient} border-2 ${ad.border} p-4 rounded-2xl space-y-3 shadow-2xl hover:scale-[1.02] transition-transform`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-extrabold ${ad.textClr} uppercase tracking-widest flex items-center space-x-1`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{ad.badge}</span>
            </span>
            <span className="bg-black/80 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-700 font-mono">
              {ad.code}
            </span>
          </div>

          <a href={ad.link} target="_blank" rel="sponsored noopener noreferrer" className="block rounded-xl overflow-hidden border border-gray-700 group">
            <img src={ad.img} alt={ad.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
          </a>

          <h4 className="text-sm font-black font-rajdhani text-white uppercase leading-snug">
            {ad.title}
          </h4>

          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            {ad.desc}
          </p>

          <a
            href={ad.link}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className={`block w-full py-3 bg-gradient-to-r ${ad.btnGrad} font-extrabold text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-1.5`}
          >
            <span>{ad.btn}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ))}

      {/* ADDITIONAL GUMROAD & ELEVENLABS PROMO CARD */}
      <div className="bg-black/90 border border-pink-500/50 p-4 rounded-2xl space-y-3">
        <div className="flex items-center justify-between text-[10px] text-pink-400 font-bold uppercase">
          <span className="flex items-center space-x-1">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>GUMROAD DIGITAL STORE</span>
          </span>
          <span className="text-gray-400 font-mono">VA KITS</span>
        </div>

        <a href={GUMROAD_LINK} target="_blank" rel="sponsored noopener noreferrer" className="block rounded-xl overflow-hidden border border-gray-700">
          <img src="./media_1786678133861.png" alt="Gumroad Tax Center" className="w-full h-32 object-cover hover:scale-105 transition-transform" />
        </a>

        <a
          href={GUMROAD_LINK}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="block w-full py-2.5 bg-gradient-to-r from-pink-400 to-purple-400 text-black font-extrabold text-xs uppercase rounded-xl text-center shadow hover:opacity-95"
        >
          EXPLORE GUMROAD PRODUCTS &rarr;
        </a>
      </div>

    </div>
  );
};
export default DynamicAdsSidebar;
