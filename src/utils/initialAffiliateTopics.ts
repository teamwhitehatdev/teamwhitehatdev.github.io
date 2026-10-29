import { AffiliateCollapsibleTopic } from '../types';

export const INITIAL_AFFILIATE_TOPICS: AffiliateCollapsibleTopic[] = [
  {
    id: 'topic_01_fundamentals',
    topicNumber: 'NICHE #01',
    categoryBadge: 'CATEGORY 01: AFFILIATE FUNDAMENTALS',
    title: '01. Affiliate Marketing Fundamentals & Attribution Architecture',
    subtitle: 'Understanding referral links, tracking cookies, attribution windows, SaaS recurring commissions, and ethical disclosures.',
    iconEmoji: '📚',
    themeColor: 'slate',
    headerBannerImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    referralUrl: 'https://teamwhitehatdev.github.io/#/affiliate-guide',
    primaryCtaText: 'EXPLORE FUNDAMENTALS →',
    discountBadgeText: 'NICHE #01 • CORE FOUNDATION',
    markdownContent:
      'Affiliate marketing is a performance-based partnership where educators, Virtual Assistants, and digital creators recommend verified software tools to their audience and earn a commission on qualified signups. When a visitor clicks a partner link, an attribution cookie (typically 30 to 90 days) records the referral ID. Commissions range from flat one-time bounties (CPA) to recurring monthly SaaS revenue shares.',
    subItems: [
      {
        id: 'sub_01_1',
        tag: 'STEP 1.1',
        title: '1.1 Performance-Based Attribution',
        description: 'How unique URL parameters and encrypted browser cookies credit creators when a reader signs up or upgrades.'
      },
      {
        id: 'sub_01_2',
        tag: 'STEP 1.2',
        title: '1.2 CPA vs. Recurring SaaS Revenue',
        description: 'Comparing one-time bounty payouts against long-term monthly recurring software commissions (20%–40% lifetime).'
      },
      {
        id: 'sub_01_3',
        tag: 'STEP 1.3',
        title: '1.3 Global Partner Networks',
        description: 'Managing links, analytics, and automated payouts through Impact.com, PartnerStack, and Lemon Squeezy.'
      },
      {
        id: 'sub_01_4',
        tag: 'STEP 1.4',
        title: '1.4 Ethical FTC Disclosures',
        description: 'Why transparent sponsorship labels increase reader trust and protect long-term publisher reputation.'
      }
    ],
    sortOrder: 1,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_02_niche_strategy',
    topicNumber: 'NICHE #02',
    categoryBadge: 'CATEGORY 02: NICHE & CONTENT STRATEGY',
    title: '02. Profitable Niche Selection & High-Trust Resource Strategy',
    subtitle: 'How to select focused digital niches, evaluate software reliability, and publish tutorials that convert naturally.',
    iconEmoji: '🧭',
    themeColor: 'slate',
    headerBannerImage: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&auto=format&fit=crop&q=80',
    referralUrl: 'https://teamwhitehatdev.github.io/#/affiliate-guide',
    primaryCtaText: 'VIEW NICHE PLAYBOOK →',
    discountBadgeText: 'NICHE #02 • CONTENT ARCHITECTURE',
    markdownContent:
      'High-converting niche websites focus on solving specific operational problems rather than posting generic ads. By pairing free step-by-step tutorials, workflow diagrams, and honest tool comparisons with verified partner discounts, readers gain immediate value before ever clicking a link.',
    subItems: [
      {
        id: 'sub_02_1',
        tag: 'STEP 2.1',
        title: '2.1 Problem-First Niche Mapping',
        description: 'Focus on actionable verticals: VA productivity, cloud web hosting, AI 3D modeling, or short-form video editing.'
      },
      {
        id: 'sub_02_2',
        tag: 'STEP 2.2',
        title: '2.2 Software Quality Auditing',
        description: 'Only partner with platforms offering 99.9% uptime, responsive support, free trials, and fair refund policies.'
      },
      {
        id: 'sub_02_3',
        tag: 'STEP 2.3',
        title: '2.3 Tutorial-Driven Conversion',
        description: 'Demonstrate real workflows and copy-paste templates so visitors see exactly how the tool saves time.'
      }
    ],
    sortOrder: 2,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_03_hostinger',
    topicNumber: 'NICHE #03',
    categoryBadge: 'CATEGORY 03: CLOUD & WEB HOSTING',
    title: '03. Web Hosting & NVMe Cloud Infrastructure (Hostinger)',
    subtitle: 'High-speed LiteSpeed cloud servers, NVMe storage, automated SSL certificates, and 1-click WordPress deployments.',
    iconEmoji: '🌐',
    themeColor: 'slate',
    headerBannerImage: './media_1786675376512.jpg',
    referralUrl: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    primaryCtaText: 'CLAIM HOSTINGER DISCOUNT →',
    couponCode: 'DPDCABINCEHM',
    discountBadgeText: 'NICHE #03 • UP TO 75% OFF + FREE DOMAIN',
    markdownContent:
      'Hostinger provides blazing-fast LiteSpeed web servers, free global CDN, automated daily/weekly backups, unlimited free SSL certificates, and intuitive hPanel management. Ideal for freelancers and Virtual Assistants building client websites and portfolios with minimal maintenance.',
    subItems: [
      {
        id: 'sub_03_1',
        tag: 'FEATURE 3.1',
        title: '3.1 LiteSpeed NVMe Server Engine',
        description: 'Outperforms standard hosting by up to 5x with built-in LSCache object caching and NVMe SSD drives.'
      },
      {
        id: 'sub_03_2',
        tag: 'FEATURE 3.2',
        title: '3.2 Free Custom Domain & SSL',
        description: 'Every annual plan includes a free domain registration (.com/.net) plus automated SSL security certificates.'
      },
      {
        id: 'sub_03_3',
        tag: 'FEATURE 3.3',
        title: '3.3 1-Click WordPress & AI Builder',
        description: 'Launch professional portfolios, landing pages, and client e-commerce stores in under 60 seconds.'
      },
      {
        id: 'sub_03_4',
        tag: 'FEATURE 3.4',
        title: '3.4 Custom Business Email',
        description: 'Create branded domain mailboxes (e.g. hello@yourdomain.com) for executive client communication.'
      }
    ],
    sortOrder: 3,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_04_meshy_3d',
    topicNumber: 'NICHE #04',
    categoryBadge: 'CATEGORY 04: 3D AI & GAME ASSETS',
    title: '04. AI 3D Model Generator: Text & Image to 3D (Meshy AI)',
    subtitle: 'Generate production-ready 3D meshes and PBR textures from text prompts or 2D photos in under 60 seconds.',
    iconEmoji: '🧊',
    themeColor: 'slate',
    headerBannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    referralUrl: 'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends',
    primaryCtaText: 'TRY MESHY 3D AI FREE →',
    couponCode: 'ER3M3J',
    discountBadgeText: 'NICHE #04 • FREE 3D AI BONUS CREDITS',
    markdownContent:
      'Meshy AI enables web designers, game developers, e-commerce agencies, and creative Virtual Assistants to generate textured 3D models from simple text descriptions or reference images. Export directly to .GLB, .FBX, .OBJ, or .USDZ for Three.js websites, Blender, Unity, and Unreal Engine.',
    subItems: [
      {
        id: 'sub_04_1',
        tag: 'CAPABILITY 4.1',
        title: '4.1 Text-to-3D Mesh Synthesis',
        description: 'Describe any object, prop, or architectural element in plain English and generate 4 geometry variations in 60 seconds.'
      },
      {
        id: 'sub_04_2',
        tag: 'CAPABILITY 4.2',
        title: '4.2 2D Image to 3D Conversion',
        description: 'Upload a single product photo or concept sketch to reconstruct a full 360-degree textured 3D asset.'
      },
      {
        id: 'sub_04_3',
        tag: 'CAPABILITY 4.3',
        title: '4.3 AI PBR Texture Maps',
        description: 'Automatically generates Albedo, Normal, Roughness, and Metallic maps ready for physically based rendering.'
      }
    ],
    sortOrder: 4,
    isVisible: true,
    isDefaultOpen: true,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_05_suno_music',
    topicNumber: 'NICHE #05',
    categoryBadge: 'CATEGORY 05: AI MUSIC & AUDIO STUDIO',
    title: '05. Generative AI Music & Broadcast Song Creation (Suno AI)',
    subtitle: 'Create original radio-ready songs, vocals, podcast intros, and custom background soundtracks from text prompts.',
    iconEmoji: '🎵',
    themeColor: 'slate',
    headerBannerImage: './media_1787666146964.jpg',
    referralUrl: 'https://suno.com/@chillvibemusics',
    primaryCtaText: 'EXPLORE SUNO AI STUDIO →',
    discountBadgeText: 'NICHE #05 • FREE DAILY SONG CREDITS',
    markdownContent:
      'Suno AI transforms written lyrics or style prompts into full-length, broadcast-quality songs complete with realistic lead vocals, harmonies, and instrumentation. Content creators and Virtual Assistants use Suno to produce original royalty-free background music for YouTube, Reels, podcasts, and brand commercials.',
    subItems: [
      {
        id: 'sub_05_1',
        tag: 'STUDIO 5.1',
        title: '5.1 Custom Lyrics & Vocal Synthesis',
        description: 'Write your own verse/chorus structure or generate instrumental lo-fi, cinematic, pop, or acoustic tracks.'
      },
      {
        id: 'sub_05_2',
        tag: 'STUDIO 5.2',
        title: '5.2 Podcast Intros & Brand Jingles',
        description: 'Produce memorable 15-second audio stingers and background beds tailored to client brand identities.'
      },
      {
        id: 'sub_05_3',
        tag: 'STUDIO 5.3',
        title: '5.3 Multi-Genre Audio Mastering',
        description: 'Blend genres effortlessly—from chill synthwave and orchestral scores to upbeat commercial background tracks.'
      }
    ],
    sortOrder: 5,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_06_capcut',
    topicNumber: 'NICHE #06',
    categoryBadge: 'CATEGORY 06: VIDEO EDITING & REELS',
    title: '06. Short-Form Video Editing & Viral Content Suite (CapCut)',
    subtitle: 'Produce high-retention TikToks, Reels, and YouTube Shorts with AI auto-captions, keyframes, and background removal.',
    iconEmoji: '🎬',
    themeColor: 'slate',
    headerBannerImage: './media_1786678717227.png',
    referralUrl: 'https://capcutaffiliateprogram.pxf.io/c/6620583/1854897/22372',
    primaryCtaText: 'DOWNLOAD CAPCUT PRO →',
    discountBadgeText: 'NICHE #06 • AI AUTO-CAPTIONS & PRO EFFECTS',
    markdownContent:
      'CapCut is the industry-leading short-form video editing suite for Virtual Assistants, social media managers, and content creators. Features include 1-click speech-to-text dynamic captions, studio voice isolation, multi-track keyframe animation, and cross-device cloud sync.',
    subItems: [
      {
        id: 'sub_06_1',
        tag: 'TOOL 6.1',
        title: '6.1 Dynamic Animated Auto-Captions',
        description: 'Automatically transcribe spoken audio into word-by-word animated captions in 20+ languages with 98% accuracy.'
      },
      {
        id: 'sub_06_2',
        tag: 'TOOL 6.2',
        title: '6.2 1-Click AI Background Removal',
        description: 'Isolate speakers without a physical green screen for clean B-roll overlays and product demonstrations.'
      },
      {
        id: 'sub_06_3',
        tag: 'TOOL 6.3',
        title: '6.3 Cloud Team Drafts & Templates',
        description: 'Share project timelines between desktop and mobile so clients can review edits in real time.'
      }
    ],
    sortOrder: 6,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_07_elevenlabs',
    topicNumber: 'NICHE #07',
    categoryBadge: 'CATEGORY 07: AI VOICE & DUBBING',
    title: '07. AI Voice Synthesis, Dubbing & Voice Cloning (ElevenLabs)',
    subtitle: 'Human-grade AI voiceovers, 29+ language video dubbing, speech-to-speech emotion control, and instant voice cloning.',
    iconEmoji: '🎙️',
    themeColor: 'slate',
    headerBannerImage: './media_1787649227371.webp',
    referralUrl: 'https://try.elevenlabs.io/e5xwigkl9igv',
    primaryCtaText: 'TRY ELEVENLABS FREE →',
    discountBadgeText: 'NICHE #07 • FREE TIER + $5/MO STARTER',
    markdownContent:
      'ElevenLabs delivers lifelike AI voice synthesis for faceless YouTube channels, e-learning modules, audiobooks, and multilingual marketing videos. Clone your own voice or choose from hundreds of studio-recorded narrator voices with natural breathing and pacing.',
    subItems: [
      {
        id: 'sub_07_1',
        tag: 'VOICE 7.1',
        title: '7.1 Instant & Professional Voice Cloning',
        description: 'Clone a narrator voice from 60 seconds of clean audio to automate podcast intros and training videos.'
      },
      {
        id: 'sub_07_2',
        tag: 'VOICE 7.2',
        title: '7.2 29+ Language Automated Dubbing',
        description: 'Translate and dub full videos into Spanish, Japanese, French, Tagalog, and German while preserving vocal tone.'
      },
      {
        id: 'sub_07_3',
        tag: 'VOICE 7.3',
        title: '7.3 Stability & Style Precision Sliders',
        description: 'Fine-tune vocal expressiveness, pacing, and speaker similarity for documentary or commercial scripts.'
      }
    ],
    pricingPlans: [
      {
        id: 'plan_el_starter',
        name: 'Starter Plan',
        price: '$5',
        period: '/month',
        features: [
          '30,000 Characters/mo (~30 mins audio)',
          'Instant Voice Cloning included',
          'Full Commercial Usage Rights',
          'High-Clarity 128kbps MP3 Export'
        ],
        ctaText: 'START FOR $5/MO →',
        ctaUrl: 'https://try.elevenlabs.io/e5xwigkl9igv'
      },
      {
        id: 'plan_el_creator',
        name: 'Creator Plan',
        price: '$22',
        period: '/month',
        popular: true,
        features: [
          '100,000 Characters/mo (~2 hours audio)',
          'Professional Voice Cloning (PVC)',
          'Studio-Grade 192kbps Audio Output',
          'Long-Form Audiobook Projects Editor'
        ],
        ctaText: 'CHOOSE CREATOR →',
        ctaUrl: 'https://try.elevenlabs.io/e5xwigkl9igv'
      }
    ],
    sortOrder: 7,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_08_gumroad',
    topicNumber: 'NICHE #08',
    categoryBadge: 'CATEGORY 08: DIGITAL PRODUCT E-COMMERCE',
    title: '08. Digital Commerce & Selling Creator Templates (Gumroad)',
    subtitle: 'Launch a zero-overhead digital storefront selling Notion templates, software utilities, e-books, and design packs.',
    iconEmoji: '🛍️',
    themeColor: 'slate',
    headerBannerImage: './media_1787655285154.png',
    referralUrl: 'https://gumroad.com/discover?a=815255139',
    primaryCtaText: 'EXPLORE GUMROAD STORE →',
    discountBadgeText: 'NICHE #08 • $0 MONTHLY FEE • GLOBAL PAYOUTS',
    markdownContent:
      'Gumroad enables Virtual Assistants, developers, and digital creators to package their knowledge into downloadable products—such as Notion CRM dashboards, SOP bundles, Python utilities, and proposal templates. Gumroad acts as Merchant of Record, automatically handling global VAT and tax compliance.',
    subItems: [
      {
        id: 'sub_08_1',
        tag: 'CASE STUDY 8.1',
        title: '8.1 Jingsketch: 1,000,000+ Digital Downloads',
        description: 'Scaled simple digital brush packs and tutorials into a global creator brand on Gumroad.',
        imageUrl: './media_1787655287026.png',
        ctaText: 'DISCOVER CREATOR STORE →',
        ctaUrl: 'https://gumroad.com/discover?a=815255139'
      },
      {
        id: 'sub_08_2',
        tag: 'CASE STUDY 8.2',
        title: '8.2 Kyle T. Webster: Independent Creator to Adobe',
        description: 'Built a thriving digital asset catalog on Gumroad that led to collaborations with Pixar, Disney, and Adobe.',
        imageUrl: './media_1787655287101.png',
        ctaText: 'START SELLING DIGITAL ASSETS →',
        ctaUrl: 'https://gumroad.com/discover?a=815255139'
      },
      {
        id: 'sub_08_3',
        tag: 'FEATURE 8.3',
        title: '8.3 Automated Global Tax & License Keys',
        description: 'Built-in software license key generation, tiered memberships, and automated EU/US sales tax remittance.',
        imageUrl: './media_1787655286908.png',
        ctaText: 'VIEW PLATFORM FEATURES →',
        ctaUrl: 'https://gumroad.com/discover?a=815255139'
      }
    ],
    sortOrder: 8,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_09_graphics_vecteezy',
    topicNumber: 'NICHE #09',
    categoryBadge: 'CATEGORY 09: VECTOR & STOCK MEDIA',
    title: '09. Commercial Vector Graphics & 4K Stock Media (Vecteezy & Envato)',
    subtitle: 'Royalty-free SVG vectors, PSD mockups, 4K B-roll footage, and commercial presentation assets for client projects.',
    iconEmoji: '🎨',
    themeColor: 'slate',
    headerBannerImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&auto=format&fit=crop&q=80',
    referralUrl: 'https://www.vecteezy.com',
    primaryCtaText: 'BROWSE CREATIVE ASSETS →',
    discountBadgeText: 'NICHE #09 • COMMERCIAL LICENSING INCLUDED',
    markdownContent:
      'Designers and Virtual Assistants save hours on every client deliverable by sourcing pre-vetted SVG icons, editable pitch deck templates, 3D product mockups, and 4K stock footage with full commercial indemnification.',
    subItems: [
      {
        id: 'sub_09_1',
        tag: 'ASSET 9.1',
        title: '9.1 Scalable Vector Illustrations (SVG / AI / EPS)',
        description: 'Resolution-independent icons, infographics, and brand elements for websites and print materials.'
      },
      {
        id: 'sub_09_2',
        tag: 'ASSET 9.2',
        title: '9.2 4K B-Roll Video & Motion Backgrounds',
        description: 'Cinematic stock clips and seamless looping backgrounds for client YouTube channels and landing pages.'
      },
      {
        id: 'sub_09_3',
        tag: 'ASSET 9.3',
        title: '9.3 Cleared Commercial Usage Rights',
        description: 'Download signed license certificates for client agency work, paid social ads, and merchandise.'
      }
    ],
    sortOrder: 9,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_10_microsoft_rewards',
    topicNumber: 'NICHE #10',
    categoryBadge: 'CATEGORY 10: PRODUCTIVITY REWARDS',
    title: '10. Browser Productivity & Tech Gift Card Rewards (Microsoft Rewards)',
    subtitle: 'Turn daily research queries, Microsoft Edge workflows, and streak milestones into digital gift cards and workstation gear.',
    iconEmoji: '🎁',
    themeColor: 'slate',
    headerBannerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
    referralUrl: 'https://rewards.bing.com/support',
    primaryCtaText: 'JOIN MICROSOFT REWARDS →',
    discountBadgeText: 'NICHE #10 • 100% FREE TO JOIN',
    markdownContent:
      'Virtual Assistants and researchers perform ratusan of web searches every week. By signing into a Microsoft account on Edge and Bing, everyday research queries automatically accumulate redeemable points for Amazon vouchers, Microsoft 365 subscriptions, and hardware accessories.',
    subItems: [
      {
        id: 'sub_10_1',
        tag: 'REWARD 10.1',
        title: '10.1 Desktop & Mobile Research Points',
        description: 'Earn automatic daily points while researching client competitors, keywords, and market data.'
      },
      {
        id: 'sub_10_2',
        tag: 'REWARD 10.2',
        title: '10.2 Streak Multipliers & Daily Sets',
        description: 'Complete 60-second daily trivia sets to unlock 7-day and 30-day bonus point multipliers.'
      },
      {
        id: 'sub_10_3',
        tag: 'REWARD 10.3',
        title: '10.3 Instant Digital Voucher Redemption',
        description: 'Redeem accumulated points for digital gift cards, software subscriptions, or charitable donations.'
      }
    ],
    sortOrder: 10,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-08-25T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_11_executive_va',
    topicNumber: 'NICHE #11',
    categoryBadge: 'CATEGORY 11: EXECUTIVE VA OPERATIONS',
    title: '11. Executive Virtual Assistant (EA) Systems & Inbox Zero Mastery',
    subtitle: 'Complete operational playbook for managing founder inboxes, multi-timezone calendars, travel logistics, and daily EOD reports.',
    iconEmoji: '💼',
    themeColor: 'slate',
    headerBannerImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    referralUrl: 'https://teamwhitehatdev.github.io/#/ai',
    primaryCtaText: 'OPEN VA ACADEMY GUIDES →',
    discountBadgeText: 'NICHE #11 • HIGH-DEMAND REMOTE CAREER',
    markdownContent:
      'Executive Virtual Assistants are the operational backbone of modern remote companies. By implementing structured Inbox Zero filters (`Action Required`, `Waiting On`, `Delegated`, `Archive`), color-coded time-blocking calendars, and concise End-of-Day (EOD) status reports, an Executive VA saves founders 12–20 hours every week.',
    subItems: [
      {
        id: 'sub_11_1',
        tag: 'SYSTEM 11.1',
        title: '11.1 The 4-Folder Inbox Zero Protocol',
        description: 'Triage 200+ daily emails in under 30 minutes using priority labels, canned responses, and VIP filters.'
      },
      {
        id: 'sub_11_2',
        tag: 'SYSTEM 11.2',
        title: '11.2 Multi-Timezone Calendar Architecture',
        description: 'Coordinate meetings across EST, PST, GMT, and PHT with buffer blocks and automated Calendly routing.'
      },
      {
        id: 'sub_11_3',
        tag: 'SYSTEM 11.3',
        title: '11.3 Daily EOD Accountability Reporting',
        description: 'Send a structured 3-bullet daily wrap-up covering Completed Tasks, Metrics Updated, and Next-Day Priorities.'
      }
    ],
    sortOrder: 11,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_12_ai_automation_workflows',
    topicNumber: 'NICHE #12',
    categoryBadge: 'CATEGORY 12: AI WORKFLOW AUTOMATION',
    title: '12. No-Code AI Automation Pipelines (Make.com, n8n & Zapier)',
    subtitle: 'Connect Webhooks, OpenAI/Claude LLMs, Google Sheets, Notion, and Slack into autonomous 24/7 business workflows.',
    iconEmoji: '⚡',
    themeColor: 'slate',
    headerBannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    referralUrl: 'https://teamwhitehatdev.github.io/#/ai',
    primaryCtaText: 'VIEW AI FLOW DIAGRAMS →',
    discountBadgeText: 'NICHE #12 • AUTONOMOUS AGENT PIPELINES',
    markdownContent:
      'Modern Virtual Assistants and automation specialists command premium rates by replacing manual copy-pasting with automated webhook pipelines. When a new lead submits a form, an AI node classifies intent, enriches company details, logs the record in Notion/HubSpot, and drafts a personalized reply in seconds.',
    subItems: [
      {
        id: 'sub_12_1',
        tag: 'PIPELINE 12.1',
        title: '12.1 Webhook-to-LLM Lead Qualification',
        description: 'Parse incoming website inquiries with structured JSON schemas to score budget, urgency, and fit.'
      },
      {
        id: 'sub_12_2',
        tag: 'PIPELINE 12.2',
        title: '12.2 Omnichannel Content Repurposing',
        description: 'Automatically turn 1 YouTube transcript into a blog article, LinkedIn post, and 5 newsletter bullets.'
      },
      {
        id: 'sub_12_3',
        tag: 'PIPELINE 12.3',
        title: '12.3 Fallback Error Handling & Alerts',
        description: 'Configure retry routers and Slack notifications so mission-critical client automations never drop data.'
      }
    ],
    sortOrder: 12,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-09-02T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_13_ecommerce_va',
    topicNumber: 'NICHE #13',
    categoryBadge: 'CATEGORY 13: E-COMMERCE & SHOPIFY OPS',
    title: '13. E-Commerce Virtual Assistance (Shopify, Amazon & Order Fulfillment)',
    subtitle: 'Manage product catalog SEO, inventory sync, Gorgias/Zendesk customer tickets, and refund/exchange workflows.',
    iconEmoji: '📦',
    themeColor: 'slate',
    headerBannerImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80',
    referralUrl: 'https://teamwhitehatdev.github.io/#/ai',
    primaryCtaText: 'EXPLORE E-COMMERCE PLAYBOOK →',
    discountBadgeText: 'NICHE #13 • SHOPIFY & AMAZON OPERATIONS',
    markdownContent:
      'E-commerce founders constantly need reliable Virtual Assistants to manage daily store operations. Mastering Shopify product uploads, SEO meta descriptions, 3PL tracking lookups, and empathetic customer support ticket resolution makes you indispensable to online retail brands.',
    subItems: [
      {
        id: 'sub_13_1',
        tag: 'STORE 13.1',
        title: '13.1 High-Converting Product Listing SEO',
        description: 'Optimize product titles, benefit-driven bullet points, alt-text tags, and variant SKU matrices.'
      },
      {
        id: 'sub_13_2',
        tag: 'STORE 13.2',
        title: '13.2 Gorgias & Zendesk Support Macros',
        description: 'Resolve WISMO ("Where Is My Order?") tickets in under 2 minutes using dynamic order-lookup templates.'
      },
      {
        id: 'sub_13_3',
        tag: 'STORE 13.3',
        title: '13.3 Inventory & Supplier Reconciliation',
        description: 'Monitor stock thresholds, flag low-inventory SKUs, and coordinate purchase orders with fulfillment centers.'
      }
    ],
    sortOrder: 13,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-09-03T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_14_social_media_canva',
    topicNumber: 'NICHE #14',
    categoryBadge: 'CATEGORY 14: SOCIAL MEDIA & BRANDING',
    title: '14. Social Media Management, Canva Systems & Content Calendars',
    subtitle: 'Batch-produce 30 days of branded carousels, short-form reels, and scheduled posts with measurable engagement KPIs.',
    iconEmoji: '📱',
    themeColor: 'slate',
    headerBannerImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&auto=format&fit=crop&q=80',
    referralUrl: 'https://teamwhitehatdev.github.io/#/ai',
    primaryCtaText: 'OPEN SOCIAL MEDIA GUIDE →',
    discountBadgeText: 'NICHE #14 • CONTENT BATCHING SYSTEM',
    markdownContent:
      'Successful Social Media Virtual Assistants don’t post randomly—they build repeatable content pillars (Educational, Authority/Case Study, Behind-the-Scenes, and Direct Offer). Using reusable Canva brand kits and Notion scheduling boards, you can batch a full month of client content in two afternoons.',
    subItems: [
      {
        id: 'sub_14_1',
        tag: 'CONTENT 14.1',
        title: '14.1 The 4-Pillar Content Matrix',
        description: 'Balance value-driven educational carousels with social proof and clear calls-to-action.'
      },
      {
        id: 'sub_14_2',
        tag: 'CONTENT 14.2',
        title: '14.2 Master Brand Kits & Template Systems',
        description: 'Lock typography, hex palettes, and logo watermarks so every graphic stays 100% on-brand.'
      },
      {
        id: 'sub_14_3',
        tag: 'CONTENT 14.3',
        title: '14.3 Monthly Analytics & Growth Reporting',
        description: 'Track saves, shares, profile visits, and link clicks to prove ROI to retainer clients.'
      }
    ],
    sortOrder: 14,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-09-04T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  },
  {
    id: 'topic_15_client_acquisition',
    topicNumber: 'NICHE #15',
    categoryBadge: 'CATEGORY 15: FREELANCE CLIENT ACQUISITION',
    title: '15. Landing High-Paying Remote Clients, Proposals & Retainer Scaling',
    subtitle: 'Proven Upwork, OnlineJobs.ph & LinkedIn outreach frameworks, discovery call checklists, and retainer contracts.',
    iconEmoji: '🏆',
    themeColor: 'slate',
    headerBannerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    referralUrl: 'https://teamwhitehatdev.github.io/#/ai',
    primaryCtaText: 'READ PROPOSAL PLAYBOOK →',
    discountBadgeText: 'NICHE #15 • CLIENT OUTREACH & RETAINERS',
    markdownContent:
      'Clients don’t hire resumes—they hire solutions to their immediate bottlenecks. When sending proposals on Upwork, OnlineJobs.ph, or LinkedIn, lead with a specific 3-step action plan addressing their exact job post, attach a 60-second Loom walkthrough or portfolio sample, and offer a low-risk starter trial.',
    subItems: [
      {
        id: 'sub_15_1',
        tag: 'OUTREACH 15.1',
        title: '15.1 The 4-Sentence Hook Proposal Formula',
        description: 'Acknowledge their exact pain point in sentence 1, show relevant proof in sentence 2, and propose a clear next step.'
      },
      {
        id: 'sub_15_2',
        tag: 'OUTREACH 15.2',
        title: '15.2 15-Minute Discovery Call Framework',
        description: 'Ask 5 diagnostic questions about their daily bottlenecks, current tools, and success metrics.'
      },
      {
        id: 'sub_15_3',
        tag: 'OUTREACH 15.3',
        title: '15.3 Trial-to-Retainer Upgrade Path',
        description: 'Convert a 1-week starter project into a predictable monthly retainer with clear deliverables and SLAs.'
      }
    ],
    sortOrder: 15,
    isVisible: true,
    isDefaultOpen: false,
    createdAt: '2026-09-05T10:00:00Z',
    updatedAt: '2026-10-29T00:00:00Z'
  }
];
