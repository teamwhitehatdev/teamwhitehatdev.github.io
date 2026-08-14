import React, { useState, useEffect } from 'react';
import { HUDPanel } from './HUDPanel';
import { ExternalLink, Sparkles, Server, ShoppingBag, Mic, ShieldCheck, Flame, ArrowRight } from 'lucide-react';

export const DynamicAdsSidebar: React.FC = () => {
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const ELEVENLABS_LINK = "https://try.elevenlabs.io/e5xwigkl9igv";

  const [activeAdIndex, setActiveAdIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAdIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* DYNAMIC ADS SIDEBAR CONTAINER */}
      <HUDPanel title="⚡ DYNAMIC ADS & SPONSORED OFFERS">
        <div className="p-4 space-y-5">
          
          {/* ADSENSE READY HEADER NOTICE */}
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono border-b border-gray-800 pb-2">
            <span className="flex items-center space-x-1 text-lime-400 font-bold">
              <Flame className="w-3.5 h-3.5 animate-bounce text-lime-400" />
              <span>SPONSORED PROMO PLACEMENTS</span>
            </span>
            <span className="text-gray-500 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
              ADSENSE READY
            </span>
          </div>

          {/* DYNAMIC ROTATING BANNER ADS */}
          {activeAdIndex === 0 && (
            <div className="bg-gradient-to-br from-gray-900 via-black to-lime-950/90 border-2 border-lime-500/60 p-4 rounded-2xl space-y-3 shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
                  <Server className="w-3.5 h-3.5 text-lime-400" />
                  <span>MUST-HAVE VA HOSTING</span>
                </span>
                <span className="bg-lime-500/20 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-lime-500/40">
                  CODE: DPDCABINCEHM
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-lime-500/40">
                <img src="./media_1786586391503.png" alt="Hostinger Web Hosting Banner" className="w-full h-32 object-cover hover:scale-105 transition-transform" />
              </div>

              <h4 className="text-sm font-black font-rajdhani text-white uppercase">
                HOSTINGER CLOUD & VPS (75% OFF + FREE DOMAIN)
              </h4>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Clients hire VAs with personal portfolio websites 4x faster. Hostinger gives you NVMe storage, free SSL, and 24/7 support.
              </p>

              <a
                href={HOSTINGER_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="block w-full py-2.5 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-extrabold text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all"
              >
                CLAIM HOSTINGER DEALS (75% OFF) &rarr;
              </a>
            </div>
          )}

          {activeAdIndex === 1 && (
            <div className="bg-gradient-to-br from-gray-900 via-black to-cyan-950/90 border-2 border-cyan-500/60 p-4 rounded-2xl space-y-3 shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest flex items-center space-x-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>VA TEMPLATES KIT</span>
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/40">
                  GUMROAD STORE
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-cyan-500/40">
                <img src="./media_1786590207160.png" alt="Gumroad Marketplace" className="w-full h-32 object-cover hover:scale-105 transition-transform" />
              </div>

              <h4 className="text-sm font-black font-rajdhani text-white uppercase">
                GUMROAD VA CLIENT PROPOSAL TEMPLATES
              </h4>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Download verified client contract templates, social media content planners, and cold email pitch scripts.
              </p>

              <a
                href={GUMROAD_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="block w-full py-2.5 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-extrabold text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all"
              >
                EXPLORE GUMROAD KITS &rarr;
              </a>
            </div>
          )}

          {activeAdIndex === 2 && (
            <div className="bg-gradient-to-br from-gray-900 via-black to-purple-950/90 border-2 border-purple-500/60 p-4 rounded-2xl space-y-3 shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-widest flex items-center space-x-1">
                  <Mic className="w-3.5 h-3.5 text-purple-400" />
                  <span>AI VOICEOVER STUDIO</span>
                </span>
                <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/40">
                  FREE TRIAL
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-purple-500/40">
                <img src="./media_1786191713841.jpg" alt="ElevenLabs AI Voice Studio" className="w-full h-32 object-cover hover:scale-105 transition-transform" />
              </div>

              <h4 className="text-sm font-black font-rajdhani text-white uppercase">
                ELEVENLABS AI VOICE & AUDIO GENERATOR
              </h4>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Offer premium AI voiceovers, podcast editing, and audiobook narrations for high-paying international clients.
              </p>

              <a
                href={ELEVENLABS_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="block w-full py-2.5 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-extrabold text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all"
              >
                TRY ELEVENLABS FREE &rarr;
              </a>
            </div>
          )}

          {/* GOOGLE ADSENSE PLACEHOLDER CONTAINER */}
          <div className="bg-black/90 border border-dashed border-gray-800 p-4 rounded-2xl text-center space-y-2">
            <span className="text-[10px] text-gray-500 font-mono uppercase block">
              ADVERTISING SLOT • GOOGLE ADSENSE & MEDIA.NET READY
            </span>
            <div className="text-xs text-gray-400 font-sans">
              Google AdSense auto-ads script and responsive banner ad units can be dynamically injected into this container upon approval.
            </div>
          </div>

        </div>
      </HUDPanel>

    </div>
  );
};
export default DynamicAdsSidebar;
