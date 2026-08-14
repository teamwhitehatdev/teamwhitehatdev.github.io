import React, { useState, useEffect } from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { ALL_AFFILIATE_ADS, AffiliateAdItem } from '../data/affiliateAdsData';

interface DynamicAffiliateAdProps {
  category?: 'hardware' | 'creative' | 'education' | 'webdev' | 'security' | 'hosting';
  sizeType?: 'hero' | 'medium' | 'skyscraper' | 'banner' | 'square' | 'mobile';
  className?: string;
}

export const DynamicAffiliateAd: React.FC<DynamicAffiliateAdProps> = ({ category, sizeType, className = '' }) => {
  const [selectedAd, setSelectedAd] = useState<AffiliateAdItem | null>(null);

  useEffect(() => {
    let pool = ALL_AFFILIATE_ADS;
    if (category) {
      pool = pool.filter(a => a.category === category);
    }
    if (sizeType) {
      const sizePool = pool.filter(a => a.sizeType === sizeType);
      if (sizePool.length > 0) {
        pool = sizePool;
      }
    }
    if (pool.length === 0) {
      pool = ALL_AFFILIATE_ADS;
    }
    const randomItem = pool[Math.floor(Math.random() * pool.length)];
    setSelectedAd(randomItem);
  }, [category, sizeType]);

  if (!selectedAd) return null;

  return (
    <div className={`bg-gradient-to-br from-gray-900 via-black to-cyan-950/80 border-2 border-cyan-500/40 rounded-2xl p-4 shadow-xl flex flex-col justify-between hover:border-cyan-400 transition-all font-mono ${className}`}>
      
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest flex items-center space-x-1">
            <Tag className="w-3.5 h-3.5 text-lime-400" />
            <span>{selectedAd.brand} PARTNER</span>
          </span>
          <span className="bg-lime-500/20 text-lime-300 text-[9px] font-bold px-2 py-0.5 rounded border border-lime-500/50">
            {selectedAd.badge}
          </span>
        </div>

        {selectedAd.iframeUrl ? (
          <div className="rounded-xl overflow-hidden border border-gray-800 bg-black flex justify-center py-2">
            <iframe
              src={selectedAd.iframeUrl}
              width={Math.min(selectedAd.width, 320)}
              height={selectedAd.height}
              scrolling="no"
              frameBorder="0"
              className="max-w-full"
            />
          </div>
        ) : (
          <a href={selectedAd.clickUrl} target="_blank" rel="sponsored noopener noreferrer" className="block relative group overflow-hidden rounded-xl border border-gray-800">
            <img
              src={selectedAd.imageUrl}
              alt={selectedAd.title}
              className="w-full h-auto max-h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {selectedAd.pixelUrl && (
              <img
                src={selectedAd.pixelUrl}
                width="0"
                height="0"
                style={{ position: 'absolute', visibility: 'hidden' }}
                alt=""
              />
            )}
          </a>
        )}

        <h4 className="text-xs font-black font-rajdhani text-white uppercase leading-tight pt-1">
          {selectedAd.title}
        </h4>

        <p className="text-[11px] text-gray-300 font-sans leading-snug">
          {selectedAd.description}
        </p>
      </div>

      <a
        href={selectedAd.clickUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="w-full mt-3 py-2 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 text-black font-black font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
      >
        <span>CLAIM {selectedAd.brand.toUpperCase()} DEAL</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>

    </div>
  );
};
export default DynamicAffiliateAd;
