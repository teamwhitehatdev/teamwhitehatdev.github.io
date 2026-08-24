import { useApp } from '../context/AppContext';
import React, { useState } from 'react';
import { ExternalLink, Terminal, Shield, Laptop, ShoppingBag, Sparkles, DollarSign, Award, ArrowRight, Tag, Image as ImageIcon } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const Showcase: React.FC = () => {
  const GUMROAD_LINK = "https://gumroad.com/discover?a=815255139";
  const GUI_TOOL_LINK = "https://futuristicsoftwares.gumroad.com/l/NETWORKANDDATAINFORMATIONS-GUI-TOOLS?a=815255139";
  const PATREON_POST_LINK = "https://www.patreon.com/FuturisticSoftwares/posts/futuristic-gui-166644782";
  const PATREON_CREATOR_LINK = "https://www.patreon.com/cw/FuturisticSoftwares";

  const [activeCategory, setActiveCategory] = useState<string>('ALL PROJECTS');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { getPublicPageCMSItems, getPublicPromoItems } = useApp();

  // Fetch published CMS showcase items & showcase ads
  const cmsProjects = getPublicPageCMSItems('showcase');
  const showcaseAds = getPublicPromoItems('showcase-ad');
  const partnerDeals = getPublicPromoItems('partner-deals');

  const categories = [
    'ALL PROJECTS',
    'WEB DEVELOPMENT',
    'APPLICATION DEVELOPMENT',
    'MOBILE APPLICATIONS',
    'SOFTWARE',
    'PYTHON PROJECTS',
    'AUTOMATION',
    'AI & AI AUTOMATION',
    'CYBERSECURITY',
    'NETWORKING',
    'VIRTUAL ASSISTANT TOOLS',
    'GRAPHIC DESIGN',
    'DIGITAL PRODUCTS',
    'CLIENT PROJECTS'
  ];

  const defaultProjects = [
    {
      id: 'net-gui-1',
      title: 'NETWORK AND DATA INFORMATIONS GUI TOOLS',
      category: 'SOFTWARE',
      isFuturistic: true,
      desc: 'High-performance desktop & web network diagnostic GUI suite featuring live telemetry monitoring, IP analysis, and security tools.',
      img: './media_1786675376512.jpg',
      gumroadUrl: GUI_TOOL_LINK,
      patreonUrl: PATREON_POST_LINK,
      earnings: '$1,200+ REVENUE',
      tags: ['GUI Suite', 'Networking', 'Security']
    },
    {
      id: 'futuristic-gui-2',
      title: 'FUTURISTIC SOFTWARE GRAPHICAL INTERFACE',
      category: 'APPLICATION DEVELOPMENT',
      isFuturistic: true,
      desc: 'Cyberpunk HUD interface design system built for web applications, data dashboards, and autonomous AI agents.',
      img: './media_1786675549040.jpg',
      gumroadUrl: GUMROAD_LINK,
      patreonUrl: PATREON_CREATOR_LINK,
      earnings: '$850+ REVENUE',
      tags: ['Cyber UI', 'React', 'TypeScript']
    },
    {
      id: 'cyber-va-3',
      title: 'EXECUTIVE VA AUTOMATION PLATFORM',
      category: 'AUTOMATION',
      isFuturistic: false,
      desc: 'Automated executive workflow tool managing client inquiries, calendar sync, and automated reporting.',
      img: './media_1786675376512.jpg',
      gumroadUrl: GUMROAD_LINK,
      patreonUrl: PATREON_CREATOR_LINK,
      earnings: 'ACTIVE CLIENT PROJ',
      tags: ['Virtual Assistant', 'Automation', 'Python']
    }
  ];

  // Map CMS Items to Showcase format
  const formattedCMSProjects = cmsProjects.map(item => ({
    id: item.id,
    title: item.title,
    category: (item.category || 'WEB DEVELOPMENT').toUpperCase(),
    isFuturistic: true,
    desc: item.description,
    img: item.mainImage || './media_1786675376512.jpg',
    gumroadUrl: item.url || GUMROAD_LINK,
    patreonUrl: PATREON_CREATOR_LINK,
    earnings: item.metrics || item.badge || 'CMS FEATURED',
    tags: [item.category || 'CMS Item', item.badge || 'Featured']
  }));

  const allProjects = [...formattedCMSProjects, ...defaultProjects];

  const filteredProjects = allProjects.filter(p => {
    if (activeCategory !== 'ALL PROJECTS') {
      const pCat = p.category.toUpperCase();
      if (!pCat.includes(activeCategory.replace(/S$/, '')) && activeCategory !== 'ALL PROJECTS') {
        // Soft match check
        if (activeCategory === 'WEB DEVELOPMENT' && !pCat.includes('WEB')) return false;
        if (activeCategory === 'MOBILE APPLICATIONS' && !pCat.includes('MOBILE')) return false;
        if (activeCategory === 'SOFTWARE' && !pCat.includes('SOFT') && !pCat.includes('GUI')) return false;
        if (activeCategory === 'AUTOMATION' && !pCat.includes('AUTO') && !pCat.includes('VA')) return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 py-6 font-mono">

      {/* PAGE HEADLINE */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-xs text-cyan-300">
          <Sparkles className="w-4 h-4 text-lime-400" />
          <span>WHITE HAT DEV PORTFOLIO &amp; PRODUCT SHOWCASE</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-rajdhani uppercase text-white tracking-wider">
          PROJECTS, APPS &amp; DIGITAL ASSETS
        </h1>
        <p className="text-xs md:text-sm text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed">
          Explore our portfolio of custom web applications, mobile tools, cybersecurity software, and commercial digital products managed dynamically via CMS.
        </p>
      </div>

      {/* CATEGORY SELECTOR & FILTER SYSTEM */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 justify-center text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold shadow-lg scale-105'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PROJECTS GRID */}
      <HUDPanel title={`🚀 FEATURED SHOWCASE PROJECTS (${filteredProjects.length})`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500">
              No projects found matching category "{activeCategory}".
            </div>
          ) : (
            filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-black/90 border border-cyan-500/30 hover:border-cyan-400 rounded-2xl overflow-hidden flex flex-col justify-between space-y-4 transition-all hover:scale-[1.02] shadow-xl group"
              >
                {/* PROJECT THUMBNAIL WITH FALLBACK IMAGE PROTECTION */}
                <div className="relative h-48 bg-slate-950 overflow-hidden border-b border-gray-800">
                  <img
                    src={p.img}
                    alt={p.title}
                    onError={(e) => {
                      // Safe fallback if image fails to load
                      (e.target as HTMLImageElement).src = './media_1786675376512.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-cyan-500/50 rounded-lg text-[10px] font-bold text-cyan-300 uppercase">
                    {p.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-lime-500/20 backdrop-blur-md border border-lime-400/50 rounded-lg text-[10px] font-bold text-lime-300">
                    {p.earnings}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="px-5 space-y-3">
                  <h3 className="text-base font-bold font-rajdhani text-white uppercase group-hover:text-cyan-400 transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-sans line-clamp-3 leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tags.map((t, i) => (
                      <span key={i} className="text-[9px] font-bold bg-gray-900 text-gray-400 px-2 py-0.5 rounded border border-gray-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="p-5 pt-0 space-y-2">
                  <a
                    href={p.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold text-xs rounded-xl uppercase hover:brightness-110 transition-all flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>PURCHASE / EXPLORE PROJECT &rarr;</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </HUDPanel>

      {/* ========================================================================= */}
      {/* SHOWCASE ADVERTISEMENT DIVISION (WHITE BACKGROUND AS REQUESTED) */}
      {/* ========================================================================= */}
      <div className="bg-white text-slate-900 border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl font-sans">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
              SPONSORED PROMOTIONS &amp; PARTNER DEALS
            </span>
            <h3 className="text-xl md:text-2xl font-black font-rajdhani uppercase text-slate-900">
              📢 RECOMMENDED SOFTWARE, TOOLS &amp; OFFERS
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(showcaseAds.length > 0 ? showcaseAds : partnerDeals).map((ad) => (
            <div
              key={ad.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 font-mono font-bold text-[10px] rounded-lg uppercase">
                  {ad.badge || 'PARTNER DEAL'}
                </span>
                <h4 className="text-lg font-bold font-rajdhani text-slate-900 uppercase">
                  {ad.title}
                </h4>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {ad.description}
                </p>
              </div>

              <a
                href={ad.destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs rounded-xl uppercase text-center transition-all shadow cursor-pointer block"
              >
                {ad.buttonText || 'CLAIM EXCLUSIVE OFFER →'}
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
export default Showcase;
