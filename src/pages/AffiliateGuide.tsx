import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle2, AlertTriangle, Zap, Flame, HelpCircle, ExternalLink, ArrowRight, ShieldCheck, Star, Layers, Sparkles, TrendingUp, ChevronDown, ChevronUp, Check, Info, Calendar, User, FileText, Lock, MessageSquare } from 'lucide-react';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';

export const AffiliateGuide: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [expandedTutorial, setExpandedTutorial] = useState<number | null>(null);

  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";

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

        {/* 📢 REQUIRED FTC AFFILIATE TRANSPARENCY DISCLOSURE BANNER */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 md:p-6 shadow-md flex flex-col md:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-200 border border-amber-400 flex items-center justify-center text-amber-800 shrink-0 font-bold">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
            <h4 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
              <span>📢 Affiliate Transparency Disclosure & Reader Commitment</span>
            </h4>
            <p>
              <strong>Team WhiteHat Dev</strong> is an independent digital development &amp; virtual assistant resource portal. Pages on this website contain affiliate referral links (including Hostinger referral links with coupon code <code className="bg-amber-200/80 px-1.5 py-0.5 rounded font-mono font-bold text-amber-900">DPDCABINCEHM</code>). If you click through and purchase web hosting or software services, we may receive a referral commission at <strong>zero extra cost to you</strong>. We only recommend hosting tools, NVMe infrastructure, and workflow templates that we actively use to build client websites and automated workflows. This affiliate revenue funds our free tutorials and open-source tools.
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
                A complete value-first masterclass teaching Virtual Assistants, freelancers, and digital creators how to recommend Hostinger web hosting naturally through practical, problem-solving content.
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

          {/* ⚡ PRIMARY CTA BANNER */}
          <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 rounded-2xl p-6 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-indigo-400">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono text-lime-400 font-bold uppercase tracking-widest block">
                🔥 OFFICIAL HOSTINGER PARTNER OFFER
              </span>
              <h3 className="text-xl md:text-2xl font-black font-orbitron text-white">
                GET UP TO 75% OFF HOSTINGER WEB HOSTING + FREE DOMAIN
              </h3>
              <p className="text-xs md:text-sm text-slate-300 max-w-2xl font-sans">
                Includes free domain (.com), free custom business email, 1-click WordPress installer, LiteSpeed NVMe speed, and 24/7 Live Chat support.
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

        </div>

        {/* 🎯 WHO IS HOSTINGER BEST FOR? */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-300/80 p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <Award className="w-7 h-7 text-indigo-600 shrink-0" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 font-orbitron">
                🎯 Who is Hostinger Best For?
              </h2>
              <p className="text-slate-600 text-xs md:text-sm mt-1 font-medium">
                Hostinger solves specific technical challenges for freelancers, developers, and e-commerce founders.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs md:text-sm font-sans">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-indigo-400 transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">1</div>
              <h3 className="font-bold text-slate-900 text-sm font-orbitron">Virtual Assistants</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Launch a professional portfolio website in a weekend with custom business email (you@yourdomain.com) to win client trust.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-indigo-400 transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">2</div>
              <h3 className="font-bold text-slate-900 text-sm font-orbitron">Freelance Developers</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Manage 5 to 100+ client websites using Hostinger Pro agency sub-account management without sharing master credentials.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-indigo-400 transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">3</div>
              <h3 className="font-bold text-slate-900 text-sm font-orbitron">E-commerce Starters</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Deploy fast WooCommerce online stores with 1-click SSL certificates, auto-backups, and sub-second page rendering speeds.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-indigo-400 transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">4</div>
              <h3 className="font-bold text-slate-900 text-sm font-orbitron">Blogger & Creators</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Get high-performance WordPress web hosting starting at $2.99/mo with 99.9% uptime and automatic daily backups.
              </p>
            </div>
          </div>
        </div>

        {/* 📊 HONEST HOSTING COMPARISON MATRIX (HOSTINGER VS COMPETITORS) */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-300/80 p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <TrendingUp className="w-7 h-7 text-indigo-600 shrink-0" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 font-orbitron">
                📊 Honest Hostinger Comparison Matrix (Hostinger vs Competitors)
              </h2>
              <p className="text-slate-600 text-xs md:text-sm mt-1 font-medium">
                Comparing features, pricing, performance, and transparency against major web hosting providers.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-300 shadow-sm">
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
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold">Server Architecture</td>
                  <td className="p-3.5 font-bold text-indigo-700 bg-indigo-50/50">LiteSpeed + NVMe SSD</td>
                  <td className="p-3.5 text-slate-600">Standard Apache</td>
                  <td className="p-3.5 text-slate-600">Standard Apache</td>
                  <td className="p-3.5 text-slate-600">NGINX Custom</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold">Free Site Migration</td>
                  <td className="p-3.5 font-bold text-emerald-700 bg-indigo-50/50">✓ 100% Free Automated</td>
                  <td className="p-3.5 text-slate-600">✗ Paid Add-on ($149)</td>
                  <td className="p-3.5 text-slate-600">✗ Paid Add-on</td>
                  <td className="p-3.5 text-slate-600">✓ Plugin Automated</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold">Control Panel</td>
                  <td className="p-3.5 font-bold text-indigo-700 bg-indigo-50/50">Custom hPanel (Modern)</td>
                  <td className="p-3.5 text-slate-600">cPanel / Custom</td>
                  <td className="p-3.5 text-slate-600">cPanel</td>
                  <td className="p-3.5 text-slate-600">Site Tools</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold">Support Availability</td>
                  <td className="p-3.5 font-bold text-indigo-700 bg-indigo-50/50">24/7 Live Chat</td>
                  <td className="p-3.5 text-slate-600">Phone &amp; Chat</td>
                  <td className="p-3.5 text-slate-600">Phone &amp; Chat</td>
                  <td className="p-3.5 text-slate-600">24/7 Live Chat</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* HONEST PROS & LIMITATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-300 space-y-3">
              <h4 className="font-bold text-emerald-950 text-sm font-orbitron flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Key Advantages (Pros)
              </h4>
              <ul className="space-y-2 text-xs text-slate-800 leading-relaxed font-medium">
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Fast LiteSpeed web servers deliver sub-second page loads.</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Free domain name and custom business email included.</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> 30-day money-back guarantee with zero risk.</li>
                <li className="flex items-start gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> 100% free site migration handled by Hostinger specialists.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-amber-50 border border-amber-300 space-y-3">
              <h4 className="font-bold text-amber-950 text-sm font-orbitron flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Honest Limitations (Drawbacks)
              </h4>
              <ul className="space-y-2 text-xs text-slate-800 leading-relaxed font-medium">
                <li className="flex items-start gap-1.5"><AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> Promotional discount rates apply to initial terms (1-4 yrs); renewal rates are standard.</li>
                <li className="flex items-start gap-1.5"><AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> Phone support is not provided (customer support is 24/7 Live Chat).</li>
                <li className="flex items-start gap-1.5"><AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> Domain privacy protection is included on Premium/Business tiers.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT: TUTORIAL BLUEPRINTS + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT 3-COLUMNS CONTENT AREA */}
          <div className="lg:col-span-3 space-y-10">

            {/* SECTION 1: 10 TUTORIAL CONTENT IDEAS */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/90 border border-slate-300/80 p-6 md:p-8 space-y-6">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <BookOpen className="w-7 h-7 text-indigo-600 shrink-0" />
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 font-orbitron">
                    📚 10 Tutorial Content Ideas (Hostinger Naturally Introduced)
                  </h2>
                  <p className="text-slate-600 text-xs md:text-sm mt-1 font-medium">
                    Each tutorial solves a real problem. Hostinger enters as the practical tool - not the punchline of a sales pitch.
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-sans">
                {hostingerTutorials.map((tut) => (
                  <div key={tut.id} className="rounded-xl border border-slate-300 overflow-hidden bg-slate-50/50 hover:border-indigo-400 transition-all shadow-sm">
                    <div className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                            {tut.id}
                          </span>
                          <h3 className="text-sm md:text-base font-bold text-slate-900 font-orbitron leading-snug">
                            {tut.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-medium">
                            Angle: {tut.angle}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono font-medium">
                            Format: {tut.format}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedTutorial(expandedTutorial === tut.id ? null : tut.id)}
                        className="px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors border border-indigo-200"
                      >
                        <span>{expandedTutorial === tut.id ? 'CLOSE BLUEPRINT' : 'VIEW STEP-BY-STEP BLUEPRINT'}</span>
                        {expandedTutorial === tut.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {expandedTutorial === tut.id && (
                      <div className="p-4 md:p-5 bg-slate-100 border-t border-slate-200 text-xs md:text-sm text-slate-800 space-y-3 font-medium leading-relaxed">
                        <div className="p-3 bg-white rounded-lg border border-slate-300 font-mono text-xs text-indigo-900">
                          <strong>💡 Implementation Blueprint:</strong>
                        </div>
                        <p>{tut.details}</p>
                        <div className="pt-2 flex justify-end">
                          <a
                            href={HOSTINGER_LINK}
                            target="_blank"
                            rel="sponsored noopener noreferrer"
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase rounded-lg shadow flex items-center gap-1.5 transition-all"
                          >
                            <span>GET HOSTINGER FOR THIS TUTORIAL (75% OFF)</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: 5 PROBLEM -> SOLUTION BLUEPRINTS */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/90 border border-slate-300/80 p-6 md:p-8 space-y-6">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <Zap className="w-7 h-7 text-amber-500 shrink-0" />
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 font-orbitron">
                    💡 5 Problem &rarr; Solution Content Blueprints
                  </h2>
                  <p className="text-slate-600 text-xs md:text-sm mt-1 font-medium">
                    Bridge real-world freelancer pain points directly to Hostinger's high-converting feature set.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {problemSolutions.map((ps, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-slate-300 bg-slate-50 space-y-3 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                      <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
                        <span className="font-bold text-rose-700 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          The Pain Point / Problem:
                        </span>
                        <p className="font-medium">{ps.problem}</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                        <span className="font-bold text-emerald-700 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          The Hostinger Solution:
                        </span>
                        <p className="text-slate-800 font-medium">{ps.solution}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
                      <span className="text-xs font-bold text-indigo-700 font-mono">CTA: {ps.cta}</span>
                      <a
                        href={ps.link}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-indigo-200 transition-all"
                      >
                        <span>RECOMMEND HOSTINGER</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: 3 VIRAL STYLE CONTENT TITLES */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/90 border border-slate-300/80 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                <Sparkles className="w-7 h-7 text-purple-600 shrink-0" />
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 font-orbitron">
                    💥 3 High-Interest, Viral-Style Content Titles
                  </h2>
                  <p className="text-slate-600 text-xs md:text-sm mt-1 font-medium">
                    Designed for high shareability and strong click-through rate in VA communities and social channels.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {viralTitles.map((vt, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50 to-white border border-purple-200 shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-2 font-orbitron">{vt.title}</h3>
                    <div className="p-3.5 rounded-lg bg-white border border-purple-200 text-xs md:text-sm text-slate-800 font-medium">
                      <strong className="text-purple-800 uppercase tracking-wider mr-2 font-bold">Why it works:</strong>
                      {vt.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: COMMON PRE-PURCHASE QUESTIONS & TRUST ANSWERS */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/90 border border-slate-300/80 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                <HelpCircle className="w-7 h-7 text-blue-600 shrink-0" />
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 font-orbitron">
                    ❓ Common Pre-Purchase Questions - With Trust-Building Answers
                  </h2>
                  <p className="text-slate-600 text-xs md:text-sm mt-1 font-medium">
                    Use these as a dedicated FAQ section to handle objections before readers bounce.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {prePurchaseFaqs.map((faq, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-300 overflow-hidden bg-slate-50 shadow-sm">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full text-left p-4 flex items-center justify-between text-sm md:text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors bg-white"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                        {faq.q}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-600">{activeFaq === idx ? '[-]' : '[+]'}</span>
                    </button>
                    {activeFaq === idx && (
                      <div className="p-4 text-xs md:text-sm text-slate-800 border-t border-slate-200 bg-slate-50 leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: CONTENT PRIORITY ORDER */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/90 border border-slate-300/80 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                <Layers className="w-7 h-7 text-emerald-600 shrink-0" />
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 font-orbitron">
                    🗓️ Content Priority Order (Start Here)
                  </h2>
                  <p className="text-slate-600 text-xs md:text-sm mt-1 font-medium">
                    Follow this strategic rollout roadmap for maximum initial traction and fastest conversion wins.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-300 shadow-sm mb-6">
                <table className="w-full text-left text-xs md:text-sm text-slate-900">
                  <thead className="bg-slate-900 text-white font-orbitron uppercase text-xs">
                    <tr>
                      <th className="p-3.5 w-28">Priority</th>
                      <th className="p-3.5">Content Piece</th>
                      <th className="p-3.5">Why First</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {priorityOrder.map((po, idx) => (
                      <tr key={idx} className="hover:bg-emerald-50/50 transition-colors">
                        <td className="p-3.5 font-bold font-mono text-emerald-700 bg-slate-50">{po.p}</td>
                        <td className="p-3.5 font-bold text-slate-900">{po.title}</td>
                        <td className="p-3.5 text-slate-700 font-medium">{po.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* THROUGH-LINE CONCLUSION */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50 via-cyan-50 to-white border border-emerald-300 shadow-sm">
                <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  The Core Strategic Through-Line
                </h4>
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-medium">
                  Every single piece of content helps the reader solve something real. Hostinger earns its placement because it genuinely fits what this audience needs - not because it is the product being pushed. That is what makes affiliate content people actually trust and buy through!
                </p>
              </div>
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
