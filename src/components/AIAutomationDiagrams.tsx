import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Workflow,
  Cpu,
  Zap,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  Box,
  Music,
  FileText,
  Database,
  Mail,
  MessageSquare,
  Globe,
  Layers,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Terminal,
  Code2,
  ShieldCheck,
  Eye,
  Activity,
  PhoneCall,
  Video,
  Search,
  X,
  ArrowRight,
  Bot,
  Sliders
} from 'lucide-react';

const MESHY_REFERRAL_URL =
  'https://www.meshy.ai/?utm_source=meshy&utm_medium=referral-program&utm_content=ER3M3J&share_type=invite-friends';
const SUNO_REFERRAL_URL = 'https://suno.com/@chillvibemusics';

export interface TopologyNode {
  step: string;
  type: 'TRIGGER' | 'ENRICH' | 'AI BRAIN' | 'ROUTER' | 'ACTION';
  title: string;
  tool: string;
  description: string;
  inputPayload: string;
  processingLogic: string;
  outputPayload: string;
  latency: string;
  statusUptime: string;
  iconType: 'webhook' | 'search' | 'brain' | 'router' | 'action' | 'box' | 'music' | 'phone';
  detailedSpecs: {
    protocol: string;
    endpoint: string;
    retryPolicy: string;
    secretKeys: string[];
    payloadSchema: string;
    fallbackAction: string;
  };
}

export interface WorkflowBlueprint {
  id: string;
  categoryKey: string;
  categoryLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  timeSaved: string;
  vaServiceValue: string;
  tools: string[];
  nodes: TopologyNode[];
  aiPromptSample: string;
  jsonOutputSample: string;
  implementationSteps: string[];
}

