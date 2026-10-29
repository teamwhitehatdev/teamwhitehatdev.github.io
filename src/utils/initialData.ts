import { Service, Project, Affiliate, Testimonial } from '../types';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/dev?id=7374638355121114347';
export const GUMROAD_GUI_LINK = 'https://futuristicsoftwares.gumroad.com/l/NETWORKANDDATAINFORMATIONS-GUI-TOOLS?a=815255139';
export const GUMROAD_STORE_LINK = 'https://gumroad.com/discover?a=815255139';

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Starter Virtual Assistant Trial Pack',
    category: 'va',
    price: '$5 / hr ($49 / week)',
    description: 'Try a dedicated, pre-vetted Virtual Assistant at our lowest introductory rate. Ideal for inbox triage, calendar scheduling, research, and daily admin tasks.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80',
    visible: true,
    features: ['10 Hours/Week Starter Pack ($49)', 'Inbox Zero & Calendar Management', 'Google Sheets & Notion Data Entry', 'Daily End-of-Day Progress Report']
  },
  {
    id: 's2',
    title: 'Part-Time Dedicated Executive VA',
    category: 'va',
    price: '$199 / month',
    description: 'Ongoing monthly executive assistance for busy founders, coaches, and agencies. Includes email management, CRM updates, and customer support.',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&auto=format&fit=crop&q=80',
    visible: true,
    features: ['Dedicated Trained VA (20 hrs/wk)', 'CRM Pipeline & Lead Follow-Up', 'Customer Ticket & Chat Support', 'Zero Platform Fees — Cancel Anytime']
  },
  {
    id: 's3',
    title: 'AI Automation Workflow Setup',
    category: 'dev',
    price: '$39 / workflow',
    description: 'Done-for-you AI automation connecting ChatGPT/Claude with your Gmail, Notion, Google Sheets, Slack, or CRM using Make.com, n8n, or Zapier.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    visible: true,
    features: ['1 Complete Custom AI Pipeline', 'Auto Lead Capture & Email Responder', 'JSON Schema & Error Handling', 'Recorded Loom Walkthrough Included']
  },
  {
    id: 's4',
    title: 'Modern Portfolio or Business Website',
    category: 'dev',
    price: '$99 / website',
    description: 'Clean, fast, mobile-responsive minimalist website or landing page built with React, TypeScript & Tailwind CSS (or WordPress on Hostinger).',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    visible: true,
    features: ['Custom Minimalist White Design', 'Mobile & SEO Speed Optimized', 'Contact Form & Lead Capture', 'Free Deployment & SSL Setup']
  },
  {
    id: 's5',
    title: 'Short-Form Video & Canva Social Pack',
    category: 'va',
    price: '$29 / bundle',
    description: '5 edited short-form vertical Reels/TikToks with dynamic captions plus 10 branded Canva graphics ready to post across your social channels.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    visible: true,
    features: ['5 CapCut Edited Vertical Reels', '10 Custom Canva Carousel/Post Graphics', 'Hormozi-Style Auto Subtitles', '48-Hour Fast Turnaround']
  },
  {
    id: 's6',
    title: 'Cross-Platform Mobile App MVP',
    category: 'dev',
    price: '$149 / MVP build',
    description: 'Launch your Android & iOS mobile app prototype or utility application fast, including UI screens, authentication, and Play Store preparation.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    visible: true,
    features: ['Flutter / React Native Codebase', 'Clean Modern UI Screens', 'API & Database Integration', 'Google Play Store Submission Guide']
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
