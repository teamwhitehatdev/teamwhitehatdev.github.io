import React from 'react';
import { Shield, Smartphone, Heart, Sparkles, ExternalLink, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/95 border-t border-cyan-500/30 text-gray-400 py-10 font-mono select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-black font-orbitron text-white uppercase tracking-wider">
                TEAM WHITEHAT DEV
              </span>
            </div>
            
            {/* TAGLINE UNDERNEATH LOGO */}
            <p className="text-xs font-mono font-bold text-cyan-300 tracking-wide uppercase">
              Next-Generation Software • AI • Development • Automation • Digital Innovation
            </p>

            <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-md pt-1">
              Full-Stack Cyber Security Engineering, Web Application Architecture, Virtual Assistant Solutions, and Official Google Play App Publishing.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-widest font-orbitron flex items-center space-x-1.5">
              <Code className="w-4 h-4 text-lime-400" />
              <span>NAVIGATE</span>
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li><a href="#/" className="hover:text-cyan-300 transition-colors">Home Page</a></li>
              <li><a href="#/services" className="hover:text-cyan-300 transition-colors">Services &amp; Pricing</a></li>
              <li><a href="#/about" className="hover:text-cyan-300 transition-colors">About Us</a></li>
              <li><a href="#/affiliate-guide" className="hover:text-cyan-300 transition-colors">Affiliate Marketer Guide</a></li>
              <li><a href="#/showcase" className="hover:text-cyan-300 transition-colors">Software &amp; Showcase</a></li>
              <li><a href="#/web-hosting" className="hover:text-cyan-300 transition-colors">Web Hosting Deals</a></li>
            </ul>
          </div>

          {/* Developer Profile Section (With Official Google Play Developer Page link underneath) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-widest font-orbitron flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>DEVELOPER PROFILE</span>
            </h4>
            
            <div className="space-y-2 text-xs font-sans">
              <p className="text-gray-300">
                Verified Google Play Store App Developer:
              </p>
              <a
                href="https://play.google.com/store/apps/dev?id=7374638355121114347"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline font-mono text-[11px] block break-all font-bold"
              >
                ID: 7374638355121114347
              </a>
            </div>

            {/* Official Google Play Developer Page button placed underneath DEVELOPER PROFILE */}
            <div className="pt-2">
              <a
                href="https://play.google.com/store/apps/dev?id=7374638355121114347"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-[11px] font-bold font-orbitron px-3.5 py-2 rounded-xl border border-emerald-400/50 shadow-md transition-all group hover:scale-[1.02]"
              >
                <Smartphone className="w-4 h-4 text-lime-300 group-hover:scale-110 transition-transform" />
                <span>OFFICIAL GOOGLE PLAY DEVELOPER PAGE</span>
                <ExternalLink className="w-3 h-3 text-cyan-200" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Year Established & Mission Statement */}
        <div className="border-t border-gray-900 pt-6 text-center text-xs text-gray-400 leading-relaxed">
          <p className="font-mono text-xs text-gray-300 font-bold max-w-5xl mx-auto">
            teamwhitehatdev 2016 - 2026. &nbsp;&nbsp;|&nbsp;&nbsp; Our mission is to turn innovative ideas into functional digital experiences that can help individuals, creators, professionals, and businesses. &nbsp;&nbsp;|&nbsp;&nbsp; Learn. Create. Develop. Assist. Innovate.
          </p>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
