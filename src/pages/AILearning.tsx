import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HUDPanel } from '../components/HUDPanel';
import { CMSItem } from '../types';
import { Cpu, Sparkles, CheckCircle2, ArrowRight, BookOpen, ShieldCheck, ExternalLink, Filter, Search, X } from 'lucide-react';

export const AILearning: React.FC = () => {
  const { getPublicPageCMSItems, getPublicPromoItems } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<CMSItem | null>(null);

  // Fetch published AI items from CMS (pageOwner === 'ai')
  const aiItems = getPublicPageCMSItems('ai');
  const aiAds = getPublicPromoItems('ai-ad');

  const categories = [
    'ALL',
    'AI FUNDAMENTALS',
    'AI ERA',
    'AI AUTOMATION',
    'AI FOR VIRTUAL ASSISTANTS',
    'AI FOR FREELANCERS',
    'AI INFLUENCE',
    'AI SAFETY'
  ];

  const filteredItems = aiItems.filter(item => {
    if (selectedCategory !== 'ALL') {
      const cat = (item.category || '').toUpperCase().trim();
      if (cat !== selectedCategory) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.fullContent && item.fullContent.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 py-6 font-mono">

      {/* PAGE HEADER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full text-xs text-purple-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI ERA • AUTOMATION &amp; FUTURE SKILLS LEARNING CENTER</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-rajdhani uppercase text-white tracking-wider">
          ARTIFICIAL INTELLIGENCE &amp; AUTOMATION HUB
        </h1>
        <p className="text-xs md:text-sm text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed">
          Master Artificial Intelligence, Generative AI tools, AI Automation workflows, and responsible AI practices designed for Virtual Assistants, Freelancers, and Digital Professionals.
        </p>
      </div>

      {/* WHITE BACKGROUND DIVISION FOR RICH AI EDUCATIONAL CONTENT */}
      <div className="bg-white text-slate-900 border-2 border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl font-sans">
        
        {/* DIVISION TITLE & SEARCH */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
              ACADEMIC &amp; TECHNICAL CURRICULUM
            </span>
            <h2 className="text-2xl md:text-3xl font-black font-rajdhani uppercase text-slate-900">
              🧠 AI KNOWLEDGE MATRIX &amp; TUTORIALS
            </h2>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI topics, tools, automation..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>

        {/* CATEGORY PILLS */}
        <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* AI ARTICLES GRID (WHITE BACKGROUND CARDS WITH CLEAN CONTRAST) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {filteredItems.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
              No AI educational articles match your selected filter or search query.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200 hover:border-indigo-500 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all hover:shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 font-mono font-bold text-[10px] rounded-lg uppercase">
                      {item.category || 'AI MODULE'}
                    </span>
                    {item.badge && (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-mono font-bold text-[10px] rounded-lg">
                        🏷️ {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black font-rajdhani text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => setActiveArticle(item)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs rounded-xl transition-all flex items-center space-x-1.5 shadow cursor-pointer"
                  >
                    <span>{item.buttonText || 'READ FULL ARTICLE →'}</span>
                  </button>

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-indigo-600 hover:underline flex items-center space-x-1 font-bold"
                    >
                      <span>EXTERNAL LINK</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* AI ADS / PROMOTIONS DIVISION AT BOTTOM OF WHITE SECTION */}
        {aiAds.length > 0 && (
          <div className="mt-8 p-6 bg-slate-100 border border-slate-300 rounded-2xl space-y-4">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              PARTNER PROMOTIONS &amp; RECOMMENDED AI TOOLS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aiAds.map((ad) => (
                <div key={ad.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 block">{ad.badge || 'PROMO'}</span>
                  <h4 className="text-sm font-bold font-rajdhani text-slate-900 uppercase">{ad.title}</h4>
                  <p className="text-xs text-slate-600 font-sans">{ad.description}</p>
                  <a
                    href={ad.destinationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-3 py-1.5 bg-indigo-600 text-white text-xs font-mono font-bold rounded-lg"
                  >
                    {ad.buttonText || 'EXPLORE DEAL →'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* TRANSPARENT AFFILIATE & DISCLOSURE BANNER AT BOTTOM */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-mono text-slate-400 space-y-1">
        <span className="text-lime-400 font-bold block">💡 EDUCATIONAL TRANSPARENCY NOTICE:</span>
        <p className="text-slate-300 leading-relaxed font-sans">
          Some links on this AI hub may contain referral or affiliate URLs. If you choose to purchase or try a tool through these links, we may receive compensation at no additional cost to you.
        </p>
      </div>

      {/* FULL ARTICLE MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
          <div className="bg-white text-slate-900 border-2 border-indigo-500 rounded-3xl p-6 sm:p-8 max-w-3xl w-full space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1.5 rounded-full bg-slate-100 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-2 border-b border-slate-200 pb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-mono font-bold text-xs rounded-full uppercase">
                {activeArticle.category || 'AI MODULE'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-rajdhani uppercase text-slate-900">
                {activeArticle.title}
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Published in White Hat Dev AI Matrix
              </p>
            </div>

            <div className="prose max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 font-sans whitespace-pre-line">
              {activeArticle.fullContent || activeArticle.description}
            </div>

            {activeArticle.url && (
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-900 block">RECOMMENDED RESOURCE / REFERRAL:</span>
                  <span className="text-xs text-slate-600 truncate max-w-sm block">{activeArticle.url}</span>
                </div>
                <a
                  href={activeArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs rounded-xl transition-all shrink-0 flex items-center space-x-1"
                >
                  <span>VISIT TOOL →</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-mono font-bold text-xs rounded-xl cursor-pointer"
              >
                CLOSE ARTICLE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default AILearning;
