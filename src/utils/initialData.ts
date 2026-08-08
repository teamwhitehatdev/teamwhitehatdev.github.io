export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'security' | 'automation';
  image: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
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

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Nexus Enterprise SaaS Dashboard',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Real-time financial analytics dashboard built with Next.js 15, React 19, TypeScript, and WebSockets. Handles 10,000+ data points/sec with zero latency.',
    techStack: ['React 19', 'Next.js 15', 'TypeScript', 'TailwindCSS', 'WebSockets', 'Chart.js'],
    liveUrl: 'https://teamwhitehatdev.github.io',
    metrics: '10k req/sec • 99.99% Uptime',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Aegis Security Threat Sentinel',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description: 'Cybersecurity monitoring platform featuring automated IP threat detection, proxy auto-blocking, and PCI-DSS compliance verification.',
    techStack: ['Node.js', 'Python', 'Redis', 'Docker', 'CyberShield Core'],
    liveUrl: 'https://teamwhitehatdev.github.io',
    metrics: '400+ Attacks Blocked/Day',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Valkyrie Mobile Crypto Wallet',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Cross-platform iOS & Android cryptocurrency wallet app featuring biometric authentication, instant token swaps, and multi-sig security.',
    techStack: ['React Native', 'TypeScript', 'Ethers.js', 'iOS Swift', 'Android Kotlin'],
    liveUrl: 'https://teamwhitehatdev.github.io',
    metrics: '50k+ Active Downloads',
    featured: true
  },
  {
    id: 'proj-4',
    title: 'Quantum High-Frequency Trading Bot',
    category: 'automation',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    description: 'Algorithmic trading engine with automated order execution across Binance, Coinbase, and Uniswap DEX pools.',
    techStack: ['Python', 'Go', 'WebSockets', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://teamwhitehatdev.github.io',
    metrics: 'sub-ms Execution Speed',
    featured: true
  },
  {
    id: 'proj-5',
    title: 'Cyberpunk HUD Streaming Overlay Pack',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    description: 'Futuristic OBS stream overlays with dynamic glassmorphism panels, sound triggers, and live interactive chat widgets.',
    techStack: ['HTML5', 'CSS3 Vanilla', 'JavaScript ES6+', 'Canvas API'],
    liveUrl: 'https://teamwhitehatdev.github.io',
    metrics: 'Used by 200+ Twitch Streamers',
    featured: false
  },
  {
    id: 'proj-6',
    title: 'Titan Cloud Kubernetes Orchestrator',
    category: 'automation',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description: 'Automated multi-region cloud deployment pipeline for scalable microservices infrastructure.',
    techStack: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'GitHub Actions'],
    liveUrl: 'https://teamwhitehatdev.github.io',
    metrics: 'Zero-Downtime CI/CD',
    featured: false
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
    content: 'Exceptional cyberpunk aesthetic and ultra-clean React architecture. Fast delivery, responsive communication, and zero bugs.',
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
  },
  {
    id: '5',
    name: 'David Miller',
    role: 'VP of Infrastructure',
    company: 'CloudMatrix Inc.',
    country: 'Canada 🇨🇦',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    content: 'The custom software architecture made scaling our web application effortless. Highly recommended senior web & app developer.',
    rating: 5.0
  },
  {
    id: '6',
    name: 'Amelie Laurent',
    role: 'Creative Director',
    company: 'Lumiere Studios',
    country: 'France 🇫🇷',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    content: 'Beautiful translucent glassmorphic HUD components and lightning-fast page transition animations. A true digital masterpiece.',
    rating: 4.9
  },
  {
    id: '7',
    name: 'Carlos Mendez',
    role: 'Lead Mobile Developer',
    company: 'Solaria Tech',
    country: 'Spain 🇪🇸',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    content: 'Unbeatable performance and security. The cross-platform mobile ecosystem delivered exceeded all client expectations.',
    rating: 5.0
  },
  {
    id: '8',
    name: 'Hao Chen',
    role: 'Senior DevOps Architect',
    company: 'CyberGrid Asia',
    country: 'Singapore 🇸🇬',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    content: 'The automated deployment pipelines and standalone web packages saved our team months of development time.',
    rating: 4.7
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'svc-1',
    title: 'Full-Stack Web Engineering',
    category: 'Web Applications',
    icon: 'Code',
    description: 'Custom React 19, Next.js 15, and Node.js microservices engineered for extreme speed, SEO optimization, and high availability.',
    features: ['Single Page Apps (SPA) & SSR', 'TypeScript Codebase', 'TailwindCSS / Modern Glassmorphism UI', 'REST & GraphQL APIs'],
    deliverables: 'Complete Source Code + Deployment'
  },
  {
    id: 'svc-2',
    title: 'Mobile Ecosystem Development',
    category: 'Mobile Apps',
    icon: 'Smartphone',
    description: 'Native and cross-platform iOS & Android mobile applications built with React Native and Flutter for seamless user experiences.',
    features: ['iOS & Android App Store Ready', 'Biometric & Push Notifications', 'Offline First Architecture', 'High Performance UI'],
    deliverables: 'App Store Build + Binary Packages'
  },
  {
    id: 'svc-3',
    title: 'Cybersecurity & Code Auditing',
    category: 'Security Engineering',
    icon: 'Shield',
    description: 'Comprehensive web application penetration testing, IP threat monitoring, XSS/SQLi defense shielding, and PCI-DSS compliance audits.',
    features: ['Web App Vulnerability Scans', 'Real-time IP Firewall Engine', 'Anti-Bot & Anti-Scrape Protection', 'Secure Auth Systems'],
    deliverables: 'Audit Report + Patched Codebase'
  },
  {
    id: 'svc-4',
    title: 'Automation & High-Frequency Bots',
    category: 'Automation Systems',
    icon: 'Cpu',
    description: 'Custom Python & Go automation scripts, algorithmic trading bots, web scrapers, and automated cloud CI/CD pipelines.',
    features: ['High-Frequency Trading Bots', 'Automated Web Scrapers', 'Docker & Kubernetes Setup', 'Custom Desktop HUD Widgets'],
    deliverables: 'Executable Package + Documentation'
  }
];
