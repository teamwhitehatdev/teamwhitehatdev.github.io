import { useApp } from '../context/AppContext';
import React, { useState } from 'react';
import { ExternalLink, Terminal, Shield, Laptop, ShoppingBag, Sparkles, DollarSign, Award, ArrowRight } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const Showcase: React.FC = () => {
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const GUI_TOOL_LINK = "https://futuristicsoftwares.gumroad.com/l/NETWORKANDDATAINFORMATIONS-GUI-TOOLS?a=815255139";
  const PATREON_POST_LINK = "https://www.patreon.com/FuturisticSoftwares/posts/futuristic-gui-166644782";
  const PATREON_CREATOR_LINK = "https://www.patreon.com/cw/FuturisticSoftwares";

  const [activeTab, setActiveTab] = useState<'all' | 'gui' | 'futuristic' | 'mobile' | 'web'>('all');
  const { getPublicPageCMSItems } = useApp();
  const cmsProjects = getPublicPageCMSItems('showcase');

  const projects = [
    {
      id: 'net-gui-1',
      title: 'NETWORK AND DATA INFORMATIONS - GUI TOOLS',
      category: 'gui',
      isFuturistic: true,
      desc: 'Enterprise GUI desktop software suite for network telemetry monitoring, bandwidth diagnostics, packet inspection, and system data analysis.',
      img: './media_1786675376512.jpg',
      gumroadUrl: GUI_TOOL_LINK,
      patreonUrl: PATREON_POST_LINK,
      earnings: 'GENERATED $12,450+ ON GUMROAD & PATREON',
      tags: ['Desktop GUI', 'Network Analytics', 'Python/Tkinter', 'Enterprise']
    },
    {
      id: 'cyber-sentinel-2',
      title: 'WHITEHAT SENTINEL FIREWALL ENGINE',
      category: 'futuristic',
      isFuturistic: true,
      desc: 'Autonomous cybersecurity firewall engine performing AES-256 threat packet filtering, IP rate-limiting, and intruder detection.',
      img: './network_gui_tool.png',
      gumroadUrl: GUMROAD_LINK,
      patreonUrl: PATREON_CREATOR_LINK,
      earnings: 'TOP CREATOR ASSET ON DIGITAL STORES',
      tags: ['Security', 'AES-256 Firewall', 'Threat Protection']
    },
    {
      id: 'va-task-3',
      title: 'VA TASK ACCELERATOR & CLIENT CRM',
      category: 'web',
      isFuturistic: false,
      desc: 'Full-stack React dashboard designed for Virtual Assistants to manage client retainers, track task deadlines, and automate invoicing.',
      img: './media_1786193306890.png',
      gumroadUrl: GUMROAD_LINK,
      patreonUrl: PATREON_CREATOR_LINK,
      earnings: 'HIGH-CONVERTING CLIENT TOOLKIT',
      tags: ['React', 'TypeScript', 'CRM Dashboard']
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : activeTab === 'futuristic' 
      ? projects.filter(p => p.isFuturistic)
      : projects.filter(p => p.category === activeTab);

  return (
    <div className="space-y-10 font-mono max-w-7xl mx-auto pb-10">
      
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-gray-950 via-black to-purple-950/80 border border-purple-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
        <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/40 text-purple-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>FUTURISTIC SOFTWARES &amp; COMPUTER APPLICATIONS SHOWCASE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-rajdhani text-white uppercase tracking-wide leading-tight">
          EXPLORE OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">HIGH-PROFIT COMPUTER APPLICATIONS</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans max-w-4xl">
          Discover how our <strong>Futuristic Softwares</strong> desktop applications generate significant revenue on global digital marketplaces like <strong>Gumroad</strong> and <strong>Patreon</strong>. Start selling your own digital tools, software scripts, and creator assets today!
        </p>

        {/* PATREON & GUMROAD DISCOVERY CALLOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          {/* PATREON BANNER */}
          <a
            href={PATREON_CREATOR_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="bg-gradient-to-r from-red-950/80 via-black to-orange-950/80 border-2 border-orange-500/60 p-4 rounded-2xl flex items-center space-x-4 hover:border-orange-400 transition-all shadow-xl group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform">
              <span className="font-black text-xl font-rajdhani">P</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest block">OFFICIAL PATREON COMMUNITY</span>
              <span className="text-xs font-bold text-white font-rajdhani block">JOIN FUTURISTIC SOFTWARES ON PATREON &rarr;</span>
            </div>
          </a>

          {/* GUMROAD BANNER */}
          <a
            href={GUMROAD_LINK}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="bg-gradient-to-r from-pink-950/80 via-black to-purple-950/80 border-2 border-pink-500/60 p-4 rounded-2xl flex items-center space-x-4 hover:border-pink-400 transition-all shadow-xl group"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400 flex-shrink-0 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-pink-400 uppercase tracking-widest block">OFFICIAL GUMROAD STORE</span>
              <span className="text-xs font-bold text-white font-rajdhani block">START SELLING ON GUMROAD TODAY &rarr;</span>
            </div>
          </a>

        </div>
      </div>

      {/* DEDICATED COLUMN: FUTURISTIC SOFTWARES (SHOWCASING REVENUE-GENERATING PROJECTS) */}
      <HUDPanel title="🚀 DEDICATED COLUMN: FUTURISTIC SOFTWARES & DIGITAL PRODUCT SUCCESS STORIES">
        <div className="p-6 space-y-6">
          
          <div className="bg-gradient-to-r from-gray-900 via-black to-purple-950/90 border-2 border-cyan-500/50 p-6 rounded-2xl space-y-4">
            <div className="flex items-center space-x-2 text-lime-400 font-bold text-xs">
              <DollarSign className="w-5 h-5 text-lime-400 flex-shrink-0" />
              <span>HOW OUR SOFTWARE APPLICATIONS GENERATE HIGH REVENUE ON GUMROAD &amp; PATREON</span>
            </div>

            <p className="text-xs text-gray-200 font-sans leading-relaxed">
              Our flagship software project, <strong className="text-cyan-300">NETWORK AND DATA INFORMATIONS - GUI TOOLS</strong>, has generated thousands of dollars in profit by offering automated diagnostic desktop software directly to global clients via <strong>Gumroad</strong> and <strong>Patreon</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={GUI_TOOL_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-black font-rajdhani text-xs uppercase rounded-xl hover:opacity-95 transition-all shadow-md flex items-center space-x-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>BUY ON GUMROAD ($14.99)</span>
              </a>

              <a
                href={PATREON_POST_LINK}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black font-rajdhani text-xs uppercase rounded-xl hover:opacity-95 transition-all shadow-md flex items-center space-x-1.5"
              >
                <Award className="w-4 h-4" />
                <span>VIEW PATREON POST &rarr;</span>
              </a>
            </div>
          </div>

          {/* FILTER NAVIGATION TABS */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'all', label: 'ALL PROJECTS' },
              { id: 'futuristic', label: '🚀 FUTURISTIC SOFTWARES' },
              { id: 'gui', label: '💻 COMPUTER APPLICATIONS' },
              { id: 'web', label: '🌐 WEB APPLICATIONS' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-400 to-lime-400 text-black shadow-lg'
                    : 'bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* PROJECTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div key={p.id} className="bg-gradient-to-b from-gray-900 via-black to-cyan-950/40 border-2 border-cyan-500/40 rounded-2xl p-4 space-y-4 shadow-xl flex flex-col justify-between hover:border-cyan-400 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-lime-400 uppercase tracking-widest flex items-center space-x-1">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{p.earnings}</span>
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-gray-800 relative group">
                    <img src={p.img} alt={p.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  <h3 className="text-sm font-black font-rajdhani text-white uppercase">
                    {p.title}
                  </h3>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tags.map((t, idx) => (
                      <span key={idx} className="bg-gray-900 border border-gray-800 text-cyan-300 text-[9px] px-2 py-0.5 rounded font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={p.gumroadUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black font-rajdhani text-xs uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>BUY / REGISTER ON GUMROAD</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={p.patreonUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black font-rajdhani text-[11px] uppercase rounded-xl text-center shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>VIEW ON PATREON</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </HUDPanel>

    </div>
  );
};
export default Showcase;
