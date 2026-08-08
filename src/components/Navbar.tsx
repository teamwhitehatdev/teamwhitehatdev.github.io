import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [userIp, setUserIp] = useState('Fetching IP...');
  const location = useLocation();

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => setUserIp('185.220.101.4'));
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-lg bg-black border border-[var(--primary-color)]/50 flex items-center justify-center text-[var(--primary-color)] group-hover:scale-105 transition-all shadow-md shadow-[var(--primary-color)]/10">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black font-rajdhani text-white tracking-wider uppercase block">
                WHITE HAT <span className="text-[var(--primary-color)]">DEV</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono block -mt-1">THE LAZY 1337 DEVELOPER</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-3 text-xs font-mono bg-black/60 px-3 py-1.5 rounded-lg border border-lime-500/30 text-lime-400 max-w-sm overflow-hidden">
            <span className="flex items-center space-x-1 shrink-0 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping inline-block mr-1"></span>
              <span>IP: {userIp} 🌐</span>
            </span>
            <span className="text-gray-700">|</span>
            <div className="whitespace-nowrap animate-marquee flex space-x-3 text-[11px]">
              <span>BTC $96,420 ▲</span>
              <span>USD/JPY ¥154.2</span>
              <span>USD/KRW ₩1,385</span>
              <span>USD/PHP ₱58.50</span>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <Link
              to="/"
              className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                location.pathname === '/' ? 'text-[var(--primary-color)] font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              HOME
            </Link>

            <Link
              to="/showcase"
              className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                location.pathname === '/showcase' ? 'text-[var(--primary-color)] font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              PROJECTS
            </Link>

            <Link
              to="/services"
              className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                location.pathname === '/services' ? 'text-[var(--primary-color)] font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              SERVICES
            </Link>

            <button
              onClick={onOpenConsultation}
              className="px-4 py-2 bg-gradient-to-r from-[var(--primary-color)] to-cyan-500 text-black font-bold font-rajdhani rounded-lg text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md shadow-[var(--primary-color)]/20"
            >
              HIRE OUR TEAM
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
