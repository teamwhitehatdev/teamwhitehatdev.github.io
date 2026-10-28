import { COMPREHENSIVE_EDUCATIONAL_CMS_ITEMS } from '../data/comprehensiveEducationalData';
import { CMSItem } from '../types';

export const INITIAL_CMS_ITEMS: CMSItem[] = [
  ...COMPREHENSIVE_EDUCATIONAL_CMS_ITEMS,

  // =========================================================================
  // 🔗 AFFILIATE GUIDE PAGE OWNER (UNIQUE EDUCATIONAL GUIDES)
  // =========================================================================
  {
    id: 'cms-affiliate-edu-1',
    pageOwner: 'affiliate-guide',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'affiliate-guide',
    featured: true,
    title: 'How Affiliate Marketing Works: A Realistic & Responsible Educational Guide',
    category: 'AFFILIATE MARKETING',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 26,
    summary: 'Understand the mechanics of affiliate links, tracking cookies, merchant commission structures, and how to build additional online income streams responsibly.',
    description: 'Learn how affiliate networks operate, how unique tracking parameters work, and why audience trust is critical for long-term sustainability.',
    fullContent: `### What Is Affiliate Marketing?
Affiliate marketing is a performance-based marketing model where a content creator, blogger, or recommendation platform earns a referral commission when a visitor completes a qualifying purchase or signup using their unique referral link.

### Core Terminology Explained
- **Merchant / Advertiser:** The company offering a product or service (e.g. Hostinger, Meshy AI, Suno AI, CapCut, Vecteezy).
- **Affiliate Link:** A unique URL containing the affiliate's tracking parameter (e.g. \`REFERRALCODE=DPDCABINCEHM\` or \`ER3M3J\`).
- **Cookie Duration:** The timeframe (e.g. 30 to 90 days) in which a purchase made by a visitor will be attributed to the affiliate.
- **Affiliate Network:** The platform managing tracking, reporting, and payouts (e.g. Impact.com, PartnerStack, Involve Asia).

### Responsible Education & Financial Disclaimer
Affiliate marketing is NOT get-rich-quick. Income is NOT guaranteed. Results depend heavily on creating helpful content, building audience trust, driving relevant traffic, testing strategies, and adhering to FTC disclosure rules.`,
    mainImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    url: 'https://teamwhitehatdev.github.io/#/affiliate-guide',
    buttonText: 'READ AFFILIATE GUIDE →',
    seoTitle: 'Realistic Affiliate Marketing Guide | Team WhiteHat Dev',
    seoDescription: 'Learn how affiliate marketing works responsibly without unrealistic income guarantees.',
    createdAt: '2026-08-12T00:00:00Z',
    updatedAt: '2026-10-28T00:00:00Z'
  },
  {
    id: 'cms-affiliate-edu-2',
    pageOwner: 'affiliate-guide',
    homeFeatured: true,
    contentType: 'Guide',
    page: 'affiliate-guide',
    featured: true,
    title: 'Choosing an Authentic Niche & Building High-Trust Resource Pages',
    category: 'AFFILIATE MARKETING',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 27,
    summary: 'Learn how to recommend relevant software tools and infrastructure that solve genuine client problems instead of pushing repetitive spam.',
    description: 'Discover how to create tutorials, product comparisons, and resource pages that provide genuine utility to your readers.',
    fullContent: `### Why Authenticity & Trust Come First
Successful affiliate content creators focus on solving real problems first. When you create honest, step-by-step tutorials—such as demonstrating how Hostinger simplifies WordPress setup, how Meshy AI generates 3D assets, or how CapCut speeds up video editing—visitors appreciate the genuine help.

### 3 Rules for Ethical Tool Recommendations
1. **Recommend Tools You Understand:** Only recommend software and services you have tested or used in real workflows.
2. **Always Disclose Affiliate Relationships:** Clearly state when a link is a referral link so visitors appreciate your transparency.
3. **Provide Balanced Reviews:** Mention both strengths and ideal use cases so visitors can make informed decisions.`,
    mainImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    url: 'https://teamwhitehatdev.github.io/#/affiliate-guide',
    buttonText: 'LEARN CONTENT STRATEGY →',
    seoTitle: 'Ethical Affiliate Content Strategy | Team WhiteHat Dev',
    seoDescription: 'Build high-value resource pages and honest product recommendations for long-term audience trust.',
    createdAt: '2026-08-15T00:00:00Z',
    updatedAt: '2026-10-28T00:00:00Z'
  },

  // =========================================================================
  // 💻 SHOWCASE PAGE OWNER ONLY (homeFeatured = false, UNIQUE IMAGE)
  // =========================================================================
  {
    id: 'cms-showcase-1',
    pageOwner: 'showcase',
    homeFeatured: false,
    contentType: 'Showcase',
    page: 'showcase',
    featured: false,
    title: 'Minimalist Portfolio & All-in-One CMS Architecture',
    category: 'Web App',
    status: 'PUBLISHED',
    visible: true,
    description: 'High-performance React & TypeScript application featuring real-time visitor telemetry, client-side security guards, and a unified All-in-One CMS.',
    mainImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80'
    ],
    url: 'https://teamwhitehatdev.github.io/',
    metrics: '99.9% Uptime • <400ms Load',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-28T00:00:00Z'
  },

  // =========================================================================
  // 🛠️ SERVICES PAGE OWNER ONLY (URL-ONLY /#/services — ULTRA-AFFORDABLE)
  // =========================================================================
  {
    id: 'cms-services-1',
    pageOwner: 'services',
    homeFeatured: false,
    contentType: 'Service',
    page: 'services',
    featured: false,
    title: 'Starter Dedicated Virtual Assistant Pack ($5/hr or $49/Week Trial)',
    category: 'Virtual Assistance',
    status: 'PUBLISHED',
    visible: true,
    description: 'Ultra-affordable dedicated Virtual Assistant support for inbox triage, calendar scheduling, research, Canva graphics, and daily admin tasks.',
    mainImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&auto=format&fit=crop&q=80',
    price: '$5 / hr ($49 / week trial)',
    url: 'https://teamwhitehatdev.github.io/#/services',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-28T00:00:00Z'
  },

  // =========================================================================
  // 🌐 WEB HOSTING PAGE OWNER ONLY (homeFeatured = false, UNIQUE IMAGE)
  // =========================================================================
  {
    id: 'cms-webhosting-1',
    pageOwner: 'web-hosting',
    homeFeatured: false,
    contentType: 'Resource',
    page: 'web-hosting',
    featured: false,
    title: 'Hostinger LiteSpeed NVMe Cloud Web Hosting Plan',
    category: 'Hosting & Domain',
    status: 'PUBLISHED',
    visible: true,
    description: 'High-speed LiteSpeed NVMe web hosting with free domain (.com), free custom business email, and 1-click WordPress installer.',
    mainImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80',
    price: '$2.99 / month (75% OFF)',
    url: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-28T00:00:00Z'
  },

  // =========================================================================
  // ℹ️ ABOUT PAGE OWNER ONLY (homeFeatured = false, UNIQUE IMAGE)
  // =========================================================================
  {
    id: 'cms-about-1',
    pageOwner: 'about',
    homeFeatured: false,
    contentType: 'Article',
    page: 'about',
    featured: false,
    title: 'About Team WhiteHat Dev — Free Education & Engineering Collective',
    category: 'Company Profile',
    status: 'PUBLISHED',
    visible: true,
    description: 'We are a collective of full-stack software engineers, AI automation architects, and executive virtual assistant mentors providing 100% free education.',
    mainImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
    url: 'https://teamwhitehatdev.github.io/#/about',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-10-28T00:00:00Z'
  }
];
