import React, { useState, useEffect } from 'react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { HUDPanel } from './HUDPanel';

export const AffiliateBanners: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";

  const allBanners = [
    {
      title: 'GUMROAD TAX CENTER & PAYOUTS HUB',
      badge: 'NEW TAX DOCS',
      img: './media_1786678133861.png',
      desc: 'One place for all your Gumroad creator tax documents, 1099 forms, and direct bank payouts.',
      link: GUMROAD_LINK,
      btn: 'REGISTER NOW & SELL ON GUMROAD',
      gradient: 'from-gray-900 via-black to-pink-950/80',
      border: 'border-pink-500/50',
      textClr: 'text-pink-400',
      btnGrad: 'from-pink-400 to-purple-400 text-black'
    },
    {
      title: 'JINGSKETCH GUMROAD CREATOR STORY (1M+ ARTISTS)',
      badge: '1M+ CREATORS',
      img: './media_1786678133950.png',
      desc: 'Learn how digital product creators build global multi-million dollar audiences selling brush packs and VA kits on Gumroad.',
      link: GUMROAD_LINK,
      btn: 'REGISTER NOW & SELL YOUR PRODUCTS',
      gradient: 'from-gray-900 via-black to-purple-950/80',
      border: 'border-purple-500/50',
      textClr: 'text-purple-400',
      btnGrad: 'from-purple-400 to-cyan-400 text-black'
    },
    {
      title: 'KYLE T WEBSTER: DISNEY & PIXAR GUMROAD PARTNERSHIP',
      badge: 'DISNEY & ADOBE',
      img: './media_1786678134008.png',
      desc: 'How selling digital assets on Gumroad opened doors to global corporate partnerships with Pixar, Disney, and Adobe.',
      link: GUMROAD_LINK,
      btn: 'JOIN GUMROAD CREATOR NETWORK',
      gradient: 'from-gray-900 via-black to-blue-950/80',
      border: 'border-blue-500/50',
      textClr: 'text-blue-400',
      btnGrad: 'from-blue-400 to-cyan-400 text-black'
    },
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
    }
  ];

  const [shuffledBanners, setShuffledBanners] = useState(allBanners);

  useEffect(() => {
    const shuffled = [...allBanners].sort(() => Math.random() - 0.5);
    setShuffledBanners(shuffled);
  }, []);

  return (
    <HUDPanel title="🛍️ REGISTER NOW AND SELL YOUR DIGITAL PRODUCTS HERE">
      <div className="p-5 space-y-4">
        <p className="text-xs text-gray-300 font-sans leading-relaxed">
          Start selling your digital products, client contract templates, e-books, and Virtual Assistant services today:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
          {shuffledBanners.map((item, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${item.gradient} border-2 ${item.border} rounded-2xl p-4 space-y-3 shadow-xl flex flex-col justify-between`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold ${item.textClr} uppercase tracking-widest flex items-center space-x-1`}>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>GUMROAD CREATOR HUB</span>
                  </span>
                  <span className="bg-black/60 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-700">
                    {item.badge}
                  </span>
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-700">
                  <img src={item.img} alt={item.title} className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300" />
                </div>

                <h4 className="text-xs font-black font-rajdhani text-white uppercase">
                  {item.title}
                </h4>

                <p className="text-[11px] text-gray-300 font-sans leading-snug">
                  {item.desc}
                </p>
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className={`w-full py-2.5 bg-gradient-to-r ${item.btnGrad} font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-1.5`}
              >
                <span>{item.btn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </HUDPanel>
  );
};
export default AffiliateBanners;
