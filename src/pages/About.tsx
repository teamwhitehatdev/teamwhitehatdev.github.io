import { useApp } from '../context/AppContext';
import React from 'react';
import { Terminal, Shield, Cpu, Code, Sparkles, CheckCircle2, ArrowRight, Zap, Globe, Eye, Layers, Atom, Activity, Rocket, ExternalLink, Award, Lock, Server, Palette } from 'lucide-react';
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
          ALL-IN-ONE DIGITAL ECOSYSTEM & FREELANCE VA GATEWAY
        </h1>
        <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed">
          Connecting Virtual Assistance, Web Development, Mobile Apps, Cybersecurity, and Professional Tech Certifications into one high-converting digital platform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* MAIN CONTENT COLUMN (3 COLS) */}
        <div className="lg:col-span-3 space-y-10">

          {/* VISION & CAPABILITIES */}
          <HUDPanel title="🚀 OUR VISION & CORE CAPABILITIES">
            <div className="p-6 space-y-6 font-sans text-xs text-gray-300 leading-relaxed">
              <p className="text-sm text-white">
                Team WhiteHat Dev is dedicated to building modern software solutions, empowering Virtual Assistants with career tools, and providing businesses with reliable remote technical assistance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {[
                  { icon: Sparkles, label: 'AI Prompt Engineering & Automation' },
                  { icon: Zap, label: 'Full-Stack Web & Mobile Engineering' },
                  { icon: Globe, label: 'Global Remote Virtual Assistance' },
                  { icon: Eye, label: 'Cybersecurity Audits & Data Privacy' },
                  { icon: Layers, label: 'Cloud Hosting & Domain Infrastructure' },
                  { icon: Atom, label: 'Digital Asset Design & Multimedia' },
                  { icon: Activity, label: 'High-Frequency Affiliate Marketing' },
                  { icon: Rocket, label: 'Certified Career Development Pathways' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-black/80 border border-gray-800 p-3 rounded-xl hover:border-cyan-500/40 transition-all">
                    <item.icon className="w-4 h-4 text-lime-400 flex-shrink-0" />
                    <span className="text-gray-200 text-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

          {/* ULTIMATE GUIDE TO BECOMING A SUCCESSFUL VIRTUAL ASSISTANT */}
          <HUDPanel title="🎓 ULTIMATE GUIDE: HOW TO BECOME A SUCCESSFUL VIRTUAL ASSISTANT">
            <div className="p-6 space-y-6 font-sans text-xs text-gray-300 leading-relaxed">
              
              <div className="bg-gradient-to-r from-cyan-950/60 via-black to-purple-950/60 border border-cyan-500/40 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black font-rajdhani text-white uppercase flex items-center space-x-2">
                  <Award className="w-5 h-5 text-lime-400" />
                  <span>STEP-BY-STEP VIRTUAL ASSISTANT SUCCESS ROADMAP</span>
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Becoming a top 1% Virtual Assistant requires the right combination of accredited skills, data security tools, reliable web hosting, and professional design software. Follow our verified recommendations below:
                </p>
              </div>

              {/* VA TOPIC 1 */}
              <div className="bg-black/90 border border-gray-800 p-4 rounded-2xl space-y-3 hover:border-cyan-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-cyan-400 font-mono uppercase flex items-center space-x-1.5">
                    <Lock className="w-4 h-4 text-lime-400" />
                    <span>TOPIC 1: WORKSTATION SECURITY & CLIENT DATA PROTECTION</span>
                  </span>
                  <span className="bg-lime-500/20 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-lime-500/50">
                    REQUIRED FOR ALL VAs
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  International clients demand strict data privacy. When managing passwords, financial spreadsheets, or social accounts, always shield your connection with 256-bit AES encryption.
                </p>
                <div className="bg-cyan-950/40 border border-cyan-500/30 p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-mono text-xs">RECOMMENDED SECURITY TOOL: NORDVPN (68% OFF)</strong>
                    <a href="https://nordvpn.sjv.io/c/5024116/976014/7452" target="_blank" rel="sponsored noopener noreferrer" className="text-lime-300 hover:underline font-mono text-xs font-bold">
                      CLAIM NORDVPN DEAL &rarr;
                    </a>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Includes Threat Protection malware blocking, password management, and 10 simultaneous device connections.
                  </p>
                </div>
              </div>

              {/* VA TOPIC 2 */}
              <div className="bg-black/90 border border-gray-800 p-4 rounded-2xl space-y-3 hover:border-cyan-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-purple-400 font-mono uppercase flex items-center space-x-1.5">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span>TOPIC 2: GLOBAL CERTIFICATIONS & UP-SKILLING</span>
                  </span>
                  <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/50">
                    EARN $50+/HR
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Level up your hourly rates by acquiring official certifications from Google, IBM, Meta, and Stanford. Specialized skills in AI Prompt Engineering, Data Science, and Project Management command premium rates.
                </p>
                <div className="bg-purple-950/40 border border-purple-500/30 p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-mono text-xs">RECOMMENDED PLATFORM: COURSERA CERTIFICATES</strong>
                    <a href="https://imp.i384100.net/c/5024116/3801376/14726" target="_blank" rel="sponsored noopener noreferrer" className="text-purple-300 hover:underline font-mono text-xs font-bold">
                      EXPLORE COURSERA COURSES &rarr;
                    </a>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Access over 7,000+ university courses and accredited professional credentials to add to your resume.
                  </p>
                </div>
              </div>

              {/* VA TOPIC 3 */}
              <div className="bg-black/90 border border-gray-800 p-4 rounded-2xl space-y-3 hover:border-cyan-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-lime-400 font-mono uppercase flex items-center space-x-1.5">
                    <Server className="w-4 h-4 text-lime-400" />
                    <span>TOPIC 3: WEB HOSTING, PORTFOLIOS & EMAIL AUTOMATION</span>
                  </span>
                  <span className="bg-lime-500/20 text-lime-300 text-[10px] font-bold px-2 py-0.5 rounded border border-lime-500/50">
                    75% DISCOUNT
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Every Virtual Assistant needs a fast, professional portfolio site and custom domain email address (`name@yourbrand.com`). Hostinger provides cloud hosting and automated email marketing.
                </p>
                <div className="bg-lime-950/40 border border-lime-500/30 p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-mono text-xs">RECOMMENDED HOSTING: HOSTINGER CLOUD (75% OFF)</strong>
                    <a href="https://hostinger.sjv.io/c/6215170/1822851/18485" target="_blank" rel="sponsored noopener noreferrer" className="text-lime-300 hover:underline font-mono text-xs font-bold">
                      GET HOSTINGER DISCOUNT &rarr;
                    </a>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Free custom SSL, unmetered bandwidth, free domain registration, and AI site builder included.
                  </p>
                </div>
              </div>

              {/* VA TOPIC 4 */}
              <div className="bg-black/90 border border-gray-800 p-4 rounded-2xl space-y-3 hover:border-cyan-400 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-pink-400 font-mono uppercase flex items-center space-x-1.5">
                    <Palette className="w-4 h-4 text-pink-400" />
                    <span>TOPIC 4: GRAPHIC DESIGN & MULTIMEDIA SUITES</span>
                  </span>
                  <span className="bg-pink-500/20 text-pink-300 text-[10px] font-bold px-2 py-0.5 rounded border border-pink-500/50">
                    CREATIVE ASSETS
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Design eye-catching client social posts, marketing banners, and video promos using industry-standard tools like CorelDraw Graphics Suite and Envato ThemeForest templates.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a href="https://corel.sjv.io/c/5024116/3809733/20119" target="_blank" rel="sponsored noopener noreferrer" className="p-3 bg-gray-900 border border-gray-800 rounded-xl hover:border-pink-500 text-left block space-y-1">
                    <span className="text-white font-bold block text-xs font-mono">COREL DRAW GRAPHICS SUITE &rarr;</span>
                    <span className="text-[10px] text-gray-400 block font-sans">Professional vector illustration & graphic editor.</span>
                  </a>
                  <a href="https://1.envato.market/c/5024116/805521/4415?subId2=sidebar&subId1=jp_themeforest" target="_blank" rel="sponsored noopener noreferrer" className="p-3 bg-gray-900 border border-gray-800 rounded-xl hover:border-cyan-500 text-left block space-y-1">
                    <span className="text-white font-bold block text-xs font-mono">ENVATO THEMEFOREST TEMPLATES &rarr;</span>
                    <span className="text-[10px] text-gray-400 block font-sans">Over 50,000+ website themes & design assets.</span>
                  </a>
                </div>
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
