import { BuilderBlock, BuilderPageSettings } from '../types';

export interface PrebuiltTemplate {
  id: string;
  name: string;
  description: string;
  category: 'saas' | 'affiliate' | 'education' | 'portfolio' | 'blank';
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
  }
];
