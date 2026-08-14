import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Shield, Terminal, Globe, Server, Smartphone } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/initialData';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SERVICES', path: '/services' },
    { name: 'WEB HOSTING', path: '/web-hosting' },
    { name: 'SHOWCASE', path: '/showcase' },
    { name: 'ABOUT', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-cyan-500/30 select-none font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO WITH CYBER AVATAR */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="./logo.png"
                alt="Team WhiteHat Dev Official Logo"
                className="w-12 h-12 rounded-full border-2 border-cyan-400 object-cover shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-lime-400 rounded-full border-2 border-black animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-black font-rajdhani text-white uppercase tracking-wider block leading-none">
                TEAM WHITEHAT DEV
              </span>
              <span className="text-[10px] text-lime-400 font-bold block leading-tight pt-0.5">
                VA Accelerator & Software Suite
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center space-x-1 font-rajdhani text-sm font-bold uppercase">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-lime-400 hover:bg-lime-500/10 border border-lime-500/30 transition-all flex items-center space-x-1"
            >
              <Smartphone className="w-4 h-4 text-lime-400" />
              <span>GOOGLE PLAY</span>
            </a>

            <button
              onClick={onOpenConsultation}
              className="ml-2 px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold text-xs uppercase rounded-xl hover:opacity-95 shadow-lg flex items-center space-x-1.5"
            >
              <Rocket className="w-4 h-4" />
              <span>HIRE VA (20% OFF)</span>
            </button>
          </nav>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-cyan-400 hover:text-white"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-cyan-500/40 px-4 pt-2 pb-6 space-y-3 font-mono text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-cyan-500/20"
            >
              {link.name}
            </Link>
          ))}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-lg text-lime-400 font-bold"
          >
            📱 GOOGLE PLAY STORE APPS
          </a>
          <button
            onClick={() => { setIsOpen(false); onOpenConsultation(); }}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold text-xs uppercase rounded-xl"
          >
            HIRE VA CONSULTATION (20% OFF)
          </button>
        </div>
      )}
    </header>
  );
};
export default Navbar;
