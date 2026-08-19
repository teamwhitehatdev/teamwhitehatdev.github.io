export interface AffiliateAdItem {
  id: string;
  brand: string;
  category: 'hardware' | 'creative' | 'education' | 'security' | 'hosting' | 'lifestyle' | 'shopping' | 'financial';
  title: string;
  description: string;
  clickUrl: string;
  imageUrl: string;
  pixelUrl?: string;
  rawHtml?: string;
  badge?: string;
  size?: 'hero' | 'medium' | 'skyscraper' | 'banner';
}

export const UNIQUE_AFFILIATE_ADS: AffiliateAdItem[] = [
  // 1. ANKER POWER BANK 25K 165W (1 UNIQUE HARDWARE AD ONLY)
  {
    id: 'anker-powerbank-25k-165w-hero',
    brand: 'Anker',
    category: 'hardware',
    title: 'Anker Power Bank (25K, 165W, Built-In & Retractable Cables)',
    description: 'Triple 100W USB-C ports for multi-device laptop & mobile charging with 25,000mAh capacity & 100W ultra-fast 20-min recharge.',
    clickUrl: 'https://ankerca.pxf.io/c/5024116/4006963/47963',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0743/7769/1325/files/A1695H11_richimage_us_v1.png?v=1778667790',
    pixelUrl: 'https://imp.pxf.io/i/5024116/4006963/47963',
    rawHtml: '<a rel="sponsored" href="https://ankerca.pxf.io/c/5024116/4006963/47963" target="_top" id="4006963"><img src="//a.impactradius-go.com/display-ad/47963-4006963" border="0" alt="" width="1200" height="540"/></a><img height="0" width="0" src="https://imp.pxf.io/i/5024116/4006963/47963" style="position:absolute;visibility:hidden;" border="0" />',
    badge: 'RECOMMENDED DAILY HARDWARE',
    size: 'hero'
  },

  // 2. ATOME FINANCIAL & SHOPPING (1 UNIQUE AD ONLY)
  {
    id: 'atome-paylater-banner',
    brand: 'ATOME',
    category: 'financial',
    title: 'ATOME Buy Now Pay Later (0% Interest)',
    description: 'Split your purchases into 3 interest-free monthly payments with zero hidden fees at thousands of partner stores.',
    clickUrl: 'https://atome.pxf.io/c/5024116/1897213/21805',
    imageUrl: './atome_ads_official_referral.png',
    pixelUrl: 'https://imp.pxf.io/i/5024116/1897213/21805',
    badge: 'PAYMENT FLEXIBILITY',
    size: 'medium'
  },

  // 3. WONDERSHARE VIRBO AI AVATARS (1 UNIQUE AD ONLY)
  {
    id: 'wondershare-virbo-hero',
    brand: 'Wondershare Virbo',
    category: 'creative',
    title: 'Wondershare Virbo AI Avatar Generator',
    description: 'Create realistic AI spokesperson video avatars in 120+ languages for YouTube, Marketing & Social Media.',
    clickUrl: 'https://virbo.wondershare.com/?aff=5024116',
    imageUrl: 'https://cc-download.wondershare.com/store/virbo-banner-1200x628.png',
    badge: 'AI CREATIVE STUDIO',
    size: 'hero'
  },

  // 4. TEMU E-COMMERCE SHOPPING (1 UNIQUE AD ONLY)
  {
    id: 'temu-shopping-banner',
    brand: 'TEMU',
    category: 'shopping',
    title: 'TEMU Global Direct Marketplace',
    description: 'Shop wholesale prices directly on electronics, workstation tools, and lifestyle equipment with free shipping.',
    clickUrl: 'https://temu.to/m/u1000000000',
    imageUrl: 'https://img.kwcdn.com/product/open/2023-11-20/1700472000000-banner.jpg',
    badge: 'WHOLESALE SAVINGS',
    size: 'medium'
  },

  // 5. HOSTINGER WEB HOSTING (1 UNIQUE AD ONLY)
  {
    id: 'hostinger-cloud-hosting',
    brand: 'Hostinger',
    category: 'hosting',
    title: 'Hostinger High-Performance Cloud & VPS Hosting',
    description: '99.9% Uptime, Free NVMe Storage, Unlimited SSL Certificates & Free Domain for Web Developers.',
    clickUrl: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    imageUrl: 'https://assets.hostinger.com/images/affiliate/banners/728x90.png',
    badge: 'CLOUD INFRASTRUCTURE',
    size: 'banner'
  },

  // 6. NORDVPN CYBERSECURITY (1 UNIQUE AD ONLY)
  {
    id: 'nordvpn-security-sky',
    brand: 'NordVPN',
    category: 'security',
    title: 'NordVPN Next-Gen Cyber Security & Encrypted Tunneling',
    description: 'Protect your IP address, bypass ISP throttling, and secure confidential developer credentials with double VPN encryption.',
    clickUrl: 'https://nordvpn.com?aff=5024116',
    imageUrl: 'https://s1.nordcdn.com/nordvpn/media/1.2054.0/images/global/banners/300x600.png',
    badge: 'CYBER ENCRYPTION',
    size: 'skyscraper'
  },

  // 7. COURSERA PROFESSIONAL CERTIFICATIONS (1 UNIQUE AD ONLY)
  {
    id: 'coursera-cyber-cert',
    brand: 'Coursera',
    category: 'education',
    title: 'Coursera Professional Google & IBM Tech Degrees',
    description: 'Master Cybersecurity, Full-Stack Software Engineering, and AI Development with accredited university certifications.',
    clickUrl: 'https://coursera.pxf.io/c/5024116/123456/7890',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lc52y8v71/learning-banner-728x90.png',
    badge: 'CAREER ACCELERATION',
    size: 'banner'
  }
];

export const IMPACT_AFFILIATE_ASSETS = UNIQUE_AFFILIATE_ADS;

export const ALL_AFFILIATE_ADS = UNIQUE_AFFILIATE_ADS;
