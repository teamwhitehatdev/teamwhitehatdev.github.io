import React, { useState, useEffect } from 'react';
import { ExternalLink, ShoppingBag, Grid, RefreshCw } from 'lucide-react';
import { HUDPanel } from './HUDPanel';
import { ALL_AFFILIATE_ADS, AffiliateAdItem } from '../data/affiliateAdsData';

export const AffiliateBanners: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [displayAds, setDisplayAds] = useState<AffiliateAdItem[]>([]);

  useEffect(() => {
    let pool = ALL_AFFILIATE_ADS;
    if (activeCategory !== 'all') {
      pool = pool.filter(a => a.category === activeCategory);
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setDisplayAds(shuffled.slice(0, 6));
  }, [activeCategory]);

  return (
    <HUDPanel title="🛍️ REGISTER NOW AND ACCESS VERIFIED AFFILIATE DEALS">
      <div className="p-5 space-y-5 font-mono">
        
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Every browser refresh randomly displays verified partner deals across Hardware, Video Editing, Security, and Coursera Certifications:
          </p>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'ALL DEALS' },
              { id: 'hardware', label: '💻 Laptops & Tech' },
              { id: 'creative', label: '🎬 Video & Art' },
              { id: 'education', label: '🎓 Certifications' },
              { id: 'security', label: '🛡️ VPN Security' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-400 text-black shadow-md'
                    : 'bg-gray-900 border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayAds.map((item) => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 via-black to-cyan-950/80 border-2 border-cyan-500/50 rounded-2xl p-4 space-y-3 shadow-xl flex flex-col justify-between hover:border-cyan-400 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-pink-400 uppercase tracking-widest flex items-center space-x-1">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{item.brand.toUpperCase()}</span>
                  </span>
                  <span className="bg-black/60 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-700">
                    {item.badge}
                  </span>
                </div>

                {item.iframeUrl ? (
                  <div className="rounded-xl overflow-hidden border border-gray-700 bg-black flex justify-center py-2">
                    <iframe src={item.iframeUrl} width="100%" height={item.height} scrolling="no" frameBorder="0" />
                  </div>
                ) : (
                  <div className="rounded-xl overflow-hidden border border-gray-700 relative group">
                    <a href={item.clickUrl} target="_blank" rel="sponsored noopener noreferrer">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                      {item.pixelUrl && <img src={item.pixelUrl} width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }} alt="" />}
                    </a>
                  </div>
                )}

                <h4 className="text-xs font-black font-rajdhani text-white uppercase leading-tight pt-1">
                  {item.title}
                </h4>

                <p className="text-[11px] text-gray-300 font-sans leading-snug">
                  {item.description}
                </p>
              </div>

              <a
                href={item.clickUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full py-2.5 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 text-black font-black font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
              >
                <span>CLAIM {item.brand.toUpperCase()} OFFER</span>
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
