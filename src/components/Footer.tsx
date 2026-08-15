import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Server, ShoppingBag, Mic, Smartphone, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";
  const PLAY_STORE_URL = "https://play.google.com/store/apps/dev?id=7374638355121114347";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/95 border-t-2 border-cyan-500/40 text-gray-400 font-mono relative z-20 mt-16 pt-10 pb-16 sm:pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2.5">
              <img src="./favicon.png" alt="Team WhiteHat Dev Logo" className="w-8 h-8 rounded-full border border-cyan-400 object-cover" />
              <div className="flex flex-col">
                <span className="font-black font-rajdhani text-lg text-white tracking-widest uppercase leading-none">
                  WHITE HAT DEV
                </span>
                <span className="text-[8px] text-lime-400 font-mono font-bold leading-tight uppercase pt-0.5">
                  LEARN. CREATE. DEVELOP. ASSIST. GROW.
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
              Your all-in-one digital hub for Virtual Assistance, Technology, Development, Creativity, and Digital Opportunities.
            </p>
            <div className="text-[10px] text-lime-400 font-mono font-bold pt-1">
              "We don't just build software for today. We explore what software can become tomorrow."
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider border-b border-gray-800 pb-1">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors block py-0.5">&gt; Home</Link></li>
              <li><Link to="/showcase" className="hover:text-cyan-400 transition-colors block py-0.5">&gt; Showcase</Link></li>
              <li><Link to="/web-hosting" className="hover:text-cyan-400 transition-colors block py-0.5">&gt; Web Hosting</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors block py-0.5">&gt; Services</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors block py-0.5">&gt; About</Link></li>
              <li><Link to="/affiliate-guide" className="hover:text-lime-300 transition-colors block py-0.5 text-lime-400 font-bold">&gt; Become Successful Affiliate Marketer</Link></li>
            </ul>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider border-b border-gray-800 pb-1">
              VERIFIED PARTNERS
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="https://www.atome.ph/s/cbcqZc5Ak" target="_blank" rel="sponsored noopener noreferrer" className="hover:text-yellow-300 transition-colors flex items-center justify-center sm:justify-start space-x-1 py-0.5">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span>Atome Card (₱7,800 Cashback Perk)</span>
                </a>
              </li>
              <li>
                <a href="https://wondersharesoftware.pxf.io/c/5024116/1266881/15586" target="_blank" rel="sponsored noopener noreferrer" className="hover:text-purple-300 transition-colors flex items-center justify-center sm:justify-start space-x-1 py-0.5">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Wondershare AI Creator Suite</span>
                </a>
              </li>
              <li>
                <a href={HOSTINGER_LINK} target="_blank" rel="sponsored noopener noreferrer" className="hover:text-lime-300 transition-colors flex items-center justify-center sm:justify-start space-x-1 py-0.5">
                  <Server className="w-3 h-3 text-lime-400" />
                  <span>Hostinger Cloud (75% OFF)</span>
                </a>
              </li>
              <li>
                <a href={GUMROAD_LINK} target="_blank" rel="sponsored noopener noreferrer" className="hover:text-pink-300 transition-colors flex items-center justify-center sm:justify-start space-x-1 py-0.5">
                  <ShoppingBag className="w-3 h-3 text-pink-400" />
                  <span>Gumroad Creator Store</span>
                </a>
              </li>
              <li>
                <a href={ELEVENLABS_LINK} target="_blank" rel="sponsored noopener noreferrer" className="hover:text-purple-300 transition-colors flex items-center justify-center sm:justify-start space-x-1 py-0.5">
                  <Mic className="w-3 h-3 text-purple-400" />
                  <span>ElevenLabs AI Voice Studio</span>
                </a>
              </li>
              <li>
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors flex items-center justify-center sm:justify-start space-x-1 py-0.5">
                  <Smartphone className="w-3 h-3 text-cyan-400" />
                  <span>Google Play Developer Apps</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider border-b border-gray-800 pb-1">
              CYBER SENTINEL &amp; SAFETY
            </h4>
            <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
              Protected by WhiteHat Sentinel Firewall with AES-256 telemetry monitoring and automated IP filtering.
            </p>
            <div className="pt-1 flex justify-center sm:justify-start space-x-2">
              <span className="inline-flex items-center space-x-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] px-2.5 py-1 rounded-full font-bold">
                <Shield className="w-3 h-3 text-lime-400" />
                <span>SSL SECURE 256-BIT</span>
              </span>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs space-y-4 md:space-y-0 text-center md:text-left">
          <div className="text-gray-400 font-sans">
            &copy; {currentYear} <strong className="text-white font-mono uppercase">Team WhiteHat Dev</strong>. All Rights Reserved. LEARN. CREATE. DEVELOP. ASSIST. GROW.
          </div>

          <div className="flex flex-wrap justify-center space-x-4 text-[11px] text-gray-400">
            <Link to="/about" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-cyan-400 transition-colors">Client Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
