import { useApp } from '../context/AppContext';
import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle2, AlertTriangle, Zap, Flame, HelpCircle, ExternalLink, ArrowRight, ShieldCheck, Star, Layers, Sparkles, TrendingUp, ChevronDown, ChevronUp, Check, Info, Calendar, User, Lock, Video, Film, Play, Scissors, Sparkle } from 'lucide-react';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';

export const AffiliateGuide: React.FC = () => {
  const { getPublicPageCMSItems } = useApp();
  const cmsAffiliateItems = getPublicPageCMSItems('affiliate-guide');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [expandedTutorial, setExpandedTutorial] = useState<number | null>(null);

  // COLLAPSIBLE PANEL DIVISIONS STATE
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({
    hostinger: true,
    capcut: true,
    wondershare: true
  });

  const togglePanel = (key: string) => {
    setOpenPanels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";
  const CAPCUT_REFERRAL_LINK = "https://capcutaffiliateprogram.pxf.io/WqmL1e";

  // WONDERSHARE OFFICIAL REFERRAL LINKS & TRACKING CODES
  const WONDERSHARE_VIRBO_LINK = "https://wondersharesoftware.pxf.io/c/5024116/2882021/15586";
  const WONDERSHARE_FILMORA_LINK = "https://wondersharesoftware.pxf.io/c/5024116/1485636/15586";
  const WONDERSHARE_STORE_LINK = "https://wondersharesoftware.pxf.io/c/5024116/1266881/15586";
  const WONDERSHARE_PDFELEMENT_LINK = "https://wondersharesoftware.pxf.io/c/5024116/3801344/15586";
  const MEDIAIO_PHOTO_LINK = "https://wondersharesoftware.pxf.io/c/5024116/2135551/15586";


  const hostingerTutorials = [
    {
      id: 1,
      title: "How to Build a VA Portfolio Website in a Weekend (No Code Required)",
      angle: "Website Builder walkthrough, drag-and-drop + business email setup",
      format: "Step-by-step with screenshots",
      details: "Step 1: Pick a domain name reflecting your VA niche. Step 2: Select Hostinger Premium Web Hosting ($2.99/mo) with free domain & custom email. Step 3: Choose a drag-and-drop template. Step 4: Add your bio, services, portfolio case studies, and Calendly booking link. Step 5: Publish with free 1-click SSL."
    },
    {
      id: 2,
      title: "How to Set Up a Professional Business Email as a Freelancer",
      angle: "Hostinger Business Email - why you@yourdomain.com beats Gmail for client trust",
      format: "Tutorial + comparison",
      details: "Clients view @gmail.com or @yahoo.com addresses as amateurish. Hostinger Business Email gives you unlimited custom email aliases (e.g. hello@yourdomain.com). Walkthrough includes setting up SPF, DKIM, and DMARC DNS records so your pitches never land in spam folders."
    },
    {
      id: 3,
      title: "How to Deploy Your First WordPress Blog in Under 30 Minutes",
      angle: "WordPress Hosting + 1-click install walkthrough",
      format: "Beginner tutorial",
      details: "Hostinger offers a 1-click auto-installer for WordPress with pre-configured LiteSpeed Cache. This tutorial guides beginners through choosing a theme, installing essential plugins (Yoast SEO, Elementor, Wordfence), and writing their first SEO-optimized tutorial post."
    },
    {
      id: 4,
      title: "How to Host a Client's Website Without Using Your Own Hostinger Account",
      angle: "Hostinger Pro (agency) - sub-accounts, client management",
      format: "Tutorial for VA/freelancers",
      details: "Learn how to use Hostinger Pro agency dashboard to create separate client sub-accounts. VAs can manage client hosting, billing, and DNS access without ever exposing master account credentials or mixing client hosting budgets."
    },
    {
      id: 5,
      title: "How to Move a Client's WordPress Site to a New Host (Without Downtime)",
      angle: "Hostinger's free migration + DNS changeover guide",
      format: "Migration walkthrough",
      details: "Step-by-step guide on using Hostinger's free automated migration tool. Enter the client's current WordPress admin credentials, and Hostinger transfers all files and databases in the background. Update DNS A-records at domain registrar after verification."
    },
    {
      id: 6,
      title: "How to Set Up a Landing Page for Your Freelance Services",
      angle: "Website Builder → published landing page with contact form",
      format: "Step-by-step",
      details: "Focuses on high-converting landing page structure: Hero headline, social proof logos, service packages, client testimonials, and an embedded lead capture form pointing to your custom Hostinger email inbox."
    },
    {
      id: 7,
      title: "How to Build a Simple Affiliate Review Site That Earns While You Sleep",
      angle: "Hostinger WordPress Hosting as the starting point",
      format: "Beginner affiliate tutorial",
      details: "Covers niche keyword research, writing authentic tool comparisons, embedding Impact.com tracking links, disclosing affiliate disclosures compliant with FTC guidelines, and using Hostinger LiteSpeed NVMe storage for fast mobile performance."
    },
    {
      id: 8,
      title: "How to Add an Online Shop to a Client's Existing Site (WooCommerce)",
      angle: "Hostinger WooCommerce Hosting + 1-click shop setup",
      format: "E-commerce tutorial",
      details: "Walks through deploying WooCommerce on Hostinger, configuring payment gateways (Stripe & PayPal), adding digital downloadable products, and setting up automated receipt emails."
    },
    {
      id: 9,
      title: "How to Use Hostinger Staging Environments to Test Website Changes Safely",
      angle: "Hostinger WordPress Staging - 1-click clone & test",
      format: "Technical walkthrough",
      details: "Shows VAs how to create a 1-click staging copy of a live website, safely update themes and plugins, test new layout designs, and push changes to live production without risking downtime."
    },
    {
      id: 10,
      title: "How to Run Automated Drip Campaigns Using Hostinger & Open Source Tools",
      angle: "Hostinger VPS / Cloud Hosting for email & workflow automation",
      format: "Advanced VA tutorial",
      details: "Demonstrates deploying open-source automation tools (like n8n or Mautic) on Hostinger VPS hosting. Automate abandoned cart reminders, client drip campaigns, and weekly newsletters on 24/7 autopilot."
    }
  ];

  const problemSolutions = [
    {
      problem: "Clients do not trust freelancers using generic @gmail.com or @yahoo.com email addresses.",
      solution: "Hostinger includes free custom business email (you@yourdomain.com) with every web hosting plan.",
      cta: "Hostinger Business Email Setup",
      link: HOSTINGER_LINK
    },
    {
      problem: "Beginner VAs lack a professional portfolio website to show potential clients.",
      solution: "Hostinger Website Builder offers 100+ drag-and-drop templates requiring zero coding skills.",
      cta: "Hostinger Website Builder ($2.99/mo)",
      link: HOSTINGER_LINK
    },
    {
      problem: "Slow client websites cause visitors to bounce before filling out contact forms.",
      solution: "Hostinger LiteSpeed Web Servers & NVMe SSD storage deliver sub-second 400ms page load speeds.",
      cta: "Hostinger NVMe LiteSpeed Cloud",
      link: HOSTINGER_LINK
    },
    {
      problem: "Migrating a client website to new hosting risks expensive downtime & lost data.",
      solution: "Hostinger provides 100% free automated WordPress site migration handled by experts.",
      cta: "Hostinger 100% Free Migration",
      link: HOSTINGER_LINK
    },
    {
      problem: "Managing multiple client hosting logins creates security risks and password chaos.",
      solution: "Hostinger Pro agency dashboard allows delegating sub-account access safely with 1-click.",
      cta: "Hostinger Agency Pro Sub-Accounts",
      link: HOSTINGER_LINK
    }
  ];

  const viralTitles = [
    {
      title: '1. "Why I Stopped Giving Clients My Gmail Address (And What I Use Instead)"',
      reason: 'Relatable problem + curiosity gap. Introduces Hostinger Business Email naturally.'
    },
    {
      title: '2. "How I Built My Entire VA Portfolio Website for $2.99/month (No Code Needed)"',
      reason: 'Low barrier to entry + actionable outcome. Positions Hostinger as the perfect budget solution.'
    },
    {
      title: "3. \"The 5-Step Checklist to Migrate a Client's Site Without Getting Fired\"",
      reason: "High stakes + practical utility. Features Hostinger's free migration tool as the hero."
    }
  ];

  const prePurchaseFaqs = [
    {
      q: "Is Hostinger suitable for beginners with zero coding experience?",
      a: "Yes! Hostinger's custom hPanel dashboard and AI drag-and-drop Website Builder are designed specifically for beginners. You can launch a fully functional site without writing a single line of code."
    },
    {
      q: "Does Hostinger include a free domain name and custom business email?",
      a: "Yes, all Premium and Business hosting plans include a FREE domain name (.com, .net, etc.) for the first year, plus custom business email accounts (you@yourdomain.com)."
    },
    {
      q: "What is Hostinger's money-back guarantee policy?",
      a: "Hostinger offers a 100% risk-free 30-day money-back guarantee. If you are not completely satisfied within 30 days, you can request a full refund with no questions asked."
    },
    {
      q: "Can I upgrade my hosting plan as my client business grows?",
      a: "Absolutely. You can scale from single shared hosting to Cloud Startup or VPS hosting with one click inside your hPanel dashboard, with zero downtime."
    },
    {
      q: "How fast is Hostinger compared to traditional shared hosting?",
      a: "Hostinger utilizes LiteSpeed Web Servers, NVMe SSD storage drives, and built-in object caching, delivering global page load speeds under 500ms."
    },
    {
      q: "Does Hostinger offer free website migration from my current host?",
      a: "Yes! Hostinger offers 100% free automated WordPress migration. Simply provide your site details, and Hostinger's migration team handles the transfer seamlessly."
    },
    {
      q: "How do I apply the Hostinger promo discount code?",
      a: "Click any Hostinger referral link on this page and enter coupon code DPDCABINCEHM at checkout to unlock up to 75% OFF plus your free domain."
    }
  ];

  const priorityOrder = [
    { p: '1st', title: 'Tutorial #1: VA Portfolio Website in a Weekend', reason: 'High intent, solves an immediate urgent need for new freelancers.' },
    { p: '2nd', title: 'Problem-Solution #1: Stop Using @gmail.com for Clients', reason: 'Fastest trust builder, low cost, easy decision.' },
    { p: '3rd', title: 'Tutorial #3: 30-Minute WordPress Setup', reason: 'Broad appeal for beginners wanting to start blogging.' },
    { p: '4th', title: 'Problem-Solution #4: Zero-Downtime Migration Guide', reason: 'Attracts higher-earning VAs handling existing client sites.' },
    { p: '5th', title: 'Tutorial #4: Hostinger Pro Agency Management', reason: 'Appeals to established freelancers scaling their client base.' }
  ];

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-6 px-4 sm:px-6 lg:px-8 py-8 bg-slate-100 text-slate-900 font-sans min-h-screen relative z-20 border-t-4 border-indigo-600">
      <div className="max-w-7xl mx-auto space-y-10">

        {/*  REQUIRED FTC AFFILIATE TRANSPARENCY DISCLOSURE BANNER */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-200 border border-amber-400 flex items-center justify-center text-amber-800 shrink-0 font-bold">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
            <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
              <span> Affiliate Transparency Disclosure &amp; Reader Commitment</span>
            </h4>
            <p>
              <strong>Team WhiteHat Dev</strong> is an independent digital development &amp; virtual assistant resource portal. Pages on this website contain affiliate referral links (including Hostinger referral links with coupon code <code className="bg-amber-200/80 px-1.5 py-0.5 rounded font-mono font-bold text-amber-900">DPDCABINCEHM</code> and official CapCut creator links). If you click through and purchase web hosting or software subscriptions, we may receive a referral commission at <strong>zero extra cost to you</strong>. We only recommend hosting tools, video editors, and workflow templates that we actively use to build client websites and automated workflows. This affiliate revenue funds our free tutorials and open-source tools.
            </p>
          </div>
        </div>

        {/* EDITORIAL TRUST HEADER */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-300/80 p-6 md:p-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-800 font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                VERIFIED EDUCATIONAL RESOURCE &amp; COMPLIANCE GUIDE
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 font-orbitron tracking-tight leading-tight uppercase pt-2">
                HOW TO BECOME A SUCCESSFUL AFFILIATE MARKETER?
              </h1>
              <p className="text-slate-600 font-sans text-sm md:text-base font-medium max-w-3xl pt-1 leading-relaxed">
                A complete value-first masterclass organized into collapsible topic divisions. Learn how Virtual Assistants, freelancers, and digital creators master Web Hosting (Hostinger) and Video Editing (CapCut) to scale high-ticket client retainer services.
              </p>
            </div>

            {/* EDITORIAL METADATA CARD */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs font-mono shrink-0">
              <div className="flex items-center gap-2 text-slate-700">
                <User className="w-4 h-4 text-indigo-600" />
                <span><strong>Author:</strong> Team WhiteHat Dev Team</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span><strong>Updated:</strong> August 15, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span><strong>Status:</strong> FTC Compliant &amp; Verified</span>
              </div>
            </div>
          </div>
        </div>

        
            {/* 📝 DYNAMIC CMS MANAGED TOPIC DIVISION */}
            {cmsAffiliateItems.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-300 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-slate-900 via-emerald-950 to-indigo-950 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 font-bold">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                        DYNAMIC CMS BACKEND TOPIC DIVISION
                      </span>
                      <h2 className="text-lg sm:text-2xl font-black font-orbitron uppercase text-white">
                         CMS PUBLISHED GUIDES &amp; RECOMMENDATIONS
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6 bg-slate-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-sans">
                    {cmsAffiliateItems.map((item) => (
                      <div key={item.id} className="p-5 rounded-xl bg-white border border-slate-300 space-y-3 hover:border-emerald-500 transition-all shadow-sm">
                        <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px] uppercase">
                          {item.category || 'CMS GUIDE'}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm font-orbitron">{item.title}</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="sponsored noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white font-bold text-xs uppercase rounded-lg shadow hover:bg-emerald-700"
                          >
                            <span>EXPLORE THIS GUIDE &rarr;</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

        {/* MAIN TWO-COLUMN CONTAINER LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT 3-COLUMNS TOPIC PANELS */}
          <div className="lg:col-span-3 space-y-8">

            {/* ========================================================================= */}
            {/* 🌐 COLLAPSIBLE TOPIC 1: WEB HOSTING & DOMAIN INFRASTRUCTURE (HOSTINGER) */}
            {/* ========================================================================= */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-200 overflow-hidden">
              
              {/* TOPIC 1 HEADER CONTAINER ACCORDION */}
              <button
                onClick={() => togglePanel('hostinger')}
                className="w-full p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 text-white flex items-center justify-between text-left hover:opacity-95 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-lime-400 shrink-0 font-bold">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-lime-400 font-bold uppercase tracking-wider block">
                      TOPIC 1 DIVISION • WEB HOSTING &amp; DOMAIN INFRASTRUCTURE
                    </span>
                    <h2 className="text-lg sm:text-2xl font-black font-orbitron uppercase text-white">
                      🌐 HOW TO MAKE DOMAIN &amp; HOSTINGER WEB HOSTING WORKFLOWS?
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-indigo-200 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 shrink-0">
                  <span>{openPanels.hostinger ? 'COLLAPSE PANEL [-]' : 'EXPAND PANEL [+]'}</span>
                  {openPanels.hostinger ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* TOPIC 1 BODY DIVISION */}
              {openPanels.hostinger && (
                <div className="p-6 md:p-8 space-y-8 bg-slate-50/50">
                  
                  {/*  PRIMARY CTA BANNER FOR HOSTINGER */}
                  <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-indigo-400">
                    <div className="space-y-2 text-center md:text-left">
                      <span className="text-xs font-mono text-lime-400 font-bold uppercase tracking-widest block">
                         OFFICIAL HOSTINGER PARTNER OFFER
                      </span>
                      <h3 className="text-xl md:text-2xl font-black font-orbitron text-white">
                        GET UP TO 75% OFF HOSTINGER WEB HOSTING + FREE DOMAIN
                      </h3>
                      <p className="text-xs md:text-sm text-slate-300 max-w-2xl font-sans">
                        Includes free domain (.com), free custom business email, 1-click WordPress installer, LiteSpeed NVMe speed, and 24/7 Live Chat support. Use Code: <code className="bg-lime-400 text-black px-1.5 py-0.5 rounded font-mono font-bold">DPDCABINCEHM</code>
                      </p>
                    </div>

                    <a
                      href={HOSTINGER_LINK}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="px-6 py-4 bg-gradient-to-r from-lime-400 via-cyan-400 to-indigo-300 text-black font-black font-orbitron text-xs md:text-sm uppercase rounded-xl shadow-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2 border border-white/40"
                    >
                      <span>CHECK HOSTINGER PLANS (75% OFF)</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/*  WHO IS HOSTINGER BEST FOR? */}
                  <div className="bg-white rounded-xl shadow border border-slate-300 p-6 space-y-4">
                    <h3 className="text-lg font-black text-slate-900 font-orbitron border-b pb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-indigo-600" />
                      Who is Hostinger Best For?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm font-orbitron">1. Virtual Assistants</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">Launch a professional portfolio website in a weekend with custom business email (you@yourdomain.com) to win client trust.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm font-orbitron">2. Freelance Developers</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">Manage 5 to 100+ client websites using Hostinger Pro agency sub-account management without sharing master credentials.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm font-orbitron">3. E-commerce Starters</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">Deploy fast WooCommerce online stores with 1-click SSL certificates, auto-backups, and sub-second page rendering speeds.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm font-orbitron">4. Bloggers &amp; Creators</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">Get high-performance WordPress web hosting starting at $2.99/mo with 99.9% uptime and automatic daily backups.</p>
                      </div>
                    </div>
                  </div>

                  {/*  HONEST HOSTINGER COMPARISON MATRIX */}
                  <div className="bg-white rounded-xl shadow border border-slate-300 p-6 space-y-4">
                    <h3 className="text-lg font-black text-slate-900 font-orbitron border-b pb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      Hostinger Feature &amp; Pricing Comparison Matrix
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-slate-300">
                      <table className="w-full text-left text-xs md:text-sm text-slate-900">
                        <thead className="bg-slate-900 text-white font-orbitron uppercase text-xs">
                          <tr>
                            <th className="p-3.5">Feature</th>
                            <th className="p-3.5 bg-indigo-900 text-lime-300">Hostinger (Recommended)</th>
                            <th className="p-3.5">Bluehost</th>
                            <th className="p-3.5">GoDaddy</th>
                            <th className="p-3.5">SiteGround</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white font-medium">
                          <tr className="hover:bg-slate-50">
                            <td className="p-3.5 font-bold">Promo Price</td>
                            <td className="p-3.5 font-bold text-indigo-700 bg-indigo-50/50">$2.99 / mo</td>
                            <td className="p-3.5 text-slate-600">$2.95 / mo</td>
                            <td className="p-3.5 text-slate-600">$5.99 / mo</td>
                            <td className="p-3.5 text-slate-600">$2.99 / mo</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="p-3.5 font-bold">Free Domain (1st Yr)</td>
                            <td className="p-3.5 font-bold text-emerald-700 bg-indigo-50/50">✓ Included</td>
                            <td className="p-3.5 text-slate-600">✓ Included</td>
                            <td className="p-3.5 text-slate-600">✓ Included</td>
                            <td className="p-3.5 text-slate-600">✗ Paid Add-on</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="p-3.5 font-bold">Free Custom Email</td>
                            <td className="p-3.5 font-bold text-emerald-700 bg-indigo-50/50">✓ Unlimited Custom Accounts</td>
                            <td className="p-3.5 text-slate-600">✗ Limited (3 Months)</td>
                            <td className="p-3.5 text-slate-600">✗ Paid Add-on ($3/mo)</td>
                            <td className="p-3.5 text-slate-600">✓ Included</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 📚 10 EDUCATIONAL HOSTINGER TUTORIAL BLUEPRINTS */}
                  <div className="bg-white rounded-xl shadow border border-slate-300 p-6 space-y-6">
                    <h3 className="text-lg font-black text-slate-900 font-orbitron border-b pb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      10 Educational Hostinger Tutorial Blueprints
                    </h3>
                    <div className="space-y-4 font-sans">
                      {hostingerTutorials.map((tut) => (
                        <div key={tut.id} className="rounded-xl border border-slate-300 overflow-hidden bg-slate-50/50 hover:border-indigo-400 transition-all shadow-sm">
                          <div className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                  {tut.id}
                                </span>
                                <h4 className="text-sm md:text-base font-bold text-slate-900 font-orbitron leading-snug">
                                  {tut.title}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-600">Angle: {tut.angle}</p>
                            </div>

                            <button
                              onClick={() => setExpandedTutorial(expandedTutorial === tut.id ? null : tut.id)}
                              className="px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 shrink-0 border border-indigo-200"
                            >
                              <span>{expandedTutorial === tut.id ? 'CLOSE BLUEPRINT' : 'VIEW STEP-BY-STEP BLUEPRINT'}</span>
                              {expandedTutorial === tut.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>

                          {expandedTutorial === tut.id && (
                            <div className="p-4 bg-slate-100 border-t border-slate-200 text-xs md:text-sm text-slate-800 space-y-3 font-medium leading-relaxed">
                              <p>{tut.details}</p>
                              <a
                                href={HOSTINGER_LINK}
                                target="_blank"
                                rel="sponsored noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white font-bold text-xs uppercase rounded-lg shadow hover:bg-indigo-700"
                              >
                                <span>GET HOSTINGER FOR THIS TUTORIAL (75% OFF)</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>


            {/* ========================================================================= */}
            {/* 🎬 COLLAPSIBLE TOPIC 2: WHAT IS THE BEST VIDEO EDITING SOFTWARE? (CAPCUT) */}
            {/* ========================================================================= */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-300 overflow-hidden">
              
              {/* TOPIC 2 HEADER CONTAINER ACCORDION */}
              <button
                onClick={() => togglePanel('capcut')}
                className="w-full p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between text-left hover:opacity-95 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-300 shrink-0 font-bold">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-purple-300 font-bold uppercase tracking-wider block">
                      TOPIC 2 DIVISION • ESSENTIAL CREATIVE SOFTWARE &amp; VIDEO EDITING
                    </span>
                    <h2 className="text-lg sm:text-2xl font-black font-orbitron uppercase text-white">
                      🎬 WHAT IS THE BEST VIDEO EDITING SOFTWARE FOR VIRTUAL ASSISTANTS &amp; CREATORS? (CAPCUT)
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-purple-200 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 shrink-0">
                  <span>{openPanels.capcut ? 'COLLAPSE PANEL [-]' : 'EXPAND PANEL [+]'}</span>
                  {openPanels.capcut ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* TOPIC 2 BODY DIVISION */}
              {openPanels.capcut && (
                <div className="p-6 md:p-8 space-y-8 bg-slate-50/50">
                  
                  {/* WHY VIDEO EDITING IS ESSENTIAL FOR VAs */}
                  <div className="bg-white rounded-xl shadow border border-purple-200 p-6 space-y-4">
                    <h3 className="text-lg font-black text-slate-900 font-orbitron flex items-center gap-2 border-b pb-3 text-purple-900">
                      <Film className="w-5 h-5 text-purple-600" />
                      Why Every Virtual Assistant &amp; Content Creator Needs Video Editing Skills in 2026
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      Short-form video (TikToks, Instagram Reels, YouTube Shorts, Client VSLs, and promotional ad clips) is the <strong>#1 highest-demanded skill</strong> requested by clients hiring remote Virtual Assistants. VAs who offer video editing &amp; auto-captioning command <strong>$35 to $60/hour</strong> compared to basic administrative VAs.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans pt-2">
                      <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                        <div className="font-bold text-purple-950 font-orbitron text-sm">1. High Client Retainers</div>
                        <p className="text-slate-600 text-xs">Clients happily pay $1,500–$3,000/mo for a VA to edit 15–30 short-form video reels per month.</p>
                      </div>

                      <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                        <div className="font-bold text-purple-950 font-orbitron text-sm">2. AI-Powered Auto Speed</div>
                        <p className="text-slate-600 text-xs">CapCut's AI auto-captions generate perfect synchronized subtitles in 1-click, cutting editing time by 80%.</p>
                      </div>

                      <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                        <div className="font-bold text-purple-950 font-orbitron text-sm">3. Zero Learning Curve</div>
                        <p className="text-slate-600 text-xs">Unlike complex Adobe Premiere Pro setups, CapCut runs smoothly on Desktop, Web Browser, and Mobile devices.</p>
                      </div>
                    </div>
                  </div>

                  {/* 4 CAPCUT TUTORIAL GUIDES FOR VAs */}
                  <div className="bg-white rounded-xl shadow border border-purple-200 p-6 space-y-6">
                    <h3 className="text-lg font-black text-slate-900 font-orbitron border-b pb-3 flex items-center gap-2 text-purple-900">
                      <Scissors className="w-5 h-5 text-purple-600" />
                      4 Practical CapCut Video Editing Tutorials for Virtual Assistants
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-sans">
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-300 space-y-2 hover:border-purple-400 transition-all">
                        <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold text-[11px]">GUIDE 1</span>
                        <h4 className="font-bold text-slate-900 text-sm font-orbitron">Auto-Generate Captions &amp; Subtitles in 60 Seconds</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          Import client talking-head video &rarr; Click 'Text' &rarr; 'Auto Captions' &rarr; Select template. CapCut automatically transcribes speech with word-by-word animation effects.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-300 space-y-2 hover:border-purple-400 transition-all">
                        <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold text-[11px]">GUIDE 2</span>
                        <h4 className="font-bold text-slate-900 text-sm font-orbitron">Repurpose Long Zoom Podcasts into Viral Shorts</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          Trim 60-minute podcast recordings into 30-second key insights. Crop video frame to 9:16 vertical ratio and add animated hook titles.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-300 space-y-2 hover:border-purple-400 transition-all">
                        <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold text-[11px]">GUIDE 3</span>
                        <h4 className="font-bold text-slate-900 text-sm font-orbitron">Remove Backgrounds Without Green Screens</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          Use CapCut's AI Cutout feature to isolate speakers instantly. Place custom cyber background graphics or branded client overlays behind the subject.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-300 space-y-2 hover:border-purple-400 transition-all">
                        <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold text-[11px]">GUIDE 4</span>
                        <h4 className="font-bold text-slate-900 text-sm font-orbitron">Create Product Showcase Ads for E-commerce Clients</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          Combine B-roll video clips with royalty-free sound effects, smooth zoom transitions, and call-to-action text pop-ups for Shopify product ads.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/*  ONE ELEGANT PRIMARY CTA BUTTON FOR CAPCUT (NO BUTTON SPAMMING) */}
                  <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-purple-400">
                    <div className="space-y-2 text-center md:text-left">
                      <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-widest block">
                        🎬 RECOMMENDED CREATIVE SOFTWARE FOR VIRTUAL ASSISTANTS
                      </span>
                      <h3 className="text-xl md:text-2xl font-black font-orbitron text-white">
                        DOWNLOAD CAPCUT VIDEO EDITOR (FREE CREATOR VERSION)
                      </h3>
                      <p className="text-xs md:text-sm text-slate-300 max-w-2xl font-sans">
                        Start editing professional client Reels, TikToks, and YouTube Shorts today. Single official referral offer link below to keep the layout clean &amp; non-cluttered.
                      </p>
                    </div>

                    <a
                      href={CAPCUT_REFERRAL_LINK}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="px-6 py-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 text-black font-black font-orbitron text-xs md:text-sm uppercase rounded-xl shadow-xl hover:scale-105 transition-all shrink-0 flex items-center gap-2 border border-white/40"
                    >
                      <span>GET CAPCUT VIDEO EDITOR &rarr;</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* RIGHT SIDEBAR PROMO COLUMN */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-300">
              <DynamicAdsSidebar />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AffiliateGuide;
