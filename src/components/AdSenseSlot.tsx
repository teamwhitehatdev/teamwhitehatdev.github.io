import React, { useEffect } from 'react';
import { ExternalLink, Star, ShoppingCart, Eye, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface AdSenseSlotProps {
  placement: 'header' | 'in-article' | 'sidebar' | 'footer';
  className?: string;
}

const THEMEFOREST_FEATURED_ADS = [
  {
    id: 'tf-hostinger-pro',
    title: 'Hostinger Cloud & WordPress Business Hosting — AI Website Builder Suite',
    vendor: 'by Hostinger International in Web Hosting & Cloud',
    category: 'WEB HOSTING & CLOUD',
    rating: '4.9',
    reviews: '2.4k+',
    sales: '29.5K+ Active Sites',
    priceBadge: 'UP TO 75% OFF',
    subPrice: 'Free Domain + SSL',
    badge: 'BESTSELLER',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    url: 'https://hostinger.ph?REFERRALCODE=1JOMAR46',
    features: ['99.9% Uptime SLA', 'NVMe SSD Speed', '24/7 Live Support']
  },
  {
    id: 'tf-meshy-3d',
    title: 'Meshy 3D AI Studio — Text & Image to PBR 3D Asset Generator Pipeline',
    vendor: 'by Meshy AI Labs in 3D Generative AI Tools',
    category: '3D AI & GAME ASSETS',
    rating: '5.0',
    reviews: '1.8k+',
    sales: '18.2K+ Creators',
    priceBadge: 'FREE TIER',
    subPrice: 'Instant 3D Export',
    badge: 'TRENDING #1',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=80',
    url: 'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends',
    features: ['Text-to-3D Mesh', 'Blender & Unity Ready', '4K PBR Textures']
  },
  {
    id: 'tf-elevenlabs-voice',
    title: 'ElevenLabs Prime Voice AI — Ultra-Realistic Multilingual Dubbing & Cloning',
    vendor: 'by ElevenLabs Audio in AI Voice & Media',
    category: 'AI VOICE & AUDIO',
    rating: '4.9',
    reviews: '3.1k+',
    sales: '41.0K+ Studios',
    priceBadge: 'FREE START',
    subPrice: '29+ Languages',
    badge: 'STAFF PICK',
    image:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80',
    url: 'https://try.elevenlabs.io/097539247221',
    features: ['Studio Voice Cloning', 'Automated Dubbing', 'Commercial License']
  }
];

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({ placement, className = '' }) => {
  const { adSenseConfig, promoItems } = useApp();

  const slotId =
    placement === 'header'
      ? adSenseConfig.headerSlotId
      : placement === 'in-article'
      ? adSenseConfig.inArticleSlotId
      : placement === 'sidebar'
      ? adSenseConfig.sidebarSlotId
      : adSenseConfig.footerSlotId;

  const hasLiveAdSense =
    adSenseConfig.enabled &&
    adSenseConfig.publisherId &&
    adSenseConfig.publisherId.startsWith('ca-pub-') &&
    adSenseConfig.publisherId !== 'ca-pub-0000000000000000' &&
    Boolean(slotId.trim());

  useEffect(() => {
    if (hasLiveAdSense && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // ignore adsbygoogle duplicate push in SPA transitions
      }
    }
  }, [hasLiveAdSense, placement, slotId]);

  if (!adSenseConfig.enabled) {
    return null;
  }

  // 1. LIVE GOOGLE ADSENSE DISPLAY UNIT (WHEN PUBLISHER ID & SLOT ID ARE SET)
  if (hasLiveAdSense) {
    return (
      <div
        className={`white-glass-card rounded-2xl p-3 text-center overflow-hidden my-4 ${className}`}
        aria-label="Advertisement"
      >
        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center justify-center gap-1">
          <span>Sponsored Advertisement</span>
          <span>•</span>
          <span>Google AdSense</span>
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adSenseConfig.publisherId.trim()}
          data-ad-slot={slotId.trim()}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // 2. CUSTOM AD NETWORK SCRIPT / HTML FALLBACK
  if (adSenseConfig.customAdScriptHtml && adSenseConfig.customAdScriptHtml.trim() !== '') {
    return (
      <div
        className={`white-glass-card rounded-2xl p-3 text-center overflow-hidden my-4 ${className}`}
        aria-label="Sponsored Advertisement"
      >
        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
          Sponsored Partner Network
        </div>
        <div
          className="text-xs text-slate-700 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: adSenseConfig.customAdScriptHtml }}
        />
      </div>
    );
  }

  // 3. THEMEFOREST MARKETPLACE STYLE SPONSORED CARDS (WHEN PARTNER FALLBACK IS ENABLED)
  if (!adSenseConfig.showPartnerFallbackAds) {
    return null;
  }

  // Pick item based on placement so each slot shows a distinct ThemeForest-style item
  const fallbackIndex =
    placement === 'header' ? 0 : placement === 'in-article' ? 1 : placement === 'footer' ? 2 : 0;
  const tfItem = THEMEFOREST_FEATURED_ADS[fallbackIndex % THEMEFOREST_FEATURED_ADS.length];

  // Also check if admin has custom visible promo items
  const visiblePromos = (promoItems || []).filter((p) => p.visible !== false);
  const customPromo = visiblePromos[fallbackIndex % Math.max(1, visiblePromos.length)];

  const displayTitle = customPromo?.title || tfItem.title;
  const displayImage =
    customPromo && !customPromo.hideImage && customPromo.imageUrl
      ? customPromo.imageUrl
      : tfItem.image;
  const displayUrl = customPromo?.destinationUrl || tfItem.url;
  const displayBadge = customPromo?.badge || tfItem.badge;
  const displayCategory = customPromo?.promotionLabel || tfItem.category;

  return (
    <div
      className={`themeforest-card overflow-hidden my-4 ${className}`}
    >
      {/* TOP MARKETPLACE BAR */}
      <div className="bg-slate-50/90 border-b border-slate-200/80 px-4 py-2 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>ThemeForest Marketplace Partner • {displayCategory}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="themeforest-badge-green">
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified Theme / Item</span>
          </span>
          <span className="text-slate-400 font-bold uppercase text-[9px]">Google AdSense Ready</span>
        </div>
      </div>

      {/* THEMEFOREST HORIZONTAL MARKETPLACE BODY */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
        {/* PREVIEW THUMBNAIL WITH HOVER OVERLAY */}
        <a
          href={displayUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="relative w-full md:w-56 h-36 md:h-32 rounded-xl overflow-hidden border border-slate-200 shrink-0 group bg-slate-100 block"
        >
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[9px] font-extrabold uppercase tracking-wider">
            {displayBadge}
          </span>
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-bold text-[11px] flex items-center gap-1 shadow-sm">
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </span>
          </div>
        </a>

        {/* MIDDLE ITEM METADATA (THEMEFOREST STYLE) */}
        <div className="flex-1 space-y-2 min-w-0">
          <div>
            <a
              href={displayUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="text-sm sm:text-base font-extrabold text-slate-900 hover:underline leading-snug block"
            >
              {displayTitle}
            </a>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">{tfItem.vendor}</p>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {customPromo?.description ||
              'Production-ready digital toolkit trusted by remote Virtual Assistants, full-stack developers, and digital agencies worldwide.'}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {tfItem.features.map((feat, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md"
              >
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT PRICE, RATING & SPLIT ACTION BOX (THEMEFOREST MARKETPLACE COLUMN) */}
        <div className="md:border-l border-slate-200 md:pl-6 flex flex-row md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0">
          <div className="text-left md:text-right space-y-0.5">
            <div className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {tfItem.priceBadge}
            </div>
            <div className="flex items-center md:justify-end gap-1 text-amber-500 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-slate-700 text-[11px] ml-0.5">
                {tfItem.rating} ({tfItem.reviews})
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-semibold">{tfItem.sales}</div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={displayUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              title="Live Preview"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </a>
            <a
              href={displayUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all whitespace-nowrap"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{customPromo?.buttonText || 'Get Offer →'}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSenseSlot;
