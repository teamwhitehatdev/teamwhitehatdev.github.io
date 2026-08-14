import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Terminal, Globe, Server, ExternalLink, Smartphone } from 'lucide-react';
import { PLAY_STORE_URL } from '../utils/initialData';

export const Footer: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";

  return (
    <footer className="bg-black/95 border-t border-cyan-500/30 text-gray-400 font-mono text-xs mt-16 select-none relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-900">
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="./logo.png"
                alt="Team WhiteHat Dev Logo"
                className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover"
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
          </div>

          {/* WEBSITES MAPPING / SITEMAP */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 font-rajdhani uppercase tracking-widest border-b border-cyan-500/30 pb-1 flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>WEBSITES MAPPING & NAVIGATION</span>
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">🏠 HOME (VA ACCELERATOR & MASTERCLASS)</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">🛠️ SERVICES (VA & FULL-STACK DEV)</Link></li>
              <li><Link to="/web-hosting" className="hover:text-lime-400 text-lime-300 font-bold transition-colors">🌐 WEB HOSTING (HOSTINGER CLOUD DEALS)</Link></li>
              <li><Link to="/showcase" className="hover:text-cyan-400 transition-colors">🚀 SHOWCASE (FEATURED PROJECTS)</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">ℹ️ ABOUT US (VISION & DIGITAL HUB)</Link></li>
              <li><a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 text-lime-400 font-bold">📱 GOOGLE PLAY STORE APPS</a></li>
              <li><Link to="/admin" className="hover:text-purple-400 text-purple-300 font-bold">🔑 MASTER BACK-END CMS PORTAL</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-lime-400 font-rajdhani uppercase tracking-widest border-b border-lime-500/30 pb-1 flex items-center space-x-1">
              <Server className="w-3.5 h-3.5 text-lime-400" />
              <span>OFFICIAL REFERRAL PARTNERS</span>
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li><a href={HOSTINGER_LINK} target="_blank" rel="sponsored noopener noreferrer" className="hover:text-lime-300 text-lime-400 font-bold">⚡ HOSTINGER WEB HOSTING (75% OFF)</a></li>
              <li><a href={GUMROAD_LINK} target="_blank" rel="sponsored noopener noreferrer" className="hover:text-cyan-400 text-cyan-300 font-bold">📦 GUMROAD DIGITAL PRODUCTS HUB</a></li>
              <li><a href={ELEVENLABS_LINK} target="_blank" rel="sponsored noopener noreferrer" className="hover:text-purple-400 text-purple-300 font-bold">🎙️ ELEVENLABS AI VOICE STUDIO</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono pt-4 text-gray-500">
          <span>&copy; 2010 - 2026 TEAM WHITEHAT DEV. ALL RIGHTS RESERVED.</span>
          <span className="text-lime-400 font-bold">• FASTLY CDN EDGE DEPLOYED</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
