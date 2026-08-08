export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'security' | 'design' | 'automation';
  image: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  metrics: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  features: string[];
  deliverables: string;
}

export interface AffiliateLink {
  id: string;
  title: string;
  category: string;
  description: string;
  referralUrl: string;
  bannerImage: string;
  badge: string;
  discountText: string;
}

export const AFFILIATE_LINKS: AffiliateLink[] = [
  {
    id: 'aff-1',
    title: 'DigitalOcean Cloud VPS & Kubernetes',
    category: 'Cloud Infrastructure',
    description: 'Get $200 free cloud credits to deploy high-speed SSD VPS servers, Kubernetes clusters, and databases.',
    referralUrl: 'https://m.do.co/c/teamwhitehatdev',
    bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    badge: 'EXCLUSIVE DEALS',
    discountText: '$200 FREE CREDITS 🎁'
  },
  {
    id: 'aff-2',
    title: 'NordVPN Cyber Shield & Threat Protection',
    category: 'Cybersecurity',
    description: 'Military-grade encryption, malware protection, and IP masking for developers and remote teams.',
    referralUrl: 'https://nordvpn.com/ref/teamwhitehatdev',
    bannerImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    badge: 'SECURITY OFFER',
    discountText: '70% OFF + 3 MO EXTRA 🛡️'
  },
  {
    id: 'aff-3',
    title: 'Envato Elements Unlimited UI/UX Assets',
    category: 'Graphics & Design',
    description: 'Unlimited downloads of 3D renders, Figma templates, vector HUD assets, motion graphics, and stock photos.',
    referralUrl: 'https://1.envato.market/teamwhitehatdev',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    badge: 'DESIGNER FAVORITE',
    discountText: '50% OFF ANNUAL PASS 🎨'
  },
  {
    id: 'aff-4',
    title: 'TradingView Pro Charting & Bot Signal Platform',
    category: 'FinTech & Trading',
    description: 'The world’s top technical analysis charts and WebSocket data feeds for crypto, stocks, and Forex traders.',
    referralUrl: 'https://www.tradingview.com/?aff_id=teamwhitehatdev',
    bannerImage: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
    badge: 'PRO TRADING',
    discountText: '$30 BONUS CREDIT 📈'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Nexus Enterprise SaaS Dashboard',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Real-time financial analytics dashboard built with Next.js 15, React 19, TypeScript, and WebSockets.',
    techStack: ['React 19', 'Next.js 15', 'TypeScript', 'TailwindCSS', 'WebSockets'],
    metrics: '10k req/sec • 99.99% Uptime',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Aegis Security Threat Sentinel',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description: 'Cybersecurity monitoring platform featuring automated IP threat detection, proxy auto-blocking, and PCI-DSS compliance.',
    techStack: ['Node.js', 'Python', 'Redis', 'Docker', 'CyberShield Core'],
    metrics: '400+ Attacks Blocked/Day',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Valkyrie Mobile Crypto Wallet',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Cross-platform iOS & Android cryptocurrency wallet app featuring biometric auth, token swaps, and multi-sig security.',
    techStack: ['React Native', 'TypeScript', 'iOS Swift', 'Android Kotlin'],
    metrics: '50k+ Active Downloads',
    featured: true
  },
  {
    id: 'proj-4',
    title: 'Cyberpunk Neon City 3D & Vector HUD Suite',
    category: 'design',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    description: 'High-resolution 3D cyberpunk renders, vector HUD overlays, and motion graphics design system for modern web apps.',
    techStack: ['Blender 3D', 'Figma', 'Adobe Illustrator', 'Canvas API'],
    metrics: 'Used by 50+ Top Brands',
    featured: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Vance',
    role: 'CTO & Co-Founder',
    company: 'Vance Dynamics',
    country: 'USA 🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    content: 'Team White Hat built our entire high-frequency trading interface in 3 weeks flat. Zero latency, immaculate HUD design, and flawless code.',
    rating: 5.0
  },
  {
    id: '2',
    name: 'Elena Rostova',
    role: 'Lead Security Engineer',
    company: 'Nordic Cyber Shield',
    country: 'Sweden 🇸🇪',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    content: 'The anti-fraud security engineering and real-time IP threat monitoring saved our enterprise platform from over 400 proxy attacks in the first week.',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Kenji Takahashi',
    role: 'Head of Product',
    company: 'NeoTokyo Interactive',
    country: 'Japan 🇯🇵',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    content: 'Exceptional cyberpunk aesthetic, graphic design skills, and ultra-clean React architecture. Fast delivery and zero bugs.',
    rating: 5.0
  },
  {
    id: '4',
    name: 'Sarah Jenkins',
    role: 'E-Commerce Director',
    company: 'Aura Digital Goods',
    country: 'UK 🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    content: 'Very smooth mobile-responsive design. Clean minimal UI works perfectly across all iOS, Android, and Desktop devices.',
    rating: 4.5
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'svc-1',
    title: 'Programming & Full-Stack Web Development',
    category: 'Web Applications',
    icon: 'Code',
    description: 'Custom React 19, Next.js 15, and Node.js microservices engineered for extreme speed, SEO optimization, and high availability.',
    features: ['Single Page Apps (SPA) & SSR', 'TypeScript Codebase', 'TailwindCSS / Glassmorphic UI', 'REST & GraphQL APIs'],
    deliverables: 'Complete Source Code + Deployment'
  },
  {
    id: 'svc-2',
    title: 'Mobile Application Development',
    category: 'Mobile Apps',
    icon: 'Smartphone',
    description: 'Native and cross-platform iOS & Android mobile applications built with React Native and Flutter for seamless user experiences.',
    features: ['iOS & Android App Store Ready', 'Biometric & Push Notifications', 'Offline First Architecture', 'High Performance UI'],
    deliverables: 'App Store Build + Binary Packages'
  },
  {
    id: 'svc-3',
    title: 'Graphics Designing & UI/UX Asset Suites',
    category: 'Design Engineering',
    icon: 'Palette',
    description: 'Futuristic glassmorphic HUD interfaces, 3D blender renders, logo branding suites, and responsive Figma design systems.',
    features: ['Figma UI/UX Prototypes', '3D Product Renders', 'Vector HUD Asset Packs', 'Brand Identity Systems'],
    deliverables: 'Source Figma Files + Vector Assets'
  },
  {
    id: 'svc-4',
    title: 'Cyber Security & Ethical Hacking',
    category: 'Security Engineering',
    icon: 'Shield',
    description: 'Comprehensive web application penetration testing, IP threat monitoring, XSS/SQLi defense shielding, and PCI-DSS compliance audits.',
    features: ['Web App Vulnerability Scans', 'Real-time IP Firewall Engine', 'Anti-Bot Protection', 'Secure Auth Systems'],
    deliverables: 'Audit Report + Patched Codebase'
  }
];
