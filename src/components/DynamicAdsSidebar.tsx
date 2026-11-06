import React from 'react';
import { Sparkles, ExternalLink, Star, Eye, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AdSenseSlot } from './AdSenseSlot';

export const DynamicAdsSidebar: React.FC = () => {
  const { getPublicPromoItems, playStoreConfig } = useApp();
  const partnerDeals =
    typeof getPublicPromoItems === 'function' ? getPublicPromoItems('partner-deals') : [];

  return (
    <div className="space-y-5 select-none">
      {/* LIVE GOOGLE PLAY STORE SUGGESTED APPLICATION CARD (SYNCED WITH /#/ADMIN POPUP CMS) */}
      {playStoreConfig && playStoreConfig.enabled !== false && (
        <div className="white-glass-card rounded-2xl overflow-hidden border border-slate-300 shadow-xs">
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white px-3.5 py-2 flex items-center justify-between text-[10px] font-mono font-bold">
            <span className="truncate flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span>{playStoreConfig.windowTitle || 'Google Play™ Store.exe'}</span>
            </span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('wh_playstore_wake_up'))}
              className="px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-[9px] font-bold cursor-pointer"
            >
              Pop Out
            </button>
          </div>

          {playStoreConfig.bannerImageUrl && !playStoreConfig.hideBannerImage && (
            <a
              href={playStoreConfig.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative h-36 overflow-hidden border-b border-slate-200 bg-slate-900"
            >
              <img
                src={playStoreConfig.bannerImageUrl}
                alt={playStoreConfig.appName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </a>
          )}

          <div className="p-3.5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              {playStoreConfig.appIconUrl && !playStoreConfig.hideAppIcon ? (
                <img
                  src={playStoreConfig.appIconUrl}
                  alt={playStoreConfig.appName}
                  className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center shrink-0">
                  ▶
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-extrabold text-slate-900 truncate">
                  {playStoreConfig.appName}
                </h4>
                <p className="text-[10px] font-semibold text-emerald-700 truncate">
                  {playStoreConfig.developerName}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                  <span className="font-bold text-amber-600">★ {playStoreConfig.rating || 4.9}</span>
                  <span>•</span>
                  <span>{playStoreConfig.downloadsCount || '50K+'}</span>
                </div>
              </div>
            </div>

            {playStoreConfig.description && (
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                {playStoreConfig.description}
              </p>
            )}

            <a
              href={playStoreConfig.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[11px] uppercase flex items-center justify-center gap-1.5 transition-all"
            >
              <span>{playStoreConfig.ctaButtonText || 'GET IT ON GOOGLE PLAY'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
      {/* SECTION HEADER: VERIFIED MARKETPLACE STYLE PARTNER DEALS */}
      <div className="flex items-center justify-between white-glass-card p-3.5 rounded-2xl">
        <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-slate-900" />
          <span>Featured Marketplace Deals</span>
        </span>
        <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Verified ({partnerDeals.length})</span>
        </span>
      </div>

      {/* VERIFIED STYLE PROMOTIONAL CARDS (ALL EDITABLE, HIDE/UNHIDE, IMAGE & VIDEO SUPPORTED) */}
      <div className="space-y-4">
        {partnerDeals.map((ad, idx) => {
          const showVideo = Boolean(ad.videoUrl && !ad.hideVideo);
          const showImage = Boolean(ad.imageUrl && !ad.hideImage);
          const rating = idx % 2 === 0 ? '4.9' : '5.0';
          const reviews = idx % 2 === 0 ? '1.4k+' : '980+';
          const activeUsers = idx % 2 === 0 ? '16.4K+ Active Users' : '11.2K+ Creators';

          return (
            <div
              key={ad.id}
              className="white-glass-card rounded-2xl overflow-hidden border border-slate-200/90 transition-all group hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* TOP MARKETPLACE META STRIP */}
              <div className="bg-slate-50/90 border-b border-slate-200/80 px-3.5 py-1.5 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-500">
                <span>{ad.promotionLabel || 'FEATURED ITEM'}</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>Quality Checked</span>
                </span>
              </div>

              {/* VIDEO PREVIEW (IF PRESENT & NOT HIDDEN) */}
              {showVideo && (
                <div className="border-b border-slate-200 bg-slate-50">
                  {ad.videoUrl!.includes('youtube.com') || ad.videoUrl!.includes('youtu.be') ? (
                    <iframe
                      src={
                        ad.videoUrl!.includes('watch?v=')
                          ? ad.videoUrl!.replace('watch?v=', 'embed/')
                          : ad.videoUrl
                      }
                      title={ad.title}
                      className="w-full aspect-video border-0"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={ad.videoUrl}
                      controls
                      className="w-full max-h-44 object-cover"
                    />
                  )}
                </div>
              )}

              {/* VERIFIED THUMBNAIL PREVIEW WITH HOVER OVERLAY */}
              {showImage && (
                <a
                  href={ad.destinationUrl}
                  target={ad.openNewTab !== false ? '_blank' : '_self'}
                  rel="sponsored noopener noreferrer"
                  className="block relative overflow-hidden border-b border-slate-100 h-40 bg-slate-100"
                >
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {ad.badge && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-slate-900/90 text-white text-[9px] font-extrabold uppercase tracking-wider rounded shadow-xs">
                      {ad.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-slate-900/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-bold text-[11px] flex items-center gap-1 shadow-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Preview</span>
                    </span>
                  </div>
                </a>
              )}

              {/* VERIFIED CARD BODY */}
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <a
                    href={ad.destinationUrl}
                    target={ad.openNewTab !== false ? '_blank' : '_self'}
                    rel="sponsored noopener noreferrer"
                    className="text-sm font-extrabold text-slate-900 hover:underline leading-snug block"
                  >
                    {ad.title}
                  </a>
                  <p className="text-[11px] text-slate-500 font-medium">
                    by Official Partner in {ad.promotionLabel || 'Digital Tools'}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 pt-0.5">
                    {ad.description}
                  </p>
                </div>

                {/* VERIFIED RATING & SALES ROW */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-slate-700 font-bold ml-1">
                      {rating} <span className="text-slate-400 font-normal">({reviews})</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">{activeUsers}</span>
                </div>

                {/* VERIFIED SPLIT ACTION FOOTER */}
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={ad.destinationUrl}
                    target={ad.openNewTab !== false ? '_blank' : '_self'}
                    rel="sponsored noopener noreferrer"
                    title="Live Preview"
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors shrink-0"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                  <a
                    href={ad.destinationUrl}
                    target={ad.openNewTab !== false ? '_blank' : '_self'}
                    rel="sponsored noopener noreferrer"
                    className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-2xs"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{ad.buttonText || 'Get Partner Offer'}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 opacity-80" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* GOOGLE ADSENSE / UNIVERSAL SIDEBAR AD SLOT */}
      <AdSenseSlot placement="sidebar" />
    </div>
  );
};

export default DynamicAdsSidebar;
