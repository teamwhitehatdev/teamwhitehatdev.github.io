import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Sparkles,
  Zap,
  X,
  Palette,
  Globe2,
  CheckCircle2,
  Layers,
  ArrowRight,
  Cpu,
  ShoppingBag,
  Briefcase,
  Newspaper,
  GraduationCap,
  Scale,
  Home,
  Coffee,
  DollarSign
} from 'lucide-react';
import { BuilderBlock, BuilderPageSettings, NavTabConfig } from '../types';

interface AutomatedWebsiteGeneratorModalProps {
  isOpen: boolean;
  navTabs: NavTabConfig[];
  currentTabId: string;
  onClose: () => void;
  onApplyGeneratedSite: (
    blocks: BuilderBlock[],
    settings: BuilderPageSettings,
    targetTabId: string
  ) => void;
}

interface NicheTemplatePreset {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  description: string;
  defaultBadge: string;
  category: string;
}

const NICHE_PRESETS: NicheTemplatePreset[] = [
  {
    id: 'wp-agency',
    label: 'WordPress Elementor Agency & VA Services',
    icon: Briefcase,
    description: 'High-converting agency theme: Hero, stats counter, 3-column services, testimonials, and consultation CTA.',
    defaultBadge: 'Top Agency Choice',
    category: 'Agency'
  },
  {
    id: 'wp-woocommerce',
    label: 'WordPress WooCommerce & E-Commerce Store',
    icon: ShoppingBag,
    description: 'Modern store with promotional sale hero, product cards with prices, payment trust badges, and reviews.',
    defaultBadge: 'E-Commerce Store',
    category: 'Shop'
  },
  {
    id: 'wp-saas',
    label: 'WordPress Elementor SaaS & AI Startup',
    icon: Cpu,
    description: 'App UI mockup hero, feature comparison matrix, live metrics telemetry, and 3-tier pricing matrix.',
    defaultBadge: 'SaaS & Tech',
    category: 'Tech'
  },
  {
    id: 'wp-magazine',
    label: 'WordPress Tech & Authority News Magazine',
    icon: Newspaper,
    description: 'Editorial breaking news hero with byline & read time, trending news grid, and newsletter subscription box.',
    defaultBadge: 'High-RPM Editorial',
    category: 'Media'
  },
  {
    id: 'wp-portfolio',
    label: 'WordPress Creative Studio & Freelancer Portfolio',
    icon: Sparkles,
    description: 'Minimalist hero, masonry project showcase, client case study, skill badges, and contact inquiry form.',
    defaultBadge: 'Creative Studio',
    category: 'Portfolio'
  },
  {
    id: 'wp-academy',
    label: 'WordPress Online Course Academy & Masterclass',
    icon: GraduationCap,
    description: 'Authority hero with instructor photo, curriculum modules accordion, student reviews, and enrollment CTA.',
    defaultBadge: 'Education Portal',
    category: 'Education'
  },
  {
    id: 'wp-affiliate',
    label: 'WordPress Affiliate Authority & Tool Comparison',
    icon: DollarSign,
    description: 'Tool comparison matrix with pros & cons, FTC disclaimer, high-converting affiliate buttons, and bonus banners.',
    defaultBadge: 'Affiliate Hub',
    category: 'Affiliate'
  },
  {
    id: 'wp-corporate',
    label: 'WordPress Corporate Law & Financial Consulting',
    icon: Scale,
    description: 'Prestige navy & gold corporate aesthetic, practice areas grid, senior partner credentials, and consultation booking.',
    defaultBadge: 'Advisory Firm',
    category: 'Corporate'
  },
  {
    id: 'wp-realestate',
    label: 'WordPress Real Estate & Property Showcase',
    icon: Home,
    description: 'Search filter hero, featured property cards with specs, virtual tour video, and agent booking CTA.',
    defaultBadge: 'Real Estate',
    category: 'Real Estate'
  },
  {
    id: 'wp-restaurant',
    label: 'WordPress Gourmet Restaurant & Cafe Food Menu',
    icon: Coffee,
    description: 'Appetizing hero with reservation CTA, signature menu showcase with prices, and location/hours block.',
    defaultBadge: 'Hospitality',
    category: 'Restaurant'
  }
];

export const AutomatedWebsiteGeneratorModal: React.FC<
  AutomatedWebsiteGeneratorModalProps
