import { BuilderBlock, BuilderPageSettings } from '../types';

export interface PrebuiltTemplate {
  id: string;
  name: string;
  description: string;
  category: 'saas' | 'affiliate' | 'education' | 'portfolio' | 'blank' | 'wordpress';
  badge: string;
  settings: BuilderPageSettings;
  blocks: BuilderBlock[];
}

export const PREBUILT_BUILDER_TEMPLATES: PrebuiltTemplate[] = [
  {
    id: 'template-saas-landing',
    name: 'SaaS & Enterprise VA Landing Page',
    description: 'High-converting agency/software landing page with hero banner, 3-column feature grid, video demo, and primary call-to-action.',
    category: 'saas',
    badge: 'Popular',
    settings: {
      pageTitle: 'Enterprise Virtual Assistant & AI Solutions',
      pageSubtitle: 'Scale your remote agency operations with certified AI specialists.',
      maxWidth: 'max-w-7xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'inter'
    },
    blocks: [
      {
        id: 'block-hero-1',
        type: 'hero',
        badgeText: 'Next-Gen Remote Operations • 2026 Edition',
        badgeColor: '#10b981',
        title: 'Scale Your Business With High-Performance AI Virtual Assistants',
        subtitle: 'Delegate inbox triage, client onboarding, CRM maintenance, and automated reporting to pre-vetted remote specialists trained in cutting-edge AI toolchains.',
        buttonText: 'Claim Your Strategy Consultation',
        buttonLink: '#/admin',
        buttonStyle: 'apple-green',
        secondaryButtonText: 'Explore Free Playbooks',
        secondaryButtonLink: '#/ai',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '3xl',
          paddingY: 'xl',
          paddingX: 'lg',
          textAlign: 'center',
          shadow: 'lg',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      },
      {
        id: 'block-features-1',
        type: 'features-grid',
        title: 'Why Global Executives Rely on Our Specialized Portals',
        subtitle: 'Engineered for reliability, zero hallucination, and maximum workflow throughput.',
        columns: 3,
        gridItems: [
          {
            id: 'feat-1',
            title: '4-Second AI Lead Enrichment',
            description: 'Automated CRM pipelines that research prospective clients, evaluate fit score (0-100), and draft tailored replies instantly.',
            badge: 'Automation'
          },
          {
            id: 'feat-2',
            title: 'Executive Calendar & Inbox Command',
            description: 'Intelligent triage filters spam, flags VIP client inquiries, and prepares morning briefing sheets while you sleep.',
            badge: 'Efficiency'
          },
          {
            id: 'feat-3',
            title: 'Verified 3D Asset & Media Pipelines',
            description: 'Turn product concepts into textured 3D models and promotional animations with Meshy AI and Suno audio workflows.',
            badge: 'Creative Tech'
          }
        ],
        styles: {
          backgroundColor: '#f1f5f9',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md'
        }
      },
      {
        id: 'block-cta-1',
        type: 'call-to-action',
        title: 'Ready to Modernize Your Operations?',
        content: 'Get in touch with our lead architects to configure custom automation flows, dynamic navigation tabs, and monetization infrastructure.',
        buttonText: 'Get Started Today Free',
        buttonLink: '#/about',
        buttonStyle: 'indigo',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md',
          shadow: 'glow-indigo',
          borderColor: '#818cf8',
          borderWidth: 'thin'
        }
      }
    ]
  },
  {
    id: 'template-affiliate-showcase',
    name: 'Affiliate & Digital Toolkit Showcase',
    description: 'Clean product catalog layout featuring curated tools, comparison cards, sponsor banners, and high-CTR affiliate buttons.',
    category: 'affiliate',
    badge: 'High CTR',
    settings: {
      pageTitle: 'Curated Freelancer & Tech Toolkits',
      pageSubtitle: 'Exclusive partner discounts, lifetime deals, and vetted hosting stacks.',
      maxWidth: 'max-w-7xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'inter'
    },
    blocks: [
      {
        id: 'aff-hero',
        type: 'hero',
        badgeText: 'Official Partner Discounts & Exclusive Credits',
        badgeColor: '#6366f1',
        title: 'The Essential Remote Tech Stack for 2026',
        subtitle: 'Stop overpaying for software. Here are our battle-tested hosting providers, AI 3D generators, and automation hubs.',
        buttonText: 'Browse Top #01 - #15 Niches',
        buttonLink: '#/affiliate-guide',
        buttonStyle: 'indigo',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '3xl',
          paddingY: 'lg',
          paddingX: 'lg',
          textAlign: 'center',
          shadow: 'md',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      },
      {
        id: 'aff-grid',
        type: 'features-grid',
        title: 'Featured Partner Tools with Verified ROI',
        columns: 3,
        gridItems: [
          {
            id: 'aff-item-1',
            title: 'Hostinger Premium Cloud Hosting',
            description: 'Deploy ultra-fast websites with 99.9% uptime, free SSL, and 1-click WordPress install for just $2.99/mo.',
            link: 'https://www.hostinger.com',
            linkText: 'Claim 75% Off + Free Domain'
          },
          {
            id: 'aff-item-2',
            title: 'Meshy AI 3D Model Studio',
            description: 'Transform 2D photographs and text briefs into game-ready 3D assets in under 60 seconds.',
            link: 'https://www.meshy.ai',
            linkText: 'Claim Free Meshy Credits'
          },
          {
            id: 'aff-item-3',
            title: 'Suno AI Next-Gen Audio Engine',
            description: 'Compose full-fidelity background audio, commercial jingles, and podcast soundscapes from natural language prompts.',
            link: 'https://suno.com',
            linkText: 'Generate Free Songs'
          }
        ],
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      }
    ]
  },
  {
    id: 'template-video-academy',
    name: 'Video Masterclass & Training Portal',
    description: 'Educational layout with embedded video player, curriculum checklist, student resources, and interactive FAQ.',
    category: 'education',
    badge: 'Educational',
    settings: {
      pageTitle: 'Mastering AI Workflows & Freelancer Portals',
      pageSubtitle: 'Watch our zero-cost training sessions and download practical SOP checklists.',
      maxWidth: 'max-w-6xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'inter'
    },
    blocks: [
      {
        id: 'vid-heading',
        type: 'heading',
        title: 'Masterclass: End-to-End Autonomous Lead Qualification',
        subtitle: 'Learn how to build, test, and deploy automated client intake flows without writing code.',
        styles: {
          textAlign: 'center',
          paddingY: 'md',
          fontSize: '3xl'
        }
      },
      {
        id: 'vid-player',
        type: 'video',
        title: 'Full Video Walkthrough (18 Minutes)',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        styles: {
          backgroundColor: '#0f172a',
          borderRadius: '2xl',
          shadow: 'xl',
          paddingY: 'none',
          paddingX: 'none'
        }
      },
      {
        id: 'vid-faq',
        type: 'accordion',
        title: 'Frequently Asked Questions & Prerequisites',
        accordionItems: [
          {
            id: 'faq-1',
            question: 'What tools do I need to follow along?',
            answer: 'A free Zapier or Make.com account, an OpenAI API key or free Claude access, and a Google Sheet.'
          },
          {
            id: 'faq-2',
            question: 'Can I use this for my existing agency clients?',
            answer: 'Yes! All diagrams and blueprints provided on this portal are 100% royalty-free for commercial client work.'
          }
        ],
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'md',
          paddingX: 'md',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      }
    ]
  },
  {
    id: 'template-blank',
    name: 'Blank Canvas (Build from Scratch)',
    description: 'Start with an empty page and drag & drop blocks to create your bespoke layout.',
    category: 'blank',
    badge: 'Freeform',
    settings: {
      pageTitle: 'New Custom Tab Landing Page',
      pageSubtitle: 'Designed with Team WhiteHat Dev Visual Builder.',
      maxWidth: 'max-w-7xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'inter'
    },
    blocks: [
      {
        id: 'blank-hero',
        type: 'hero',
        badgeText: 'New Section',
        badgeColor: '#10b981',
        title: 'Your Headline Goes Here',
        subtitle: 'Click this section or drag components from the left palette to start designing your dream layout.',
        buttonText: 'Primary Action Link',
        buttonLink: '#',
        buttonStyle: 'apple-green',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '3xl',
          paddingY: 'lg',
          paddingX: 'lg',
          textAlign: 'center',
          shadow: 'md',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      }
    ]
  },

  // =========================================================================
  // 🌐 WORDPRESS STYLE THEMES & TEMPLATES (POPULAR CMS LAYOUTS)
  // =========================================================================
  {
    id: 'template-wp-magazine',
    name: 'WordPress Magazine & Niche Blog Editorial',
    description: 'Classic high-retention WordPress editorial layout featuring top breaking news banner, 2-column featured story, 3-column article cards with destination links, and newsletter box.',
    category: 'wordpress',
    badge: 'WordPress Magazine',
    settings: {
      pageTitle: 'Tech & Freelancer Daily Dispatch',
      pageSubtitle: 'Deep-dive investigative playbooks, software benchmarks, and creator economy trends.',
      maxWidth: 'max-w-7xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'serif'
    },
    blocks: [
      {
        id: 'wp-mag-hero',
        type: 'hero',
        badgeText: 'FEATURED EDITORIAL • VOL. 48',
        badgeColor: '#6366f1',
        title: 'The 2026 State of AI Virtual Assistance: Why Agency Margins Are Surging to 72%',
        subtitle: 'How modern remote operators are replacing legacy manual data entry with multi-agent cognitive pipelines, boosting per-client retainer revenues to $3,500/month.',
        buttonText: 'Read Full Investigation &rarr;',
        buttonLink: '#/ai',
        buttonStyle: 'indigo',
        secondaryButtonText: 'Browse Topic Archive',
        secondaryButtonLink: '#/affiliate-guide',
        destinationLink: 'https://teamwhitehatdev.github.io/#/ai',
        destinationLinkTarget: '_blank',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '3xl',
          paddingY: 'xl',
          paddingX: 'lg',
          textAlign: 'left',
          borderColor: '#e2e8f0',
          borderWidth: 'thin',
          shadow: 'lg'
        }
      },
      {
        id: 'wp-mag-2col',
        type: '2-column',
        title: 'In-Depth Case Study: Autonomous Speed-to-Lead Triage',
        content: 'When an e-commerce prospect submits a request, our cognitive engine scrapes domain metadata, scores company budget suitability, and dispatches a personalized reply within 18 seconds.',
        buttonText: 'Inspect Live Topology Architecture',
        buttonLink: '#/ai#diagrams',
        destinationLink: '#/ai#diagrams',
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      },
      {
        id: 'wp-mag-grid',
        type: 'features-grid',
        title: 'Top Editorial Columns This Week',
        subtitle: 'Sorted by reader engagement and social shares.',
        columns: 3,
        gridItems: [
          {
            id: 'mag-1',
            title: 'SMM Career & Retention Secrets',
            description: 'Why the best social managers charge $2,500/mo retainers and avoid low-budget content mills.',
            link: '#/ai',
            linkText: 'Read SMM Guide'
          },
          {
            id: 'mag-2',
            title: 'HTML Metadata & Schema Optimization',
            description: 'The technical tags required to get cited by ChatGPT, Perplexity, and Google Search Generative Experience.',
            link: '#/ai',
            linkText: 'Read SEO Guide'
          },
          {
            id: 'mag-3',
            title: 'High-RPM Blogging Economics',
            description: 'How to target $45+ RPM tech niches and monetize with Google AdSense and SaaS affiliate programs.',
            link: '#/ai',
            linkText: 'Read Writer Guide'
          }
        ],
        styles: {
          backgroundColor: '#f1f5f9',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md'
        }
      },
      {
        id: 'wp-mag-cta',
        type: 'call-to-action',
        title: 'Subscribe to Our Weekly Executive Dispatch',
        content: 'Join 14,000+ digital creators, developers, and agency executives receiving tested automation templates every Monday morning.',
        buttonText: 'Subscribe Free (Zero Spam)',
        buttonLink: '#/about',
        destinationLink: '#/about',
        buttonStyle: 'apple-green',
        styles: {
          backgroundColor: '#0f172a',
          textColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md',
          textAlign: 'center'
        }
      }
    ]
  },
  {
    id: 'template-wp-woocommerce',
    name: 'WordPress WooCommerce & Affiliate Product Store',
    description: 'High-converting e-commerce catalog featuring discount badges, product cards, comparison prices, and direct affiliate destination links.',
    category: 'wordpress',
    badge: 'WooCommerce Store',
    settings: {
      pageTitle: 'Official Verified Software Deals & Partner Store',
      pageSubtitle: 'Exclusive reader promo codes, free cloud credits, and lifetime software licenses.',
      maxWidth: 'max-w-7xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'inter'
    },
    blocks: [
      {
        id: 'wp-woo-hero',
        type: 'hero',
        badgeText: 'VERIFIED PARTNER PERKS • 2026 EDITION',
        badgeColor: '#10b981',
        title: 'The Digital Creator Store: Exclusive Deals & Bonus Credits',
        subtitle: 'Save up to 75% on industry-standard web hosting, AI 3D generative model studios, and royalty-free music engines.',
        buttonText: 'Browse All Product Deals',
        buttonLink: '#/affiliate-guide',
        destinationLink: 'https://teamwhitehatdev.github.io/#/affiliate-guide',
        buttonStyle: 'apple-green',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '3xl',
          paddingY: 'lg',
          paddingX: 'lg',
          textAlign: 'center',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      },
      {
        id: 'wp-woo-products',
        type: 'features-grid',
        title: 'Featured Tools on Sale (Direct Destination Links)',
        subtitle: 'Click any card to claim your instant partner discount at checkout.',
        columns: 3,
        gridItems: [
          {
            id: 'prod-1',
            title: 'Hostinger Cloud Hosting',
            description: 'Code DPDCABINCEHM: 75% discount + free custom .com domain name + SSL certificates.',
            badge: '75% OFF CODE',
            link: 'https://www.hostinger.com',
            linkText: 'Claim Discount &rarr;'
          },
          {
            id: 'prod-2',
            title: 'Meshy AI 3D Model Studio',
            description: 'Code ER3M3J: 200 free generation credits to turn photos into textured 3D models.',
            badge: 'FREE CREDITS',
            link: 'https://www.meshy.ai',
            linkText: 'Get Free Credits &rarr;'
          },
          {
            id: 'prod-3',
            title: 'Suno AI Music Generator',
            description: 'Compose broadcast-quality royalty-free background themes for YouTube & podcasts.',
            badge: 'EXCLUSIVE',
            link: 'https://suno.com',
            linkText: 'Compose Audio &rarr;'
          }
        ],
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      },
      {
        id: 'wp-woo-faq',
        type: 'accordion',
        title: 'Partner Perks & Billing FAQ',
        accordionItems: [
          {
            id: 'woo-faq-1',
            question: 'How do coupon codes apply to my purchase?',
            answer: 'Copy the coupon code from the cards above and paste it into the "Have a coupon code?" field during checkout on our partner site.'
          },
          {
            id: 'woo-faq-2',
            question: 'Are these tools safe for commercial client deliverables?',
            answer: 'Yes! All partner software listed in our store provides full commercial rights for client and agency projects.'
          }
        ],
        styles: {
          backgroundColor: '#f8fafc',
          borderRadius: '2xl',
          paddingY: 'md',
          paddingX: 'md'
        }
      }
    ]
  },
  {
    id: 'template-wp-elementor-agency',
    name: 'WordPress Elementor Agency & VA Services',
    description: 'Modern digital agency portfolio featuring service pillars, client metric counters, case studies, and 1-click consultation booking.',
    category: 'wordpress',
    badge: 'Elementor Style',
    settings: {
      pageTitle: 'WhiteHat Dev Operations Agency',
      pageSubtitle: 'Custom AI engineering, automation pipelines, and full-stack Virtual Assistant teams.',
      maxWidth: 'max-w-7xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'poppins'
    },
    blocks: [
      {
        id: 'wp-elem-hero',
        type: 'hero',
        badgeText: 'WHITE-GLOVE DIGITAL AGENCY',
        badgeColor: '#10b981',
        title: 'We Engineer High-Leverage AI Automations for Growing Businesses',
        subtitle: 'Eliminate 20+ hours of repetitive manual work every week. We build self-healing pipelines that connect your CRM, email, accounting, and client intake.',
        buttonText: 'Book Free Discovery Call',
        buttonLink: '#/admin',
        destinationLink: 'https://teamwhitehatdev.github.io/#/admin',
        buttonStyle: 'apple-green',
        secondaryButtonText: 'Explore System Topologies',
        secondaryButtonLink: '#/ai#diagrams',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '3xl',
          paddingY: 'xl',
          paddingX: 'lg',
          textAlign: 'center',
          borderColor: '#e2e8f0',
          borderWidth: 'thin',
          shadow: 'lg'
        }
      },
      {
        id: 'wp-elem-pillars',
        type: 'features-grid',
        title: 'Our Core Agency Practice Areas',
        subtitle: 'Fixed-price implementation or dedicated monthly engineering retainers.',
        columns: 3,
        gridItems: [
          {
            id: 'pillar-1',
            title: 'Autonomous Inbound Sales Meshes',
            description: 'Connect forms to AI qualification agents that score leads, enrich company records, and book calendar meetings.',
            badge: '$1,500 Setup'
          },
          {
            id: 'pillar-2',
            title: 'Vision AI OCR & Financial Ops',
            description: 'Automate invoice data extraction, corporate expense policy checks, and direct QuickBooks journal entries.',
            badge: '$1,200 Setup'
          },
          {
            id: 'pillar-3',
            title: 'Executive Virtual Assistance',
            description: 'Dedicated English-fluent remote specialists trained in cutting-edge AI tools to manage your daily calendar and inbox.',
            badge: 'From $12/hr'
          }
        ],
        styles: {
          backgroundColor: '#f1f5f9',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md'
        }
      },
      {
        id: 'wp-elem-cta',
        type: 'call-to-action',
        title: 'Ready to Modernize Your Business Infrastructure?',
        content: 'Talk directly with our lead architects. We will audit your current workflow bottlenecks and provide a step-by-step automation blueprint.',
        buttonText: 'Schedule 15-Minute Audit',
        buttonLink: '#/about',
        destinationLink: '#/about',
        buttonStyle: 'indigo',
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md',
          borderColor: '#818cf8',
          borderWidth: 'thin',
          shadow: 'glow-indigo'
        }
      }
    ]
  },
  {
    id: 'template-wp-pricing-table',
    name: 'WordPress SaaS & Retainer Pricing Matrix',
    description: 'A 3-tier pricing table with feature comparison, savings badges, and direct destination links for instant checkout.',
    category: 'wordpress',
    badge: 'Pricing Matrix',
    settings: {
      pageTitle: 'Simple, Transparent Service Pricing',
      pageSubtitle: 'Zero hidden fees. Scale up or pause anytime with 1-click account management.',
      maxWidth: 'max-w-7xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'inter'
    },
    blocks: [
      {
        id: 'wp-price-heading',
        type: 'heading',
        title: 'Transparent Plans Designed for Rapid Growth',
        subtitle: 'Select the tier that matches your team size and monthly execution volume.',
        styles: {
          textAlign: 'center',
          fontSize: '4xl',
          fontWeight: 'extrabold',
          paddingY: 'lg'
        }
      },
      {
        id: 'wp-price-grid',
        type: 'features-grid',
        title: 'Membership & Engineering Tiers',
        columns: 3,
        gridItems: [
          {
            id: 'price-starter',
            title: 'Starter Automation ($499/mo)',
            description: 'Includes 2 custom Make.com workflows, automated email triage, and 5 hours of monthly VA maintenance support.',
            badge: 'SOLO / STARTER',
            link: '#/admin',
            linkText: 'Select Starter Plan &rarr;'
          },
          {
            id: 'price-growth',
            title: 'Growth Agency Tier ($1,299/mo)',
            description: 'Includes 6 custom AI workflows, Vision OCR invoice parsing, dedicated Slack channel, and 20 hours monthly VA execution.',
            badge: 'MOST POPULAR',
            link: '#/admin',
            linkText: 'Select Growth Plan &rarr;'
          },
          {
            id: 'price-enterprise',
            title: 'Enterprise Command ($2,999/mo)',
            description: 'Full-stack AI mesh architecture, custom LLM fine-tuning, 99.9% uptime SLA, and 40 hours monthly dedicated operations support.',
            badge: 'SCALE & SCALE',
            link: '#/admin',
            linkText: 'Contact Enterprise Team &rarr;'
          }
        ],
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md',
          borderColor: '#e2e8f0',
          borderWidth: 'thin'
        }
      }
    ]
  },
  {
    id: 'template-wp-empty-canvas',
    name: 'Empty Page & Custom Multi-Column Canvas (Blank)',
    description: 'A clean empty page with 1 custom multi-column section ready for you to add your own niche text, images, and destination links.',
    category: 'blank',
    badge: '100% Custom',
    settings: {
      pageTitle: 'My Custom Niche Portal',
      pageSubtitle: 'Build your customized layout step-by-step using drag & drop blocks.',
      maxWidth: 'max-w-7xl',
      backgroundColor: '#f8fafc',
      fontFamily: 'inter'
    },
    blocks: [
      {
        id: 'empty-custom-section',
        type: 'empty-column',
        title: 'Custom Section Header (Click to Edit)',
        subtitle: 'Customize this section title, subtitle, column count, and destination links in the right inspector.',
        columns: 3,
        customColumnsData: [
          {
            id: 'col-1',
            title: 'Column 01 Title',
            subtitle: 'First Sub-Topic',
            content: 'Write your own niche content, tips, or product review here. Add a destination link below.',
            buttonText: 'Visit Link →',
            destinationLink: 'https://teamwhitehatdev.github.io',
            destinationLinkTarget: '_blank',
            badge: 'Column 1'
          },
          {
            id: 'col-2',
            title: 'Column 02 Title',
            subtitle: 'Second Sub-Topic',
            content: 'Write your own niche content, tips, or product review here. Add a destination link below.',
            buttonText: 'Visit Link →',
            destinationLink: 'https://teamwhitehatdev.github.io',
            destinationLinkTarget: '_blank',
            badge: 'Column 2'
          },
          {
            id: 'col-3',
            title: 'Column 03 Title',
            subtitle: 'Third Sub-Topic',
            content: 'Write your own niche content, tips, or product review here. Add a destination link below.',
            buttonText: 'Visit Link →',
            destinationLink: 'https://teamwhitehatdev.github.io',
            destinationLinkTarget: '_blank',
            badge: 'Column 3'
          }
        ],
        styles: {
          backgroundColor: '#ffffff',
          borderRadius: '2xl',
          paddingY: 'lg',
          paddingX: 'md',
          borderColor: '#e2e8f0',
          borderWidth: 'thin',
          shadow: 'sm'
        }
      }
    ]
  }
];
