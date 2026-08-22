import React, { useState } from 'react';
import { HUDPanel } from '../components/HUDPanel';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { Star, RefreshCw, BookOpen, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink, Award, Zap, Flame, HelpCircle, Layers, TrendingUp, UserCheck, Briefcase, Code, Video, Globe } from 'lucide-react';
import { AtomeCardPanel } from '../components/AtomeCardPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { useApp } from '../context/AppContext';
import { ArticleModal } from '../components/ArticleModal';
import { CMSItem } from '../types';

interface HomePageProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  const { getPublicPageCMSItems } = useApp();
  const [displayTestimonials, setDisplayTestimonials] = useState(TESTIMONIALS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<CMSItem | null>(null);

  const homeCmsItems = getPublicPageCMSItems('home');

  const handleConsult = (serviceTitle?: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(serviceTitle);
    }
  };

  const filteredCmsItems = selectedCategory === 'ALL'
    ? homeCmsItems
    : homeCmsItems.filter(item => item.category.toUpperCase().includes(selectedCategory));

  return (
    <div className="space-y-8 select-none">
      
      {/* ========================================================================= */}
      {/* 🎓 SECTION 1: PLATFORM MISSION & CLEAR LEARNING PURPOSE */}
      {/* ========================================================================= */}
      <HUDPanel title="🎓 VIRTUAL ASSISTANT, FREELANCING & DIGITAL SKILLS LEARNING HUB">
        <div className="p-5 sm:p-6 space-y-6">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300 font-mono text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span>EDUCATIONAL RESOURCE &amp; CAREER PLATFORM</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-orbitron text-white leading-tight">
              EMPWOERING VIRTUAL ASSISTANTS, FREELANCERS &amp; REMOTE WORKERS WORLDWIDE
            </h2>
            
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              This platform is created to help Virtual Assistants, aspiring VAs, freelancers, and remote workers learn practical administrative strategies, digital skills, software tools, and responsible online income opportunities.
            </p>
          </div>

          {/* 4 CORE LEARNING PILLARS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 font-sans text-xs">
            <div className="p-4 bg-black/80 border border-cyan-500/30 rounded-xl space-y-2 hover:border-cyan-400 transition-all">
              <div className="flex items-center gap-2 text-cyan-300 font-bold font-orbitron">
                <Briefcase className="w-4 h-4 text-lime-400" />
                <span>1. Virtual Assistance</span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Master inbox triage, calendar scheduling, spreadsheet management, and executive client support.
              </p>
            </div>

            <div className="p-4 bg-black/80 border border-cyan-500/30 rounded-xl space-y-2 hover:border-cyan-400 transition-all">
              <div className="flex items-center gap-2 text-cyan-300 font-bold font-orbitron">
                <UserCheck className="w-4 h-4 text-lime-400" />
                <span>2. Freelancing</span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Learn proposal writing, portfolio building, client onboarding, and recurring retainer packages.
              </p>
            </div>

            <div className="p-4 bg-black/80 border border-cyan-500/30 rounded-xl space-y-2 hover:border-cyan-400 transition-all">
              <div className="flex items-center gap-2 text-cyan-300 font-bold font-orbitron">
                <Video className="w-4 h-4 text-lime-400" />
                <span>3. Digital Skills</span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Develop in-demand skills in Canva graphic design, CapCut short-form video editing, and AI tools.
              </p>
            </div>

            <div className="p-4 bg-black/80 border border-cyan-500/30 rounded-xl space-y-2 hover:border-cyan-400 transition-all">
              <div className="flex items-center gap-2 text-cyan-300 font-bold font-orbitron">
                <Globe className="w-4 h-4 text-lime-400" />
                <span>4. Affiliate Education</span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Understand how referral links work to responsibly build additional online income streams.
              </p>
            </div>
          </div>

          {/* RESPONSIBLE FINANCIAL DISCLAIMER BOX */}
          <div className="p-4 bg-gray-900/90 border border-amber-500/40 rounded-xl space-y-1.5 font-mono text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>RESPONSIBLE EDUCATION &amp; REALISTIC RESULTS DISCLAIMER</span>
            </div>
            <p className="text-gray-300 text-[11px] font-sans leading-relaxed">
              We do NOT promise guaranteed income or easy riches. Your results depend on your learning, consistency, skill development, client outreach effort, and responsible business practices.
            </p>
          </div>

        </div>
      </HUDPanel>

      {/* ========================================================================= */}
      {/* 🚀 SECTION 2: 13-STEP LEARNING & CAREER PROGRESSION PATH */}
      {/* ========================================================================= */}
      <HUDPanel title="🚀 13-STEP VA &amp; FREELANCER CAREER PROGRESSION PATH">
        <div className="p-5 space-y-4">
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Follow this logical progression path to build your skills, establish a professional profile, and land long-term clients:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-sans text-xs">
            {[
              { step: 'STEP 01', title: 'Learn VA Fundamentals', desc: 'Understand the role, remote workflows, and administrative expectations.' },
              { step: 'STEP 02', title: 'Identify Your Strengths', desc: 'Assess your existing skills in writing, organization, design, or tech.' },
              { step: 'STEP 03', title: 'Choose a Specific Niche', desc: 'Specialize in executive assistance, video editing, or web management.' },
              { step: 'STEP 04', title: 'Master Digital Tools', desc: 'Learn Canva, CapCut, Google Workspace, Hostinger, and AI tools.' },
              { step: 'STEP 05', title: 'Build Your Portfolio', desc: 'Create sample case studies, mock client templates, and portfolio PDFs.' },
              { step: 'STEP 06', title: 'Package Service Offers', desc: 'Define hourly rates ($15-$60/hr) and monthly recurring retainers.' },
              { step: 'STEP 07', title: 'Find Potential Clients', desc: 'Prospect on Upwork, LinkedIn, direct outreach, and VA communities.' },
              { step: 'STEP 08', title: 'Write Winning Proposals', desc: 'Draft custom pitch letters that address the client&apos;s exact pain points.' },
              { step: 'STEP 09', title: 'Client Onboarding', desc: 'Set up clear contracts, communication protocols, and task tracking.' },
              { step: 'STEP 10', title: 'Build Client Retention', desc: 'Deliver work ahead of deadlines to build long-term recurring clients.' },
              { step: 'STEP 11', title: 'Explore Affiliate Income', desc: 'Learn how affiliate links work as an additional online income stream.' },
              { step: 'STEP 12', title: 'Recommend Tools Responsibly', desc: 'Create useful resource pages and recommend tools you actually trust.' },
              { step: 'STEP 13', title: 'Continuous Growth', desc: 'Keep learning, updating your skills, and adapting to industry trends.' },
            ].map((st, idx) => (
              <div key={idx} className="p-3.5 bg-black/90 border border-gray-800 rounded-xl space-y-1 hover:border-cyan-400 transition-all">
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 font-mono font-bold text-[10px] rounded">
                  {st.step}
                </span>
                <h4 className="font-extrabold text-white font-rajdhani text-xs pt-1">{st.title}</h4>
                <p className="text-[11px] text-gray-400 leading-tight">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </HUDPanel>

      {/* ========================================================================= */}
      {/* 📚 SECTION 3: CMS-MANAGED EDUCATIONAL ARTICLES & TUTORIALS */}
      {/* ========================================================================= */}
      <HUDPanel title="📚 FEATURED VA, FREELANCE &amp; DIGITAL SKILLS TUTORIALS">
        <div className="p-5 space-y-5">
          
          {/* CATEGORY FILTER TABS */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
            {['ALL', 'VA FUNDAMENTALS', 'ADMIN SKILLS', 'FREELANCING', 'AFFILIATE MARKETING'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all text-[11px] ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/30 text-cyan-300 border-cyan-400 shadow-md'
                    : 'bg-gray-900/80 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* CMS TUTORIAL CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            {filteredCmsItems.map((item) => (
              <div
                key={item.id}
                className="bg-black/90 border border-gray-800 hover:border-cyan-400 rounded-xl p-4 flex flex-col justify-between space-y-4 transition-all shadow-lg group"
              >
                <div className="space-y-3">
                  {item.mainImage && (
                    <div className="relative h-36 rounded-lg overflow-hidden border border-gray-800">
                      <img src={item.mainImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-black/80 backdrop-blur text-cyan-300 font-mono text-[10px] font-bold border border-cyan-400/40 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-white text-sm font-rajdhani group-hover:text-cyan-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-3">
                      {item.summary || item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-lime-400 font-bold">EDUCATIONAL GUIDE</span>
                  <button
                    onClick={() => setSelectedArticle(item)}
                    className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/50 text-cyan-300 rounded-lg text-[11px] font-bold font-mono transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>READ TUTORIAL</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </HUDPanel>

      {/* ========================================================================= */}
      {/* 🔄 SECTION 4: CONTINUOUS LEARNING CONCEPT */}
      {/* ========================================================================= */}
      <HUDPanel title="🔄 CONTINUOUS LEARNING &amp; EXPANDING RESOURCES">
        <div className="p-5 space-y-4">
          <div className="p-4 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-400/40 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left font-sans">
              <span className="text-xs font-mono font-bold text-lime-400 uppercase tracking-widest block">
                "KEEP LEARNING. KEEP IMPROVING. KEEP BUILDING."
              </span>
              <h3 className="text-lg md:text-xl font-black font-orbitron text-white">
                NEW TUTORIALS &amp; RESOURCES ADDED REGULARLY
              </h3>
              <p className="text-xs text-gray-300 max-w-xl">
                We continuously update this platform with new articles, software guides, client management tools, and digital skill tutorials managed dynamically through our CMS.
              </p>
            </div>

            <a
              href="#/affiliate-guide"
              className="px-6 py-3.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-emerald-300 text-black font-black font-orbitron text-xs uppercase rounded-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2 shadow-lg"
            >
              <span>EXPLORE ALL GUIDES &rarr;</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </HUDPanel>

      {/* ARTICLE READER MODAL */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* MAIN TWO-COLUMN SECTION FOR PACKAGES & REVIEWS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">

          {/* CORE VIRTUAL ASSISTANT PACKAGES */}
          <HUDPanel title="🛠️ CORE VIRTUAL ASSISTANT PACKAGES">
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {[
                  { title: 'Executive Virtual Assistance', desc: 'Calendar management, inbox triage, CRM entry.', price: '$1,500 / mo' },
                  { title: 'Full-Stack Web Development', desc: 'React, TypeScript, Next.js web applications.', price: '$2,500 / project' },
                  { title: 'Mobile App Development', desc: 'Android & iOS apps published on Play Store.', price: '$799 / app' },
                  { title: 'Graphic Design & Branding', desc: 'Social media assets, logos, and UI mockups.', price: '$250 / pack' },
                ].map((svc, idx) => (
                  <div key={idx} className="bg-black/90 border border-gray-800 p-3.5 rounded-xl space-y-1.5 hover:border-[var(--primary-cyan)] transition-all">
                    <h4 className="text-xs font-bold text-white font-rajdhani uppercase">{svc.title}</h4>
                    <p className="text-[11px] text-gray-400 font-sans leading-tight">{svc.desc}</p>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-lime-400 font-bold text-xs">{svc.price}</span>
                      <button onClick={() => handleConsult(svc.title)} className="text-cyan-400 text-[10px] font-bold hover:underline">
                        BOOK &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

          {/* MINIMAL VERIFIED REVIEWS */}
          <HUDPanel title="VERIFIED CLIENT &amp; VA REVIEWS">
            <div className="p-4 sm:p-5 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Verified client &amp; VA case study reviews.
                </p>
                <button
                  onClick={() => setDisplayTestimonials([...TESTIMONIALS_DATA].sort(() => Math.random() - 0.5))}
                  className="px-3.5 py-1.5 bg-[var(--primary-cyan)]/20 hover:bg-[var(--primary-cyan)]/40 border border-[var(--primary-cyan)]/40 text-[var(--primary-cyan)] rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>SHUFFLE REVIEWS</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-sans text-xs">
                {displayTestimonials.slice(0, 5).map((t) => (
                  <div key={t.id} className="bg-black/90 border border-gray-800 p-3 rounded-xl space-y-2 hover:border-[var(--primary-cyan)] transition-all">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-lime-400">
                        <div className="flex items-center space-x-0.5">
                          {[...Array(t.rating)].map((_, rIdx) => (
                            <Star key={rIdx} className="w-3 h-3 fill-lime-400 text-lime-400" />
                          ))}
                        </div>
                        <span className="text-[9px] text-lime-400 font-mono font-bold">VERIFIED</span>
                      </div>
                      <p className="text-gray-200 italic leading-relaxed text-[11px] line-clamp-3">
                        "{t.text}"
                      </p>
                    </div>
                    <div className="pt-2 border-t border-gray-800/80 mt-1 flex items-center justify-between">
                      <div>
                        <h5 className="font-extrabold text-white text-xs font-rajdhani uppercase leading-none">{t.name}</h5>
                        <p className="text-[9px] text-[var(--primary-cyan)] font-mono font-bold pt-0.5">{t.country}</p>
                      </div>
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-mono text-[9px] font-bold">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

        </div>

        {/* DEDICATED RIGHT COLUMN DIVISION SECTION PANELS */}
        <aside className="lg:col-span-1 border-t lg:border-t-0 lg:border-l-2 border-yellow-400/40 lg:pl-6 space-y-8 sticky top-20 self-start">
          <AtomeCardPanel />
          <DynamicAdsSidebar />
        </aside>

      </div>

    </div>
  );
};
export default HomePage;
