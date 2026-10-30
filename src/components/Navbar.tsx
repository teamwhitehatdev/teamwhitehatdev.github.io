import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Menu, X, Box, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const MESHY_REFERRAL_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';

export const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { navTabs } = useApp();
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/dev?id=7374638355121114347';

  // Dynamically read visible navigation tabs sorted by sortOrder (managed in Admin -> Navigation Tabs)
  const visibleNavTabs = [...navTabs]
    .filter((tab) => tab.visible !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Helper to alternate hover accents between "apple green" and "indigo"
  const getTabHoverTheme = (tab: { slug?: string }, index: number): 'apple-green' | 'indigo' => {
    // Specifically assign or alternate cleanly
    if (tab.slug === 'home' || tab.slug === 'affiliate-guide' || tab.slug === 'services' || tab.slug === 'about') {
      return 'apple-green';
    }
    if (tab.slug === 'ai' || tab.slug === 'showcase' || tab.slug === 'web-hosting' || tab.slug === 'admin') {
      return 'indigo';
    }
    return index % 2 === 0 ? 'apple-green' : 'indigo';
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-900 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* BRAND TITLE & SUBTITLE */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="relative">
              <img
                src="./favicon.png"
                alt="Team WhiteHat Dev"
                className="w-9 h-9 rounded-xl border border-slate-200 object-cover group-hover:border-emerald-500 transition-colors shadow-xs"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-lg text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                Team WhiteHat Dev
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide leading-tight pt-0.5">
                ThemeForest Marketplace • Enterprise VA Portal • AI Automations
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden xl:flex items-center space-x-1 text-xs flex-wrap justify-end">
            {visibleNavTabs.map((tab, idx) => {
              const theme = getTabHoverTheme(tab, idx);
              const isTabActive = isActive(tab.path);
              const isAppleGreen = theme === 'apple-green';

              const activeStyle = isAppleGreen
                ? 'bg-emerald-600 text-white font-semibold shadow-xs border border-emerald-600'
                : 'bg-indigo-600 text-white font-semibold shadow-xs border border-indigo-600';

              const inactiveStyle = isAppleGreen
                ? 'text-slate-700 border border-transparent hover:text-emerald-800 hover:bg-emerald-50 hover:border-emerald-400 hover:shadow-xs hover:shadow-emerald-500/20'
                : 'text-slate-700 border border-transparent hover:text-indigo-800 hover:bg-indigo-50 hover:border-indigo-400 hover:shadow-xs hover:shadow-indigo-500/20';

              return tab.isExternal ? (
                <a
                  key={tab.id}
                  href={tab.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-2 rounded-xl font-semibold transition-all whitespace-nowrap inline-flex items-center gap-1.5 ${inactiveStyle}`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-slate-200 text-slate-800 rounded">
                      {tab.badge}
                    </span>
                  )}
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              ) : (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`px-3 py-2 rounded-xl font-semibold transition-all whitespace-nowrap inline-flex items-center gap-1.5 ${
                    isTabActive ? activeStyle : inactiveStyle
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                        isTabActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* DIRECT MESHY AI 3D REFERRAL LINK IN NAVIGATION BAR (APPLE GREEN ACCENT) */}
            <a
              href={MESHY_REFERRAL_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              title="AI 3D Model Generator: Create 3D from Text & Images | Meshy"
              className="px-3 py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-300 hover:border-emerald-600 rounded-xl font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ml-1 shadow-2xs hover:shadow-emerald-500/25"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Meshy 3D AI</span>
              <ExternalLink className="w-3 h-3 opacity-75" />
            </a>
          </div>

          {/* MOBILE & TABLET RIGHT CONTROLS */}
          <div className="flex xl:hidden items-center gap-1.5">
            <a
              href={MESHY_REFERRAL_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="px-2.5 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-[11px] flex items-center space-x-1 shrink-0 shadow-xs"
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Meshy 3D</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 bg-white flex items-center space-x-1 font-semibold text-xs active:scale-95 transition-transform"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>

        {/* MOBILE & TABLET INTERACTIVE HORIZONTAL QUICK-TAB BAR (Alternating Apple Green & Indigo) */}
        <div className="xl:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-t border-slate-100">
          {visibleNavTabs.map((tab, idx) => {
            const theme = getTabHoverTheme(tab, idx);
            const isTabActive = isActive(tab.path);
            const isAppleGreen = theme === 'apple-green';

            const activeStyle = isAppleGreen
              ? 'bg-emerald-600 text-white font-semibold shadow-xs border border-emerald-600'
              : 'bg-indigo-600 text-white font-semibold shadow-xs border border-indigo-600';

            const inactiveStyle = isAppleGreen
              ? 'bg-slate-50 text-slate-700 border border-slate-200/80 hover:text-emerald-800 hover:bg-emerald-50 hover:border-emerald-400'
              : 'bg-slate-50 text-slate-700 border border-slate-200/80 hover:text-indigo-800 hover:bg-indigo-50 hover:border-indigo-400';

            return tab.isExternal ? (
              <a
                key={tab.id}
                href={tab.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap shrink-0 inline-flex items-center gap-1 ${inactiveStyle}`}
              >
                <span>{tab.label}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            ) : (
              <Link
                key={tab.id}
                to={tab.path}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap shrink-0 transition-all inline-flex items-center gap-1 ${
                  isTabActive ? activeStyle : inactiveStyle
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1 py-0.2 text-[9px] font-bold rounded ${
                      isTabActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* MOBILE & TABLET EXPANDED DRAWER MENU */}
      {isOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 px-4 pt-3 pb-6 space-y-1.5 text-sm shadow-lg max-h-[80vh] overflow-y-auto">
          {visibleNavTabs.map((tab, idx) => {
            const theme = getTabHoverTheme(tab, idx);
            const isTabActive = isActive(tab.path);
            const isAppleGreen = theme === 'apple-green';

            const activeStyle = isAppleGreen
              ? 'bg-emerald-600 text-white font-semibold'
              : 'bg-indigo-600 text-white font-semibold';

            const hoverText = isAppleGreen
              ? 'hover:text-emerald-700 hover:bg-emerald-50'
              : 'hover:text-indigo-700 hover:bg-indigo-50';

            return tab.isExternal ? (
              <a
                key={tab.id}
                href={tab.path}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl font-medium text-slate-700 ${hoverText} flex items-center justify-between`}
              >
                <span>{tab.label}</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            ) : (
              <Link
                key={tab.id}
                to={tab.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl font-medium flex items-center justify-between ${
                  isTabActive ? activeStyle : `text-slate-700 ${hoverText}`
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                      isTabActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* MESHY AI REFERRAL IN MOBILE AI NAV MENU */}
          <a
            href={MESHY_REFERRAL_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold flex items-center justify-between mt-2 shadow-xs"
          >
            <span className="flex items-center space-x-2">
              <Box className="w-4 h-4 shrink-0" />
              <span className="text-xs sm:text-sm">AI 3D Model Generator: Create 3D from Text &amp; Images | Meshy</span>
            </span>
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl font-medium flex items-center space-x-2"
          >
            <Smartphone className="w-4 h-4 text-slate-700 shrink-0" />
            <span className="text-xs sm:text-sm">Official Google Play Store Apps</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