export const WORKFLOW_BLUEPRINTS: WorkflowBlueprint[] = [
  {
    id: 'lead-triage',
    categoryKey: 'sales',
    categoryLabel: 'Sales & Speed-to-Lead Triage',
    badge: 'TOPOLOGY BLUEPRINT 01 • REAL-TIME SPEED-TO-LEAD PIPELINE',
    title: 'Real-Time Webhook Inbound → AI Qualification & Scoring → CRM & Slack VIP Dispatch',
    subtitle:
      'Autonomous pipeline capturing website inquiries, enriching company firmographics, scoring leads (0–100) with Claude 3.7 JSON Mode, and generating custom proposal drafts in under 4 seconds.',
    timeSaved: '15+ Hours / Week',
    vaServiceValue: '$600 – $1,500 Setup Fee',
    tools: ['Make.com / n8n', 'Typeform / Webhook', 'Claude 3.7 / GPT-4o', 'Notion / HubSpot CRM', 'Slack Webhook', 'Gmail API'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Webhook Event Ingestion',
        tool: 'Typeform / Webflow Form POST',
        description: 'Listens for instant HTTP POST payloads upon prospect form submission with cryptographic HMAC validation.',
        inputPayload: '{\n  "prospect_name": "Sarah Jenkins",\n  "company_domain": "apexstudio.io",\n  "monthly_budget": "$5,000",\n  "pain_point": "Manual onboarding delays"\n}',
        processingLogic: 'Validates payload structure, checks rate limits, and sanitizes input fields against SQL/XSS injections.',
        outputPayload: '{\n  "event_id": "evt_991823",\n  "clean_data": { "name": "Sarah", "domain": "apexstudio.io", "budget": 5000 },\n  "timestamp": "2026-10-30T10:00:00Z"\n}',
        latency: '~12ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'HTTP/2 POST (application/json)',
          endpoint: 'https://hook.make.com/v1/wh_lead_inbound',
          retryPolicy: '3 retries with exponential backoff (2s, 8s, 30s) -> Dead Letter Queue',
          secretKeys: ['WEBHOOK_SIGNING_SECRET', 'MAKE_GATEWAY_TOKEN'],
          payloadSchema: 'JSON Schema Draft-07 (Required: name, email, domain, budget)',
          fallbackAction: 'Routes malformed payloads to error triage channel in Slack.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Domain & Firmographic Scraping',
        tool: 'Perplexity API / ScrapingBee',
        description: 'Queries domain metadata, company tech stack, employee count, and recent press releases for full context.',
        inputPayload: '{\n  "domain": "apexstudio.io"\n}',
        processingLogic: 'Fetches homepage meta tags, LinkedIn summary, and tech stack fingerprints via automated headless browser.',
        outputPayload: '{\n  "company_name": "Apex Studio",\n  "industry": "B2B Design Agency",\n  "team_size": "25-50",\n  "tech_stack": ["Figma", "Webflow", "HubSpot"]\n}',
        latency: '~380ms',
        statusUptime: '99.95%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'REST GET with Bearer Token',
          endpoint: 'https://api.perplexity.ai/context/domain-enrich',
          retryPolicy: '2 retries (timeout: 5000ms), fallback to domain DNS WHOIS data',
          secretKeys: ['PERPLEXITY_API_KEY'],
          payloadSchema: 'Object containing company_name, description, employee_range, tech_stack',
          fallbackAction: 'Continues with basic form data if enrichment provider times out.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Cognitive Scoring & Reply Drafting',
        tool: 'Claude 3.7 Sonnet (JSON Mode)',
        description: 'Analyzes prospect fit against Ideal Customer Profile (ICP), computes lead score (0-100), and drafts tailored consultative reply.',
        inputPayload: '{\n  "prospect": { "name": "Sarah", "budget": 5000 },\n  "company": { "industry": "Design Agency", "team_size": "25-50" }\n}',
        processingLogic: 'Executes system prompt with strict schema enforcement. Scores 94/100, assigns HIGH_VIP tier, writes 3-paragraph consultative reply.',
        outputPayload: '{\n  "lead_score": 94,\n  "priority_tier": "HIGH_VIP",\n  "key_angle": "Client onboarding bottleneck",\n  "draft_reply": "Hi Sarah, congratulations on Apex Studio\'s Q3 expansion..."\n}',
        latency: '~840ms',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/messages',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Immediate fallback to GPT-4o-mini if rate-limited',
          secretKeys: ['ANTHROPIC_API_KEY', 'OPENAI_API_KEY_BACKUP'],
          payloadSchema: 'JSON Object strictly validated against JSON Schema definition',
          fallbackAction: 'Defaults to standard executive notification with raw prompt if LLM error occurs.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Conditional VIP Logic Router',
        tool: 'Make.com Router Node',
        description: 'Splits execution into distinct high-speed branches based on lead score threshold (Score >= 80 vs < 80).',
        inputPayload: '{\n  "lead_score": 94,\n  "priority_tier": "HIGH_VIP"\n}',
        processingLogic: 'Condition: `lead_score >= 80` -> Route to Fast-Track Branch A (Instant Deal + Slack VIP Ping); else Route to Branch B (Email Nurture).',
        outputPayload: '{\n  "selected_branch": "BRANCH_A_FAST_TRACK",\n  "alert_level": "URGENT_NOTIFY"\n}',
        latency: '~4ms',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'Internal Workflow Evaluation Engine',
          endpoint: 'local://router/lead-score-switch',
          retryPolicy: 'Deterministic in-memory evaluation (Zero network call)',
          secretKeys: [],
          payloadSchema: 'Boolean predicate evaluation',
          fallbackAction: 'Routes to general triage queue if condition variable is undefined.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Multi-App CRM & Notification Dispatch',
        tool: 'Notion CRM + Gmail Draft + Slack VIP',
        description: 'Creates Deal Card in Notion/HubSpot, stages personalized reply in Gmail drafts with booking link, and pings #vip-leads Slack.',
        inputPayload: '{\n  "deal_title": "Apex Studio ($5k/mo)",\n  "contact": "sarah@apexstudio.io",\n  "draft": "Hi Sarah..."\n}',
        processingLogic: 'Executes parallel API calls to Notion Database, Gmail API (createDraft), and Slack Incoming Webhook with sound chime.',
        outputPayload: '{\n  "notion_card_id": "notion_88291",\n  "gmail_draft_id": "draft_18f23",\n  "slack_ts": "1730282400.001",\n  "status": "DISPATCH_COMPLETE"\n}',
        latency: '~160ms',
        statusUptime: '99.96%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Multi-target REST APIs (OAuth2 & Bot Tokens)',
          endpoint: 'notion.so/api/v1/pages, slack.com/api/chat.postMessage',
          retryPolicy: 'Idempotency key enforcement to prevent duplicate CRM card creation',
          secretKeys: ['NOTION_INTEGRATION_TOKEN', 'GMAIL_REFRESH_TOKEN', 'SLACK_BOT_TOKEN'],
          payloadSchema: 'Parallel action dispatch payload',
          fallbackAction: 'Logs failed writes to Google Sheets audit fallback table.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Inside Make.com / n8n Cognitive LLM Module):
You are an Enterprise Lead Qualification AI Engine.
Analyze the incoming inquiry and domain intelligence payload below.
Return strictly valid JSON matching this schema:
{
  "lead_score": number (0-100 based on budget, company scale, and workflow pain fit),
  "priority_tier": "HIGH_VIP" | "STANDARD" | "LOW_FIT",
  "primary_bottleneck": string (concise 1-sentence description),
  "tailored_proposal_reply": string (Warm, consultative 3-paragraph reply referencing their company and inviting them to a 15-minute onboarding review)
}`,
    jsonOutputSample: `{
  "lead_score": 94,
  "priority_tier": "HIGH_VIP",
  "primary_bottleneck": "Client onboarding bottleneck taking 8+ manual hours per account.",
  "tailored_proposal_reply": "Hi Sarah,\\n\\nI took a look at Apex Studio's portfolio—your team's recent B2B branding work is fantastic! I noticed your inquiry mentioned delays in onboarding new retainer clients.\\n\\nWe built an automated system that connects Typeform inquiries directly into Notion CRM and auto-provisions client Google Drive folders within 4 seconds of contract signing.\\n\\nWould you be open to a 10-minute screenshare this Thursday to see the live workflow in action?"
}`,
    implementationSteps: [
      'Create a free Make.com or n8n account and add a "Custom Webhook" trigger node.',
      'Connect your website contact form (Typeform, Tally, or Webflow) to send POST data to the Webhook URL.',
      'Add an Anthropic Claude or OpenAI module with Response Format set to "JSON Object" using the System Prompt above.',
      'Add a Router module: Branch A (lead_score >= 80) sends an instant Slack alert + stages a Gmail Draft; Branch B logs to Google Sheets / Notion CRM.',
      'Test the end-to-end flow with sample data and verify that the Gmail Draft and Slack alert appear in under 4 seconds.'
    ]
  },
  {
    id: 'inbox-rag',
    categoryKey: 'support',
    categoryLabel: '24/7 Smart Inbox Support & RAG',
    badge: 'TOPOLOGY BLUEPRINT 02 • RETRIEVAL-AUGMENTED GENERATION (RAG)',
    title: 'Gmail / Outlook Event Watcher → Semantic SOP Vector Search → Human-in-the-Loop Slack Approval',
    subtitle:
      'How Virtual Assistants handle 200+ high-urgency client emails daily with zero hallucinations by anchoring replies strictly to company SOPs in Pinecone.',
    timeSaved: '12+ Hours / Week',
    vaServiceValue: '$500 – $1,200 / Month Retainer',
    tools: ['Gmail Watcher', 'OpenAI Classifier', 'Pinecone / Vector DB', 'Claude 3.7 Sonnet', 'Slack Block Kit'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Inbound Email Stream Watcher',
        tool: 'Gmail Pub/Sub / Outlook Webhook',
        description: 'Monitors client inbox in real-time for new customer emails, stripping newsletters and automated spam.',
        inputPayload: '{\n  "thread_id": "th_1892",\n  "from": "marcus@clientcorp.com",\n  "subject": "Question about Q4 plan upgrade and refund policy"\n}',
        processingLogic: 'Filters incoming message headers against blocklists, checks thread history, extracts clean plain-text body.',
        outputPayload: '{\n  "clean_message": "Do you offer prorated refunds if our team scales down in month 3?",\n  "sender": "marcus@clientcorp.com"\n}',
        latency: '~15ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Google Cloud Pub/Sub Webhook',
          endpoint: 'https://pubsub.googleapis.com/v1/projects/agent-inbox/subscriptions/gmail-sub',
          retryPolicy: 'Automatic message redelivery if ACK is not received within 10 seconds',
          secretKeys: ['GCP_PUBSUB_SERVICE_KEY'],
          payloadSchema: 'Base64 encoded Gmail notification payload',
          fallbackAction: 'Polls IMAP folder every 60 seconds if webhook disconnects.'
        }
      },
      {
        step: '02',
        type: 'AI BRAIN',
        title: 'Intent & Urgency Classification',
        tool: 'GPT-4o-mini Classifier',
        description: 'Categorizes email into [1] Billing, [2] Technical Bug, [3] Sales Inquiry, or [4] Urgent Escalation.',
        inputPayload: '{\n  "text": "Do you offer prorated refunds if our team scales down in month 3?"\n}',
        processingLogic: 'Zero-shot classification assigning category: BILLING_REFUND, urgency: HIGH, sentiment: NEUTRAL.',
        outputPayload: '{\n  "category": "BILLING_REFUND",\n  "urgency": "HIGH",\n  "sentiment": "NEUTRAL",\n  "requires_approval": true\n}',
        latency: '~190ms',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/chat/completions',
          endpoint: 'https://api.openai.com/v1/chat/completions',
          retryPolicy: '2 retries with rapid timeout (2000ms)',
          secretKeys: ['OPENAI_API_KEY'],
          payloadSchema: 'JSON schema with strict enum values for category and urgency',
          fallbackAction: 'Routes unclassified messages directly to Human VA inbox tag.'
        }
      },
      {
        step: '03',
        type: 'ENRICH',
        title: 'SOP Knowledge Base RAG Retrieval',
        tool: 'Pinecone Vector DB (text-embedding-3)',
        description: 'Performs cosine similarity search against company handbook, refund clauses, and SLA guidelines.',
        inputPayload: '{\n  "query": "prorated refund policy team scale down",\n  "top_k": 3\n}',
        processingLogic: 'Converts query to 1536-dim vector embedding. Retrieves Section 4.2: "Prorated Billing & Grace Period Terms".',
        outputPayload: '{\n  "matched_chunks": [\n    "Clause 4.2: Enterprise teams may downgrade at any billing cycle end with 14 days notice. Prorated credits apply to next invoice."\n  ],\n  "similarity_score": 0.89\n}',
        latency: '~55ms',
        statusUptime: '99.95%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'gRPC / HTTPS Vector Query',
          endpoint: 'https://company-sops-prod.pinecone.io/query',
          retryPolicy: 'Fallback to Notion Search API if vector index unreachable',
          secretKeys: ['PINECONE_API_KEY', 'PINECONE_ENVIRONMENT'],
          payloadSchema: 'Top-K semantic chunks with metadata citations',
          fallbackAction: 'Falls back to cached local FAQ dictionary.'
        }
      },
      {
        step: '04',
        type: 'AI BRAIN',
        title: 'Strict Grounded Reply Generation',
        tool: 'Claude 3.7 Sonnet',
        description: 'Synthesizes professional reply citing official policy strictly without hallucinating non-existent promises.',
        inputPayload: '{\n  "customer_inquiry": "Do you offer prorated refunds...",\n  "sop_context": "Clause 4.2: Enterprise teams..."\n}',
        processingLogic: 'Enforces strict grounding guardrails. Generates polite, clear email with precise policy citations.',
        outputPayload: '{\n  "draft_body": "Hi Marcus, thank you for reaching out! Under Clause 4.2 of our agreement...",\n  "confidence": 0.98\n}',
        latency: '~710ms',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST Anthropic Messages',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Retry with temperature 0.0 for deterministic output',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Structured text output with source citations',
          fallbackAction: 'Alerts VA that manual response is required.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Slack Block Kit 1-Click Approval',
        tool: 'Slack Interactive App + Gmail API',
        description: 'Presents interactive draft in Slack with "✅ Approve & Send", "✏️ Edit Draft", and "❌ Escalate" buttons.',
        inputPayload: '{\n  "thread_id": "th_1892",\n  "draft": "Hi Marcus...",\n  "recipient": "marcus@clientcorp.com"\n}',
        processingLogic: 'On VA click "✅ Approve", fires Gmail API `messages.send` and tags thread "Resolved by AI + VA".',
        outputPayload: '{\n  "status": "APPROVED_AND_SENT",\n  "sent_timestamp": "2026-10-30T10:01:14Z",\n  "handling_time": "74s"\n}',
        latency: '~110ms',
        statusUptime: '99.99%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Slack Block Kit Webhook + Gmail REST API',
          endpoint: 'https://slack.com/api/chat.postMessage',
          retryPolicy: 'Interactive button payload verification with signing secret',
          secretKeys: ['SLACK_SIGNING_SECRET', 'GMAIL_TOKEN'],
          payloadSchema: 'Slack interactive message action payload',
          fallbackAction: 'Saves draft directly in Gmail Drafts folder if Slack fails.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Strict Grounded RAG Assistant):
You are an Executive Support Assistant for [Company Name].
Rules:
1. Answer the customer's inquiry using ONLY the verified SOP context provided below.
2. If the SOP context does not explicitly state the answer, write: "I am verifying this specific detail with our operations manager and will follow up within 2 business hours."
3. Never invent refund terms, dates, or discounts. Keep tone professional and courteous.`,
    jsonOutputSample: `{
  "intent": "BILLING_REFUND_INQUIRY",
  "confidence": 0.98,
  "cited_clause": "Clause 4.2 (Prorated Credits)",
  "draft_reply": "Hi Marcus,\\n\\nThank you for reaching out! Under Clause 4.2 of our Growth Plan agreement, teams may adjust user seats at the conclusion of each billing period with 14 days notice. Any prorated credits are automatically applied to your subsequent invoice.\\n\\nWould you like me to connect you with our accounts team to process this adjustment for your next cycle?"
}`,
    implementationSteps: [
      'Export your company FAQ and policy documents into clean markdown files.',
      'Upload and vectorize the documents in Pinecone or Supabase vector storage using OpenAI text-embedding-3-small.',
      'Set up Make.com / Zapier to trigger on new Gmail messages tagged with the inbox label.',
      'Query the vector store with the email body, pass top chunks into Claude 3.7 with the strict system prompt above.',
      'Send a Slack notification with interactive Block Kit buttons for 1-click human VA approval.'
    ]
  },
  {
    id: 'ecommerce-3d',
    categoryKey: '3d-mesh',
    categoryLabel: '3D E-Commerce & Asset Pipeline (Meshy AI)',
    badge: 'TOPOLOGY BLUEPRINT 03 • 3D SPATIAL & E-COMMERCE PIPELINE',
    title: 'Product Photo Upload → Vision Analysis → Meshy AI 3D Generation → GLB Web Optimization & Shopify Sync',
    subtitle:
      'Turn flat 2D client product photos into interactive, WebGL-ready 3D models (.GLB / .USDZ) automatically using Meshy AI text/image-to-3D synthesis.',
    timeSaved: '20+ Hours / Week',
    vaServiceValue: '$800 – $2,500 / Project Package',
    tools: ['AWS S3 / Cloudinary', 'GPT-4o Vision', 'Meshy AI 3D Generator', 'Draco Mesh Optimizer', 'Shopify GraphQL API'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Product Image Upload Trigger',
        tool: 'Cloudinary / S3 Webhook Dropzone',
        description: 'Listens for high-resolution product photos uploaded by client via client portal or Dropbox folder.',
        inputPayload: '{\n  "file_url": "https://cdn.store.com/uploads/sneaker_orthopedic_v2.png",\n  "sku": "SKU-9941",\n  "category": "footwear"\n}',
        processingLogic: 'Validates image dimensions, strips background artifacts, and prepares clean RGBA PNG file.',
        outputPayload: '{\n  "clean_image_url": "https://cdn.store.com/clean/sneaker_orthopedic.png",\n  "resolution": "2048x2048"\n}',
        latency: '~220ms',
        statusUptime: '99.98%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'S3 Event Notification (ObjectCreated:Put)',
          endpoint: 'arn:aws:s3:::client-product-intake/uploads/*',
          retryPolicy: 'AWS SQS dead-letter queue after 3 failed downloads',
          secretKeys: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'],
          payloadSchema: 'S3 event JSON structure with bucket name and object key',
          fallbackAction: 'Alerts client if uploaded image is under 800x800px minimum.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Multimodal Vision & PBR Prompt Synthesis',
        tool: 'GPT-4o Vision Analyzer',
        description: 'Analyzes material properties (matte mesh, brushed leather, rubber tread) and creates optimal 3D generation prompts.',
        inputPayload: '{\n  "image": "sneaker_orthopedic.png"\n}',
        processingLogic: 'Extracts surface texture characteristics, color palette hex codes, and structural geometric contours.',
        outputPayload: '{\n  "meshy_prompt": "Ergonomic running sneaker, matte technical mesh upper, pure white midsole with hexagonal grip texture, studio lighting PBR maps",\n  "geometry": "watertight_mesh"\n}',
        latency: '~680ms',
        statusUptime: '99.95%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/chat/completions (Vision)',
          endpoint: 'https://api.openai.com/v1/chat/completions',
          retryPolicy: '2 retries with exponential delay',
          secretKeys: ['OPENAI_API_KEY'],
          payloadSchema: 'Vision prompt optimization object',
          fallbackAction: 'Uses fallback general product category template.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Meshy AI 3D Mesh & Texture Generation',
        tool: 'Meshy AI 3D API (Image-to-3D Mode)',
        description: 'Synthesizes complete 3D polygon geometry, UV unwrap maps, normal maps, and roughness maps (.GLB/.OBJ).',
        inputPayload: '{\n  "image_url": "sneaker_orthopedic.png",\n  "ai_prompt": "Ergonomic running sneaker...",\n  "texture_richness": "high"\n}',
        processingLogic: 'Meshy AI generative neural pipeline builds 3D volume, bakes 4K PBR textures, and exports .GLB & .USDZ.',
        outputPayload: '{\n  "task_id": "mesh_task_8912",\n  "glb_url": "https://assets.meshy.ai/models/sneaker_orthopedic.glb",\n  "poly_count": 38000\n}',
        latency: '~42s (Async Webhook)',
        statusUptime: '99.90%',
        iconType: 'box',
        detailedSpecs: {
          protocol: 'HTTPS POST & Webhook Callback',
          endpoint: 'https://api.meshy.ai/v1/image-to-3d',
          retryPolicy: 'Task status polling with exponential backoff if webhook fails',
          secretKeys: ['MESHY_API_KEY'],
          payloadSchema: 'Meshy task creation and callback payload',
          fallbackAction: 'Notifies designer if source photo lacks sufficient angle contrast.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Draco Compression & WebGL LOD Optimizer',
        tool: 'Node.js Draco WebAssembly Pipeline',
        description: 'Compresses geometry from 28MB down to 2.4MB for instant mobile web loading without visual quality loss.',
        inputPayload: '{\n  "raw_glb_url": "sneaker_orthopedic.glb",\n  "target_size_mb": 3.0\n}',
        processingLogic: 'Applies Draco compression to vertex positions, normal vectors, and texture WebP conversions.',
        outputPayload: '{\n  "compressed_glb_url": "sneaker_orthopedic_opt.glb",\n  "final_size": "2.1MB",\n  "load_time_mobile": "0.3s"\n}',
        latency: '~1.4s',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'Serverless Worker (gltf-transform)',
          endpoint: 'https://optimizer.internal.agency/compress',
          retryPolicy: 'Auto-fallback to standard GLB if Draco codec fails',
          secretKeys: [],
          payloadSchema: 'Binary GLB streaming transform',
          fallbackAction: 'Serves uncompressed model if optimizer fails.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Shopify 3D Viewer & CDN Asset Sync',
        tool: 'Shopify GraphQL Admin API',
        description: 'Attaches 3D model to product listing with interactive 360-degree orbit viewer and AR Quick Look for iOS/Android.',
        inputPayload: '{\n  "sku": "SKU-9941",\n  "model_glb": "sneaker_orthopedic_opt.glb"\n}',
        processingLogic: 'Calls Shopify `productCreateMedia` mutation. Activates AR camera preview on customer mobile devices.',
        outputPayload: '{\n  "shopify_media_id": "gid://shopify/Model3d/91823",\n  "status": "LIVE_ON_STORE",\n  "live_url": "https://store.com/products/sneaker-orthopedic"\n}',
        latency: '~340ms',
        statusUptime: '99.97%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Shopify GraphQL Admin API 2026-10',
          endpoint: 'https://store.myshopify.com/admin/api/2026-10/graphql.json',
          retryPolicy: 'Shopify API rate-limit queueing with Leaky Bucket algorithm',
          secretKeys: ['SHOPIFY_ADMIN_ACCESS_TOKEN'],
          payloadSchema: 'GraphQL mutation productCreateMedia payload',
          fallbackAction: 'Archives 3D file in Google Drive and alerts store manager.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Meshy AI 3D Prompt Synthesis):
Analyze this client product photo and generate the exact prompt for Meshy AI Image-to-3D:
1. Specify geometry structure: Clean industrial design, symmetrical topology, watertight polygonal mesh.
2. Specify PBR materials: Define roughness, metallic attributes, matte surfaces, and lighting reflections.
3. Target output: Production-ready .GLB for e-commerce WebGL product viewer.`,
    jsonOutputSample: `{
  "product_title": "Ergonomic Performance Running Sneaker",
  "meshy_3d_prompt": "Ultra-detailed athletic running shoe, lightweight breathable engineered mesh, matte synthetic leather overlays, sculpted EVA foam midsole with hexagonal tread pattern, studio PBR materials, 4k octane render style",
  "estimated_generation_time_seconds": 45,
  "supported_formats": [".GLB", ".USDZ", ".FBX", ".OBJ"]
}`,
    implementationSteps: [
      'Create an account on Meshy AI using referral link (ER3M3J) to unlock free generation credits.',
      'Configure an AWS S3 bucket or Google Drive folder where clients can drop product photos.',
      'Use a Make.com HTTP module to send the image to Meshy AI REST API endpoint `/v1/image-to-3d`.',
      'Set up a webhook listener to capture the finished .GLB file once Meshy synthesis completes.',
      'Use the Shopify GraphQL API `productCreateMedia` mutation to attach the interactive 3D model directly to product pages.'
    ]
  },
  {
    id: 'video-reels-engine',
    categoryKey: 'video-audio',
    categoryLabel: 'Autonomous Faceless Video Reels (Suno + ElevenLabs)',
    badge: 'TOPOLOGY BLUEPRINT 04 • CREATIVE AI AUDIO & VIDEO FACTORY',
    title: 'Content Topic Ingestion → Viral Script Brain → ElevenLabs Voice + Suno Music → Auto-Render & Social Post',
    subtitle:
      'Generate 10+ TikTok, Reels, and Shorts daily by connecting script generation, ElevenLabs neural voiceover, Suno AI custom music tracks, and automated video rendering.',
    timeSaved: '22+ Hours / Week',
    vaServiceValue: '$900 – $2,200 / Month Package',
    tools: ['Notion Calendar', 'Claude 3.7 Scripting', 'ElevenLabs Voice AI', 'Suno AI Music Studio', 'Shotstack / Creatomate', 'Metricool API'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Content Queue & Topic Trigger',
        tool: 'Notion Database / RSS Feed',
        description: 'Triggers daily at 8:00 AM or when a new topic row is marked "Ready for Production" in Notion.',
        inputPayload: '{\n  "topic": "3 AI Tools Saving Remote VAs 10 Hours a Week",\n  "target_audience": "Freelancers & VAs"\n}',
        processingLogic: 'Fetches article references, verifies target duration (30-45 seconds), and initiates video build run.',
        outputPayload: '{\n  "project_id": "vid_994",\n  "topic": "3 AI Tools...",\n  "format": "9:16_VERTICAL"\n}',
        latency: '~20ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Notion Database Polling / Webhook',
          endpoint: 'https://api.notion.com/v1/databases/notion_db_content/query',
          retryPolicy: 'Auto-retry on 502/503 errors with 30s pause',
          secretKeys: ['NOTION_INTEGRATION_KEY'],
          payloadSchema: 'Notion page properties object',
          fallbackAction: 'Pulls from emergency backlog topic list.'
        }
      },
      {
        step: '02',
        type: 'AI BRAIN',
        title: 'Viral Hook & 30-Second Script Engine',
        tool: 'Claude 3.7 Sonnet',
        description: 'Generates 3-second visual text hook, dynamic 75-word voiceover script, and Suno AI music style prompt.',
        inputPayload: '{\n  "topic": "3 AI Tools Saving Remote VAs..."\n}',
        processingLogic: 'Applies retention framework: Hook -> Problem -> Agitate -> 3 Tools -> Call-to-Action.',
        outputPayload: '{\n  "hook_caption": "Stop doing this manually in 2026...",\n  "voiceover_text": "If you are still copying and pasting emails...",\n  "suno_style": "Upbeat lo-fi electronic synthwave beat 110 BPM"\n}',
        latency: '~610ms',
        statusUptime: '99.98%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/messages',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Retry with lowered temperature on syntax error',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Structured script JSON schema',
          fallbackAction: 'Uses verified high-performing script template.'
        }
      },
      {
        step: '03',
        type: 'ENRICH',
        title: 'ElevenLabs Voice & Suno AI Music Synthesis',
        tool: 'ElevenLabs Voice + Suno Music Studio',
        description: 'Synthesizes studio-grade neural voiceover and generates matching royalty-free background beat via Suno AI.',
        inputPayload: '{\n  "voice_text": "If you are still copying...",\n  "suno_prompt": "Upbeat lo-fi electronic synthwave..."\n}',
        processingLogic: 'ElevenLabs renders emotional human inflection; Suno produces synchronized instrumental backing track.',
        outputPayload: '{\n  "voice_url": "https://cdn.agency.com/audio/voice_994.mp3",\n  "music_url": "https://cdn.agency.com/audio/suno_994.mp3",\n  "duration_sec": 32.4\n}',
        latency: '~4.2s',
        statusUptime: '99.90%',
        iconType: 'music',
        detailedSpecs: {
          protocol: 'Parallel REST Audio APIs',
          endpoint: 'https://api.elevenlabs.io/v1/text-to-speech, https://suno.com/@chillvibemusics',
          retryPolicy: 'Fallback to pre-rendered licensed audio library if Suno/ElevenLabs API limits hit',
          secretKeys: ['ELEVENLABS_API_KEY', 'SUNO_ACCESS_TOKEN'],
          payloadSchema: 'Audio render response with MP3 streaming links',
          fallbackAction: 'Uses royalty-free acoustic library backing track.'
        }
      },
      {
        step: '04',
        type: 'ACTION',
        title: 'Cloud Video Render & Kinetic Subtitles',
        tool: 'Creatomate / Shotstack Cloud API',
        description: 'Combines voiceover, background music, B-roll stock footage, and animated word-by-word karaoke captions.',
        inputPayload: '{\n  "voice_url": "voice_994.mp3",\n  "music_url": "suno_994.mp3",\n  "hook": "Stop doing this..."\n}',
        processingLogic: 'Renders 1080x1920 MP4 at 60fps with dynamic audio ducking (-14dB music under voiceover).',
        outputPayload: '{\n  "final_mp4_url": "https://cdn.agency.com/renders/reel_994_final.mp4",\n  "file_size": "18.4MB"\n}',
        latency: '~12.5s',
        statusUptime: '99.95%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Cloud Video Rendering API',
          endpoint: 'https://api.creatomate.com/v1/renders',
          retryPolicy: 'Async render status polling with 30s timeout',
          secretKeys: ['CREATOMATE_API_KEY'],
          payloadSchema: 'Video timeline JSON schema with layered tracks',
          fallbackAction: 'Logs render error to Slack with failed track details.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Multi-Platform Auto-Schedule & Post',
        tool: 'Buffer / Metricool / YouTube API',
        description: 'Distributes completed video simultaneously to Instagram Reels, TikTok, YouTube Shorts, and Facebook Reels.',
        inputPayload: '{\n  "video_url": "reel_994_final.mp4",\n  "caption": "How AI saves 10 hrs/wk #productivity #freelancing"\n}',
        processingLogic: 'Schedules post for peak audience time window (6:30 PM) and stores metrics tracking IDs.',
        outputPayload: '{\n  "post_ids": ["ig_reel_882", "yt_short_129", "tiktok_991"],\n  "status": "ALL_POSTS_SCHEDULED"\n}',
        latency: '~480ms',
        statusUptime: '99.98%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Social Media Management REST API',
          endpoint: 'https://api.metricool.com/v1/posts',
          retryPolicy: 'Auto-retry upload if platform video handshake times out',
          secretKeys: ['METRICOOL_API_TOKEN'],
          payloadSchema: 'Multi-platform social media dispatch payload',
          fallbackAction: 'Saves video to Google Drive "Manual Review" folder.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Faceless Viral Reels Generator):
Given Topic: "3 AI Tools That Replace Boring Admin Work"
Generate:
1. 3-Second Visual Hook (Bold uppercase sentence for screen overlay).
2. 75-Word Voiceover Script with rapid pacing and natural conversational energy.
3. Suno AI Music Style prompt (tempo, instrumentation, mood for instrumental background beat).`,
    jsonOutputSample: `{
  "hook_text": "STOP COPYING EMAILS BY HAND IN 2026",
  "voiceover_script": "If you spend more than 2 hours a day sorting client emails, you are losing money. Top agencies now connect their form submissions straight to Claude using Make dot com. The AI scores every lead, writes custom proposals, and pings your phone before you even finish your coffee. Comment AI below to get our free blueprint.",
  "suno_music_prompt": "Chill driving synthwave beat, deep analog bassline, crisp acoustic snare, 110 BPM, royalty-free background music for tech review"
}`,
    implementationSteps: [
      'Maintain an organized content schedule in Notion with a Status column.',
      'Generate scripts and hooks using Claude 3.7 with the retention framework prompt.',
      'Produce studio voiceovers with ElevenLabs and instrumental tracks using Suno AI (@chillvibemusics).',
      'Stitch the audio and vertical visuals using Creatomate or CapCut templates.',
      'Schedule across TikTok, IG Reels, and YouTube Shorts using Metricool or Buffer.'
    ]
  },
  {
    id: 'voice-booking-ai',
    categoryKey: 'voice-agent',
    categoryLabel: 'Inbound Voice AI & Appointment Booking',
    badge: 'TOPOLOGY BLUEPRINT 05 • BIDIRECTIONAL REAL-TIME VOICE AI',
    title: 'Inbound Twilio Voice Stream → Whisper Live Transcribe → LLM Slot Negotiator → Calendar & SMS Dispatch',
    subtitle:
      'Ultra-low-latency voice receptionist answering client phone calls, negotiating appointment times in real time, and booking Google Calendar events in under 400ms.',
    timeSaved: '18+ Hours / Week',
    vaServiceValue: '$800 – $2,000 Setup Fee',
    tools: ['Twilio Voice SIP', 'Deepgram Nova-2', 'GPT-4o Realtime', 'Google Calendar API', 'Twilio SMS'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Inbound Phone Call Event',
        tool: 'Twilio Voice WebRTC / SIP Stream',
        description: 'Answers customer phone calls within 1 ring, establishing a full-duplex audio stream over WebSockets.',
        inputPayload: '{\n  "call_sid": "CA991823901",\n  "caller_number": "+14155552671",\n  "call_status": "in-progress"\n}',
        processingLogic: 'Initializes bi-directional audio bridge (<40ms latency) and connects to speech pipeline.',
        outputPayload: '{\n  "stream_id": "ws_stream_8819",\n  "caller_phone": "+14155552671"\n}',
        latency: '~35ms',
        statusUptime: '99.99%',
        iconType: 'phone',
        detailedSpecs: {
          protocol: 'WebRTC / WebSocket Bidirectional Stream',
          endpoint: 'wss://voice.agency.com/v1/telephony/stream',
          retryPolicy: 'Auto-fallback to human receptionist line if stream drops',
          secretKeys: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'],
          payloadSchema: 'Twilio Media Stream JSON protocol',
          fallbackAction: 'Transfers call to main office front desk.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Speech-to-Text Live Transcription',
        tool: 'Deepgram Nova-2 Real-Time Stream',
        description: 'Transcribes human speech into text in under 120ms with noise suppression and accent handling.',
        inputPayload: '{\n  "raw_audio_chunk": "pcm_16000_audio_buffer"\n}',
        processingLogic: 'Real-time neural transcription emits finalized words as the caller speaks.',
        outputPayload: '{\n  "transcribed_utterance": "Hi, I would like to schedule a consultation this Friday afternoon.",\n  "confidence": 0.97\n}',
        latency: '~115ms',
        statusUptime: '99.97%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'WebSocket Audio Streaming Protocol',
          endpoint: 'wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000',
          retryPolicy: 'Immediate reconnection with buffered audio frames',
          secretKeys: ['DEEPGRAM_API_KEY'],
          payloadSchema: 'Live word transcript with start/end millisecond timestamps',
          fallbackAction: 'Prompts caller: "Pardon me, could you repeat that?"'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Voice LLM Slot Negotiation Brain',
        tool: 'GPT-4o Realtime / Claude 3.7',
        description: 'Understands intent, queries open calendar slots via function calling, and generates natural spoken response.',
        inputPayload: '{\n  "caller_text": "Schedule consultation this Friday afternoon",\n  "open_slots": ["2:00 PM", "4:30 PM"]\n}',
        processingLogic: 'Selects available candidate slots and formulates natural conversational dialogue.',
        outputPayload: '{\n  "spoken_response": "I would be happy to help with that! We have 2:00 PM or 4:30 PM open this Friday. Which works better for you?",\n  "candidate_date": "2026-11-06"\n}',
        latency: '~260ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS Function Calling & Audio Synthesis',
          endpoint: 'https://api.openai.com/v1/realtime/sessions',
          retryPolicy: 'Sub-second fallback to cached responses for standard FAQs',
          secretKeys: ['OPENAI_REALTIME_API_KEY'],
          payloadSchema: 'Conversational state machine with tool execution callbacks',
          fallbackAction: 'Offers to take a message and arrange callback.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Calendar Concurrency Lock Router',
        tool: 'Google Calendar API Gateway',
        description: 'Applies optimistic locking to guarantee that the selected slot cannot be double-booked during the call.',
        inputPayload: '{\n  "requested_slot": "2026-11-06T14:00:00Z"\n}',
        processingLogic: 'Checks real-time calendar availability: IF slot is free, places 5-minute temporary hold; ELSE suggests alternate time.',
        outputPayload: '{\n  "lock_status": "LOCKED_CONFIRMED",\n  "hold_expires": "14:05:00"\n}',
        latency: '~65ms',
        statusUptime: '99.98%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'OAuth2 REST API (Google Calendar v3)',
          endpoint: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          retryPolicy: 'Atomic transactional lock',
          secretKeys: ['GOOGLE_SERVICE_ACCOUNT_KEY'],
          payloadSchema: 'Google Calendar Event query payload',
          fallbackAction: 'Suggests next available slot within 48 hours.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Calendar Booking & Instant SMS Confirmation',
        tool: 'Google Calendar + Twilio SMS API',
        description: 'Creates confirmed calendar invite, logs patient/client profile in CRM, and texts instant SMS with directions.',
        inputPayload: '{\n  "phone": "+14155552671",\n  "confirmed_time": "Friday Nov 6 @ 2:00 PM"\n}',
        processingLogic: 'Sends SMS confirmation text: "Your consultation is confirmed for Friday at 2:00 PM. Click here to reschedule if needed."',
        outputPayload: '{\n  "calendar_event_id": "cal_evt_1928",\n  "sms_sid": "SM_89182",\n  "status": "APPOINTMENT_LOCKED"\n}',
        latency: '~140ms',
        statusUptime: '99.99%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Twilio Programmable SMS REST API',
          endpoint: 'https://api.twilio.com/2010-04-01/Accounts/{SID}/Messages.json',
          retryPolicy: 'Carrier retry for SMS delivery',
          secretKeys: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'],
          payloadSchema: 'SMS dispatch schema with unique tracking URL',
          fallbackAction: 'Logs confirmation email as secondary channel.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Voice AI Receptionist Agent):
You are the virtual receptionist for [Clinic / Agency Name].
Key Voice Rules:
- Keep every spoken sentence under 20 words.
- Speak with warm, upbeat cadence.
- Always offer 2 distinct time choices when booking (e.g. "I have 2:00 PM or 4:30 PM open").
- When confirmed, inform them that an instant SMS confirmation has just been sent to their phone.`,
    jsonOutputSample: `{
  "caller_intent": "BOOK_CONSULTATION",
  "selected_slot": "2026-11-06T14:00:00-05:00",
  "spoken_confirmation": "Perfect! You are all set for Friday November 6th at 2:00 PM. I just sent a confirmation text to this number with the address and calendar link.",
  "sms_text": "Confirmed: Consultation on Friday Nov 6 @ 2:00 PM. Address: 100 Innovation Way. Need to reschedule? Tap: https://link.agency/cal-1928"
}`,
    implementationSteps: [
      'Purchase a dedicated local phone number on Twilio and configure a SIP Voice Trunk.',
      'Connect Twilio to Vapi.ai, Retell AI, or a custom WebSocket server using Deepgram for transcription.',
      'Configure OpenAI GPT-4o-Realtime or Claude 3.7 with Calendar lookup tool calling functions.',
      'Connect the Google Calendar API service account to check and book available time slots.',
      'Trigger an automated Twilio SMS upon call completion containing the appointment confirmation and reschedule link.'
    ]
  },
  {
    id: 'executive-va-ops',
    categoryKey: 'executive-ops',
    categoryLabel: 'Executive Operations & Financial OCR',
    badge: 'TOPOLOGY BLUEPRINT 06 • AUTONOMOUS BUSINESS OPERATIONS',
    title: 'Multi-Channel Executive Inbound → Multimodal Vision Invoice OCR → Expense Routing → QuickBooks & Daily Briefing',
    subtitle:
      'Turn scattered executive Slack/Telegram requests and receipt photos into categorized QuickBooks ledger entries and daily 5-bullet KPI briefings.',
    timeSaved: '16+ Hours / Week',
    vaServiceValue: '$600 – $1,800 / Month Retainer',
    tools: ['Telegram / Slack Bot', 'GPT-4o Vision OCR', 'Make.com Router', 'QuickBooks Online API', 'Notion Executive Wiki'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Multi-Channel Executive Message Inbound',
        tool: 'Telegram Bot / Slack Private Channel',
        description: 'Captures voice memos, receipt photos, and quick instructions sent by founders while traveling.',
        inputPayload: '{\n  "from": "CEO_Direct",\n  "message_text": "Review attached software receipt for $2,400 and book my flight to Austin",\n  "has_media": true\n}',
        processingLogic: 'Detects compound intent: [1] Document Expense Processing, [2] Travel Logistics Booking.',
        outputPayload: '{\n  "tasks": ["EXPENSE_OCR", "TRAVEL_LOGISTICS"],\n  "file_url": "https://cdn.agency.com/invoices/inv_oct_2026.pdf"\n}',
        latency: '~18ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Telegram Bot Webhook / Slack Events API',
          endpoint: 'https://api.telegram.org/bot{TOKEN}/setWebhook',
          retryPolicy: 'Telegram webhook retry with TLS 1.3',
          secretKeys: ['TELEGRAM_BOT_TOKEN'],
          payloadSchema: 'Telegram Message object with voice/document attachment',
          fallbackAction: 'Routes unparsed attachments to Executive VA review queue.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Multimodal Vision Document OCR',
        tool: 'GPT-4o Vision OCR Engine',
        description: 'Scans PDF invoices or wrinkled receipt photos, extracting vendor, tax ID, line items, and totals.',
        inputPayload: '{\n  "document_url": "inv_oct_2026.pdf"\n}',
        processingLogic: 'Extracts vendor: "AWS Cloud Services", invoice_id: "INV-9921", subtotal: $2,400.00, date: "2026-10-28".',
        outputPayload: '{\n  "vendor": "AWS Cloud Services",\n  "amount_usd": 2400.00,\n  "tax_deductible": true,\n  "category": "Software & Hosting Infrastructure"\n}',
        latency: '~740ms',
        statusUptime: '99.96%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'HTTPS POST /v1/chat/completions (Document)',
          endpoint: 'https://api.openai.com/v1/chat/completions',
          retryPolicy: '2 retries with image preprocessing sharpening',
          secretKeys: ['OPENAI_API_KEY'],
          payloadSchema: 'Structured Financial Document Schema',
          fallbackAction: 'Flags for manual VA review if confidence under 0.90.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Cognitive Task Decomposition & Policy Check',
        tool: 'Claude 3.7 Sonnet',
        description: 'Applies corporate spending policies, verifies receipt legitimacy, and drafts flight itinerary options.',
        inputPayload: '{\n  "expense": { "amount": 2400, "vendor": "AWS" },\n  "travel_request": "Austin on Monday"\n}',
        processingLogic: 'Confirms AWS hosting is pre-authorized. Queries Google Flights API for Austin nonstop flights.',
        outputPayload: '{\n  "expense_approved": true,\n  "flight_options": [\n    { "flight": "United 1420", "dept": "8:15 AM", "price": "$380" },\n    { "flight": "Delta 891", "dept": "11:30 AM", "price": "$410" }\n  ]\n}',
        latency: '~680ms',
        statusUptime: '99.97%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'Anthropic Messages API',
          endpoint: 'https://api.anthropic.com/v1/messages',
          retryPolicy: 'Fallback to secondary LLM engine',
          secretKeys: ['ANTHROPIC_API_KEY'],
          payloadSchema: 'Structured Task Execution Plan',
          fallbackAction: 'Alerts VA if travel criteria ambiguous.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Executive Approval Threshold Gateway',
        tool: 'Make.com Financial Router',
        description: 'Routes expenses < $1,000 to automatic ledger sync; expenses >= $1,000 require 1-click founder button approval.',
        inputPayload: '{\n  "amount": 2400.00,\n  "threshold": 1000.00\n}',
        processingLogic: 'Condition: `amount >= 1000` -> Route to Telegram approval card with [Approve] / [Deny] buttons.',
        outputPayload: '{\n  "route": "APPROVAL_REQUIRED",\n  "approver": "CEO"\n}',
        latency: '~6ms',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'In-Memory Decision Router',
          endpoint: 'local://router/expense-threshold',
          retryPolicy: 'Deterministic zero-delay evaluation',
          secretKeys: [],
          payloadSchema: 'Boolean approval state payload',
          fallbackAction: 'Defaults to approval required for safety.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'QuickBooks Ledger Write & Executive Evening Briefing',
        tool: 'QuickBooks Online API + Telegram Bot',
        description: 'Creates journal entry in QuickBooks, archives PDF in Google Drive, and sends CEO a 4-bullet evening summary.',
        inputPayload: '{\n  "vendor": "AWS Cloud Services",\n  "amount": 2400.00,\n  "flight_booked": "United 1420"\n}',
        processingLogic: 'Writes purchase transaction to QuickBooks chart of accounts and posts cleanly formatted evening briefing.',
        outputPayload: '{\n  "qb_tx_id": "TX_99214",\n  "briefing_status": "SENT_TO_TELEGRAM",\n  "status": "COMPLETED"\n}',
        latency: '~290ms',
        statusUptime: '99.98%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'QuickBooks Online OAuth2 REST API',
          endpoint: 'https://quickbooks.api.intuit.com/v3/company/{realmId}/purchase',
          retryPolicy: 'Auto-refresh OAuth2 tokens every 50 minutes',
          secretKeys: ['QUICKBOOKS_CLIENT_ID', 'QUICKBOOKS_CLIENT_SECRET'],
          payloadSchema: 'QuickBooks Purchase entity creation schema',
          fallbackAction: 'Saves invoice row to Google Sheets fallback sheet.'
        }
      }
    ],
    aiPromptSample: `SYSTEM PROMPT (Executive Operations Assistant):
Given an incoming directive from the CEO:
1. Decompose the request into immediate financial actions vs scheduling/travel tasks.
2. If an invoice or receipt is attached, extract: Vendor, Date, Tax ID, Subtotal, Tax, Total, and suggest QuickBooks Expense Category.
3. Formulate a 4-bullet executive summary with clear 1-click decision buttons.`,
    jsonOutputSample: `{
  "action_type": "EXPENSE_AND_TRAVEL",
  "extracted_invoice": {
    "vendor": "Amazon Web Services Inc",
    "invoice_number": "INV-109283",
    "amount": 2400.00,
    "category": "Cloud Infrastructure & SaaS Hosting"
  },
  "travel_summary": "Found 2 nonstop morning flights to Austin on Monday (United 1420 @ 8:15 AM for $380, Delta 891 @ 11:30 AM for $410). Tap below to book.",
  "quickbooks_status": "STAGED_FOR_APPROVAL"
}`,
    implementationSteps: [
      'Create a Telegram bot via @BotFather and connect it to a Make.com webhook.',
      'Configure GPT-4o Vision module to parse any receipt or invoice photo uploaded to the bot.',
      'Connect QuickBooks Online using OAuth2 to auto-create purchase records in the correct expense account.',
      'Set up a conditional filter requiring 1-click founder button confirmation on any expense over $1,000.',
      'Send an automated 5-bullet executive summary every day at 5:00 PM recapping all processed actions.'
    ]
  }
];

const AI_CAPABILITIES_MATRIX = [
  {
    icon: FileText,
    category: 'CAPABILITY 01 • LANGUAGE & REASONING',
    title: 'Large Language Models (LLMs) & Structured Reasoning',
    description:
      'Modern AI models (Claude 3.7 Sonnet, GPT-4o, Gemini) do not just write text—they follow complex Standard Operating Procedures (SOPs), extract structured JSON from messy emails, summarize 100-page PDFs, and evaluate business logic.',
    vaUseCases: [
      'Drafting executive emails, client proposals & SOP manuals in seconds',
      'Converting messy meeting transcripts into structured action items & Notion tasks',
      'Extracting invoice totals, dates, and vendor names into Google Sheets'
    ],
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
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
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
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
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
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
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
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
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
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
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
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

I know as a founder your calendar gets consumed by administrative tasks—sorting through unvetted inquiries, updating deal stages, and drafting routine follow-ups.

I specialize in helping founders buy back 10 to 15 hours every week by setting up automated lead triage and handling daily inbox operations so you only focus on high-ticket client delivery.

I put together a 90-second video showing how we helped a similar team automate 80% of their intake admin.

Would you be open to seeing the video link?

Best,
[Your Name]
Remote Operations & AI Automation Assistant`
  },
  {
    id: 'weekly-recap',
    role: 'TEMPLATE #3 • FRIDAY CLIENT REPORT (KEEPS CLIENTS PAYING FOR MONTHS)',
    title: 'The "High-Retention" Weekly Executive Recap',
    whenToUse: 'Send every Friday afternoon to keep clients impressed and justify your monthly retainer.',
    content: `Subject: [Company Name] Weekly Operations Recap • Week of [Date]

Hi [Client First Name],

Here is your weekly summary of everything completed across operations:

🎯 Key Achievements This Week:
- Inquiries Processed: [e.g. 42 inbound leads triaged; 8 qualified for VIP follow-up]
- Inbox & Calendar: Maintained Inbox Zero across all 5 business days; scheduled 6 partner calls
- Automation Upgrades: Connected [Make.com / Notion] to auto-tag high-budget prospects

📊 Metrics at a Glance:
- Average Lead Response Time: Down to 4 minutes (was 3 hours)
- Estimated Founder Time Saved: ~14.5 hours this week

🚀 Priorities for Next Week:
- Finalize Q4 client onboarding folder templates
- Set up automated invoice follow-up reminders

Have a great weekend!
[Your Name]`
  }
];

interface AIAutomationDiagramsProps {
  id?: string;
  searchQuery?: string;
}

export const AIAutomationDiagrams: React.FC<AIAutomationDiagramsProps> = ({
  id = 'diagrams',
  searchQuery = ''
}) => {
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>('lead-triage');
  const [activeSimStep, setActiveSimStep] = useState<number>(0); // 0 = idle, 1..5 = active step
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simSpeed, setSimSpeed] = useState<1 | 2>(1);
  const [inspectedNode, setInspectedNode] = useState<TopologyNode | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [simLogs, setSimLogs] = useState<Array<{ id: string; time: string; text: string; type: 'info' | 'success' | 'warn' | 'active' }>>([]);
  const simTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter or detect blueprints matching search query
  const query = searchQuery.trim().toLowerCase();

  const matchingBlueprintIds = useMemo(() => {
    if (!query) return [];
    return WORKFLOW_BLUEPRINTS.filter((bp) => {
      const matchMeta =
        bp.title.toLowerCase().includes(query) ||
        bp.subtitle.toLowerCase().includes(query) ||
        bp.categoryLabel.toLowerCase().includes(query) ||
        bp.tools.some((t) => t.toLowerCase().includes(query));
      const matchNodes = bp.nodes.some(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.tool.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query) ||
          n.processingLogic.toLowerCase().includes(query)
      );
      const matchPrompt = bp.aiPromptSample.toLowerCase().includes(query);
      return matchMeta || matchNodes || matchPrompt;
    }).map((bp) => bp.id);
  }, [query]);

  // Auto-switch to matching blueprint if user searches and current isn't in matches
  useEffect(() => {
    if (matchingBlueprintIds.length > 0 && !matchingBlueprintIds.includes(activeBlueprintId)) {
      setActiveBlueprintId(matchingBlueprintIds[0]);
    }
  }, [matchingBlueprintIds, activeBlueprintId]);

  const activeBlueprint = useMemo(() => {
    return (
      WORKFLOW_BLUEPRINTS.find((bp) => bp.id === activeBlueprintId) ||
      WORKFLOW_BLUEPRINTS[0]
    );
  }, [activeBlueprintId]);

  // Initial simulation logs when blueprint switches
  useEffect(() => {
    setIsSimulating(false);
    setActiveSimStep(0);
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSimLogs([
      {
        id: 'init-1',
        time: timeStr,
        text: `[SYSTEM] Topology Engine initialized: ${activeBlueprint.title}`,
        type: 'info'
      },
      {
        id: 'init-2',
        time: timeStr,
        text: `[STATUS] Ready to execute reactive event flow across 5 nodes. Click "Run Flow Simulation".`,
        type: 'info'
      }
    ]);
  }, [activeBlueprintId, activeBlueprint.title]);

  // Handle Live Simulation Loop
  const runSimulation = () => {
    if (isSimulating) {
      // Pause
      setIsSimulating(false);
      if (simTimerRef.current) clearInterval(simTimerRef.current);
      return;
    }

    setIsSimulating(true);
    let step = 1;
    setActiveSimStep(1);

    const appendLog = (stepNum: number) => {
      const node = activeBlueprint.nodes[stepNum - 1];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const logEntry = {
        id: `sim-${Date.now()}-${stepNum}`,
        time: timeStr,
        text: `[NODE ${node.step} • ${node.type}] ${node.title} (${node.tool}) ➔ Processed payload successfully in ${node.latency}`,
        type: (stepNum === 5 ? 'success' : stepNum === 3 ? 'active' : 'info') as 'info' | 'success' | 'warn' | 'active'
      };
      setSimLogs((prev) => [logEntry, ...prev.slice(0, 15)]);
    };

    appendLog(1);

    const intervalTime = simSpeed === 2 ? 1000 : 1800;

    simTimerRef.current = setInterval(() => {
      step += 1;
      if (step > 5) {
        // Complete
        setIsSimulating(false);
        setActiveSimStep(5);
        if (simTimerRef.current) clearInterval(simTimerRef.current);
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setSimLogs((prev) => [
          {
            id: `done-${Date.now()}`,
            time: timeStr,
            text: `[FLOW COMPLETE] All 5 stages finished. Estimated human time saved: ${activeBlueprint.timeSaved}.`,
            type: 'success'
          },
          ...prev.slice(0, 15)
        ]);
        return;
      }
      setActiveSimStep(step);
      appendLog(step);
    }, intervalTime);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setActiveSimStep(0);
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSimLogs([
      {
        id: `reset-${Date.now()}`,
        time: timeStr,
        text: `[RESET] Simulation buffer cleared. Ready for next packet flow.`,
        type: 'info'
      }
    ]);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div id={id} className="space-y-12">
      {/* =====================================================================
          SECTION 1: THE ANIMATED BLACK TOPOLOGY CANVAS & DIAGRAM WORKFLOW
      ====================================================================== */}
      <section className="relative rounded-3xl bg-[#060813] border border-cyan-500/30 shadow-2xl p-4 sm:p-7 lg:p-8 overflow-hidden text-slate-100">
        {/* ANIMATED BACKGROUND MATRIX GRID & SUBTLE GLOWING RADIAL CONDUITS */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '28px 28px'
          }}
        />

        {/* Ambient neon radial glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* TOP HUD RETICLE & TELEMETRY HEADER */}
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>LIVE ANIMATED TOPOLOGY WORKFLOW &bull; NODE-BY-NODE SPECIFICATION</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>{activeBlueprint.title}</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
              {activeBlueprint.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Saves: <strong className="text-emerald-300">{activeBlueprint.timeSaved}</strong></span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Value: <strong className="text-cyan-300">{activeBlueprint.vaServiceValue}</strong></span>
            </div>
          </div>
        </div>

        {/* SEARCH MATCH NOTIFICATION (IF SEARCH QUERY PRESENT) */}
        {query && (
          <div className="relative z-10 my-4 p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-200">
              <Search className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Search filter active for <strong className="text-white">"{searchQuery}"</strong>:{' '}
                {matchingBlueprintIds.length > 0 ? (
                  <span className="text-emerald-300">
                    Found {matchingBlueprintIds.length} matching workflow {matchingBlueprintIds.length === 1 ? 'blueprint' : 'blueprints'}
                  </span>
                ) : (
                  <span className="text-amber-300">No blueprint titles directly match, showing full diagram suite</span>
                )}
              </span>
            </div>
          </div>
        )}

        {/* CATEGORY WORKFLOW SELECTOR TABS (6 DISTINCT AUTOMATION NICHES) */}
        <div className="relative z-10 my-6">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select AI Automation Category &bull; Instant Topology Switching:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {WORKFLOW_BLUEPRINTS.map((bp, idx) => {
              const isSelected = bp.id === activeBlueprintId;
              const matchesSearch = matchingBlueprintIds.includes(bp.id);
              return (
                <button
                  key={bp.id}
                  onClick={() => setActiveBlueprintId(bp.id)}
                  className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between gap-1.5 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {matchesSearch && query && (
                    <span className="absolute top-1 right-1 px-1.5 py-0.2 bg-cyan-500 text-slate-950 text-[9px] font-bold rounded-full">
                      MATCH
                    </span>
                  )}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                    <span className={isSelected ? 'text-cyan-300' : 'text-slate-400'}>
                      TOPOLOGY 0{idx + 1}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`} />
                  </div>
                  <div className="font-bold text-xs leading-snug line-clamp-2">{bp.categoryLabel}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ⚡ ANIMATED SVG FLOW DIAGRAM TOPOLOGY & CONNECTION WIRING */}
        <div className="relative z-10 bg-black/60 border border-slate-800/90 rounded-2xl p-4 sm:p-6 overflow-x-auto shadow-inner">
          <div className="min-w-[920px]">
            <svg
              viewBox="0 0 960 210"
              className="w-full h-auto select-none"
              role="img"
              aria-label={`Animated AI Flow Diagram Topology for ${activeBlueprint.title}`}
            >
              <defs>
                {/* Circuit Gradient Conduits */}
                <linearGradient id="cyberWireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>

                {/* Animated Dash Conduit Pattern */}
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background cyber circuit lines */}
              <g opacity="0.35">
                <line x1="20" y1="20" x2="940" y2="20" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="20" y1="190" x2="940" y2="190" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              </g>

              {/* BEZIER CONNECTING WIRES WITH ANIMATED DASHES & TRAVELING PACKETS */}
              {/* Wire 1 -> 2 */}
              <path
                id="wire-1-2"
                d="M 172 105 C 190 105, 192 105, 206 105"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="animate-wire-dash"
              />
              <circle r="4" fill="#38bdf8" filter="url(#neonGlow)">
                <animateMotion dur="2.4s" repeatCount="indefinite" path="M 172 105 C 190 105, 192 105, 206 105" />
              </circle>

              {/* Wire 2 -> 3 */}
              <path
                id="wire-2-3"
                d="M 362 105 C 380 105, 382 105, 396 105"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="animate-wire-dash"
              />
              <circle r="4" fill="#38bdf8" filter="url(#neonGlow)">
                <animateMotion dur="2.4s" begin="0.6s" repeatCount="indefinite" path="M 362 105 C 380 105, 382 105, 396 105" />
              </circle>

              {/* Wire 3 -> 4 */}
              <path
                id="wire-3-4"
                d="M 562 105 C 580 105, 582 105, 596 105"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="animate-wire-dash"
              />
              <circle r="4" fill="#10b981" filter="url(#neonGlow)">
                <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M 562 105 C 580 105, 582 105, 596 105" />
              </circle>

              {/* Wire 4 -> 5 */}
              <path
                id="wire-4-5"
                d="M 752 105 C 770 105, 772 105, 786 105"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="animate-wire-dash"
              />
              <circle r="4" fill="#10b981" filter="url(#neonGlow)">
                <animateMotion dur="2.4s" begin="1.8s" repeatCount="indefinite" path="M 752 105 C 770 105, 772 105, 786 105" />
              </circle>

              {/* NODE 01: TRIGGER */}
              <g transform="translate(18, 38)" className="cursor-pointer" onClick={() => setInspectedNode(activeBlueprint.nodes[0])}>
                <rect
                  width="154"
                  height="134"
                  rx="14"
                  fill="#0c1322"
                  stroke={activeSimStep === 1 ? '#38bdf8' : '#1e293b'}
                  strokeWidth={activeSimStep === 1 ? '2.5' : '1.5'}
                  filter={activeSimStep === 1 ? 'url(#neonGlow)' : undefined}
                />
                <rect x="10" y="10" width="76" height="20" rx="5" fill="#0369a1" />
                <text x="48" y="24" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  01 TRIGGER
                </text>
                <text x="12" y="52" fill="#ffffff" fontSize="11" fontWeight="bold">
                  {activeBlueprint.nodes[0].title.slice(0, 19)}
                </text>
                <text x="12" y="70" fill="#94a3b8" fontSize="9.5">
                  {activeBlueprint.nodes[0].tool.slice(0, 22)}
                </text>
                <rect x="10" y="86" width="134" height="20" rx="4" fill="#0f172a" />
                <text x="77" y="100" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                  ⚡ {activeBlueprint.nodes[0].latency}
                </text>
                <text x="12" y="124" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                  Click to inspect payload ↗
                </text>
              </g>

              {/* NODE 02: ENRICH */}
              <g transform="translate(208, 38)" className="cursor-pointer" onClick={() => setInspectedNode(activeBlueprint.nodes[1])}>
                <rect
                  width="154"
                  height="134"
                  rx="14"
                  fill="#0c1322"
                  stroke={activeSimStep === 2 ? '#38bdf8' : '#1e293b'}
                  strokeWidth={activeSimStep === 2 ? '2.5' : '1.5'}
                  filter={activeSimStep === 2 ? 'url(#neonGlow)' : undefined}
                />
                <rect x="10" y="10" width="82" height="20" rx="5" fill="#1e293b" />
                <text x="51" y="24" textAnchor="middle" fill="#38bdf8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  02 CONTEXT
                </text>
                <text x="12" y="52" fill="#ffffff" fontSize="11" fontWeight="bold">
                  {activeBlueprint.nodes[1].title.slice(0, 19)}
                </text>
                <text x="12" y="70" fill="#94a3b8" fontSize="9.5">
                  {activeBlueprint.nodes[1].tool.slice(0, 22)}
                </text>
                <rect x="10" y="86" width="134" height="20" rx="4" fill="#0f172a" />
                <text x="77" y="100" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                  🔍 {activeBlueprint.nodes[1].latency}
                </text>
                <text x="12" y="124" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                  Click to inspect payload ↗
                </text>
              </g>

              {/* NODE 03: AI LLM COGNITIVE CORE (HERO HIGHLIGHT) */}
              <g transform="translate(398, 28)" className="cursor-pointer" onClick={() => setInspectedNode(activeBlueprint.nodes[2])}>
                <rect
                  width="164"
                  height="154"
                  rx="16"
                  fill="#081026"
                  stroke={activeSimStep === 3 ? '#38bdf8' : '#0284c7'}
                  strokeWidth={activeSimStep === 3 ? '3' : '2'}
                  filter="url(#neonGlow)"
                />
                <rect x="10" y="10" width="102" height="22" rx="6" fill="#0284c7" />
                <text x="61" y="25" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  03 AI LLM BRAIN
                </text>
                <text x="12" y="56" fill="#ffffff" fontSize="12" fontWeight="extrabold">
                  {activeBlueprint.nodes[2].title.slice(0, 20)}
                </text>
                <text x="12" y="76" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  {activeBlueprint.nodes[2].tool.slice(0, 23)}
                </text>
                <rect x="10" y="94" width="144" height="26" rx="6" fill="#032b4d" />
                <text x="82" y="111" textAnchor="middle" fill="#7dd3fc" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  🧠 Structured JSON Mode
                </text>
                <text x="12" y="142" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">
                  ⚡ {activeBlueprint.nodes[2].latency} &bull; Click to inspect
                </text>
              </g>

              {/* NODE 04: ROUTER */}
              <g transform="translate(598, 38)" className="cursor-pointer" onClick={() => setInspectedNode(activeBlueprint.nodes[3])}>
                <rect
                  width="154"
                  height="134"
                  rx="14"
                  fill="#0c1322"
                  stroke={activeSimStep === 4 ? '#10b981' : '#1e293b'}
                  strokeWidth={activeSimStep === 4 ? '2.5' : '1.5'}
                  filter={activeSimStep === 4 ? 'url(#neonGlow)' : undefined}
                />
                <rect x="10" y="10" width="76" height="20" rx="5" fill="#1e293b" />
                <text x="48" y="24" textAnchor="middle" fill="#10b981" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  04 ROUTER
                </text>
                <text x="12" y="52" fill="#ffffff" fontSize="11" fontWeight="bold">
                  {activeBlueprint.nodes[3].title.slice(0, 19)}
                </text>
                <text x="12" y="70" fill="#94a3b8" fontSize="9.5">
                  {activeBlueprint.nodes[3].tool.slice(0, 22)}
                </text>
                <rect x="10" y="86" width="134" height="20" rx="4" fill="#0f172a" />
                <text x="77" y="100" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">
                  🔀 {activeBlueprint.nodes[3].latency}
                </text>
                <text x="12" y="124" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                  Click to inspect payload ↗
                </text>
              </g>

              {/* NODE 05: ACTION */}
              <g transform="translate(788, 38)" className="cursor-pointer" onClick={() => setInspectedNode(activeBlueprint.nodes[4])}>
                <rect
                  width="154"
                  height="134"
                  rx="14"
                  fill="#0c1322"
                  stroke={activeSimStep === 5 ? '#10b981' : '#1e293b'}
                  strokeWidth={activeSimStep === 5 ? '2.5' : '1.5'}
                  filter={activeSimStep === 5 ? 'url(#neonGlow)' : undefined}
                />
                <rect x="10" y="10" width="76" height="20" rx="5" fill="#047857" />
                <text x="48" y="24" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  05 ACTION
                </text>
                <text x="12" y="52" fill="#ffffff" fontSize="11" fontWeight="bold">
                  {activeBlueprint.nodes[4].title.slice(0, 19)}
                </text>
                <text x="12" y="70" fill="#94a3b8" fontSize="9.5">
                  {activeBlueprint.nodes[4].tool.slice(0, 22)}
                </text>
                <rect x="10" y="86" width="134" height="20" rx="4" fill="#0f172a" />
                <text x="77" y="100" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">
                  ✅ {activeBlueprint.nodes[4].latency}
                </text>
                <text x="12" y="124" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                  Click to inspect payload ↗
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* 5-NODE WELL-DETAILED BOXES (NODE BY NODE WITH INPUT, LOGIC & OUTPUT SPECS) */}
        <div className="relative z-10 my-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Node-by-Node Technical Blueprint &bull; Detailed Input / Logic / Output Specifications:</span>
            </span>
            <span className="text-[11px] text-cyan-300 font-mono">
              Tip: Click any node box to inspect raw schema &amp; fallback logic
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {activeBlueprint.nodes.map((node, index) => {
              const nodeNum = index + 1;
              const isActiveStep = activeSimStep === nodeNum;
              return (
                <div
                  key={node.step}
                  onClick={() => setInspectedNode(node)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                    isActiveStep
                      ? 'bg-slate-900 border-cyan-400 shadow-[0_0_24px_rgba(56,189,248,0.35)] ring-1 ring-cyan-400'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {isActiveStep && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 animate-pulse" />
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                        NODE {node.step}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800 uppercase">
                        {node.type}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-white leading-snug line-clamp-1">
                      {node.title}
                    </h4>

                    <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{node.tool}</span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                      {node.description}
                    </p>
                  </div>

                  {/* MINI PAYLOAD PREVIEW */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 font-mono text-[10px]">
                    <div className="text-slate-400 flex items-center justify-between">
                      <span>IN ➔ OUT</span>
                      <span className="text-emerald-400">{node.latency}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/50 border border-slate-800/80 text-slate-300 truncate">
                      {node.inputPayload.split('\n')[1] || node.inputPayload}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full py-1.5 px-2 bg-slate-800/90 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700 text-slate-300 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Inspect Specs</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🕹️ LIVE FLOW SIMULATION ENGINE & TERMINAL CONSOLE */}
        <div className="relative z-10 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Live Simulation Engine &bull; Event Dispatch Stream
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                {isSimulating ? 'SIMULATION RUNNING' : activeSimStep > 0 ? 'COMPLETED' : 'IDLE'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runSimulation}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)] cursor-pointer"
              >
                {isSimulating ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Flow</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Flow Simulation</span>
                  </>
                )}
              </button>

              <button
                onClick={resetSimulation}
                className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5 text-[10px] font-mono text-slate-400">
                <button
                  onClick={() => setSimSpeed(1)}
                  className={`px-2 py-1 rounded-lg ${simSpeed === 1 ? 'bg-slate-800 text-cyan-300 font-bold' : 'hover:text-white'}`}
                >
                  1x
                </button>
                <button
                  onClick={() => setSimSpeed(2)}
                  className={`px-2 py-1 rounded-lg ${simSpeed === 2 ? 'bg-slate-800 text-cyan-300 font-bold' : 'hover:text-white'}`}
                >
                  2x Speed
                </button>
              </div>
            </div>
          </div>

          {/* TELEMETRY TERMINAL OUTPUT */}
          <div className="bg-black/90 border border-slate-800/90 rounded-xl p-3 max-h-36 overflow-y-auto font-mono text-xs space-y-1 scrollbar-thin">
            {simLogs.map((log) => (
              <div
                key={log.id}
                className={`flex items-start gap-2 ${
                  log.type === 'success'
                    ? 'text-emerald-400 font-semibold'
                    : log.type === 'active'
                    ? 'text-cyan-300 font-semibold'
                    : 'text-slate-300'
                }`}
              >
                <span className="text-slate-500 shrink-0 select-none">[{log.time}]</span>
                <span>{log.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🤖 NODE 03 AI PROMPT & STRUCTURED JSON OUTPUT SHOWCASE */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5 pt-4">
          {/* Left: AI Prompt & JSON Output */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Inside Node 03: Production AI System Prompt &amp; JSON Schema</span>
              </span>
              <button
                onClick={() => handleCopy(activeBlueprint.aiPromptSample, `prompt-${activeBlueprint.id}`)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/70 px-2.5 py-1 rounded-lg border border-cyan-500/40 transition-colors cursor-pointer"
              >
                {copiedId === `prompt-${activeBlueprint.id}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bg-black/80 border border-slate-800 text-cyan-200/90 p-3.5 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {activeBlueprint.aiPromptSample}
            </pre>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Structured JSON Returned to Make.com / n8n Router:
              </span>
              <pre className="bg-black/80 border border-slate-800 text-emerald-300/90 p-3.5 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {activeBlueprint.jsonOutputSample}
              </pre>
            </div>
          </div>

          {/* Right: How to Build It Step-by-Step */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Step-by-Step Implementation Guide (Zero Coding Required)</span>
                </span>
              </div>

              <ol className="space-y-2.5">
                {activeBlueprint.implementationSteps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pro Tip for Aspiring Virtual Assistants &amp; Freelancers:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Build this exact workflow in a free Make.com or n8n account, record a 90-second Loom video walking through how the nodes connect, and attach that link to your Upwork / OnlineJobs.ph proposals. Clients hire VAs who demonstrate real working systems!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          NODE DEEP-DIVE INSPECTION MODAL / DRAWER
      ====================================================================== */}
      {inspectedNode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1120] border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 space-y-5 text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectedNode(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                <span>NODE {inspectedNode.step}</span>
                <span>&bull;</span>
                <span>{inspectedNode.type}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">{inspectedNode.title}</h3>
              <p className="text-xs text-cyan-400 font-mono">Integration: {inspectedNode.tool}</p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {inspectedNode.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[10px]">PROTOCOL</span>
                <span className="text-white font-bold">{inspectedNode.detailedSpecs.protocol}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[10px]">AVG LATENCY</span>
                <span className="text-emerald-400 font-bold">{inspectedNode.latency} ({inspectedNode.statusUptime} SLA)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Input Schema Payload:
              </span>
              <pre className="bg-black/90 border border-slate-800 text-cyan-200 p-3 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                {inspectedNode.inputPayload}
              </pre>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Output Dispatch Payload:
              </span>
              <pre className="bg-black/90 border border-slate-800 text-emerald-300 p-3 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                {inspectedNode.outputPayload}
              </pre>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-xs">
              <span className="text-slate-400 font-mono text-[10px] block">ERROR RETRY &amp; FALLBACK POLICY</span>
              <p className="text-slate-300 leading-relaxed">{inspectedNode.detailedSpecs.retryPolicy}</p>
              <p className="text-amber-300 text-[11px] pt-1">
                Fallback: {inspectedNode.detailedSpecs.fallbackAction}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectedNode(null)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
              >
                Close Node Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 2: AI & ITS 6 CORE CAPABILITIES (COMPLETE FREE VISUAL GUIDE)
      ====================================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-slate-800" />
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
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-6 shadow-xs transition-all flex flex-col justify-between space-y-5"
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
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-800 shrink-0 mt-0.5" />
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
                        className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
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
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-slate-800" />
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
              className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full inline-block">
                  {tpl.role}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-500">{tpl.whenToUse}</p>
              </div>

              <pre className="bg-white border border-slate-200 p-3.5 rounded-xl text-xs text-slate-700 font-sans whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                {tpl.content}
              </pre>

              <button
                onClick={() => handleCopy(tpl.content, tpl.id)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedId === tpl.id ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
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
