import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Award, Target, TrendingUp, Search, ChevronRight, CheckCircle2, ArrowRight, ExternalLink, HelpCircle, Layers, Cpu, Sparkles, Filter, Lock, DollarSign, Users, RefreshCw } from 'lucide-react';
import { ImpactAffiliateBanners } from '../components/ImpactAffiliateBanners';

export const AffiliateGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLevel, setActiveLevel] = useState<string>('all');

  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const MICROSOFT_LINK = "https://rewards.bing.com/welcome?rh=57A3288&ref=rafsrchae";
  const ATOME_LINK = "https://www.atome.ph/s/cbcqZc5Ak";

  const ACADEMY_LEVELS = [
    { id: 'all', label: 'All Academy Levels' },
    { id: 'level1', label: 'Level 1: Beginner Fundamentals' },
    { id: 'level2', label: 'Level 2: Getting Started' },
    { id: 'level3', label: 'Level 3: Traffic Generation' },
    { id: 'level4', label: 'Level 4: Conversion Optimization' },
    { id: 'level5', label: 'Level 5: Advanced Scaling' },
    { id: 'level6', label: 'Level 6: Ethics & Transparency' },
  ];

  const MODULES = [
    {
      level: 'level1',
      number: '01',
      title: 'Affiliate Marketing Fundamentals',
      subtitle: 'Understand core concepts, links, attribution, and revenue models',
      difficulty: 'Beginner',
      topics: [
        { name: 'What is Affiliate Marketing?', desc: 'A performance-based marketing model where creators earn a commission by recommending products or services from trusted merchants.' },
        { name: 'How Affiliate Links Work', desc: 'Unique tracking URLs embedded with affiliate IDs or cookies to credit referrals accurately.' },
        { name: 'Cookies & Attribution', desc: 'Understanding cookie duration (e.g. 30-day cookie window) and first-click vs last-click attribution.' },
        { name: 'Commission Models', desc: 'Pay-Per-Sale (PPS), Pay-Per-Click (PPC), Pay-Per-Lead (PPL), and recurring SaaS subscriptions.' },
        { name: 'Common Beginner Myths', desc: 'Debunking "get-rich-quick" claims. Success requires consistent audience trust and quality content.' }
      ]
    },
    {
      level: 'level2',
      number: '02',
      title: 'Starting Your Affiliate Journey',
      subtitle: 'Niche selection, target audience, and program evaluation',
      difficulty: 'Beginner',
      topics: [
        { name: 'Choosing Your Niche', desc: 'Identify high-demand, passionate niches balancing search volume, competition, and monetization.' },
        { name: 'Audience Persona Mapping', desc: 'Understand audience pain points, buying intent, and exact software or tool solutions.' },
        { name: 'Evaluating Affiliate Networks', desc: 'Compare platforms like Impact, ShareASale, CJ Affiliate, Amazon Associates, and Lemon Squeezy.' },
        { name: 'Program Terms & Compliance', desc: 'Checking payout thresholds, forbidden PPC brand bidding terms, and geographic restrictions.' }
      ]
    },
    {
      level: 'level3',
      number: '03',
      title: 'Building Your Platform',
      subtitle: 'Websites, blogs, YouTube, newsletters, and comparison hubs',
      difficulty: 'Getting Started',
      topics: [
        { name: 'High-Performance Web Hosting', desc: 'Setting up fast, secure website infrastructure with trusted providers like Hostinger.' },
        { name: 'Product Comparison Architecture', desc: 'Structuring side-by-side tool comparison tables with transparent feature breakdowns.' },
        { name: 'YouTube & Video Reviews', desc: 'Creating screen recordings, walk-through tutorials, and link placements in descriptions.' },
        { name: 'Email Newsletters & Funnels', desc: 'Building long-term subscriber relationships through educational lead magnets.' }
      ]
    },
    {
      level: 'level4',
      number: '04',
      title: 'Content Marketing & SEO',
      subtitle: 'Keyword intent, on-page optimization, and helpful reviews',
      difficulty: 'Traffic & SEO',
      topics: [
        { name: 'Search Intent Mastery', desc: 'Targeting commercial intent queries ("Best web hosting for developers", "Hostinger review").' },
        { name: 'On-Page Content Optimization', desc: 'Clean headers (H2/H3), readable summaries, callout boxes, and fast page speeds.' },
        { name: 'Writing Honest Reviews', desc: 'Highlighting both pros and real limitations to establish long-term reader credibility.' },
        { name: 'Evergreen Content Hubs', desc: 'Creating foundational tutorials that generate recurring organic search traffic for years.' }
      ]
    },
    {
      level: 'level5',
      number: '05',
      title: 'Conversion Rate & Analytics',
      subtitle: 'CTR, EPC, bounce rates, and UTM tracking',
      difficulty: 'Advanced',
      topics: [
        { name: 'Click-Through Rate (CTR) Optimization', desc: 'Placing clear, non-pushy action buttons where readers naturally make buying decisions.' },
        { name: 'Earnings Per Click (EPC)', desc: 'Calculating EPC = (Total Commission Earned / Total Clicks) to measure offer efficiency.' },
        { name: 'Campaign & UTM Tracking', desc: 'Using UTM parameters (utm_source, utm_medium, utm_campaign) to attribute traffic sources.' },
        { name: 'Ethical A/B Testing', desc: 'Testing button positioning and header copy without deceptive dark patterns.' }
      ]
    },
    {
      level: 'level6',
      number: '06',
      title: 'Ethics, Compliance & Trust',
      subtitle: 'FTC disclosures, privacy, and respecting network policies',
      difficulty: 'Ethics & Trust',
      topics: [
        { name: 'FTC & Legal Affiliate Disclosures', desc: 'Prominently stating that links may generate a commission at zero extra cost to the visitor.' },
        { name: 'Avoiding Deceptive Claims', desc: 'Never promising unreal income guarantees or using fake scarcity/countdown timers.' },
        { name: 'Privacy-First Analytics', desc: 'Respecting user privacy without intrusive tracking or unauthorized personal data collection.' },
        { name: 'Long-Term Brand Trust', desc: 'Prioritizing audience value over short-term affiliate payouts.' }
      ]
    }
  ];

  const filteredModules = MODULES.filter(mod => {
    const matchesLevel = activeLevel === 'all' || mod.level === activeLevel;
    const matchesSearch = searchTerm === '' || 
      mod.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      mod.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.topics.some(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-10 font-mono pb-12">
      
      {/* ACADEMY HERO BANNER */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-cyan-950/80 border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BookOpen className="w-64 h-64 text-cyan-400" />
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/40 rounded-full text-xs text-cyan-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHITE HAT DEV ACADEMY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-rajdhani text-white uppercase tracking-wider leading-tight">
            AFFILIATE MARKETING <span className="text-cyan-400">LEARNING HUB</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
            A comprehensive, step-by-step masterclass covering affiliate marketing fundamentals, traffic strategy, SEO, conversion rate optimization, and ethical recommendations.
          </p>

          {/* FTC DISCLOSURE BADGE */}
          <div className="bg-gray-950/80 border border-yellow-500/40 p-3.5 rounded-2xl text-xs text-yellow-300/90 font-sans flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
            <span>
              <strong>Transparent Affiliate Disclosure:</strong> Some software or hosting links on White Hat Dev are affiliate links. If you purchase through them, we may earn a small commission at no additional cost to you. We only recommend software we trust.
            </span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="bg-gray-900/80 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* SEARCH INPUT */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search academy topics (e.g. SEO, EPC, Hostinger)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* LEVEL TABS */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {ACADEMY_LEVELS.map(lvl => (
              <button
                key={lvl.id}
                onClick={() => setActiveLevel(lvl.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeLevel === lvl.id
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-gray-950 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RECOMMENDED AFFILIATE PARTNERS HUB */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-rajdhani text-white uppercase tracking-wider flex items-center space-x-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>CURATED RECOMMENDED SOFTWARE & INFRASTRUCTURE</span>
          </h2>
        </div>

        <ImpactAffiliateBanners />
      </div>

      {/* ACADEMY MODULES GRID */}
      <div className="space-y-6">
        {filteredModules.map((mod) => (
          <div
            key={mod.number}
            className="bg-gradient-to-b from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/60 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-black text-lg">
                  {mod.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-rajdhani text-white uppercase tracking-wide">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans">{mod.subtitle}</p>
                </div>
              </div>

              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-bold uppercase tracking-wider self-start sm:self-auto">
                {mod.difficulty}
              </span>
            </div>

            {/* TOPICS BREAKDOWN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mod.topics.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-gray-950/60 border border-gray-800/80 rounded-xl p-4 space-y-1.5 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-center space-x-2 text-cyan-300 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{t.name}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed pl-5">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS BANNER */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="text-xl font-bold font-rajdhani text-white uppercase">
            READY TO LAUNCH YOUR AFFILIATE SITE?
          </h4>
          <p className="text-xs text-gray-300 font-sans max-w-xl">
            Get high-speed cloud hosting backed by 99.9% uptime, free SSL, and instant setup via Hostinger.
          </p>
        </div>

        <a
          href={HOSTINGER_LINK}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold text-xs font-rajdhani uppercase rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center space-x-2 shrink-0"
        >
          <span>CLAIM HOSTINGER DISCOUNT</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
};

export default AffiliateGuide;
