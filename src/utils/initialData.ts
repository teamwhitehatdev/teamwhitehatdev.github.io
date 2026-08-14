import { ServiceItem, Project, AffiliateLink, Testimonial } from '../types';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/dev?id=7374638355121114347';
export const GUMROAD_GUI_LINK = 'https://futuristicsoftwares.gumroad.com/l/NETWORKANDDATAINFORMATIONS-GUI-TOOLS?a=815255139';

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Executive Virtual Assistance',
    category: 'va',
    price: '$15 / hr',
    description: 'Inbox triage, calendar scheduling, CRM data entry, customer support, and administrative project coordination.',
    features: ['Dedicated Executive VA', 'Calendar & Email Management', 'CRM Data Entry', '24/7 Global Coverage']
  },
  {
    id: 's2',
    title: 'Full-Stack Web Application Engineering',
    category: 'dev',
    price: '$499 / project',
    description: 'Custom responsive web applications built with React, TypeScript, Next.js, Node.js, and high-speed cloud infrastructure.',
    features: ['React & TypeScript Frontend', 'Node.js & Database Architecture', 'SEO & Performance Optimization', 'Fastly CDN Edge Deployment']
  },
  {
    id: 's3',
    title: 'Mobile App Development (Android & iOS)',
    category: 'dev',
    price: '$799 / project',
    description: 'Cross-platform mobile applications compiled, tested, and published directly to Google Play Store and Apple App Store.',
    features: ['Flutter / React Native Engine', 'Google Play Store Publishing', 'Push Notifications & Auth', 'Crashlytics Diagnostics']
  },
  {
    id: 's4',
    title: 'Graphic Design & Corporate Branding',
    category: 'va',
    price: '$250 / brand',
    description: 'Social media branding assets, company logos, UI/UX mockups, promotional banners, and marketing collaterals.',
    features: ['Vector Logo Design', 'Social Media Planners', 'Figma UI/UX Mockups', 'Print & Digital Formats']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p0',
    title: 'NETWORK & DATA INFORMATIONS - GUI',
    category: 'Computer Applications',
    description: 'Real-time holographic diagnostic dashboard designed to monitor network interface traffic, detect active VPN/VPS tunnels, classify public egress IP addresses, inspect system hardware performance & storage drives, and ensure ISP masking & online privacy.',
    image: './network_gui_tool.png',
    tags: ['Cybersecurity', 'Python GUI', 'VPN Diagnostics', 'Gumroad Software'],
    githubUrl: GUMROAD_GUI_LINK,
    liveUrl: GUMROAD_GUI_LINK,
    featured: true
  },
  {
    id: 'p1',
    title: 'Cyberpunk Portfolio & CMS Platform',
    category: 'Web App',
    description: 'Ultra-fast responsive portfolio platform equipped with AES-256 IP sentinel firewall, stealth back-end CMS, and live trading ticker.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/teamwhitehatdev',
    liveUrl: 'https://teamwhitehatdev.github.io',
    featured: true
  },
  {
    id: 'p2',
    title: 'Android Mobile Utility Suite',
    category: 'Mobile App',
    description: 'Published suite of Android mobile productivity utilities and developer tools on Google Play Store.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
    tags: ['Android', 'Kotlin', 'Google Play', 'Mobile'],
    githubUrl: PLAY_STORE_URL,
    liveUrl: PLAY_STORE_URL,
    featured: true
  },
  {
    id: 'p3',
    title: 'Hostinger Cloud Web Accelerator',
    category: 'Web App',
    description: 'Cloud hosting integration engine optimizing NVMe web servers and custom domains for Virtual Assistant portfolios.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    tags: ['Hostinger', 'NVMe Cloud', 'DNS Management', 'SSL'],
    githubUrl: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    liveUrl: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    featured: true
  }
];

export const AFFILIATE_LINKS: AffiliateLink[] = [
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
    role: 'E-commerce Founder (USA)',
    text: 'Team WhiteHat Dev provided exceptional Virtual Assistant support. Our sales increased 40% in 60 days!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  }
];
