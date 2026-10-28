import React, { useState } from 'react';
import {
  Cpu,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  Database,
  Mail,
  MessageSquare,
  Box,
  Music,
  FileText,
  Zap,
  Globe,
  Layers,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Play,
  GitBranch,
  Bot,
  ShieldCheck
} from 'lucide-react';

const MESHY_REFERRAL_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';
const SUNO_REFERRAL_URL = 'https://suno.com/@chillvibemusics';

interface WorkflowBlueprint {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  timeSaved: string;
  vaServiceValue: string;
  tools: string[];
  nodes: {
    step: string;
    type: 'TRIGGER' | 'ENRICH' | 'AI BRAIN' | 'ROUTER' | 'ACTION';
    title: string;
    tool: string;
    description: string;
    color: string;
  }[];
  aiPromptSample: string;
  jsonOutputSample: string;
  implementationSteps: string[];
}

const WORKFLOW_BLUEPRINTS: WorkflowBlueprint[] = [
  {
    id: 'lead-triage',
    badge: 'FLOW DIAGRAM #1 • MOST REQUESTED BY CLIENTS',
    title: 'Real-Time Lead Capture → AI Qualification → CRM & Instant Proposal',
    subtitle:
      'How an automated workflow captures a website inquiry, researches the company, uses an AI LLM to score the lead (0–100), writes a custom reply, and updates HubSpot/Notion in 4 seconds.',
    timeSaved: '15+ Hours / Week',
    vaServiceValue: '$500 – $1,200 Setup Fee',
    tools: ['Make.com / Zapier', 'Typeform / Webhook', 'OpenAI GPT-4o / Claude', 'Notion / HubSpot CRM', 'Slack & Gmail'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Webhook / Form Trigger',
        tool: 'Typeform / Webflow / FB Lead Ads',
        description: 'Fires instantly when a prospect submits their Name, Company URL, Budget, and Project Goals.',
        color: 'border-blue-300 bg-blue-50 text-blue-900'
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Website Scraper & Enrichment',
        tool: 'HTTP Fetch / Perplexity API',
        description: 'Fetches the prospect’s homepage text and LinkedIn summary so the AI has real context.',
        color: 'border-indigo-300 bg-indigo-50 text-indigo-900'
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'LLM Qualification & Drafting',
        tool: 'GPT-4o / Claude 3.7 (JSON Mode)',
        description: 'Analyzes fit, assigns a Lead Score (0–100), identifies pain points, and drafts a personalized email.',
        color: 'border-violet-300 bg-violet-50 text-violet-900'
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Conditional Filter / Router',
        tool: 'Make.com Router Node',
        description: 'Splits the flow: High-Value Leads (Score >= 75) go to VIP Fast-Track; others go to Nurture Sequence.',
        color: 'border-amber-300 bg-amber-50 text-amber-900'
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'CRM Record + Gmail Draft + Slack',
        tool: 'Notion CRM + Gmail + Slack VIP',
        description: 'Creates the deal card in Notion/HubSpot, saves the custom email draft with Calendly link, and pings Slack.',
        color: 'border-emerald-300 bg-emerald-50 text-emerald-900'
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Inside Make.com / n8n OpenAI Module):
You are an Executive Sales Operations AI. Analyze the incoming lead data and scraped company website.
Return ONLY valid JSON matching this schema:
- lead_score (number 0-100 based on budget & B2B fit)
- priority_tier ("HIGH_VIP" | "STANDARD" | "LOW_FIT")
- core_pain_point (1 concise sentence)
- personalized_email_body (Warm, consultative 3-paragraph reply referencing their business and inviting them to book a 15-min call)`,
    jsonOutputSample: `{
  "lead_score": 92,
  "priority_tier": "HIGH_VIP",
  "core_pain_point": "Scaling customer onboarding without hiring 3 full-time admin reps.",
  "personalized_email_body": "Hi Sarah,\\n\\nI just reviewed Apex Studio's onboarding portal—congrats on your Q3 expansion! I noticed your team is looking to automate client intake and CRM updates...\\n\\nI put together a quick 3-step workflow architecture showing how we can cut your manual onboarding time by 80%. You can grab a 15-minute slot on my calendar here..."
}`,
    implementationSteps: [
      'Create a free Make.com or n8n account and add a "Custom Webhook" trigger node.',
      'Connect your website contact form (Typeform, Tally.so, or Elementor) to send POST data to that Webhook URL.',
      'Add an OpenAI / Claude module with Response Format set to "JSON Object" using the System Prompt above.',
      'Add a Router module: Path A (lead_score >= 75) sends an instant Slack alert + creates a Gmail Draft; Path B logs to Google Sheets / Notion CRM.'
    ]
  },
  {
    id: 'inbox-rag',
    badge: 'FLOW DIAGRAM #2 • EXECUTIVE VA AUTOMATION',
    title: '24/7 Smart Inbox Triage → Knowledge Base RAG → Human-Approved Drafts',
    subtitle:
      'How Virtual Assistants manage 200+ daily client emails effortlessly by combining AI Intent Classification with a company SOP Knowledge Base.',
    timeSaved: '12+ Hours / Week',
    vaServiceValue: '$450 – $950 / Month Retainer',
    tools: ['Gmail / Outlook Watch', 'OpenAI Classifier', 'Pinecone / Notion SOPs', 'Slack Approval Buttons'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'New Email Arrives in Inbox',
        tool: 'Gmail / Outlook Trigger',
        description: 'Monitors incoming customer or executive emails in real time (excluding newsletters/automated receipts).',
        color: 'border-blue-300 bg-blue-50 text-blue-900'
      },
      {
        step: '02',
        type: 'AI BRAIN',
        title: 'AI Intent & Sentiment Classifier',
        tool: 'GPT-4o-mini Classifier',
        description: 'Categorizes email into: [1] Urgent Client Issue, [2] Pricing/Sales Inquiry, [3] Scheduling, or [4] Billing.',
        color: 'border-violet-300 bg-violet-50 text-violet-900'
      },
      {
        step: '03',
        type: 'ENRICH',
        title: 'SOP & FAQ Retrieval (RAG)',
        tool: 'Notion Knowledge Base / Vector DB',
        description: 'Searches the company’s official FAQ and SOP documents for accurate policy, pricing, and links.',
        color: 'border-indigo-300 bg-indigo-50 text-indigo-900'
      },
      {
        step: '04',
        type: 'AI BRAIN',
        title: 'Context-Aware Reply Generator',
        tool: 'Claude 3.7 Sonnet',
        description: 'Writes a polite, accurate response grounded strictly in the retrieved company SOPs (zero hallucination).',
        color: 'border-purple-300 bg-purple-50 text-purple-900'
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Gmail Draft + Label Applied',
        tool: 'Gmail API + VA Review',
        description: 'Applies color-coded Gmail label (e.g., "AI-Draft-Ready") and saves the reply in Drafts for 1-click VA review.',
        color: 'border-emerald-300 bg-emerald-50 text-emerald-900'
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (RAG Grounded Email Assistant):
You are an Executive Virtual Assistant for [Company Name].
Using ONLY the Verified Company SOP Context provided below, draft a helpful, concise reply to the sender's email.
If the answer is not in the SOP Context, state that you are confirming with the specialist team and will follow up within 2 hours.`,
    jsonOutputSample: `{
  "intent_category": "PRICING_INQUIRY",
  "urgency_level": "HIGH",
  "gmail_label": "01_VIP_Ready_To_Send",
  "draft_reply": "Hi Marcus,\\n\\nThank you for reaching out! Based on your team size of 12 users, our Growth Automation Plan ($299/mo) includes unlimited webhook runs and priority onboarding.\\n\\nWould Tuesday at 2:00 PM EST work for a quick 10-minute walkthrough?"
}`,
    implementationSteps: [
      'Organize your client’s top 25 most common questions & answers inside a clean Notion database or Google Doc.',
      'Set up a Gmail "Watch Emails" trigger filtered to `label:inbox -category:promotions -category:social`.',
      'Pass the email body + SOP document snippet to Claude/GPT to generate a structured JSON classification and reply.',
      'Use the "Create a Draft" Gmail action linked to the incoming `threadId` so the VA only has to review and click Send!'
    ]
  },
  {
    id: 'content-3d-engine',
    badge: 'FLOW DIAGRAM #3 • CREATIVE AI & 3D CONTENT ENGINE',
    title: 'Omnichannel Media Factory: Brief → Scripts, Voice, Suno Music & Meshy 3D Assets',
    subtitle:
      'How modern Creative VAs turn 1 client topic or product photo into 10+ social videos, custom background music, and interactive 3D models automatically.',
    timeSaved: '20+ Hours / Week',
    vaServiceValue: '$800 – $2,000 / Month Package',
    tools: ['Airtable / Notion', 'ChatGPT / Claude', 'Meshy AI 3D Generator', 'Suno AI Music', 'ElevenLabs Voice', 'Buffer'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Content Topic or Product Photo',
        tool: 'Notion / Airtable Status = "Approved"',
        description: 'Triggered when a client drops a product image, blog link, or voice note into the content calendar.',
        color: 'border-blue-300 bg-blue-50 text-blue-900'
      },
      {
        step: '02',
        type: 'AI BRAIN',
        title: 'Multi-Format Script & Prompt Engine',
        tool: 'Claude 3.7 / GPT-4o',
        description: 'Generates TikTok/Reels hook script, LinkedIn carousel copy, AND 3D/Audio generation prompts.',
        color: 'border-violet-300 bg-violet-50 text-violet-900'
      },
      {
        step: '03',
        type: 'ENRICH',
        title: '3D Model Synthesis (Text/Image → 3D)',
        tool: 'Meshy AI 3D Generator',
        description: 'Converts product photos or text prompts into textured 3D models (.GLB/.FBX/.OBJ) for web & video renders.',
        color: 'border-indigo-300 bg-indigo-50 text-indigo-900'
      },
      {
        step: '04',
        type: 'ENRICH',
        title: 'AI Voiceover & Royalty-Free Music',
        tool: 'ElevenLabs + Suno AI',
        description: 'Synthesizes natural studio narration and custom royalty-free background music tracks.',
        color: 'border-amber-300 bg-amber-50 text-amber-900'
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Auto-Schedule & Client Approval Portal',
        tool: 'Buffer / Metricool / Google Drive',
        description: 'Uploads all generated assets into Google Drive and schedules approved posts across 5 social channels.',
        color: 'border-emerald-300 bg-emerald-50 text-emerald-900'
      }
    ],
    aiPromptSample: `MULTI-MODAL CREATIVE PROMPT GENERATOR:
Given Product: "Ergonomic Wireless Mechanical Keyboard"
1. Write a 30-second viral Reels script with a 3-second visual hook.
2. Generate a Meshy AI Text-to-3D prompt for a rotating 3D product showcase asset.
3. Generate a Suno AI music prompt for an upbeat lo-fi synthwave background track.`,
    jsonOutputSample: `{
  "reels_hook": "Stop typing on flat plastic that wrecks your wrists...",
  "meshy_3d_prompt": "Sleek minimalist wireless mechanical keyboard, anodized aluminum frame, keycaps in matte slate and royal blue, studio PBR textures, 4k octane render style",
  "suno_music_prompt": "Upbeat chill lo-fi electronic beat, warm analog synth chords, crisp percussion, 105 BPM, instrumental background for tech review"
}`,
    implementationSteps: [
      'Use Notion or Airtable as your Single Source of Truth content calendar with a Status column.',
      'Generate your 3D showcase models from text or product images using Meshy AI (export as GLB or MP4 turntable).',
      'Create custom royalty-free background tracks on Suno AI and voiceovers on ElevenLabs.',
      'Combine in CapCut or Canva and schedule a full month of client content in a single afternoon!'
    ]
  }
];

