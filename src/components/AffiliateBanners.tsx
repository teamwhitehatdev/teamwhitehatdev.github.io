import React, { useState, useEffect } from 'react';
import { ExternalLink, ShoppingBag, RefreshCw, Sparkles } from 'lucide-react';
import { HUDPanel } from './HUDPanel';
import { ALL_AFFILIATE_ADS, AffiliateAdItem } from '../data/affiliateAdsData';

export const AffiliateBanners: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSizeType, setActiveSizeType] = useState<string>('all');
  const [displayAds, setDisplayAds] = useState<AffiliateAdItem[]>([]);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  const shuffleAndFilterAds = () => {
    let pool = ALL_AFFILIATE_ADS;
    if (activeCategory !== 'all') {
      pool = pool.filter(a => a.category === activeCategory);
    }
    if (activeSizeType !== 'all') {
      pool = pool.filter(a => a.sizeType === activeSizeType);
    }
    if (pool.length === 0) {
      pool = ALL_AFFILIATE_ADS;
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setDisplayAds(shuffled.slice(0, 6));
  };

  useEffect(() => {
    shuffleAndFilterAds();
  }, [activeCategory, activeSizeType]);

  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      shuffleAndFilterAds();
    }, 10000);
    return () => clearInterval(interval);
  }, [activeCategory, activeSizeType, isAutoRotating]);

  return (
    <HUDPanel title="🛍️ VERIFIED IMPACT.COM AFFILIATE SHOWCASE — CATEGORIZED & SIZED DEALS">
      <div className="p-5 space-y-6 font-mono">
        
        {/* Header & Controls */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-lime-400 animate-pulse" />
              <p className="text-xs text-gray-200 font-sans leading-relaxed">
                Featured Partner Deals for Virtual Assistants, Freelancers, and Digital Agencies. Auto-rotates live every 10s:
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all border ${
                  isAutoRotating 
                    ? 'bg-lime-500/20 text-lime-300 border-lime-500/50' 
                    : 'bg-gray-900 text-gray-400 border-gray-800'
                }`}
              >
                {isAutoRotating ? '⚡ AUTO-ROTATE ON' : 'PAUSED'}
              </button>

              <button
                onClick={shuffleAndFilterAds}
                className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:text-white rounded-lg text-[10px] font-bold uppercase transition-all flex items-center space-x-1"
                title="Shuffle Deals"
              >
                <RefreshCw className="w-3 h-3" />
                <span>SHUFFLE DEALS</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              1. FILTER BY AD CATEGORY:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'ALL CATEGORIES' },
                { id: 'hardware', label: '💻 Laptops & Hardware' },
                { id: 'creative', label: '🎬 Video & Graphic Design' },
                { id: 'education', label: '🎓 Certifications & Tech' },
                { id: 'security', label: '🛡️ VPN & Security' },
                { id: 'webdev', label: '🌐 Web Templates & Code' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    activeCategory === cat.id
                      ? 'bg-cyan-400 text-black shadow-md font-extrabold'
                      : 'bg-gray-900 border border-gray-800 text-gray-300 hover:border-cyan-500/40 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Category Tabs */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              2. FILTER BY AD DIMENSION SIZE:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'ALL SIZES' },
                { id: 'hero', label: '🦸 Hero Banners (1200x628 / 2400x600)' },
                { id: 'skyscraper', label: '🏢 Skyscraper Ads (300x600 / 600x1200)' },
                { id: 'square', label: '🔲 Square & Medium (1080x1080 / 300x300)' },
                { id: 'banner', label: '📏 Standard Leaderboards (728x90)' }
              ].map((sz) => (
                <button
                  key={sz.id}
                  onClick={() => setActiveSizeType(sz.id)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    activeSizeType === sz.id
                      ? 'bg-purple-500 text-white shadow-md font-extrabold'
                      : 'bg-gray-900 border border-gray-800 text-gray-300 hover:border-purple-500/40 hover:text-white'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ads Showcase Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayAds.map((item) => (
            <div key={item.id} className="bg-gradient-to-br from-gray-900 via-black to-cyan-950/80 border-2 border-cyan-500/50 rounded-2xl p-4 space-y-3 shadow-xl flex flex-col justify-between hover:border-cyan-400 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-pink-400 uppercase tracking-widest flex items-center space-x-1">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{item.brand.toUpperCase()}</span>
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="bg-purple-950/80 text-purple-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-purple-800 uppercase">
                      {item.sizeType} ({item.width}x{item.height})
                    </span>
                    <span className="bg-black/60 text-lime-300 text-[9px] font-bold px-2 py-0.5 rounded border border-gray-700">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {item.iframeUrl ? (
                  <div className="rounded-xl overflow-hidden border border-gray-700 bg-black flex justify-center py-2">
                    <iframe src={item.iframeUrl} width="100%" height={item.height} scrolling="no" frameBorder="0" />
                  </div>
                ) : (
                  <div className="rounded-xl overflow-hidden border border-gray-700 relative group">
                    <a href={item.clickUrl} target="_blank" rel="sponsored noopener noreferrer">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
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
                <span>CLAIM {item.brand.toUpperCase()} EXCLUSIVE OFFER</span>
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
