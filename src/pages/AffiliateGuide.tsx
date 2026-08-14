import React, { useState } from 'react';
import { Terminal, Sparkles, Rocket, CheckCircle2, ArrowRight, Shield, Globe, Award, HelpCircle, ExternalLink, RefreshCw, ShoppingBag, Youtube, Linkedin, BookOpen, MessageSquare, DollarSign, Layers } from 'lucide-react';
import { HUDPanel } from '../components/HUDPanel';
import { DynamicAdsSidebar } from '../components/DynamicAdsSidebar';
import { DynamicAffiliateAd } from '../components/DynamicAffiliateAd';
import { ALL_AFFILIATE_ADS } from '../data/affiliateAdsData';

export const AffiliateGuide: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const IMPACT_SIGNUP_URL = "https://utt.impactcdn.com/P-A5024116-1495-4f8e-88fd-54d8d32a55be1.js";
  const HOSTINGER_LINK = "https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM";

  const tutorials = [
    {
      title: "1. How VAs Can Add 'Website Setup' to Services (And Earn 2x More)",
      goal: "Teach Virtual Assistants how to offer basic website creation to clients using easy drag-and-drop builders or WordPress.",
      solution: "Show them how to manage client hosting setups and use Impact.com to manage affiliate partnerships for the software tools recommended to clients.",
      ctaText: "GET HOSTINGER VA HOSTING (75% OFF)",
      ctaUrl: HOSTINGER_LINK
    },
    {
      title: "2. How to Deploy a High-Speed Web App / Portfolio for Under $3/Month",
      goal: "Guide developers and tech freelancers through setting up low-cost, high-performance hosting.",
      solution: "Walk through budget hosting services (Hostinger, Namecheap, Vercel/Render integrations) obtainable via Impact.com affiliate partnerships.",
      ctaText: "BUILD ON HOSTINGER CLOUD",
      ctaUrl: HOSTINGER_LINK
    },
    {
      title: "3. The Freelancer's Guide to Building an Affiliate Resource Hub in 2 Hours",
      goal: "Teach freelancers how to build a recommendation page ('My Recommended Tech Stack') to earn passive income.",
      solution: "Demonstrate signing up for Impact.com to search for brands they already use and grab clean affiliate tracking links.",
      ctaText: "JOIN IMPACT.COM PARTNER NETWORK",
      ctaUrl: "https://nordvpn.sjv.io/c/5024116/976014/7452"
    },
    {
      title: "4. How to Build an E-Commerce Website for a Local Small Business (Step-by-Step)",
      goal: "Show small business owners or freelancers how to take a physical shop online affordably.",
      solution: "Compare budget hosting & domain options, showing how to select reliable hosting and launch WooCommerce or store templates via ThemeForest.",
      ctaText: "EXPLORE THEMEFOREST TEMPLATES",
      ctaUrl: "https://1.envato.market/c/5024116/805521/4415?subId2=sidebar&subId1=jp_themeforest"
    },
    {
      title: "5. How VAs Can Earn Recurring Passive Income from Client Web Maintenance",
      goal: "Educate Virtual Assistants on charging monthly retainers for website domain renewals, hosting checks, and maintenance.",
      solution: "Teach them to register as partners on Impact.com so every client tool signup generates ongoing affiliate payouts.",
      ctaText: "START RECURRING VA INCOME",
      ctaUrl: HOSTINGER_LINK
    },
    {
      title: "6. Migrating a Slow Client Site to Fast, Budget-Friendly Cloud Hosting",
      goal: "Step-by-step guide for developers/freelancers fixing slow website load speeds.",
      solution: "Benchmarking hosting providers, recommending optimized hosting plans signed up via affiliate links.",
      ctaText: "MIGRATE TO FAST CLOUD HOSTING",
      ctaUrl: HOSTINGER_LINK
    },
    {
      title: "7. Zero-Code Web Application Hosting: From Localhost to Live URL",
      goal: "Help non-technical freelancers and small business owners publish web apps, landing pages, or digital products.",
      solution: "Step-by-step walkthrough using reliable, beginner-friendly hosting providers.",
      ctaText: "LAUNCH LIVE WEBSITES NOW",
      ctaUrl: HOSTINGER_LINK
    },
    {
      title: "8. How to Build a High-Converting Client Intake Funnel on a Budget",
      goal: "Solve the client acquisition problem for freelancers and VAs by building a clean booking/intake website.",
      solution: "Show how to buy a domain, connect hosting, and integrate free/affordable tools linked via Impact.com.",
      ctaText: "BUILD CLIENT FUNNEL",
      ctaUrl: HOSTINGER_LINK
    },
    {
      title: "9. How to Track and Organize Your Affiliate Links Like a Pro Marketer",
      goal: "Teach beginner affiliate marketers how to avoid broken links, messy spreadsheets, and lost payouts.",
      solution: "Showcase Impact.com's dashboard, tracking tools, vanity links, and payout reporting as the central hub.",
      ctaText: "ACCESS IMPACT.COM DASHBOARD",
      ctaUrl: "https://imp.i384100.net/c/5024116/3801376/14726"
    },
    {
      title: "10. Building a Tech Stack Portfolio for Developers: Host Projects Ultra-Low Cost",
      goal: "Help junior devs showcase live projects to prospective employers/clients without spending hundreds on hosting.",
      solution: "Guide them through reliable micro-hosting plans and domain registration tools.",
      ctaText: "HOST PROJECTS ON HOSTINGER",
      ctaUrl: HOSTINGER_LINK
    }
  ];

  const problemSolutions = [
    {
      problem: "VAs & Freelancers trade time for money and cap their hourly income.",
      solution: "Teach them to build recurring passive revenue by recommending hosting and business software to clients.",
      product: "Introduce Impact.com as the main platform to manage and track software/hosting affiliate deals."
    },
    {
      problem: "Small businesses overpay $100+/mo for slow, bloated agency web hosting.",
      solution: "Show them how to set up high-speed, budget hosting for $2-$5/mo with 1-click installer tools.",
      product: "Recommend reliable budget web hosts (e.g., Hostinger, Namecheap, Bluehost)."
    },
    {
      problem: "Beginner affiliate marketers get rejected by traditional ad networks or deal with delayed payouts.",
      solution: "Explain how to get approved on enterprise affiliate networks with transparent reporting and direct bank deposits.",
      product: "Position Impact.com as the most reliable, partner-friendly platform with fast payouts."
    },
    {
      problem: "Developers struggle to showcase live client sites on a centralized dashboard.",
      solution: "Provide a workflow for managing multiple client domains, cPanels, and hosting tiers efficiently.",
      product: "Show how to earn host-partner rewards while organizing client hosting."
    },
    {
      problem: "Freelancers spend days coding simple client sites when clients just need a fast, working MVP.",
      solution: "Teach rapid deployment using pre-built templates, lightweight CMSs, and instant hosting setups.",
      product: "Feature budget hosting & domain registrars naturally during site setup."
    }
  ];

  const comparisons = [
    {
      title: "Impact.com vs. Amazon Associates / ShareASale / CJ Affiliate",
      angle: "Why Modern Content Creators Are Switching to Impact.com for Higher Commissions and Better Tracking.",
      focus: "Instant brand approvals, clean UI, higher cookie durations, and direct payouts vs. Amazon's low commission rates."
    },
    {
      title: "Self-Hosted WordPress ($3/mo) vs. Wix / Squarespace ($16+/mo)",
      angle: "Stop Overpaying: How Small Businesses Can Save $150+/Year on Website Costs.",
      focus: "Full ownership, scalability, lower monthly bills vs. closed ecosystem lock-ins."
    },
    {
      title: "Shared Hosting vs. Cloud Hosting vs. Managed WordPress (For Freelancers)",
      angle: "Which Hosting Should You Recommend to Your Clients? (Cost, Speed & Security Breakdown).",
      focus: "Helping freelancers pick the right hosting tier for different client budgets without over-specifying."
    },
    {
      title: "Building Websites for Clients vs. Managing Client Web Tech (Hourly vs. Retainer & Affiliate Income)",
      angle: "One-Off Projects vs. Monthly Recurring Income: How VAs Can Build Financial Stability.",
      focus: "Shifting from active work to recurring affiliate payouts and tech retainer fees."
    },
    {
      title: "Impact.com Direct Brand Deals vs. Traditional AdSense Ads",
      angle: "Why Display Ads Are Dying and How Partnership Marketing Can 10x Your Website Revenue.",
      focus: "Revenue per 1,000 visitors (RPM) comparisons showing why affiliate partnerships far outperform banner ads."
    }
  ];

  const faqs = [
    {
      q: "Do I need coding skills to build websites or start affiliate marketing?",
      a: "No! Modern web hosting comes with 1-click WordPress installers and no-code visual builders. Impact.com provides copy-and-paste links and tracking tools, so you can start recommending tools even if you are a complete beginner."
    },
    {
      q: "Is Impact.com free to join, and how do I get paid?",
      a: "Impact.com is 100% free for publishers/affiliates. You get direct payouts via local bank transfer, PayPal, or wire transfer once you hit the low minimum payout threshold."
    },
    {
      q: "Is cheap hosting reliable for business clients or real projects?",
      a: "Cheap doesn't mean bad—it means optimized for initial scale. Modern budget hosts like Hostinger offer 99.9% uptime, free SSL certificates, automated backups, and global CDNs that handle thousands of visitors easily."
    },
    {
      q: "Why should I use Impact.com instead of signing up for individual affiliate programs?",
      a: "Instead of logging into 20 different websites to check your earnings, Impact.com consolidates top brands (hosting, software, e-commerce) into one dashboard with unified payouts and tax reporting."
    },
    {
      q: "How long does it take to start making money with affiliate marketing?",
      a: "It depends on how quickly you help people solve real problems. If you help 5 business clients set up hosting this week, you can see affiliate payouts within your first 30-60 days."
    }
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 py-6 font-mono">
      
      {/* HERO SECTION */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 via-lime-500/20 to-purple-500/20 border border-cyan-500/40 px-4 py-1.5 rounded-full text-cyan-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-lime-400 animate-pulse" />
          <span>VALUE-FIRST AFFILIATE GROWTH MASTERCLASS</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-rajdhani text-white uppercase tracking-wider">
          HOW TO BECOME A SUCCESSFUL AFFILIATE MARKETER
        </h1>
        <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed">
          Master the "Help First, Monetize Second" framework tailored for Virtual Assistants, Freelancers, Developers, and Digital Creators to build $1,000+/mo in recurring passive revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* MAIN CONTENT COLUMN (3 COLS) */}
        <div className="lg:col-span-3 space-y-10">

          {/* CORE PHILOSOPHY */}
          <HUDPanel title="🎯 CORE PHILOSOPHY: 'HELP FIRST, MONETIZE SECOND'">
            <div className="p-6 space-y-4 font-sans text-xs text-gray-300 leading-relaxed">
              <div className="bg-gradient-to-r from-lime-950/60 via-black to-cyan-950/60 border border-lime-400/40 p-4 rounded-2xl space-y-2">
                <h3 className="text-sm font-black font-rajdhani text-white uppercase flex items-center space-x-2">
                  <Award className="w-5 h-5 text-lime-400" />
                  <span>THE TRUST-BUILDING REVENUE ENGINE</span>
                </h3>
                <p className="text-gray-200">
                  Instead of pitching affiliate links directly, teach your audience actionable skills (building websites, managing client tech, launching web apps, or creating passive income streams). Naturally introduce <strong className="text-lime-300">Impact.com</strong> as the marketplace where they access top brand affiliate programs (like Hostinger, Lenovo, CapCut, Coursera, NordVPN), and affordable hosting providers as the infrastructure for their projects.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs text-center pt-2">
                <div className="bg-black/90 border border-cyan-500/30 p-3 rounded-xl space-y-1">
                  <span className="text-lime-400 font-bold text-base block">1. EDUCATE</span>
                  <span className="text-[11px] text-gray-400 block font-sans">Solve real technical problems with step-by-step guides.</span>
                </div>
                <div className="bg-black/90 border border-purple-500/30 p-3 rounded-xl space-y-1">
                  <span className="text-purple-300 font-bold text-base block">2. RECOMMEND</span>
                  <span className="text-[11px] text-gray-400 block font-sans">Introduce verified partner tools via Impact.com tracking links.</span>
                </div>
                <div className="bg-black/90 border border-lime-500/30 p-3 rounded-xl space-y-1">
                  <span className="text-cyan-300 font-bold text-base block">3. MONETIZE</span>
                  <span className="text-[11px] text-gray-400 block font-sans">Earn recurring affiliate commissions without selling hard.</span>
                </div>
              </div>
            </div>
          </HUDPanel>

          {/* 10 VALUE-FIRST TUTORIAL IDEAS */}
          <HUDPanel title="📚 10 VALUE-FIRST TUTORIAL BLUEPRINTS FOR VAs & FREELANCERS">
            <div className="p-6 space-y-4 font-mono text-xs">
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Use these 10 actionable tutorial concepts to create blog posts, YouTube videos, or client guides that naturally drive high-converting affiliate referrals:
              </p>

              <div className="space-y-4">
                {tutorials.map((tut, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-gray-900 via-black to-cyan-950/40 border border-gray-800 p-4 rounded-2xl space-y-2 hover:border-cyan-400 transition-all">
                    <h4 className="text-xs font-black text-white font-rajdhani uppercase text-cyan-300">
                      {tut.title}
                    </h4>
                    <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                      <strong className="text-white font-mono">Goal:</strong> {tut.goal}
                    </p>
                    <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                      <strong className="text-lime-300 font-mono">Natural Solution:</strong> {tut.solution}
                    </p>
                    <div className="pt-2">
                      <a
                        href={tut.ctaUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-extrabold text-[10px] uppercase rounded-lg hover:opacity-95 transition-all shadow"
                      >
                        <span>{tut.ctaText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

          {/* 5 PROBLEM -> SOLUTION IDEAS */}
          <HUDPanel title="⚡ 5 'PROBLEM → SOLUTION' HIGH-CONVERTING CONTENT IDEAS">
            <div className="p-6 space-y-4 font-mono text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans text-xs">
                  <thead>
                    <tr className="bg-black border-b border-cyan-500/40 text-cyan-300 font-mono text-[10px] uppercase">
                      <th className="p-3">#</th>
                      <th className="p-3">REAL PAIN POINT (PROBLEM)</th>
                      <th className="p-3">EDUCATIONAL SOLUTION</th>
                      <th className="p-3">PRODUCT INTEGRATION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-[11px]">
                    {problemSolutions.map((item, idx) => (
                      <tr key={idx} className="hover:bg-cyan-950/20 transition-colors">
                        <td className="p-3 font-mono text-lime-400 font-bold">{idx + 1}</td>
                        <td className="p-3 text-gray-200">{item.problem}</td>
                        <td className="p-3 text-gray-300">{item.solution}</td>
                        <td className="p-3 text-cyan-300 font-mono font-bold">{item.product}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </HUDPanel>

          {/* 5 HIGH-CONVERTING COMPARISON IDEAS */}
          <HUDPanel title="⚖️ 5 HIGH-CONVERTING COMPARISON BLUEPRINTS">
            <div className="p-6 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 gap-4">
                {comparisons.map((comp, idx) => (
                  <div key={idx} className="bg-black/90 border border-gray-800 p-4 rounded-2xl space-y-2 hover:border-purple-400 transition-all">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">
                      COMPARISON #{idx + 1}
                    </span>
                    <h4 className="text-xs font-black text-white font-rajdhani uppercase">
                      {comp.title}
                    </h4>
                    <p className="text-[11px] text-cyan-300 font-mono">
                      <strong>Angle:</strong> "{comp.angle}"
                    </p>
                    <p className="text-[11px] text-gray-300 font-sans">
                      <strong>Focus:</strong> {comp.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </HUDPanel>

          {/* PROMOTION CHANNELS MATRIX */}
          <HUDPanel title="📢 BEST PROMOTION CHANNELS & FORMATS">
            <div className="p-6 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-black/90 border border-red-500/40 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-red-400">
                    <Youtube className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase font-rajdhani text-white">YOUTUBE & SHORTS</span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                    Highest conversion rate! 10-15 min step-by-step tutorials with affiliate tracking links in description and pinned comment.
                  </p>
                </div>

                <div className="bg-black/90 border border-blue-500/40 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Linkedin className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase font-rajdhani text-white">LINKEDIN B2B</span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                    PDF Carousels ("5 Tech Services Every VA Should Offer in 2026") and text case studies targeting business owners & VAs.
                  </p>
                </div>

                <div className="bg-black/90 border border-lime-500/40 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-lime-400">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase font-rajdhani text-white">BLOG / SEO / MEDIUM</span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                    In-depth comparison articles targeting search intent like "best budget hosting for developers" or "how to join Impact.com".
                  </p>
                </div>

                <div className="bg-black/90 border border-purple-500/40 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-purple-400">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase font-rajdhani text-white">FB GROUPS & DISCORD</span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                    Answer community questions with helpful advice first, then share free tutorial guides containing partner referral links.
                  </p>
                </div>

              </div>
            </div>
          </HUDPanel>

          {/* 3 VIRAL CONTENT TITLES */}
          <HUDPanel title="🚀 3 VIRAL CONTENT TITLES THAT DRIVE TRAFFIC">
            <div className="p-6 space-y-3 font-mono text-xs">
              {[
                { title: '"I Built a Client Website for $3 and Sold It for $500 (Full Process Uncut)"', why: 'High curiosity, clear monetary value, appeals to freelancers & VAs wanting to make money.' },
                { title: '"Stop Using Wix! How Small Businesses Are Saving $200/Year With This Simple Tech Swap"', why: 'Strong pattern interrupt, challenges popular beliefs, offers clear cost savings.' },
                { title: '"How Virtual Assistants Are Making $1,000/Mo in Passive Income (Without Extra Hours)"', why: "Directly targets your audience's desire to break free from hourly billing through smart affiliate partnerships." }
              ].map((v, idx) => (
                <div key={idx} className="bg-gradient-to-r from-cyan-950/40 via-black to-lime-950/40 border border-lime-400/40 p-4 rounded-2xl space-y-1">
                  <h4 className="text-xs font-black text-lime-300 uppercase font-mono">{v.title}</h4>
                  <p className="text-[11px] text-gray-300 font-sans"><strong>Why it works:</strong> {v.why}</p>
                </div>
              ))}
            </div>
          </HUDPanel>

          {/* FREQUENTLY ASKED QUESTIONS */}
          <HUDPanel title="❓ FREQUENTLY ASKED QUESTIONS & CONVERSION ANSWERS">
            <div className="p-6 space-y-3 font-mono text-xs">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-black/90 border border-gray-800 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-white uppercase flex justify-between items-center hover:bg-gray-900 transition-colors"
                  >
                    <span>Q{idx + 1}: {faq.q}</span>
                    <span className="text-cyan-400">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 bg-gray-900/60 border-t border-gray-800 text-gray-300 font-sans text-xs leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </HUDPanel>

        </div>

        {/* DEDICATED PROMO ADS SIDEBAR COLUMN */}
        <aside className="lg:col-span-1 border-t lg:border-t-0 lg:border-l-2 border-cyan-500/40 lg:pl-6 space-y-6 sticky top-24">
          <DynamicAdsSidebar />
        </aside>

      </div>

    </div>
  );
};
export default AffiliateGuide;
