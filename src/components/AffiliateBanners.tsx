import React, { useState, useEffect } from 'react';
import { ExternalLink, Server, ShoppingBag, Mic, Smartphone } from 'lucide-react';
import { HUDPanel } from './HUDPanel';

export const AffiliateBanners: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";
  const PLAY_STORE_URL = "https://play.google.com/store/apps/dev?id=7374638355121114347";

  const allBanners = [
    {
      title: 'HOSTINGER CLOUD & VPS HOSTING (75% OFF)',
      badge: 'CODE: DPDCABINCEHM',
      img: './media_1786586391503.png',
      desc: 'Ultra-fast NVMe web hosting with free custom domain, unlimited SSL certificates, and 1-click WordPress setup.',
      link: HOSTINGER_LINK,
      btn: 'CLAIM HOSTINGER DISCOUNT (75% OFF)',
      gradient: 'from-gray-900 via-black to-lime-950/80',
      border: 'border-lime-500/50',
      textClr: 'text-lime-400',
      btnGrad: 'from-lime-400 to-cyan-400 text-black'
    },
    {
      title: 'GUMROAD DIGITAL ASSETS & VA TEMPLATES',
      badge: 'VERIFIED STORE',
      img: './media_1786590207160.png',
      desc: 'Explore curated digital templates, software tools, client proposal kits, and ebooks to build your online business.',
      link: GUMROAD_LINK,
      btn: 'DISCOVER GUMROAD PRODUCTS',
      gradient: 'from-gray-900 via-black to-cyan-950/80',
      border: 'border-cyan-500/50',
      textClr: 'text-cyan-400',
      btnGrad: 'from-cyan-400 to-purple-400 text-black'
    },
    {
      title: 'ELEVENLABS AI VOICE & AUDIO GENERATOR',
      badge: 'FREE TRIAL',
      img: './media_1786191713841.jpg',
      desc: 'Generate human-like AI voiceovers for podcasting, content creation, client videos, and VA tasks in 29+ languages.',
      link: ELEVENLABS_LINK,
      btn: 'TRY ELEVENLABS FREE',
      gradient: 'from-gray-900 via-black to-purple-950/80',
      border: 'border-purple-500/50',
      textClr: 'text-purple-400',
      btnGrad: 'from-purple-500 to-cyan-400 text-white'
    },
    {
      title: 'OFFICIAL GOOGLE PLAY STORE APPS SUITE',
      badge: 'PLAY STORE',
      img: './media_1786178491269.jpg',
      desc: 'Download our collection of published mobile productivity applications, utilities, and developer tools on Android.',
      link: PLAY_STORE_URL,
      btn: 'VIEW GOOGLE PLAY STORE APPS',
      gradient: 'from-gray-900 via-black to-lime-950/80',
      border: 'border-lime-500/50',
      textClr: 'text-lime-400',
      btnGrad: 'from-lime-400 to-cyan-400 text-black'
    }
  ];

  // Shuffle banner order randomly on refresh
  const [shuffledBanners, setShuffledBanners] = useState(allBanners);

  useEffect(() => {
    const shuffled = [...allBanners].sort(() => Math.random() - 0.5);
    setShuffledBanners(shuffled);
  }, []);

  return (
    <HUDPanel title="OFFICIAL REFERRAL PARTNERS & SHUFFLED PROMO BANNERS">
      <div className="p-6 space-y-6">
        <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
          Accelerate your Virtual Assistant career and online business with our official verified referral partners. Get exclusive discounts on web hosting, digital tools, AI voice generators, and mobile developer suites:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
          {shuffledBanners.map((item, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${item.gradient} border-2 ${item.border} rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold ${item.textClr} uppercase tracking-widest flex items-center space-x-1`}>
                    <Server className="w-4 h-4" />
                    <span>REFERRAL PARTNER</span>
                  </span>
                  <span className="bg-black/60 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-700">
                    {item.badge}
                  </span>
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-700">
                  <img src={item.img} alt={item.title} className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300" />
                </div>

                <h4 className="text-base font-black font-rajdhani text-white uppercase">
                  {item.title}
                </h4>

                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className={`w-full py-3 bg-gradient-to-r ${item.btnGrad} font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-2`}
              >
                <span>{item.btn}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </HUDPanel>
  );
};
export default AffiliateBanners;
