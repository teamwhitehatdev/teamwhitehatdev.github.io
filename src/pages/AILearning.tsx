import React, { useState } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { Sparkles, BookOpen, Brain, Bot, Cpu, Zap, Search, Layers, Clock, ArrowRight, ExternalLink, ShieldCheck, Video, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CMSItem } from '../types';
import { ArticleModal } from '../components/ArticleModal';

export const AILearning: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<CMSItem | null>(null);

  // Fetch CMS items assigned to AI page
  const cmsAIItems = typeof getPublicPageCMSItems === 'function' ? getPublicPageCMSItems('ai') : [];

  // Deduplicate items strictly by normalized title or ID so no identical cards repeat
  const uniqueArticlesMap = new Map<string, CMSItem>();
  
  cmsAIItems.forEach(item => {
    const key = item.title.trim().toLowerCase();
    if (!uniqueArticlesMap.has(key)) {
      uniqueArticlesMap.set(key, item);
    }
  });

  const allArticles = Array.from(uniqueArticlesMap.values());

  const categories = [
    'ALL',
    'AI FUNDAMENTALS',
    'AI ERA',
    'AI AUTOMATION',
    'AI INFLUENCE',
    'AI SAFETY',
    'VIRTUAL ASSISTANT CAREER',
    'FREELANCING MASTERY',
    'DIGITAL SKILLS',
    'CYBERSECURITY'
  ];

  const filteredArticles = allArticles.filter(item => {
    const matchesCategory = selectedCategory === 'ALL' || item.category.toUpperCase().includes(selectedCategory.toUpperCase());
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* 🚀 HERO HEADER BANNER */}
      <HUDPanel title="🤖 AI KNOWLEDGE HUB &amp; AUTOMATION MASTERCLASSES">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-gray-800">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">
                  ENTERPRISE AI TUTORIALS • AUTOMATION BLUEPRINTS • CAREER GUIDES
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-orbitron tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-lime-400">
                ARTIFICIAL INTELLIGENCE &amp; FUTURE SKILLS HUB
              </h1>
              <p className="text-sm sm:text-base text-gray-300 font-sans max-w-3xl leading-relaxed">
                Explore in-depth tutorials on Large Language Models, autonomous agent workflows, Virtual Assistant career acceleration, prompt engineering, and high-income digital skills.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="#/services"
                className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold font-orbitron text-xs uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center space-x-2"
              >
                <span>HIRE AN AI / VA EXPERT</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* SEARCH AND FILTER BAR */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search AI topics, neural nets, prompt engineering, VA roadmaps, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/80 border border-cyan-500/30 rounded-xl text-sm font-sans text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
              <span className="text-gray-400 text-[11px] shrink-0">TOPICS ({filteredArticles.length}):</span>
            </div>
          </div>

          {/* CATEGORY PILL TABS */}
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                    : 'bg-black/60 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </HUDPanel>

      {/* 📚 MAIN ARTICLE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-black/80 border border-gray-800 hover:border-cyan-400/80 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]"
          >
            {/* CARD COVER IMAGE */}
            <div className="h-48 w-full relative overflow-hidden bg-slate-950 border-b border-gray-800/80">
              <img
                src={article.mainImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur text-cyan-300 font-mono text-[10px] font-bold rounded border border-cyan-500/40 uppercase">
                {article.category}
              </span>
              {article.badge && (
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-lime-400 text-black font-mono text-[10px] font-black rounded uppercase shadow">
                  {article.badge}
                </span>
              )}
              {article.videoUrl && (
                <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-red-600/90 text-white font-mono text-[10px] font-bold rounded flex items-center gap-1.5 shadow">
                  <Video className="w-3.5 h-3.5" />
                  <span>WATCH VIDEO</span>
                </span>
              )}
            </div>

            {/* CARD CONTENT */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between font-sans">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black font-orbitron text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between gap-2 mt-2 font-mono text-xs">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="px-3.5 py-2 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>READ ARTICLE</span>
                </button>

                {(article.url || article.referralUrl) && (
                  <a
                    href={article.url || article.referralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-lime-400/20 hover:bg-lime-400/30 border border-lime-400/50 text-lime-300 font-bold text-[11px] rounded-xl transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>{article.buttonText ? article.buttonText.split('(')[0].trim().slice(0, 16) : 'ACTION'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📖 FULL ARTICLE READER MODAL */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

    </div>
  );
};
export default AILearning;
