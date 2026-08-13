import React from 'react';
import { ExternalLink, Sparkles, Server, ShoppingBag, Mic, Smartphone, ShieldCheck } from 'lucide-react';
import { HUDPanel } from './HUDPanel';

export const AffiliateBanners: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";
  const PLAY_STORE_URL = "https://play.google.com/store/apps/dev?id=7374638355121114347";

  return (
    <HUDPanel title="OFFICIAL REFERRAL PARTNERS & TRUSTED PROMO PLACEMENTS">
      <div className="p-6 space-y-6">
        <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
          Accelerate your Virtual Assistant career and online business with our official verified referral partners. Get exclusive discounts on web hosting, digital tools, AI voice generators, and mobile developer suites:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* BANNER 1: HOSTINGER WEB HOSTING */}
          <div className="bg-gradient-to-br from-gray-900 via-black to-lime-950/80 border-2 border-lime-500/50 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
                  <Server className="w-4 h-4 text-lime-400" />
                  <span>RECOMMENDED HOSTING</span>
                </span>
                <span className="bg-lime-500/20 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-lime-500/40">
                  CODE: DPDCABINCEHM
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-lime-500/30">
                <img src="./media_1786586391503.png" alt="Hostinger Web Hosting Deals" className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300" />
              </div>

              <h4 className="text-base font-black font-rajdhani text-white uppercase">
                HOSTINGER CLOUD & VPS HOSTING (UP TO 75% OFF)
              </h4>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Ultra-fast NVMe web hosting with free custom domain, unlimited SSL certificates, and 1-click WordPress setup. Perfect for VAs hosting client websites.
              </p>
            </div>

            <a
              href={HOSTINGER_LINK}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <span>CLAIM HOSTINGER DISCOUNT (75% OFF)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* BANNER 2: GUMROAD DIGITAL MARKETPLACE */}
          <div className="bg-gradient-to-br from-gray-900 via-black to-cyan-950/80 border-2 border-cyan-500/50 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest flex items-center space-x-1">
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  <span>DIGITAL PRODUCTS</span>
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/40">
                  VERIFIED STORE
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-cyan-500/30">
                <img src="./media_1786590207160.png" alt="Gumroad Digital Marketplace" className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300" />
              </div>

              <h4 className="text-base font-black font-rajdhani text-white uppercase">
                GUMROAD DIGITAL ASSETS & VA TEMPLATES
              </h4>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Explore curated digital templates, software tools, client proposal kits, and ebooks to build your online freelancing business.
              </p>
            </div>

            <a
              href={GUMROAD_LINK}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <span>DISCOVER GUMROAD PRODUCTS</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* BANNER 3: ELEVENLABS AI VOICEOVER */}
          <div className="bg-gradient-to-br from-gray-900 via-black to-purple-950/80 border-2 border-purple-500/50 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-purple-400 uppercase tracking-widest flex items-center space-x-1">
                  <Mic className="w-4 h-4 text-purple-400" />
                  <span>AI VOICE GENERATOR</span>
                </span>
                <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/40">
                  FREE TRIAL
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-purple-500/30">
                <img src="./media_1786191713841.jpg" alt="ElevenLabs AI Voice Studio" className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300" />
              </div>

              <h4 className="text-base font-black font-rajdhani text-white uppercase">
                ELEVENLABS AI VOICE & AUDIO GENERATOR
              </h4>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Generate human-like AI voiceovers for podcasting, content creation, client videos, and virtual assistant tasks in 29+ languages.
              </p>
            </div>

            <a
              href={ELEVENLABS_LINK}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <span>TRY ELEVENLABS FREE</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* BANNER 4: GOOGLE PLAY DEVELOPER SUITE */}
          <div className="bg-gradient-to-br from-gray-900 via-black to-lime-950/80 border-2 border-lime-500/50 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
                  <Smartphone className="w-4 h-4 text-lime-400" />
                  <span>ANDROID APPS</span>
                </span>
                <span className="bg-lime-500/20 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-lime-500/40">
                  OFFICIAL PLAY STORE
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-lime-500/30">
                <img src="./media_1786178491269.jpg" alt="Google Play Developer Apps" className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300" />
              </div>

              <h4 className="text-base font-black font-rajdhani text-white uppercase">
                OFFICIAL GOOGLE PLAY STORE APPS SUITE
              </h4>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Download our collection of published mobile productivity applications, utilities, and developer tools directly on Android devices.
              </p>
            </div>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <span>VIEW GOOGLE PLAY STORE APPS</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </HUDPanel>
  );
};

export default AffiliateBanners;
