import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Sparkles, Sun, Moon, Monitor, ExternalLink, Award, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { themeMode, setThemeMode, setIsHireModalOpen } = useApp();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NAV_ITEMS = [
    { path: '/', label: 'HOME' },
    { path: '/affiliate-guide', label: 'LEARN' },
    { path: '/services', label: 'VIRTUAL ASSISTANT' },
    { path: '/affiliate-guide', label: 'AFFILIATE MARKETING' },
    { path: '/showcase', label: 'SOFTWARE / TOOLS' },
    { path: '/showcase', label: 'SHOWCASE' },
    { path: '/services', label: 'SERVICES' },
    { path: '/web-hosting', label: 'WEB HOSTING' },
    { path: '/about', label: 'ABOUT' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-xl border-b border-cyan-500/30 transition-colors shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* LOGO BRANDING */}
          <Link to="/" className="flex items-center space-x-3 shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-lime-400 to-purple-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center text-cyan-400 group-hover:text-lime-400 transition-colors">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-rajdhani font-black text-lg sm:text-xl tracking-wider text-white uppercase group-hover:text-cyan-400 transition-colors leading-none">
                WHITE HAT <span className="text-cyan-400">DEV</span>
              </span>
              <span className="text-[10px] text-gray-400 tracking-widest font-mono uppercase mt-0.5">
                CYBER & AUTOMATION
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATIONAL TABS */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 overflow-x-auto scrollbar-none py-1">
            {NAV_ITEMS.map((item, idx) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-black font-rajdhani uppercase tracking-wider transition-all duration-200 whitespace-nowrap h-9 ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-900 border border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* THEME MODE SWITCHER & CTA BUTTONS */}
          <div className="hidden sm:flex items-center space-x-3 shrink-0">
            
            {/* THEME SEGMENTED SELECTOR */}
            <div className="inline-flex items-center bg-gray-900 border border-gray-800 rounded-xl p-1 h-9 space-x-1">
              <button
                onClick={() => setThemeMode('dark')}
                title="Dark Theme"
                className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-bold transition-all h-7 ${
                  themeMode === 'dark'
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 mr-1" />
                <span>DARK</span>
              </button>

              <button
                onClick={() => setThemeMode('light')}
                title="Light Theme"
                className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-bold transition-all h-7 ${
                  themeMode === 'light'
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 mr-1" />
                <span>LIGHT</span>
              </button>

              <button
                onClick={() => setThemeMode('system')}
                title="System Default"
                className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-bold transition-all h-7 ${
                  themeMode === 'system'
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5 mr-1" />
                <span>AUTO</span>
              </button>
            </div>

            {/* HIRE VA CTA BUTTON */}
            <button
              onClick={() => setIsHireModalOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 text-black font-black font-rajdhani text-xs uppercase rounded-xl shadow-lg hover:scale-105 transition-all duration-200 h-9 space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">HIRE VA & SERVICES</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900 border border-gray-800 transition-colors h-10 w-10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-950 border-b border-cyan-500/30 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          
          {/* MOBILE NAV TABS */}
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item, idx) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`inline-flex items-center justify-center px-3 py-2.5 rounded-xl text-xs font-black font-rajdhani uppercase tracking-wider transition-all h-10 ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-gray-900 border border-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* MOBILE THEME SELECTOR */}
          <div className="pt-2 border-t border-gray-800">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setThemeMode('dark')}
                className={`inline-flex items-center justify-center py-2 rounded-xl text-xs font-bold h-9 ${
                  themeMode === 'dark' ? 'bg-cyan-500 text-black' : 'bg-gray-900 text-gray-400 border border-gray-800'
                }`}
              >
                <Moon className="w-3.5 h-3.5 mr-1" />
                <span>DARK</span>
              </button>

              <button
                onClick={() => setThemeMode('light')}
                className={`inline-flex items-center justify-center py-2 rounded-xl text-xs font-bold h-9 ${
                  themeMode === 'light' ? 'bg-cyan-500 text-black' : 'bg-gray-900 text-gray-400 border border-gray-800'
                }`}
              >
                <Sun className="w-3.5 h-3.5 mr-1" />
                <span>LIGHT</span>
              </button>

              <button
                onClick={() => setThemeMode('system')}
                className={`inline-flex items-center justify-center py-2 rounded-xl text-xs font-bold h-9 ${
                  themeMode === 'system' ? 'bg-cyan-500 text-black' : 'bg-gray-900 text-gray-400 border border-gray-800'
                }`}
              >
                <Monitor className="w-3.5 h-3.5 mr-1" />
                <span>AUTO</span>
              </button>
            </div>
          </div>

          {/* MOBILE HIRE VA BUTTON */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsHireModalOpen(true);
            }}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 text-black font-black font-rajdhani text-xs uppercase rounded-xl shadow-lg inline-flex items-center justify-center space-x-1.5 mt-2 h-11"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>HIRE VA & SERVICES</span>
          </button>

        </div>
      )}
    </header>
  );
};

export default Navbar;
