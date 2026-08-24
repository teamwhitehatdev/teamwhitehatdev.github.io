import { COMPREHENSIVE_EDUCATIONAL_CMS_ITEMS } from '../data/comprehensiveEducationalData';
import { INITIAL_AI_ITEMS } from '../data/initialAIData';
import { CMSItem } from '../types';

export const INITIAL_CMS_ITEMS: CMSItem[] = [
  ...COMPREHENSIVE_EDUCATIONAL_CMS_ITEMS,
  ...COMPREHENSIVE_EDUCATIONAL_ITEMS,
  ...INITIAL_AI_ITEMS,
  // =========================================================================
  // 💼 SERVICES PAGE OWNER (PROMOTED TO HOME FEATURED TUTORIALS)
  // =========================================================================
  {
    id: 'cms-va-fund-1',
    pageOwner: 'services',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'services',
    featured: true,
    title: 'What Is a Virtual Assistant & How Does Remote Assistance Work?',
    category: 'VA Fundamentals',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 1,
    summary: 'A comprehensive beginner guide to understanding the role of a Virtual Assistant, core administrative responsibilities, and how remote client workflows operate.',
    description: 'Learn the fundamentals of virtual assistance: inbox triage, calendar scheduling, client communication, and tool management.',
    fullContent: `### What Is a Virtual Assistant?
A Virtual Assistant (VA) is an independent contractor or remote professional who provides administrative, creative, technical, or specialized support services to business owners, executives, agencies, and online entrepreneurs from a remote location.

### Core Responsibilities of a Modern VA
1. **Inbox & Email Management:** Triage client inboxes, archive spam, draft professional responses, and organize label folders.
2. **Calendar & Meeting Scheduling:** Coordinate time zones, book client appointments on Google Calendar or Calendly, and send meeting reminders.
3. **Data Entry & CRM Organization:** Maintain client databases, update lead tracking spreadsheets, and clean up Notion/Airtable records.
4. **File & Document Organization:** Structure Google Drive, Dropbox, or OneDrive folders with clean naming conventions.
5. **Basic Digital & Social Media Support:** Schedule posts, organize media assets in Canva, and assist with video captions.

### Realistic Path to Success
Success as a Virtual Assistant requires continuous learning, skill development, consistency, professional communication, and responsible business practices. Results depend entirely on your dedication, client acquisition effort, and service quality.`,
    mainImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    url: 'https://teamwhitehatdev.github.io/#/services',
    buttonText: 'READ FULL GUIDE',
    seoTitle: 'Virtual Assistant Fundamentals Guide | Team WhiteHat Dev',
    seoDescription: 'Learn what a Virtual Assistant does and how to build a successful remote administrative career.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'cms-va-admin-1',
    pageOwner: 'services',
    homeFeatured: true,
    contentType: 'Guide',
    page: 'services',
    featured: true,
    title: 'Top 10 Essential Administrative & Digital Skills Every Beginner VA Should Develop',
    category: 'Admin Skills',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 2,
    summary: 'Discover the top 10 practical administrative and software skills requested by global founders, from professional email writing to spreadsheet organization.',
    description: 'Master email triage, calendar coordination, Canva graphic design basics, and AI productivity tools to increase your client retention.',
    fullContent: `### Top 10 High-Demand VA Skills
1. **Professional Email Writing:** Drafting concise, polite, and action-oriented emails for executive clients.
2. **Time Zone & Calendar Coordination:** Managing international client calendars across UTC, EST, PST, and GMT.
3. **Spreadsheet Data Entry & Formulas:** Basic Google Sheets and Excel formulas (VLOOKUP, SUMIF, Data Validation).
4. **Online Research & Market Curation:** Gathering competitive data, industry contacts, and lead information.
5. **Graphic Design Basics (Canva):** Creating social media thumbnails, pitch decks, and branded flyers.
6. **Short-Form Video Editing (CapCut):** Editing TikToks, Reels, and Shorts with auto-captions and smooth transitions.
7. **Social Media Management:** Scheduling posts on Buffer, Hootsuite, or Meta Business Suite.
8. **Website Management Basics:** Updating WordPress blog posts, Hostinger DNS records, or Shopify product catalogs.
9. **AI Productivity Tools:** Using ChatGPT and Claude to speed up draft writing, summary notes, and research.
10. **Task Tracking & Project Management:** Organizing client workflows in Asana, Trello, ClickUp, or Notion.`,
    mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    url: 'https://teamwhitehatdev.github.io/#/services',
    buttonText: 'EXPLORE SKILLS',
    seoTitle: 'Top 10 Virtual Assistant Skills | Team WhiteHat Dev',
    seoDescription: 'Master essential administrative and digital skills to build your remote freelancing career.',
    createdAt: '2026-08-05T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'cms-freelance-1',
    pageOwner: 'services',
    homeFeatured: true,
    contentType: 'Guide',
    page: 'services',
    featured: true,
    title: 'Beginner Freelancer Guide: How to Find Clients & Write Winning Proposals',
    category: 'Freelancing',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 3,
    summary: 'Learn responsible strategies for client acquisition, writing tailored proposal cover letters, setting rates, and protecting your work from online scams.',
    description: 'Step-by-step guide to finding freelance clients, conducting interview calls, and establishing recurring retainer packages.',
    fullContent: `### Practical Client Acquisition Strategies
Finding clients as a remote Virtual Assistant or freelancer requires consistent outreach, clear communication, and demonstrating proof of skill.

### 4 Key Steps to Landing Your First Client
1. **Build a Clean Portfolio:** Show case studies of past sample work (e.g. sample email templates, mock Canva graphics, organized spreadsheet templates).
2. **Tailor Your Proposals:** Avoid copy-pasting generic template proposals. Address the client's specific problem in the first two sentences.
3. **Set Professional Rates:** Price your services based on the value provided ($15-$35/hr for general admin; $35-$60/hr for specialized video editing or web dev).
4. **Avoid Common Scams:** Never pay money to apply for a job. Always use official payment methods or contracts.

*Disclaimer: Results vary based on individual effort, consistency, portfolio quality, and client demand.*`,
    mainImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    url: 'https://teamwhitehatdev.github.io/#/services',
    buttonText: 'LEARN PROPOSAL STRATEGY',
    seoTitle: 'Freelancer Client Acquisition Guide | Team WhiteHat Dev',
    seoDescription: 'Discover practical strategies for finding freelance clients and pitching professional service packages.',
    createdAt: '2026-08-10T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },

  // =========================================================================
  // 🔗 AFFILIATE GUIDE PAGE OWNER (PROMOTED TO HOME FEATURED TUTORIALS)
  // =========================================================================
  {
    id: 'cms-affiliate-edu-1',
    pageOwner: 'affiliate-guide',
    homeFeatured: true,
    contentType: 'Tutorial',
    page: 'affiliate-guide',
    featured: true,
    title: 'How Affiliate Marketing Works: A Realistic & Responsible Educational Guide',
    category: 'Affiliate Marketing',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 4,
    summary: 'Understand the mechanics of affiliate links, tracking cookies, merchant commission structures, and how to build additional online income streams responsibly.',
    description: 'Learn how affiliate networks operate, how unique tracking parameters work, and why audience trust is critical for long-term sustainability.',
    fullContent: `### What Is Affiliate Marketing?
Affiliate marketing is a performance-based marketing model where a content creator, blogger, or recommendation platform earns a referral commission when a visitor completes a qualifying purchase or signup using their unique referral link.

### Core Terminology Explained
- **Merchant / Advertiser:** The company offering a product or service (e.g. Hostinger, CapCut, NordVPN, Vecteezy).
- **Affiliate Link:** A unique URL containing the affiliate's tracking parameter (e.g. \`REFERRALCODE=DPDCABINCEHM\`).
- **Cookie Duration:** The timeframe (e.g. 30 to 90 days) in which a purchase made by a visitor will be attributed to the affiliate.
- **Affiliate Network:** The platform managing tracking, reporting, and payouts (e.g. Impact.com, Lemon Squeezy, Involve Asia).

### Responsible Education & Financial Disclaimer
Affiliate marketing is NOT get-rich-quick. Income is NOT guaranteed. Results depend heavily on creating helpful content, building audience trust, driving relevant traffic, testing strategies, and adhering to FTC disclosure rules.`,
    mainImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    url: 'https://teamwhitehatdev.github.io/#/affiliate-guide',
    buttonText: 'READ AFFILIATE GUIDE',
    seoTitle: 'Realistic Affiliate Marketing Guide | Team WhiteHat Dev',
    seoDescription: 'Learn how affiliate marketing works responsibly without unrealistic income guarantees.',
    createdAt: '2026-08-12T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'cms-affiliate-edu-2',
    pageOwner: 'affiliate-guide',
    homeFeatured: true,
    contentType: 'Guide',
    page: 'affiliate-guide',
    featured: true,
    title: 'Choosing a Niche & Building High-Value Educational Resource Pages',
    category: 'Content Strategy',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 5,
    summary: 'Learn how to recommend relevant software tools and infrastructure that solve genuine client problems instead of pushing aggressive spam.',
    description: 'Discover how to create tutorials, product comparisons, and resource pages that provide genuine utility to your readers.',
    fullContent: `### Why Value & Trust Come First
Successful affiliate content creators focus on solving problems first. When you create honest tutorials—such as demonstrating how Hostinger simplifies WordPress setup or how CapCut speeds up video editing—visitors appreciate the genuine help.

### 3 Rules for Ethical Tool Recommendations
1. **Recommend Tools You Understand:** Only recommend software and services you have analyzed or used in client projects.
2. **Always Disclose Affiliate Relationships:** Clearly state when a link is a referral link so visitors appreciate your transparency.
3. **Provide Balanced Reviews:** Mention both pros and potential drawbacks so visitors can make informed decisions.`,
    mainImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    url: 'https://teamwhitehatdev.github.io/#/affiliate-guide',
    buttonText: 'LEARN CONTENT STRATEGY',
    seoTitle: 'Ethical Affiliate Content Strategy | Team WhiteHat Dev',
    seoDescription: 'Build high-value resource pages and honest product recommendations for long-term audience trust.',
    createdAt: '2026-08-15T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },

  // =========================================================================
  // 💻 SHOWCASE PAGE OWNER ONLY (homeFeatured = false)
  // =========================================================================
  {
    id: 'cms-showcase-1',
    pageOwner: 'showcase',
    homeFeatured: false,
    contentType: 'Showcase',
    page: 'showcase',
    featured: false,
    title: 'Cyberpunk Portfolio & Security Hub',
    category: 'Web App',
    status: 'PUBLISHED',
    visible: true,
    description: 'High-performance React application featuring interactive HUD telemetry, encryption tools, and cyber aesthetics.',
    mainImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
    ],
    url: 'https://teamwhitehatdev.github.io/',
    metrics: '99.9% Uptime • 400ms Speed',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },

  // =========================================================================
  // 🛠️ SERVICES PAGE OWNER ONLY (homeFeatured = false)
  // =========================================================================
  {
    id: 'cms-services-1',
    pageOwner: 'services',
    homeFeatured: false,
    contentType: 'Service',
    page: 'services',
    featured: false,
    title: 'Executive Virtual Assistant Retainer',
    category: 'Virtual Assistance',
    status: 'PUBLISHED',
    visible: true,
    description: 'Dedicated executive assistant for administrative management, client communication, schedule optimization, and email triage.',
    mainImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    price: '$1,500 / month',
    url: 'https://teamwhitehatdev.github.io/#/services',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },

  // =========================================================================
  // 🌐 WEB HOSTING PAGE OWNER ONLY (homeFeatured = false)
  // =========================================================================
  {
    id: 'cms-webhosting-1',
    pageOwner: 'web-hosting',
    homeFeatured: false,
    contentType: 'Resource',
    page: 'web-hosting',
    featured: false,
    title: 'Hostinger Premium Cloud Web Hosting Plan',
    category: 'Hosting & Domain',
    status: 'PUBLISHED',
    visible: true,
    description: 'High-speed LiteSpeed NVMe web hosting with free domain (.com), free custom business email, and 1-click WordPress installer.',
    mainImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    price: '$2.99 / month (75% OFF)',
    url: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  },

  // =========================================================================
  // ℹ️ ABOUT PAGE OWNER ONLY (homeFeatured = false)
  // =========================================================================
  {
    id: 'cms-about-1',
    pageOwner: 'about',
    homeFeatured: false,
    contentType: 'Article',
    page: 'about',
    featured: false,
    title: 'About Team WhiteHat Dev',
    category: 'Company Profile',
    status: 'PUBLISHED',
    visible: true,
    description: 'We are an elite collective of full-stack developers, security engineers, and executive virtual assistant mentors empowering digital creators worldwide.',
    mainImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    url: 'https://teamwhitehatdev.github.io/#/about',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-15T00:00:00Z'
  }
];
