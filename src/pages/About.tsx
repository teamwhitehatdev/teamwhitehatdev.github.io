import { useApp } from '../context/AppContext';
import React from 'react';
import { Terminal, Shield, Cpu, Code, Sparkles, CheckCircle2, ArrowRight, Zap, Globe, Eye, Layers, Atom, Activity, Rocket, Lock, Server, Users, HelpCircle } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const About: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const cmsAboutItems = getPublicPageCMSItems('about');

  return (
    <div className="space-y-10 max-w-5xl mx-auto px-4 py-6 font-mono">
      
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

      {/* DYNAMIC CMS ANNOUNCEMENTS */}
      {cmsAboutItems.length > 0 && (
        <HUDPanel title="⚡ CMS PUBLISHED ANNOUNCEMENTS &amp; UPDATES">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {cmsAboutItems.map(item => (
              <div key={item.id} className="bg-black/90 border border-cyan-500/40 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-lime-400 font-bold">
                  <span>{item.category?.toUpperCase() || 'ANNOUNCEMENT'}</span>
                  <span className="text-[10px] text-gray-400 font-sans">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-sm font-bold text-white font-rajdhani uppercase">{item.title}</h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </HUDPanel>
      )}

      {/* PURPOSE & MISSION PANEL */}
      <HUDPanel title="🎯 OUR PURPOSE &amp; ETHICAL MISSION">
        <div className="p-6 space-y-4 font-sans text-xs sm:text-sm text-gray-300 leading-relaxed">
          <div className="bg-black/90 border border-gray-800 p-5 rounded-2xl space-y-3">
            <h3 className="text-lg font-black font-rajdhani text-white uppercase flex items-center space-x-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>TRANSPARENT DIGITAL TOOLS &amp; ETHICAL SECURITY ETHICS</span>
            </h3>
            <p>
              At <strong className="text-white font-mono">Team WhiteHat Dev</strong>, our core purpose is to bridge the gap between high-level software engineering and practical remote work solutions. We believe in providing transparent, reliable digital tools and executive virtual assistant services built on strict WhiteHat security ethics.
            </p>
            <p>
              Whether you are an international business seeking a dedicated virtual assistant, an e-commerce startup building a web application, or a freelancer looking to upskill in remote work technologies, our platform provides authoritative blueprints and verified infrastructure.
            </p>
          </div>
        </div>
      </HUDPanel>

      {/* 4 CORE PILLARS PANEL */}
      <HUDPanel title="⚙️ WHAT IS TEAM WHITE HAT DEV? (4 CORE PILLARS)">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-black/90 border border-gray-800 p-5 rounded-2xl space-y-2.5 hover:border-cyan-400 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black font-rajdhani text-white uppercase">
                1. FULL-STACK WEB DEVELOPMENT
              </h3>
            </div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              We design and build ultra-fast, responsive Single Page Applications (SPAs) using modern web technologies including React, TypeScript, Vite, and Tailwind CSS.
            </p>
          </div>

          <div className="bg-black/90 border border-gray-800 p-5 rounded-2xl space-y-2.5 hover:border-cyan-400 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black font-rajdhani text-white uppercase">
                2. MOBILE APP DEVELOPMENT
              </h3>
            </div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              Our software engineering team publishes cross-platform Android &amp; iOS mobile applications directly to the official Google Play Console and App Stores.
            </p>
          </div>

          <div className="bg-black/90 border border-gray-800 p-5 rounded-2xl space-y-2.5 hover:border-cyan-400 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/40 text-lime-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black font-rajdhani text-white uppercase">
                3. CYBERSECURITY &amp; ACTIVE FIREWALL
              </h3>
            </div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              We implement real-time visitor telemetry, AES-256 connection security, and automated IP banning firewall overlays to protect digital assets from unauthorized access.
            </p>
          </div>

          <div className="bg-black/90 border border-gray-800 p-5 rounded-2xl space-y-2.5 hover:border-cyan-400 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/40 text-pink-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black font-rajdhani text-white uppercase">
                4. EXECUTIVE VIRTUAL ASSISTANCE
              </h3>
            </div>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              We connect global founders with highly trained Virtual Assistants for executive email triage, calendar scheduling, reels editing, and administrative CRM management.
            </p>
          </div>

        </div>
      </HUDPanel>

      {/* BRAND MOTTO & VISION */}
      <div className="bg-gradient-to-r from-cyan-950 via-black to-purple-950 border-2 border-lime-400 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-2xl">
        <span className="text-xs font-bold text-lime-400 uppercase tracking-widest block font-mono">
          OUR MOTTO &amp; GUIDING VISION
        </span>
        <h2 className="text-2xl sm:text-4xl font-black font-rajdhani text-white uppercase tracking-wider">
          "LEARN. CREATE. DEVELOP. ASSIST. GROW."
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed">
          We don't just build software for today. We explore what software, remote assistance, and digital empowerment can become tomorrow.
        </p>
      </div>

    </div>
  );
};
export default About;
