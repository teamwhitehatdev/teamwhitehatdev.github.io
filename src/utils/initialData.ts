export interface AppProject {
  id: string;
  title: string;
  category: 'playstore' | 'ios' | 'webapp' | 'enterprise';
  description: string;
  longDescription: string;
  downloads: string;
  rating: number;
  imageUrl: string;
  techStack: string[];
  playStoreUrl?: string;
  appStoreUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface ShopProduct {
  id: string;
  title: string;
  category: 
    | 'digital_arts' 
    | 'website_templates' 
    | 'app_templates' 
    | '3d_models' 
    | 'hacking_layouts' 
    | 'hud_packages' 
    | 'stream_packages' 
    | 'merchandise' 
    | 'stickers' 
    | 'automation_systems' 
    | 'game_projects' 
    | 'game_environments' 
    | 'python_systems' 
    | 'nfts';
  price: number;
  rating: number;
  salesCount: number;
  imageUrl: string;
  description: string;
  deliveryType: 'instant_download' | 'email_transfer' | 'physical_shipping';
  deliveryTime: string;
  features: string[];
  inStock: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  price: number;
  priceType: 'fixed' | 'hourly' | 'monthly_retainer';
  deliveryDays: number;
  description: string;
  features: string[];
  iconName: string;
}

export interface CourseItem {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Masterclass';
  duration: string;
  price: number;
  rating: number;
  studentsCount: number;
  imageUrl: string;
  description: string;
  modules: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  country: string;
}

export interface BrandSponsor {
  name: string;
  logo: string;
  tier: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  description: string;
}

export const INITIAL_APPS: AppProject[] = [
  {
    id: 'app-cybernotes',
    title: 'Cybernotes.apk - Encrypted Security Vault',
    category: 'playstore',
    description: 'Ultra-secure encrypted cyber notes app published on Google Play Store with military-grade AES-256 encryption.',
    longDescription: 'Cybernotes.apk is a state-of-the-art mobile security application built with React Native and custom Native C++ modules. Features biometric authentication, dynamic matrix themes, and instant zero-knowledge cloud backup.',
    downloads: '500,000+',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    techStack: ['Android APK', 'React Native', 'C++ FFI', 'AES-256', 'HUD Theme Engine'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.whitehat.cybernotes',
    appStoreUrl: 'https://apps.apple.com/app/cybernotes-vault/id123456789',
    featured: true
  },
  {
    id: 'app-sentinel-web',
    title: 'WhiteHat Sentinel Web Security Suite',
    category: 'webapp',
    description: 'Enterprise web application vulnerability scanner and real-time firewall telemetry matrix dashboard.',
    longDescription: 'High-performance WebAssembly powered vulnerability scanner that audits web applications, REST APIs, and Cloud configurations in real-time.',
    downloads: '120,000+',
    rating: 4.95,
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    techStack: ['React', 'TypeScript', 'WebAssembly', 'Node.js', 'TailwindCSS'],
    liveUrl: 'https://whitehatdev.github.io/sentinel',
    featured: true
  },
  {
    id: 'app-nexus-stream',
    title: 'Nexus Stream HUD Studio',
    category: 'playstore',
    description: 'Android & Web mobile app for live streamers to display custom animated cyber HUD overlays and widgets.',
    longDescription: 'Control streaming overlays, audio visualizers, subscriber alerts, and chat bots directly from an Android tablet or smartphone.',
    downloads: '250,000+',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    techStack: ['Android Native', 'Kotlin', 'WebSockets', 'Canvas API'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.whitehat.streamhud',
    featured: true
  },
  {
    id: 'app-quantum-ide',
    title: 'Quantum Code AI IDE',
    category: 'enterprise',
    description: 'Futuristic code editor with built-in AI assistant and automated Python tool compiler.',
    longDescription: 'Next-gen desktop and mobile developer environment with automated code generation, linting, and 1-click cloud deployments.',
    downloads: '80,000+',
    rating: 4.88,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    techStack: ['Electron', 'React', 'Python', 'LLM API', 'Cyber UI'],
    liveUrl: 'https://whitehatdev.github.io/quantum-ide',
    featured: false
  }
];

export const INITIAL_PRODUCTS: ShopProduct[] = [
  {
    id: 'prod-art-01',
    title: 'Cyberpunk Metropolis 8K Vector Pack',
    category: 'digital_arts',
    price: 49,
    rating: 5.0,
    salesCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    description: '50+ high-resolution futuristic cyber city scenes, vector assets, neon signs, and glowing HUD backdrops.',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Digital Download',
    features: ['8K Resolution (.PNG/.SVG/.AI)', 'Commercial License Included', 'Fully Layered Vector Paths', 'Free Lifetime Updates'],
    inStock: true
  },
  {
    id: 'prod-tpl-web-01',
    title: 'Cyber-SaaS Next.js 14 Production Template',
    category: 'website_templates',
    price: 99,
    rating: 4.95,
    salesCount: 520,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'Complete high-tech SaaS landing page template with authentication, Stripe/PayPal checkout, and cyber dark theme.',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Download & GitHub Repo Access',
    features: ['Next.js 14 App Router', 'TypeScript & TailwindCSS', 'PayPal & Stripe Checkout Integrated', 'SEO Optimized'],
    inStock: true
  },
  {
    id: 'prod-tpl-app-01',
    title: 'Flutter Cybernotes Mobile App Full Source Code',
    category: 'app_templates',
    price: 149,
    rating: 4.9,
    salesCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    description: 'Ready-to-publish Android & iOS encrypted note-taking app. Upload directly to Google Play Console!',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Code Download',
    features: ['Cross-platform iOS & Android', 'AES-256 Encryption', 'Google Play Store Ready', 'Detailed Setup Video'],
    inStock: true
  },
  {
    id: 'prod-3d-01',
    title: 'Sci-Fi Hacker Workstation 3D Asset Kit',
    category: '3d_models',
    price: 79,
    rating: 4.85,
    salesCount: 180,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    description: 'Low-poly & high-poly 3D models of cyber monitors, servers, holographic terminals, and hacker gear.',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Digital Download',
    features: ['FBX, OBJ, BLEND formats', '4K PBR Textures', 'Unity & Unreal Engine Ready', 'Optimized Polygon Topology'],
    inStock: true
  },
  {
    id: 'prod-hack-01',
    title: 'Matrix Terminal UI & Hacking Interface Kit',
    category: 'hacking_layouts',
    price: 39,
    rating: 4.98,
    salesCount: 640,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    description: 'Interactive HTML/CSS/JS hacking UI component library with code typers, node graph visualizers, and command prompts.',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Digital Download',
    features: ['Vanilla JS + React Components', 'Web Audio SFX Synthesizer', '20+ HUD Reticles & Gauges', 'Fully Customizable'],
    inStock: true
  },
  {
    id: 'prod-hud-01',
    title: 'Tactical Sci-Fi HUD Vector Overlays Pack',
    category: 'hud_packages',
    price: 59,
    rating: 5.0,
    salesCount: 410,
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    description: 'Over 100+ SVG vector HUD elements: targeting reticles, radar sweeps, health bars, coordinate panels, and sci-fi frames.',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Digital Download',
    features: ['100+ SVG / EPS Vectors', 'Transparent PNG Overlays', 'Animated GIF & MP4 Loops', 'Royalty-Free Commercial License'],
    inStock: true
  },
  {
    id: 'prod-stream-01',
    title: 'Cyberpunk Twitch & OBS Stream Overlay Package',
    category: 'stream_packages',
    price: 45,
    rating: 4.9,
    salesCount: 380,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    description: 'Complete stream graphics kit: animated camera borders, stream starting soon scenes, chat box HUD, and alert sounds.',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Download & OBS Import',
    features: ['OBS & Streamlabs 1-Click Import', 'Animated WebM overlays', 'Includes Custom Audio SFX', 'Matching Stinger Transition'],
    inStock: true
  },
  {
    id: 'prod-merch-01',
    title: 'TEAM WHITE HAT Official Cyber Hoodie',
    category: 'merchandise',
    price: 69,
    rating: 4.95,
    salesCount: 290,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    description: 'Premium heavyweight cotton cyberpunk hoodie with embroidered White Hat logo and glowing reactive neon ink.',
    deliveryType: 'physical_shipping',
    deliveryTime: '7 - 15 Days Worldwide Courier Tracked',
    features: ['100% Organic Heavy Cotton', 'Embroidered Cyber Crest', 'Free Worldwide Express Shipping', 'Includes Hacker Patch Kit'],
    inStock: true
  },
  {
    id: 'prod-sticker-01',
    title: 'White Hat Developer Holographic Sticker Pack (10 Pcs)',
    category: 'stickers',
    price: 19,
    rating: 4.88,
    salesCount: 850,
    imageUrl: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=800&q=80',
    description: 'Durable waterproof vinyl stickers featuring hacker memes, cyber notes icons, and tech quotes for laptops.',
    deliveryType: 'physical_shipping',
    deliveryTime: '7 - 15 Days Worldwide Courier Tracked',
    features: ['Waterproof & Sun-Resistant Vinyl', 'Holographic Neon Finish', '10 Unique Cyber Designs', 'Free International Airmail'],
    inStock: true
  },
  {
    id: 'prod-auto-01',
    title: 'Automated Web Traffic & Lead Generation Project',
    category: 'automation_systems',
    price: 199,
    rating: 4.9,
    salesCount: 140,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    description: 'Complete Python + Node.js automation bot that monitors web metrics, captures leads, and automates email responses.',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Code Download',
    features: ['Multi-threaded Python Engine', 'Safe Rate-Limiting & Proxy Rotation', 'Web Dashboard Included', 'Zero Ban Risk Architecture'],
    inStock: true
  },
  {
    id: 'prod-game-01',
    title: 'Cyberpunk Runner 3D Unity Android Game Source',
    category: 'game_projects',
    price: 249,
    rating: 4.96,
    salesCount: 95,
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
    description: 'Full Unity 3D endless runner game with AdMob monetization integrated. Ready for Google Play Console submission.',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Unity Project Download',
    features: ['Unity 2023 Long Term Support', 'Google Play Game Services Ready', 'Integrated AdMob & In-App Purchases', 'Full Sound Track & SFX'],
    inStock: true
  },
  {
    id: 'prod-env-01',
    title: 'Sci-Fi Cyberpunk City Street 3D Environment Pack',
    category: 'game_environments',
    price: 129,
    rating: 4.92,
    salesCount: 160,
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    description: 'Photorealistic modular 3D city street assets with PBR textures, rain shaders, and volumetric neon lighting.',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Digital Download',
    features: ['Modular Buildings & Roadways', 'Unreal Engine 5 & Unity Packages', '4K Texture Maps', 'Night & Rain Lighting Presets'],
    inStock: true
  },
  {
    id: 'prod-py-01',
    title: 'WhiteHat Pentest & Security Audit Toolkit v4',
    category: 'python_systems',
    price: 179,
    rating: 5.0,
    salesCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    description: 'Advanced Python command-line and GUI suite for automated web server auditing, SSL checks, and port telemetry.',
    deliveryType: 'instant_download',
    deliveryTime: 'Instant Python Script Download',
    features: ['Python 3.10+ Async Engine', 'Generates HTML & PDF Audit Reports', 'Cross-Platform Windows/Linux/macOS', 'Detailed User Documentation'],
    inStock: true
  },
  {
    id: 'prod-nft-01',
    title: 'Genesis White Hat Founder Badge #001 (NFT)',
    category: 'nfts',
    price: 299,
    rating: 5.0,
    salesCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    description: 'Exclusive 1-of-1 digital cryptographic collectible granting lifetime VIP access to all future web/app releases.',
    deliveryType: 'email_transfer',
    deliveryTime: 'Direct Web3 Wallet Transfer (within 24 hours)',
    features: ['100% Unique Blockchain Token', 'Grants 50% Off All Future Store Purchases', 'Direct Discord VIP Role', 'Signed Digital Certificate'],
    inStock: true
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-va-retainer',
    title: 'Dedicated Cyber Virtual Assistant & Developer Support',
    tagline: 'Your personal elite developer for daily maintenance, updates, and tech assistance.',
    price: 499,
    priceType: 'monthly_retainer',
    deliveryDays: 30,
    description: 'Full-time or part-time technical virtual assistant to manage your web application, fix bugs, deploy updates, optimize performance, and answer client queries.',
    features: [
      '24/7 Priority Discord & Telegram Support',
      'Daily Web & Mobile App Maintenance',
      'Custom Python Scripting & Automation',
      'Emergency Bug Fixes within 2 Hours',
      'Google Play Console & App Store Release Management'
    ],
    iconName: 'UserCheck'
  },
  {
    id: 'srv-fullstack-web',
    title: 'Custom Full-Stack Web Application Engineering',
    tagline: 'High-end, responsive, cyberpunk or modern web platform tailored for your business.',
    price: 1499,
    priceType: 'fixed',
    deliveryDays: 14,
    description: 'From wireframes to production release on custom domains or GitHub Pages. Includes full backend API, database setup, theme engine, and SEO optimization.',
    features: [
      'Modern React / Next.js / Vite Stack',
      'Custom HUD & Cyberpunk UI/UX Design System',
      'PayPal / Stripe E-Commerce Integration',
      'Admin Portal & Data Management Dashboard',
      '100% Responsive for All Screen Sizes'
    ],
    iconName: 'Globe'
  },
  {
    id: 'srv-mobile-app',
    title: 'Android & iOS Cross-Platform Mobile App Development',
    tagline: 'Complete mobile app published directly to Google Play Store & Apple App Store.',
    price: 2499,
    priceType: 'fixed',
    deliveryDays: 21,
    description: 'Turn your app vision into reality. We design, code, test, and publish your mobile app to Google Play Store and Apple App Store with full source code ownership.',
    features: [
      'React Native / Flutter Cross-Platform Engine',
      'Native C++ Encryption & Fast Performance',
      'Push Notifications & Cloud Database Sync',
      'Google Play Console Submission Included',
      '6 Months Free Post-Launch Maintenance'
    ],
    iconName: 'Smartphone'
  },
  {
    id: 'srv-security-audit',
    title: 'Cybersecurity Audit & Codebase Hardening',
    tagline: 'Protect your web app, API, and cloud databases from hacker attacks.',
    price: 899,
    priceType: 'fixed',
    deliveryDays: 5,
    description: 'Comprehensive security vulnerability assessment, penetration test simulation, SSL configuration, and source code fortification.',
    features: [
      'OWASP Top 10 Vulnerability Scan',
      'API & Database Injection Prevention',
      'Detailed Audit Report with Remediation Code',
      'SSL/TLS & Firewall Hardening',
      'Anti-Bot & Anti-DDOS Setup'
    ],
    iconName: 'ShieldCheck'
  }
];

export const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'course-web-dev',
    title: 'Full-Stack Cyberpunk Web Development Masterclass',
    level: 'Masterclass',
    duration: '24 Hours Video Content',
    price: 99,
    rating: 4.97,
    studentsCount: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    description: 'Learn to build world-class sci-fi animated websites, HUD vector engines, Web Audio synthesizers, and PayPal store backends from scratch.',
    modules: [
      'Module 1: Modern HTML5, CSS Glassmorphism & Cyberpunk Design Systems',
      'Module 2: Advanced React, TypeScript & Vite Single Page Apps',
      'Module 3: Web Audio API - Synthesizing Futuristic Sound FX',
      'Module 4: Canvas Matrix Rain & Animated HUD Backgrounds',
      'Module 5: Admin Portals, PayPal Checkout & GitHub Pages Deployment'
    ]
  },
  {
    id: 'course-mobile-dev',
    title: 'Android & iOS Mobile App Dev with React Native & Flutter',
    level: 'Intermediate',
    duration: '18 Hours Video Content',
    price: 129,
    rating: 4.94,
    studentsCount: 980,
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    description: 'Master mobile app engineering, build apps like Cybernotes.apk, and publish step-by-step to Google Play Console.',
    modules: [
      'Module 1: Mobile Architecture & State Management',
      'Module 2: Building Cybernotes.apk - Native Encryption & SQLite Storage',
      'Module 3: PWA & Trusted Web Activity (TWA) Wrappers',
      'Module 4: Google Play Console Developer Account Setup & APK Submission',
      'Module 5: Monetization with In-App Purchases & AdMob'
    ]
  },
  {
    id: 'course-python-auto',
    title: 'Python Automation & Cybersecurity Tools Engineering',
    level: 'Intermediate',
    duration: '15 Hours Video Content',
    price: 79,
    rating: 4.98,
    studentsCount: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    description: 'Write professional Python scripts for automated web scraping, system monitoring, security telemetry, and task automation.',
    modules: [
      'Module 1: Async Python & Network Socket Fundamentals',
      'Module 2: Automated Web Scraping & Lead Capture Bots',
      'Module 3: Building Custom Security Telemetry Toolkits',
      'Module 4: Packaging Python Scripts into Standalone Executables',
      'Module 5: Safe Social Media Analytics & Traffic Driver Scripts'
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    role: 'CTO & Co-Founder',
    company: 'Vance CyberTech LLC',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    content: 'Team White Hat built our web application in less than 2 weeks. The Cyberpunk HUD layout and neon animations completely blew our investors away! 100% recommended.',
    rating: 5,
    country: 'United States'
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'Lead Mobile Product Manager',
    company: 'AeroGames Studio',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80',
    content: 'Bought the Flutter Mobile App template and Android Runner game project. The code was exceptionally clean and published seamlessly to Google Play Console!',
    rating: 5,
    country: 'Germany'
  },
  {
    id: 'test-3',
    name: 'Hiroshi Tanaka',
    role: 'Cybersecurity Consultant',
    company: 'NeoTokyo Digital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    content: 'Hired White Hat Dev as our Virtual Assistant and technical consultant. His python security tools and automated site monitoring saved us hundreds of hours!',
    rating: 5,
    country: 'Japan'
  }
];

export const INITIAL_BRANDS: BrandSponsor[] = [
  { name: 'Google Play Console', logo: '🌐', tier: 'App Partner' },
  { name: 'Apple App Store', logo: '📱', tier: 'Mobile Partner' },
  { name: 'GitHub Enterprise', logo: '⚡', tier: 'Code Sponsor' },
  { name: 'PayPal Commerce', logo: '💳', tier: 'Payment Partner' },
  { name: 'Python Software Foundation', logo: '🐍', tier: 'Tech Partner' },
  { name: 'CyberSec Global', logo: '🛡️', tier: 'Security Partner' }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Cybernotes.apk Android Play Store Interface',
    category: 'Mobile Apps',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    date: '2026-05-14',
    description: 'High-tech encrypted note-taking layout designed for mobile devices.'
  },
  {
    id: 'gal-2',
    title: 'WhiteHat Sentinel Hacker HUD Telemetry Panel',
    category: 'Web Applications',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    date: '2026-06-20',
    description: 'Real-time security telemetry dashboard with glowing cyber vectors.'
  },
  {
    id: 'gal-3',
    title: 'Nexus Stream HUD Overlay Vector System',
    category: 'HUD Layouts',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    date: '2026-07-02',
    description: 'Custom OBS stream overlay layout with interactive gauges and radar reticles.'
  },
  {
    id: 'gal-4',
    title: 'Cyberpunk Metropolis 3D City Wireframe',
    category: '3D & Digital Arts',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    date: '2026-07-28',
    description: 'Volumetric 3D city environment with neon atmospheric lighting.'
  }
];
