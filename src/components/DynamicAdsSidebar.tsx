import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DynamicAdsSidebar: React.FC = () => {
  const { getPublicPromoItems } = useApp();
  const partnerDeals = typeof getPublicPromoItems === 'function' ? getPublicPromoItems('partner-deals') : [];

  return (
    <div className="space-y-6 font-mono select-none">

      {/* SECTION HEADER: PARTNER DEALS */}
      <div className="flex items-center justify-between bg-black/90 border border-cyan-500/40 p-3 rounded-2xl">
        <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center space-x-1.5 font-orbitron">
          <Sparkles className="w-4 h-4 text-lime-400" />
          <span>PARTNER DEALS</span>
        </span>
        <span className="text-[10px] text-lime-400 font-bold bg-lime-500/20 px-2 py-0.5 rounded border border-lime-500/40">
          CMS MANAGED ({partnerDeals.length})
        </span>
      </div>

      {/* CMS PROMOTIONAL CARDS */}
      <div className="space-y-4">
        {partnerDeals.length === 0 ? (
          <div className="p-4 bg-black/60 border border-gray-800 rounded-xl text-center text-xs text-gray-500 font-mono">
            No partner deals configured.
          </div>
        ) : (
          partnerDeals.map((ad) => (
            <div
              key={ad.id}
              className="bg-black/90 border border-gray-800 hover:border-cyan-400/60 rounded-2xl p-4 space-y-3 shadow-lg transition-all group"
            >
              {/* IMAGE OR IMAGE URL */}
              {ad.imageUrl && (
                <a
                  href={ad.destinationUrl}
                  target={ad.openNewTab !== false ? '_blank' : '_self'}
                  rel="sponsored noopener noreferrer"
                  className="block relative overflow-hidden rounded-xl border border-gray-800 group-hover:border-cyan-400/60 transition-all max-h-48"
                >
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {ad.badge && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 text-lime-300 font-mono text-[9px] font-bold rounded border border-lime-400/40">
                      {ad.badge}
                    </span>
                  )}
                </a>
              )}

              {/* CARD DETAILS */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-400 font-bold uppercase">{ad.promotionLabel || 'PARTNER DEAL'}</span>
                  {ad.badge && !ad.imageUrl && (
                    <span className="text-lime-300 font-bold bg-lime-500/20 px-1.5 py-0.5 rounded">{ad.badge}</span>
                  )}
                </div>
                <h4 className="text-sm font-black font-rajdhani text-white uppercase leading-snug group-hover:text-cyan-300 transition-colors">
                  {ad.title}
                </h4>
                <p className="text-[11px] text-gray-400 font-sans leading-tight line-clamp-2">
                  {ad.description}
                </p>
              </div>

              {/* CTA LINK BUTTON */}
              <a
                href={ad.destinationUrl}
                target={ad.openNewTab !== false ? '_blank' : '_self'}
                rel="sponsored noopener noreferrer"
                className="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/40 text-cyan-300 font-bold font-orbitron text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow"
              >
                <span>{ad.buttonText || 'LEARN MORE'} &rarr;</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default DynamicAdsSidebar;
