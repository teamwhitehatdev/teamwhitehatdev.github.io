import { useApp } from '../context/AppContext';
import React, { useState } from 'react';
import { ExternalLink, ShoppingBag, Sparkles, Search } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';

export const Showcase: React.FC = () => {
  const GUMROAD_LINK = 'https://gumroad.com/discover?a=815255139';
  const GUI_TOOL_LINK =
    'https://futuristicsoftwares.gumroad.com/l/NETWORKANDDATAINFORMATIONS-GUI-TOOLS?a=815255139';
  const PATREON_POST_LINK =
    'https://www.patreon.com/FuturisticSoftwares/posts/futuristic-gui-166644782';
  const PATREON_CREATOR_LINK = 'https://www.patreon.com/cw/FuturisticSoftwares';

  const [activeCategory, setActiveCategory] = useState<string>('ALL PROJECTS');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { getPublicPageCMSItems, getPublicPromoItems, projects } = useApp();

  const cmsProjects = getPublicPageCMSItems('showcase');
  const showcaseAds = getPublicPromoItems('showcase-ad');
  const partnerDeals = getPublicPromoItems('partner-deals');

  const categories = [
    'ALL PROJECTS',
    'WEB DEVELOPMENT',
    'APPLICATION DEVELOPMENT',
    'MOBILE APPLICATIONS',
    'SOFTWARE',
    'AUTOMATION',
    'CYBERSECURITY',
    'VIRTUAL ASSISTANT TOOLS'
  ];

  // 100% Unique, Non-Duplicated Showcase Projects (Each with a distinct image and topic)
  const defaultProjects = [
    {
      id: 'net-gui-1',
      title: 'Network & Data Informations Diagnostic GUI',
      category: 'SOFTWARE',
      desc: 'Desktop & web network diagnostic GUI suite featuring live interface telemetry, VPN/VPS tunnel classification, and hardware storage inspection.',
      img: './network_gui_tool.png',
      gumroadUrl: GUI_TOOL_LINK,
      patreonUrl: PATREON_POST_LINK,
      earnings: 'VERIFIED UTILITY',
      tags: ['Python GUI', 'Networking', 'Diagnostics']
    },
    {
      id: 'futuristic-gui-2',
      title: 'Modular Analytical Dashboard Interface',
      category: 'APPLICATION DEVELOPMENT',
      desc: 'Clean, modular graphical interface design system built for real-time data dashboards, system telemetry, and autonomous AI agent monitoring.',
      img: './media_1786675549040.jpg',
      gumroadUrl: GUMROAD_LINK,
      patreonUrl: PATREON_CREATOR_LINK,
      earnings: 'UI SYSTEM',
      tags: ['Dashboard UI', 'React', 'TypeScript']
    },
    {
      id: 'cyber-va-3',
      title: 'Executive VA & AI Operations Tracker',
      category: 'VIRTUAL ASSISTANT TOOLS',
      desc: 'End-to-end executive workflow system managing client inquiries, multi-timezone calendar sync, automated EOD reporting, and CRM pipelines.',
      img: './media_1786675376512.jpg',
      gumroadUrl: GUMROAD_LINK,
      patreonUrl: PATREON_CREATOR_LINK,
      earnings: 'VA WORKFLOW',
      tags: ['Virtual Assistant', 'Automation', 'CRM']
    }
  ];

  const contextProjects = (projects || []).map((proj) => ({
    id: proj.id,
    title: proj.title,
    category: (proj.category || 'WEB DEVELOPMENT').toUpperCase(),
    desc: proj.description,
    img: proj.image,
    gumroadUrl: proj.liveUrl || proj.githubUrl || GUMROAD_LINK,
    patreonUrl: PATREON_CREATOR_LINK,
    earnings: 'LIVE BUILD',
    tags: proj.tags || ['Portfolio']
  }));

  const formattedCMSProjects = cmsProjects.map((item) => ({
    id: item.id,
    title: item.title,
    category: (item.category || 'WEB DEVELOPMENT').toUpperCase(),
    desc: item.description,
    img:
      item.mainImage ||
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80',
    gumroadUrl: item.url || GUMROAD_LINK,
    patreonUrl: PATREON_CREATOR_LINK,
    earnings: item.metrics || item.badge || 'CMS FEATURED',
    tags: [item.category || 'CMS Item', item.badge || 'Featured']
  }));

  // Deduplicate projects by normalized title and image so zero duplicates appear
  const combinedRaw = [...formattedCMSProjects, ...defaultProjects, ...contextProjects];
  const seenTitles = new Set<string>();
  const seenImages = new Set<string>();
  const allProjects = combinedRaw.filter((p) => {
    const normTitle = p.title.trim().toLowerCase();
    const normImg = (p.img || '').trim().split('?')[0];
    if (seenTitles.has(normTitle) || (normImg && seenImages.has(normImg))) {
      return false;
    }
    seenTitles.add(normTitle);
    if (normImg) seenImages.add(normImg);
    return true;
  });

  const filteredProjects = allProjects.filter((p) => {
    if (activeCategory !== 'ALL PROJECTS') {
      const pCat = p.category.toUpperCase();
      if (!pCat.includes(activeCategory.replace(/S$/, ''))) {
        if (activeCategory === 'WEB DEVELOPMENT' && !pCat.includes('WEB')) return false;
        if (activeCategory === 'MOBILE APPLICATIONS' && !pCat.includes('MOBILE'))
          return false;
        if (
          activeCategory === 'SOFTWARE' &&
          !pCat.includes('SOFT') &&
          !pCat.includes('GUI') &&
          !pCat.includes('SECURITY')
        )
          return false;
        if (
          activeCategory === 'AUTOMATION' &&
          !pCat.includes('AUTO') &&
          !pCat.includes('VA')
        )
          return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12 bg-white text-slate-900">
      {/* PAGE HEADLINE (PURE MINIMALIST WHITE) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-xs">
        <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full text-xs text-slate-800 font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-slate-700" />
          <span>Portfolio &amp; Product Showcase</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Projects, Applications &amp; Digital Assets
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Explore our authentic portfolio of custom web applications, mobile utilities, diagnostic software, and Virtual Assistant operational systems.
        </p>

        {/* SEARCH & CATEGORY PILLS */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search portfolio projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center text-xs pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PROJECTS GRID */}
      <HUDPanel title={`Featured Portfolio Projects (${filteredProjects.length})`} badge="Verified Builds">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 text-sm">
              No projects found matching "{activeCategory}".
            </div>
          ) : (
            filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden flex flex-col justify-between space-y-4 transition-all shadow-xs group"
              >
                {/* PROJECT THUMBNAIL */}
                <div className="relative h-48 bg-slate-50 overflow-hidden border-b border-slate-100">
                  <img
                    src={p.img}
                    alt={p.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-full text-[10px] font-bold text-slate-800 uppercase shadow-2xs">
                    {p.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase shadow-2xs">
                    {p.earnings}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="px-5 space-y-2.5">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:underline leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tags.map((t: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <div className="p-5 pt-0">
                  <a
                    href={p.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-2xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Explore Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </HUDPanel>

      {/* PARTNER DEALS SECTION (CLEAN MINIMALIST WHITE) */}
      <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Curated Software &amp; Partner Offers
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              Recommended Tools for Creators &amp; Virtual Assistants
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(showcaseAds.length > 0 ? showcaseAds : partnerDeals).slice(0, 4).map((ad) => (
            <div
              key={ad.id}
              className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-400 transition-all"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 bg-white border border-slate-200 text-slate-700 font-bold text-[10px] rounded-full uppercase">
                  {ad.badge || 'Partner Deal'}
                </span>
                <h4 className="text-base font-extrabold text-slate-900">
                  {ad.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ad.description}
                </p>
              </div>

              <a
                href={ad.destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl text-center transition-all block"
              >
                {ad.buttonText || 'Claim Partner Offer →'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Showcase;
