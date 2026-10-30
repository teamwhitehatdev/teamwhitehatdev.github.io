import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  X,
  Minus,
  Star,
  Download,
  ShieldCheck,
  Maximize2,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

/**
 * High-Performance Minimalistic Google Play Store Android App Popup
 * Features:
 * - Limited display duration (3 to 5 seconds auto fade-out)
 * - Sleek, small, and non-intrusive Windows frame design
 * - Smooth CSS fade-in & fade-out transitions
 * - Hover-to-pause auto-close timer (user friendly UX)
 * - Auto-refreshes / re-displays every page refresh or re-visit
 * - 100% Manageable from /#/admin CMS
 */
export const PlayStoreModal: React.FC = () => {
  const { playStoreConfig } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(5);

  const durationSec = Math.max(3, Math.min(15, playStoreConfig?.autoFadeoutSeconds ?? 5));
  const autoFadeEnabled = playStoreConfig?.autoFadeoutEnabled !== false;
  const isCompact = playStoreConfig?.compactMinimalist !== false;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger popup on page load / refresh
  useEffect(() => {
    if (!playStoreConfig || !playStoreConfig.enabled) {
      setIsOpen(false);
      return;
    }

    // Check session dismissal if reopenOnRefresh is explicitly disabled
    if (!playStoreConfig.reopenOnRefresh) {
      try {
        const closed = sessionStorage.getItem('wh_playstore_modal_dismissed');
        if (closed === 'true') {
          return;
        }
      } catch (e) {
        // ignore
      }
    }

    // Initial popup delay (default 1-2 seconds)
    const delayMs = Math.max(300, (playStoreConfig.popupDelaySeconds ?? 1.5) * 1000);
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
      setIsFadingOut(false);
      setIsMinimized(false);
      setRemainingSeconds(durationSec);
    }, delayMs);

    return () => clearTimeout(initialTimer);
  }, [playStoreConfig, durationSec]);

  // Handle Auto-Fadeout Countdown
  useEffect(() => {
    if (!isOpen || isMinimized || !autoFadeEnabled) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // Countdown interval for visual progress indicator
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Fade-out trigger
    timerRef.current = setTimeout(() => {
      triggerFadeOut();
    }, remainingSeconds * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen, isMinimized, isPaused, autoFadeEnabled, remainingSeconds]);

  const triggerFadeOut = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsFadingOut(false);
    }, 600); // Wait for smooth CSS exit animation
  };

  const handleClose = () => {
    triggerFadeOut();
    if (!playStoreConfig.reopenOnRefresh) {
      try {
        sessionStorage.setItem('wh_playstore_modal_dismissed', 'true');
      } catch (e) {
        // ignore
      }
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setIsFadingOut(false);
    setRemainingSeconds(durationSec);
  };

  if (!playStoreConfig || !playStoreConfig.enabled || !isOpen) {
    return null;
  }

  // Minimized Floating Pill
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleRestore}
          title="Restore Google Play Store Window"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white border border-emerald-500/80 shadow-lg cursor-pointer text-xs font-semibold backdrop-blur-sm transition-all active:scale-95 group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span className="text-emerald-400 font-bold">▶ Google Play App</span>
          <span className="text-slate-400 font-mono text-[10px]">★ {playStoreConfig.rating}</span>
          <Maximize2 className="w-3 h-3 text-slate-400 group-hover:text-white" />
        </button>
      </div>
    );
  }

  const progressPercent = Math.max(0, Math.min(100, (remainingSeconds / durationSec) * 100));

  return (
    <aside
      aria-label="Google Play Store App Showcase Window"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed z-50 bottom-4 right-4 font-sans select-none transition-all duration-500 ease-out ${
        isFadingOut
          ? 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          : 'opacity-100 translate-y-0 scale-100'
      } ${
        isCompact
          ? 'w-[calc(100vw-2rem)] sm:w-[320px]'
          : 'w-[calc(100vw-2rem)] sm:w-[360px]'
      }`}
    >
      {/* WINDOWS FRAME CONTAINER */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-[0_16px_40px_-10px_rgba(15,23,42,0.35),0_0_0_1px_rgba(16,185,129,0.35)] overflow-hidden flex flex-col">
        {/* ================================================================= */}
        {/* RETRO-MODERN COMPACT WINDOWS TITLE BAR                            */}
        {/* ================================================================= */}
        <header className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white px-3 py-1.5 flex items-center justify-between border-b border-slate-800 select-none">
          <div className="flex items-center space-x-1.5 min-w-0 pr-2">
            <div className="w-3.5 h-3.5 shrink-0 rounded bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-[9px] shadow-xs">
              ▶
            </div>
            <span className="font-mono text-[11px] font-bold text-slate-200 truncate tracking-tight">
              {playStoreConfig.windowTitle || 'Google Play™ Store.exe'}
            </span>
          </div>

          {/* Right Action Icons: Timer Badge & Window Controls */}
          <div className="flex items-center space-x-1 shrink-0">
            {autoFadeEnabled && (
              <span
                title={isPaused ? 'Auto-close paused on hover' : `Closing in ${remainingSeconds}s`}
                className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-800 text-emerald-400 border border-slate-700 flex items-center gap-0.5"
              >
                <Clock className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '4s' }} />
                <span>{isPaused ? 'HOLD' : `${remainingSeconds}s`}</span>
              </span>
            )}

            {/* Minimize */}
            <button
              onClick={handleMinimize}
              title="Minimize to pill"
              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              title="Dismiss"
              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-600 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Auto-Close Countdown Progress Bar Line */}
          {autoFadeEnabled && !isPaused && (
            <div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          )}
        </header>

        {/* ================================================================= */}
        {/* COMPACT & MINIMALISTIC WINDOW BODY                                */}
        {/* ================================================================= */}
        <div className="p-3 space-y-2.5 bg-slate-50/80">
          {/* Optional Expanded Banner Image (When not in minimalist mode) */}
          {!isCompact && playStoreConfig.bannerImageUrl && !playStoreConfig.hideBannerImage && (
            <div className="relative h-24 overflow-hidden rounded-xl border border-slate-200 shadow-2xs">
              <img
                src={playStoreConfig.bannerImageUrl}
                alt={playStoreConfig.appName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-2">
                <span className="text-[10px] font-bold text-white tracking-wide uppercase drop-shadow-xs">
                  {playStoreConfig.tagline || 'OFFICIAL ANDROID APP'}
                </span>
              </div>
            </div>
          )}

          {/* App Header Card */}
          <div className="flex items-center space-x-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            {/* App Icon */}
            {playStoreConfig.appIconUrl && !playStoreConfig.hideAppIcon ? (
              <img
                src={playStoreConfig.appIconUrl}
                alt={playStoreConfig.appName}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-sm shadow-xs shrink-0">
                ▶
              </div>
            )}

            <div className="flex-1 min-w-0 space-y-0.5">
              <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate">
                {playStoreConfig.appName || 'WhiteHat Android App'}
              </h4>
              <p className="text-[10px] font-semibold text-emerald-700 truncate">
                {playStoreConfig.developerName || 'Team WhiteHat Dev'}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                <span className="flex items-center gap-0.5 font-bold text-amber-600">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                  {playStoreConfig.rating || 4.9}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-0.5 text-slate-600 font-medium">
                  <Download className="w-2.5 h-2.5 text-slate-400" />
                  {playStoreConfig.downloadsCount || '50K+'}
                </span>
              </div>
            </div>
          </div>

          {/* Optional Short Description (Minimalist 1 line teaser) */}
          {playStoreConfig.description && (
            <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 px-0.5">
              {playStoreConfig.description}
            </p>
          )}

          {/* Minimalist Verified Badge */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 px-0.5">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Google Play Protect
            </span>
            <span className="bg-slate-200/90 text-slate-700 px-1.5 py-0.2 rounded font-mono font-semibold text-[9px]">
              {playStoreConfig.categoryBadge || 'Tools'}
            </span>
          </div>

          {/* Direct Minimalist Google Play Button */}
          <a
            href={playStoreConfig.playStoreUrl || 'https://play.google.com/store/apps'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-extrabold text-[11px] uppercase rounded-xl text-center shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer border border-slate-800 group"
          >
            <svg
              className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.6 2.5C3.3 2.8 3.1 3.3 3.1 3.9V20.1C3.1 20.7 3.3 21.2 3.6 21.5L3.7 21.6L12.5 12.8V12V11.2L3.7 2.4L3.6 2.5Z"
                fill="#00E676"
              />
              <path
                d="M15.5 15.8L12.5 12.8V12V11.2L15.5 8.2L15.6 8.3L19.1 10.3C20.1 10.9 20.1 11.9 19.1 12.5L15.6 14.5L15.5 15.8Z"
                fill="#FFD600"
              />
              <path
                d="M15.6 15.7L12.5 12.6L3.6 21.5C3.9 21.9 4.6 21.9 5.4 21.5L15.6 15.7Z"
                fill="#FF3D00"
              />
              <path
                d="M15.6 8.3L5.4 2.5C4.6 2.1 3.9 2.1 3.6 2.5L12.5 11.4L15.6 8.3Z"
                fill="#00B0FF"
              />
            </svg>
            <span className="tracking-wide">
              {playStoreConfig.ctaButtonText || 'GET ON GOOGLE PLAY'}
            </span>
            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white" />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default PlayStoreModal;
