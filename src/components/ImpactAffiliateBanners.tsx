import React from 'react';
import { ExternalLink, Sparkles, ShoppingBag } from 'lucide-react';
import { ALL_AFFILIATE_ADS } from '../data/affiliateAdsData';

export const ImpactAffiliateBanners: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-cyan-950/80 border-2 border-cyan-500/50 rounded-3xl p-6 space-y-6 shadow-2xl font-mono select-none">
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-lime-400 uppercase tracking-widest flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-lime-400 animate-pulse" />
            <span>VERIFIED IMPACT AFFILIATE PARTNER BANNERS</span>
          </span>
          <h3 className="text-xl font-black font-rajdhani text-white uppercase tracking-wider">
            HIGH-CONVERTING PARTNER DEALS &amp; SOFTWARE DISCOUNTS
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ALL_AFFILIATE_ADS.map((ad) => (
          <div key={ad.id} className="bg-black/90 border border-gray-800 rounded-2xl p-4 space-y-3 hover:border-cyan-400 transition-all flex flex-col justify-between group shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-lime-400 uppercase flex items-center space-x-1">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{ad.brand}</span>
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/40">
                  {ad.badge}
                </span>
              </div>

              <a
                href={ad.clickUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="block relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-cyan-400 transition-all"
              >
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {ad.pixelUrl && <img src={ad.pixelUrl} width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }} alt="" />}
              </a>

              <h4 className="text-sm font-black font-rajdhani text-white uppercase leading-snug">
                {ad.title}
              </h4>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                {ad.description}
              </p>
            </div>

            <a
              href={ad.clickUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="w-full py-2.5 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1.5 mt-2"
            >
              <span>CLAIM {ad.brand.toUpperCase()} DISCOUNT &rarr;</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImpactAffiliateBanners;
