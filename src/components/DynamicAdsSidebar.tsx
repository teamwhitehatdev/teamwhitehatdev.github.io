import React, { useState, useEffect } from 'react';
import { HUDPanel } from './HUDPanel';
import { ExternalLink, Sparkles, Server, ShoppingBag, Mic, Smartphone, Flame } from 'lucide-react';

export const DynamicAdsSidebar: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";
  const PLAY_STORE_URL = "https://play.google.com/store/apps/dev?id=7374638355121114347";

  const ads = [
    {
      id: 'hostinger',
      badge: 'RECOMMENDED HOSTING',
      code: 'CODE: DPDCABINCEHM',
      img: './media_1786586391503.png',
      title: 'HOSTINGER CLOUD & VPS (75% OFF + FREE DOMAIN)',
      desc: 'Clients hire VAs with custom domain portfolio websites 4x faster. Includes NVMe storage & 24/7 support.',
      link: HOSTINGER_LINK,
      btn: 'CLAIM HOSTINGER DEALS (75% OFF)',
      gradient: 'from-gray-900 via-black to-lime-950/90',
      border: 'border-lime-500/60',
      textClr: 'text-lime-400',
      btnGradient: 'from-lime-400 to-cyan-400 text-black'
    },
    {
      id: 'gumroad',
      badge: 'GUMROAD VA STORE',
      code: 'VERIFIED KITS',
      img: './media_1786590207160.png',
      title: 'GUMROAD CLIENT PROPOSAL & CONTRACT KITS',
      desc: 'Download client contract templates, social media content planners, and email pitch decks.',
      link: GUMROAD_LINK,
      btn: 'EXPLORE GUMROAD KITS',
      gradient: 'from-gray-900 via-black to-cyan-950/90',
      border: 'border-cyan-500/60',
      textClr: 'text-cyan-400',
      btnGradient: 'from-cyan-400 to-purple-400 text-black'
    },
    {
      id: 'elevenlabs',
      badge: 'AI VOICE STUDIO',
      code: 'FREE TRIAL',
      img: './media_1786191713841.jpg',
      title: 'ELEVENLABS AI VOICE & AUDIO GENERATOR',
      desc: 'Offer premium AI voiceovers, podcast editing, and audiobook narrations for clients in 29+ languages.',
      link: ELEVENLABS_LINK,
      btn: 'TRY ELEVENLABS FREE',
      gradient: 'from-gray-900 via-black to-purple-950/90',
      border: 'border-purple-500/60',
      textClr: 'text-purple-400',
      btnGradient: 'from-purple-500 to-cyan-400 text-white'
    },
    {
      id: 'playstore',
      badge: 'OFFICIAL APPS SUITE',
      code: 'GOOGLE PLAY',
      img: './media_1786178491269.jpg',
      title: 'OFFICIAL GOOGLE PLAY STORE MOBILE APPS',
      desc: 'Download our collection of Android mobile productivity tools and developer utilities directly from Google Play.',
      link: PLAY_STORE_URL,
      btn: 'VIEW GOOGLE PLAY APPS',
      gradient: 'from-gray-900 via-black to-lime-950/90',
      border: 'border-lime-500/60',
      textClr: 'text-lime-400',
      btnGradient: 'from-lime-400 to-cyan-400 text-black'
    }
  ];

  // Randomize initial ad on every page visit or browser refresh
  const [activeIdx, setActiveIdx] = useState(() => Math.floor(Math.random() * ads.length));

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [ads.length]);

  const currentAd = ads[activeIdx];

  return (
    <HUDPanel title="⚡ DYNAMIC ADS & SHUFFLED OFFERS">
      <div className="p-4 space-y-5 font-mono">
        <div className="flex items-center justify-between text-[10px] text-gray-400 border-b border-gray-800 pb-2">
          <span className="flex items-center space-x-1 text-lime-400 font-bold">
            <Flame className="w-3.5 h-3.5 animate-bounce text-lime-400" />
            <span>SHUFFLED PROMO AD ({activeIdx + 1}/{ads.length})</span>
          </span>
          <span className="text-gray-500 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
            ADSENSE READY
          </span>
        </div>

        <div className={`bg-gradient-to-br ${currentAd.gradient} border-2 ${currentAd.border} p-4 rounded-2xl space-y-3 shadow-xl animate-fadeIn`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-extrabold ${currentAd.textClr} uppercase tracking-widest flex items-center space-x-1`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentAd.badge}</span>
            </span>
            <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-gray-700">
              {currentAd.code}
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-700">
            <img src={currentAd.img} alt={currentAd.title} className="w-full h-32 object-cover hover:scale-105 transition-transform" />
          </div>

          <h4 className="text-sm font-black font-rajdhani text-white uppercase leading-snug">
            {currentAd.title}
          </h4>

          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            {currentAd.desc}
          </p>

          <a
            href={currentAd.link}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className={`block w-full py-2.5 bg-gradient-to-r ${currentAd.btnGradient} font-extrabold text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all`}
          >
            {currentAd.btn} &rarr;
          </a>
        </div>

        <div className="bg-black/90 border border-dashed border-gray-800 p-4 rounded-2xl text-center space-y-1">
          <span className="text-[10px] text-gray-500 uppercase block font-mono">
            GOOGLE ADSENSE & MEDIA.NET CONTAINER
          </span>
          <p className="text-[11px] text-gray-400 font-sans">
            Banner ads automatically shuffle on page refreshes and route transitions.
          </p>
        </div>
      </div>
    </HUDPanel>
  );
};
export default DynamicAdsSidebar;
