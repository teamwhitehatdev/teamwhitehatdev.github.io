import { useApp } from '../context/AppContext';
import React from 'react';
import { Terminal, Shield, Cpu, Code, Sparkles, CheckCircle2, ArrowRight, Zap, Globe, Eye, Layers, Atom, Activity, Rocket, ExternalLink, Award, Lock, Server, Users, HelpCircle } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { DynamicAffiliateAd } from '../components/DynamicAffiliateAd';

export const About: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const cmsAboutItems = getPublicPageCMSItems('about');

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 py-6 font-mono">
      
      {/* HEADER HERO */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-300 text-xs font-bold uppercase tracking-widest">
          <Terminal className="w-4 h-4 text-lime-400" />
          <span>ABOUT TEAM WHITEHAT DEV</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-rajdhani text-white uppercase tracking-wider">
          WHO IS TEAM WHITE HAT DEV?
        </h1>
        <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed">
          Welcome to <strong className="text-white font-mono uppercase">Team WhiteHat Dev</strong>. We are a high-technology digital organization focused on ethical cybersecurity, custom full-stack web applications, mobile software engineering, and executive virtual assistance solutions.
        </p>
      </div>

      {/* DYNAMIC CMS CONTENT ITEMS */}
      {cmsAboutItems.length > 0 && (
        <HUDPanel title=" CMS PUBLISHED ANNOUNCEMENTS &amp; UPDATES">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {cmsAboutItems.map(item => (
              <div key={item.id} className="bg-black/90 border border-cyan-500/40 p-4 rounded-xl space-y-2">
                {item.mainImage && (
                  <img src={item.mainImage} alt={item.title} className="w-full h-40 object-cover rounded-lg border border-gray-800" />
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase">{item.category}</span>
                  <span className="text-[10px] text-lime-400 font-mono font-bold">UPDATED</span>
                </div>
                <h4 className="text-sm font-bold font-rajdhani text-white uppercase">{item.title}</h4>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">{item.description}</p>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 font-mono font-bold hover:underline inline-flex items-center gap-1 pt-1">
                    <span>EXPLORE LINK</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </HUDPanel>
      )}

      {/* MAIN CONTENT LAYOUT WITH SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: ABOUT TEAM WHITEHAT DETAILS (2 COLS) */}
        <div className="lg:col-span-2 space-y-8">

          {/* OUR PURPOSE & MISSION */}
          <HUDPanel title=" OUR PURPOSE &amp; MISSION">
            <div className="p-5 space-y-4 font-sans text-xs">
              <p className="text-gray-200 leading-relaxed">
                The primary purpose of <strong className="text-white font-mono">Team WhiteHat Dev</strong> is to empower businesses, remote freelancers, and Virtual Assistants with cutting-edge technology tools, transparent infrastructure guidance, and high-performance digital services.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                <div className="p-4 bg-black/80 border border-cyan-500/30 rounded-xl space-y-1.5">
                  <span className="text-cyan-400 font-bold text-xs flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-lime-400" />
                    <span>ETHICAL STANDARDS</span>
                  </span>
                  <p className="text-[11px] text-gray-300 font-sans">
                    We practice WhiteHat security ethics, protecting digital assets against cyber threats with AES-256 telemetry.
                  </p>
                </div>

                <div className="p-4 bg-black/80 border border-purple-500/30 rounded-xl space-y-1.5">
                  <span className="text-purple-400 font-bold text-xs flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>FUTURE TECH</span>
                  </span>
                  <p className="text-[11px] text-gray-300 font-sans">
                    Integrating AI automation, cloud web hosting, and mobile software architecture for maximum performance.
                  </p>
                </div>
              </div>
            </div>
          </HUDPanel>

          {/* WHAT IS TEAM WHITEHAT DEV? (4 CORE PILLARS) */}
          <HUDPanel title=" WHAT IS TEAM WHITE HAT DEV? (4 CORE PILLARS)">
            <div className="p-5 space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                
                <div className="bg-black/90 border border-gray-800 p-4 rounded-xl space-y-2 hover:border-cyan-500/50 transition-all">
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold">
                    <Code className="w-4 h-4" />
                    <span>1. FULL-STACK WEB DEV</span>
                  </div>
                  <p className="text-gray-300 font-sans leading-relaxed text-[11px]">
                    Custom React, TypeScript, and Vite single-page applications optimized for search engine visibility and zero latency.
                  </p>
                </div>

                <div className="bg-black/90 border border-gray-800 p-4 rounded-xl space-y-2 hover:border-lime-500/50 transition-all">
                  <div className="flex items-center space-x-2 text-lime-400 font-bold">
                    <Rocket className="w-4 h-4" />
                    <span>2. MOBILE APP DEV</span>
                  </div>
                  <p className="text-gray-300 font-sans leading-relaxed text-[11px]">
                    Native Android &amp; iOS application development published on Google Play Store with real-time push notifications.
                  </p>
                </div>

                <div className="bg-black/90 border border-gray-800 p-4 rounded-xl space-y-2 hover:border-purple-500/50 transition-all">
                  <div className="flex items-center space-x-2 text-purple-400 font-bold">
                    <Shield className="w-4 h-4" />
                    <span>3. CYBERSECURITY</span>
                  </div>
                  <p className="text-gray-300 font-sans leading-relaxed text-[11px]">
                    Vulnerability audits, firewall implementation, SSL encryption verification, and active IP banning telemetry.
                  </p>
                </div>

                <div className="bg-black/90 border border-gray-800 p-4 rounded-xl space-y-2 hover:border-pink-500/50 transition-all">
                  <div className="flex items-center space-x-2 text-pink-400 font-bold">
                    <Users className="w-4 h-4" />
                    <span>4. VIRTUAL ASSISTANCE</span>
                  </div>
                  <p className="text-gray-300 font-sans leading-relaxed text-[11px]">
                    Dedicated executive assistant services, email management, social media reels editing, and client appointment booking.
                  </p>
                </div>

              </div>
            </div>
          </HUDPanel>

          {/* MOTTO & BRAND VISION */}
          <HUDPanel title=" OUR BRAND MOTTO &amp; VISION">
            <div className="p-5 space-y-3 font-sans text-xs">
              <div className="p-4 bg-gradient-to-r from-cyan-950 via-gray-900 to-purple-950 border border-cyan-500/40 rounded-xl space-y-2 text-center font-mono">
                <span className="text-lime-400 font-black text-sm tracking-widest block uppercase">
                  "LEARN. CREATE. DEVELOP. ASSIST. GROW."
                </span>
                <p className="text-xs text-gray-300 font-sans italic max-w-xl mx-auto">
                  "We don't just build software for today. We explore what software and digital assistance can become tomorrow."
                </p>
              </div>
            </div>
          </HUDPanel>

          {/* DYNAMIC AFFILIATE STANDALONE PLACEMENTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DynamicAffiliateAd category="security" sizeType="hero" />
            <DynamicAffiliateAd category="education" sizeType="hero" />
          </div>

        </div>

        {/* DEDICATED PROMO ADS COLUMN (1 COL) */}
        <aside className="lg:col-span-1 border-t lg:border-t-0 lg:border-l-2 border-cyan-500/40 lg:pl-6 space-y-6 sticky top-24">
          <DynamicAdsSidebar />
        </aside>

      </div>

    </div>
  );
};
export default About;
