import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle2, AlertTriangle, Zap, Flame, HelpCircle, ExternalLink, ArrowRight, ShieldCheck, Star, Layers, Sparkles, TrendingUp, ChevronDown, ChevronUp, Check } from 'lucide-react';
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
      details: "Focuses on high-converting landing page structure: Hero headline, social proof logos, service packages, client testimonials, and a embedded lead capture form pointing to your custom Hostinger email inbox."
    },
    {
      id: 7,
      title: "How to Build a Simple Affiliate Review Site That Earns While You Sleep",
      angle: "Hostinger WordPress Hosting as the starting point",
      format: "Beginner affiliate tutorial",
      details: "Covers niche keyword research, writing authentic tool comparisons, embedding Impact.com tracking links, disclosing affiliate disclosures compliant with FTC guidelines, and using Hostinger's fast servers to achieve 90+ PageSpeed scores."
    },
    {
      id: 8,
      title: "How to Set Up Google Analytics + Hostinger for Your First Website",
      angle: "DNS + plugin setup, performance monitoring basics",
      format: "Technical tutorial",
      details: "Explains creating a Google Analytics 4 property, pasting the GA4 tag into Hostinger hPanel header scripts or using Site Kit for WordPress, verifying DNS records, and setting up goal conversions for contact form submissions."
    },
    {
      id: 9,
      title: "How to Launch a Side Hustle Online Store for Under $50",
      angle: "Hostinger Website Builder (Business tier) built-in store",
      format: "Budget-focused walkthrough",
      details: "Walks through Hostinger Business tier's built-in e-commerce builder. Add digital templates, ebooks, or physical products, connect Stripe / PayPal payment gateways, and configure automated invoice emails without paying 3% transaction fees."
    },
    {
      id: 10,
      title: "How to Use n8n on Hostinger VPS to Automate Your Freelance Admin",
      angle: "Hostinger VPS + n8n one-click install, automation workflows",
      format: "Intermediate tutorial",
      details: "Guides tech-savvy VAs through selecting a Hostinger KVM VPS with pre-installed n8n workflow automation engine. Connect webhooks between Google Sheets, Gmail, Slack, and Stripe for 100% self-hosted automated business administration."
    }
  ];

  const problemSolutions = [
    {
      id: 1,
      title: "1. 'My Client's Website Keeps Going Down - What's Wrong and How Do I Fix It?'",
      problem: "Unreliable shared hosting killing client relationships and destroying hard-earned trust.",
      solution: "Explain the signs of bad hosting → introduce Hostinger Cloud Hosting with auto-scaling and 99.9% uptime guarantees.",
      cta: "Here's how I moved my client's site in an afternoon",
      link: HOSTINGER_LINK
    },
    {
      id: 2,
      title: "2. 'I Can't Afford $30/Month for Hosting as a New Freelancer'",
      problem: "Budget anxiety preventing new VAs and freelancers from launching their web presence.",
      solution: "Break down what you actually need to start (basic Web Hosting plan), what you don't, and the real transparent math.",
      cta: "Here's what I'd pick if I was starting from zero today (Hostinger Premium/Business)",
      link: HOSTINGER_LINK
    },
    {
      id: 3,
      title: "3. 'My Client Wants a Website - But I Have No Idea Where to Start'",
      problem: "VA/freelancer overwhelm when a paying client asks for web hosting and portal setup help.",
      solution: "Step-by-step decision tree: what type of site → what platform → what host → how to set it up effortlessly.",
      cta: "Hostinger as the go-to recommendation for 95% of client use cases",
      link: HOSTINGER_LINK
    },
    {
      id: 4,
      title: "4. 'I Set Up a WordPress Site and Now Nothing Works'",
      problem: "Plugin conflicts, failed updates, broken installs - the classic beginner nightmare.",
      solution: "Triage checklist, staging environment explanation, and one-click instant site restore.",
      cta: "Hostinger WordPress Hosting includes staging + auto-backups - show how to use them",
      link: HOSTINGER_LINK
    },
    {
      id: 5,
      title: "5. 'My Emails Are Going to Spam and Clients Think I'm Unprofessional'",
      problem: "Free email addresses (Gmail, Yahoo) or misconfigured domain DNS triggering spam filters.",
      solution: "Explain SPF/DKIM/DMARC in plain English, show how to set up proper custom business email.",
      cta: "Hostinger Business Email - pre-configured deliverability, set up in minutes",
      link: HOSTINGER_LINK
    }
  ];

  const viralTitles = [
    {
      title: "🎯 'I Built a Professional VA Portfolio Website for $2.99/Month - Here's Exactly How'",
      reason: "Specific dollar amount + specific audience + 'here's exactly how' promise = maximum curiosity + utility. Targets 'VA portfolio website' search intent directly."
    },
    {
      title: "😤 'Stop Using Free Hosting. Here's What It's Actually Costing Your Freelance Business'",
      reason: "Challenges a common behavior with a consequences angle. Appeals to people who've been burned by GitHub Pages limitations, Wix's branding, or slow free hosts losing them clients."
    },
    {
      title: "🤯 'The 5 Hosting Mistakes VAs Make That Drive Clients Away (And How to Fix Them)'",
      reason: "Listicle + fear of professional embarrassment + clear solution promise. High social share rate in VA Facebook groups, LinkedIn, and Pinterest."
    }
  ];

  const prePurchaseFaqs = [
    {
      q: "Is Hostinger actually reliable or is it just cheap?",
      a: "Hostinger runs on LiteSpeed servers with NVMe SSD storage and guarantees 99.9% uptime. It's not the absolute fastest host on the market - Kinsta or WP Engine edge it out at premium $30-$100/mo price points - but for the price bracket ($2-$3/mo), the performance is genuinely strong. Thousands of professional client sites run on it without issues."
    },
    {
      q: "What happens when my intro price ends?",
      a: "Hostinger's renewal rates are higher than the promotional price - this is true for every major web host. The Premium plan renews around $5-8/month rather than the $2-3 intro rate. It is still cheaper than most mid-tier competitors at full price. Lock in a longer term (2-4 years) upfront to extend the low rate."
    },
    {
      q: "Will I lose my site if I cancel?",
      a: "No - your files are yours. Before canceling, export your WordPress database and files (or use the Hostinger 1-click backup download). If you're on Website Builder, export what you can. Never assume any host holds your content - always maintain your own backups regardless of platform."
    },
    {
      q: "Can I host multiple client websites on one Hostinger plan?",
      a: "Yes. The Premium plan and above support multiple websites on one account. For managing client sites professionally with separate access and dashboards, Hostinger Pro (agency hosting) is designed exactly for this - it's worth the upgrade if you're managing more than 2-3 client sites."
    },
    {
      q: "Is Hostinger good for WordPress?",
      a: "Yes - their WordPress Hosting plan includes LiteSpeed Cache (significant speed boost), automatic updates, a staging environment, and a vulnerability scanner. It's a solid managed-adjacent experience without the managed hosting price tag."
    },
    {
      q: "What if something breaks and I need help?",
      a: "Hostinger offers 24/7 live chat support. Response times are generally fast (under 5 minutes in most cases). There's no phone support - if that's a dealbreaker for you or a client, note it upfront. The knowledge base is extensive and covers most common issues with step-by-step guides."
    },
    {
      q: "Is Hostinger safe for a client's business website?",
      a: "For most small business sites: yes. It includes free SSL, DDoS protection, and automatic backups on higher plans. For high-traffic e-commerce or regulated industries (healthcare, finance), you'd want to evaluate Cloud or VPS plans with dedicated resources - or discuss a premium managed host."
    }
  ];

  const priorityOrder = [
    { p: "Priority 1", title: "VA Portfolio Tutorial", reason: "Core audience, highest search intent match" },
    { p: "Priority 2", title: "Professional Email Setup Guide", reason: "Quick win, high conversion, solves immediate pain" },
    { p: "Priority 3", title: "Hostinger vs. GitHub Pages", reason: "Audience-native, speaks directly to site visitors" },
    { p: "Priority 4", title: "'Stop Using Free Hosting' article", reason: "Viral potential, reshares in VA communities" },
    { p: "Priority 5", title: "Pre-Purchase FAQ page", reason: "Reduces bounce, increases conversion on all other pages" }
  ];

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-6 px-4 sm:px-6 lg:px-8 py-10 bg-slate-100 text-slate-900 font-sans min-h-screen relative z-20 border-t-4 border-indigo-600">
      <div className="max-w-7xl mx-auto">
        
        {/* LIGHT THEME HERO BANNER */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/90 border border-slate-300/80 p-6 md:p-10 mb-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-indigo-50 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-cyan-50 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs md:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Masterclass Blueprint & Career Accelerator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 font-orbitron">
            HOW TO BECOME A SUCCESSFUL <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">AFFILIATE MARKETER</span>
          </h1>

          <p className="text-slate-700 max-w-3xl mx-auto text-base md:text-lg leading-relaxed font-semibold">
            A practical, value-first roadmap for Virtual Assistants, Freelancers, and Digital Creators to build high-converting referral channels by solving real client problems.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm font-bold text-slate-800">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-300 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Value-First Strategy</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-300 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Tested & Verified Workflows</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-300 shadow-sm">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              <span>High Conversion Yields</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* MAIN LIGHT CONTENT AREA */}
          <div className="lg:col-span-3 space-y-10">

            {/* SECTION 1: 10 HOSTINGER TUTORIAL CONTENT IDEAS */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/90 border border-slate-300/80 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
                <BookOpen className="w-7 h-7 text-indigo-600 shrink-0" />
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 font-orbitron">
                    📚 10 Tutorial Content Ideas (Hostinger Naturally Introduced)
                  </h2>
                  <p className="text-slate-600 text-xs md:text-sm mt-1 font-medium">
                    Each tutorial solves a real problem. Hostinger enters naturally at the setup step - not as a sales pitch. Click any tutorial to reveal the full step-by-step breakdown:
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {hostingerTutorials.map((t) => (
                  <div key={t.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:border-indigo-300 transition-all">
                    <button
                      onClick={() => setExpandedTutorial(expandedTutorial === t.id ? null : t.id)}
                      className="w-full text-left p-4 flex items-center justify-between gap-3 bg-slate-50/70 hover:bg-indigo-50/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">{t.id}</span>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm md:text-base">{t.title}</h3>
                          <p className="text-xs text-slate-600 font-medium mt-0.5">{t.angle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-slate-200 text-slate-700 font-mono text-[11px] font-bold">{t.format}</span>
                        {expandedTutorial === t.id ? <ChevronUp className="w-4 h-4 text-indigo-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </button>

                    {expandedTutorial === t.id && (
                      <div className="p-4 border-t border-slate-200 bg-white text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                        <strong className="text-indigo-700 block mb-1 uppercase tracking-wider text-xs">Full Implementation Blueprint:</strong>
                        {t.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* STRATEGIC PLACEMENT TIP */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3 shadow-sm">
                <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase text-amber-900 tracking-wider">💡 Strategic Placement Tip</h4>
                  <p className="text-xs md:text-sm text-slate-800 mt-1 leading-relaxed font-medium">
                    Within each tutorial, introduce Hostinger at the <strong>"what do you need?"</strong> setup step - not in the intro. Let the tool earn its recommendation by solving the immediate problem!
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 2: 5 PROBLEM -> SOLUTION CONTENT IDEAS */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/90 border border-slate-300/80 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                <Flame className="w-7 h-7 text-rose-600 shrink-0" />
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 font-orbitron">
                    🔥 5 "Problem → Solution" Content Ideas
                  </h2>
                  <p className="text-slate-600 text-xs md:text-sm mt-1 font-medium">
                    These target readers at the exact moment of pain - right before they are ready to buy.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {problemSolutions.map((ps) => (
                  <div key={ps.id} className="p-5 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-indigo-400 transition-all shadow-sm">
                    <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 font-orbitron">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      {ps.title}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm mb-4">
                      <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200">
                        <span className="font-black text-rose-800 block mb-1 uppercase text-xs tracking-wider">Problem:</span>
                        <p className="text-slate-800 font-medium">{ps.problem}</p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <span className="font-black text-emerald-800 block mb-1 uppercase text-xs tracking-wider">Solution:</span>
                        <p className="text-slate-800 font-medium">{ps.solution}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
                      <span className="text-xs font-bold text-indigo-700 font-mono">CTA: {ps.cta}</span>
                      <a
                        href={ps.link}
                        target="_blank"
                        rel="noopener noreferrer"
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
