import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Menu, X, Rocket, Sparkles, Box, ShieldCheck, ExternalLink } from 'lucide-react';

export interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const MESHY_REFERRAL_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/dev?id=7374638355121114347';

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/ai', label: 'AI & Automations Hub', isAiTab: true },
    { path: '/affiliate-guide', label: 'Free VA & Freelancer Guide', highlight: true },
    { path: '/services', label: 'VA Services' },
    { path: '/showcase', label: 'Portfolio' },
    { path: '/web-hosting', label: 'Hosting' },
    { path: '/about', label: 'About' },
    { path: '/admin', label: 'Admin CMS', isAdmin: true }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 border-b border-slate-200 text-slate-800 sticky top-0 z-50 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* BRAND TITLE & SUBTITLE */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="relative">
              <img
                src="./favicon.png"
                alt="WhiteHat Dev Logo"
                className="w-9 h-9 rounded-xl border border-slate-200 object-cover group-hover:border-blue-500 transition-colors shadow-sm"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                Team WhiteHat Dev
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide leading-tight pt-0.5">
                Free VA Academy • AI Automations • Portfolio
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden xl:flex items-center space-x-1 text-xs">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                  isActive(link.path)
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                    : link.highlight
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                    : link.isAiTab
                    ? 'bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100'
                    : link.isAdmin
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.isAiTab && <Sparkles className="w-3.5 h-3.5 text-violet-600" />}
                {link.isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* DIRECT MESHY AI 3D REFERRAL BADGE IN THE AI NAVIGATION BAR */}
            <a
              href={MESHY_REFERRAL_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              title="AI 3D Model Generator: Create 3D from Text & Images | Meshy"
              className="px-2.5 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg font-semibold flex items-center space-x-1 transition-all whitespace-nowrap shadow-xs"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Meshy 3D AI</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-3.5 py-2 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center space-x-1 ml-1 whitespace-nowrap"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Hire VA</span>
              </button>
            )}
          </div>

          {/* TABLET / MID-DESKTOP QUICK LINKS */}
          <div className="hidden md:flex xl:hidden items-center space-x-2 text-xs">
            <Link
              to="/ai"
              className="px-3 py-1.5 bg-violet-50 text-violet-700 border border-violet-200 rounded-lg font-semibold text-xs flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>AI &amp; 3D Hub</span>
            </Link>

            <Link
              to="/affiliate-guide"
              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-semibold text-xs flex items-center space-x-1"
            >
              <span>Free VA Guide</span>
            </Link>

            <a
              href={MESHY_REFERRAL_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="px-2.5 py-1.5 bg-violet-600 text-white rounded-lg font-semibold text-xs flex items-center space-x-1"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Meshy 3D</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 bg-slate-50 flex items-center space-x-1 font-semibold text-xs"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span>Menu</span>
            </button>
          </div>

          {/* MOBILE HAMBURGER TOGGLE */}
          <div className="md:hidden flex items-center gap-1.5">
            <Link
              to="/ai"
              className="px-2.5 py-1.5 bg-violet-50 text-violet-700 border border-violet-200 rounded-lg font-semibold text-[11px]"
            >
              AI Hub
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 bg-slate-50"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET EXPANDED MENU */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 text-sm shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3.5 py-2.5 rounded-xl font-semibold ${
                isActive(link.path)
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : link.highlight
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : link.isAiTab
                  ? 'bg-violet-50 text-violet-700 border border-violet-200'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* MESHY AI REFERRAL IN MOBILE AI NAV MENU */}
          <a
            href={MESHY_REFERRAL_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-between shadow-xs"
          >
            <span className="flex items-center space-x-2">
              <Box className="w-4 h-4" />
              <span>AI 3D Model Generator: Create 3D from Text &amp; Images | Meshy</span>
            </span>
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block px-3.5 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-semibold flex items-center space-x-2"
          >
            <Smartphone className="w-4 h-4 text-blue-600" />
            <span>Official Google Play Store Apps</span>
          </a>

          {onOpenConsultation && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl text-center shadow-sm flex items-center justify-center space-x-1.5"
            >
              <Rocket className="w-4 h-4" />
              <span>Book Free VA &amp; Automation Consultation</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
