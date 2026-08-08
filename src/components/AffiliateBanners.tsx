import React from 'react';
import { ExternalLink, Tag, ShieldCheck, Gift, ArrowRight } from 'lucide-react';
import { AFFILIATE_LINKS } from '../utils/initialData';

export const AffiliateBanners: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-lime-400/10 border border-lime-400/30 px-3 py-1 rounded-full text-xs font-mono text-lime-400">
          <Gift className="w-3.5 h-3.5" />
          <span>EXCLUSIVE PARTNER REFERRAL OFFERS & DISCOUNTS</span>
        </div>
        <h2 className="text-2xl font-bold font-rajdhani text-white uppercase">
          RECOMMENDED TOOLS, HOSTING & CYBERSECURITY AFFILIATIONS
        </h2>
        <p className="text-xs text-gray-400 font-mono max-w-xl mx-auto">
          Support our work while getting exclusive discounts on top cloud VPS hosting, VPN security shields, 3D design platforms, and trading tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AFFILIATE_LINKS.map((item) => (
          <div
            key={item.id}
            className="bg-black/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-lime-400/50 transition-all flex flex-col justify-between group shadow-xl"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.bannerImage}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-lime-400 border border-lime-400/40">
                {item.discountText}
              </div>
              <div className="absolute top-3 right-3 bg-black/80 px-2.5 py-1 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30">
                {item.badge}
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-gray-400 uppercase">{item.category}</span>
                <h3 className="text-lg font-bold text-white font-rajdhani">{item.title}</h3>
                <p className="text-xs text-gray-300 font-mono leading-relaxed">{item.description}</p>
              </div>

              <a
                href={item.referralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-gradient-to-r from-lime-400 to-cyan-500 text-black font-bold font-rajdhani rounded-lg text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-lime-500/10"
              >
                <span>CLAIM REFERRAL DISCOUNT OFFER</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateBanners;
