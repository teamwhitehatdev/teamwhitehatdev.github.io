import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  Video,
  Box,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CMSItem } from '../types';
import { ArticleModal } from '../components/ArticleModal';
import { AIAutomationDiagrams } from '../components/AIAutomationDiagrams';

const MESHY_REFERRAL_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';

export const AILearning: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<CMSItem | null>(null);

  const cmsAIItems = typeof getPublicPageCMSItems === 'function' ? getPublicPageCMSItems('ai') : [];

  const uniqueArticlesMap = new Map<string, CMSItem>();
  cmsAIItems.forEach((item) => {
    uniqueArticlesMap.set(item.id, item);
  });

  const allArticles = Array.from(uniqueArticlesMap.values());

  const categories = [
    'ALL',
    'AI CAPABILITIES',
    'AI AUTOMATION',
    'AI TOOLS',
    'AI FUNDAMENTALS',
    'VIRTUAL ASSISTANT CAREER',
    'FREELANCING MASTERY',
    'DIGITAL SKILLS',
    'AI SAFETY'
  ];

  const filteredArticles = allArticles.filter((item) => {
    const matchesCategory =
      selectedCategory === 'ALL' ||
      item.category.toUpperCase().includes(selectedCategory.toUpperCase());
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-16 bg-white text-slate-900">
      {/* 🚀 HERO HEADER BANNER (PURE MINIMALIST WHITE) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-slate-700" />
              <span>100% Free AI Academy • Capabilities • Real Automation Diagrams</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              AI &amp; Its Capabilities, Visual Automation Workflows &amp; Free VA Tutorials
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Master how modern Artificial Intelligence works, explore interactive node-by-node <strong className="text-slate-900">AI Automation Flow Diagrams</strong>, and learn how Virtual Assistants and freelancers use AI tools to save clients 15+ hours every week.
            </p>
          </div>

          {/* FEATURED MESHY AI 3D GENERATOR REFERRAL IN AI NAVIGATION TAB */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 max-w-sm w-full space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-700">
              <span className="flex items-center gap-1">
                <Box className="w-3.5 h-3.5 text-slate-800" />
                <span>Featured AI 3D Partner</span>
              </span>
              <span className="px-2 py-0.5 bg-slate-900 text-white rounded-full">Free Credits</span>
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 leading-snug">
              AI 3D Model Generator: Create 3D from Text &amp; Images | Meshy
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Turn text prompts or 2D photos into textured 3D models (.GLB/.FBX/.OBJ) in seconds.
            </p>
            <a
              href={MESHY_REFERRAL_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Try Meshy AI 3D Generator Free</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search free tutorials: AI capabilities, automation diagrams, Meshy 3D, VA proposals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
              />
            </div>

            <div className="text-xs font-semibold text-slate-500 shrink-0">
              Showing <strong className="text-slate-900">{filteredArticles.length}</strong> Unique Free Guides
            </div>
          </div>

          {/* CATEGORY PILL TABS */}
          <div className="flex flex-wrap gap-2 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🤖 INTERACTIVE VISUAL AI AUTOMATION DIAGRAMS & CAPABILITIES */}
      <AIAutomationDiagrams />

      {/* 📚 ALL FREE AI, AUTOMATION & VA CAREER ARTICLES GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Complete Free Library: AI Tutorials, Automation Guides &amp; VA Playbooks
            </h2>
            <p className="text-sm text-slate-600">
              Click any topic below to open the full step-by-step tutorial reader.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group shadow-xs"
            >
              {/* CARD COVER IMAGE */}
              <div className="h-48 w-full relative overflow-hidden bg-slate-50 border-b border-slate-100">
                <img
                  src={
                    article.mainImage ||
                    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80'
                  }
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold rounded-full border border-slate-200 uppercase shadow-xs">
                  {article.category}
                </span>
                {article.badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase shadow-xs">
                    {article.badge}
                  </span>
                )}
                {article.videoUrl && (
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full flex items-center gap-1.5 shadow-xs">
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Guide</span>
                  </span>
                )}
              </div>

              {/* CARD CONTENT */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3
                    onClick={() => setSelectedArticle(article)}
                    className="text-base sm:text-lg font-bold text-slate-900 group-hover:underline transition-colors line-clamp-2 cursor-pointer"
                  >
                    {article.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-2 text-xs">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Free Tutorial</span>
                  </button>

                  {(article.url || article.referralUrl) && (
                    <a
                      href={article.url || article.referralUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1 shrink-0"
                    >
                      <span>
                        {article.buttonText
                          ? article.buttonText.split('(')[0].trim().slice(0, 16)
                          : 'Open Link'}
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
