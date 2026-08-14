import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Smartphone, ExternalLink, Menu, X, Rocket } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/constants';

export interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/web-hosting', label: 'WEB HOSTING' },
    { path: '/showcase', label: 'SHOWCASE' },
    { path: '/services', label: 'SERVICES' },
    { path: '/admin', label: 'PORTAL' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black/90 border-b border-cyan-500/40 text-gray-100 font-mono sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="relative">
              <img src="./favicon.png" alt="WhiteHat Dev Cyber Avatar Logo" className="w-9 h-9 rounded-full border-2 border-cyan-400 object-cover group-hover:border-lime-400 transition-colors shadow-lg" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-lime-400 rounded-full border border-black animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-black font-rajdhani text-lg sm:text-xl text-white tracking-widest leading-none group-hover:text-cyan-400 transition-colors uppercase">
                WHITE HAT DEV
              </span>
              <span className="text-[9px] text-lime-400 font-mono tracking-wider leading-tight uppercase">
                VA ACCELERATOR & FULL-STACK PORTAL
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1 text-xs">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg font-extrabold uppercase transition-all ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-cyan-500/20 to-lime-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
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
              className="px-3 py-1.5 bg-gray-900 border border-cyan-500/30 text-cyan-400 hover:text-lime-300 rounded-lg font-bold flex items-center space-x-1 transition-all"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>PLAY STORE</span>
            </a>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-black font-rajdhani text-xs uppercase rounded-lg hover:opacity-95 shadow-md flex items-center space-x-1 ml-2"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>HIRE VA &rarr;</span>
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-cyan-400 hover:text-white rounded-lg border border-gray-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-cyan-500/40 px-4 pt-2 pb-4 space-y-2 text-xs">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg font-bold uppercase ${
                isActive(link.path)
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
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
            className="block px-3 py-2 bg-gray-900 text-cyan-400 rounded-lg font-bold flex items-center space-x-2"
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
              className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-black font-rajdhani text-xs uppercase rounded-lg text-center shadow-md flex items-center justify-center space-x-1.5"
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
