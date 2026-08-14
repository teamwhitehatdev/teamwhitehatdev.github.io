export interface AffiliateAdItem {
  id: string;
  brand: string;
  category: 'hardware' | 'creative' | 'education' | 'webdev' | 'security' | 'hosting';
  sizeType: 'hero' | 'medium' | 'skyscraper' | 'banner' | 'square' | 'mobile';
  width: number;
  height: number;
  clickUrl: string;
  imageUrl: string;
  pixelUrl?: string;
  iframeUrl?: string;
  title: string;
  description: string;
  badge: string;
}

export const ALL_AFFILIATE_ADS: AffiliateAdItem[] = [
  // LENOVO HARDWARE
  {
    id: 'lenovo-1200x628',
    brand: 'Lenovo',
    category: 'hardware',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://lenovo.36c4.net/c/5024116/1003008/4052',
    imageUrl: 'https://a.impactradius-go.com/display-ad/4052-1003008',
    pixelUrl: 'https://lenovo.36c4.net/i/5024116/1003008/4052',
    title: 'LENOVO THINKPAD & YOGA LAPTOPS (VA POWERHOUSES)',
    description: 'High-performance laptops engineered for Virtual Assistants, developers, and remote workstations.',
    badge: 'OFFICIAL LENOVO TECH'
  },
  {
    id: 'lenovo-300x250',
    brand: 'Lenovo',
    category: 'hardware',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://lenovo.36c4.net/c/5024116/242079/4052',
    imageUrl: 'https://a.impactradius-go.com/display-ad/4052-242079',
    pixelUrl: 'https://lenovo.36c4.net/i/5024116/242079/4052',
    title: 'LENOVO OFFICIAL STORE DEALS',
    description: 'Upgrade your freelancing workstation with high-speed processors & dual monitors.',
    badge: 'LENOVO DEALS'
  },
  {
    id: 'lenovo-1500x500',
    brand: 'Lenovo',
    category: 'hardware',
    sizeType: 'banner',
    width: 1500,
    height: 500,
    clickUrl: 'https://lenovotw.m768hc.net/c/5024116/591540/4076',
    imageUrl: 'https://a.impactradius-go.com/display-ad/4076-591540',
    pixelUrl: 'https://lenovotw.m768hc.net/i/5024116/591540/4076',
    title: 'LENOVO GLOBAL WORKSTATION SALE',
    description: 'Exclusive corporate hardware discounts for virtual assistants & IT agencies.',
    badge: 'EXCLUSIVE DISCOUNTS'
  },

  // CAPCUT CREATIVE VIDEO EDITOR
  {
    id: 'capcut-300x250',
    brand: 'CapCut',
    category: 'creative',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://capcutaffiliateprogram.pxf.io/c/5024116/3934178/22474',
    imageUrl: 'https://a.impactradius-go.com/display-ad/22474-3934178',
    pixelUrl: 'https://imp.pxf.io/i/5024116/3934178/22474',
    title: 'CAPCUT PRO VIDEO EDITOR FOR CONTENT CREATORS',
    description: 'Create viral TikToks, YouTube Shorts, and Instagram Reels for VA clients in minutes.',
    badge: 'CAPCUT PRO'
  },
  {
    id: 'capcut-900x750',
    brand: 'CapCut',
    category: 'creative',
    sizeType: 'square',
    width: 900,
    height: 750,
    clickUrl: 'https://capcutaffiliateprogram.pxf.io/c/5024116/2073402/22474',
    imageUrl: 'https://a.impactradius-go.com/display-ad/22474-2073402',
    pixelUrl: 'https://imp.pxf.io/i/5024116/2073402/22474',
    title: 'CAPCUT ALL-IN-ONE VIDEO SUITE',
    description: 'AI auto-captions, 4K video editing, and background removal tools for social media VAs.',
    badge: 'VIRAL VIDEO TOOLS'
  },
  {
    id: 'capcut-320x50',
    brand: 'CapCut',
    category: 'creative',
    sizeType: 'mobile',
    width: 320,
    height: 50,
    clickUrl: 'https://capcutaffiliateprogram.pxf.io/c/5024116/3934179/22474',
    imageUrl: 'https://a.impactradius-go.com/display-ad/22474-3934179',
    pixelUrl: 'https://imp.pxf.io/i/5024116/3934179/22474',
    title: 'CAPCUT MOBILE EDITOR',
    description: 'Edit videos on iOS & Android on-the-go.',
    badge: 'MOBILE EDITOR'
  },

  // CODEMONKEY CODING EDUCATION
  {
    id: 'codemonkey-300x250-a',
    brand: 'CodeMonkey',
    category: 'education',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://codemonkey.sjv.io/c/5024116/919026/12259',
    imageUrl: 'https://a.impactradius-go.com/display-ad/12259-919026',
    pixelUrl: 'https://imp.pxf.io/i/5024116/919026/12259',
    title: 'LEARN CODING WITH CODEMONKEY',
    description: 'Master Python, JavaScript, and game logic through interactive coding challenges.',
    badge: 'LEARN TO CODE'
  },
  {
    id: 'codemonkey-300x250-b',
    brand: 'CodeMonkey',
    category: 'education',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://codemonkey.sjv.io/c/5024116/919030/12259',
    imageUrl: 'https://a.impactradius-go.com/display-ad/12259-919030',
    pixelUrl: 'https://imp.pxf.io/i/5024116/919030/12259',
    title: 'CODEMONKEY KIDS & FREELANCER CODE ACADEMY',
    description: 'Fun, structured programming courses for future software engineers & technical VAs.',
    badge: 'CODING ACADEMY'
  },

  // ENVATO THEMEFOREST & CODECANYON
  {
    id: 'envato-300x600',
    brand: 'Envato',
    category: 'webdev',
    sizeType: 'skyscraper',
    width: 300,
    height: 600,
    clickUrl: 'https://1.envato.market/c/5024116/805521/4415?subId2=sidebar&subId1=jp_themeforest',
    imageUrl: 'https://a.impactradius-go.com/display-ad/4415-805521',
    pixelUrl: 'https://1.envato.market/i/5024116/805521/4415',
    title: 'ENVATO MARKET: THEMEFOREST & CODECANYON',
    description: 'Download premium WordPress themes, React templates, and PHP scripts to build client sites fast.',
    badge: 'PREMIUM TEMPLATES'
  },
  {
    id: 'envato-iframe-202',
    brand: 'Envato',
    category: 'webdev',
    sizeType: 'banner',
    width: 728,
    height: 90,
    clickUrl: 'https://1.envato.market/c/5024116/462704/4415',
    imageUrl: '',
    iframeUrl: '//a.impactradius-go.com/gen-ad-code/5024116/462704/4415/',
    title: 'ENVATO ELEMENTS UNLIMITED ASSETS',
    description: 'Get unlimited stock photos, video templates, graphics, and web code.',
    badge: 'UNLIMITED DOWNLOADS'
  },
  {
    id: 'envato-iframe-488',
    brand: 'Envato',
    category: 'webdev',
    sizeType: 'banner',
    width: 728,
    height: 90,
    clickUrl: 'https://1.envato.market/c/5024116/463883/4415',
    imageUrl: '',
    iframeUrl: '//a.impactradius-go.com/gen-ad-code/5024116/463883/4415/',
    title: 'THEMEFOREST WEBSITE BUILDER KIT',
    description: 'Over 50,000+ top-rated web templates for freelancers and developers.',
    badge: 'TOP RATED THEMES'
  },

  // COURSERA COURSES & CERTIFICATIONS
  {
    id: 'coursera-2400x600',
    brand: 'Coursera',
    category: 'education',
    sizeType: 'hero',
    width: 2400,
    height: 600,
    clickUrl: 'https://imp.i384100.net/c/5024116/3801376/14726',
    imageUrl: 'https://a.impactradius-go.com/display-ad/14726-3801376',
    pixelUrl: 'https://imp.pxf.io/i/5024116/3801376/14726',
    title: 'COURSERA GLOBAL PROFESSIONAL CERTIFICATES',
    description: 'Earn accredited certificates from Google, IBM, Meta, and Stanford to command $50+/hr VA rates.',
    badge: 'GLOBAL CERTIFICATES'
  },
  {
    id: 'coursera-600x1200',
    brand: 'Coursera',
    category: 'education',
    sizeType: 'skyscraper',
    width: 600,
    height: 1200,
    clickUrl: 'https://imp.i384100.net/c/5024116/3796114/14726',
    imageUrl: 'https://a.impactradius-go.com/display-ad/14726-3796114',
    pixelUrl: 'https://imp.pxf.io/i/5024116/3796114/14726',
    title: 'COURSERA CAREER PATHWAYS',
    description: 'Master Data Science, AI Engineering, and Project Management with top university partners.',
    badge: 'UNIVERSITY PARTNERS'
  },
  {
    id: 'coursera-1200x628',
    brand: 'Coursera',
    category: 'education',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://imp.i384100.net/c/5024116/1320983/14726',
    imageUrl: 'https://a.impactradius-go.com/display-ad/14726-1320983',
    pixelUrl: 'https://imp.pxf.io/i/5024116/1320983/14726',
    title: 'COURSERA FOR BUSINESS & FREELANCERS',
    description: 'Access 7,000+ courses, guided projects, and job-ready certificates.',
    badge: '7,000+ COURSES'
  },
  {
    id: 'coursera-1080x1080',
    brand: 'Coursera',
    category: 'education',
    sizeType: 'square',
    width: 1080,
    height: 1080,
    clickUrl: 'https://imp.i384100.net/c/5024116/1320987/14726',
    imageUrl: 'https://a.impactradius-go.com/display-ad/14726-1320987',
    pixelUrl: 'https://imp.pxf.io/i/5024116/1320987/14726',
    title: 'COURSERA INSTAGRAM LEARNING COMMUNITY',
    description: 'Upskill your Virtual Assistant agency with certified online learning programs.',
    badge: 'CERTIFIED LEARNING'
  },
  {
    id: 'coursera-prompt-eng',
    brand: 'Coursera',
    category: 'education',
    sizeType: 'medium',
    width: 300,
    height: 300,
    clickUrl: 'https://imp.i384100.net/c/5024116/1242836/14726?prodsku=crse%3AUOTYiyD0EfG7FAr_0R4SEQ&u=https%3A%2F%2Fwww.coursera.org%2Flearn%2Fprompt-engineering-chatgpt&intsrc=PUI2_9419',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/49/5498f61dd1425f9838911eaa25ae61/Prompt-Engineering-for-ChatGPT-1-.png?auto=format%2Ccompress&dpr=1&w=300&h=300&fit=crop',
    title: 'PROMPT ENGINEERING FOR CHATGPT (VANDERBILT UNIV)',
    description: 'Learn how to write high-level prompts for ChatGPT & LLMs to automate client workflows.',
    badge: 'AI PROMPT MASTERY'
  },
  {
    id: 'coursera-energy-harvest',
    brand: 'Coursera',
    category: 'education',
    sizeType: 'medium',
    width: 300,
    height: 300,
    clickUrl: 'https://imp.i384100.net/c/5024116/1242836/14726?prodsku=crse%3ANNNhqQrHEeuyHQ758rw-Yw&u=https%3A%2F%2Fwww.coursera.org%2Flearn%2Fenergy-harvesting&intsrc=PUI2_9419',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/ef/b589cb118f4237bb0c5eec9d52dbc3/Energy-Harvesting_1.jpg?auto=format%2Ccompress&dpr=1&w=300&h=300&fit=crop',
    title: 'ENERGY HARVESTING & HARDWARE TECH COURSE',
    description: 'Advanced technical electronics & energy harvesting systems course on Coursera.',
    badge: 'HARDWARE TECH'
  },

  // COREL CREATIVE SUITE
  {
    id: 'corel-300x250-a',
    brand: 'Corel',
    category: 'creative',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://corel.sjv.io/c/5024116/3809733/20119',
    imageUrl: 'https://a.impactradius-go.com/display-ad/20119-3809733',
    pixelUrl: 'https://imp.pxf.io/i/5024116/3809733/20119',
    title: 'COREL DRAW GRAPHICS SUITE',
    description: 'Professional vector illustration, layout, photo editing, and typography tools.',
    badge: 'CORELDRAW PRO'
  },
  {
    id: 'corel-300x250-b',
    brand: 'Corel',
    category: 'creative',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://corel.sjv.io/c/5024116/3809730/20119',
    imageUrl: 'https://a.impactradius-go.com/display-ad/20119-3809730',
    pixelUrl: 'https://imp.pxf.io/i/5024116/3809730/20119',
    title: 'PAINTSHOP PRO & VIDEOSTUDIO BY COREL',
    description: 'Create graphic designs, client logos, and promotional video ads with Corel Suite.',
    badge: 'PAINTSHOP SUITE'
  },

  // NORDVPN SECURITY
  {
    id: 'nordvpn-1200x628',
    brand: 'NordVPN',
    category: 'security',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://nordvpn.sjv.io/c/5024116/976014/7452',
    imageUrl: 'https://a.impactradius-go.com/display-ad/7452-976014',
    pixelUrl: 'https://nordvpn.sjv.io/i/5024116/976014/7452',
    title: 'NORDVPN ULTIMATE CYBERSECURITY & THREAT PROTECTION',
    description: 'Protect your freelance client data, secure public Wi-Fi connections, and bypass geo-blocks with 256-bit encryption.',
    badge: 'NORDVPN 68% OFF'
  },
  {
    id: 'nordvpn-768x1024',
    brand: 'NordVPN',
    category: 'security',
    sizeType: 'skyscraper',
    width: 768,
    height: 1024,
    clickUrl: 'https://nordvpn.sjv.io/c/5024116/3368951/7452',
    imageUrl: 'https://a.impactradius-go.com/display-ad/7452-3368951',
    pixelUrl: 'https://nordvpn.sjv.io/i/5024116/3368951/7452',
    title: 'NORDVPN TABLET & MOBILE CYBER SECURITY',
    description: 'Ultra-fast VPN connections with built-in malware blocking & password manager.',
    badge: 'CYBER SECURITY'
  },
  {
    id: 'nordvpn-260x450',
    brand: 'NordVPN',
    category: 'security',
    sizeType: 'skyscraper',
    width: 260,
    height: 450,
    clickUrl: 'https://nordvpn.sjv.io/c/5024116/512105/7452',
    imageUrl: 'https://a.impactradius-go.com/display-ad/7452-512105',
    pixelUrl: 'https://nordvpn.sjv.io/i/5024116/512105/7452',
    title: 'NORDVPN FREELANCER SAFETY SHIELD',
    description: 'Secures 10+ devices simultaneously for your entire remote team.',
    badge: '10 DEVICES SECURED'
  }
];
