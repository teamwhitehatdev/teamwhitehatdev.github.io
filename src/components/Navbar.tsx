import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, ExternalLink, Menu, X, Info, Home, Briefcase, Rocket, Server } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/initialData';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-cyan-500/30 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* BRAND LOGO & SUB-TEXT */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <img
              src="./logo.png"
              alt="White Hat Dev Logo"
              className="w-9 h-9 rounded-full object-cover border-2 border-cyan-400 group-hover:scale-105 transition-transform"
              draggable="false"
            />
            <div>
              <span className="text-base font-extrabold font-rajdhani text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wider block leading-none">
                TEAM WHITEHAT DEV
              </span>
              <span className="text-[10px] text-lime-400 font-bold block leading-tight pt-0.5">
                — Learn. Create. Develop. Assist. Grow.
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV PANEL ORDER: HOME | SERVICES | WEB HOSTING | SHOWCASE | ABOUT | GOOGLE PLAY | HIRE VA */}
          <div className="hidden md:flex items-center space-x-5 lg:space-x-7">
            <Link
              to="/"
              className={`text-xs uppercase tracking-wider flex items-center space-x-1 hover:text-cyan-400 transition-colors ${
                isActive('/') ? 'text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1' : 'text-gray-300'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-cyan-400" />
              <span>HOME</span>
            </Link>

            <Link
              to="/services"
              className={`text-xs uppercase tracking-wider flex items-center space-x-1 hover:text-cyan-400 transition-colors ${
                isActive('/services') ? 'text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1' : 'text-gray-300'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>SERVICES</span>
            </Link>

            <Link
              to="/web-hosting"
              className={`text-xs uppercase tracking-wider flex items-center space-x-1 hover:text-lime-400 transition-colors ${
                isActive('/web-hosting') ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' : 'text-lime-300 font-semibold'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-lime-400" />
              <span>WEB HOSTING</span>
            </Link>

            <Link
              to="/showcase"
              className={`text-xs uppercase tracking-wider flex items-center space-x-1 hover:text-cyan-400 transition-colors ${
                isActive('/showcase') ? 'text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1' : 'text-gray-300'
              }`}
            >
              <Rocket className="w-3.5 h-3.5 text-cyan-400" />
              <span>SHOWCASE</span>
            </Link>

            <Link
              to="/about"
              className={`text-xs uppercase tracking-wider flex items-center space-x-1 hover:text-cyan-400 transition-colors ${
                isActive('/about') ? 'text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1' : 'text-gray-300'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>ABOUT</span>
            </Link>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-lime-400 hover:text-lime-300 flex items-center space-x-1 font-bold"
            >
              <Smartphone className="w-3.5 h-3.5 text-lime-400" />
              <span>GOOGLE PLAY</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onOpenConsultation}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl hover:opacity-90 transition-all shadow-md shadow-cyan-500/20 flex-shrink-0"
            >
              HIRE VA (20% OFF)
            </button>
          </div>

          {/* MOBILE MENU TRIGGER */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-gray-300 hover:text-white bg-gray-900 border border-gray-800 rounded-xl"
            >
              {isMobileOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-cyan-400" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMobileOpen && (
        <div className="md:hidden bg-black/95 border-b border-cyan-500/30 px-4 pt-3 pb-5 space-y-3 font-mono text-xs animate-fadeIn">
          <Link
            to="/"
            onClick={() => setIsMobileOpen(false)}
            className={`block py-2.5 px-3 rounded-xl border ${isActive('/') ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 font-bold' : 'border-gray-800 text-gray-300'}`}
          >
            🏠 HOME (VA ACCELERATOR & MASTERCLASS)
          </Link>
          <Link
            to="/services"
            onClick={() => setIsMobileOpen(false)}
            className={`block py-2.5 px-3 rounded-xl border ${isActive('/services') ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 font-bold' : 'border-gray-800 text-gray-300'}`}
          >
            🛠️ SERVICES (VA & FULL-STACK DEV)
          </Link>
          <Link
            to="/web-hosting"
            onClick={() => setIsMobileOpen(false)}
            className={`block py-2.5 px-3 rounded-xl border ${isActive('/web-hosting') ? 'bg-lime-500/20 border-lime-400 text-lime-400 font-bold' : 'border-gray-800 text-lime-300 font-bold'}`}
          >
            🌐 WEB HOSTING (HOSTINGER CLOUD DEALS)
          </Link>
          <Link
            to="/showcase"
            onClick={() => setIsMobileOpen(false)}
            className={`block py-2.5 px-3 rounded-xl border ${isActive('/showcase') ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 font-bold' : 'border-gray-800 text-gray-300'}`}
          >
            🚀 SHOWCASE (FEATURED PROJECTS)
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileOpen(false)}
            className={`block py-2.5 px-3 rounded-xl border ${isActive('/about') ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 font-bold' : 'border-gray-800 text-gray-300'}`}
          >
            ℹ️ ABOUT (OUR VISION & DIGITAL HUB)
          </Link>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileOpen(false)}
            className="block py-2.5 px-3 rounded-xl border border-lime-500/40 text-lime-400 font-bold flex items-center justify-between"
          >
            <span>📱 GOOGLE PLAY STORE APPS</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => { setIsMobileOpen(false); onOpenConsultation(); }}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-extrabold text-xs uppercase rounded-xl shadow-lg"
          >
            HIRE VA CONSULTATION (20% OFF)
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
