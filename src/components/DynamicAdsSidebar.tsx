import React from 'react';
import { Sparkles, ExternalLink, Box } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MESHY_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';

export const DynamicAdsSidebar: React.FC = () => {
  const { getPublicPromoItems } = useApp();
  const partnerDeals = typeof getPublicPromoItems === 'function' ? getPublicPromoItems('partner-deals') : [];

  return (
    <div className="space-y-5 select-none">
      {/* SECTION HEADER: PARTNER DEALS & ADS */}
      <div className="flex items-center justify-between bg-white border border-slate-200 p-3.5 rounded-2xl">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-slate-700" />
          <span>Featured Tools &amp; Partner Deals</span>
        </span>
        <span className="text-[10px] text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
          Verified ({partnerDeals.length})
        </span>
      </div>

      {/* PINNED MESHY AI 3D GENERATOR REFERRAL AD CARD */}
      <div className="bg-white border border-slate-300 hover:border-slate-900 rounded-2xl p-4 space-y-3 shadow-xs transition-all group">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-slate-800 font-bold uppercase flex items-center gap-1">
            <Box className="w-3.5 h-3.5 text-slate-900" />
            <span>FEATURED AI 3D REFERRAL</span>
          </span>
          <span className="px-2 py-0.5 bg-slate-900 text-white font-semibold rounded-full text-[9px]">
            FREE CREDITS
          </span>
        </div>

        <a
          href={MESHY_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="block relative overflow-hidden rounded-xl border border-slate-200 max-h-44"
        >
          <img
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80"
            alt="AI 3D Model Generator: Create 3D from Text & Images | Meshy"
            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 leading-snug">
            AI 3D Model Generator: Create 3D from Text &amp; Images | Meshy
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generate textured 3D assets, game-ready models, and product renders from text prompts or photos in seconds.
          </p>
        </div>

        <a
          href={MESHY_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5"
        >
          <span>Try Meshy AI 3D Generator Free</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* CMS PROMOTIONAL CARDS */}
      <div className="space-y-4">
        {partnerDeals
          .filter((ad) => ad.id !== 'deal-meshy-ai-3d-1')
          .map((ad) => (
            <div
              key={ad.id}
              className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-4 space-y-3 shadow-xs transition-all group"
            >
              {ad.imageUrl && (
                <a
                  href={ad.destinationUrl}
                  target={ad.openNewTab !== false ? '_blank' : '_self'}
                  rel="sponsored noopener noreferrer"
                  className="block relative overflow-hidden rounded-xl border border-slate-100 max-h-44"
                >
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {ad.badge && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-white/95 text-slate-900 text-[10px] font-bold rounded-full border border-slate-200">
                      {ad.badge}
                    </span>
                  )}
                </a>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-bold uppercase">{ad.promotionLabel || 'PARTNER DEAL'}</span>
                  {ad.badge && !ad.imageUrl && (
                    <span className="text-slate-800 font-semibold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                      {ad.badge}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {ad.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {ad.description}
                </p>
              </div>

              <a
                href={ad.destinationUrl}
                target={ad.openNewTab !== false ? '_blank' : '_self'}
                rel="sponsored noopener noreferrer"
                className="w-full py-2 bg-slate-100 hover:bg-slate-900 text-slate-900 hover:text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 border border-slate-200"
              >
                <span>{ad.buttonText || 'Explore Partner Offer'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DynamicAdsSidebar;
