import { PromoItem } from '../types';

export const INITIAL_PROMO_ITEMS: PromoItem[] = [
  // =========================================================================
  // 🏷️ PROMO PLACEMENT (FEATURED PARTNER ADS — STRICTLY UNIQUE, NO DUPLICATES)
  // =========================================================================
  {
    id: 'promo-seeedstudio-xiao-esp32s3-display',
    title: 'XIAO 1.47" IPS Touch Display Powered by XIAO ESP32-S3 Plus',
    placement: 'promo',
    description:
      'Compact 1.47-inch Capacitive IPS Touch Display powered by XIAO ESP32-S3 Plus with onboard WiFi + BLE, MicroSD Card Slot, Digital Mic, and 6-Axis IMU.',
    imageUrl: './seeedstudio_xiao_esp32s3_display.jpg',
    destinationUrl:
      'https://www.seeedstudio.com/1-47-Inch-Touch-Display-Powered-by-XIAO-ESP32-S3-Plus-p-6996.html?sensecap_affiliate=LF0tCxl&referring_service=link',
    buttonText: 'EXPLORE XIAO 1.47" DISPLAY →',
    badge: 'XIAO ESP32-S3 PLUS',
    promotionLabel: 'SEEED STUDIO OFFICIAL HARDWARE',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    openNewTab: true,
    disclosureNote: 'Official Seeed Studio partner referral link (sensecap_affiliate=LF0tCxl).',
    createdAt: '2026-11-06T00:00:00Z',
    updatedAt: '2026-11-06T00:00:00Z'
  },
  {
    id: 'promo-atome-card-1',
    title: 'Atome Card — Win Up to ₱7,800 Cashback!',
    placement: 'promo',
    description:
      'Register, apply for Atome Card, and complete qualified referral transactions to claim up to ₱7,800 total cashback rewards.',
    imageUrl: './images/atome/atome-official-cashback-ad.jpg',
    destinationUrl: 'https://www.atome.ph/s/cbcqZc5Ak',
    buttonText: 'APPLY ATOME CARD →',
    badge: '₱7,800 CASHBACK',
    promotionLabel: 'OFFICIAL PROMO',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 1,
    openNewTab: true,
    disclosureNote: 'Official partner promotion subject to Atome Terms & Conditions.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'promo-hostinger-special-2',
    title: 'Hostinger Cloud Hosting — 75% OFF + Free Domain',
    placement: 'promo',
    description:
      'Get high-speed NVMe web hosting, 1-click WordPress installation, and free custom business email accounts for your VA business.',
    imageUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    destinationUrl: 'https://www.hostinger.com?REFERRALCODE=DPDCABINCEHM',
    buttonText: 'CLAIM 75% OFF DEAL →',
    badge: '75% OFF DEAL',
    promotionLabel: 'HOSTING PROMO',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 2,
    openNewTab: true,
    disclosureNote: 'Use referral code DPDCABINCEHM at checkout.',
    createdAt: '2026-08-05T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },

  // =========================================================================
  // 🤝 PARTNER DEALS PLACEMENT (MARKETPLACE DEALS SIDEBAR — STRICTLY UNIQUE)
  // =========================================================================
  {
    id: 'deal-seeedstudio-meshtastic-0',
    title: 'Wio Tracker L2 Pro for Meshtastic',
    placement: 'partner-deals',
    description:
      'Black Friday & Thanksgiving Promo — Thanksgiving Doorbuster Starts Now! Shop early & save big on Wio Tracker L2 Pro for Meshtastic and Seeed Studio IoT hardware.',
    imageUrl: './seeedstudio_affiliate_1200x628.jpg',
    destinationUrl:
      'https://www.seeedstudio.com/Wio-Tracker-L2-Pro-for-Meshtastic-p-0000.html?sensecap_affiliate=LF0tCxl&referring_service=link',
    buttonText: 'SHOP EARLY & SAVE BIG →',
    badge: 'Black Friday & Thanksgiving Promo',
    promotionLabel: 'Black Friday & Thanksgiving Promo',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 0,
    openNewTab: true,
    disclosureNote: 'Official Seeed Studio referral link (LF0tCxl).',
    createdAt: '2026-11-06T00:00:00Z',
    updatedAt: '2026-11-06T00:00:00Z'
  },
  {
    id: 'deal-meshy-ai-3d-1',
    title: 'AI 3D Model Generator: Create 3D from Text & Images | Meshy',
    placement: 'partner-deals',
    description:
      'Create 3D models from text prompts and reference images in seconds with Meshy AI. Export to GLB, OBJ, FBX, or USDZ — no 3D experience needed.',
    imageUrl:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    destinationUrl:
      'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends',
    buttonText: 'TRY MESHY AI FREE →',
    badge: 'AI 3D GENERATOR',
    promotionLabel: 'OFFICIAL AI REFERRAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 1,
    openNewTab: true,
    createdAt: '2026-09-22T00:00:00Z',
    updatedAt: '2026-10-28T00:00:00Z'
  },
  {
    id: 'deal-suno-ai-music-2',
    title: 'Suno AI Music Studio — Create Radio-Ready Songs Free',
    placement: 'partner-deals',
    description:
      'Transform simple text prompts into full-length songs with realistic vocals, harmonies, and custom genres in seconds.',
    imageUrl: './media_1787666146962.jpg',
    destinationUrl: 'https://suno.com/invite/@chillvibemusics',
    buttonText: 'CLAIM SUNO INVITE →',
    badge: 'FREE CREDITS',
    promotionLabel: 'AI MUSIC DEAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 2,
    openNewTab: true,
    createdAt: '2026-08-25T00:00:00Z',
    updatedAt: '2026-10-28T00:00:00Z'
  },
  {
    id: 'deal-envato-elements-1',
    title: 'Envato Elements & Digital Market Templates',
    placement: 'partner-deals',
    description:
      'Access 50,000+ premium website themes, UI kits, graphics, and code scripts with commercial license.',
    imageUrl:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    destinationUrl:
      'https://1.envato.market/c/5024116/805521/4415?subId1=https%3A%2F%2Fteamwhitehatdev.github.io',
    buttonText: 'EXPLORE ENVATO →',
    badge: '50,000+ THEMES',
    promotionLabel: 'CREATIVE DEAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 3,
    openNewTab: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'deal-vecteezy-graphics-2',
    title: 'Vecteezy Royalty-Free Vector & Stock Assets',
    placement: 'partner-deals',
    description:
      'Millions of royalty-free vectors, SVGs, stock photography, and 4K video footage for VA client projects.',
    imageUrl:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80',
    destinationUrl: 'https://a.impactradius-go.com/gen-ad-code/5024116/4016678/12240/',
    buttonText: 'GET VECTEEZY ASSETS →',
    badge: 'VECTOR LIBRARIES',
    promotionLabel: 'GRAPHICS DEAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 4,
    openNewTab: true,
    createdAt: '2026-08-05T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'deal-capcut-video-3',
    title: 'CapCut Video Editing Suite for Creators & VAs',
    placement: 'partner-deals',
    description:
      'Pro short-form video editing software with automatic subtitles, background removal, and TikTok/Reels templates.',
    imageUrl:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
    destinationUrl: 'https://capcutaffiliateprogram.pxf.io/WqmL1e',
    buttonText: 'GET CAPCUT PRO →',
    badge: 'VIDEO EDITING',
    promotionLabel: 'PARTNER DEAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 5,
    openNewTab: true,
    createdAt: '2026-08-10T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  },
  {
    id: 'deal-wondershare-virbo-4',
    title: 'Wondershare Virbo AI Video Generator',
    placement: 'partner-deals',
    description:
      'Generate realistic AI avatar videos in 120+ languages for client marketing and social media campaigns.',
    imageUrl:
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80',
    destinationUrl: 'https://wondersharesoftware.pxf.io/c/5024116/2882021/15586',
    buttonText: 'TRY VIRBO AI →',
    badge: 'AI AVATARS',
    promotionLabel: 'SOFTWARE DEAL',
    status: 'PUBLISHED',
    visible: true,
    sortOrder: 6,
    openNewTab: true,
    createdAt: '2026-08-12T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z'
  }
];
