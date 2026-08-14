import React, { useState } from 'react';
import { Terminal, Sparkles, Rocket, CheckCircle2, ArrowRight, Shield, Globe, Award, HelpCircle, ExternalLink, RefreshCw, ShoppingBag, Video, BookOpen, MessageSquare, DollarSign, Layers, AlertTriangle, Zap, Flame, Star, Check } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { DynamicAffiliateAd } from '../components/DynamicAffiliateAd';
import { ALL_AFFILIATE_ADS } from '../data/affiliateAdsData';

export const AffiliateGuide: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";

  const hostingerTutorials = [
    {
      id: 1,
      title: "How to Build a VA Portfolio Website in a Weekend (No Code Required)",
      angle: "Website Builder walkthrough, drag-and-drop + business email setup",
      format: "Step-by-step with screenshots"
    },
    {
      id: 2,
      title: "How to Set Up a Professional Business Email as a Freelancer",
      angle: "Hostinger Business Email - why you@yourdomain.com beats Gmail for client trust",
      format: "Tutorial + comparison"
    },
    {
      id: 3,
      title: "How to Deploy Your First WordPress Blog in Under 30 Minutes",
      angle: "WordPress Hosting + 1-click install walkthrough",
      format: "Beginner tutorial"
    },
    {
      id: 4,
      title: "How to Host a Client's Website Without Using Your Own Hostinger Account",
      angle: "Hostinger Pro (agency) - sub-accounts, client management",
      format: "Tutorial for VA/freelancers"
    },
    {
      id: 5,
      title: "How to Move a Client's WordPress Site to a New Host (Without Downtime)",
      angle: "Hostinger's free migration + DNS changeover guide",
      format: "Migration walkthrough"
    },
    {
      id: 6,
      title: "How to Set Up a Landing Page for Your Freelance Services",
      angle: "Website Builder → published landing page with contact form",
      format: "Step-by-step"
    },
    {
      id: 7,
      title: "How to Build a Simple Affiliate Review Site That Earns While You Sleep",
      angle: "Hostinger WordPress Hosting as the starting point",
      format: "Beginner affiliate tutorial"
    },
    {
      id: 8,
      title: "How to Set Up Google Analytics + Hostinger for Your First Website",
      angle: "DNS + plugin setup, performance monitoring basics",
      format: "Technical tutorial"
    },
    {
      id: 9,
      title: "How to Launch a Side Hustle Online Store for Under $50",
      angle: "Hostinger Website Builder (Business tier) built-in store",
      format: "Budget-focused walkthrough"
    },
    {
      id: 10,
      title: "How to Use n8n on Hostinger VPS to Automate Your Freelance Admin",
      angle: "Hostinger VPS + n8n one-click install, automation workflows",
      format: "Intermediate tutorial"
    }
  ];

  const problemSolutions = [
    {
      id: 1,
      title: "1. 'My Client's Website Keeps Going Down - What's Wrong and How Do I Fix It?'",
      problem: "Unreliable shared hosting killing client relationships and destroying trust.",
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HEADER SECTION */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-cyan)]/10 border border-[var(--primary-cyan)]/30 text-[var(--primary-cyan)] mb-4">
          <Award className="w-5 h-5" />
          <span className="text-xs md:text-sm font-bold tracking-wider uppercase">Official Masterclass Blueprint</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white font-orbitron tracking-wide mb-4">
          HOW TO BECOME A SUCCESSFUL <span className="cyber-text-gradient">AFFILIATE MARKETER</span>
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
          Learn how Virtual Assistants, Freelancers, and Digital Creators build high-converting referral channels by solving real problems first.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-3 space-y-12">

          {/* SECTION 1: 10 HOSTINGER TUTORIAL CONTENT IDEAS */}
          <HUDPanel title="📚 10 TUTORIAL CONTENT IDEAS (HOSTINGER NATURALLY INTRODUCED)">
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Each tutorial solves a real problem. Hostinger enters naturally at the practical setup step - not as the punchline of a sales pitch.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm text-gray-200 border border-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-900/80 text-[var(--primary-cyan)] font-orbitron uppercase border-b border-gray-800">
                  <tr>
                    <th className="p-3 w-12 text-center">#</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Hostinger Angle</th>
                    <th className="p-3 w-48">Best Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 bg-gray-950/40">
                  {hostingerTutorials.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-900/50 transition-colors">
                      <td className="p-3 text-center font-mono font-bold text-[var(--primary-lime)]">{t.id}</td>
                      <td className="p-3 font-semibold text-white">{t.title}</td>
                      <td className="p-3 text-gray-300">{t.angle}</td>
                      <td className="p-3 text-gray-400 font-mono text-xs">{t.format}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PLACEMENT TIP BOX */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/30 flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider">💡 Strategic Placement Tip</h4>
                <p className="text-xs md:text-sm text-gray-300 mt-1">
                  Within each tutorial, introduce Hostinger at the <strong>"what do you need?"</strong> setup step - not in the intro. Let the tool earn its recommendation by solving the immediate need!
                </p>
              </div>
            </div>
          </HUDPanel>

          {/* SECTION 2: 5 PROBLEM -> SOLUTION CONTENT IDEAS */}
          <HUDPanel title="🔥 5 PROBLEM → SOLUTION CONTENT IDEAS">
            <p className="text-gray-300 text-sm mb-6">
              These target readers at the exact moment of pain - right before they are ready to purchase.
            </p>

            <div className="space-y-6">
              {problemSolutions.map((ps) => (
                <div key={ps.id} className="p-5 rounded-xl bg-gray-900/60 border border-gray-800/80 hover:border-[var(--primary-cyan)]/40 transition-all">
                  <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-orbitron">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    {ps.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm mb-4">
                    <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30">
                      <span className="font-bold text-rose-400 block mb-1 uppercase tracking-wider">Problem:</span>
                      <p className="text-gray-300">{ps.problem}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                      <span className="font-bold text-emerald-400 block mb-1 uppercase tracking-wider">Solution:</span>
                      <p className="text-gray-300">{ps.solution}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-800/60">
                    <span className="text-xs text-[var(--primary-lime)] font-mono">CTA: {ps.cta}</span>
                    <a
                      href={ps.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[var(--primary-cyan)] hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                    >
                      <span>RECOMMEND HOSTINGER</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </HUDPanel>

          {/* SECTION 3: 3 VIRAL STYLE CONTENT TITLES */}
          <HUDPanel title="💥 3 HIGH-INTEREST, VIRAL-STYLE CONTENT TITLES">
            <p className="text-gray-300 text-sm mb-6">
              Designed for high shareability and strong click-through rate in VA communities, Facebook groups, and LinkedIn.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {viralTitles.map((vt, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border border-purple-500/30 hover:border-purple-400 transition-all">
                  <h3 className="text-base font-bold text-white mb-2 font-orbitron">{vt.title}</h3>
                  <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-900/40 text-xs md:text-sm text-gray-300">
                    <strong className="text-purple-400 uppercase tracking-wider mr-2">Why it works:</strong>
                    {vt.reason}
                  </div>
                </div>
              ))}
            </div>
          </HUDPanel>

          {/* SECTION 4: COMMON PRE-PURCHASE QUESTIONS & TRUST ANSWERS */}
          <HUDPanel title="❓ COMMON PRE-PURCHASE QUESTIONS - WITH TRUST-BUILDING ANSWERS">
            <p className="text-gray-300 text-sm mb-6">
              Use these as a dedicated FAQ section or embed them within relevant tutorials to handle objections before readers bounce.
            </p>

            <div className="space-y-4">
              {prePurchaseFaqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl bg-gray-900/50 border border-gray-800 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between text-sm md:text-base font-bold text-white hover:text-[var(--primary-cyan)] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[var(--primary-lime)] shrink-0" />
                      {faq.q}
                    </span>
                    <span className="text-xs font-mono text-gray-500">{activeFaq === idx ? '[-]' : '[+]'}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 pt-0 text-xs md:text-sm text-gray-300 border-t border-gray-800/60 leading-relaxed bg-gray-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </HUDPanel>

          {/* SECTION 5: CONTENT PRIORITY ORDER */}
          <HUDPanel title="🗓️ CONTENT PRIORITY ORDER (START HERE)">
            <p className="text-gray-300 text-sm mb-6">
              Follow this strategic rollout roadmap for maximum initial traction and fastest conversion wins.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-xs md:text-sm text-gray-200 border border-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-900/80 text-[var(--primary-lime)] font-orbitron uppercase border-b border-gray-800">
                  <tr>
                    <th className="p-3 w-28">Priority</th>
                    <th className="p-3">Content Piece</th>
                    <th className="p-3">Why First</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 bg-gray-950/40">
                  {priorityOrder.map((po, idx) => (
                    <tr key={idx} className="hover:bg-gray-900/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-[var(--primary-cyan)]">{po.p}</td>
                      <td className="p-3 font-semibold text-white">{po.title}</td>
                      <td className="p-3 text-gray-300">{po.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* THROUGH-LINE CONCLUSION */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent border border-emerald-500/40">
              <h4 className="text-xs md:text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                The Core Strategic Through-Line
              </h4>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                Every single piece of content helps the reader solve something real. Hostinger earns its placement because it genuinely fits what this audience needs - not because it is the product being pushed. That is what makes affiliate content people actually trust and buy through!
              </p>
            </div>
          </HUDPanel>

        </div>

        {/* RIGHT SIDEBAR PROMO COLUMN */}
        <div className="lg:col-span-1">
          <DynamicAdsSidebar />
        </div>
      </div>
    </div>
  );
};
