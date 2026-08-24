import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CMSItem } from '../types';
import {
  Brain, Sparkles, BookOpen, Clock, Search, Filter,
  Share2, ArrowRight, CheckCircle2, ShieldCheck, Zap,
  Layers, ChevronRight, ExternalLink, X, Tag, Terminal
} from 'lucide-react';
import { COMPREHENSIVE_EDUCATIONAL_CMS_ITEMS } from '../data/comprehensiveEducationalData';

export const AILearning: React.FC = () => {
  const { getPublicPageCMSItems, getPublicPromoItems } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<CMSItem | null>(null);

  // Fetch published AI items from CMS (with fallback to comprehensive educational dataset)
  const cmsAIItems = getPublicPageCMSItems('ai');
  const allArticles: CMSItem[] = useMemo(() => {
    if (cmsAIItems && cmsAIItems.length > 0) {
      // Merge any missing default educational modules
      const existingIds = new Set(cmsAIItems.map(i => i.id));
      const missing = COMPREHENSIVE_EDUCATIONAL_CMS_ITEMS.filter(i => !existingIds.has(i.id));
      return [...cmsAIItems, ...missing];
    }
    return COMPREHENSIVE_EDUCATIONAL_CMS_ITEMS;
  }, [cmsAIItems]);

  // CATEGORIES LIST
  const categories = useMemo(() => {
    const set = new Set(allArticles.map(a => a.category).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, [allArticles]);

  // FILTERED ARTICLES
  const filteredArticles = useMemo(() => {
    return allArticles.filter(art => {
      const matchCat = selectedCategory === 'ALL' || art.category.toUpperCase() === selectedCategory.toUpperCase();
      if (!matchCat) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchDesc = (art.description || '').toLowerCase().includes(q);
        const matchContent = (art.fullContent || '').toLowerCase().includes(q);
        const matchCatName = (art.category || '').toLowerCase().includes(q);
        return matchTitle || matchDesc || matchContent || matchCatName;
      }
      return true;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 py-8 font-sans">
      
      {/* 🚀 HERO SECTION */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 px-4 py-1.5 rounded-full text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest animate-pulse">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span>AI KNOWLEDGE HUB &bull; COMPREHENSIVE LEARNING CENTER</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300 tracking-tight leading-tight">
          ARTIFICIAL INTELLIGENCE, VA CAREERS &amp; DIGITAL SKILLS
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-mono">
          Master the AI Era with comprehensive technical breakdowns, remote Virtual Assistant blueprints, 
          freelancing proposal frameworks, and high-income digital skill roadmaps.
        </p>

        {/* SEARCH BAR */}
        <div className="relative max-w-2xl mx-auto pt-2">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI concepts, prompt engineering, VA pricing, freelancing..."
            className="w-full pl-12 pr-4 py-3.5 bg-black/80 border-2 border-cyan-500/40 rounded-2xl text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-xl"
          />
        </div>
      </div>

      {/* 🏷️ CATEGORY PILLS */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
        {categories.map((cat) => {
          const isActive = selectedCategory.toUpperCase() === cat.toUpperCase();
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-black shadow-lg shadow-cyan-500/20 scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 📚 HIGH-CONTRAST EDUCATIONAL CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const fallbackImage = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80';
          const cardImage = article.mainImage || fallbackImage;

          return (
            <div
              key={article.id}
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col group"
            >
              {/* IMAGE HEADER */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={cardImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>

                {/* BADGE */}
                {article.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md border border-cyan-500/50 text-cyan-300 font-mono text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {article.badge}
                  </span>
                )}

                {/* CATEGORY */}
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-indigo-950/90 border border-indigo-500/40 text-indigo-300 font-mono text-[10px] font-bold rounded uppercase">
                  {article.category}
                </span>
              </div>

              {/* BODY CONTENT */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold font-orbitron text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-slate-400 text-xs font-mono leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>5 MIN READ</span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(article)}
                    className="px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl font-mono text-xs font-bold flex items-center space-x-1.5 group-hover:border-cyan-400 cursor-pointer transition-all"
                  >
                    <span>READ NOW</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 📖 ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-slate-900 border-2 border-cyan-500/50 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            
            {/* MODAL HERO IMAGE */}
            <div className="relative h-64 w-full shrink-0 overflow-hidden bg-slate-950">
              <img
                src={activeArticle.mainImage || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/60"></div>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 bg-black/80 hover:bg-red-600 text-white rounded-full border border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 space-y-1.5">
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold rounded-lg uppercase">
                  {activeArticle.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-orbitron text-white leading-tight">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* MODAL BODY (MARKDOWN READER) */}
            <div className="p-6 sm:p-8 overflow-y-auto font-mono text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed bg-slate-900">
              <div className="prose prose-invert max-w-none space-y-4">
                {activeArticle.fullContent.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('# ')) {
                    return null; // Skip main title as it is in the hero
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h3 key={pIdx} className="text-lg font-bold font-orbitron text-cyan-300 pt-4 border-b border-slate-800 pb-1">
                        {paragraph.replace('## ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={pIdx} className="text-sm font-bold font-orbitron text-indigo-300 pt-2">
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').map(l => l.replace(/^[*\-]\s*/, ''));
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-1 text-slate-300">
                        {items.map((it, itIdx) => (
                          <li key={itIdx}>{it}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ')) {
                    const items = paragraph.split('\n').map(l => l.replace(/^\d+\.\s*/, ''));
                    return (
                      <ol key={pIdx} className="list-decimal pl-5 space-y-1 text-slate-300">
                        {items.map((it, itIdx) => (
                          <li key={itIdx}>{it}</li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-slate-300 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Published &bull; White Hat Dev AI &amp; Educational Knowledge Base
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-mono font-extrabold text-xs rounded-xl hover:scale-105 transition-all cursor-pointer"
              >
                CLOSE READER
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default AILearning;
