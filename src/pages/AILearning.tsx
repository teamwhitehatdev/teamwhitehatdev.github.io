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
  Workflow,
  Terminal,
  Hash,
  Link2,
  Edit3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CMSItem } from '../types';
import { ArticleModal } from '../components/ArticleModal';
import { AIAutomationDiagrams } from '../components/AIAutomationDiagrams';
import { DestinationLinksManagerModal } from '../components/DestinationLinksManagerModal';
import { BuilderPageRenderer } from '../components/BuilderPageRenderer';
import { AdminDevUnlockModal } from '../components/AdminDevUnlockModal';
import { isUserAdminOrDeveloper } from '../utils/adminAuth';
import {
  getCustomDestinationLinks,
  getEffectiveArticleDestination,
  CustomDestinationLink
} from '../utils/customDestinationLinks';

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
  const { getPublicPageCMSItems, navTabs, updateNavTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<CMSItem | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'by-category'>('by-category');
  const [sortOrderMode, setSortOrderMode] = useState<'number' | 'title'>('number');
  const [promptSubCategory, setPromptSubCategory] = useState<string>('ALL');
  const [customLinks, setCustomLinks] = useState<Record<string, CustomDestinationLink>>(() =>
    getCustomDestinationLinks()
  );
  const [isDestinationManagerOpen, setIsDestinationManagerOpen] = useState(false);
  const [isAdminOrDev, setIsAdminOrDev] = useState<boolean>(() => isUserAdminOrDeveloper());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const aiTab = (navTabs || []).find((t) => t.id === 'nav_ai' || t.slug === 'ai');

  // Sync auth and custom destination links across components and tabs
  useEffect(() => {
    const handleAuthChange = () => setIsAdminOrDev(isUserAdminOrDeveloper());
    const handleLinksChange = () => setCustomLinks(getCustomDestinationLinks());

    window.addEventListener('wh_admin_auth_changed', handleAuthChange);
    window.addEventListener('wh_destination_links_changed', handleLinksChange);
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('storage', handleLinksChange);

    return () => {
      window.removeEventListener('wh_admin_auth_changed', handleAuthChange);
      window.removeEventListener('wh_destination_links_changed', handleLinksChange);
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('storage', handleLinksChange);
    };
  }, []);

  const PROMPT_SUB_CATEGORIES: Array<{ key: string; label: string; tags: string[] }> = [
    { key: 'ALL', label: 'All Master Prompts (12)', tags: [] },
    { key: 'COGNITIVE', label: 'Cognitive Reasoning & Reflexion', tags: ['cognitive', 'reasoning', 'frameworks', '#01', '#07'] },
    { key: 'JSON_SCHEMA', label: 'Deterministic JSON & Zod Schemas', tags: ['json', 'zod', 'schema', '#08'] },
    { key: 'XML_CONTEXT', label: 'XML Context Injection & Fencing', tags: ['xml', 'context', 'document', '#09'] },
    { key: 'SECURITY', label: 'Prompt Injection Defense & Firewalls', tags: ['firewall', 'security', 'guardrails', 'injection', '#10'] },
    { key: 'ENTERPRISE', label: 'Support, Speed-to-Lead & Code Architects', tags: ['support', 'lead', 'customer', 'architect', '#02', '#03', '#12'] },
    { key: 'MEDIA_GROWTH', label: 'Viral Hooks, SEO Pillar & 3D Prompts', tags: ['copywriting', 'hooks', 'pillar', 'generative', '3d', '#04', '#05', '#06'] },
  ];

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
    'PROMPT ENGINEERING & MASTER PROMPTS',
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

  const CATEGORY_ORDER = [
    'PROMPT ENGINEERING & MASTER PROMPTS',
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
    'Prompt Engineering',
    'Master Prompts',
    'System Prompts',
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
    const list = allArticles.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        item.category.toUpperCase().includes(selectedCategory.toUpperCase());

      if (!matchesCategory) return false;

      // Filter by prompt engineering subcategory if prompt engineering is active or selected
      if (
        selectedCategory === 'PROMPT ENGINEERING & MASTER PROMPTS' &&
        promptSubCategory !== 'ALL'
      ) {
        const sub = PROMPT_SUB_CATEGORIES.find((s) => s.key === promptSubCategory);
        if (sub && sub.tags.length > 0) {
          const matchSub = sub.tags.some(
            (t) =>
              item.title.toLowerCase().includes(t.toLowerCase()) ||
              (item.badge && item.badge.toLowerCase().includes(t.toLowerCase())) ||
              item.description.toLowerCase().includes(t.toLowerCase())
          );
          if (!matchSub) return false;
        }
      }

      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const catMatch = item.category.toLowerCase().includes(q);
      const summaryMatch = item.summary ? item.summary.toLowerCase().includes(q) : false;
      const contentMatch = item.fullContent ? item.fullContent.toLowerCase().includes(q) : false;
      const badgeMatch = item.badge ? item.badge.toLowerCase().includes(q) : false;

      return titleMatch || descMatch || catMatch || summaryMatch || contentMatch || badgeMatch;
    });

    return list.sort((a, b) => {
      if (sortOrderMode === 'title') {
        return a.title.localeCompare(b.title);
      }
      return (a.sortOrder || 999) - (b.sortOrder || 999);
    });
  }, [allArticles, selectedCategory, searchQuery, sortOrderMode, promptSubCategory]);

  // Grouped and sorted articles by category with canonical hierarchy
  const articlesByCategory = useMemo(() => {
    const map = new Map<string, CMSItem[]>();
    filteredArticles.forEach((article) => {
      const cat = article.category || 'GENERAL';
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat)!.push(article);
    });

    // Sort items within each category
    map.forEach((items) => {
      items.sort((a, b) => {
        if (sortOrderMode === 'title') {
          return a.title.localeCompare(b.title);
        }
        return (a.sortOrder || 999) - (b.sortOrder || 999);
      });
    });

    // Sort categories according to canonical priority
    const sortedEntries = Array.from(map.entries()).sort(([catA], [catB]) => {
      const idxA = CATEGORY_ORDER.indexOf(catA);
      const idxB = CATEGORY_ORDER.indexOf(catB);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return catA.localeCompare(catB);
    });

    return new Map(sortedEntries);
  }, [filteredArticles, sortOrderMode]);

  const categoryMeta: Record<string, { label: string; icon: React.FC<{ className?: string }>; desc: string }> = {
    'PROMPT ENGINEERING & MASTER PROMPTS': {
      label: 'Prompt Engineering & Master Full-Prompts',
      icon: Terminal,
      desc: 'Production-grade system prompts, RTF & CREATE architectures, Chain-of-Thought reasoning, and few-shot calibration.'
    },
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
    },
    'VIRTUAL ASSISTANT CAREER': {
      label: 'Virtual Assistance & Remote Careers',
      icon: Layers,
      desc: 'Executive assistant playbooks, client onboarding, retainer contracts, and high-income skill stacks.'
    }
  };

  if (aiTab?.pageLayoutType === 'builder' && aiTab.builderBlocks && aiTab.builderBlocks.length > 0) {
    return (
      <BuilderPageRenderer
        blocks={aiTab.builderBlocks}
        settings={aiTab.builderPageSettings}
        tab={aiTab}
        onRevertDefault={() => {
          updateNavTab(aiTab.id, { pageLayoutType: 'standard' });
        }}
      />
    );
  }

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-16 bg-transparent text-slate-900">
      {/* HERO HEADER BANNER (GLASSMORPHIC MINIMALIST WHITE) */}
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

        {/* UPGRADED SEARCH AND CATEGORY FILTER ENGINE */}
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

              {/* Sort mode toggle: Number vs Title */}
              <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs">
                <button
                  onClick={() => setSortOrderMode('number')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    sortOrderMode === 'number'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Sort by Guide Number"
                >
                  <Hash className="w-3 h-3" />
                  <span>By Number</span>
                </button>
                <button
                  onClick={() => setSortOrderMode('title')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    sortOrderMode === 'title'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Sort Alphabetically by Title"
                >
                  <span>A-Z</span>
                </button>
              </div>

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

          {/* CATEGORY PILL TABS (NO HORIZONTAL SCROLLBAR, WRAPS CLEANLY) */}
          <div className="flex flex-wrap gap-2 text-xs pt-1 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (cat !== 'PROMPT ENGINEERING & MASTER PROMPTS') {
                    setPromptSubCategory('ALL');
                  }
                }}
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

          {/* PROMPT ENGINEERING SUB-CATEGORY SEPARATION CHIPS */}
          {selectedCategory === 'PROMPT ENGINEERING & MASTER PROMPTS' && (
            <div className="p-3 sm:p-4 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200/90 space-y-2.5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <span className="text-xs font-mono font-black text-indigo-950 flex items-center gap-1.5 uppercase tracking-wide">
                  <Terminal className="w-4 h-4 text-indigo-700" />
                  <span>Prompt Engineering Disciplines &amp; Master Blueprint Sub-Categories:</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-medium">
                  12 Step-by-Step Advanced Master Prompts
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {PROMPT_SUB_CATEGORIES.map((sub) => (
                  <button
                    key={sub.key}
                    type="button"
                    onClick={() => setPromptSubCategory(sub.key)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      promptSubCategory === sub.key
                        ? 'bg-indigo-950 text-white shadow-xs ring-1 ring-indigo-400'
                        : 'bg-white hover:bg-indigo-50 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* INTERACTIVE ANIMATED TOPOLOGY CANVAS WORKFLOW */}
      <AIAutomationDiagrams id="diagrams" searchQuery={searchQuery} activeCategory={selectedCategory} />

      {/* ALL NICHE TUTORIALS, SMM GUIDES, SEO & CREATOR PLAYBOOKS */}
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

          <div className="flex flex-wrap items-center gap-2">
            {/* BUTTON TO MODIFY ALL DESTINATION LINKS (ADMIN & DEVELOPER ONLY) */}
            {isAdminOrDev && (
              <button
                type="button"
                onClick={() => setIsDestinationManagerOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer border border-slate-800"
                title="Modify all destination links (referral URLs, affiliate links, and custom destination pages)"
              >
                <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Manage Destination Links</span>
                {Object.keys(customLinks).length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold">
                    {Object.keys(customLinks).length} Custom
                  </span>
                )}
              </button>
            )}

            {searchQuery && (
              <div className="px-3.5 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-semibold">
                Filtered by: <strong className="font-bold">&quot;{searchQuery}&quot;</strong> ({filteredArticles.length} results)
              </div>
            )}
          </div>
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
                setPromptSubCategory('ALL');
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all"
            >
              Clear Search &amp; Show All Guides
            </button>
          </div>
        ) : viewMode === 'by-category' ? (
          // =================================================================
          // GROUPED BY NICHE / CATEGORY SECTIONS (COMPACT HIGH-DENSITY GRID)
          // =================================================================
          <div className="space-y-10">
            {Array.from(articlesByCategory.entries()).map(([catName, articles]) => {
              const meta = categoryMeta[catName] || {
                label: catName,
                icon: Layers,
                desc: `Explore comprehensive educational guides in ${catName}.`
              };
              const CategoryIcon = meta.icon;

              return (
                <div key={catName} className="space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 text-white shrink-0">
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-slate-950">{meta.label}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-mono font-bold border border-slate-200">
                            {articles.length} {articles.length === 1 ? 'Guide' : 'Guides'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{meta.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* PROMPT SUB-CATEGORY CHIPS IN BY-CATEGORY VIEW */}
                  {catName === 'PROMPT ENGINEERING & MASTER PROMPTS' && (
                    <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-2">
                      <div className="text-xs font-mono font-bold text-slate-900 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-indigo-950 font-black">
                          <Terminal className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Filter 12 Master Prompts by Sub-Category:</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {PROMPT_SUB_CATEGORIES.map((sub) => (
                          <button
                            key={sub.key}
                            type="button"
                            onClick={() => setPromptSubCategory(sub.key)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                              promptSubCategory === sub.key
                                ? 'bg-indigo-950 text-white shadow-xs'
                                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* COMPACT SMALLER GRID (TIGHTER PADDING & PROFESSIONAL LOOK) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5">
                    {articles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        searchQuery={searchQuery}
                        customLinks={customLinks}
                        isAdminOrDev={isAdminOrDev}
                        onSelect={() => setSelectedArticle(article)}
                        onEditDestination={() => setIsDestinationManagerOpen(true)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // =================================================================
          // ALL GRID VIEW (COMPACT HIGH-DENSITY GRID)
          // =================================================================
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                searchQuery={searchQuery}
                customLinks={customLinks}
                isAdminOrDev={isAdminOrDev}
                onSelect={() => setSelectedArticle(article)}
                onEditDestination={() => setIsDestinationManagerOpen(true)}
              />
            ))}
          </div>
        )}
      </section>

      {/* FULL ARTICLE READER MODAL (WINDOWS POPPING OUT DIRECTLY AT VIEWPORT) */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* DESTINATION LINKS MANAGER MODAL (EDIT ALL DESTINATION LINKS FOR ADMIN/DEV) */}
      <DestinationLinksManagerModal
        isOpen={isDestinationManagerOpen}
        onClose={() => setIsDestinationManagerOpen(false)}
      />

      {/* ADMIN AUTH UNLOCK GATE */}
      <AdminDevUnlockModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => {
          setIsAdminOrDev(true);
          setIsDestinationManagerOpen(true);
        }}
      />
    </div>
  );
};

// Reusable Article Card Component with Highlighting (Compact & Minimalist)
const ArticleCard: React.FC<{
  article: CMSItem;
  searchQuery: string;
  customLinks: Record<string, CustomDestinationLink>;
  isAdminOrDev: boolean;
  onSelect: () => void;
  onEditDestination: () => void;
}> = ({ article, searchQuery, customLinks, isAdminOrDev, onSelect, onEditDestination }) => {
  const showImage = Boolean(article.mainImage && !article.hideImage);
  const showVideo = Boolean(article.videoUrl && !article.hideVideo);
  const destination = getEffectiveArticleDestination(article, customLinks);

  return (
    <div className="white-glass-card rounded-xl overflow-hidden flex flex-col justify-between transition-all group hover:-translate-y-0.5 border border-slate-200/90 shadow-2xs hover:shadow-xs">
      {/* CARD COVER IMAGE OR INLINE VIDEO */}
      {showImage && (
        <div className="h-32 sm:h-36 w-full relative overflow-hidden bg-slate-50 border-b border-slate-100">
          <img
            src={article.mainImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[9px] font-mono font-bold rounded-md border border-slate-200 uppercase shadow-xs">
            {article.category.split('&')[0].trim()}
          </span>
          {article.badge && (
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-slate-900 text-white text-[9px] font-mono font-bold rounded-md uppercase shadow-xs">
              {article.badge.split('•')[0].trim()}
            </span>
          )}
          {showVideo && (
            <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-900 text-white text-[9px] font-bold rounded-md flex items-center gap-1 shadow-xs">
              <Video className="w-3 h-3" />
              <span>Video</span>
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
              className="w-full h-32 object-cover"
            />
          )}
        </div>
      )}

      {/* CARD CONTENT */}
      <div className="p-3 sm:p-3.5 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {!showImage && (
            <div className="flex items-center justify-between gap-1.5">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[9px] font-mono font-bold rounded-md border border-slate-200 uppercase">
                {article.category.split('&')[0].trim()}
              </span>
              {article.badge && (
                <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-mono font-bold rounded-md uppercase">
                  {article.badge.split('•')[0].trim()}
                </span>
              )}
            </div>
          )}
          <h3
            onClick={onSelect}
            className="text-xs sm:text-sm font-black text-slate-950 group-hover:text-indigo-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            <HighlightText text={article.title} highlight={searchQuery} />
          </h3>
          <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
            <HighlightText text={article.description} highlight={searchQuery} />
          </p>
        </div>

        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 mt-1">
          <button
            onClick={onSelect}
            className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-3 h-3" />
            <span>Read Free Guide</span>
          </button>

          <div className="flex items-center gap-1 shrink-0">
            {destination.url && (
              <a
                href={destination.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-2 py-1.5 font-semibold text-[11px] rounded-lg transition-all flex items-center gap-1 shrink-0 border ${
                  isAdminOrDev && destination.isCustom
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-300 font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                }`}
                title={isAdminOrDev && destination.isCustom ? `Custom Link: ${destination.url}` : undefined}
              >
                {isAdminOrDev && destination.isCustom && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                )}
                <span>{destination.label}</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            )}

            {isAdminOrDev && (
              <button
                type="button"
                onClick={onEditDestination}
                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg transition-colors cursor-pointer"
                title="Edit Destination Link (Admin/Developer)"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILearning;
