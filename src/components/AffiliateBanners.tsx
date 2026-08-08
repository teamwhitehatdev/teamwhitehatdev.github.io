import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { AFFILIATE_LINKS } from '../utils/initialData';

export const AffiliateBanners: React.FC = () => {
  return (
    <div className="space-y-4 font-mono">
      <div className="space-y-1">
        <h3 className="text-base font-bold font-rajdhani text-white uppercase tracking-wider flex items-center space-x-2">
          <Tag className="w-4 h-4 text-lime-400" />
          <span>AFFILIATES & PARTNERS</span>
        </h3>
        <p className="text-[11px] text-gray-400">
          Exclusive discounts on cloud hosting, security VPNs, design assets & trading tools.
        </p>
      </div>

      <div className="space-y-4">
        {AFFILIATE_LINKS.map((item) => (
          <div
            key={item.id}
            className="bg-black/60 border border-gray-800/80 rounded-xl overflow-hidden hover:border-lime-400/50 transition-all group shadow-lg"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={item.bannerImage}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] text-lime-400 border border-lime-400/40">
                {item.discountText}
              </div>
            </div>

            <div className="p-3.5 space-y-2">
              <h4 className="text-sm font-bold text-white font-rajdhani leading-snug">{item.title}</h4>
              <p className="text-[11px] text-gray-400 leading-normal line-clamp-2">{item.description}</p>

              <a
                href={item.referralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-1 py-2 bg-lime-400/10 border border-lime-400/30 text-lime-400 font-bold rounded text-[11px] uppercase hover:bg-lime-400 hover:text-black transition-all flex items-center justify-center space-x-1"
              >
                <span>CLAIM REFERRAL DEAL</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateBanners;