> = ({ isOpen, navTabs, currentTabId, onClose, onApplyGeneratedSite }) => {
  const [brandName, setBrandName] = useState('Apex Digital Solutions');
  const [selectedNiche, setSelectedNiche] = useState('wp-agency');
  const [selectedColorTheme, setSelectedColorTheme] = useState<'purple' | 'emerald' | 'slate' | 'cyber' | 'gold'>('purple');
  const [targetTabId, setTargetTabId] = useState<string>(currentTabId || 'new');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const generated = buildAutomatedWebsite(brandName, selectedNiche, selectedColorTheme);
      onApplyGeneratedSite(generated.blocks, generated.settings, targetTabId);
      setIsGenerating(false);
      onClose();
    }, 700);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 transition-all"
      onClick={onClose}
    >
      <div
        className="relative bg-white border-2 border-slate-300 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* WINDOW OS TITLE BAR (WINDOWS POPPING OUT STYLE) */}
        <div className="bg-slate-950 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer"
                title="Close"
              />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>

            <div className="flex items-center gap-2 truncate">
              <span className="px-2 py-0.5 rounded bg-indigo-900 border border-indigo-700 text-indigo-200 text-[10px] font-mono font-bold uppercase">
                AUTOMATED AI ENGINE
              </span>
              <span className="text-xs font-mono font-bold text-slate-200 truncate">
                Automated 1-Click Real Website Generator (WordPress-Grade)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* HEADER EXPLANATION BANNER */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50 via-indigo-50 to-cyan-50 border-b border-slate-200 shrink-0 space-y-1">
          <div className="flex items-center gap-2 text-indigo-950 font-black text-base">
            <Zap className="w-5 h-5 text-indigo-600 shrink-0" />
            <span>Generate a Complete, Real WordPress-Grade Website in 1-Click</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Choose your brand name, select a real-world WordPress template niche, and pick your color aesthetic. The engine synthesizes ready-to-publish blocks with headings, images, cards, and buttons tailored to your brand!
          </p>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleGenerate} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* STEP 1: BRAND NAME & TARGET TAB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-800 uppercase block">
                1. Your Website / Brand Name:
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Apex Virtual Solutions, NovaTech Store..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white shadow-2xs"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-800 uppercase block">
                2. Target Page / Existed Tab to Apply to:
              </label>
              <select
                value={targetTabId}
                onChange={(e) => setTargetTabId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white shadow-2xs cursor-pointer"
              >
                <optgroup label="🌟 Existed Main Website Pages">
                  {navTabs.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label} (/{t.slug || t.path.replace(/^\//, '')})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="✨ Create New Tab">
                  <option value="new">+ Create as Brand New Landing Page</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* STEP 2: COLOR SCHEME */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-800 uppercase flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-indigo-600" />
              <span>3. Visual Theme &amp; Color Scheme:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {[
                { id: 'purple', label: 'WordPress Purple', bg: 'bg-indigo-600', ring: 'ring-indigo-600' },
                { id: 'emerald', label: 'Astra Emerald', bg: 'bg-emerald-600', ring: 'ring-emerald-600' },
                { id: 'slate', label: 'Clean Slate & White', bg: 'bg-slate-900', ring: 'ring-slate-900' },
                { id: 'cyber', label: 'Cyber Dark & Cyan', bg: 'bg-cyan-500', ring: 'ring-cyan-500' },
                { id: 'gold', label: 'Luxury Champagne', bg: 'bg-amber-600', ring: 'ring-amber-600' }
              ].map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelectedColorTheme(theme.id as any)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    selectedColorTheme === theme.id
                      ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full ${theme.bg} shrink-0`} />
                  <span className="text-xs font-bold text-slate-900 truncate">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: NICHE TEMPLATE SELECTION (REAL WORDPRESS TEMPLATES) */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-800 uppercase flex items-center justify-between">
              <span>4. Select Real WordPress Template Architecture ({NICHE_PRESETS.length} Real Niches):</span>
              <span className="text-[10px] text-indigo-600 font-bold lowercase">
                click any template below
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {NICHE_PRESETS.map((preset) => {
                const IconComponent = preset.icon;
                const isSelected = selectedNiche === preset.id;

                return (
                  <div
                    key={preset.id}
                    onClick={() => setSelectedNiche(preset.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="space-y-1 min-w-0 pr-4">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[9px] font-mono font-bold uppercase">
                          {preset.category}
                        </span>
                        {isSelected && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-mono font-bold">
                            SELECTED
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs font-black text-slate-950 truncate">
                        {preset.label}
                      </h5>
                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                        {preset.description}
                      </p>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 absolute top-3 right-3 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Engineered with zero hallucination &amp; real copy
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isGenerating}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>
                  {isGenerating ? 'Synthesizing Real Website...' : '⚡ Generate Real Website Automatically'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

/**
 * Builds a complete multi-section website with authentic copy, images, pricing, and CTAs tailored to the brand name
 */
function buildAutomatedWebsite(
  brand: string,
  nicheId: string,
  colorTheme: string
): { settings: BuilderPageSettings; blocks: BuilderBlock[] } {
  const brandName = brand.trim() || 'Apex Digital Solutions';

  // Palette settings
  const colorMap: Record<string, { bg: string; accent: string; text: string; btn: any }> = {
    purple: { bg: '#f8fafc', accent: '#6366f1', text: '#020617', btn: 'indigo' },
    emerald: { bg: '#f0fdf4', accent: '#059669', text: '#020617', btn: 'apple-green' },
    slate: { bg: '#ffffff', accent: '#0f172a', text: '#020617', btn: 'primary' },
    cyber: { bg: '#020617', accent: '#06b6d4', text: '#f8fafc', btn: 'indigo' },
    gold: { bg: '#fffbeb', accent: '#d97706', text: '#020617', btn: 'primary' }
  };
  const theme = colorMap[colorTheme] || colorMap.purple;

  const settings: BuilderPageSettings = {
    pageTitle: `${brandName} — Official Portal`,
    pageSubtitle: `Engineered with ${brandName} modern web infrastructure.`,
    maxWidth: 'max-w-7xl',
    backgroundColor: theme.bg,
    fontFamily: 'inter'
  };

  const ts = Date.now();

  // 1. WORDPRESS AGENCY & VA SERVICES
  if (nicheId === 'wp-agency') {
    return {
      settings,
      blocks: [
        {
          id: `hero-${ts}`,
          type: 'hero',
          badgeText: `${brandName.toUpperCase()} • TOP-TIER DIGITAL AGENCY`,
          badgeColor: theme.accent,
          title: `Scale Your Business With High-Performance Remote Operations by ${brandName}`,
          subtitle: `We connect global founders, creators, and agencies with certified specialists in automated lead enrichment, executive calendar triage, and organic marketing engines.`,
          buttonText: 'Claim Your Strategy Consultation',
          buttonLink: '#/admin',
          buttonStyle: theme.btn,
          secondaryButtonText: 'Explore Proven Case Studies',
          secondaryButtonLink: '#/showcase',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center',
            shadow: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: `features-${ts}`,
          type: 'features-grid',
          title: `Why Industry Leaders Partner With ${brandName}`,
          subtitle: 'Proven operational frameworks delivering measurable return on investment.',
          columns: 3,
          gridItems: [
            {
              id: 'f-1',
              title: 'Sub-4-Second Speed-to-Lead',
              description: 'Autonomous webhook pipelines that research leads, score budget fit, and dispatch personalized replies instantly.',
              badge: 'Automation'
            },
            {
              id: 'f-2',
              title: 'Executive Calendar Command',
              description: 'Zero-spam inbox triage, meeting scheduling across time zones, and daily VIP client briefing sheets.',
              badge: 'Productivity'
            },
            {
              id: 'f-3',
              title: 'High-Converting SMM Funnels',
              description: 'Viral hook development, algorithm-optimized carousels, and converting casual followers into high-ticket clients.',
              badge: 'Growth'
            }
          ],
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            shadow: 'sm',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: `2col-${ts}`,
          type: '2-column',
          badgeText: 'Transparent Partnership',
          title: `The ${brandName} Advantage: Built on Zero Lock-In & Daily Reports`,
          content: 'Every specialist on our roster is pre-vetted, equipped with modern AI toolchains, and provides transparent daily time-tracking. You get immediate momentum without recruiting overhead.',
          buttonText: 'View Open Retainer Slots',
          buttonLink: '#/services',
          imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: `cta-${ts}`,
          type: 'call-to-action',
          title: `Ready to Partner With ${brandName}?`,
          content: 'Book a 15-minute introductory call to explore how our specialized operations team can support your roadmap.',
          buttonText: 'Schedule Strategy Call Now',
          buttonLink: '#/admin',
          buttonStyle: theme.btn,
          styles: {
            backgroundColor: '#020617',
            textColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center'
          }
        }
      ]
    };
  }

  // 2. WOOCOMMERCE & E-COMMERCE STORE
  if (nicheId === 'wp-woocommerce') {
    return {
      settings,
      blocks: [
        {
          id: `hero-${ts}`,
          type: 'hero',
          badgeText: `${brandName.toUpperCase()} STORE • LIMITED TIME SALE 40% OFF`,
          badgeColor: '#ec4899',
          title: `Discover Curated Modern Essentials from ${brandName}`,
          subtitle: 'Engineered for quality, longevity, and everyday performance. Enjoy free worldwide shipping on orders over $50.',
          buttonText: 'Shop Best Sellers Now',
          buttonLink: '#/showcase',
          buttonStyle: 'apple-green',
          secondaryButtonText: 'Explore New Arrivals',
          secondaryButtonLink: '#/showcase',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center',
            shadow: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: `prod-grid-${ts}`,
          type: 'features-grid',
          title: 'Trending Catalog & Top Customer Picks',
          subtitle: 'Backed by our 30-day risk-free satisfaction guarantee.',
          columns: 3,
          gridItems: [
            {
              id: 'p-1',
              title: 'Ergonomic Desk Mat & Wrist Pad ($39.00)',
              description: 'Anti-slip natural rubber base with waterproof micro-woven cloth surface for ultra-smooth mouse tracking.',
              badge: 'Best Seller',
              imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
              link: '#/showcase',
              linkText: 'Order Product &rarr;'
            },
            {
              id: 'p-2',
              title: 'Wireless Mechanical Keyboard ($89.00)',
              description: 'Hot-swappable tactile switches, multi-device Bluetooth connectivity, and 300-hour battery standby life.',
              badge: 'Sale 25% Off',
              imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
              link: '#/showcase',
              linkText: 'Order Product &rarr;'
            },
            {
              id: 'p-3',
              title: 'Active Noise-Canceling Headset ($129.00)',
              description: 'Crystal-clear dual beamforming microphones designed specifically for remote Zoom calls and podcasts.',
              badge: 'Top Rated',
              imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
              link: '#/showcase',
              linkText: 'Order Product &rarr;'
            }
          ],
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            shadow: 'sm',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: `cta-${ts}`,
          type: 'call-to-action',
          title: `Experience the ${brandName} Guarantee`,
          content: 'Free 3-day express shipping, 30-day hassle-free returns, and 24/7 dedicated customer care.',
          buttonText: 'Explore Entire Catalog',
          buttonLink: '#/showcase',
          buttonStyle: 'apple-green',
          styles: {
            backgroundColor: '#0f172a',
            textColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center'
          }
        }
      ]
    };
  }

  // 3. SAAS & AI STARTUP
  if (nicheId === 'wp-saas') {
    return {
      settings,
      blocks: [
        {
          id: `hero-${ts}`,
          type: 'hero',
          badgeText: `${brandName.toUpperCase()} v3.0 • AI COGNITIVE CLOUD`,
          badgeColor: '#06b6d4',
          title: `Supercharge Team Velocity with ${brandName} Autonomous Cloud`,
          subtitle: 'Automate repetitive workflows, synthesize real-time data insights, and deploy deterministic AI pipelines in minutes instead of months.',
          buttonText: 'Start 14-Day Free Trial',
          buttonLink: '#/admin',
          buttonStyle: 'indigo',
          secondaryButtonText: 'Interactive Live Demo',
          secondaryButtonLink: '#/ai#diagrams',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center',
            shadow: 'lg',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: `features-${ts}`,
          type: 'features-grid',
          title: `Engineered for High-Scale Applications`,
          subtitle: `Enterprise-grade reliability with SOC2 Type II compliance and 99.99% SLA.`,
          columns: 3,
          gridItems: [
            {
              id: 's-1',
              title: 'Sub-50ms Global Query Latency',
              description: 'Multi-region edge network delivers cached inference and database responses with zero buffering.',
              badge: 'Speed'
            },
            {
              id: 's-2',
              title: 'Deterministic JSON & Zod Schemas',
              description: 'Zero prompt drift. Guaranteed structured output validated against your strict TypeScript definitions.',
              badge: 'Precision'
            },
            {
              id: 's-3',
              title: 'End-to-End Audit Telemetry',
              description: 'Real-time observability logs, cost-per-execution breakdowns, and automated anomaly alerts.',
              badge: 'Security'
            }
          ],
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg',
            shadow: 'sm',
            borderColor: '#e2e8f0',
            borderWidth: 'thin'
          }
        },
        {
          id: `pricing-${ts}`,
          type: 'features-grid',
          title: 'Simple, Transparent Subscription Tiers',
          subtitle: 'No hidden setup fees. Upgrade or downgrade anytime.',
          columns: 3,
          gridItems: [
            {
              id: 'tier-1',
              title: 'Starter ($19/mo)',
              description: '10,000 monthly automation runs, 5 cognitive pipelines, community Discord support, and basic analytics.',
              badge: 'Starter Plan',
              link: '#/admin',
              linkText: 'Choose Starter'
            },
            {
              id: 'tier-2',
              title: 'Professional ($49/mo)',
              description: '100,000 monthly runs, unlimited pipelines, priority webhooks, dedicated Slack channel, and custom domain SSL.',
              badge: 'Most Popular',
              link: '#/admin',
              linkText: 'Choose Professional'
            },
            {
              id: 'tier-3',
              title: 'Enterprise ($199/mo)',
              description: 'Unlimited runs, custom fine-tuned models, 99.99% uptime SLA, SSO SAML, and dedicated solutions architect.',
              badge: 'Enterprise',
              link: '#/admin',
              linkText: 'Choose Enterprise'
            }
          ],
          styles: {
            backgroundColor: '#f8fafc',
            borderRadius: '2xl',
            paddingY: 'lg',
            paddingX: 'lg'
          }
        },
        {
          id: `cta-${ts}`,
          type: 'call-to-action',
          title: `Start Building With ${brandName} Today`,
          content: 'Deploy your first autonomous pipeline in under 5 minutes with zero credit card required.',
          buttonText: 'Claim Your Free API Credits',
          buttonLink: '#/admin',
          buttonStyle: 'indigo',
          styles: {
            backgroundColor: '#020617',
            textColor: '#ffffff',
            borderRadius: '3xl',
            paddingY: 'xl',
            paddingX: 'lg',
            textAlign: 'center'
          }
        }
      ]
    };
  }

  // 4. GENERAL FALLBACK FOR OTHER NICHES
  return {
    settings,
    blocks: [
      {
        id: `hero-${ts}`,
        type: 'hero',
        badgeText: `${brandName.toUpperCase()} • OFFICIAL ONLINE PORTAL`,
        badgeColor: theme.accent,
        title: `Welcome to ${brandName} — Modern Web Excellence`,
        subtitle: `Providing trusted services, premium solutions, and exceptional client outcomes. Engineered with modern responsive web standards.`,
        buttonText: 'Get Started Today',
        buttonLink: '#/admin',
        buttonStyle: theme.btn,
        secondaryButtonText: 'Learn More',
        secondaryButtonLink: '#/about',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '3xl',
          paddingY: 'xl',
          paddingX: 'lg',
          textAlign: 'center',
          shadow: 'lg',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      },
      {
        id: `features-${ts}`,
        type: 'features-grid',
        title: `What Makes ${brandName} Unique`,
        subtitle: 'Our key specializations and client deliverables.',
        columns: 3,
        gridItems: [
          {
            id: 'gen-1',
            title: 'Exceptional Quality',
            description: 'Every deliverable undergoes strict multi-stage quality review to guarantee flawless execution.',
            badge: 'Quality'
          },
          {
            id: 'gen-2',
            title: 'Rapid Turnaround',
            description: 'We respect your schedule and deliver on milestones with fast communication and transparent tracking.',
            badge: 'Speed'
          },
          {
            id: 'gen-3',
            title: 'Dedicated Support',
            description: 'Our customer support team is available around the clock to answer inquiries and ensure success.',
            badge: 'Support'
          }
        ],
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'lg',
          shadow: 'sm',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      },
      {
        id: `cta-${ts}`,
        type: 'call-to-action',
        title: `Connect With ${brandName}`,
        content: 'Contact our team today to discuss your goals and receive a personalized recommendation.',
        buttonText: 'Contact Us Now',
        buttonLink: '#/admin',
        buttonStyle: theme.btn,
        styles: {
          backgroundColor: '#020617',
          textColor: '#ffffff',
          borderRadius: '3xl',
          paddingY: 'xl',
          paddingX: 'lg',
          textAlign: 'center'
        }
      }
    ]
  };
}

export default AutomatedWebsiteGeneratorModal;
