import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  X,
  Minus,
  Square,
  ShieldCheck,
  Star,
  Download,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

/**
 * Authentic Windows Frame Google Play Store Android App Popup
 * 100% Configurable & Manageable from /#/admin CMS:
 * - Modify/edit/hide/unhide app info, ratings, downloads, descriptions
 * - Upload local banner images or paste image URLs
 * - Destination Google Play Store link (app or publisher URL)
 * - Minimize to taskbar pill, maximize, and close controls
 */
export const PlayStoreModal: React.FC = () => {
  const { playStoreConfig } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (!playStoreConfig || !playStoreConfig.enabled) {
      setIsOpen(false);
      return;
    }

    // Check if user previously closed it in this session (unless reopenOnRefresh is forced)
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

    const delayMs = Math.max(500, (playStoreConfig.popupDelaySeconds ?? 4) * 1000);
    const timer = setTimeout(() => {
      setIsOpen(true);
      setIsMinimized(false);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [playStoreConfig]);

  if (!playStoreConfig || !playStoreConfig.enabled || !isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
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
  };

  const handleToggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Minimized Floating Windows Taskbar Button
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-bounce">
        <button
          onClick={handleRestore}
          title="Restore Google Play Store Window"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-emerald-500/80 shadow-xl cursor-pointer text-xs font-semibold select-none group transition-all"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span className="text-emerald-400 font-bold">▶ Google Play App</span>
          <span className="text-slate-400 font-mono text-[11px]">★ {playStoreConfig.rating}</span>
          <Maximize2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Google Play Store App Showcase Window"
      className={`fixed z-50 font-sans transition-all duration-200 select-none ${
        isMaximized
          ? 'bottom-4 right-4 left-4 sm:left-auto sm:w-[500px] max-h-[90vh]'
          : 'bottom-4 right-4 w-[calc(100vw-2rem)] sm:w-[390px] max-h-[88vh]'
      }`}
    >
      {/* WINDOWS FRAME CONTAINER */}
      <div className="bg-white border-2 border-slate-700/80 rounded-2xl shadow-[0_20px_60px_-15px_rgba(15,23,42,0.35),0_0_0_1px_rgba(34,197,94,0.3)] overflow-hidden flex flex-col">
        {/* ================================================================= */}
        {/* 1. RETRO-MODERN WINDOWS TITLE BAR                                 */}
        {/* ================================================================= */}
        <header className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white px-3.5 py-2 flex items-center justify-between border-b border-slate-800 select-none">
          <div className="flex items-center space-x-2 min-w-0">
            {/* Google Play / Android Icon */}
            <div className="w-4 h-4 shrink-0 rounded bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-[10px]">
              ▶
            </div>
            <span className="font-mono text-xs font-bold text-slate-200 truncate tracking-wide">
              {playStoreConfig.windowTitle || 'Google Play™ Store - Android App Showcase.exe'}
            </span>
          </div>

          {/* Windows Control Buttons (Minimize, Maximize, Close) */}
          <div className="flex items-center space-x-1 shrink-0 ml-2">
            {/* Minimize _ */}
            <button
              onClick={handleMinimize}
              title="Minimize to taskbar"
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            {/* Maximize / Restore □ */}
            <button
              onClick={handleToggleMaximize}
              title={isMaximized ? 'Restore Window' : 'Maximize Window'}
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Square className="w-3 h-3" />
            </button>
            {/* Close ✕ */}
            <button
              onClick={handleClose}
              title="Close Window"
              className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-600 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* ================================================================= */}
        {/* 2. WINDOW CONTENT SCROLLABLE BODY                                 */}
        {/* ================================================================= */}
        <div className="p-4 space-y-3.5 overflow-y-auto max-h-[calc(88vh-44px)] bg-slate-50/60">
          {/* Banner Image (if provided and not hidden) */}
          {playStoreConfig.bannerImageUrl && !playStoreConfig.hideBannerImage && (
            <div className="relative rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs group bg-slate-900 aspect-16/8 sm:aspect-16/7">
              <img
                src={playStoreConfig.bannerImageUrl}
                alt={playStoreConfig.appName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-emerald-500/90 text-slate-950 font-mono font-bold text-[10px] uppercase tracking-wider backdrop-blur-xs flex items-center gap-1 shadow-xs">
                <span>{playStoreConfig.tagline || 'OFFICIAL ANDROID APP'}</span>
              </div>
              {playStoreConfig.badgeText && (
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/95 text-slate-900 font-bold text-[10px] shadow-xs flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  <span>{playStoreConfig.badgeText}</span>
                </div>
              )}
            </div>
          )}

          {/* App Header & Identity */}
          <div className="flex items-start space-x-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            {/* App Icon */}
            {playStoreConfig.appIconUrl && !playStoreConfig.hideAppIcon ? (
              <img
                src={playStoreConfig.appIconUrl}
                alt={playStoreConfig.appName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-lg shadow-xs shrink-0">
                ▶
              </div>
            )}

            <div className="flex-1 min-w-0 space-y-0.5">
              <h4 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                {playStoreConfig.appName || 'WhiteHat Android Application'}
              </h4>
              <p className="text-[11px] font-medium text-emerald-700">
                {playStoreConfig.developerName || 'Team WhiteHat Dev'}
              </p>
              <div className="flex items-center gap-2 pt-0.5 text-[11px] text-slate-600">
                <span className="flex items-center gap-0.5 font-bold text-amber-600">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  {playStoreConfig.rating || 4.9}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{playStoreConfig.reviewsCount || '10K+'}</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-0.5 text-slate-600 font-medium">
                  <Download className="w-3 h-3 text-slate-400" />
                  {playStoreConfig.downloadsCount || '50K+'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {playStoreConfig.description && (
            <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
              {playStoreConfig.description}
            </p>
          )}

          {/* Features Highlight (if any) */}
          {playStoreConfig.featuresList && playStoreConfig.featuresList.length > 0 && (
            <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Key Features Included:
              </span>
              {playStoreConfig.featuresList.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-1.5 text-[11px] text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Security & Verification Pill */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified by Google Play Protect
            </span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono font-semibold">
              {playStoreConfig.categoryBadge || 'Tools'}
            </span>
          </div>

          {/* ================================================================= */}
          {/* 3. GOOGLE PLAY STORE CTA BUTTON (THEMEFOREST HIGH CTR)             */}
          {/* ================================================================= */}
          <a
            href={playStoreConfig.playStoreUrl || 'https://play.google.com/store/apps'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-extrabold text-xs uppercase rounded-xl text-center shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer border border-slate-800 group"
          >
            {/* Google Play colored triangle badge */}
            <svg
              className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110"
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
            <span className="tracking-wider">
              {playStoreConfig.ctaButtonText || 'GET IT ON GOOGLE PLAY'}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
          </a>

          {/* Dismiss button text */}
          <div className="text-center pt-0.5">
            <button
              onClick={handleClose}
              className="text-[11px] text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
            >
              Maybe later (close window)
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PlayStoreModal;
