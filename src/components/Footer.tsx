import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Terminal, Globe, Server, ExternalLink } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/initialData';

export const Footer: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";

  return (
    <footer className="bg-black/95 border-t border-cyan-500/30 text-gray-400 font-mono text-xs mt-16 select-none relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* TOP ROW: BRAND & SYSTEM STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-900">
          
          {/* BRAND COLUMN */}
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="./logo.png"
                alt="Team WhiteHat Dev Official Logo"
                className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="text-base font-extrabold font-rajdhani text-white uppercase tracking-wider block leading-none">
                  TEAM WHITEHAT DEV
                </span>
                <span className="text-[10px] text-lime-400 font-bold block leading-tight pt-0.5">
                  Learn. Create. Develop. Assist. Grow.
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              All-in-one digital platform empowering Virtual Assistants, developers, freelancers, creators, and entrepreneurs worldwide with masterclass training, software development, and cloud solutions.
            </p>

            <div className="flex items-center space-x-2 text-[10px] text-lime-400 font-bold bg-lime-500/10 border border-lime-500/30 px-2.5 py-1 rounded-md w-max">
              <Shield className="w-3 h-3 text-lime-400" />
              <span>AES-256 ENCRYPTED FIREWALL ACTIVE</span>
            </div>
          </div>

          {/* SECTION 2: WEBSITES MAPPING / SITEMAP (STEALTH MODE - NO ADMIN LINK) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 font-rajdhani uppercase tracking-widest border-b border-cyan-500/30 pb-1 flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>WEBSITES MAPPING & NAVIGATION</span>
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-cyan-400">&rsaquo;</span>
                  <span>🏠 HOME (VA ACCELERATOR & MASTERCLASS)</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-cyan-400">&rsaquo;</span>
                  <span>🛠️ SERVICES (VA & FULL-STACK DEV)</span>
                </Link>
              </li>
              <li>
                <Link to="/web-hosting" className="hover:text-lime-400 text-lime-300 font-bold transition-colors flex items-center space-x-1.5">
                  <span className="text-lime-400">&rsaquo;</span>
                  <span>🌐 WEB HOSTING (HOSTINGER CLOUD DEALS)</span>
                </Link>
              </li>
              <li>
                <Link to="/showcase" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-cyan-400">&rsaquo;</span>
                  <span>🚀 SHOWCASE (FEATURED PROJECTS)</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                  <span className="text-cyan-400">&rsaquo;</span>
                  <span>ℹ️ ABOUT US (VISION & DIGITAL HUB)</span>
                </Link>
              </li>
              <li>
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 text-lime-400 font-bold transition-colors flex items-center space-x-1.5">
                  <span className="text-lime-400">&rsaquo;</span>
                  <span>📱 GOOGLE PLAY STORE APPS</span>
                </a>
              </li>
            </ul>
          </div>

          {/* SECTION 3: REFERRAL PARTNERS & MONETIZATION */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-lime-400 font-rajdhani uppercase tracking-widest border-b border-lime-500/30 pb-1 flex items-center space-x-1">
              <Server className="w-3.5 h-3.5 text-lime-400" />
              <span>OFFICIAL REFERRAL PARTNERS</span>
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a href={HOSTINGER_LINK} target="_blank" rel="sponsored noopener noreferrer" className="hover:text-lime-300 text-lime-400 font-bold transition-colors flex items-center justify-between">
                  <span>⚡ HOSTINGER WEB HOSTING (75% OFF)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href={GUMROAD_LINK} target="_blank" rel="sponsored noopener noreferrer" className="hover:text-cyan-400 text-cyan-300 font-bold transition-colors flex items-center justify-between">
                  <span>📦 GUMROAD DIGITAL PRODUCTS HUB</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href={ELEVENLABS_LINK} target="_blank" rel="sponsored noopener noreferrer" className="hover:text-purple-400 text-purple-300 font-bold transition-colors flex items-center justify-between">
                  <span>🎙️ ELEVENLABS AI VOICE STUDIO</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="text-gray-400 text-[11px] block pt-1">
                  • Official Impact.com Affiliate Tracking Tag Active
                </span>
              </li>
            </ul>
          </div>

          {/* SECTION 4: SYSTEM TELEMETRY & SECURITY */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 font-rajdhani uppercase tracking-widest border-b border-cyan-500/30 pb-1 flex items-center space-x-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>SECURITY & SYSTEM TELEMETRY</span>
            </h4>
            <div className="space-y-2 text-[11px] font-mono">
              <div className="flex justify-between border-b border-gray-900 pb-1">
                <span className="text-gray-500">FIREWALL STATUS:</span>
                <span className="text-lime-400 font-bold">ONLINE (AES-256)</span>
              </div>
              <div className="flex justify-between border-b border-gray-900 pb-1">
                <span className="text-gray-500">LIVE TRADING TICKER:</span>
                <span className="text-lime-400 font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between border-b border-gray-900 pb-1">
                <span className="text-gray-500">IMPACT AFFILIATE TAG:</span>
                <span className="text-cyan-400 font-bold">VERIFIED</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-gray-500">SYSTEM UPTIME:</span>
                <span className="text-white font-bold">99.99%</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: COPYRIGHT */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono pt-4 text-gray-500">
          <div className="flex items-center space-x-2">
            <span>&copy; 2010 - 2026 TEAM WHITEHAT DEV. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400">DESIGNED FOR VIRTUAL ASSISTANTS & DEVELOPERS</span>
            <span className="text-lime-400 font-bold">• FASTLY CDN EDGE DEPLOYED</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
