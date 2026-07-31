import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, Volume2, VolumeX, ShoppingBag, User, Menu, X 
} from 'lucide-react';
import { useTheme, THEMES, ThemeName } from './ThemeEngine';
import { audioEngine } from './AudioEngine';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentTheme, setTheme } = useTheme();
  const { cart, user, setIsCartOpen, setIsAuthOpen } = useApp();
  const [isAudioMuted, setIsAudioMuted] = useState(audioEngine.isMuted);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAudioToggle = () => {
    const muted = audioEngine.toggleMute();
    setIsAudioMuted(muted);
  };

  const navLinks = [
    { path: '/', label: 'TERMINAL_HERO' },
    { path: '/showcase', label: 'PUBLISHED_APPS' },
    { path: '/shop', label: 'MARKETPLACE' },
    { path: '/services', label: 'SERVICES_COURSES' },
    { path: '/gallery', label: 'CYBER_GALLERY' },
    { path: '/contact', label: 'CONTACT_TERMINAL' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f18]/90 backdrop-blur-md border-b border-[var(--border-color)] font-mono">
      {/* Top Status Bar */}
      <div className="bg-black/60 border-b border-cyan-500/10 px-4 py-1 text-xs flex items-center justify-between text-gray-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block"></span>
            <span>SYS_STATUS: ONLINE</span>
          </span>
          <span className="hidden md:inline text-gray-500">|</span>
          <span className="hidden md:inline">FIREWALL: ACTIVE (AES-256)</span>
          <span className="hidden md:inline text-gray-500">|</span>
          <span className="hidden md:inline text-yellow-400">LATENCY: 12ms</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-400">THEME:</span>
          <select 
            value={currentTheme}
            onChange={(e) => {
              audioEngine.playClick();
              setTheme(e.target.value as ThemeName);
            }}
            className="bg-black/80 text-[var(--primary-color)] border border-[var(--border-color)] rounded px-2 py-0.5 font-mono text-xs focus:outline-none"
          >
            {Object.values(THEMES).map(t => (
              <option key={t.name} value={t.name}>{t.label}</option>
            ))}
          </select>
          <button 
            onClick={handleAudioToggle}
            className="text-cyan-400 hover:text-yellow-400 transition-colors p-1"
            title={isAudioMuted ? "Unmute Audio SFX" : "Mute Audio SFX"}
          >
            {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => audioEngine.playClick()}
          className="flex items-center space-x-3 group"
        >
          <div className="p-2 rounded bg-black/80 border border-[var(--primary-color)] shadow-[0_0_10px_var(--glow-color)] group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 text-[var(--primary-color)]" />
          </div>
          <div>
            <div className="font-orbitron font-extrabold text-lg tracking-wider text-white flex items-center">
              WHITE<span className="text-[var(--primary-color)]">HAT</span>
              <span className="text-[var(--secondary-color)] ml-1 font-mono text-xs border border-[var(--secondary-color)] px-1 rounded">DEV</span>
            </div>
            <div className="text-[9px] font-mono text-gray-400 tracking-widest uppercase">
              Cybernetics & Software Architecture
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => audioEngine.playClick()}
                className={`px-3 py-1.5 rounded font-mono text-xs tracking-wider transition-all relative ${
                  isActive 
                    ? 'text-[var(--primary-color)] bg-cyan-500/10 border border-[var(--primary-color)] shadow-[0_0_8px_var(--glow-color)]' 
                    : 'text-gray-300 hover:text-[var(--primary-color)] hover:bg-black/40'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* User Profile / Auth */}
          <button
            onClick={() => {
              audioEngine.playClick();
              setIsAuthOpen(true);
            }}
            className="p-2 rounded bg-black/60 border border-gray-700 text-gray-300 hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-all relative"
            title={user ? `Logged in as ${user.name}` : "Client Login / Register"}
          >
            <User size={18} />
            {user && <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full"></span>}
          </button>

          {/* Cart Drawer Button */}
          <button
            onClick={() => {
              audioEngine.playClick();
              setIsCartOpen(true);
            }}
            className="p-2 rounded bg-black/60 border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-black transition-all relative shadow-[0_0_8px_var(--glow-color)] flex items-center space-x-1"
          >
            <ShoppingBag size={18} />
            {cartItemsCount > 0 && (
              <span className="bg-[var(--secondary-color)] text-black font-mono font-bold text-xs px-1.5 py-0.5 rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              audioEngine.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 text-gray-300 hover:text-cyan-400"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0f18]/95 border-b border-[var(--border-color)] px-4 pt-2 pb-4 space-y-2 font-mono">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => {
                audioEngine.playClick();
                setIsMobileMenuOpen(false);
              }}
              className={`block px-3 py-2 rounded text-sm ${
                location.pathname === link.path 
                  ? 'text-[var(--primary-color)] bg-cyan-500/20 border-l-2 border-[var(--primary-color)]' 
                  : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
