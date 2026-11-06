import { Service, Project, Affiliate, Testimonial } from '../types';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/dev?id=7374638355121114347';
export const GUMROAD_GUI_LINK = 'https://futuristicsoftwares.gumroad.com/l/NETWORKANDDATAINFORMATIONS-GUI-TOOLS?a=815255139';
export const GUMROAD_STORE_LINK = 'https://gumroad.com/discover?a=815255139';

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Executive VA & Advanced Skill Mastery Starter Pack',
    category: 'va',
    price: '$5 / hr ($49 / week)',
    description: 'Hire a dedicated, pre-vetted Executive Virtual Assistant OR enroll in our hands-on 1-on-1 VA & Freelancer Skill Acceleration Pack. Includes full inbox/calendar ops, SOP architecture, and instant VIP Buyer Access to the Exclusive Advanced Skills Vault (/#/exclusive-skills).',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80',
    visible: true,
    highlighted: true,
    badge: 'MOST POPULAR • VIP VAULT INCLUDED',
    features: [
      '10 Hours/Week Dedicated VA or 1-on-1 Skill Coaching ($49)',
      'Unlocks Exclusive Advanced Skills Vault (/#/exclusive-skills)',
      'Executive Inbox Zero, Multi-Timezone Calendar & Notion CRM',
      'Real-Time KPI Dashboards & Daily End-of-Day Progress Reports'
    ]
  },
  {
    id: 's2',
    title: 'AI Automation Architect & Make/n8n Pipeline Build',
    category: 'dev',
    price: '$39 / workflow',
    description: 'Done-for-you AI automation workflow + step-by-step architectural training connecting ChatGPT/Claude with Gmail, Notion, HubSpot, Google Sheets, or Slack via Make.com, n8n, or Zapier. Unlocks all 8 Master Tracks in the Exclusive Skills Vault.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    visible: true,
    highlighted: true,
    badge: 'HIGHEST ROI • AI ARCHITECT',
    features: [
      '1 Production Multi-Step AI Webhook Pipeline Built & Tested',
      'Instant VIP Email Access to Exclusive Skills Vault (/#/exclusive-skills)',
      'JSON Schema Guardrails, Dead-Letter Error Handler & API Setup',
      'Recorded 1-on-1 Loom Technical Walkthrough & Blueprint Files'
    ]
  },
  {
    id: 's3',
    title: 'Full-Stack Dedicated Executive VA & Operations Retainer',
    category: 'va',
    price: '$199 / month',
    description: 'Ongoing monthly executive operations, B2B lead enrichment, CRM pipeline management, and AI-assisted content execution for founders, coaches, and agencies—or complete 30-day intensive VA career mentorship.',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&auto=format&fit=crop&q=80',
    visible: true,
    features: [
      'Dedicated Trained Executive VA (20 hrs/wk) + Backup Coverage',
      'Full Lifetime Access to Exclusive VA & Freelancer Skills Vault',
      'CRM Pipeline, Cold Outreach Enrichment & Customer Ticket Triage',
      'Zero Platform Markup Fees — Pause or Cancel Anytime'
    ]
  },
  {
    id: 's4',
    title: 'High-Converting Freelancer / Agency Authority Website',
    category: 'dev',
    price: '$99 / website',
    description: 'Launch a blazing-fast, conversion-engineered portfolio, agency landing page, or client booking website built with React, TypeScript & Tailwind CSS (or WordPress on Hostinger) to attract $1,500–$3,000/mo retainers.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    visible: true,
    features: [
      'Custom Minimalist Authority Design + Interactive ROI Case Studies',
      'Includes VIP Buyer Access to Exclusive Advanced Skills Vault',
      'Mobile, Core Web Vitals & Technical SEO Speed Optimized',
      'Direct Booking Form, Custom Domain DNS & Free SSL Setup'
    ]
  },
  {
    id: 's5',
    title: 'Omnichannel Short-Form Video, AI Voice & Social Engine',
    category: 'va',
    price: '$29 / bundle',
    description: '5 viral-engineered vertical Reels/TikToks/Shorts with dynamic retention captions, ElevenLabs multilingual voiceover/dubbing, plus 10 branded Canva carousels and our complete Content Repurposing SOP.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    visible: true,
    features: [
      '5 CapCut Pro Edited Vertical Reels + 10 Branded Canva Carousels',
      'Unlocks Exclusive Advanced Skills Vault (/#/exclusive-skills)',
      'Retention Hook Scripting & High-Contrast Dynamic Subtitles',
      '48-Hour Priority Turnaround + Editable Project Source Files'
    ]
  },
  {
    id: 's6',
    title: 'Cross-Platform Mobile App MVP & SaaS Prototype',
    category: 'dev',
    price: '$149 / MVP build',
    description: 'Turn your software concept or internal agency tool into a working Android, iOS, or Web SaaS MVP—complete with clean UI screens, authentication, database integration, and monetization readiness.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    visible: true,
    features: [
      'Flutter / React Native / React TypeScript Production Codebase',
      'Includes Full VIP Access to Exclusive Advanced Skills Vault',
      'API, Webhook & Secure Cloud Database Integration',
      'Google Play Store & Web Deployment Architecture Guide'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p0',
    title: 'NETWORK & DATA INFORMATIONS - GUI',
    category: 'security',
    description: 'Real-time diagnostic desktop utility designed to monitor network interface traffic, detect active VPN/VPS tunnels, classify public egress IP addresses, and inspect hardware performance.',
    image: './network_gui_tool.png',
    visible: true,
    tags: ['Cybersecurity', 'Python GUI', 'VPN Diagnostics', 'Gumroad Software'],
    githubUrl: GUMROAD_GUI_LINK,
    liveUrl: GUMROAD_GUI_LINK,
    featured: true
  },
  {
    id: 'p1',
    title: 'Minimalist All-in-One Portfolio & CMS',
    category: 'web',
    description: 'Ultra-fast responsive portfolio and free education platform equipped with client-side security protocols, real-time visitor telemetry, and a unified All-in-One CMS.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    visible: true,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/teamwhitehatdev',
    liveUrl: 'https://teamwhitehatdev.github.io',
    featured: true
  },
  {
    id: 'p2',
    title: 'Modular Analytical Dashboard Interface',
    category: 'design',
    description: 'Clean, modular graphical interface design system built for real-time data dashboards, system telemetry, and autonomous AI agent monitoring.',
    image: './media_1786675549040.jpg',
    visible: true,
    tags: ['Dashboard UI', 'React', 'TypeScript', 'Analytics'],
    githubUrl: GUMROAD_STORE_LINK,
    liveUrl: GUMROAD_STORE_LINK,
    featured: true
  },
  {
    id: 'p3',
    title: 'Executive VA & AI Operations Tracker',
    category: 'web',
    description: 'End-to-end executive workflow system managing client inquiries, multi-timezone calendar sync, automated EOD reporting, and CRM pipelines.',
    image: './media_1786675376512.jpg',
    visible: true,
    tags: ['Virtual Assistant', 'Automation', 'CRM', 'Workflow'],
    githubUrl: GUMROAD_STORE_LINK,
    liveUrl: GUMROAD_STORE_LINK,
    featured: true
  },
  {
    id: 'p4',
    title: 'Android Mobile Utility Suite',
    category: 'mobile',
    description: 'Published suite of Android mobile productivity utilities and developer tools available on Google Play Store.',
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&auto=format&fit=crop&q=80',
    visible: true,
    tags: ['Android', 'Kotlin', 'Google Play', 'Mobile'],
    githubUrl: PLAY_STORE_URL,
    liveUrl: PLAY_STORE_URL,
    featured: true
  },
  {
    id: 'p5',
    title: 'Hostinger Cloud Web Accelerator',
    category: 'web',
    description: 'Cloud hosting deployment architecture optimizing NVMe web servers and custom domains for Virtual Assistant and freelancer portfolios.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    visible: true,
    tags: ['Hostinger', 'NVMe Cloud', 'DNS Management', 'SSL'],
    githubUrl: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    liveUrl: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    featured: true
  }
];

