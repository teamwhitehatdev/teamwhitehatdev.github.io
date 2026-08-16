import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import { ALL_AFFILIATE_ADS, AffiliateAdItem } from '../data/affiliateAdsData';

export const DynamicAdsSidebar: React.FC = () => {
  const [sidebarAds, setSidebarAds] = useState<AffiliateAdItem[]>([]);

  const refreshAds = () => {
    const shuffled = [...ALL_AFFILIATE_ADS].sort(() => Math.random() - 0.5);
    const seenBrands = new Set<string>();
    const uniqueAds: AffiliateAdItem[] = [];

    for (const ad of shuffled) {
      const brandKey = ad.brand.toLowerCase().trim();
      if (!seenBrands.has(brandKey)) {
        seenBrands.add(brandKey);
        uniqueAds.push(ad);
      }
      if (uniqueAds.length >= 3) break;
    }

    setSidebarAds(uniqueAds);
  };

  useEffect(() => {
    refreshAds();
    const interval = setInterval(() => {
      refreshAds();
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 font-mono select-none">
      
      <div className="flex items-center justify-between bg-black/90 border border-cyan-500/40 p-3 rounded-2xl">
        <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-lime-400" />
          <span>IMPACT VERIFIED PARTNER BANNERS</span>
        </span>
        <button
          onClick={refreshAds}
          className="p-1.5 bg-gray-900 border border-gray-800 text-cyan-400 hover:text-lime-300 rounded-lg transition-all flex items-center space-x-1 text-[10px]"
          title="Refresh Deals"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>ROTATE BANNERS</span>
        </button>
      </div>

      <div className="space-y-4">
        {sidebarAds.map((ad) => (
          <div key={ad.id} className="bg-gradient-to-br from-gray-900 via-black to-cyan-950/90 border-2 border-cyan-500/40 rounded-2xl p-4 space-y-3 shadow-xl hover:border-cyan-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
                <ShoppingBag className="w-3 h-3" />
                <span>{ad.brand}</span>
              </span>
              <span className="bg-black/60 text-cyan-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-gray-800">
                {ad.badge}
              </span>
            </div>

            {/* CLICKABLE IMPACT AFFILIATE IMAGE BANNER */}
            <a
              href={ad.clickUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="block relative group rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-400 transition-all"
            >
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {ad.pixelUrl && <img src={ad.pixelUrl} width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }} alt="" />}
            </a>

            <h4 className="text-xs font-black font-rajdhani text-white uppercase leading-tight">
              {ad.title}
            </h4>

            <p className="text-[11px] text-gray-300 font-sans leading-snug">
              {ad.description}
            </p>

            <a
              href={ad.clickUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="w-full py-2 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-black font-rajdhani text-xs uppercase rounded-xl text-center shadow hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>CLAIM {ad.brand.toUpperCase()} DEAL &rarr;</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

    </div>
  );
};
export default DynamicAdsSidebar;
