import { AffiliateCollapsibleTopic } from '../types';

export const INITIAL_AFFILIATE_TOPICS: AffiliateCollapsibleTopic[] = [
  {
    id: 'topic_cat_1',
    topicNumber: 'CATEGORY 1',
    categoryBadge: 'CMS EDUCATIONAL CATEGORY 1',
    title: 'CMS CATEGORY 1: AFFILIATE MARKETING FUNDAMENTALS & TERMINOLOGY',
    subtitle: 'Understanding affiliate links, cookies, tracking parameters, merchant commissions, and network platforms.',
    iconEmoji: '📚',
    themeColor: 'cyan',
    referralUrl: 'https://teamwhitehatdev.github.io/#/affiliate-guide',
    primaryCtaText: 'EXPLORE FUNDAMENTALS',
    discountBadgeText: 'BEGINNER TO ADVANCED GUIDE',
    markdownContent: 'Affiliate marketing is a performance-based system where creators recommend relevant software tools to their audience and earn a commission on qualified referral purchases. When a visitor clicks a referral link, a tracking cookie stored in their browser credits the referring affiliate if a signup occurs within the cookie window (e.g. 30-90 days). Commissions can be one-off flat fees (CPA), percentage sales commissions, or recurring monthly software subscriptions.',
    subItems: [
      {
        id: 'sub_c1_1',
        title: 'What Is Affiliate Marketing?',
        description: 'A performance-based monetization model where creators share trusted software tools with their audience.'
      },
      {
        id: 'sub_c1_2',
        title: 'Tracking Cookies & Attribution',
        description: 'Cookies track user referrals across 30 to 90 days, ensuring valid attribution when clients purchase.'
      },
      {
        id: 'sub_c1_3',
        title: 'Commission Structures',
        description: 'From one-off bounties (CPA) to high-yield monthly recurring software revenue streams.'
      },
      {
        id: 'sub_c1_4',
        title: 'Affiliate Networks',
        description: 'Enterprise platforms like Impact.com, Lemon Squeezy, and Involve Asia manage reliable tracking and automated payouts.'
      }
    ],
    sortOrder: 1,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-08-25T10:00:00Z'
  },
  {
    id: 'topic_cat_2',
    topicNumber: 'CATEGORY 2',
    categoryBadge: 'CMS EDUCATIONAL CATEGORY 2',
    title: 'CMS CATEGORY 2: GETTING STARTED & RESPONSIBLE NICHE SELECTION',
    subtitle: 'Finding reliable affiliate programs, evaluating product quality, and targeting the right audience.',
    iconEmoji: '🚀',
    themeColor: 'purple',
    referralUrl: 'https://teamwhitehatdev.github.io/#/affiliate-guide',
    primaryCtaText: 'SELECT YOUR NICHE',
    discountBadgeText: 'STRATEGY PLAYBOOK',
    markdownContent: 'Before promoting any software product, ensure you evaluate product quality, customer support, and merchant terms. Never recommend low-quality tools just for high commissions. Align recommendations with real problems your audience faces in productivity, web hosting, video production, or automation.',
    subItems: [
      {
        id: 'sub_c2_1',
        title: '1. Choose a Focused Niche',
        description: 'Focus on specialized categories you understand deeply, such as VA productivity, video production, or developer tools.'
      },
      {
        id: 'sub_c2_2',
        title: '2. Evaluate Tool Reliability',
        description: 'Only recommend platforms with proven 99.9% uptime, excellent customer support, and fair refund policies.'
      },
      {
        id: 'sub_c2_3',
        title: '3. Compliance & Disclosures',
        description: 'Follow FTC and international affiliate disclosure requirements to build long-term trust with your audience.'
      }
    ],
    sortOrder: 2,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-08-25T10:00:00Z'
  },
  {
    id: 'topic_01_hostinger',
    topicNumber: 'TOPIC 1',
    categoryBadge: 'TOPIC 1: WEB HOSTING & CLOUD INFRASTRUCTURE',
    title: 'TOPIC 1: WEB HOSTING & CLOUD INFRASTRUCTURE (HOSTINGER)',
    subtitle: 'High-speed cloud servers, NVMe storage, automated SSL certificates, and 1-click WordPress deployments.',
    iconEmoji: '🌐',
    themeColor: 'indigo',
    headerBannerImage: './media_1786675376512.jpg',
    referralUrl: 'https://hostinger.com?REFERRALCODE=DPDCABINCEHM',
    primaryCtaText: 'CLAIM HOSTINGER DISCOUNT →',
    couponCode: 'DPDCABINCEHM',
    discountBadgeText: 'UP TO 75% OFF + 3 MONTHS FREE + FREE DOMAIN',
    markdownContent: 'Hostinger provides blazing-fast LiteSpeed web servers, free global CDN, automated daily/weekly backups, unlimited free SSL certificates, and intuitive hPanel management. Ideal for freelancers and Virtual Assistants building client websites with minimal maintenance.',
    subItems: [
      {
        id: 'sub_h_1',
        title: '⚡ LiteSpeed Web Server Engine',
        description: 'Outperforms standard Apache servers by up to 5x with built-in LSCache object caching.'
      },
      {
        id: 'sub_h_2',
        title: '🔒 Free SSL & Automated Backups',
        description: 'Every client site receives automated SSL protection and scheduled daily backup snapshots.'
      },
      {
        id: 'sub_h_3',
        title: '🌍 1-Click WordPress Deployments',
        description: 'Launch professional blogs, portfolios, and client e-commerce stores in under 60 seconds.'
      },
      {
        id: 'sub_h_4',
        title: '📧 Professional Domain Email',
        description: 'Create custom business mailboxes (e.g. contact@yourdomain.com) for executive communication.'
      }
    ],
    sortOrder: 3,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-08-25T10:00:00Z'
  },
  {
    id: 'topic_02_capcut',
    topicNumber: 'TOPIC 2',
    categoryBadge: 'TOPIC 2: VIDEO EDITING & VIRAL CONTENT CREATION',
    title: 'TOPIC 2: ESSENTIAL CREATIVE SOFTWARE & VIDEO EDITING (CAPCUT)',
    subtitle: 'Produce viral TikTok, Reels, and YouTube Shorts with AI auto-captions, keyframes, and video effects.',
    iconEmoji: '🎬',
    themeColor: 'purple',
    headerBannerImage: './media_1786678717227.png',
    referralUrl: 'https://capcutaffiliateprogram.pxf.io/c/6620583/1854897/22372',
    primaryCtaText: 'DOWNLOAD CAPCUT PRO →',
    discountBadgeText: 'PRO TEMPLATES & AI AUTO-CAPTIONS INCLUDED',
    markdownContent: 'CapCut is the ultimate content creation suite for Virtual Assistants, video editors, and social media managers. Features include 1-click speech-to-text auto-captions, background noise removal, multi-track timeline editing, smooth speed ramping, and trending transitions.',
    subItems: [
      {
        id: 'sub_cc_1',
        title: '🎙️ Auto-Captions with Dynamic Animation',
        description: 'Automatically transcribe voice to animated captions in 20+ languages with 98% accuracy.'
      },
      {
        id: 'sub_cc_2',
        title: '✨ Smart AI Background Removal',
        description: 'Isolate subjects without greenscreen for rapid video compositing and client branding.'
      },
      {
        id: 'sub_cc_3',
        title: '📱 Cross-Platform Cloud Sync',
        description: 'Edit seamlessly between Desktop PC/Mac, iPad, and Mobile with unified cloud drafts.'
      }
    ],
    sortOrder: 4,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-08-25T10:00:00Z'
  },
  {
    id: 'topic_03_microsoft',
    topicNumber: 'TOPIC 3',
    categoryBadge: 'TOPIC 3: SEARCH REWARDS & CLOUD ECOSYSTEMS',
    title: 'TOPIC 3: HOW TO EARN FREE TECH REWARDS & GIFT CARDS (MICROSOFT REWARDS)',
    subtitle: 'Turn daily Bing searches, Edge browsing, and desktop tasks into real digital gift cards and hardware gear.',
    iconEmoji: '🎁',
    themeColor: 'cyan',
    referralUrl: 'https://rewards.bing.com/support',
    primaryCtaText: 'START EARNING MICROSOFT REWARDS →',
    discountBadgeText: '100% FREE TO JOIN • REDEEM DIGITAL GIFT CARDS',
    markdownContent: 'Microsoft Rewards allows remote workers, VAs, and students to accumulate points simply by searching with Bing, using Microsoft Edge, and completing daily quizzes. Points can be redeemed for Xbox Game Pass, Amazon Gift Cards, Microsoft Store vouchers, and workstation accessories.',
    subItems: [
      {
        id: 'sub_ms_1',
        title: '🔍 Daily Search Quotas',
        description: 'Earn points on PC and mobile daily by switching default search engine to Microsoft Bing.'
      },
      {
        id: 'sub_ms_2',
        title: '💳 Instant Digital Redemptions',
        description: 'Redeem points directly for Amazon, Spotify, Target, or Microsoft digital cards.'
      },
      {
        id: 'sub_ms_3',
        title: '🔥 Daily Streaks & Bonus Points',
        description: 'Maintain 7-day and 30-day activity streaks to earn massive bonus multipliers.'
      }
    ],
    sortOrder: 5,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-08-25T10:00:00Z'
  },
  {
    id: 'topic_04_graphics',
    topicNumber: 'TOPIC 4',
    categoryBadge: 'TOPIC 4: CREATIVE MULTIMEDIA & GRAPHICS ASSETS',
    title: 'TOPIC 4: GRAPHICS DESIGN & MULTIMEDIA SUITES (VECTEEZY & ENVATO)',
    subtitle: 'High-resolution vectors, stock photos, 4K video clips, motion templates, and commercial sound effects.',
    iconEmoji: '🎨',
    themeColor: 'amber',
    referralUrl: 'https://www.vecteezy.com',
    primaryCtaText: 'EXPLORE CREATIVE ASSETS →',
    discountBadgeText: 'COMMERCIAL LICENSING INCLUDED',
    markdownContent: 'Creative asset libraries provide royalty-free graphic elements, 3D mockups, Figma UI kits, and video overlays for client projects. Save hours of design time by leveraging professional vector templates with full commercial rights.',
    subItems: [
      {
        id: 'sub_gr_1',
        title: '📐 Scalable Vector Graphics (SVG/AI)',
        description: 'Infinite resolution vector illustrations, logos, and iconography for digital and print.'
      },
      {
        id: 'sub_gr_2',
        title: '🎞️ 4K Stock Footage & Overlays',
        description: 'B-roll footage, light leaks, glitch overlays, and video transitions for video editors.'
      },
      {
        id: 'sub_gr_3',
        title: '📜 Commercial Licensing Clearance',
        description: 'Full legal protection for client pitch decks, social media ads, and brand marketing.'
      }
    ],
    sortOrder: 6,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-08-25T10:00:00Z'
  },
  {
    id: 'topic_05_elevenlabs',
    topicNumber: 'TOPIC 5',
    categoryBadge: 'TOPIC 5: GENERATIVE AI AUDIO & CONVERSATIONAL VOICE MODELS',
    title: 'TOPIC 5: ELEVENLABS AI VOICE SYNTHESIS & VOICE CLONING (ELEVENLABS)',
    subtitle: 'Human-grade AI voice generation, multilingual dubbing, real-time speech-to-speech, and instant voice cloning.',
    iconEmoji: '🎙️',
    themeColor: 'purple',
    headerBannerImage: './media_1787649227371.webp',
    referralUrl: 'https://try.elevenlabs.io/e5xwigkl9igv',
    primaryCtaText: 'TRY ELEVENLABS FREE →',
    discountBadgeText: 'GET STARTED FROM $5/MO • FREE TIER AVAILABLE',
    markdownContent: 'ElevenLabs is the industry gold standard in AI speech synthesis. Generate lifelike voiceovers for podcasts, audiobooks, TikTok shorts, and corporate presentations with nuanced emotion, intonation, and multi-language support.',
    subItems: [
      {
        id: 'sub_el_1',
        title: '⚡ Instant Voice Cloning',
        description: 'Clone any speaker voice with just 1 minute of clean audio sample for continuous narration.'
      },
      {
        id: 'sub_el_2',
        title: '🌍 29+ Multilingual AI Voices',
        description: 'Dub videos into Spanish, Japanese, German, French, and 25+ languages while matching vocal identity.'
      },
      {
        id: 'sub_el_3',
        title: '🎭 Emotion & Intonation Control',
        description: 'Fine-tune stability, similarity boost, and style exaggeration for dramatic voice acting.'
      }
    ],
    pricingPlans: [
      {
        id: 'plan_starter',
        name: 'Starter Plan',
        price: '$5',
        period: '/month',
        features: [
          '30,000 Characters/mo (~30 mins)',
          'Instant Voice Cloning (10 voices)',
          'Commercial License included',
          'High Quality 128kbps Audio'
        ],
        ctaText: 'CHOOSE STARTER →',
        ctaUrl: 'https://try.elevenlabs.io/e5xwigkl9igv'
      },
      {
        id: 'plan_creator',
        name: 'Creator Plan',
        price: '$22',
        period: '/month',
        popular: true,
        features: [
          '100,000 Characters/mo (~2 hours)',
          'Professional Voice Cloning (PVC)',
          'Higher Audio Quality (192kbps)',
          'Projects Long-Form Editor Tool'
        ],
        ctaText: 'CHOOSE CREATOR →',
        ctaUrl: 'https://try.elevenlabs.io/e5xwigkl9igv'
      }
    ],
    sortOrder: 7,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-08-25T10:00:00Z'
  },
  {
    id: 'topic_06_gumroad',
    topicNumber: 'TOPIC 6',
    categoryBadge: 'TOPIC 6: DIGITAL COMMERCE & CREATOR MONETIZATION',
    title: 'TOPIC 6: GUMROAD — SELL DIGITAL PRODUCTS & ASSETS',
    subtitle: 'Launch your digital store, sell brushes, templates, code & ebooks, and reach millions of buyers worldwide.',
    iconEmoji: '🛍️',
    themeColor: 'pink',
    headerBannerImage: './media_1787655285154.png',
    referralUrl: 'https://gumroad.com/discover?a=815255139',
    primaryCtaText: 'START SELLING ON GUMROAD →',
    discountBadgeText: '0 UPFRONT FEES • INSTANT GLOBAL PAYOUTS',
    markdownContent: 'Gumroad is the premier e-commerce platform for creators, developers, designers, and Virtual Assistants to sell digital assets, Notion templates, code packages, brushes, 3D assets, and video courses. Gumroad acts as your merchant of record, handling global VAT, sales tax, credit cards, and automated 1099 tax documents.',
    subItems: [
      {
        id: 'sub_gr_jingsketch',
        title: 'Jingsketch: 1,000,000+ Digital Artists',
        description: 'Started creating digital Procreate and Photoshop brushes for personal use, scaling to over 1,000,000 downloads worldwide on Gumroad.',
        imageUrl: './media_1787655287026.png',
        ctaText: 'DISCOVER DIGITAL PRODUCTS →',
        ctaUrl: 'https://gumroad.com/discover?a=815255139'
      },
      {
        id: 'sub_gr_kyle',
        title: 'Kyle T Webster: Pixar, Disney & Adobe',
        description: 'Selling specialized illustration brushes on Gumroad led to partnerships with Disney, Pixar, and an acquisition by Adobe!',
        imageUrl: './media_1787655287101.png',
        ctaText: 'JOIN GUMROAD CREATORS →',
        ctaUrl: 'https://gumroad.com/discover?a=815255139'
      },
      {
        id: 'sub_gr_tax',
        title: 'Built-in Tax Center & Global Compliance',
        description: 'Gumroad collects and remits sales tax and EU VAT automatically, and generates 1099 tax forms directly in your dashboard.',
        imageUrl: './media_1787655286908.png',
        ctaText: 'LEARN ABOUT TAX CENTER →',
        ctaUrl: 'https://gumroad.com/discover?a=815255139'
      }
    ],
    sortOrder: 8,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-08-25T10:00:00Z'
  }
];