export const AFFILIATE_LINKS: Affiliate[] = [
  {
    id: 'a-seeed',
    name: 'Wio Tracker L2 Pro for Meshtastic',
    code: 'LF0tCxl',
    discount: 'Black Friday & Thanksgiving Promo',
    url: 'https://www.seeedstudio.com/Wio-Tracker-L2-Pro-for-Meshtastic-p-0000.html?sensecap_affiliate=LF0tCxl&referring_service=link',
    description: 'Black Friday & Thanksgiving Promo — Shop early and save big on Seeed Studio Wio Tracker L2 Pro for Meshtastic & IoT hardware.'
  },
  {
    id: 'a0',
    name: 'Meshy AI 3D Generator',
    code: 'ER3M3J',
    discount: 'Free 3D AI Credits',
    url: 'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends',
    description: 'Create textured 3D models from text prompts and reference images in seconds.'
  },
  {
    id: 'a1',
    name: 'Hostinger Cloud Hosting',
    code: 'DPDCABINCEHM',
    discount: '75% OFF + Free Domain',
    url: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    description: 'Ultra-fast web hosting for Virtual Assistant portfolios and client applications.'
  },
  {
    id: 'a2',
    name: 'Gumroad Creator Store',
    code: '815255139',
    discount: 'Verified Creator Store',
    url: 'https://gumroad.com/discover?a=815255139',
    description: 'Download client contract templates, proposal pitch decks, and digital products.'
  },
  {
    id: 'a3',
    name: 'ElevenLabs AI Voice Studio',
    code: 'e5xwigkl9igv',
    discount: 'Free Trial',
    url: 'https://try.elevenlabs.io/e5xwigkl9igv',
    description: 'AI voice generator for podcast narration and automated video voiceovers.'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah L.',
    role: 'E-commerce Founder',
    company: 'USA Online Store',
    country: 'USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    content: 'Team WhiteHat Dev provided exceptional Virtual Assistant and AI automation support. Our response speed improved 40% in 30 days!',
    rating: 5
  }
];