const AI_CAPABILITIES_MATRIX = [
  {
    icon: FileText,
    category: 'CAPABILITY 01 • LANGUAGE & REASONING',
    title: 'Large Language Models (LLMs) & Structured Reasoning',
    description:
      'Modern AI models (GPT-4o, Claude 3.7 Sonnet, Gemini) don’t just write text—they can follow complex Standard Operating Procedures (SOPs), extract structured JSON from messy emails, summarize 100-page PDFs, and write production code.',
    vaUseCases: [
      'Drafting executive emails, client proposals & SOP manuals in seconds',
      'Converting messy meeting transcripts into structured action items & Notion tasks',
      'Extracting invoice totals, dates, and vendor names into Google Sheets'
    ],
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    icon: Box,
    category: 'CAPABILITY 02 • 3D SPATIAL SYNTHESIS',
    title: 'AI 3D Model Generation (Text & Image to 3D with Meshy AI)',
    description:
      'Previously, creating a single 3D model took days in Blender. Today, AI 3D generators like Meshy AI transform a simple text prompt or a 2D product photo into a fully textured, PBR-mapped 3D asset (.OBJ, .FBX, .GLB, .USDZ) in under 60 seconds.',
    vaUseCases: [
      'Creating interactive 3D e-commerce product previews for Shopify & Webflow stores',
      'Generating 3D props, icons, and characters for YouTube thumbnails, games & AR/VR',
      'Converting 2D client logos or sketches into rotating 3D video animations'
    ],
    partnerLink: MESHY_REFERRAL_URL,
    partnerLabel: 'AI 3D Model Generator: Create 3D from Text & Images | Meshy',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200'
  },
  {
    icon: Music,
    category: 'CAPABILITY 03 • AUDIO, VOICE & MUSIC AI',
    title: 'Neural Voice Cloning & AI Music Production (Suno & ElevenLabs)',
    description:
      'Generative audio models synthesize broadcast-quality human voiceovers in 29+ languages with emotional inflection, as well as full studio-mastered songs and instrumental background tracks from a text prompt.',
    vaUseCases: [
      'Producing faceless YouTube, TikTok, and podcast narrations with ElevenLabs',
      'Creating 100% custom background music for client ads & intros using Suno AI',
      'Translating and dubbing training videos for international teams'
    ],
    partnerLink: SUNO_REFERRAL_URL,
    partnerLabel: 'Explore Suno AI Music Studio (@chillvibemusics)',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    icon: Workflow,
    category: 'CAPABILITY 04 • AUTONOMOUS WORKFLOW AUTOMATION',
    title: 'Event-Driven AI Pipelines (Make, Zapier & n8n)',
    description:
      'AI becomes 10x more valuable when connected to triggers and actions. Instead of manually copying and pasting into ChatGPT, an automation platform listens for events (new lead, new email, new order), runs the AI prompt automatically, and updates your apps.',
    vaUseCases: [
      'Instant lead qualification, scoring, and CRM syncing without human delay',
      'Automated invoice reminders, client onboarding folders, and Slack reporting',
      'Auto-publishing approved content across LinkedIn, Instagram, X, and YouTube'
    ],
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    icon: Database,
    category: 'CAPABILITY 05 • RAG & CUSTOM KNOWLEDGE BASES',
    title: 'Retrieval-Augmented Generation (Custom Company Brains)',
    description:
      'RAG connects an AI model directly to a company’s private documents, PDFs, Notion wikis, and spreadsheets so the AI answers questions with 100% factual accuracy based on internal company rules.',
    vaUseCases: [
      'Building internal "Ask Our SOPs" chatbots for agency teams and new hires',
      'Deploying 24/7 customer support widgets trained on official product docs',
      'Instantly looking up contract clauses, refund policies, and SKU pricing'
    ],
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    icon: Globe,
    category: 'CAPABILITY 06 • MULTIMODAL VISION & DOCUMENT OCR',
    title: 'Visual Understanding, Receipt Scanning & UI Analysis',
    description:
      'Multimodal AI can "see" images, screenshots, PDFs, handwritten notes, and charts—extracting structured tables, diagnosing website layout bugs, or auditing ad creatives.',
    vaUseCases: [
      'Bookkeeping VAs scanning receipts and bank statements straight into QuickBooks/CSV',
      'E-commerce VAs generating SEO alt-text and product descriptions from catalog photos',
      'Auditing landing page screenshots for conversion rate optimization (CRO)'
    ],
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200'
  }
];

