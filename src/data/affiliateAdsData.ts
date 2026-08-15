export interface AffiliateAdItem {
  id: string;
  brand: string;
  category: 'hardware' | 'creative' | 'education' | 'webdev' | 'security' | 'hosting';
  sizeType: 'hero' | 'medium' | 'skyscraper' | 'banner' | 'square' | 'mobile';
  width: number;
  height: number;
  clickUrl: string;
  imageUrl?: string;
  pixelUrl?: string;
  iframeUrl?: string;
  title: string;
  description: string;
  badge: string;
}

export const ALL_AFFILIATE_ADS: AffiliateAdItem[] = [
  // WONDERSHARE FILMORA & CREATIVE SUITE
  {
    id: 'wondershare-virbo-65off',
    brand: 'Wondershare',
    category: 'creative',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://wondersharesoftware.pxf.io/c/5024116/2882021/15586',
    pixelUrl: 'https://imp.pxf.io/i/5024116/2882021/15586',
    title: 'Wondershare Virbo - AI Avatar & Deepfake Generator (65% OFF)',
    description: 'Generate hyper-realistic AI avatar spokesperson videos in 120+ languages. Essential for VAs & video creators.',
    badge: '65% OFF SPECIAL'
  },
  {
    id: 'wondershare-filmora-300x250',
    brand: 'Wondershare',
    category: 'creative',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://wondersharesoftware.pxf.io/c/5024116/1485636/15586',
    imageUrl: 'https://a.impactradius-go.com/display-ad/15586-1485636',
    pixelUrl: 'https://imp.pxf.io/i/5024116/1485636/15586',
    title: 'Wondershare Filmora 13 AI Video Editor',
    description: 'Smart AI cutout, motion tracking, auto reframe, & 1000+ templates for YouTube & TikTok reels.',
    badge: 'OFFICIAL WONDERSHARE'
  },
  {
    id: 'wondershare-video-728x90',
    brand: 'Wondershare',
    category: 'creative',
    sizeType: 'banner',
    width: 728,
    height: 90,
    clickUrl: 'https://wondersharesoftware.pxf.io/c/5024116/1315405/15586',
    imageUrl: 'https://a.impactradius-go.com/display-ad/15586-1315405',
    pixelUrl: 'https://imp.pxf.io/i/5024116/1315405/15586',
    title: 'Wondershare AI Video Creator Suite',
    description: 'Complete AI video editing, screen recording, & motion graphics toolkit.',
    badge: 'FEATURED DEAL'
  },
  {
    id: 'wondershare-pdfelement-600x480',
    brand: 'Wondershare',
    category: 'creative',
    sizeType: 'hero',
    width: 600,
    height: 480,
    clickUrl: 'https://wondersharesoftware.pxf.io/c/5024116/3801344/15586',
    imageUrl: 'https://a.impactradius-go.com/display-ad/15586-3801344',
    pixelUrl: 'https://imp.pxf.io/i/5024116/3801344/15586',
    title: 'PDFelement Pro - Document Suite (Up to 42% OFF)',
    description: 'Edit, sign, OCR, & convert PDF documents effortlessly for Virtual Assistant workflows.',
    badge: '42% OFF PROMO'
  },
  {
    id: 'wondershare-pdfelement-160x600',
    brand: 'Wondershare',
    category: 'creative',
    sizeType: 'skyscraper',
    width: 160,
    height: 600,
    clickUrl: 'https://wondersharesoftware.pxf.io/c/5024116/3801341/15586',
    imageUrl: 'https://a.impactradius-go.com/display-ad/15586-3801341',
    pixelUrl: 'https://imp.pxf.io/i/5024116/3801341/15586',
    title: 'PDFelement PDF Editor',
    description: 'All-in-one PDF converter & e-signature solution for remote freelancers.',
    badge: 'PDF PROMO'
  },
  {
    id: 'wondershare-shopping-portal',
    brand: 'Wondershare',
    category: 'creative',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://wondersharesoftware.pxf.io/c/5024116/1266881/15586',
    pixelUrl: 'https://imp.pxf.io/i/5024116/1266881/15586',
    title: 'Wondershare Official Software Store',
    description: 'Explore Filmora, Virbo, PDFelement, & Media.io with official partner discounts.',
    badge: 'OFFICIAL STORE'
  },
  {
    id: 'mediaio-photo-30off',
    brand: 'Media.io',
    category: 'creative',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://wondersharesoftware.pxf.io/c/5024116/2135551/15586',
    pixelUrl: 'https://imp.pxf.io/i/5024116/2135551/15586',
    title: 'Media.io AI Photo & Passport Studio (30% OFF)',
    description: 'Generate pro AI corporate headshots & background removal for LinkedIn profiles.',
    badge: '30% OFF SPECIAL'
  },

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
    description: 'Upgrade your freelancing workstation with high-speed processors & dual monitor setups.',
    badge: 'OFFICIAL LENOVO'
  }
];
