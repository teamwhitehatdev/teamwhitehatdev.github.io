import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  Video,
  Box,
  Cpu,
  X,
  Sparkles,
  Share2,
  Layers,
  CheckCircle2,
  TrendingUp,
  Globe2,
  FileSearch,
  Gamepad2,
  Workflow
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CMSItem } from '../types';
import { ArticleModal } from '../components/ArticleModal';
import { AIAutomationDiagrams } from '../components/AIAutomationDiagrams';

const MESHY_REFERRAL_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';

// Highlighting Helper for Search Queries
const HighlightText: React.FC<{ text: string; highlight: string; className?: string }> = ({
  text,
  highlight,
  className = ''
}) => {
  if (!highlight || !highlight.trim()) {
    return <span className={className}>{text}</span>;
  }
  const cleanHighlight = highlight.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${cleanHighlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-cyan-200 text-slate-950 font-bold px-0.5 rounded-xs underline decoration-cyan-500"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export const AILearning: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<CMSItem | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'by-category'>('all');

  // Handle Hash Scroll (e.g. from /#/ai#diagrams)
  useEffect(() => {
    if (window.location.hash === '#diagrams') {
      const el = document.getElementById('diagrams');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, []);

  const cmsAIItems = typeof getPublicPageCMSItems === 'function' ? getPublicPageCMSItems('ai') : [];

  const uniqueArticlesMap = new Map<string, CMSItem>();
  cmsAIItems.forEach((item) => {
    const normalizedTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const alreadyExists = Array.from(uniqueArticlesMap.values()).some(
      (existing) => existing.title.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedTitle
    );
    if (!uniqueArticlesMap.has(item.id) && !alreadyExists) {
      uniqueArticlesMap.set(item.id, item);
    }
  });

  const allArticles = Array.from(uniqueArticlesMap.values());

  const categories = [
    'ALL',
    'AI AUTOMATION',
    'AI CAPABILITIES',
    'SOCIAL MEDIA & MARKETING',
    'SEO & METADATA',
    'CONTENT CREATORS & STREAMERS',
    'MAKE MONEY ONLINE',
    'VIRTUAL ASSISTANT CAREER',
    'FREELANCING MASTERY',
    'DIGITAL SKILLS'
  ];

  const quickSearchTags = [
    'Social Media Manager',
    'Algorithm Mechanics',
    'SEO & Metadata',
    'GEO & AI Search',
    'Streamers & Gamers',
    'Profitable Creators',
    'Speed-to-Lead',
    'Meshy 3D',
    'Suno AI Music'
  ];

  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allArticles.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        item.category.toUpperCase().includes(selectedCategory.toUpperCase());

      if (!matchesCategory) return false;
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const catMatch = item.category.toLowerCase().includes(q);
      const summaryMatch = item.summary ? item.summary.toLowerCase().includes(q) : false;
      const contentMatch = item.fullContent ? item.fullContent.toLowerCase().includes(q) : false;
      const badgeMatch = item.badge ? item.badge.toLowerCase().includes(q) : false;

      return titleMatch || descMatch || catMatch || summaryMatch || contentMatch || badgeMatch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  // Grouped articles by category
  const articlesByCategory = useMemo(() => {
    const map = new Map<string, CMSItem[]>();
    filteredArticles.forEach((article) => {
      const cat = article.category || 'GENERAL';
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat)!.push(article);
    });
    return map;
  }, [filteredArticles]);

  const categoryMeta: Record<string, { label: string; icon: React.FC<{ className?: string }>; desc: string }> = {
    'SOCIAL MEDIA & MARKETING': {
      label: 'Social Media Marketing & Management',
      icon: Share2,
      desc: 'Master SMM career roadmaps, algorithm ranking signals, organic growth hooks, and creator monetization models.'
    },
    'SEO & METADATA': {
      label: 'Metadata, SEO & Generative Engine Optimization',
      icon: FileSearch,
      desc: 'Technical HTML metadata, Open Graph tags, Core Web Vitals, Schema.org JSON-LD, and getting cited by ChatGPT/Perplexity.'
    },
    'CONTENT CREATORS & STREAMERS': {
      label: 'Creators, Vloggers, Streamers & Writers',
      icon: Gamepad2,
      desc: 'Advanced syndication funnels, brand sponsorship rate cards, gaming sponsorships, and high-RPM digital writing.'
    },
    'MAKE MONEY ONLINE': {
      label: 'Digital Income Streams & Remote Earnings',
      icon: TrendingUp,
      desc: 'Realistic zero-capital income paths, weekly earning math, and remote client acquisition systems.'
    },
    'AI AUTOMATION': {
      label: 'AI Automations & Event-Driven Workflows',
      icon: Workflow,
      desc: 'Production-ready webhook pipelines, Make.com and n8n blueprints, and automated business integrations.'
    },
    'AI CAPABILITIES': {
      label: 'Core AI Capabilities & Deep Fundamentals',
      icon: Cpu,
      desc: 'LLM reasoning, RAG vector search, multimodal vision OCR, and generative 3D modeling.'
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-16 bg-transparent text-slate-900">
      {/* 🚀 HERO HEADER BANNER (GLASSMORPHIC MINIMALIST WHITE) */}
      <section className="white-glass-card rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-slate-700" />
              <span>100% Free Knowledge Hub &bull; SMM &bull; SEO &bull; Creators &bull; AI Topologies</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.2]">
              AI Capabilities, Social Media Strategy, SEO &amp; Visual Automation Workflows
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore authentic, actionable tutorials covering <strong className="text-slate-900">Social Media Management</strong>,{' '}
              <strong className="text-slate-900">HTML Metadata &amp; SEO Optimization</strong>,{' '}
              <strong className="text-slate-900">Profitable Creator Blueprints</strong>, and interactive{' '}
              <strong className="text-slate-900">AI Automation Flow Topologies</strong>.
            </p>
          </div>

          {/* FEATURED MESHY AI 3D GENERATOR REFERRAL IN AI NAVIGATION TAB */}
          <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-4 sm:p-5 max-w-sm w-full space-y-3 shadow-xs">
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

        {/* 🔍 UPGRADED SEARCH AND CATEGORY FILTER ENGINE */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search anything: Social Media Manager, Algorithm rules, SEO metadata, Streamers, Speed-to-Lead, Meshy 3D..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-slate-500">
                Found <strong className="text-slate-900">{filteredArticles.length}</strong> Guides
              </span>

              {/* View mode toggle: Grid vs Grouped by Category */}
              <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs">
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    viewMode === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Grid
                </button>
                <button
                  onClick={() => setViewMode('by-category')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    viewMode === 'by-category'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  By Category Niche
                </button>
              </div>
            </div>
          </div>

          {/* QUICK SEARCH SUGGESTION PILLS */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mr-1">
              Trending Topics:
            </span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  setSelectedCategory('ALL');
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] font-medium border ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                #{tag}
              </button>
            ))}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[11px] font-bold text-rose-600 hover:underline ml-2"
              >
                Clear Filter
              </button>
            )}
          </div>

          {/* CATEGORY PILL TABS */}
          <div className="flex flex-wrap gap-2 text-xs pt-1 border-t border-slate-100">
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

      {/* 🤖 INTERACTIVE ANIMATED BLACK TOPOLOGY CANVAS WORKFLOW */}
      <AIAutomationDiagrams id="diagrams" searchQuery={searchQuery} />

      {/* 📚 ALL NICHE TUTORIALS, SMM GUIDES, SEO & CREATOR PLAYBOOKS */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Complete Knowledge Library: SMM, SEO, Creators &amp; Automation
            </h2>
            <p className="text-sm text-slate-600">
              Click any guide below to open the complete long-form reader with step-by-step instructions.
            </p>
          </div>

          {searchQuery && (
            <div className="px-3.5 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-semibold">
              Filtered by: <strong className="font-bold">"{searchQuery}"</strong> ({filteredArticles.length} results)
            </div>
          )}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center space-y-4 white-glass-card rounded-3xl border border-slate-200 p-8">
            <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-extrabold text-slate-900">
              No Tutorials Found Matching &quot;{searchQuery}&quot;
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              We couldn&apos;t find any tutorial matching your exact search. Try broader terms or clear your search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all"
            >
              Clear Search &amp; Show All Guides
            </button>
          </div>
        ) : viewMode === 'by-category' ? (
          // =================================================================
          // 🗂️ GROUPED BY NICHE / CATEGORY SECTIONS
          // =================================================================
          <div className="space-y-12">
            {Array.from(articlesByCategory.entries()).map(([catName, articles]) => {
              const meta = categoryMeta[catName] || {
                label: catName,
                icon: Layers,
                desc: `Explore comprehensive educational guides in ${catName}.`
              };
              const CategoryIcon = meta.icon;

              return (
                <div key={catName} className="space-y-5">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 text-white">
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-extrabold text-slate-900">{meta.label}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                            {articles.length} {articles.length === 1 ? 'Guide' : 'Guides'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{meta.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        searchQuery={searchQuery}
                        onSelect={() => setSelectedArticle(article)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // =================================================================
          // 📑 ALL GRID VIEW
          // =================================================================
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                searchQuery={searchQuery}
                onSelect={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        )}
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

// Reusable Article Card Component with Highlighting
const ArticleCard: React.FC<{
  article: CMSItem;
  searchQuery: string;
  onSelect: () => void;
}> = ({ article, searchQuery, onSelect }) => {
  const showImage = Boolean(article.mainImage && !article.hideImage);
  const showVideo = Boolean(article.videoUrl && !article.hideVideo);

  return (
    <div className="white-glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all group hover:-translate-y-1">
      {/* CARD COVER IMAGE OR INLINE VIDEO */}
      {showImage && (
        <div className="h-48 w-full relative overflow-hidden bg-slate-50 border-b border-slate-100">
          <img
            src={article.mainImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold rounded-full border border-slate-200 uppercase shadow-xs">
            {article.category}
          </span>
          {article.badge && (
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase shadow-xs">
              {article.badge}
            </span>
          )}
          {showVideo && (
            <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full flex items-center gap-1.5 shadow-xs">
              <Video className="w-3.5 h-3.5" />
              <span>Video Guide</span>
            </span>
          )}
        </div>
      )}

      {!showImage && showVideo && (
        <div className="w-full bg-slate-50 border-b border-slate-100">
          {article.videoUrl!.includes('youtube.com') ||
          article.videoUrl!.includes('youtu.be') ? (
            <iframe
              src={
                article.videoUrl!.includes('watch?v=')
                  ? article.videoUrl!.replace('watch?v=', 'embed/')
                  : article.videoUrl
              }
              title={article.title}
              className="w-full aspect-video border-0"
              allowFullScreen
            />
          ) : (
            <video
              src={article.videoUrl}
              controls
              className="w-full h-48 object-cover"
            />
          )}
        </div>
      )}

      {/* CARD CONTENT */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {!showImage && (
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-full border border-slate-200 uppercase">
                {article.category}
              </span>
              {article.badge && (
                <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase">
                  {article.badge}
                </span>
              )}
            </div>
          )}
          <h3
            onClick={onSelect}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:underline transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            <HighlightText text={article.title} highlight={searchQuery} />
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
            <HighlightText text={article.description} highlight={searchQuery} />
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-2 text-xs">
          <button
            onClick={onSelect}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Free Guide</span>
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
  );
};

export default AILearning;