const FREE_VA_TEMPLATES = [
  {
    id: 'proposal-script',
    role: 'TEMPLATE #1 • HIGH-CONVERTING UPWORK / ONLINEJOBS.PH PROPOSAL',
    title: 'The "Problem-First + Mini-Loom Audit" Proposal Script',
    whenToUse: 'Use this when applying to Virtual Assistant, Admin Support, or AI Automation jobs.',
    content: `Hi [Client First Name],

I noticed in your job post that you're looking for a reliable Virtual Assistant to help manage [insert specific task #1, e.g., daily client inbox triage] and keep [insert tool/task #2, e.g., your Notion/HubSpot CRM] organized so nothing slips through the cracks.

Instead of just listing my resume, I mapped out how I would handle your workflow in Week 1:
1. Inbox & Calendar Zero: Set up priority filters + pre-draft responses for your top 10 recurring inquiries so you only spend 5 minutes approving them.
2. CRM & Task Tracking: Ensure every new lead/task is logged with clear deadlines and automated status updates.
3. Weekly Friday Summary: Send you a clean 5-bullet KPI recap every Friday afternoon.

I have hands-on experience with [Google Workspace / Notion / Canva / Make.com / ChatGPT] and can start immediately for a 1-week trial task to prove my speed and accuracy.

Would you be open to a quick 10-minute chat this week?

Best regards,
[Your Name]
Executive & AI-Enabled Virtual Assistant`
  },
  {
    id: 'cold-outreach',
    role: 'TEMPLATE #2 • DIRECT CLIENT OUTREACH (LINKEDIN / EMAIL)',
    title: 'The "Time-Buyback" Cold Email for Busy Founders & Agencies',
    whenToUse: 'Send to agency owners, real estate brokers, coaches, or e-commerce founders.',
    content: `Subject: Quick question about [Company Name]'s admin workflow

Hi [First Name],

I've been following [Company Name] and loved your recent update on [mention recent post/service].

I know that as [agencies/founders] scale, the bottleneck is almost always the 10–15 hours a week spent on repetitive admin: qualifying leads, updating the CRM, formatting content, and chasing follow-ups.

I help founders buy back 15+ hours a week by combining dedicated Executive VA support with simple AI automations (so tasks get done in half the time at zero extra software cost).

If I could take 3 repetitive workflows off your plate this month, would it be worth a 10-minute chat? Happy to build you a free 1-page workflow map for your business either way!

Warmly,
[Your Name]`
  },
  {
    id: 'va-checklist',
    role: 'TEMPLATE #3 • FIRST 7 DAYS CLIENT ONBOARDING CHECKLIST',
    title: 'How to Impress Any New Client in Your First Week as a VA',
    whenToUse: 'Follow this exact checklist the moment a client hires you to guarantee long-term retention.',
    content: `DAY 1: ACCESS & SECURITY SETUP
[ ] Request shared access via LastPass / 1Password / Bitwarden (Never ask for plain-text passwords in chat!)
[ ] Set up dedicated Chrome Profile for the client's brand
[ ] Confirm primary communication channel (Slack / WhatsApp / Teams) & working hours overlap

DAY 2–3: STANDARD OPERATING PROCEDURE (SOP) CAPTURE
[ ] Record every task the client shows you on Loom or Scribe
[ ] Use ChatGPT/Claude to turn the transcript into a clean step-by-step Checklist inside Notion/Google Docs
[ ] Deliver your first task 24 hours ahead of deadline

DAY 5: THE FRIDAY EXECUTIVE REPORT (CLIENTS LOVE THIS!)
[ ] Send a concise Friday message:
    1. Completed This Week (with links)
    2. In Progress / Waiting on Approval
    3. Priorities for Next Monday
    4. 1 Proactive Suggestion to save the client time`
  }
];

