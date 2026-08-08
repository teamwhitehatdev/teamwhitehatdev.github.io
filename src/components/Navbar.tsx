import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Smartphone, Lock } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/initialData';

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
    <nav className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <img
              src="./logo.png"
              alt="Team White Hat Dev Logo"
              className="w-10 h-10 rounded-xl border border-cyan-500/50 object-cover group-hover:scale-105 transition-all shadow-md shadow-cyan-500/30"
            />
            <div>
              <span className="text-base font-black font-rajdhani text-white tracking-wider uppercase block">
                WHITE HAT <span className="text-cyan-400">DEV</span>
              </span>
              <span className="text-[10px] text-gray-400 block -mt-1">PROFESSIONAL VIRTUAL ASSISTANT</span>
            </div>
          </Link>

          {/* Telemetry: IP + Security Level + Financial Ticker */}
          <div className="hidden lg:flex items-center space-x-3 text-xs bg-black/60 px-3 py-1.5 rounded-lg border border-gray-800 text-lime-400 max-w-xl overflow-hidden">
            <span className="flex items-center space-x-1 shrink-0 text-cyan-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping inline-block mr-1"></span>
              <span>IP: {userIp}</span>
            </span>

            <span className="text-gray-700">|</span>

            <span className="text-[11px] text-lime-400 font-bold shrink-0">
              SECURITY_LEVEL: MAXIMUM • SSL_ENCRYPTED_256
            </span>

            <span className="text-gray-700">|</span>

            <div className="whitespace-nowrap animate-marquee flex space-x-3 text-[11px] text-gray-300">
              <span className="text-lime-400 font-bold">BTC $96,420 ▲</span>
              <span>USD/PHP ₱58.50</span>
              <span>USD/JPY ¥154.20</span>
              <span>USD/CNY ¥7.24</span>
              <span>USD/HKD $7.82</span>
            </div>
          </div>

          {/* Nav Links & Google Play Link */}
          <div className="flex items-center space-x-4 shrink-0">
            <Link
              to="/"
              className={`text-xs uppercase tracking-wider transition-colors ${
                location.pathname === '/' ? 'text-cyan-400 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              HOME
            </Link>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-lime-400 hover:text-lime-300 flex items-center space-x-1 font-bold bg-lime-400/10 px-2.5 py-1 rounded border border-lime-400/30"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>GOOGLE PLAY STORE</span>
            </a>

            <button
              onClick={onOpenConsultation}
              className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-bold font-rajdhani rounded-lg text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md shadow-cyan-500/20"
            >
              HIRE VA
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
