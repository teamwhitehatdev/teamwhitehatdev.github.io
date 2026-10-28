import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Menu, X, Box, ExternalLink } from 'lucide-react';

export interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const MESHY_REFERRAL_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';

export const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/dev?id=7374638355121114347';

  // Public navigation links ONLY (/services and /admin are hidden from UI and accessible via direct URL only)
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/ai', label: 'AI & Automations' },
    { path: '/affiliate-guide', label: 'Free VA & Freelancer Guide' },
    { path: '/showcase', label: 'Portfolio' },
    { path: '/web-hosting', label: 'Web Hosting' },
    { path: '/about', label: 'About' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* BRAND TITLE & SUBTITLE */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="relative">
              <img
                src="./favicon.png"
                alt="Team WhiteHat Dev"
                className="w-9 h-9 rounded-xl border border-slate-200 object-cover group-hover:border-slate-900 transition-colors"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight leading-none">
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
                className={`px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  isActive(link.path)
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            ))}

            {/* DIRECT MESHY AI 3D REFERRAL LINK IN NAVIGATION BAR */}
            <a
              href={MESHY_REFERRAL_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              title="AI 3D Model Generator: Create 3D from Text & Images | Meshy"
              className="px-3 py-2 bg-slate-100 hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-300 rounded-lg font-semibold flex items-center space-x-1.5 transition-all whitespace-nowrap ml-1"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Meshy 3D AI</span>
              <ExternalLink className="w-3 h-3 opacity-75" />
            </a>
          </div>

          {/* TABLET / MID-DESKTOP QUICK LINKS */}
          <div className="hidden md:flex xl:hidden items-center space-x-2 text-xs">
            <Link
              to="/ai"
              className="px-3 py-1.5 bg-slate-100 text-slate-900 border border-slate-200 rounded-lg font-semibold text-xs"
            >
              AI &amp; Automations
            </Link>

            <Link
              to="/affiliate-guide"
              className="px-3 py-1.5 bg-slate-100 text-slate-900 border border-slate-200 rounded-lg font-semibold text-xs"
            >
              Free VA Guide
            </Link>

            <a
              href={MESHY_REFERRAL_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg font-semibold text-xs flex items-center space-x-1"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Meshy 3D</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 bg-white flex items-center space-x-1 font-semibold text-xs"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span>Menu</span>
            </button>
          </div>

          {/* MOBILE HAMBURGER TOGGLE */}
          <div className="md:hidden flex items-center gap-1.5">
            <Link
              to="/ai"
              className="px-2.5 py-1.5 bg-slate-100 text-slate-900 border border-slate-200 rounded-lg font-semibold text-[11px]"
            >
              AI Hub
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 bg-white"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET EXPANDED MENU */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1.5 text-sm shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3.5 py-2.5 rounded-xl font-medium ${
                isActive(link.path)
                  ? 'bg-slate-900 text-white font-semibold'
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
            className="block px-3.5 py-2.5 bg-slate-900 text-white rounded-xl font-semibold flex items-center justify-between"
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
            className="block px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-medium flex items-center space-x-2"
          >
            <Smartphone className="w-4 h-4 text-slate-700" />
            <span>Official Google Play Store Apps</span>
          </a>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
