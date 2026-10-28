import React, { useState } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import {
  Music,
  Star,
  RefreshCw,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Award,
  Briefcase,
  Code,
  Video,
  Globe,
  Box,
  GraduationCap,
  Workflow,
  Cpu
} from 'lucide-react';
import { AtomeCardPanel } from '../components/AtomeCardPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { useApp } from '../context/AppContext';
import { ArticleModal } from '../components/ArticleModal';
import { AIAutomationDiagrams } from '../components/AIAutomationDiagrams';
import { CMSItem } from '../types';
import { Link } from 'react-router-dom';

interface HomePageProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
}

const MESHY_REFERRAL_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const { getHomeFeaturedCMSItems } = useApp();
  const [displayTestimonials, setDisplayTestimonials] = useState(TESTIMONIALS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<CMSItem | null>(null);

  const homeCmsItems = typeof getHomeFeaturedCMSItems === 'function' ? getHomeFeaturedCMSItems() : [];

  const handleConsult = (serviceTitle?: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(serviceTitle);
    }
  };

  const filteredCmsItems =
    selectedCategory === 'ALL'
      ? homeCmsItems
      : homeCmsItems.filter((item) => item.category.toUpperCase().includes(selectedCategory));

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-12">
      {/* ========================================================================= */}
      {/* 🚀 SECTION 1: CLEAN MINIMALIST PORTFOLIO & FREE VA ACADEMY HERO           */}
      {/* ========================================================================= */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-slate-100">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>100% Free VA Academy • AI Automation Blueprints • Digital Portfolio</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Free Tutorials, AI Automation Diagrams &amp; Career Guides for{' '}
              <span className="text-blue-600">Virtual Assistants &amp; Freelancers</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Learn how to become a high-earning Virtual Assistant or Freelancer at <strong className="text-slate-900">zero cost</strong>. Explore step-by-step career blueprints, copy-paste client proposal templates, and visual <strong className="text-slate-900">AI Automation Workflow Diagrams</strong>—or hire our dedicated engineering &amp; VA team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/ai"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2"
            >
              <Workflow className="w-4 h-4" />
              <span>Explore AI Automation Diagrams</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/affiliate-guide"
              className="px-6 py-3.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold text-sm rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Free VA &amp; Freelancer Guide</span>
            </Link>

            <button
              onClick={() => handleConsult('Executive VA & AI Automation Consultation')}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Hire Our VA / Dev Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 CORE VALUE PILLARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-blue-300 transition-all">
            <div className="flex items-center space-x-2 text-blue-600 font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>100% Free VA Academy</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Zero-to-Pro Freelancer Guides</h3>
            <p className="text-slate-600 leading-relaxed">
              Free step-by-step roadmaps, Upwork/OnlineJobs.ph proposal scripts, and daily VA checklists.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-violet-300 transition-all">
            <div className="flex items-center space-x-2 text-violet-600 font-bold uppercase tracking-wider">
              <Workflow className="w-4 h-4" />
              <span>Real AI Flows</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Visual Automation Diagrams</h3>
            <p className="text-slate-600 leading-relaxed">
              Interactive node-by-node diagrams showing how Webhooks, LLMs, Routers, and CRMs work together.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-emerald-300 transition-all">
            <div className="flex items-center space-x-2 text-emerald-600 font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Executive VAs</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Dedicated Remote Talent</h3>
            <p className="text-slate-600 leading-relaxed">
              Trained Executive Virtual Assistants, CRM specialists, and technical support operators.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-indigo-300 transition-all">
            <div className="flex items-center space-x-2 text-indigo-600 font-bold uppercase tracking-wider">
              <Code className="w-4 h-4" />
              <span>Full-Stack Studio</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Web, Apps &amp; 3D AI</h3>
            <p className="text-slate-600 leading-relaxed">
              Custom React/TypeScript web platforms, Google Play mobile apps, and AI 3D asset pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🎵 & 🧊 SIDE-BY-SIDE DIVISIONS: SUNO AI MUSIC + MESHY AI 3D GENERATOR      */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* DIVISION 1: SUNO AI MUSIC STUDIO */}
        <div className="rounded-3xl bg-white border-2 border-orange-200 hover:border-orange-300 p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-5 transition-all">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-orange-200 shrink-0 shadow-xs bg-orange-50">
                <img
                  src="./media_1787666146962.jpg"
                  alt="Suno AI Music Generation Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './media_1786678717227.png';
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Music className="w-3 h-3 text-orange-600" />
                    <span>SUNO AI DIVISION</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-semibold">
                    Free Signup Credits
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  Create Original Radio-Ready Songs with Suno AI
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Suno is the leading generative AI music studio. Transform simple text prompts into full-length broadcast-quality songs with realistic vocals, harmonies, and custom background tracks for client videos.
            </p>

            <div className="overflow-hidden rounded-xl border border-slate-200 h-28">
              <img
                src="./media_1787666146964.jpg"
                alt="Suno AI Music Showcase"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './media_1786678717227.png';
                }}
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Official Creator: @chillvibemusics</span>
            <a
              href="https://suno.com/@chillvibemusics"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Explore Suno AI Music Studio</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* DIVISION 2 (NEXT TO SUNO): MESHY AI 3D MODEL GENERATOR REFERRAL */}
        <div className="rounded-3xl bg-white border-2 border-violet-200 hover:border-violet-400 p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-5 transition-all">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-violet-200 shrink-0 shadow-xs bg-violet-600 text-white flex flex-col items-center justify-center">
                <Box className="w-7 h-7" />
                <span className="text-[10px] font-extrabold tracking-tight">MESHY 3D</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-violet-600" />
                    <span>MESHY AI 3D DIVISION • OFFICIAL REFERRAL</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                    Free Bonus Credits
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  <a
                    href={MESHY_REFERRAL_URL}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="hover:text-violet-600 transition-colors"
                  >
                    AI 3D Model Generator: Create 3D from Text &amp; Images | Meshy
                  </a>
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Generate production-ready 3D models and PBR textures from simple text prompts or reference photos in under 60 seconds. Export in <code className="px-1.5 py-0.5 bg-slate-100 rounded text-violet-700 text-xs">.GLB</code>, <code className="px-1.5 py-0.5 bg-slate-100 rounded text-violet-700 text-xs">.FBX</code>, <code className="px-1.5 py-0.5 bg-slate-100 rounded text-violet-700 text-xs">.OBJ</code>, or <code className="px-1.5 py-0.5 bg-slate-100 rounded text-violet-700 text-xs">.USDZ</code> for web design, e-commerce, Blender, Unity, and Unreal Engine.
            </p>

            <div className="flex flex-wrap gap-1.5">
              {[
                'Text to 3D',
                'Image to 3D',
                'AI PBR Texturing',
                'GLB / FBX / OBJ Export',
                'No 3D Experience Needed'
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-violet-50 border border-violet-200/80 text-violet-800 text-[11px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Partner Code: ER3M3J (Invite Friends)</span>
            <a
              href={MESHY_REFERRAL_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>AI 3D Model Generator: Create 3D from Text &amp; Images | Meshy</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🤖 SECTION 2: VISUAL AI AUTOMATION DIAGRAMS & FREE VA TOOLKIT             */}
      {/* ========================================================================= */}
      <AIAutomationDiagrams />

      {/* ========================================================================= */}
      {/* 🌟 SECTION 3: 2-COLUMN GRID: FREE TUTORIALS (LEFT 2/3) + ADS (RIGHT 1/3)  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 📚 LEFT 2/3 COLUMN: FREE TUTORIALS, GUIDES, PACKAGES & REVIEWS */}
        <div className="lg:col-span-2 space-y-8">
          {/* 🎛️ CMS CONTENT ITEMS (FEATURED EDUCATIONAL TOPICS & GUIDES) */}
          <HUDPanel title="📚 Free Tutorials, VA Career Guides &amp; AI Masterclasses" badge="100% Free Access">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <span>Step-by-Step Guides for Virtual Assistants &amp; Freelancers</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any tutorial card below to read the complete guide, checklists, and workflow steps for free.
                  </p>
                </div>

                {/* CATEGORY FILTER BUTTONS */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
                  {['ALL', 'AI', 'VA', 'FREELANC', 'AUTOMATION', 'DEV'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white shadow-xs'
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
                {filteredCmsItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group shadow-xs hover:shadow-md"
                  >
                    {item.mainImage && (
                      <div className="h-40 w-full relative overflow-hidden border-b border-slate-100 bg-slate-100">
                        <img
                          src={item.mainImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
                          }}
                        />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-white/95 backdrop-blur-xs text-blue-700 text-[10px] font-bold rounded-full border border-blue-200 uppercase shadow-xs">
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full uppercase shadow-xs">
                            {item.badge}
                          </span>
                        )}
                        {item.videoUrl && (
                          <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-xs">
                            <Video className="w-3 h-3" />
                            <span>Video</span>
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h4
                          onClick={() => setSelectedArticle(item)}
                          className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer"
                        >
                          {item.title}
                        </h4>
                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                        <button
                          onClick={() => setSelectedArticle(item)}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Read Free Guide</span>
                        </button>

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
                                : 'Open Tool'}
                            </span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

          {/* CORE VIRTUAL ASSISTANT & ENGINEERING PACKAGES */}
          <HUDPanel title="🛠️ Need Done-For-You Support? Dedicated VA &amp; Engineering Packages" badge="For Businesses">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {[
                {
                  title: 'Executive Virtual Assistant',
                  desc: 'Calendar management, smart inbox triage, Notion/HubSpot CRM updates, and daily client operations.',
                  price: '$1,500 / mo'
                },
                {
                  title: 'AI Workflow Automation Setup',
                  desc: 'Custom Make.com, n8n, or Zapier pipelines connecting your forms, AI LLMs, CRM, and Slack.',
                  price: '$750 / setup'
                },
                {
                  title: 'Full-Stack Web & CMS Platform',
                  desc: 'Modern, fast React, TypeScript, and Next.js websites with custom CMS dashboards.',
                  price: '$2,500 / project'
                },
                {
                  title: 'Mobile App Publishing',
                  desc: 'Android & iOS applications built and published on Google Play & App Store.',
                  price: '$799 / app'
                }
              ].map((svc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3 hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{svc.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{svc.desc}</p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200/80">
                    <span className="text-blue-700 font-extrabold text-sm">{svc.price}</span>
                    <button
                      onClick={() => handleConsult(svc.title)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      Book Consultation &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </HUDPanel>

          {/* VERIFIED REVIEWS */}
          <HUDPanel title="⭐ Verified Student, Freelancer &amp; Client Reviews" badge="Community Feedback">
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-600">
                  Real feedback from Virtual Assistants, freelancers, and business owners using our guides and services.
                </p>
                <button
                  onClick={() =>
                    setDisplayTestimonials([...TESTIMONIALS_DATA].sort(() => Math.random() - 0.5))
                  }
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Shuffle Reviews</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {displayTestimonials.slice(0, 6).map((t) => (
                  <div
                    key={t.id}
                    className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2.5 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-0.5 text-amber-400">
                          {[...Array(t.rating)].map((_, rIdx) => (
                            <Star key={rIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
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
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-bold">
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
