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
  rawHtml?: string;
  title: string;
  description: string;
  badge: string;
}

export const ALL_AFFILIATE_ADS: AffiliateAdItem[] = [
  // ==========================================
  // 1. WONDERSHARE VIRBO AI SUITE (IMPACT.COM / pxf.io)
  // ==========================================
  {
    id: 'wondershare-virbo-hero',
    brand: 'Wondershare Virbo',
    category: 'creative',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://wondersharesoftware.pxf.io/c/5024116/2882021/15586',
    imageUrl: './images/affiliates/wondershare-virbo-banner.jpg',
    pixelUrl: 'https://imp.pxf.io/i/5024116/2882021/15586',
    rawHtml: '<h3 id="2882021"><a rel="sponsored" href="https://wondersharesoftware.pxf.io/c/5024116/2882021/15586">Wondershare Virbo - Deepfake Maker Yearly 65% OFF</a></h3><img height="0" width="0" src="https://imp.pxf.io/i/5024116/2882021/15586" style="position:absolute;visibility:hidden;" border="0" />',
    title: 'Wondershare Virbo — AI Avatar & Spokesperson Generator (65% OFF)',
    description: 'Generate hyper-realistic AI spokesperson videos in 120+ languages for YouTube, TikTok, and corporate training.',
    badge: '65% OFF YEARLY'
  },
  {
    id: 'wondershare-virbo-medium',
    brand: 'Wondershare Virbo',
    category: 'creative',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://wondersharesoftware.pxf.io/c/5024116/2882021/15586',
    imageUrl: './images/affiliates/wondershare-virbo-banner.jpg',
    pixelUrl: 'https://imp.pxf.io/i/5024116/2882021/15586',
    title: 'Wondershare Virbo AI Video Suite',
    description: 'Text-to-video AI script generator & realistic avatar presenter.',
    badge: 'EXCLUSIVE DEAL'
  },

  // ==========================================
  // 2. TEMU HARDWARE & ELECTRONICS (IMPACT.COM / pxf.io)
  // ==========================================
  {
    id: 'temu-dvd-burner-hero',
    brand: 'TEMU Hardware',
    category: 'hardware',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://temuaffiliateprogram.pxf.io/c/5024116/2039016/18350?prodsku=17592404914587&u=https%3A%2F%2Fwww.temu.com%2Fmy%2Fgoods.html%3F_bg_fs%3D1%26_p_jump_id%3D651%26_x_vst_scene%3Dadg%26goods_id%3D601099562958380%26sku_id%3D17592404914587%26_oak_adg_ctx%3Da-b1741b47%26_x_ns_catalog_id%3D17358%26_x_ns_gid%3D601099562958380%26_x_ns_product_id%3D17592404914587%26_x_ns_site_id%3D126&intsrc=PUI2_17358',
    imageUrl: 'https://img.kwcdn.com/product/fancy/817dd41d-fdee-491f-982e-63f9589eb14a.jpg',
    rawHtml: '<a id="17592404914587" href="https://temuaffiliateprogram.pxf.io/c/5024116/2039016/18350?prodsku=17592404914587&u=https%3A%2F%2Fwww.temu.com%2Fmy%2Fgoods.html%3F_bg_fs%3D1%26_p_jump_id%3D651%26_x_vst_scene%3Dadg%26goods_id%3D601099562958380%26sku_id%3D17592404914587%26_oak_adg_ctx%3Da-b1741b47%26_x_ns_catalog_id%3D17358%26_x_ns_gid%3D601099562958380%26_x_ns_product_id%3D17592404914587%26_x_ns_site_id%3D126&intsrc=PUI2_17358" target="_top"><img src="https://img.kwcdn.com/product/fancy/817dd41d-fdee-491f-982e-63f9589eb14a.jpg" border="0" alt=""/></a>',
    title: 'TEMU External CD/DVD Drive USB 2.0 Slim Portable Burner',
    description: 'Slim portable optical burner for laptops, notebooks, desktop PCs, and work stations.',
    badge: 'HARDWARE PROMO'
  },
  {
    id: 'temu-dvd-burner-medium',
    brand: 'TEMU Hardware',
    category: 'hardware',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://temuaffiliateprogram.pxf.io/c/5024116/2039016/18350?prodsku=17592404914587&u=https%3A%2F%2Fwww.temu.com%2Fmy%2Fgoods.html%3F_bg_fs%3D1%26_p_jump_id%3D651%26_x_vst_scene%3Dadg%26goods_id%3D601099562958380%26sku_id%3D17592404914587%26_oak_adg_ctx%3Da-b1741b47%26_x_ns_catalog_id%3D17358%26_x_ns_gid%3D601099562958380%26_x_ns_product_id%3D17592404914587%26_x_ns_site_id%3D126&intsrc=PUI2_17358',
    imageUrl: 'https://img.kwcdn.com/product/fancy/817dd41d-fdee-491f-982e-63f9589eb14a.jpg',
    title: 'TEMU USB 2.0 External Burner',
    description: 'Plug-and-play USB 2.0 CD-RW DVD-RW optical drive.',
    badge: 'BEST SELLER'
  },

  // ==========================================
  // 3. HOSTINGER CLOUD HOSTING (IMPACT.COM / sjv.io)
  // ==========================================
  {
    id: 'hostinger-cloud-hero',
    brand: 'Hostinger',
    category: 'hosting',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://hostinger.sjv.io/c/6215170/1822851/18485',
    imageUrl: './images/affiliates/hostinger-banner.jpg',
    title: 'Hostinger Cloud Hosting — 75% OFF + Code: DPDCABINCEHM',
    description: 'Fast, secure LiteSpeed web hosting with free SSL, unmetered bandwidth, free domain, and 24/7 priority support.',
    badge: '75% OFF + CODE'
  },
  {
    id: 'hostinger-cloud-medium',
    brand: 'Hostinger',
    category: 'hosting',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://hostinger.sjv.io/c/6215170/1822851/18485',
    imageUrl: './images/affiliates/hostinger-banner.jpg',
    title: 'Hostinger Cloud Web Hosting',
    description: 'LiteSpeed infrastructure with free custom domain registration.',
    badge: '75% DISCOUNT'
  },
  {
    id: 'hostinger-cloud-banner',
    brand: 'Hostinger',
    category: 'hosting',
    sizeType: 'banner',
    width: 728,
    height: 90,
    clickUrl: 'https://hostinger.sjv.io/c/6215170/1822851/18485',
    imageUrl: './images/affiliates/hostinger-banner.jpg',
    title: 'Hostinger Web Hosting (75% OFF)',
    description: 'Claim Hostinger Cloud hosting starting at $2.99/mo.',
    badge: 'SPECIAL PROMO'
  },

  // ==========================================
  // 4. NORDVPN CYBERSECURITY (IMPACT.COM / sjv.io)
  // ==========================================
  {
    id: 'nordvpn-security-hero',
    brand: 'NordVPN',
    category: 'security',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://nordvpn.sjv.io/c/5024116/976014/7452',
    imageUrl: './images/affiliates/nordvpn-banner.jpg',
    title: 'NordVPN 256-Bit Cyber Security (68% OFF + 3 Months Free)',
    description: 'Shield client data with military-grade AES-256 encryption, malware protection, Threat Protection, and double VPN.',
    badge: '68% OFF PROMO'
  },
  {
    id: 'nordvpn-security-medium',
    brand: 'NordVPN',
    category: 'security',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://nordvpn.sjv.io/c/5024116/976014/7452',
    imageUrl: './images/affiliates/nordvpn-banner.jpg',
    title: 'NordVPN Workstation Protection',
    description: 'Secure passwords, files, and remote client connections.',
    badge: '68% DISCOUNT'
  },

  // ==========================================
  // 5. COURSERA GLOBAL CERTIFICATIONS (IMPACT.COM / imp.i384100.net)
  // ==========================================
  {
    id: 'coursera-cert-hero',
    brand: 'Coursera',
    category: 'education',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://imp.i384100.net/c/5024116/3801376/14726',
    imageUrl: './images/affiliates/coursera-banner.jpg',
    title: 'Coursera Accredited Professional Credentials (Google & Meta)',
    description: 'Acquire accredited certificates in AI, Project Management, and Data Science to command $50+/hr rates.',
    badge: 'GLOBAL CERT'
  },
  {
    id: 'coursera-cert-medium',
    brand: 'Coursera',
    category: 'education',
    sizeType: 'medium',
    width: 300,
    height: 250,
    clickUrl: 'https://imp.i384100.net/c/5024116/3801376/14726',
    imageUrl: './images/affiliates/coursera-banner.jpg',
    title: 'Coursera Tech & Business Credentials',
    description: '7,000+ courses from Google, IBM, Stanford, and Meta.',
    badge: 'UP-SKILL NOW'
  },

  // ==========================================
  // 6. COREL DRAW GRAPHICS SUITE (IMPACT.COM / sjv.io)
  // ==========================================
  {
    id: 'coreldraw-graphics-hero',
    brand: 'CorelDraw',
    category: 'creative',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://corel.sjv.io/c/5024116/3809733/20119',
    imageUrl: './images/affiliates/coreldraw-banner.jpg',
    title: 'CorelDraw Graphics Suite — Vector Illustration & Typography',
    description: 'Professional vector illustration, layout, photo editing, and typography software suite for creative freelancers.',
    badge: 'PRO SUITE'
  },

  // ==========================================
  // 7. ENVATO THEMEFOREST TEMPLATES (IMPACT.COM / 1.envato.market)
  // ==========================================
  {
    id: 'envato-themeforest-hero',
    brand: 'Envato',
    category: 'webdev',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://1.envato.market/c/5024116/805521/4415',
    imageUrl: './images/affiliates/envato-banner.jpg',
    title: 'Envato ThemeForest — 50,000+ Premium Web Templates',
    description: 'World-class WordPress themes, HTML5 templates, landing page designs, and web UI components.',
    badge: '50K+ TEMPLATES'
  },

  // ==========================================
  // 8. CAPCUT VIDEO EDITOR (IMPACT.COM / pxf.io)
  // ==========================================
  {
    id: 'capcut-editor-hero',
    brand: 'CapCut Pro',
    category: 'creative',
    sizeType: 'hero',
    width: 1200,
    height: 628,
    clickUrl: 'https://capcutaffiliateprogram.pxf.io/WqmL1e',
    imageUrl: './images/affiliates/wondershare-virbo-banner.jpg',
    title: 'CapCut Video Editor — Short-Form Video & Auto Captions',
    description: 'Industry-standard video editor for TikToks, Reels, YouTube Shorts, auto-captions, and AI background removal.',
    badge: 'FREE CREATOR TOOL'
  }
];
