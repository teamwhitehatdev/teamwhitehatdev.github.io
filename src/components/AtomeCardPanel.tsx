import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AtomeCardPanel: React.FC = () => {
  const { getPublicPromoItems } = useApp();
  const promos = typeof getPublicPromoItems === 'function' ? getPublicPromoItems('promo') : [];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs select-none">
      {/* COMPACT PANEL HEADER: FEATURED PROMOS & ADS */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-slate-700" />
          <span>Featured Partner Ads</span>
        </span>
        <span className="bg-slate-100 text-slate-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-slate-200">
          Active ({promos.length})
        </span>
      </div>

      {/* CMS PROMOTIONS LIST */}
      <div className="space-y-4">
        {promos.length === 0 ? (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
            No active promos.
          </div>
        ) : (
          promos.map((ad) => (
            <div
              key={ad.id}
              className="bg-slate-50/70 border border-slate-200 hover:border-slate-400 rounded-2xl p-4 space-y-3 transition-all group"
            >
              {/* CLICKABLE PROMOTION IMAGE */}
              {ad.imageUrl && (
                <a
                  href={ad.destinationUrl}
                  target={ad.openNewTab !== false ? '_blank' : '_self'}
                  rel="sponsored noopener noreferrer"
                  className="block relative overflow-hidden rounded-xl border border-slate-200 max-h-48"
                >
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {ad.badge && (
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-white/95 text-slate-900 text-[10px] font-bold rounded-full border border-slate-200">
                      {ad.badge}
                    </span>
                  )}
                </a>
              )}

              {/* DETAILS */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-bold uppercase">{ad.promotionLabel || 'PARTNER REFERRAL'}</span>
                  {ad.badge && !ad.imageUrl && (
                    <span className="text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 font-semibold rounded-full">
                      {ad.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {ad.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {ad.description}
                </p>
              </div>

              {/* ACTION BUTTON */}
              <a
                href={ad.destinationUrl}
                target={ad.openNewTab !== false ? '_blank' : '_self'}
                rel="sponsored noopener noreferrer"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5"
              >
                <span>{ad.buttonText || 'Open Partner Link'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AtomeCardPanel;
