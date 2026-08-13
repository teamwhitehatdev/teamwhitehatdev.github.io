import React from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { Shield, Sparkles, Terminal, Code, Cpu, Globe, Rocket, Award, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-10 font-mono max-w-7xl mx-auto pb-10">
      <div className="bg-gradient-to-r from-gray-900 via-black to-cyan-950/90 border border-cyan-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 bg-lime-500/20 border border-lime-500/40 text-lime-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-lime-400 animate-spin" />
          <span>ALL-IN-ONE DIGITAL PLATFORM & VA ACCELERATOR</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-rajdhani text-white uppercase tracking-wide leading-tight">
          TEAM WHITEHAT DEV <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400">
            — LEARN. CREATE. DEVELOP. ASSIST. GROW.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans max-w-4xl">
          Team WhiteHat Dev is an all-in-one digital platform for Virtual Assistants, developers, freelancers, creators, entrepreneurs, and businesses. Learn how to become a successful Virtual Assistant, discover valuable digital tools and resources, explore software and web development, build mobile applications, improve your digital skills, and discover opportunities in graphic design, music production, 3D modeling, affiliate marketing, freelancing, and more.
        </p>

        <div className="pt-2 text-xs font-bold text-lime-400 font-mono tracking-widest border-t border-gray-800">
          ESTABLISHED & TRUSTED SINCE YEAR 2010 - YEAR 2026
        </div>
      </div>
    </div>
  );
};
export default About;
