import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  X,
  SkipForward,
  Sparkles,
  Clock,
  ShieldCheck,
  Radio,
  Tag,
  ShoppingBag
} from 'lucide-react';

export const SEEED_STUDIO_REFERRAL_URL =
  'https://www.seeedstudio.com/Wio-Tracker-L2-Pro-for-Meshtastic-p-0000.html?sensecap_affiliate=LF0tCxl&referring_service=link';
export const SEEED_STUDIO_IMAGE_URL = './seeedstudio_affiliate_1200x628.jpg';
export const SEEED_STUDIO_HEADLINE = 'Wio Tracker L2 Pro for Meshtastic';
export const SEEED_STUDIO_PROMO_NAME = 'Black Friday & Thanksgiving Promo';

/**
 * Center Pop-Out Windows Frame Ad for Seeed Studio:
 * - Headline Title: Wio Tracker L2 Pro for Meshtastic
 * - Name: Black Friday & Thanksgiving Promo
 * - Image: ./seeedstudio_affiliate_1200x628.jpg (1200x628)
 * - Referral Link: https://www.seeedstudio.com/Wio-Tracker-L2-Pro-for-Meshtastic-p-0000.html?sensecap_affiliate=LF0tCxl&referring_service=link
 * - Automatically closes/hides after 10 seconds
 * - Includes explicit "SKIP ADS" and "CLOSE ADS" buttons for visitors on any device
 */
export const SeeedStudioPopupModal: React.FC = () => {
  const DURATION_SECONDS = 10;
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(DURATION_SECONDS);

  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Open center pop-out window shortly after page load
  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpen(true);
      setIsFadingOut(false);
      setRemainingSeconds(DURATION_SECONDS);
    }, 600);

    const handleReopen = () => {
      setIsOpen(true);
      setIsFadingOut(false);
      setRemainingSeconds(DURATION_SECONDS);
    };

    window.addEventListener('wh_seeedstudio_popup_open', handleReopen);
    return () => {
      clearTimeout(openTimer);
      window.removeEventListener('wh_seeedstudio_popup_open', handleReopen);
    };
  }, []);

  // 10-Second Auto-Close / Hide Timer
  useEffect(() => {
    if (!isOpen || isFadingOut) {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
      return;
    }

    countdownIntervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    autoCloseTimeoutRef.current = setTimeout(() => {
      handleDismiss();
    }, DURATION_SECONDS * 1000);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
    };
  }, [isOpen]);

  const handleDismiss = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
    setIsFadingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsFadingOut(false);
    }, 320);
  };

  if (!isOpen) return null;

  const progressPercent = Math.max(0, Math.min(100, (remainingSeconds / DURATION_SECONDS) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${SEEED_STUDIO_HEADLINE} - ${SEEED_STUDIO_PROMO_NAME}`}
      onClick={handleDismiss}
      className={`fixed inset-0 z-[9985] flex items-center justify-center p-3 sm:p-5 bg-slate-950/65 backdrop-blur-xs transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* CENTER POP-OUT WINDOWS FRAME (RESPONSIVE ACROSS ALL MOBILE, TABLET & DESKTOP DEVICES) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-xl bg-white border-2 border-slate-900 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_-15px_rgba(15,23,42,0.65)] overflow-hidden transition-all duration-300 ${
          isFadingOut ? 'scale-95 translate-y-2' : 'scale-100 translate-y-0'
        }`}
      >
        {/* ================================================================= */}
        {/* WINDOWS POP-OUT FRAME TOP TITLE BAR                               */}
        {/* ================================================================= */}
        <header className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white px-3.5 sm:px-5 py-2.5 flex items-center justify-between gap-2 border-b border-slate-800 select-none">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            </div>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-slate-200 truncate">
              SeeedStudio_Promo_Window.exe — Sponsored Ad
            </span>
          </div>

          {/* Right Header Controls: 10s Countdown Only (No duplicate close/skip buttons) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span
              title={`Automatically closes in ${remainingSeconds} seconds`}
              className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1"
            >
              <Clock className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>Auto-Close: {remainingSeconds}s</span>
            </span>
          </div>

          {/* 10-Second Auto-Close Progress Bar */}
          <div
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </header>

        {/* ================================================================= */}
        {/* POP-OUT WINDOW CONTENT BODY                                       */}
        {/* ================================================================= */}
        <div className="p-4 sm:p-6 space-y-4 bg-white text-slate-900 max-h-[85vh] overflow-y-auto">
          {/* Promo Name & Verified Partner Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-900 text-[11px] font-extrabold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>{SEEED_STUDIO_PROMO_NAME}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Official Seeed Studio Referral (LF0tCxl)</span>
            </span>
          </div>

          {/* Headline Title */}
          <div className="space-y-1">
            <h2 className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
              {SEEED_STUDIO_HEADLINE}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Shop Early &amp; Save Big on Seeed Studio Meshtastic LoRa Trackers, SenseCAP IoT Hardware, reTerminal Displays &amp; Edge AI Robotics!
            </p>
          </div>

          {/* Clickable 1200x628 Attached Banner Image */}
          <a
            href={SEEED_STUDIO_REFERRAL_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="block relative rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-orange-500 transition-all group shadow-sm bg-slate-950"
          >
            <img
              src={SEEED_STUDIO_IMAGE_URL}
              alt={`${SEEED_STUDIO_HEADLINE} — ${SEEED_STUDIO_PROMO_NAME}`}
              className="w-full aspect-[1200/628] object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-slate-950/90 text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-md border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Save Now at Seeed Studio →</span>
            </div>
          </a>

          {/* Highlights Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-semibold text-slate-700">
            <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>Meshtastic LoRa GPS Node</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Doorbuster Hardware Deals</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              <span>Auto-hides in {remainingSeconds}s</span>
            </div>
          </div>

          {/* Bottom Interactive Action Bar: Visit Promo + ONLY 1 Single Close/Skip Button */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 border-t border-slate-100">
            <a
              href={SEEED_STUDIO_REFERRAL_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Explore {SEEED_STUDIO_HEADLINE}</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>

            <button
              type="button"
              onClick={handleDismiss}
              className="px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0 active:scale-95"
              title="Skip or Close Advertisement"
            >
              <X className="w-4 h-4" />
              <span>CLOSE ADS ({remainingSeconds}s)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeedStudioPopupModal;
