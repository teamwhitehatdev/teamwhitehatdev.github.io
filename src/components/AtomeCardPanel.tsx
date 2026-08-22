import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AtomeCardPanel: React.FC = () => {
  const { getPublicPromoItems } = useApp();
  const promos = typeof getPublicPromoItems === 'function' ? getPublicPromoItems('promo') : [];

  return (
    <div className="bg-gradient-to-b from-yellow-950/40 via-black to-cyan-950/50 border-2 border-yellow-400/60 rounded-3xl p-5 space-y-4 shadow-2xl font-mono select-none">

      {/* COMPACT PANEL HEADER: PROMO */}
      <div className="flex items-center justify-between border-b border-yellow-400/30 pb-3">
        <span className="text-xs font-bold text-yellow-300 uppercase tracking-widest flex items-center space-x-1.5 font-orbitron">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span>PROMO</span>
        </span>
        <span className="bg-yellow-400/20 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-400/40">
          FEATURED ({promos.length})
        </span>
      </div>

      {/* CMS PROMOTIONS LIST */}
      <div className="space-y-4">
        {promos.length === 0 ? (
          <div className="p-4 bg-black/80 border border-yellow-400/30 rounded-xl text-center text-xs text-yellow-300 font-mono">
            No active promos.
          </div>
        ) : (
          promos.map((ad) => (
            <div
              key={ad.id}
              className="bg-black/90 border border-yellow-400/40 hover:border-yellow-400 rounded-2xl p-4 space-y-3 shadow-lg transition-all group"
            >
              {/* CLICKABLE PROMOTION IMAGE */}
              {ad.imageUrl && (
                <a
                  href={ad.destinationUrl}
                  target={ad.openNewTab !== false ? '_blank' : '_self'}
                  rel="sponsored noopener noreferrer"
                  className="block relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-yellow-400 transition-all max-h-52"
                >
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {ad.badge && (
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-yellow-400 text-black font-mono text-[10px] font-black rounded shadow">
                      {ad.badge}
                    </span>
                  )}
                </a>
              )}

              {/* DETAILS */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-yellow-300 font-bold uppercase">{ad.promotionLabel || 'SPECIAL PROMO'}</span>
                  {ad.badge && !ad.imageUrl && (
                    <span className="text-black bg-yellow-400 px-2 py-0.5 font-bold rounded">{ad.badge}</span>
                  )}
                </div>

                <h4 className="text-sm font-black font-rajdhani text-white uppercase leading-snug group-hover:text-yellow-300 transition-colors">
                  {ad.title}
                </h4>

                <p className="text-[11px] text-gray-300 font-sans leading-relaxed line-clamp-3">
                  {ad.description}
                </p>
              </div>

              {/* ACTION BUTTON */}
              <a
                href={ad.destinationUrl}
                target={ad.openNewTab !== false ? '_blank' : '_self'}
                rel="sponsored noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black font-black font-orbitron text-xs uppercase rounded-xl hover:scale-105 transition-all flex items-center justify-center space-x-1.5 shadow-lg"
              >
                <span>{ad.buttonText || 'CLAIM PROMO'} &rarr;</span>
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
