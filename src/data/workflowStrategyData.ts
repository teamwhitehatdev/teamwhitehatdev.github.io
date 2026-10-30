export interface StrategyPhase {
  phase: string;
  name: string;
  duration: string;
  objective: string;
  tasks: string[];
}

export interface RecommendedWebsite {
  name: string;
  url: string;
  category: string;
  description: string;
  role: string;
}

export interface WorkflowStrategy {
  planTitle: string;
  planOverview: string;
  phases: StrategyPhase[];
  recommendedWebsites: RecommendedWebsite[];
  proTips: string[];
  progressionMilestones: Array<{
    stage: string;
    target: string;
    roiImpact: string;
  }>;
}

export const WORKFLOW_STRATEGY_DATA: Record<string, WorkflowStrategy> = {
  'lead-triage': {
    planTitle: 'Autonomous Speed-to-Lead Rollout Plan & High-ROI Progression',
    planOverview: 'A turnkey 3-phase deployment strategy capturing inbound prospects, enriching company profiles, scoring leads in real time, and dispatching VIP Slack alerts with 1-click meeting links.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Ingestion & Webhook Infrastructure',
        duration: 'Hours 1 – 3',
        objective: 'Deploy cryptographically signed webhooks to ingest form, Calendly, and LinkedIn submissions with zero data loss.',
        tasks: [
          'Create a dedicated Webhook Gateway endpoint in Make.com / n8n using TLS 1.3.',
          'Implement HMAC-SHA256 signature verification to prevent spoofed or spam submissions.',
          'Validate incoming payload schemas (Zod or JSON Schema) for required name, email, and domain fields.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Firmographic Enrichment & Cognitive Scoring',
        duration: 'Hours 4 – 6',
        objective: 'Query domain metadata and use Claude 3.7 Sonnet JSON Mode to calculate ICP fit (0–100) in under 1,200ms.',
        tasks: [
          'Connect Perplexity API / ScrapingBee to fetch employee count, tech stack, and recent company news.',
          'Configure Claude 3.7 prompt caching on your scoring criteria to reduce token costs by 90%.',
          'Enforce strict JSON schema output returning lead_tier, icp_score, pain_points, and personalized reply.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Action Dispatch, CRM Sync & VIP Escalation',
        duration: 'Hours 7 – 9',
        objective: 'Synchronize CRM records, create calendar events, and dispatch rich Slack cards with 1-click meeting links.',
        tasks: [
          'Auto-create deals and contacts in HubSpot CRM or Notion Leads DB with assigned lead score.',
          'Dispatch interactive Block Kit Slack notification to the sales channel for leads scoring 80+.',
          'Draft a customized introductory email in Gmail / Resend ready for instant 1-click team review.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Make.com',
        url: 'https://www.make.com',
        category: 'Orchestration iPaaS',
        description: 'Visual automation platform connecting webhooks, LLMs, and CRMs with zero server overhead.',
        role: 'Central Workflow Engine'
      },
      {
        name: 'Anthropic Claude Console',
        url: 'https://console.anthropic.com',
        category: 'AI Reasoning API',
        description: 'Deploy Claude 3.7 Sonnet with JSON Mode and prompt caching for fast, accurate lead qualification.',
        role: 'Cognitive Brain'
      },
      {
        name: 'Perplexity API',
        url: 'https://www.perplexity.ai',
        category: 'Real-Time Enrichment',
        description: 'Enrich incoming company domains with verified live web information and firmographics.',
        role: 'Data Enrichment'
      },
      {
        name: 'Slack Developer Portal',
        url: 'https://api.slack.com',
        category: 'Team Dispatch',
        description: 'Construct interactive Block Kit message cards with one-click approval buttons.',
        role: 'Alert Gateway'
      }
    ],
    proTips: [
      'Enable Claude Prompt Caching on your system prompt to reduce LLM latency from 1,200ms down to 240ms while reducing token cost by 90%.',
      'Deploy a Dead-Letter Queue (DLQ) in Make.com: if your CRM API experiences rate limits, store failed payloads in Supabase for automatic retry.',
      'Responding to inbound enterprise leads in under 5 minutes increases qualified meeting booking rates by 391% compared to a 30-minute delay.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'Live Webhook Ingestion Online', roiImpact: '100% automated form capture' },
      { stage: 'Day 07', target: 'Response Latency < 4.0 Seconds', roiImpact: '3x more discovery meetings booked' },
      { stage: 'Day 30', target: '15+ Hours Saved Weekly for VA/Founder', roiImpact: '$2,500/mo agency retainer value' }
    ]
  },
  'inbox-rag': {
    planTitle: 'Enterprise Support RAG & Knowledge Base Rollout Plan',
    planOverview: 'A hybrid dense-sparse retrieval augmented generation pipeline that ingests company SOPs, matches customer queries with 99.95% accuracy, and drafts human-in-the-loop replies in under 800ms.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Knowledge Chunking & Vector Ingestion',
        duration: 'Hours 1 – 4',
        objective: 'Extract company support documentation, FAQs, and PDF SOPs into semantic chunks with metadata.',
        tasks: [
          'Parse Zendesk historical tickets and Notion knowledge base articles into 512-token chunks with 50-token overlap.',
          'Generate high-density semantic embeddings using OpenAI text-embedding-3-small or Cohere Embed v3.',
          'Index vectors into Pinecone or Supabase pgvector with cosine similarity distance metrics.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Hybrid Dense-Sparse Vector Retrieval',
        duration: 'Hours 5 – 8',
        objective: 'Query the vector database with user intent, applying BM25 keyword matching for exact error codes.',
        tasks: [
          'Set up hybrid search balancing semantic embeddings with exact keyword matches for SKU/error codes.',
          'Apply reranking with Cohere Rerank API to elevate the top 3 most relevant knowledge chunks.',
          'Enforce similarity confidence threshold (>0.82) to reject queries where company knowledge is lacking.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Hallucination Guardrails & Human-in-the-Loop',
        duration: 'Hours 9 – 12',
        objective: 'Generate context-bounded responses and inject drafts into Zendesk/Freshdesk for rapid support triage.',
        tasks: [
          'Bind Claude 3.7 with strict system prompt: "Only answer using provided chunks; escalate if uncertain."',
          'Auto-generate draft replies directly in the support agent UI with cited knowledge base article links.',
          'Route billing, cancellation, and refund tickets to tier-2 human specialists with pre-drafted context.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Pinecone Vector DB',
        url: 'https://www.pinecone.io',
        category: 'Vector Database',
        description: 'Serverless vector database delivering sub-50ms query latency for enterprise semantic retrieval.',
        role: 'Semantic Memory Store'
      },
      {
        name: 'OpenAI Embeddings',
        url: 'https://platform.openai.com',
        category: 'Embeddings API',
        description: 'Generate 1536-dimensional embeddings for company documentation with text-embedding-3-small.',
        role: 'Vector Embeddings'
      },
      {
        name: 'Zendesk Developer API',
        url: 'https://developer.zendesk.com',
        category: 'Support Platform',
        description: 'Connect inbound ticket webhooks and inject pre-drafted AI responses for agent approval.',
        role: 'Support Ingress/Egress'
      },
      {
        name: 'LangSmith / LangChain',
        url: 'https://www.langchain.com',
        category: 'RAG Observability',
        description: 'Trace vector retrieval quality, track latency, and prevent LLM hallucinations.',
        role: 'RAG Quality Monitor'
      }
    ],
    proTips: [
      'Implement Hybrid Search (Dense Embeddings + Sparse BM25): vector models frequently miss exact technical error codes that BM25 catches effortlessly.',
      'Never auto-send responses on billing or dispute queries: always present a pre-drafted response to support agents for 1-click verification.',
      'RAG automation resolves 60% of repetitive Tier-1 customer questions instantly, reducing average first-response time from 6 hours to 45 seconds.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: '500+ Knowledge Chunks Indexed', roiImpact: 'Sub-50ms vector query retrieval' },
      { stage: 'Day 07', target: 'Draft Generation Live in Support Helpdesk', roiImpact: '70% reduction in agent typing time' },
      { stage: 'Day 30', target: '20+ Hours Saved Weekly for Support Team', roiImpact: '$2,000/mo retainer service value' }
    ]
  },
  'ecommerce-3d': {
    planTitle: 'High-Throughput Spatial 3D Asset & WebGL CDN Pipeline Plan',
    planOverview: 'Turn 2D e-commerce product photos into watertight, textured 3D meshes (GLTF/USDZ) using Meshy 3D AI, and dynamically embed WebGL viewers into Shopify storefronts.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Product Image Ingestion & Background Stripping',
        duration: 'Hours 1 – 3',
        objective: 'Batch ingest product images, remove backgrounds, and normalize aspect ratios for 3D generative synthesis.',
        tasks: [
          'Listen for new product creation webhooks from Shopify or custom e-commerce admin panels.',
          'Execute rembg / Cloudinary AI background removal to isolate clean product silhouettes.',
          'Standardize image resolution to 1024x1024 PNG with balanced studio lighting coordinates.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Generative Mesh Synthesis & PBR Texture Baking',
        duration: 'Hours 4 – 7',
        objective: 'Call Meshy AI API to synthesize watertight 3D geometry with diffuse, normal, and roughness maps.',
        tasks: [
          'Dispatch HTTPS POST to Meshy 3D Image-to-3D endpoint specifying quad topology and PBR texturing.',
          'Poll task status with exponential backoff until generation status returns 100% SUCCEEDED.',
          'Apply Draco mesh compression to optimize geometry for web performance (< 2.5MB target).'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Edge CDN Storage & Three.js Storefront Injection',
        duration: 'Hours 8 – 10',
        objective: 'Upload GLTF/USDZ assets to Cloudflare R2 and inject interactive 3D model-viewer into product pages.',
        tasks: [
          'Store generated 3D files in Cloudflare R2 with zero-egress fees and global edge caching.',
          'Update Shopify product metafield with model CDN URL and mobile AR quick-look file links.',
          'Embed Google <model-viewer> or Three.js canvas on the frontend allowing 360-degree interactive rotation.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Meshy 3D AI',
        url: 'https://www.meshy.ai',
        category: 'Generative 3D API',
        description: 'High-speed Text-to-3D and Image-to-3D generation producing watertight meshes with PBR textures.',
        role: '3D Mesh Synthesis'
      },
      {
        name: 'Cloudflare R2',
        url: 'https://www.cloudflare.com/developer-platform/r2',
        category: 'Zero-Egress Storage',
        description: 'S3-compatible object storage designed for hosting high-bandwidth 3D GLTF and USDZ models.',
        role: 'Edge Asset CDN'
      },
      {
        name: 'Google Model-Viewer',
        url: 'https://modelviewer.dev',
        category: 'WebGL Frontend',
        description: 'Lightweight web component for rendering interactive 3D models with one-tap mobile AR preview.',
        role: 'Interactive Storefront Viewer'
      },
      {
        name: 'Shopify Partners',
        url: 'https://www.shopify.com/partners',
        category: 'E-Commerce Platform',
        description: 'Integrate custom 3D metafields directly into live themes and product templates.',
        role: 'Storefront CMS'
      }
    ],
    proTips: [
      'Always use Draco geometry compression and KTX2 texture formatting: keeping 3D file sizes below 2.5MB prevents mobile page slowdowns.',
      'Embedding interactive 3D visualizers boosts e-commerce conversion rates by 40% and reduces returns by 27% on footwear, apparel, and furniture.',
      'Offer this as a turnkey service to e-commerce brands: charge $1,500 to $3,500 to convert their top 50 bestselling products into interactive 3D models.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'Automated Image Ingestion Online', roiImpact: 'Zero-touch product photo pre-processing' },
      { stage: 'Day 07', target: 'Meshy 3D Pipeline Generating Assets in <90s', roiImpact: '95% cheaper than traditional 3D studio modeling' },
      { stage: 'Day 30', target: 'Storefront WebGL Viewer Live Across 50 SKUs', roiImpact: '40% increase in customer conversion rate' }
    ]
  },
  'video-reels-engine': {
    planTitle: 'Autonomous Video Reels & Faceless Short-Form Engine Plan',
    planOverview: 'Transform long-form audio, YouTube podcasts, and blog articles into viral 60-second vertical reels with dynamic kinetic subtitles and automated multi-channel syndication.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Audio Ingestion & Word-Level Transcription',
        duration: 'Hours 1 – 3',
        objective: 'Download source video/audio and transcribe speech with word-level microsecond timestamps.',
        tasks: [
          'Listen for new YouTube or podcast RSS uploads and extract audio stream with yt-dlp / cloud workers.',
          'Transcribe audio via Deepgram Nova-2 API in ~1,200ms with punctuation and speaker diarization.',
          'Index transcript into Claude 3.7 to detect emotional hooks, controversy peaks, and high-retention quotes.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Hook Extraction & Kinetic Video Rendering',
        duration: 'Hours 4 – 7',
        objective: 'Crop to 9:16 vertical ratio, overlay dynamic kinetic captions, and sync B-roll footage.',
        tasks: [
          'Extract top 3 most viral 45-second soundbites with provocative 3-second opening hooks.',
          'Execute Remotion / Shotstack automated rendering script applying bold, colored TikTok-style subtitles.',
          'Overlay copyright-free cinematic B-roll from Pexels API matching the spoken topic.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Multi-Platform Video Syndication & Pin Comments',
        duration: 'Hours 8 – 10',
        objective: 'Publish completed vertical MP4s to YouTube Shorts, TikTok, and Instagram Reels with affiliate links.',
        tasks: [
          'Dispatch video file to Ayrshare or Buffer API with optimized platform-specific hashtags.',
          'Auto-generate click-worthy titles with emoji hooks and high-contrast video thumbnail frames.',
          'Post automated first comment with trackable referral link or lead magnet download URL.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Deepgram Nova-2',
        url: 'https://deepgram.com',
        category: 'Speech-to-Text API',
        description: 'Industry-leading transcription speed with word-level microsecond timestamps.',
        role: 'Audio Transcription'
      },
      {
        name: 'Remotion',
        url: 'https://www.remotion.dev',
        category: 'Programmatic Video',
        description: 'Build and render high-resolution MP4 videos programmatically using React and CSS.',
        role: 'Automated Video Renderer'
      },
      {
        name: 'Ayrshare',
        url: 'https://www.ayrshare.com',
        category: 'Social API Gateway',
        description: 'Single REST API to publish and schedule reels to TikTok, YouTube Shorts, and Instagram.',
        role: 'Multi-Channel Syndication'
      },
      {
        name: 'ElevenLabs',
        url: 'https://elevenlabs.io',
        category: 'Neural Voiceover',
        description: 'Generate hyper-realistic narrator voices for faceless educational and affiliate shorts.',
        role: 'AI Voice Narration'
      }
    ],
    proTips: [
      'Place dynamic kinetic subtitles in the center-middle third of the vertical frame: this avoids TikTok and Reels UI buttons on the right side.',
      'Repurposing 1 weekly podcast into 10 vertical clips drives 250k–1M free organic impressions across YouTube Shorts and TikTok each month.',
      'Package this system for creators and consultants: charge $1,200 to $2,500 monthly for 30 automated viral vertical shorts.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'Automated Transcript Pipeline Verified', roiImpact: '100% automated soundbite extraction' },
      { stage: 'Day 07', target: 'Remotion Video Rendering Under 60s', roiImpact: '10x faster than manual video timeline editing' },
      { stage: 'Day 30', target: '30 Vertical Shorts Published Autonomously', roiImpact: '500k+ organic video impressions monthly' }
    ]
  },
  'voice-booking-ai': {
    planTitle: 'Real-Time Conversational AI Voice Agent Rollout Plan',
    planOverview: 'A sub-600ms latency voice pipeline combining Twilio SIP trunks, Deepgram real-time audio streams, Claude 3.7 reasoning, and Cal.com booking functions.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Telephony & WebSocket Audio Ingress',
        duration: 'Hours 1 – 4',
        objective: 'Establish bidirectional WebSocket media stream between Twilio Voice and voice server.',
        tasks: [
          'Provision local and toll-free phone numbers on Twilio with TwiML WebSocket stream forwarding.',
          'Connect audio stream to Deepgram Streaming API (16kHz linear PCM) for real-time speech recognition.',
          'Implement Voice Activity Detection (VAD) to handle human interruptions smoothly.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Low-Latency LLM Reasoning & Function Calling',
        duration: 'Hours 5 – 8',
        objective: 'Process user utterances with Claude 3.7 Sonnet / Groq Llama 3 with time-to-first-token under 150ms.',
        tasks: [
          'Design conversational system prompt enforcing concise, natural 1-sentence answers.',
          'Implement function calling tools: checkAvailability(), reserveSlot(), and sendSmsConfirmation().',
          'Configure fallback protocol: if caller requests a human, immediately initiate warm SIP transfer.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Audio Synthesis & Cal.com Calendar Integration',
        duration: 'Hours 9 – 12',
        objective: 'Stream audio back to caller via ElevenLabs WebSocket and finalize calendar reservation.',
        tasks: [
          'Stream synthesized audio tokens directly back into Twilio media stream buffer with zero stutter.',
          'Trigger Cal.com API to create confirmed calendar invite and dispatch SMS summary via Twilio Messaging.',
          'Log call recording, sentiment score, and transcription summary in CRM database.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Twilio Voice',
        url: 'https://www.twilio.com/voice',
        category: 'Cloud Telephony',
        description: 'Programmable voice infrastructure with real-time bidirectional WebSocket Media Streams.',
        role: 'Inbound Telephony Gateway'
      },
      {
        name: 'Vapi.ai',
        url: 'https://vapi.ai',
        category: 'Voice AI Orchestrator',
        description: 'Managed voice AI platform orchestrating STT, LLM, and TTS with sub-500ms latency.',
        role: 'Voice Orchestration'
      },
      {
        name: 'Cal.com API',
        url: 'https://cal.com',
        category: 'Scheduling Infrastructure',
        description: 'Developer-friendly scheduling endpoints for booking appointments during live voice calls.',
        role: 'Appointment Booking'
      },
      {
        name: 'Groq Cloud',
        url: 'https://groq.com',
        category: 'LPU Inference',
        description: 'Ultra-fast LLM inference delivering 500+ tokens/second for instantaneous voice dialogue.',
        role: 'Low-Latency LLM'
      }
    ],
    proTips: [
      'Maintain end-to-end latency below 600ms: anything above 800ms feels robotic and creates awkward human collisions.',
      'Always configure dual DTMF / Voice triggers: allow callers to say "agent" or press "0" to immediately transfer to your mobile phone.',
      'Local service businesses (dentists, plumbers, law firms) lose up to 40% of leads to unanswered calls. This agent captures 100% of missed calls 24/7.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'Twilio WebSocket Streaming Live', roiImpact: 'Zero dropped inbound calls' },
      { stage: 'Day 07', target: 'Sub-600ms End-to-End Voice Turnaround', roiImpact: 'Indistinguishable from human receptionist' },
      { stage: 'Day 30', target: '100% Inbound Calls Answered & Booked', roiImpact: '$1,500/mo local business retainer' }
    ]
  },
  'executive-va-ops': {
    planTitle: 'Executive VA & Intelligent Document Processing Plan',
    planOverview: 'Autonomous document triage pipeline monitoring executive inboxes and Telegram bots, parsing receipts and contracts with GPT-4o Vision, and synchronizing accounting ledgers.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Multi-Channel Document Ingestion',
        duration: 'Hours 1 – 3',
        objective: 'Listen for PDF and image uploads across Gmail, Telegram, and Google Drive.',
        tasks: [
          'Create a dedicated executive Telegram bot (@ExecutiveOpsBot) with webhook payload listener.',
          'Configure Gmail API filter to capture incoming emails with attachments labeled "Invoice" or "Receipt".',
          'Download files to private Cloudflare R2 bucket with time-limited signed URLs.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Vision OCR & Financial Schema Extraction',
        duration: 'Hours 4 – 6',
        objective: 'Extract structured vendor, tax, amount, and date data with GPT-4o Vision API.',
        tasks: [
          'Pass document images to GPT-4o Vision with structured JSON schema extraction prompt.',
          'Normalize currency values to USD and match vendor against chart of accounts.',
          'Flag duplicate submissions by comparing vendor name, date, and invoice number against database.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'QuickBooks Sync & 1-Click Founder Approvals',
        duration: 'Hours 7 – 9',
        objective: 'Post approved expense records to QuickBooks and send Slack notification for high-value items.',
        tasks: [
          'Auto-create expense transactions in QuickBooks Online or Xero via OAuth2 API.',
          'For expenses > $1,000, trigger interactive Slack message with "Approve" and "Reject" buttons.',
          'Generate automated daily 5:00 PM PDF expense report recapping all processed transactions.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'OpenAI Vision API',
        url: 'https://platform.openai.com',
        category: 'Multimodal OCR',
        description: 'Extract line items, tax numbers, and dates from handwritten or photographed receipts.',
        role: 'Document Vision OCR'
      },
      {
        name: 'QuickBooks Online API',
        url: 'https://developer.intuit.com',
        category: 'Accounting Software',
        description: 'Automate journal entries, expense creation, and invoice reconciliation.',
        role: 'Financial Ledger Sync'
      },
      {
        name: 'Telegram Bot API',
        url: 'https://core.telegram.org/bots',
        category: 'Mobile Ingestion',
        description: 'Allow founders to snap photos of receipts on their phone for instant automated logging.',
        role: 'Mobile Quick Capture'
      },
      {
        name: 'Make.com',
        url: 'https://www.make.com',
        category: 'Workflow Automation',
        description: 'Manage accounting approval logic, error handling, and executive notifications.',
        role: 'Workflow Logic Orchestrator'
      }
    ],
    proTips: [
      'Implement strict schema validation: if an invoice image is blurry or missing total amount, automatically prompt the user on Telegram for a clearer photo.',
      'Auto-tag tax-deductible software subscriptions (e.g. AWS, GitHub, Google Workspace) to simplify end-of-year CPA filing.',
      'Virtual Assistants deploying this workflow save executive founders 8+ hours weekly and eliminate receipt hoarding.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'Telegram Receipt Bot Live on Founder Phone', roiImpact: 'Snap photo -> instant cloud upload' },
      { stage: 'Day 07', target: 'QuickBooks Ledger Auto-Reconciled', roiImpact: 'Zero manual data entry errors' },
      { stage: 'Day 30', target: '8+ Hours Saved Weekly for Founder', roiImpact: '$1,000 – $2,500/mo VA retainer' }
    ]
  },
  'seo-content-publisher': {
    planTitle: 'Autonomous Programmatic SEO & Content Publishing Plan',
    planOverview: 'A continuous programmatic publishing pipeline that clusters search queries, drafts comprehensive 2,500-word markdown tutorials, generates WebP visual diagrams, and auto-publishes to WordPress.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Semantic Clustering & Intent Mapping',
        duration: 'Hours 1 – 3',
        objective: 'Cluster seed keywords into high-ROI search intent silos using neural embeddings.',
        tasks: [
          'Fetch high-volume, low-competition keywords using Perplexity and Claude 3.7 semantic grouping.',
          'Extract primary keyword, 8 secondary long-tail variants, and related People Also Ask questions.',
          'Determine search intent (Commercial vs Informational) and structure H2/H3 article outline.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Long-Form Content & Visual Synthesis',
        duration: 'Hours 4 – 7',
        objective: 'Draft 2,500-word comprehensive tutorial with code snippets, FAQs, and WebP graphics.',
        tasks: [
          'Generate comprehensive markdown tutorial using Claude 3.7 Sonnet with embedded technical examples.',
          'Call DALL-E 3 / Flux API to create contextual technical diagrams and convert to WebP format.',
          'Inject structured JSON-LD schema (TechArticle and FAQPage) for Google Rich Snippets.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'CMS Publishing & Edge Cache Invalidation',
        duration: 'Hours 8 – 10',
        objective: 'Publish post via WordPress REST API, ping search indexers, and purge Cloudflare cache.',
        tasks: [
          'Publish article to WordPress / Ghost via REST API with featured image and SEO meta tags.',
          'Ping IndexNow API to notify Google, Bing, and Yandex of newly published content in real time.',
          'Execute Cloudflare API cache purge to immediately deliver updated articles to visitors worldwide.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Perplexity API',
        url: 'https://www.perplexity.ai',
        category: 'Live Search Intelligence',
        description: 'Verify current facts, citations, and emerging keyword trends with live web access.',
        role: 'Semantic Research Engine'
      },
      {
        name: 'WordPress REST API',
        url: 'https://developer.wordpress.org/rest-api/',
        category: 'Headless CMS',
        description: 'Publish complete blog posts, categories, tags, and featured images programmatically.',
        role: 'Publishing Destination'
      },
      {
        name: 'Cloudflare Cache API',
        url: 'https://developers.cloudflare.com/cache/',
        category: 'Edge CDN',
        description: 'Instantly purge edge cache so new articles appear worldwide within seconds of publish.',
        role: 'Global Edge Invalidation'
      },
      {
        name: 'IndexNow Protocol',
        url: 'https://www.indexnow.org',
        category: 'Instant Indexing',
        description: 'Ping search engines immediately when new pages are published for ultra-fast indexing.',
        role: 'Search Engine Notification'
      }
    ],
    proTips: [
      'Always embed FAQPage schema into your article HTML: Google frequently awards rich accordion snippet carousels to properly structured pages.',
      'Space programmatic blog publishing across 48-hour intervals to mimic natural human writing cadence and maintain Google Helpful Content trust.',
      'Programmatic content hubs rank for hundreds of long-tail keywords, generating thousands of qualified organic visitors with zero ongoing ad spend.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'Semantic Keyword Clustering Pipeline Online', roiImpact: '100+ high-ROI target topics identified' },
      { stage: 'Day 07', target: 'First 10 Programmatic Articles Live on CMS', roiImpact: 'Indexed in Google within 24 hours via IndexNow' },
      { stage: 'Day 30', target: '25+ Hours Saved Weekly on Content Writing', roiImpact: '25k+ monthly organic search impressions' }
    ]
  },
  'client-onboarding': {
    planTitle: 'Automated Client Onboarding & Contract Generation Plan',
    planOverview: 'Transform new client payments into instant automated onboarding: generate custom contracts, clone private Notion workspaces, and create Slack Connect channels in < 60 seconds.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Stripe Payment Ingress & Customer Verification',
        duration: 'Hours 1 – 2',
        objective: 'Listen for Stripe checkout completion webhooks and extract client company metadata.',
        tasks: [
          'Listen for checkout.session.completed webhook events with Stripe signature verification.',
          'Extract client company name, point-of-contact email, purchased service tier, and add-on options.',
          'Store customer record in PostgreSQL / Supabase as the source of truth for downstream tools.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Contract Generation & Portal Provisioning',
        duration: 'Hours 3 – 5',
        objective: 'Auto-populate legal agreements and clone client project portal from master template.',
        tasks: [
          'Merge client details into PandaDoc / DocuSign legal agreement and dispatch for electronic signature.',
          'Trigger Notion API to duplicate master Client Portal dashboard with custom permissions.',
          'Provision Google Drive shared folder with automated subdirectories (Assets, Invoices, Deliverables).'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Slack Connect Channel & Welcome Sequence',
        duration: 'Hours 6 – 8',
        objective: 'Create shared Slack channel and dispatch personalized founder onboarding video.',
        tasks: [
          'Call Slack API to create private Slack Connect channel and invite client email automatically.',
          'Dispatch personalized welcome email via Resend containing portal links and Kickoff call booking URL.',
          'Post automated celebration alert in internal agency channel celebrating the new customer.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Stripe API',
        url: 'https://stripe.com/docs/api',
        category: 'Payment Gateway',
        description: 'Listen for customer checkouts, subscription creations, and billing events via webhooks.',
        role: 'Payment Trigger'
      },
      {
        name: 'PandaDoc API',
        url: 'https://developers.pandadoc.com',
        category: 'e-Signature Contracts',
        description: 'Auto-generate service contracts and NDAs with dynamic client merge tags.',
        role: 'Contract Generation'
      },
      {
        name: 'Notion API',
        url: 'https://developers.notion.com',
        category: 'Client Portals',
        description: 'Duplicate pre-built client dashboard templates with automated permissions.',
        role: 'Workspace Provisioning'
      },
      {
        name: 'Resend',
        url: 'https://resend.com',
        category: 'Transactional Email',
        description: 'Modern developer email platform with high inbox deliverability and React Email templates.',
        role: 'Welcome Email Gateway'
      }
    ],
    proTips: [
      'Delivering full onboarding access within 60 seconds of checkout reduces buyer remorse and refund requests by 85%.',
      'Embed a 90-second Loom orientation video directly inside the client Notion portal to eliminate repetitive kick-off questions.',
      'Agencies utilizing automated onboarding scale from 5 to 50 active clients without hiring additional account managers.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'Stripe Webhook Trigger Operational', roiImpact: 'Zero delay between payment and onboarding' },
      { stage: 'Day 07', target: 'Contract & Notion Provisioning Under 60s', roiImpact: 'Flawless first-impression customer experience' },
      { stage: 'Day 30', target: '10+ Hours Saved Per Client Onboarded', roiImpact: '$1,500 – $3,000 setup fee value' }
    ]
  },
  'social-community-dm': {
    planTitle: 'Social Community Auto-DM & Inbound Lead Magnet Delivery Plan',
    planOverview: 'Transform 1 core insight into 7 optimized platform formats: X threads, LinkedIn carousels, Instagram quote cards, and newsletter updates with automated scheduling.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Topic Mining & Viral Hook Curation',
        duration: 'Hours 1 – 3',
        objective: 'Crawl trending industry discussions and structure key takeaways into a pillar thesis.',
        tasks: [
          'Monitor trending topics on GitHub, Hacker News, and industry RSS feeds for high-traction discussions.',
          'Extract core contrarian argument, supporting data points, and actionable takeaways using Claude 3.7.',
          'Generate 5 viral opening hook variations tested against proven social copywriting formulas.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Format Adaptation & Graphic Rendering',
        duration: 'Hours 4 – 6',
        objective: 'Convert thesis into platform-native formats: X thread, LinkedIn carousel, and code syntax cards.',
        tasks: [
          'Format into a 6-tweet X thread with punchy cliffhangers and clean line spacing.',
          'Generate PDF carousel slides for LinkedIn using Bannerbear / HTML-to-Image API.',
          'Generate code syntax highlighting graphics via Carbon / Silicon API for developer audience engagement.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Queue Scheduling & First-Comment Links',
        duration: 'Hours 7 – 9',
        objective: 'Schedule content across all platforms with automated first-comment link drops.',
        tasks: [
          'Push finalized drafts into Typefully / Buffer with optimal audience timezone scheduling.',
          'Configure 2-minute delayed first comment containing your portfolio URL or newsletter signup link.',
          'Track engagement metrics (reposts, bookmarks, outbound clicks) in a consolidated dashboard.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Typefully',
        url: 'https://typefully.com',
        category: 'Social Publishing',
        description: 'Schedule X and LinkedIn posts with automated auto-retweets, thread scheduling, and analytics.',
        role: 'Social Scheduling Engine'
      },
      {
        name: 'Bannerbear',
        url: 'https://www.bannerbear.com',
        category: 'Image API',
        description: 'Auto-generate social media graphics, quote cards, and LinkedIn PDF carousels via REST API.',
        role: 'Graphic Synthesis'
      },
      {
        name: 'Buffer API',
        url: 'https://buffer.com',
        category: 'Social Management',
        description: 'Cross-platform social media publishing across Instagram, Facebook, and Pinterest.',
        role: 'Multi-Channel Scheduler'
      },
      {
        name: 'Feedbin RSS',
        url: 'https://feedbin.com',
        category: 'Content Curation',
        description: 'Fast, reliable RSS feed reader for tracking top industry blogs and release announcements.',
        role: 'Topic Discovery'
      }
    ],
    proTips: [
      'Never place outbound links inside the main text of a LinkedIn or X post: algorithms penalize external URLs by up to 60%. Put links in the first comment.',
      'Repurposing 1 high-effort article into 7 social formats yields 10x greater reach than writing 7 disconnected short posts.',
      'Virtual Assistants providing SMM automation charge $800 to $1,800 monthly per client retainer for 20 scheduled multi-platform posts.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'Automated Topic Curation Feed Active', roiImpact: 'Endless supply of proven viral angles' },
      { stage: 'Day 07', target: 'Bannerbear Carousel Generation Tested', roiImpact: '3x higher LinkedIn impressions on PDF carousels' },
      { stage: 'Day 30', target: '18+ Hours Saved Weekly on Social Media', roiImpact: '$1,200/mo retainer service value' }
    ]
  },
  'voice-dubbing-studio': {
    planTitle: 'Autonomous Video Dubbing & Lip-Sync CDN Pipeline Plan',
    planOverview: 'Translate, dub, and synchronize English videos into Spanish, German, and Japanese with cloned voice timbre, emotional fidelity, and multi-language audio tracks.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Audio Separation & Multi-Lingual Translation',
        duration: 'Hours 1 – 4',
        objective: 'Extract speaker voice stems from background music and translate dialogue with colloquial nuance.',
        tasks: [
          'Separate voice dialogue from background music using Demucs AI or Spleeter audio separation.',
          'Transcribe speaker audio with Whisper / Deepgram with millisecond timestamp markers.',
          'Translate transcript into Spanish, German, Japanese using DeepL API with custom domain glossaries.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Voice Cloning & Emotional Synthesis',
        duration: 'Hours 5 – 8',
        objective: 'Synthesize translated speech matching the original speaker voice timbre and pacing.',
        tasks: [
          'Clone speaker voice profile in ElevenLabs with 60 seconds of reference audio.',
          'Synthesize translated dialogue with pacing adjustments to match the original video timecode.',
          'Blend translated speech with original background music stem at -18dB relative volume.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Video Remuxing & YouTube Multi-Audio Delivery',
        duration: 'Hours 9 – 12',
        objective: 'Multiplex audio tracks into MP4 video container and upload to YouTube with localized titles.',
        tasks: [
          'Execute FFmpeg pipeline to inject localized audio tracks as selectable secondary language streams.',
          'Upload video via YouTube Data API v3 with localized titles, descriptions, and thumbnail overlays.',
          'Store finished multi-language video files on Cloudflare R2 for instant client download.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'ElevenLabs Voice Dubbing',
        url: 'https://elevenlabs.io',
        category: 'AI Voice Synthesis',
        description: 'Clone speaker voice and synthesize localized dialogue with preserved emotional timbre.',
        role: 'Neural Voice Dubbing'
      },
      {
        name: 'DeepL API',
        url: 'https://www.deepl.com',
        category: 'Nuanced Translation',
        description: 'Industry-standard neural translation engine capturing colloquial idioms accurately.',
        role: 'Translation Engine'
      },
      {
        name: 'FFmpeg',
        url: 'https://ffmpeg.org',
        category: 'Audio/Video Processing',
        description: 'Command-line audio stem remuxing, video encoding, and multi-track packaging.',
        role: 'Video Remuxing Engine'
      },
      {
        name: 'YouTube Data API',
        url: 'https://developers.google.com/youtube/v3',
        category: 'Video Distribution',
        description: 'Upload and configure multi-language audio tracks on a single YouTube video URL.',
        role: 'Global Distribution'
      }
    ],
    proTips: [
      'Dubbing top-performing YouTube videos into Spanish and Portuguese instantly unlocks 600M+ potential viewers without any additional filming.',
      'Adjust speech synthesis speed between 0.95x and 1.08x to match exact mouth movement durations for seamless viewer immersion.',
      'Agencies and creators pay $300 to $800 per completed video dub: this automated pipeline executes the entire process in under 15 minutes.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'ElevenLabs Voice Model Trained & Verified', roiImpact: 'Indistinguishable cloned voice quality' },
      { stage: 'Day 07', target: 'Automated FFmpeg Remuxing in <3 Minutes', roiImpact: 'Multi-language audio tracks on single video' },
      { stage: 'Day 30', target: '300% Growth in International Audience', roiImpact: '$2,000/mo localization service value' }
    ]
  },
  'prompt-engineering-mesh': {
    planTitle: 'Enterprise Multi-LLM Prompt Engineering Mesh Plan',
    planOverview: 'A smart model routing gateway that classifies incoming query complexity, cascades prompts between fast 8B models and Claude 3.7 Sonnet (Thinking Mode), and logs costs in ClickHouse.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Query Ingestion & Intent Classification',
        duration: 'Hours 1 – 3',
        objective: 'Inspect incoming prompt, classify complexity, and determine optimal model routing in <50ms.',
        tasks: [
          'Deploy an ultra-fast edge proxy using Cloudflare Workers or FastAPI on Fly.io.',
          'Pass prompt to an inexpensive 8B model (Groq Llama 3) to classify intent (Simple, Creative, Complex Code).',
          'Evaluate prompt cache keys to check for cached previous responses in Redis.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Dynamic Model Cascading & Prompt Optimization',
        duration: 'Hours 4 – 6',
        objective: 'Route simple tasks to GPT-4o-mini and complex algorithmic tasks to Claude 3.7 Sonnet with Thinking Mode.',
        tasks: [
          'Route simple classification tasks to GPT-4o-mini ($0.15/1M tokens) with temperature 0.0.',
          'Route complex architectural reasoning or code tasks to Claude 3.7 Sonnet ($3.00/1M tokens) with Thinking Mode.',
          'Apply automatic fallback: if primary provider encounters 429 rate limit, switch instantly to OpenRouter.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Schema Enforcement, Token Logging & Cost Analytics',
        duration: 'Hours 7 – 9',
        objective: 'Validate JSON output against Zod schema, log token consumption, and visualize cost trends.',
        tasks: [
          'Validate response structure using Instructor / BAML; retry automatically if JSON is malformed.',
          'Log prompt tokens, completion tokens, latency, and cost to ClickHouse or Helicone.',
          'Render real-time cost breakdown dashboard comparing single-model cost vs cascaded savings.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'OpenRouter',
        url: 'https://openrouter.ai',
        category: 'Unified LLM API',
        description: 'Single API key access to 200+ models with automatic load balancing and failover routing.',
        role: 'Unified Gateway & Failover'
      },
      {
        name: 'Helicone',
        url: 'https://www.helicone.ai',
        category: 'LLM Observability',
        description: 'Open-source LLM observability platform tracking prompt costs, latency, and user sessions.',
        role: 'Cost & Latency Tracking'
      },
      {
        name: 'Anthropic Console',
        url: 'https://console.anthropic.com',
        category: 'Advanced Reasoning',
        description: 'Access Claude 3.7 Sonnet with extended thinking mode and prompt caching.',
        role: 'Complex Reasoning Core'
      },
      {
        name: 'Groq Cloud',
        url: 'https://groq.com',
        category: 'Fast Inference',
        description: 'Sub-50ms query classification using LPU-accelerated open-source models.',
        role: 'Ultra-Fast Classifier'
      }
    ],
    proTips: [
      'Model cascading reduces enterprise AI API bills by up to 78%: route 70% of mundane queries to mini models and save frontier models for high-value tasks.',
      'Enable prompt caching on large system prompts (>1,024 tokens) to slash input token costs by 90% and reduce latency by 80%.',
      'Always enforce strict JSON schemas via BAML or Instructor to eliminate hallucinated JSON formatting errors.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'Edge Proxy Gateway Routing Active', roiImpact: 'Sub-50ms routing decision' },
      { stage: 'Day 07', target: 'Automatic Failover Between Anthropic & OpenAI', roiImpact: '99.99% uptime with zero downtime' },
      { stage: 'Day 30', target: '78% Reduction in Monthly LLM Spend', roiImpact: 'Thousands saved on enterprise token bills' }
    ]
  },
  'social-growth-smm': {
    planTitle: 'Automated Social Media Growth & Multi-Platform Syndication Plan',
    planOverview: 'A high-velocity content syndication engine that transforms core developer tutorials into cross-platform posts on DEV.to, Medium, Hashnode, X, and Substack with canonical SEO tags.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Content Ingestion & Semantic Topic Clustering',
        duration: 'Hours 1 – 3',
        objective: 'Ingest articles from markdown files or headless CMS and extract semantic entities.',
        tasks: [
          'Monitor Git repository commits or headless CMS webhooks for newly published articles.',
          'Extract primary thesis, technical code blocks, and key takeaways using Claude 3.7 Sonnet.',
          'Generate customized platform metadata (tags, categories, subtitle) matching each platform algorithm.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Platform Format Transformation & SEO Canonicalization',
        duration: 'Hours 4 – 6',
        objective: 'Convert markdown into platform-specific syntax and embed rel="canonical" tags.',
        tasks: [
          'Inject canonical URL linking back to your primary portfolio domain to pass 100% of SEO equity.',
          'Format code blocks and embeds for DEV.to liquid tags and Medium story formatting.',
          'Generate dynamic social preview open-graph cards using Cloudinary or Bannerbear.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Automated API Syndication & Engagement Loop',
        duration: 'Hours 7 – 9',
        objective: 'Publish simultaneously across 5 platforms and schedule social promotional updates.',
        tasks: [
          'Dispatch article via REST API to DEV.to, Hashnode, Medium, and Substack in parallel.',
          'Schedule companion X thread and LinkedIn announcement linking to the published article.',
          'Log outbound referral traffic and newsletter conversions via UTM parameter tracking.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'DEV.to API',
        url: 'https://developers.forem.com/api',
        category: 'Developer Community',
        description: 'Publish technical tutorials programmatically with canonical URL preservation.',
        role: 'Developer Publishing'
      },
      {
        name: 'Hashnode API',
        url: 'https://hashnode.com',
        category: 'Blogging Platform',
        description: 'GraphQL API for publishing to custom developer domains and engineering blogs.',
        role: 'Headless Blog Syndication'
      },
      {
        name: 'Make.com / n8n',
        url: 'https://n8n.io',
        category: 'Workflow Automation',
        description: 'Self-hosted or cloud orchestration triggering multi-platform syndication upon git push.',
        role: 'Publishing Orchestrator'
      },
      {
        name: 'Medium API',
        url: 'https://github.com/Medium/medium-api-docs',
        category: 'Content Platform',
        description: 'Publish articles to Medium partner publications with canonical link protection.',
        role: 'Mass Reach Syndication'
      }
    ],
    proTips: [
      'Always set rel="canonical" pointing to your personal website when cross-posting: this guarantees Google attributes all search authority to your domain.',
      'Cross-posting across DEV.to, Hashnode, and Medium multiplies technical audience reach by 8x compared to publishing on a standalone blog alone.',
      'Include a clear newsletter opt-in box with a free downloadable template at the bottom of every cross-posted article to convert readers into owned subscribers.'
    ],
    progressionMilestones: [
      { stage: 'Day 01', target: 'Git-to-Syndication Webhook Operational', roiImpact: '1-click publishing to 5 platforms' },
      { stage: 'Day 07', target: 'Canonical Link Tags Verified by Google', roiImpact: '100% SEO link juice preserved' },
      { stage: 'Day 30', target: '50k+ Cross-Platform Technical Readers', roiImpact: '$1,500/mo consulting client pipeline' }
    ]
  }
};

// Friendly aliases to guarantee seamless lookup across categoryKey or alternate identifiers
WORKFLOW_STRATEGY_DATA['voice-agent'] = WORKFLOW_STRATEGY_DATA['voice-booking-ai'];
WORKFLOW_STRATEGY_DATA['executive-ops'] = WORKFLOW_STRATEGY_DATA['executive-va-ops'];
WORKFLOW_STRATEGY_DATA['multilingual-dubbing'] = WORKFLOW_STRATEGY_DATA['voice-dubbing-studio'];
WORKFLOW_STRATEGY_DATA['social-growth'] = WORKFLOW_STRATEGY_DATA['social-community-dm'];
WORKFLOW_STRATEGY_DATA['social-media-automation'] = WORKFLOW_STRATEGY_DATA['social-growth-smm'];
WORKFLOW_STRATEGY_DATA['social-media-growth-matrix'] = WORKFLOW_STRATEGY_DATA['social-growth-smm'];

