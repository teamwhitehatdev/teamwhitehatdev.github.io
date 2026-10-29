import React, { useState } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import {
  Music,
  Star,
  BookOpen,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Code,
  Video,
  Box,
  GraduationCap,
  Workflow
} from 'lucide-react';
import { AtomeCardPanel } from '../components/AtomeCardPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { useApp } from '../context/AppContext';
import { ArticleModal } from '../components/ArticleModal';
import { AIAutomationDiagrams } from '../components/AIAutomationDiagrams';
import { CMSItem } from '../types';
import { Link } from 'react-router-dom';

interface HomePageProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  const { getHomeFeaturedCMSItems, cmsItems } = useApp();
  const [displayTestimonials] = useState(() =>
    [...TESTIMONIALS_DATA].sort(() => Math.random() - 0.5)
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<CMSItem | null>(null);
  const [expandedArticleIds, setExpandedArticleIds] = useState<Record<string, boolean>>({});

  const toggleArticleInline = (id: string) => {
    setExpandedArticleIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Featured Home Divisions (Suno AI & Meshy 3D or any custom Home divisions) managed in CMS
  const homeDivisions = (cmsItems || []).filter(
    (item) =>
      item.visible !== false &&
      item.status === 'PUBLISHED' &&
      (item.id === 'cms-home-division-suno' ||
        item.id === 'cms-home-division-meshy' ||
        item.category.toUpperCase().includes('DIVISION'))
  );

  const homeCmsItems = typeof getHomeFeaturedCMSItems === 'function' ? getHomeFeaturedCMSItems() : [];

  const filteredCmsItems =
    selectedCategory === 'ALL'
      ? homeCmsItems
      : homeCmsItems.filter((item) => item.category.toUpperCase().includes(selectedCategory));

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-12 bg-transparent text-slate-900">
      {/* ========================================================================= */}
      {/* 🚀 SECTION 1: CLEAN MINIMALIST WHITE PORTFOLIO & FREE VA ACADEMY HERO     */}
      {/* ========================================================================= */}
      <section className="white-glass-card rounded-3xl p-6 sm:p-10 space-y-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-slate-200/80">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-slate-700" />
              <span>100% Free VA Academy • AI Automation Blueprints • Digital Portfolio</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Free Tutorials, AI Automation Diagrams &amp; Career Guides for{' '}
              <span className="underline decoration-slate-300 underline-offset-8">
                Virtual Assistants &amp; Freelancers
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Learn how to become a successful Virtual Assistant or Freelancer at{' '}
              <strong className="text-slate-900">zero cost</strong>. Explore authentic step-by-step
              career blueprints, copy-paste client proposal templates, and visual{' '}
              <strong className="text-slate-900">AI Automation Workflow Diagrams</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/ai"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2"
            >
              <Workflow className="w-4 h-4" />
              <span>Explore AI Automation Diagrams</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/affiliate-guide"
              className="px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-semibold text-sm rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4 text-slate-700" />
              <span>Free VA &amp; Freelancer Guide</span>
            </Link>

            <Link
              to="/showcase"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5"
            >
              <span>View Portfolio Showcase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 CORE VALUE PILLARS (MINIMALIST MONOCHROME WHITE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2 hover:border-slate-400 hover:-translate-y-0.5 transition-all">
            <div className="flex items-center space-x-2 text-slate-700 font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>100% Free VA Academy</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Zero-to-Pro Freelancer Guides</h3>
            <p className="text-slate-600 leading-relaxed">
              Free step-by-step roadmaps, Upwork/OnlineJobs.ph proposal scripts, and daily VA
              checklists.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2 hover:border-slate-400 hover:-translate-y-0.5 transition-all">
            <div className="flex items-center space-x-2 text-slate-700 font-bold uppercase tracking-wider">
              <Workflow className="w-4 h-4" />
              <span>Real AI Flows</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Visual Automation Diagrams</h3>
            <p className="text-slate-600 leading-relaxed">
              Interactive node-by-node diagrams showing how Webhooks, LLMs, Routers, and CRMs work
              together.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2 hover:border-slate-400 hover:-translate-y-0.5 transition-all">
            <div className="flex items-center space-x-2 text-slate-700 font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Authentic Niche</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Verified Remote Playbooks</h3>
            <p className="text-slate-600 leading-relaxed">
              Original, non-duplicated tutorials covering executive assistance, CRM operations, and
              client retention.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2 hover:border-slate-400 hover:-translate-y-0.5 transition-all">
            <div className="flex items-center space-x-2 text-slate-700 font-bold uppercase tracking-wider">
              <Code className="w-4 h-4" />
              <span>Full-Stack Studio</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Web, Apps &amp; 3D AI</h3>
            <p className="text-slate-600 leading-relaxed">
              Custom React/TypeScript web platforms, Google Play mobile apps, and AI 3D asset
              pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* THEMEFOREST MARKETPLACE / GOOGLE ADSENSE FEATURED SLOT */}
      <AdSenseSlot placement="in-article" />

      {/* ========================================================================= */}
      {/* 🎵 & 🧊 CMS-DRIVEN DIVISIONS: SUNO AI MUSIC + MESHY AI 3D GENERATOR        */}
      {/* ========================================================================= */}
      {homeDivisions.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {homeDivisions.map((divItem) => {
            const isMeshy =
              divItem.id.includes('meshy') || divItem.category.toUpperCase().includes('MESHY');
            const showImg = Boolean(divItem.mainImage && !divItem.hideImage);
            const showVid = Boolean(divItem.videoUrl && !divItem.hideVideo);

            return (
              <div
                key={divItem.id}
                className="white-glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:-translate-y-0.5 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    {divItem.galleryImages && divItem.galleryImages[0] && !divItem.hideImage ? (
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-xs bg-slate-50">
                        <img
                          src={divItem.galleryImages[0]}
                          alt={divItem.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-xs bg-slate-900 text-white flex flex-col items-center justify-center">
                        {isMeshy ? <Box className="w-7 h-7" /> : <Music className="w-7 h-7" />}
                        <span className="text-[10px] font-extrabold tracking-tight">
                          {isMeshy ? 'MESHY 3D' : 'SUNO AI'}
                        </span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          {isMeshy ? (
                            <Sparkles className="w-3 h-3 text-slate-700" />
                          ) : (
                            <Music className="w-3 h-3 text-slate-700" />
                          )}
                          <span>{divItem.category}</span>
                        </span>
                        {divItem.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-semibold">
                            {divItem.badge}
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                        {divItem.url ? (
                          <a
                            href={divItem.url}
                            target="_blank"
                            rel="sponsored noopener noreferrer"
                            className="hover:underline transition-colors"
                          >
                            {divItem.title}
                          </a>
                        ) : (
                          divItem.title
                        )}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {divItem.description}
                  </p>

                  {showVid && (
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      {divItem.videoUrl!.includes('youtube.com') ||
                      divItem.videoUrl!.includes('youtu.be') ? (
                        <iframe
                          src={
                            divItem.videoUrl!.includes('watch?v=')
                              ? divItem.videoUrl!.replace('watch?v=', 'embed/')
                              : divItem.videoUrl
                          }
                          title={divItem.title}
                          className="w-full aspect-video border-0"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={divItem.videoUrl}
                          controls
                          className="w-full max-h-48 object-cover"
                        />
                      )}
                    </div>
                  )}

                  {showImg && (
                    <div className="overflow-hidden rounded-xl border border-slate-200 h-28 bg-slate-50">
                      <img
                        src={divItem.mainImage}
                        alt={divItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {divItem.metrics && (
                    <div className="flex flex-wrap gap-1.5">
                      {divItem.metrics
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">
                    {divItem.summary || 'Official Partner Division'}
                  </span>
                  {divItem.url && (
                    <a
                      href={divItem.url}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>{divItem.buttonText || 'Explore Now'}</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 🤖 SECTION 2: VISUAL AI AUTOMATION DIAGRAMS & FREE VA TOOLKIT             */}
      {/* ========================================================================= */}
      <AIAutomationDiagrams />

      {/* ========================================================================= */}
      {/* 🌟 SECTION 3: 2-COLUMN GRID: FREE TUTORIALS (LEFT 2/3) + ADS (RIGHT 1/3)  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 📚 LEFT 2/3 COLUMN: FREE TUTORIALS, GUIDES & REVIEWS */}
        <div className="lg:col-span-2 space-y-8">
          {/* 🎛️ CMS CONTENT ITEMS (FEATURED EDUCATIONAL TOPICS & GUIDES) */}
          <HUDPanel title="Free Tutorials, VA Career Guides &amp; AI Masterclasses" badge="100% Free Access">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-slate-700" />
                    <span>Step-by-Step Guides for Virtual Assistants &amp; Freelancers</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any tutorial card below to read the complete guide, checklists, and
                    workflow steps for free.
                  </p>
                </div>

                {/* CATEGORY FILTER BUTTONS */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
                  {['ALL', 'MAKE MONEY', 'AI', 'VA', 'FREELANC', 'AUTOMATION', 'DEV'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                      }`}
                    >
                      {cat === 'FREELANC' ? 'FREELANCE' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* TUTORIALS / ARTICLES GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredCmsItems.map((item) => {
                  const showImage = Boolean(item.mainImage && !item.hideImage);
                  const showVideo = Boolean(item.videoUrl && !item.hideVideo);
                  const isInlineExpanded = Boolean(expandedArticleIds[item.id]);

                  return (
                    <div
                      key={item.id}
                      className={`bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group shadow-xs ${
                        isInlineExpanded ? 'sm:col-span-2 ring-1 ring-slate-900/10' : 'hover:-translate-y-0.5'
                      }`}
                    >
                      {showImage && (
                        <div
                          className={`${
                            isInlineExpanded ? 'h-56 sm:h-72' : 'h-40'
                          } w-full relative overflow-hidden border-b border-slate-100 bg-slate-50 transition-all`}
                        >
                          <img
                            src={item.mainImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                          />
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold rounded-full border border-slate-200 uppercase shadow-xs">
                            {item.category}
                          </span>
                          {item.badge && (
                            <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase shadow-xs">
                              {item.badge}
                            </span>
                          )}
                          {showVideo && (
                            <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-xs">
                              <Video className="w-3 h-3" />
                              <span>Video</span>
                            </span>
                          )}
                        </div>
                      )}

                      {!showImage && showVideo && (
                        <div className="w-full border-b border-slate-100 bg-slate-50">
                          {item.videoUrl!.includes('youtube.com') ||
                          item.videoUrl!.includes('youtu.be') ? (
                            <iframe
                              src={
                                item.videoUrl!.includes('watch?v=')
                                  ? item.videoUrl!.replace('watch?v=', 'embed/')
                                  : item.videoUrl
                              }
                              title={item.title}
                              className="w-full aspect-video border-0"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              src={item.videoUrl}
                              controls
                              className="w-full h-40 object-cover"
                            />
                          )}
                        </div>
                      )}

                      <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          {!showImage && (
                            <div className="flex items-center justify-between gap-2 pb-1">
                              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-full border border-slate-200 uppercase">
                                {item.category}
                              </span>
                              {item.badge && (
                                <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          )}
                          <h4
                            onClick={() => toggleArticleInline(item.id)}
                            className={`text-sm sm:text-base font-extrabold text-slate-900 group-hover:underline transition-colors cursor-pointer ${
                              isInlineExpanded ? '' : 'line-clamp-2'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <p
                            className={`text-slate-600 text-xs leading-relaxed ${
                              isInlineExpanded ? 'font-medium text-slate-800' : 'line-clamp-3'
                            }`}
                          >
                            {item.description}
                          </p>

                          {/* INLINE EXPANDED DEEP-DIVE TUTORIAL READER */}
                          {isInlineExpanded && (
                            <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 text-xs text-slate-700 leading-relaxed">
                              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 whitespace-pre-wrap font-sans leading-relaxed max-h-[480px] overflow-y-auto">
                                {item.fullContent || item.description}
                              </div>

                              {/* PRACTITIONER PRO TIPS & ACTION BLUEPRINT */}
                              <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 space-y-2">
                                <span className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider block">
                                  ★ Practitioner Execution Checklist &amp; Pro Tips:
                                </span>
                                <ul className="space-y-1 text-slate-700 list-disc pl-4">
                                  <li>
                                    <strong>Step 1 — Setup &amp; Audit:</strong> Document your client&apos;s exact workflow inputs, naming rules, and deadlines in a shared Notion or Google Doc SOP before starting.
                                  </li>
                                  <li>
                                    <strong>Step 2 — Prototype &amp; Verify:</strong> Run a 3-sample test batch first and record a 60-second Loom walkthrough so your client can approve the format asynchronously.
                                  </li>
                                  <li>
                                    <strong>Step 3 — Scale &amp; Automate:</strong> Connect repetitive triggers using Make.com, Zapier, or AI prompts to cut turnaround time by 60%+.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 mt-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleArticleInline(item.id)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-bold text-xs rounded-lg transition-all cursor-pointer"
                            >
                              {isInlineExpanded ? '▲ Collapse Article' : '▼ Expand Full Article'}
                            </button>

                            <button
                              type="button"
                              onClick={() => setSelectedArticle(item)}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Full-Screen Reader</span>
                            </button>
                          </div>

                          {(item.url || item.referralUrl) && (
                            <a
                              href={item.url || item.referralUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] rounded-lg transition-all flex items-center gap-1 shrink-0"
                            >
                              <span>
                                {item.buttonText
                                  ? item.buttonText.split('(')[0].trim().slice(0, 18)
                                  : 'Open Resource'}
                              </span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </HUDPanel>

          {/* VERIFIED REVIEWS (MINIMALIST WHITE — AUTO-SHUFFLED ON REFRESH) */}
          <HUDPanel title="Verified Student, Freelancer &amp; Client Reviews" badge="Community Feedback">
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-600">
                  Real feedback from Virtual Assistants, freelancers, and founders using our free
                  guides and workflows.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {displayTestimonials.slice(0, 6).map((t) => (
                  <div
                    key={t.id}
                    className="bg-slate-50/80 border border-slate-200 p-4 rounded-2xl space-y-2.5 flex flex-col justify-between hover:border-slate-400 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-0.5 text-slate-900">
                          {[...Array(t.rating)].map((_, rIdx) => (
                            <Star key={rIdx} className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-full font-semibold">
                          Verified
                        </span>
                      </div>
                      <p className="text-slate-700 italic leading-relaxed text-xs line-clamp-3">
                        "{t.text}"
                      </p>
                    </div>
                    <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs">{t.name}</h5>
                        <p className="text-[10px] text-slate-500">{t.location || t.role}</p>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-[11px] font-bold">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>
        </div>

        {/* 🚀 RIGHT 1/3 COLUMN: DEDICATED PROMOTIONS & ADS */}
        <aside className="lg:col-span-1 space-y-6 sticky top-20 self-start">
          <AtomeCardPanel />
          <DynamicAdsSidebar />
        </aside>
      </div>

      {/* ARTICLE READER MODAL */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
};
export default HomePage;
