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
  const [gridColsMode, setGridColsMode] = useState<3 | 4>(3);
  const [sortOrderMode, setSortOrderMode] = useState<'number' | 'title'>('number');
  const [selectedSkillTrack, setSelectedSkillTrack] = useState<string>('ALL');
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
    'VIRTUAL ASSISTANT CAREER',
    'FREELANCING MASTERY',
    'DIGITAL SKILLS',
    'PROMPT ENGINEERING & MASTER PROMPTS',
    'AI AUTOMATION',
    'AI CAPABILITIES',
    'SOCIAL MEDIA & MARKETING',
    'SEO & METADATA',
    'CONTENT CREATORS & STREAMERS',
    'MAKE MONEY ONLINE'
  ];

  const quickSearchTags = [
    'START HERE #01',
    'Skill Matrix',
    'Executive VA',
    'Loom Audit Proposal',
    'Prompt Engineering',
    'Master Prompts',
    'CRM & Lead Ops',
    'Social Media Manager',
    'Algorithm Mechanics',
    'SEO & Metadata',
    'Speed-to-Lead',
    'Meshy 3D'
  ];

  const SKILL_LEARNING_TRACKS: Array<{
    id: string;
    label: string;
    badge: string;
    keywords: string[];
  }> = [
    { id: 'ALL', label: 'All Skills & Learnings', badge: 'Complete', keywords: [] },
    {
      id: 'BEGINNER_VA',
      label: 'Beginner / Foundation VA',
      badge: 'Stage 1',
      keywords: ['where to start', 'foundation', 'inbox', 'calendar', 'executive', 'beginner', 'career', 'virtual assistant']
    },
    {
      id: 'PROPOSALS_CLIENTS',
      label: 'Proposals, Portfolio & Closing',
      badge: 'Stage 2',
      keywords: ['proposal', 'portfolio', 'client', 'retainer', 'upwork', 'onlinejobs', 'contract', 'outreach', 'freelanc']
    },
    {
      id: 'CRM_SOP_OPS',
      label: 'CRM, Lead Ops & SOP Systems',
      badge: 'Stage 3',
      keywords: ['crm', 'hubspot', 'lead', 'sop', 'notion', 'airtable', 'operations', 'kpi', 'ecommerce', 'shopify']
    },
    {
      id: 'AI_PROMPT_MASTERY',
      label: 'Prompt Engineering & LLMs',
      badge: 'AI Core',
      keywords: ['prompt', 'llm', 'gpt', 'claude', 'json', 'xml', 'cognitive', 'hallucination', 'fact-check']
    },
    {
      id: 'AUTOMATION_WORKFLOWS',
      label: 'n8n, Make & Webhook Automation',
      badge: 'Stage 4',
      keywords: ['automation', 'webhook', 'make.com', 'n8n', 'zapier', 'workflow', 'pipeline', 'triage', 'agent']
    },
    {
      id: 'SMM_SEO_CREATOR',
      label: 'SMM, Technical SEO & Creators',
      badge: 'Growth',
      keywords: ['social media', 'smm', 'seo', 'metadata', 'schema', 'creator', 'youtube', 'stream', 'viral', 'blog']
    }
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: allArticles.length };
    categories.forEach((cat) => {
      if (cat !== 'ALL') {
        counts[cat] = allArticles.filter((a) =>
          a.category.toUpperCase().includes(cat.toUpperCase())
        ).length;
      }
    });
    return counts;
  }, [allArticles]);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const list = allArticles.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        item.category.toUpperCase().includes(selectedCategory.toUpperCase());

      if (!matchesCategory) return false;

      // Filter by Skills & Learning Track
      if (selectedSkillTrack !== 'ALL') {
        const track = SKILL_LEARNING_TRACKS.find((t) => t.id === selectedSkillTrack);
        if (track && track.keywords.length > 0) {
          const hay = `${item.title} ${item.category} ${item.description} ${item.badge || ''} ${item.summary || ''}`.toLowerCase();
          const matchesSkill = track.keywords.some((kw) => hay.includes(kw.toLowerCase()));
          if (!matchesSkill) return false;
        }
      }

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
  }, [allArticles, selectedCategory, selectedSkillTrack, searchQuery, sortOrderMode, promptSubCategory]);

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
      label: 'Virtual Assistant Career & Executive Operations (Start Here)',
      icon: Layers,
      desc: 'Zero-to-first-client roadmaps, 3-tier skill ladders ($5/hr → $35+/hr), Executive Inbox Zero & Calendar Defense SOPs, and Shopify e-commerce operations.'
    },
    'FREELANCING MASTERY': {
      label: 'Freelancing Mastery, Proposals, Portfolios & Retainer Scaling',
      icon: CheckCircle2,
      desc: 'Undeniable Upwork/OnlineJobs.ph proposals, 60-second Loom audits, 3 proof-of-work portfolio builds, safe contracts, and multi-year client retention.'
    },
    'DIGITAL SKILLS': {
      label: 'High-Income Digital Skills: CRM Pipelines, B2B Lead Ops & SOP Architecture',
      icon: Globe2,
      desc: 'HubSpot, GoHighLevel, Airtable administration, verified zero-bounce B2B lead enrichment, Notion company wikis, and executive KPI scorecards.'
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

      {/* WHERE TO START: INTERACTIVE 4-STAGE VA & FREELANCER SKILL-BUILDING ROADMAP */}
      <section className="rounded-3xl bg-gradient-to-br from-purple-50/95 via-indigo-50/85 to-white border-2 border-purple-200/90 p-5 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-purple-200/80">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 text-white text-[11px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Trusted Step-by-Step Curriculum &bull; Where to Start Building Your Skills</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Where to Start: 4-Stage Virtual Assistant &amp; Freelancer Skill-Building Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              New to remote work or upgrading your rate from $5/hr to $25–$50/hr? Follow these 4 structured stages in order. Click any stage or blueprint below to open the full guide immediately.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                const startGuide = allArticles.find((a) => a.id === 'cms-va-mastery-01-where-to-start') || allArticles[0];
                if (startGuide) setSelectedArticle(startGuide);
              }}
              className="px-4 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Guide #01: Where to Start (30-Day Blueprint)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              stage: 'STAGE 01 • DAYS 1–7',
              title: 'Foundation & Executive VA Ops',
              rate: '$5–$10/hr Foundation',
              categoryFilter: 'VIRTUAL ASSISTANT CAREER',
              guideIds: ['cms-va-mastery-01-where-to-start', 'cms-va-mastery-02-skill-matrix', 'cms-va-mastery-03-executive-va-ops'],
              bullets: [
                '30-Day Zero-to-First-Client Roadmap',
                'Inbox Zero 4-Folder Triage & Calendar Defense',
                'Daily End-of-Day (EOD) Client Reporting'
              ]
            },
            {
              stage: 'STAGE 02 • DAYS 8–21',
              title: 'Portfolio, Proposals & Client Closing',
              rate: '$10–$20/hr Specialist',
              categoryFilter: 'FREELANCING MASTERY',
              guideIds: ['cms-va-mastery-04-proposals-outreach', 'cms-va-mastery-05-portfolio-zero-experience', 'cms-va-mastery-06-contracts-onboarding'],
              bullets: [
                'Build 3 Proof-of-Work Samples (Zero Clients Needed)',
                '60-Second Loom Video Audit Proposals',
                'Discovery Call Scripts & Anti-Scam Safety'
              ]
            },
            {
              stage: 'STAGE 03 • DAYS 22–45',
              title: 'AI Copilot, Prompting & CRM Ops',
              rate: '$15–$30/hr AI Operator',
              categoryFilter: 'DIGITAL SKILLS',
              guideIds: ['cms-va-mastery-07-ai-augmented-va', 'cms-va-mastery-08-crm-lead-enrichment', 'cms-va-mastery-09-sop-operations-manager'],
              bullets: [
                '15 Daily VA Tasks Accelerated 5x with AI',
                'HubSpot, GoHighLevel & Zero-Bounce Lead Ops',
                'Writing Company SOPs & Weekly KPI Scorecards'
              ]
            },
            {
              stage: 'STAGE 04 • DAYS 46–90',
              title: 'AI Automation & Retainer Scaling',
              rate: '$300–$1,500/Setup + Retainers',
              categoryFilter: 'PROMPT ENGINEERING & MASTER PROMPTS',
              guideIds: ['cms-va-mastery-10-ecommerce-shopify-va', 'cms-va-mastery-11-ai-fact-checking-research', 'cms-va-mastery-12-retainer-scaling'],
              bullets: [
                'Make.com, n8n & Zapier Webhook Topologies',
                'Zero-Hallucination Fact-Checking Guardrails',
                'Productized Retainers ($500–$1,850/mo)'
              ]
            }
          ].map((st, idx) => (
            <div
              key={st.stage}
              className="p-4 rounded-2xl bg-white border border-purple-200/90 hover:border-purple-500 shadow-2xs flex flex-col justify-between space-y-3 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-950 font-mono font-bold text-[10px]">
                    {st.stage}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {st.rate}
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-950 leading-snug">
                  {idx + 1}. {st.title}
                </h3>
                <ul className="space-y-1 text-[11px] text-slate-600">
                  {st.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(st.categoryFilter);
                    setSearchQuery('');
                  }}
                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-950 font-bold text-[11px] border border-purple-200 transition-colors cursor-pointer text-center"
                >
                  Filter Stage {idx + 1} Guides
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const found = allArticles.find((a) => st.guideIds.includes(a.id));
                    if (found) setSelectedArticle(found);
                  }}
                  className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-colors cursor-pointer shrink-0"
                  title="Read First Guide in This Stage"
                >
                  Read &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE ANIMATED TOPOLOGY CANVAS WORKFLOW */}
      <AIAutomationDiagrams id="diagrams" searchQuery={searchQuery} activeCategory={selectedCategory} />

      {/* ALL NICHE TUTORIALS, SMM GUIDES, SEO & CREATOR PLAYBOOKS — MODERNIZED GRID-BY-GRID & CATEGORY-BY-CATEGORY */}
      <section id="knowledge-library" className="space-y-6">
        {/* MODERNIZED COMMAND HEADER & MULTI-DIMENSIONAL FILTER MATRIX */}
        <div className="white-glass-card rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
            <div className="space-y-1.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>STRUCTURED KNOWLEDGE ARCHITECTURE • {filteredArticles.length} OF {allArticles.length} GUIDES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Complete Knowledge Library: SMM, SEO, Creators &amp; Automation
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Click any guide below to open the complete long-form reader with step-by-step instructions. Filter by <strong>Category</strong>, <strong>Skill &amp; Learning Track</strong>, or switch between <strong>Category-by-Category Grids</strong> and <strong>Unified Master Grid</strong>.
              </p>
            </div>

            {/* VIEW MODE, GRID COLUMNS & SORT CONTROLS */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Layout Mode Switcher */}
              <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setViewMode('by-category')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'by-category'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Category-by-Category
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'all'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Unified Grid ({filteredArticles.length})
                </button>
              </div>

              {/* Grid Columns Alignment Switcher */}
              <div className="hidden sm:inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setGridColsMode(3)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    gridColsMode === 3
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="3-Column Balanced Grid"
                >
                  3-Col Grid
                </button>
                <button
                  type="button"
                  onClick={() => setGridColsMode(4)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    gridColsMode === 4
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="4-Column High-Density Grid"
                >
                  4-Col Grid
                </button>
              </div>

              {/* Sort Order Switcher */}
              <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSortOrderMode('number')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    sortOrderMode === 'number'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Order #01–99
                </button>
                <button
                  type="button"
                  onClick={() => setSortOrderMode('title')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    sortOrderMode === 'title'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sort A–Z
                </button>
              </div>

              {isAdminOrDev && (
                <button
                  type="button"
                  onClick={() => setIsDestinationManagerOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer border border-slate-800"
                >
                  <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Manage Links</span>
                </button>
              )}
            </div>
          </div>

          {/* SEARCH BAR + ACTIVE FILTER RESET */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all categories, skills, SOPs, prompts, SEO tags, or automation blueprints..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/15 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {(selectedCategory !== 'ALL' || selectedSkillTrack !== 'ALL' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedSkillTrack('ALL');
                  setPromptSubCategory('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-all"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          {/* FILTER DIMENSION 1: SKILLS & LEARNINGS TRACKS */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Filter by Skills &amp; Learning Track:</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Select a skill path to isolate matching guides
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
              {SKILL_LEARNING_TRACKS.map((track) => {
                const isSelected = selectedSkillTrack === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setSelectedSkillTrack(track.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                      isSelected
                        ? 'bg-indigo-950 text-white border-indigo-900 shadow-xs ring-2 ring-indigo-500/30'
                        : 'bg-slate-50/90 hover:bg-indigo-50/60 text-slate-800 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded w-fit ${
                        isSelected
                          ? 'bg-indigo-500/30 text-indigo-200'
                          : 'bg-white text-indigo-700 border border-indigo-200/80'
                      }`}
                    >
                      {track.badge}
                    </span>
                    <span className="text-[11px] font-extrabold leading-tight line-clamp-2">
                      {track.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FILTER DIMENSION 2: NICHE CATEGORY MATRIX (WITH EXACT GUIDE COUNTS) */}
          <div className="space-y-2 pt-2 border-t border-slate-200/70">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Filter by Niche Category ({categories.length - 1} Specialized Pillars):</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = categoryCounts[cat] ?? 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (cat !== 'PROMPT ENGINEERING & MASTER PROMPTS') {
                        setPromptSubCategory('ALL');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{cat === 'ALL' ? 'All Categories' : cat}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center space-y-4 white-glass-card rounded-3xl border border-slate-200 p-8">
            <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-extrabold text-slate-900">
              No Tutorials Found Matching Your Active Filters
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Try clearing your search query or switching to &quot;All Categories&quot; and &quot;All Skills &amp; Learnings&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedSkillTrack('ALL');
                setPromptSubCategory('ALL');
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all"
            >
              Reset Filters &amp; Show All Guides
            </button>
          </div>
        ) : viewMode === 'by-category' ? (
          // =================================================================
          // GROUPED BY NICHE / CATEGORY SECTIONS (PERFECTLY ALIGNED GRID-BY-GRID)
          // =================================================================
          <div className="space-y-10">
            {Array.from(articlesByCategory.entries()).map(([catName, articles], catIdx) => {
              const meta = categoryMeta[catName] || {
                label: catName,
                icon: Layers,
                desc: `Explore comprehensive educational guides in ${catName}.`
              };
              const CategoryIcon = meta.icon;

              return (
                <div
                  key={catName}
                  className="rounded-3xl bg-white/90 border-2 border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5"
                >
                  {/* Category Header Banner */}
                  <div className="pb-4 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <CategoryIcon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-mono font-extrabold uppercase">
                            CATEGORY {String(catIdx + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">
                            {meta.label}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono font-extrabold border border-emerald-200">
                            {articles.length} {articles.length === 1 ? 'Masterclass' : 'Masterclasses'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                          {meta.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {selectedCategory === catName ? (
                        <button
                          type="button"
                          onClick={() => setSelectedCategory('ALL')}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer transition-all"
                        >
                          Showing Only This Category (Show All)
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(catName)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-800 border border-slate-200 font-bold text-xs cursor-pointer transition-all"
                        >
                          Focus Category &rarr;
                        </button>
                      )}
                    </div>
                  </div>

                  {/* PROMPT SUB-CATEGORY CHIPS IN BY-CATEGORY VIEW */}
                  {catName === 'PROMPT ENGINEERING & MASTER PROMPTS' && (
                    <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-2xl space-y-2">
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

                  {/* ALIGNED EQUAL-HEIGHT GRID-BY-GRID CARDS */}
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${
                      gridColsMode === 3
                        ? 'lg:grid-cols-3'
                        : 'lg:grid-cols-3 xl:grid-cols-4'
                    } gap-4 items-stretch`}
                  >
                    {articles.map((article, itemIdx) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        indexNumber={itemIdx + 1}
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
          // UNIFIED MASTER GRID VIEW (PERFECTLY ALIGNED GRID-BY-GRID)
          // =================================================================
          <div className="rounded-3xl bg-white/90 border-2 border-slate-200/90 p-5 sm:p-7 shadow-xs">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridColsMode === 3
                  ? 'lg:grid-cols-3'
                  : 'lg:grid-cols-3 xl:grid-cols-4'
              } gap-4 items-stretch`}
            >
              {filteredArticles.map((article, itemIdx) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  indexNumber={itemIdx + 1}
                  searchQuery={searchQuery}
                  customLinks={customLinks}
                  isAdminOrDev={isAdminOrDev}
                  onSelect={() => setSelectedArticle(article)}
                  onEditDestination={() => setIsDestinationManagerOpen(true)}
                />
              ))}
            </div>
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

// Reusable Article Card Component with Highlighting (Modernized Equal-Height Grid Card)
const ArticleCard: React.FC<{
  article: CMSItem;
  indexNumber?: number;
  searchQuery: string;
  customLinks: Record<string, CustomDestinationLink>;
  isAdminOrDev: boolean;
  onSelect: () => void;
  onEditDestination: () => void;
}> = ({ article, indexNumber, searchQuery, customLinks, isAdminOrDev, onSelect, onEditDestination }) => {
  const showImage = Boolean(article.mainImage && !article.hideImage);
  const showVideo = Boolean(article.videoUrl && !article.hideVideo);
  const destination = getEffectiveArticleDestination(article, customLinks);

  const catUpper = (article.category || '').toUpperCase();
  const skillBadge = catUpper.includes('VIRTUAL ASSISTANT')
    ? { label: 'VA Career & Ops', color: 'bg-blue-50 text-blue-800 border-blue-200' }
    : catUpper.includes('FREELANC')
    ? { label: 'Client & Retainer Mastery', color: 'bg-amber-50 text-amber-800 border-amber-200' }
    : catUpper.includes('DIGITAL SKILLS')
    ? { label: 'CRM & Lead Systems', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
    : catUpper.includes('PROMPT')
    ? { label: 'Prompt Architecture', color: 'bg-purple-50 text-purple-800 border-purple-200' }
    : catUpper.includes('AUTOMATION')
    ? { label: 'n8n / Make Workflows', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' }
    : catUpper.includes('SEO')
    ? { label: 'Technical SEO & GEO', color: 'bg-cyan-50 text-cyan-800 border-cyan-200' }
    : { label: 'Practitioner Playbook', color: 'bg-slate-100 text-slate-800 border-slate-200' };

  return (
    <div className="h-full bg-white rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1 border-2 border-slate-200/90 hover:border-indigo-500 shadow-2xs hover:shadow-md">
      {/* CARD COVER IMAGE, INLINE VIDEO, OR ALIGNED GRADIENT HEADER */}
      {showImage ? (
        <div
          onClick={onSelect}
          className="h-40 w-full relative overflow-hidden bg-slate-100 border-b border-slate-200/80 cursor-pointer shrink-0"
        >
          <img
            src={article.mainImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            {indexNumber !== undefined && (
              <span className="px-2 py-0.5 bg-slate-950/90 text-cyan-300 text-[10px] font-mono font-extrabold rounded-md shadow-xs">
                #{String(indexNumber).padStart(2, '0')}
              </span>
            )}
            <span className="px-2 py-0.5 bg-white/95 backdrop-blur-xs text-slate-900 text-[9px] font-mono font-extrabold rounded-md border border-slate-200 uppercase shadow-xs">
              {article.category.split('&')[0].trim()}
            </span>
          </div>
          {article.badge && (
            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-mono font-bold rounded-md uppercase shadow-xs">
              {article.badge.split('•')[0].trim()}
            </span>
          )}
          {showVideo && (
            <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-slate-900 text-white text-[9px] font-bold rounded-md flex items-center gap-1 shadow-xs">
              <Video className="w-3 h-3" />
              <span>Video</span>
            </span>
          )}
        </div>
      ) : showVideo ? (
        <div className="h-40 w-full bg-slate-900 border-b border-slate-200/80 shrink-0 overflow-hidden">
          {article.videoUrl!.includes('youtube.com') ||
          article.videoUrl!.includes('youtu.be') ? (
            <iframe
              src={
                article.videoUrl!.includes('watch?v=')
                  ? article.videoUrl!.replace('watch?v=', 'embed/')
                  : article.videoUrl
              }
              title={article.title}
              className="w-full h-full border-0"
              allowFullScreen
            />
          ) : (
            <video
              src={article.videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ) : (
        <div
          onClick={onSelect}
          className="px-4 py-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-slate-200/80 flex items-center justify-between gap-2 cursor-pointer shrink-0"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            {indexNumber !== undefined && (
              <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono font-extrabold rounded-md shrink-0">
                #{String(indexNumber).padStart(2, '0')}
              </span>
            )}
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-200 truncate">
              {article.category.split('&')[0].trim()}
            </span>
          </div>
          {article.badge && (
            <span className="px-2 py-0.5 bg-white/15 text-amber-300 text-[9px] font-mono font-bold rounded-md uppercase shrink-0">
              {article.badge.split('•')[0].trim()}
            </span>
          )}
        </div>
      )}

      {/* CARD CONTENT — UNIFORM FLEX HEIGHT & ALIGNMENT */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Skill & Learning Track Pill */}
          <div className="flex items-center justify-between gap-2">
            <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold ${skillBadge.color}`}>
              {skillBadge.label}
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-semibold">
              Step-by-Step SOP
            </span>
          </div>

          <h3
            onClick={onSelect}
            className="text-sm sm:text-base font-extrabold text-slate-950 group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[2.6rem] cursor-pointer leading-snug"
          >
            <HighlightText text={article.title} highlight={searchQuery} />
          </h3>
          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 min-h-[3.5rem]">
            <HighlightText text={article.description} highlight={searchQuery} />
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <button
            onClick={onSelect}
            className="px-3.5 py-2 bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Full Guide</span>
          </button>

          <div className="flex items-center gap-1 shrink-0">
            {destination.url && (
              <a
                href={destination.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-2.5 py-2 font-bold text-[11px] rounded-xl transition-all flex items-center gap-1 shrink-0 border ${
                  isAdminOrDev && destination.isCustom
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-300'
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
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors cursor-pointer"
                title="Edit Destination Link (Admin/Developer)"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILearning;
