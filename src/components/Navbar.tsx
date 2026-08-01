import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShoppingBag, User, Lock, Terminal, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenCart, cartCount }) => {
  const [userIp, setUserIp] = useState('Fetching IP...');

  useEffect(() => {
    // Fetch visitor's actual real IP address from client lookup service
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => setUserIp('185.220.101.4'));
  }, []);

  const activeUser = JSON.parse(localStorage.getItem('wh_active_user') || 'null');

  return (
    <nav className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
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

          {/* Real User IP & Financial Ticker */}
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

          {/* Navigation Links & Action Controls */}
          <div className="flex items-center space-x-4">
            <Link to="/shop" className="text-xs font-mono text-gray-300 hover:text-white uppercase tracking-wider">
              MARKETPLACE
            </Link>

            <Link to="/admin" className="px-3 py-1.5 rounded bg-black/60 border border-cyan-500/40 text-cyan-400 hover:text-white hover:border-cyan-400 text-xs font-mono flex items-center space-x-1 transition-all">
              <Lock className="w-3.5 h-3.5" />
              <span>ADMIN PORTAL</span>
            </Link>

            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-lime-400 text-black text-[10px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded text-xs font-mono text-gray-300 hover:text-white hover:border-gray-700 transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>{activeUser ? activeUser.username : 'LOGIN'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
