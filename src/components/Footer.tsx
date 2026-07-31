import React from 'react';
import { Shield, Github, Play, Youtube, Linkedin, Send, Mail, Heart, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 border-t border-[var(--border-color)] text-gray-400 font-mono py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-[var(--primary-color)]" />
            <span className="font-orbitron font-extrabold text-white text-lg">WHITE HAT DEV</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            World-class Web & Mobile Application Engineering Specialist. Building high-performance, secure software published globally across Google Play Store, iOS App Store, and Cloud Web Platforms.
          </p>
          <div className="flex items-center space-x-2 text-xs text-green-400">
            <CheckCircle2 size={14} />
            <span>VERIFIED RELIABLE DEVELOPER</span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="text-white font-orbitron text-xs tracking-wider uppercase mb-4 border-l-2 border-[var(--primary-color)] pl-2">
            SYSTEM_NAV
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="/" className="hover:text-[var(--primary-color)] transition-colors">/Terminal_Hero</a></li>
            <li><a href="/showcase" className="hover:text-[var(--primary-color)] transition-colors">/Published_Apps</a></li>
            <li><a href="/shop" className="hover:text-[var(--primary-color)] transition-colors">/Cyber_Marketplace</a></li>
            <li><a href="/services" className="hover:text-[var(--primary-color)] transition-colors">/Services_And_Courses</a></li>
            <li><a href="/gallery" className="hover:text-[var(--primary-color)] transition-colors">/Project_Gallery</a></li>
            <li><a href="/contact" className="hover:text-[var(--primary-color)] transition-colors">/Contact_Terminal</a></li>
          </ul>
        </div>

        {/* Col 3: Published Platforms */}
        <div>
          <h4 className="text-white font-orbitron text-xs tracking-wider uppercase mb-4 border-l-2 border-[var(--secondary-color)] pl-2">
            PUBLISHED_PLATFORMS
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center space-x-2">
              <span className="text-cyan-400">🌐</span>
              <a href="https://play.google.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400">Google Play Store</a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-cyan-400">📱</span>
              <a href="https://apple.com/app-store" target="_blank" rel="noreferrer" className="hover:text-yellow-400">Apple App Store</a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-cyan-400">⚡</span>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400">GitHub Pages & Repos</a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-cyan-400">💳</span>
              <span>PayPal Worldwide Merchant</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Social & Security */}
        <div>
          <h4 className="text-white font-orbitron text-xs tracking-wider uppercase mb-4 border-l-2 border-[var(--accent-color)] pl-2">
            GLOBAL_CONNECT
          </h4>
          <p className="text-xs mb-3 text-gray-400">Targeting worldwide clients for web, mobile apps, & technical virtual assistance.</p>
          <div className="flex space-x-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded bg-gray-900 hover:text-[var(--primary-color)] hover:border hover:border-[var(--primary-color)] transition-all">
              <Github size={16} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded bg-gray-900 hover:text-[var(--primary-color)] hover:border hover:border-[var(--primary-color)] transition-all">
              <Youtube size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded bg-gray-900 hover:text-[var(--primary-color)] hover:border hover:border-[var(--primary-color)] transition-all">
              <Linkedin size={16} />
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer" className="p-2 rounded bg-gray-900 hover:text-[var(--primary-color)] hover:border hover:border-[var(--primary-color)] transition-all">
              <Send size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <div>
          © {new Date().getFullYear()} WHITE HAT DEV. All Rights Reserved. Built with React & Cyberpunk HUD Engine.
        </div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-4">
          <span>SECURITY_LEVEL: MAXIMUM</span>
          <span>•</span>
          <span>SSL_ENCRYPTED_256</span>
        </div>
      </div>
    </footer>
  );
};
