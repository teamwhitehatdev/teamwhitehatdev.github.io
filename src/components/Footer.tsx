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
                TEAM WHITE HAT DEV
              </span>
            </div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed max-w-md">
              Full-Stack Cyber Security Engineering, Web Application Architecture, Virtual Assistant Solutions, and Official Mobile App Development.
            </p>

            {/* Official Google Play Developer Console Link */}
            <div className="pt-2">
              <a
                href="https://play.google.com/store/apps/dev?id=7374638355121114347"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold font-rajdhani uppercase tracking-wider shadow-lg hover:shadow-cyan-500/20 transition-all border border-emerald-400/40 group"
              >
                <Smartphone className="w-4 h-4 text-lime-300 group-hover:scale-110 transition-transform" />
                <span>OFFICIAL GOOGLE PLAY DEVELOPER PAGE</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-200" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-widest font-orbitron flex items-center space-x-1">
              <Code className="w-4 h-4 text-lime-400" />
              <span>NAVIGATE</span>
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li><a href="#/" className="hover:text-cyan-300 transition-colors">Home Page</a></li>
              <li><a href="#/services" className="hover:text-cyan-300 transition-colors">Services &amp; Pricing</a></li>
              <li><a href="#/about" className="hover:text-cyan-300 transition-colors">About Us</a></li>
              <li><a href="#/affiliate-guide" className="hover:text-cyan-300 transition-colors">Affiliate Marketer Guide</a></li>
              <li><a href="#/admin" className="hover:text-cyan-300 transition-colors">Stealth CMS Admin Log</a></li>
            </ul>
          </div>

          {/* Developer Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-widest font-orbitron flex items-center space-x-1">
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
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-sans space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-1">
            <span>&copy; {new Date().getFullYear()} Team White Hat Dev. Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" />
            <span>in Philippines 🇵🇭</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://play.google.com/store/apps/dev?id=7374638355121114347"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center space-x-1"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Play Developer Store</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