export const AIAutomationDiagrams: React.FC = () => {
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>(WORKFLOW_BLUEPRINTS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeBlueprint =
    WORKFLOW_BLUEPRINTS.find((b) => b.id === activeBlueprintId) || WORKFLOW_BLUEPRINTS[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-14">
      {/* =====================================================================
          SECTION 1: INTERACTIVE AI AUTOMATION FLOW DIAGRAMS & VISUAL BLUEPRINTS
      ====================================================================== */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5 text-blue-600" />
              <span>Visual Architecture &bull; Real AI Automation Flow Diagrams</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How AI Automations Actually Work: Visual Flow Diagrams &amp; Real Blueprints
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every profitable AI automation follows a 5-stage pipeline:{' '}
              <strong className="text-slate-900">1. Trigger (Webhook/Event)</strong> &rarr;{' '}
              <strong className="text-slate-900">2. Context Enrichment</strong> &rarr;{' '}
              <strong className="text-slate-900">3. AI Reasoning (LLM Brain)</strong> &rarr;{' '}
              <strong className="text-slate-900">4. Smart Router</strong> &rarr;{' '}
              <strong className="text-slate-900">5. Multi-App Action</strong>. Click any real-world workflow below to inspect its architecture diagram, AI prompt, and setup steps for free.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold">
              100% Free Interactive Blueprints
            </span>
          </div>
        </div>

        {/* Workflow Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {WORKFLOW_BLUEPRINTS.map((bp, idx) => {
            const isSelected = bp.id === activeBlueprintId;
            return (
              <button
                key={bp.id}
                onClick={() => setActiveBlueprintId(bp.id)}
                className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                  <span className={isSelected ? 'text-blue-100' : 'text-blue-600'}>
                    Diagram 0{idx + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    Saves {bp.timeSaved}
                  </span>
                </div>
                <div className="font-bold text-sm leading-snug">{bp.title}</div>
              </button>
            );
          })}
        </div>

        {/* VISUAL SVG ARCHITECTURE ILLUSTRATION BANNER */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                {activeBlueprint.badge}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {activeBlueprint.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">{activeBlueprint.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700">
                ⏱ Time Saved: <strong className="text-emerald-700">{activeBlueprint.timeSaved}</strong>
              </span>
              <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700">
                💼 VA Market Value: <strong className="text-blue-700">{activeBlueprint.vaServiceValue}</strong>
              </span>
            </div>
          </div>

          {/* SVG VISUAL PIPELINE DIAGRAM (DESKTOP & MOBILE RESPONSIVE) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs overflow-x-auto">
            <div className="min-w-[760px]">
              <svg
                viewBox="0 0 960 195"
                className="w-full h-auto select-none"
                role="img"
                aria-label={`Visual Automation Flow Diagram for ${activeBlueprint.title}`}
              >
                <defs>
                  <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="50%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <marker
                    id="arrowHead"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,0 L8,4 L0,8 Z" fill="#64748b" />
                  </marker>
                </defs>

                {/* Subtle Grid Lines */}
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                </pattern>
                <rect width="960" height="195" fill="url(#smallGrid)" rx="12" />

                {/* Connecting Flow Arrows */}
                <line
                  x1="172"
                  y1="98"
                  x2="205"
                  y2="98"
                  stroke="#64748b"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#arrowHead)"
                />
                <line
                  x1="362"
                  y1="98"
                  x2="395"
                  y2="98"
                  stroke="#64748b"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#arrowHead)"
                />
                <line
                  x1="562"
                  y1="98"
                  x2="595"
                  y2="98"
                  stroke="#64748b"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#arrowHead)"
                />
                <line
                  x1="752"
                  y1="98"
                  x2="785"
                  y2="98"
                  stroke="#64748b"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#arrowHead)"
                />

                {/* Top Pipeline Progress Bar */}
                <rect x="20" y="14" width="920" height="4" rx="2" fill="url(#pipeGrad)" opacity="0.85" />

                {/* NODE 1: TRIGGER */}
                <g transform="translate(18, 36)">
                  <rect
                    width="154"
                    height="124"
                    rx="14"
                    fill="#eff6ff"
                    stroke="#93c5fd"
                    strokeWidth="2"
                  />
                  <rect x="12" y="12" width="68" height="20" rx="6" fill="#2563eb" />
                  <text x="46" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    01 TRIGGER
                  </text>
                  <text x="12" y="54" fill="#0f172a" fontSize="12" fontWeight="bold">
                    {activeBlueprint.nodes[0].title.slice(0, 20)}
                  </text>
                  <text x="12" y="74" fill="#475569" fontSize="10">
                    {activeBlueprint.nodes[0].tool.slice(0, 24)}
                  </text>
                  <text x="12" y="104" fill="#1d4ed8" fontSize="10" fontWeight="600">
                    ⚡ Real-Time Webhook
                  </text>
                </g>

                {/* NODE 2: ENRICH */}
                <g transform="translate(208, 36)">
                  <rect
                    width="154"
                    height="124"
                    rx="14"
                    fill="#eef2ff"
                    stroke="#a5b4fc"
                    strokeWidth="2"
                  />
                  <rect x="12" y="12" width="76" height="20" rx="6" fill="#4f46e5" />
                  <text x="50" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    02 CONTEXT
                  </text>
                  <text x="12" y="54" fill="#0f172a" fontSize="12" fontWeight="bold">
                    {activeBlueprint.nodes[1].title.slice(0, 20)}
                  </text>
                  <text x="12" y="74" fill="#475569" fontSize="10">
                    {activeBlueprint.nodes[1].tool.slice(0, 24)}
                  </text>
                  <text x="12" y="104" fill="#4338ca" fontSize="10" fontWeight="600">
                    🔍 Data &amp; SOP Lookup
                  </text>
                </g>

                {/* NODE 3: AI BRAIN (CENTRAL HIGHLIGHT) */}
                <g transform="translate(398, 28)">
                  <rect
                    width="164"
                    height="140"
                    rx="16"
                    fill="#f5f3ff"
                    stroke="#8b5cf6"
                    strokeWidth="2.5"
                  />
                  <rect x="12" y="12" width="96" height="22" rx="6" fill="#7c3aed" />
                  <text x="60" y="27" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    03 AI LLM BRAIN
                  </text>
                  <text x="12" y="56" fill="#0f172a" fontSize="12.5" fontWeight="bold">
                    {activeBlueprint.nodes[2].title.slice(0, 21)}
                  </text>
                  <text x="12" y="76" fill="#475569" fontSize="10">
                    {activeBlueprint.nodes[2].tool.slice(0, 25)}
                  </text>
                  <rect x="12" y="92" width="140" height="32" rx="8" fill="#ede9fe" />
                  <text x="82" y="112" textAnchor="middle" fill="#5b21b6" fontSize="10" fontWeight="bold">
                    🤖 Structured JSON Output
                  </text>
                </g>

                {/* NODE 4: ROUTER */}
                <g transform="translate(598, 36)">
                  <rect
                    width="154"
                    height="124"
                    rx="14"
                    fill="#fffbeb"
                    stroke="#fcd34d"
                    strokeWidth="2"
                  />
                  <rect x="12" y="12" width="76" height="20" rx="6" fill="#d97706" />
                  <text x="50" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    04 ROUTER
                  </text>
                  <text x="12" y="54" fill="#0f172a" fontSize="12" fontWeight="bold">
                    {activeBlueprint.nodes[3].title.slice(0, 20)}
                  </text>
                  <text x="12" y="74" fill="#475569" fontSize="10">
                    {activeBlueprint.nodes[3].tool.slice(0, 24)}
                  </text>
                  <text x="12" y="104" fill="#b45309" fontSize="10" fontWeight="600">
                    🔀 If/Else Smart Logic
                  </text>
                </g>

                {/* NODE 5: ACTION */}
                <g transform="translate(788, 36)">
                  <rect
                    width="154"
                    height="124"
                    rx="14"
                    fill="#ecfdf5"
                    stroke="#6ee7b7"
                    strokeWidth="2"
                  />
                  <rect x="12" y="12" width="76" height="20" rx="6" fill="#059669" />
                  <text x="50" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    05 ACTION
                  </text>
                  <text x="12" y="54" fill="#0f172a" fontSize="12" fontWeight="bold">
                    {activeBlueprint.nodes[4].title.slice(0, 20)}
                  </text>
                  <text x="12" y="74" fill="#475569" fontSize="10">
                    {activeBlueprint.nodes[4].tool.slice(0, 24)}
                  </text>
                  <text x="12" y="104" fill="#047857" fontSize="10" fontWeight="600">
                    ✅ CRM + Email + Slack
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* 5-NODE DETAILED CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {activeBlueprint.nodes.map((node) => (
              <div
                key={node.step}
                className={`p-4 rounded-2xl border ${node.color} flex flex-col justify-between space-y-2`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider opacity-80">
                    <span>STEP {node.step}</span>
                    <span>{node.type}</span>
                  </div>
                  <h4 className="font-extrabold text-sm leading-snug">{node.title}</h4>
                  <div className="text-[11px] font-semibold opacity-90">{node.tool}</div>
                </div>
                <p className="text-xs leading-relaxed opacity-85 pt-1">{node.description}</p>
              </div>
            ))}
          </div>

          {/* REAL AI PROMPT & JSON PAYLOAD DEMONSTRATION + STEP-BY-STEP GUIDE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
            {/* Left: System Prompt & JSON Output */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-700 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-violet-600" />
                  <span>Inside Node 03: Real AI System Prompt &amp; JSON Output</span>
                </span>
                <button
                  onClick={() => handleCopy(activeBlueprint.aiPromptSample, `prompt-${activeBlueprint.id}`)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                >
                  {copiedId === `prompt-${activeBlueprint.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {activeBlueprint.aiPromptSample}
              </pre>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Structured JSON Returned to Make.com / n8n Router:
                </span>
                <pre className="bg-slate-900 text-emerald-300 p-3.5 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {activeBlueprint.jsonOutputSample}
                </pre>
              </div>
            </div>

            {/* Right: How to Build It Step-by-Step */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Step-by-Step Implementation Guide (Zero Coding Required)</span>
                  </span>
                </div>

                <ol className="space-y-3">
                  {activeBlueprint.implementationSteps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <div className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                  💡 Pro Tip for Aspiring Virtual Assistants &amp; Freelancers:
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Build this exact workflow in a free Make.com or n8n account, record a 90-second Loom video walking through how the nodes connect, and attach that link to your Upwork / OnlineJobs.ph proposals. Clients hire VAs who show real working systems!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: AI & ITS 6 CORE CAPABILITIES (COMPLETE FREE VISUAL GUIDE)
      ====================================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-violet-600" />
              <span>AI &amp; Its Capabilities &bull; Complete Educational Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding Modern AI Capabilities &amp; How to Use Them in Real Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Artificial Intelligence is not just a chat box. Below are the <strong className="text-slate-900">6 Core Capabilities of Modern AI</strong> and how Virtual Assistants, freelancers, and creators use them every day to deliver agency-grade work.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_CAPABILITIES_MATRIX.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${cap.badgeColor}`}>
                      {cap.category}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <IconComponent className="w-5 h-5 text-slate-700" />
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Real VA &amp; Freelancer Use Cases:
                  </div>
                  <ul className="space-y-1.5">
                    {cap.vaUseCases.map((uc, uIdx) => (
                      <li key={uIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>

                  {cap.partnerLink && (
                    <div className="pt-2">
                      <a
                        href={cap.partnerLink}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="w-full py-2.5 px-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>{cap.partnerLabel}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: FREE COPY-PASTE VA & FREELANCER CAREER TOOLKIT
      ====================================================================== */}
      <section className="bg-gradient-to-br from-emerald-50/70 via-white to-blue-50/60 border border-emerald-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-emerald-200/60 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>100% Free Career Starter Toolkit &bull; Zero Cost Forever</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Free Copy-Paste Proposal Templates, Cold Outreach Scripts &amp; VA Checklists
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Created for aspiring Virtual Assistants, career shifters, and freelancers worldwide. Copy any template below with one click, customize the bracketed fields, and use it to land high-paying remote clients.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FREE_VA_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block">
                  {tpl.role}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-500">{tpl.whenToUse}</p>
              </div>

              <pre className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs text-slate-700 font-sans whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                {tpl.content}
              </pre>

              <button
                onClick={() => handleCopy(tpl.content, tpl.id)}
                className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedId === tpl.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied Template to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Free Template</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AIAutomationDiagrams;
