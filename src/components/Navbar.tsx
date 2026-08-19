import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Menu, X, Rocket, Sparkles } from 'lucide-react';

export interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const { themeMode, setThemeMode } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const PLAY_STORE_URL = "https://play.google.com/store/apps/dev?id=7374638355121114347";

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/showcase', label: 'SHOWCASE' },
    { path: '/web-hosting', label: 'WEB HOSTING' },
    { path: '/services', label: 'SERVICES' },
    { path: '/about', label: 'ABOUT' },
    { path: '/affiliate-guide', label: '🎓 AFFILIATE MARKETER GUIDE', highlight: true }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black/95 border-b-2 border-cyan-500/40 text-gray-100 font-mono sticky top-0 z-50 backdrop-blur-md shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* BRAND TITLE & SUBTITLE */}
          <Link to="/" className="flex items-center space-x-2 group shrink-0">
            <div className="relative">
              <img src="./favicon.png" alt="WhiteHat Dev Logo" className="w-9 h-9 rounded-full border-2 border-cyan-400 object-cover group-hover:border-lime-400 transition-colors shadow-lg" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-lime-400 rounded-full border border-black animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-black font-rajdhani text-base sm:text-xl text-white tracking-widest leading-none group-hover:text-cyan-400 transition-colors uppercase">
                WHITE HAT DEV
              </span>
              <span className="text-[8px] sm:text-[9px] text-lime-400 font-mono font-bold tracking-wider leading-tight uppercase pt-0.5">
                LEARN. CREATE. DEVELOP. ASSIST. GROW.
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden xl:flex items-center space-x-1.5 text-xs">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2.5 py-1.5 rounded-lg font-extrabold uppercase transition-all whitespace-nowrap ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-cyan-500/30 to-lime-500/30 text-cyan-300 border border-cyan-400 shadow-md scale-105'
                    : link.highlight
                    ? 'bg-gradient-to-r from-purple-900/60 to-pink-900/60 text-lime-300 border border-lime-400/60 hover:border-lime-400 animate-pulse'
                    : 'text-gray-300 hover:text-white hover:bg-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-gray-900 border border-cyan-500/40 text-cyan-400 hover:text-lime-300 rounded-lg font-bold flex items-center space-x-1 transition-all whitespace-nowrap"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>PLAY STORE</span>
            </a>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-3 py-1.5 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 text-black font-black font-rajdhani text-xs uppercase rounded-lg hover:opacity-95 shadow-md flex items-center space-x-1 ml-1 whitespace-nowrap"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>HIRE VA &rarr;</span>
              </button>
            )}
          </div>

          {/* TABLET / MID-DESKTOP QUICK LINKS */}
          <div className="hidden md:flex xl:hidden items-center space-x-2 text-xs">
            <Link
              to="/affiliate-guide"
              className="px-3 py-1.5 bg-gradient-to-r from-purple-950 to-pink-950 text-lime-300 border border-lime-400 rounded-lg font-black uppercase text-[11px] flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span>AFFILIATE GUIDE</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-cyan-400 hover:text-white rounded-lg border border-cyan-500/40 bg-gray-900 flex items-center space-x-1 font-bold text-xs"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span>MENU</span>
            </button>
          </div>

          {/* MOBILE HAMBURGER TOGGLE */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-cyan-400 hover:text-white rounded-lg border border-cyan-500/40 bg-gray-900"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE & TABLET EXPANDED MENU */}
      {isOpen && (
        <div className="xl:hidden bg-black/98 border-b-2 border-cyan-500/40 px-4 pt-3 pb-6 space-y-2 text-xs font-mono shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-xl font-extrabold uppercase ${
                isActive(link.path)
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                  : link.highlight
                  ? 'bg-gradient-to-r from-purple-900 to-pink-900 text-lime-300 border border-lime-400 font-black'
                  : 'text-gray-300 hover:text-white hover:bg-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 bg-gray-900 border border-cyan-500/30 text-cyan-400 rounded-xl font-bold flex items-center space-x-2"
          >
            <Smartphone className="w-4 h-4" />
            <span>GOOGLE PLAY STORE APPS</span>
          </a>

          {onOpenConsultation && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 text-black font-black font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg flex items-center justify-center space-x-1.5"
            >
              <Rocket className="w-4 h-4" />
              <span>HIRE VA CONSULTATION</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
