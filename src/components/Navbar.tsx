import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Shield, Sparkles, Menu, X, Rocket, Sun, Moon, Monitor } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { themeMode, setThemeMode } = useApp();

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/services', label: 'SERVICES & PRICING' },
    { path: '/web-hosting', label: 'WEB HOSTING' },
    { path: '/showcase', label: 'SHOWCASE' },
    { path: '/affiliate-guide', label: 'AFFILIATE ACADEMY', highlight: true },
    { path: '/about', label: 'ABOUT US' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-cyan-500/30 select-none font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/40 group-hover:border-cyan-400 transition-colors shadow-lg">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-black font-orbitron text-white tracking-wider uppercase block">
                WHITE HAT DEV
              </span>
              <span className="text-[10px] text-cyan-400 tracking-widest font-mono uppercase block -mt-1">
                CYBER &amp; FULL-STACK APPS
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all uppercase ${
                  isActive(link.path)
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-md'
                    : link.highlight
                    ? 'bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 text-lime-300 border border-lime-400/80 font-black animate-pulse'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-gray-900/90 border border-cyan-500/30 p-1 rounded-xl shadow-inner">
              <button
                onClick={() => setThemeMode('dark')}
                title="Dark Cyber Theme (Default)"
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                  themeMode === 'dark'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">DARK</span>
              </button>

              <button
                onClick={() => setThemeMode('light')}
                title="Light Clean Theme"
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                  themeMode === 'light'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden md:inline">LIGHT</span>
              </button>

              <button
                onClick={() => setThemeMode('system')}
                title="System Preferred Theme"
                className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                  themeMode === 'system'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">SYS</span>
              </button>
            </div>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 text-black font-black font-rajdhani text-xs uppercase rounded-xl shadow-lg hover:scale-105 transition-all flex items-center space-x-1.5"
              >
                <Rocket className="w-4 h-4" />
                <span>HIRE VA</span>
              </button>
            )}
          </div>

          <div className="xl:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-cyan-400 hover:text-white rounded-lg border border-cyan-500/40 bg-gray-900"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

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

          <div className="pt-2 flex items-center justify-between bg-gray-900 p-2.5 rounded-xl border border-cyan-500/30">
            <span className="text-xs text-cyan-300 font-bold">THEME MODE:</span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setThemeMode('dark')}
                className={`px-2 py-1 rounded text-xs font-bold ${themeMode === 'dark' ? 'bg-cyan-500 text-black' : 'text-gray-400'}`}
              >
                DARK
              </button>
              <button
                onClick={() => setThemeMode('light')}
                className={`px-2 py-1 rounded text-xs font-bold ${themeMode === 'light' ? 'bg-amber-400 text-black' : 'text-gray-400'}`}
              >
                LIGHT
              </button>
              <button
                onClick={() => setThemeMode('system')}
                className={`px-2 py-1 rounded text-xs font-bold ${themeMode === 'system' ? 'bg-purple-500 text-white' : 'text-gray-400'}`}
              >
                SYS
              </button>
            </div>
          </div>

          {onOpenConsultation && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 text-black font-black font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg flex items-center justify-center space-x-1.5 mt-2"
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
