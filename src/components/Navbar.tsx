import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Shield, Sparkles, Menu, X, Rocket } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/services', label: 'SERVICES & PRICING' },
    { path: '/web-hosting', label: 'WEB HOSTING' },
    { path: '/showcase', label: 'SHOWCASE' },
    { path: '/affiliate-guide', label: 'AFFILIATE GUIDE', highlight: true },
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
