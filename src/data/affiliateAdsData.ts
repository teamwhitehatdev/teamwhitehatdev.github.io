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
  // 1. HOSTINGER CLOUD HOSTING (IMPACT AFFILIATE BANNER)
  {
    id: 'hostinger-cloud-item',
    brand: 'Hostinger',
    category: 'hosting',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://hostinger.sjv.io/c/6215170/1822851/18485',
    imageUrl: './images/affiliates/hostinger-banner.jpg',
    title: 'Hostinger Cloud Hosting (75% OFF + Code: DPDCABINCEHM)',
    description: 'Fast, secure LiteSpeed web hosting with free domain registration, SSL certificates, and unmetered bandwidth.',
    badge: '75% OFF'
  },

  // 2. NORDVPN CYBERSECURITY (IMPACT AFFILIATE BANNER)
  {
    id: 'nordvpn-security-item',
    brand: 'NordVPN',
    category: 'security',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://nordvpn.sjv.io/c/5024116/976014/7452',
    imageUrl: './images/affiliates/nordvpn-banner.jpg',
    title: 'NordVPN 256-Bit Workstation Data Protection (68% OFF)',
    description: 'Shield client data with military-grade AES-256 encryption, malware protection, and double VPN.',
    badge: '68% OFF'
  },

  // 3. COURSERA GLOBAL CERTIFICATIONS (IMPACT AFFILIATE BANNER)
  {
    id: 'coursera-cert-item',
    brand: 'Coursera',
    category: 'education',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://imp.i384100.net/c/5024116/3801376/14726',
    imageUrl: './images/affiliates/coursera-banner.jpg',
    title: 'Coursera Professional Credentials from Google & Meta',
    description: 'Acquire accredited certificates in AI, Project Management, and Data Science to command $50+/hr rates.',
    badge: 'GLOBAL CERT'
  },

  // 4. WONDERSHARE VIRBO CREATIVE SUITE (IMPACT AFFILIATE BANNER)
  {
    id: 'wondershare-virbo-item',
    brand: 'Wondershare',
    category: 'creative',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://wondersharesoftware.pxf.io/c/5024116/2882021/15586',
    imageUrl: './images/affiliates/wondershare-virbo-banner.jpg',
    pixelUrl: 'https://imp.pxf.io/i/5024116/2882021/15586',
    title: 'Wondershare Virbo - AI Avatar & Deepfake Generator (65% OFF)',
    description: 'Generate hyper-realistic AI avatar spokesperson videos in 120+ languages. Essential for VAs & video creators.',
    badge: '65% OFF'
  },

  // 5. COREL DRAW GRAPHICS SUITE (IMPACT AFFILIATE BANNER)
  {
    id: 'coreldraw-graphics-item',
    brand: 'CorelDraw',
    category: 'creative',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://corel.sjv.io/c/5024116/3809733/20119',
    imageUrl: './images/affiliates/coreldraw-banner.jpg',
    title: 'CorelDraw Graphics Suite — Vector Illustration & Layout',
    description: 'Professional graphic design software suite for vector illustration, layout, photo editing, and typography.',
    badge: 'PRO DESIGN'
  },

  // 6. ENVATO THEMEFOREST TEMPLATES (IMPACT AFFILIATE BANNER)
  {
    id: 'envato-themeforest-item',
    brand: 'Envato',
    category: 'webdev',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://1.envato.market/c/5024116/805521/4415',
    imageUrl: './images/affiliates/envato-banner.jpg',
    title: 'Envato ThemeForest — 50,000+ Premium Web Templates',
    description: 'Explore world-class WordPress themes, HTML5 templates, landing page designs, and web UI components.',
    badge: 'CREATIVE ASSETS'
  },

  // 7. TEMU HARDWARE DEAL (IMPACT AFFILIATE BANNER)
  {
    id: 'temu-dvd-burner-item',
    brand: 'TEMU',
    category: 'hardware',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://temuaffiliateprogram.pxf.io/c/5024116/2039016/18350?prodsku=17592404914587&u=https%3A%2F%2Fwww.temu.com%2Fmy%2Fgoods.html%3F_bg_fs%3D1%26_p_jump_id%3D651%26_x_vst_scene%3Dadg%26goods_id%3D601099562958380%26sku_id%3D17592404914587%26_oak_adg_ctx%3Da-b1741b47%26_x_ns_catalog_id%3D17358%26_x_ns_gid%3D601099562958380%26_x_ns_product_id%3D17592404914587%26_x_ns_site_id%3D126&intsrc=PUI2_17358',
    imageUrl: 'https://img.kwcdn.com/product/fancy/817dd41d-fdee-491f-982e-63f9589eb14a.jpg',
    title: 'TEMU External CD/DVD Drive USB 2.0 Slim Portable Burner',
    description: 'TEMU External Cd Dvd, Usb 2.0 Slim Protable External Cd-rw Dvd-rw Burner For Laptop Notebook Pc Desktop Computer.',
    badge: 'HARDWARE DEAL'
  }
];
