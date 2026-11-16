import type { WorkflowBlueprint } from '../components/AIAutomationDiagrams';
import type { WorkflowCategoryMeta } from './extendedWorkflowsData';
import type { WorkflowStrategy } from './workflowStrategyData';

export const FREE_WORKFLOW_CATEGORY: WorkflowCategoryMeta = {
  key: 'free-realtime-automation',
  label: '100% Free Real-Time AI Automations ($0/mo • No Subscription)',
  iconName: 'Zap',
  description:
    'Zero-subscription real-time automations built with Google Apps Script, Gemini Free Tier, Groq Free API, n8n Community Edition, Ollama Local AI, Cloudflare Workers Free, and Telegram/Discord bots.',
  count: 6
};

export const FREE_TOOL_URLS: Record<string, string> = {
  'Google Apps Script (Free)': 'https://script.google.com',
  'Google AI Studio (Free Gemini API)': 'https://aistudio.google.com',
  'Groq Cloud Free Tier': 'https://console.groq.com',
  'n8n Community Edition (Self-Hosted Free)': 'https://github.com/n8n-io/n8n',
  'Ollama (Free Local Offline AI)': 'https://ollama.com',
  'Cloudflare Workers (100k Req/Day Free)': 'https://workers.cloudflare.com',
  'Telegram Bot API (Free)': 'https://core.telegram.org/bots/api',
  'Discord Webhooks (Free)': 'https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks',
  'GitHub Actions (Free Tier)': 'https://github.com/features/actions',
  'Whisper.cpp (Free Local Audio)': 'https://github.com/ggerganov/whisper.cpp',
  'Notion Free API': 'https://www.notion.so/my-integrations',
  'Tally Forms (Free Tier)': 'https://tally.so',
  'Buffer (Free Tier)': 'https://buffer.com'
};

export const FREE_REALTIME_WORKFLOW_BLUEPRINTS: WorkflowBlueprint[] = [
  {
    id: 'free-gmail-triage-apps-script',
    categoryKey: 'free-realtime-automation',
    categoryLabel: '100% Free Real-Time AI Automations ($0/mo • No Subscription)',
    badge: 'FREE ($0/MO) • REAL-TIME GMAIL TRIAGE & DRAFTER',
    title: 'Gmail Inbox -> Google Apps Script (Free) -> Gemini Free API Classifier -> Auto-Label + Gmail Draft Reply',
    subtitle:
      '100% free alternative to Zapier/Make ($0 monthly subscription). Runs directly inside your Gmail account every 5 minutes to triage unread client emails and stage polite AI draft replies.',
    networkTopologyTitle: 'Google Workspace Apps Script -> Gemini Free API Real-Time Mail Triage ($0/Mo)',
    timeSaved: '10+ Hours / Week ($0 Tool Cost)',
    vaServiceValue: 'Free for VAs • $400–$800/mo VA Client Setup',
    tools: [
      'Gmail (Free)',
      'Google Apps Script ($0 Unlimited)',
      'Gemini 2.5 Flash Free API',
      'Gmail Labels + Drafts'
    ],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Apps Script 5-Min Unread Poller',
        tool: 'GmailApp.search() Free Trigger',
        ipAddress: '10.10.1.1',
        port: '443',
        protocolBadge: 'Apps Script Cron ($0)',
        description:
          'Polls Gmail every 5 minutes for unread threads without the AI-Triaged label using native free Google Workspace triggers.',
        inputPayload:
          '{\n  "query": "is:unread in:inbox -label:AI-Triaged",\n  "maxThreads": 10,\n  "triggerInterval": "Every 5 minutes (Free)"\n}',
        processingLogic:
          'Fetches sender address, subject line, and first 1,800 characters of plain text without third-party webhooks.',
        outputPayload:
          '{\n  "threadId": "192f8a109c2b",\n  "from": "client@agency.com",\n  "subject": "Urgent: Need landing page tweak before Friday",\n  "plainBody": "Hi, can we update the hero banner today?"\n}',
        latency: '~85ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Native Google Apps Script V8 Runtime',
          endpoint: 'https://script.google.com (Internal Workspace Bus)',
          retryPolicy: 'Automatic next 5-minute cycle pickup if transient error',
          secretKeys: ['NONE_NEEDED_USES_GOOGLE_OAUTH'],
          payloadSchema: 'GmailThread[] -> Normalized Email Plaintext',
          fallbackAction: 'Skips malformed MIME threads and preserves unread state.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Sender Domain & Thread History Check',
        tool: 'Google Contacts / Sheet VIP List',
        ipAddress: '10.10.1.2',
        port: '443',
        protocolBadge: 'Local Workspace Lookup',
        description:
          'Checks thread message count and strips signatures/quoted replies so fewer tokens are sent to the free AI tier.',
        inputPayload: '{\n  "sender": "client@agency.com",\n  "messageCount": 3\n}',
        processingLogic:
          'Trims email signatures, truncates historical quoted text, and tags prior conversation depth.',
        outputPayload:
          '{\n  "cleanSubject": "Urgent: Need landing page tweak before Friday",\n  "truncatedBody": "Hi, can we update the hero banner today?",\n  "isExistingThread": true\n}',
        latency: '~12ms',
        statusUptime: '100%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'In-Memory Apps Script String Sanitizer',
          endpoint: 'local://apps-script/sanitize',
          retryPolicy: 'Deterministic local step',
          secretKeys: [],
          payloadSchema: 'Compact Email Payload (< 2KB)',
          fallbackAction: 'Sends raw subject line if plain body is empty.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Gemini 2.5 Flash Free Classifier',
        tool: 'Google AI Studio Free Tier API',
        ipAddress: '10.10.1.3',
        port: '443',
        protocolBadge: 'Gemini Free JSON API ($0)',
        description:
          'Calls generativelanguage.googleapis.com with your free Google AI Studio key and enforces application/json classification.',
        inputPayload:
          '{\n  "model": "gemini-2.5-flash",\n  "responseMimeType": "application/json",\n  "temperature": 0.2\n}',
        processingLogic:
          'Classifies email into VIP Client, Meeting Request, Invoice, or Newsletter and drafts a context-aware reply.',
        outputPayload:
          '{\n  "label": "01-VIP-Client",\n  "needsReply": true,\n  "draftReply": "Hi! Received loud and clear — I am starting on the hero banner tweak right now and will share a live preview within 2 hours."\n}',
        latency: '~620ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST (application/json)',
          endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
          retryPolicy: 'Switch transparently to Groq Llama 3.3 Free API if quota throttled',
          secretKeys: ['GEMINI_API_KEY (Free Google AI Studio Key)'],
          payloadSchema: '{ label, needsReply, draftReply }',
          fallbackAction: 'Leaves thread untouched in Inbox for manual VA review.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Label & Draft Gatekeeper',
        tool: 'Apps Script Label Router',
        ipAddress: '10.10.1.4',
        port: '443',
        protocolBadge: 'Safety Gate (Draft Only)',
        description:
          'Routes VIP emails to Star + Urgent Label while ensuring replies are saved as Drafts rather than blindly auto-sent.',
        inputPayload: '{\n  "label": "01-VIP-Client",\n  "needsReply": true\n}',
        processingLogic:
          'Checks human-in-the-loop safety rule: never auto-send without review; always create label and stage Draft.',
        outputPayload: '{\n  "starMessage": true,\n  "applyLabels": ["01-VIP-Client", "AI-Triaged"],\n  "createDraft": true\n}',
        latency: '~2ms',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'Apps Script Deterministic Branch',
          endpoint: 'local://router/draft-gatekeeper',
          retryPolicy: 'Zero-latency in-memory evaluation',
          secretKeys: [],
          payloadSchema: 'Action Dispatch Directive',
          fallbackAction: 'Defaults to labeling only without drafting.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Apply Label & Stage Gmail Draft',
        tool: 'GmailApp.createDraftReply()',
        ipAddress: '10.10.1.5',
        port: '443',
        protocolBadge: 'Gmail Workspace Commit',
        description:
          'Creates Gmail labels if missing, stars VIP messages, and attaches the ready-to-send Draft inside the thread.',
        inputPayload:
          '{\n  "threadId": "192f8a109c2b",\n  "draftText": "Hi! Received loud and clear..."\n}',
        processingLogic:
          'Commits label assignment and saves Draft directly inside Gmail UI across desktop and mobile.',
        outputPayload: '{\n  "status": "DRAFT_SAVED_AT_ZERO_COST",\n  "monthlyFee": "$0.00"\n}',
        latency: '~110ms',
        statusUptime: '99.99%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Native Google GmailApp API',
          endpoint: 'gmail.googleapis.com (Apps Script Built-In)',
          retryPolicy: 'Next 5-minute run catches any un-tagged messages',
          secretKeys: [],
          payloadSchema: 'GmailDraft + GmailLabel Mutation',
          fallbackAction: 'Logs exception in Execution Transcript.'
        }
      }
    ],
    aiPromptSample: `FREE APPS SCRIPT PROMPT (Zero Subscription — Inside script.google.com):
You are an Executive Virtual Assistant Email Gatekeeper.
Analyze the incoming email and return ONLY valid JSON:
{
  "label": "01-VIP-Client" | "02-Meeting-Request" | "03-Invoice-Receipt" | "04-Newsletter-Low",
  "needsReply": boolean,
  "draftReply": "concise, polite reply ready for human approval"
}`,
    jsonOutputSample: `{
  "label": "01-VIP-Client",
  "needsReply": true,
  "draftReply": "Hi [Name], thank you for reaching out! I am reviewing your request now and will share the updated draft shortly."
}`,
    implementationSteps: [
      'Open script.google.com in your free Gmail account and click "New Project" ($0/mo).',
      'Create a free Gemini API key at aistudio.google.com (or free Groq key at console.groq.com) and add it to Project Settings -> Script Properties.',
      'Paste the JavaScript triage code from Guide "FREE AI AUTOMATION #01" above into Code.gs and click Save.',
      'Open Triggers (clock icon) -> Add Trigger -> Select "autoTriageUnreadInbox" -> Time-driven -> Every 5 minutes.',
      'Unread emails are now automatically labeled and pre-drafted in Gmail 24/7 with zero paid subscriptions!'
    ]
  },
  {
    id: 'free-speed-to-lead-form-telegram',
    categoryKey: 'free-realtime-automation',
    categoryLabel: '100% Free Real-Time AI Automations ($0/mo • No Subscription)',
    badge: 'FREE ($0/MO) • INSTANT 3-SEC SPEED-TO-LEAD',
    title: 'Google Form / Tally (Free) -> Apps Script Real-Time Trigger -> Gemini Free -> Email Reply + Telegram Push ($0)',
    subtitle:
      'Sub-3-second Speed-to-Lead responder that emails qualified leads immediately and pings your phone on Telegram for $0/month — no CRM or Zapier subscription needed.',
    networkTopologyTitle: 'Instant onFormSubmit -> Gemini Free API -> Gmail + Telegram Bot ($0 Stack)',
    timeSaved: '12+ Hours / Week ($0 Tool Cost)',
    vaServiceValue: 'Free for Freelancers • $350–$900 Client Setup',
    tools: [
      'Google Forms / Tally Free',
      'Apps Script onFormSubmit',
      'Gemini 2.5 Flash Free API',
      'Telegram Bot API ($0)'
    ],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Instant onFormSubmit Event',
        tool: 'Google Forms + Google Sheets ($0)',
        ipAddress: '10.10.2.1',
        port: '443',
        protocolBadge: 'Real-Time Submit Event',
        description:
          'Fires instantaneously the millisecond a prospective client clicks Submit on your Google Form or inquiry sheet.',
        inputPayload:
          '{\n  "Name": "Alex Rivera",\n  "Email": "alex@brightagency.co",\n  "Budget": "$2,000/mo",\n  "Goal": "Need an AI + Ops Virtual Assistant"\n}',
        processingLogic:
          'Triggers Apps Script event handler automatically without polling or monthly task fees.',
        outputPayload:
          '{\n  "leadId": "form_row_142",\n  "timestamp": "2026-11-16T15:05:00Z",\n  "ready": true\n}',
        latency: '~20ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Google Sheets Installable onFormSubmit Trigger',
          endpoint: 'sheets.googleapis.com -> onLeadFormSubmit(e)',
          retryPolicy: 'Native spreadsheet execution queue',
          secretKeys: ['NONE_NEEDED'],
          payloadSchema: 'e.namedValues Object',
          fallbackAction: 'Row remains saved inside Google Sheet even if downstream call fails.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Normalize & Validate Contact Fields',
        tool: 'Apps Script Field Extractor',
        ipAddress: '10.10.2.2',
        port: '443',
        protocolBadge: 'Schema Sanitizer',
        description:
          'Cleans whitespace, validates email syntax, and extracts project scope keywords before invoking the AI API.',
        inputPayload: '{\n  "rawEmail": " alex@brightagency.co ",\n  "rawGoal": "Need AI + Ops VA"\n}',
        processingLogic: 'Trims strings, extracts domain "brightagency.co", and checks free-email vs business domain.',
        outputPayload: '{\n  "cleanEmail": "alex@brightagency.co",\n  "isB2BDomain": true,\n  "domain": "brightagency.co"\n}',
        latency: '~5ms',
        statusUptime: '100%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'JavaScript V8 Runtime Validation',
          endpoint: 'local://validate-lead',
          retryPolicy: 'Deterministic local transform',
          secretKeys: [],
          payloadSchema: 'Sanitized Prospect Object',
          fallbackAction: 'Aborts auto-email gracefully if email address is invalid.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Gemini / Groq Lead Scorer & Reply Writer',
        tool: 'Gemini 2.5 Flash Free API ($0)',
        ipAddress: '10.10.2.3',
        port: '443',
        protocolBadge: 'Free REST Inference',
        description:
          'Evaluates inquiry fit (0-100), assigns tier, and writes a warm, tailored 2-paragraph response referencing their goal.',
        inputPayload: '{\n  "prospect": "Alex Rivera",\n  "domain": "brightagency.co",\n  "goal": "Need an AI + Ops Virtual Assistant"\n}',
        processingLogic: 'Generates structured JSON containing score, tier, and ready-to-send email body.',
        outputPayload:
          '{\n  "score": 95,\n  "tier": "VIP",\n  "reply": "Hi Alex, thanks for reaching out from Bright Agency! We can help you automate your ops workflow immediately..."\n}',
        latency: '~680ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST to Gemini / Groq Free Endpoint',
          endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
          retryPolicy: 'Fallback to template email if API rate limit is reached',
          secretKeys: ['GEMINI_API_KEY'],
          payloadSchema: '{ score, tier, reply }',
          fallbackAction: 'Sends clean fallback confirmation email with booking link.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'VIP Priority & Telegram Switch',
        tool: 'Score Threshold Evaluator',
        ipAddress: '10.10.2.4',
        port: '443',
        protocolBadge: 'Priority Router',
        description:
          'Routes qualified prospects for immediate auto-reply + high-priority Telegram ping.',
        inputPayload: '{\n  "score": 95,\n  "tier": "VIP"\n}',
        processingLogic: 'Marks Sheet row status as REPLIED and dispatches dual notification.',
        outputPayload: '{\n  "sendGmail": true,\n  "sendTelegramPing": true\n}',
        latency: '~3ms',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'In-memory Branch',
          endpoint: 'local://vip-switch',
          retryPolicy: 'Deterministic',
          secretKeys: [],
          payloadSchema: 'Boolean flags',
          fallbackAction: 'Always logs lead row and notifies Telegram.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Gmail Instant Reply + Telegram Alert',
        tool: 'GmailApp + Telegram Bot API ($0)',
        ipAddress: '10.10.2.5',
        port: '443',
        protocolBadge: 'Dual Instant Egress',
        description:
          'Emails the tailored response with your free Cal.com/Google Appointment link AND pushes an alert to your Telegram app.',
        inputPayload: '{\n  "to": "alex@brightagency.co",\n  "tgChatId": "123456789"\n}',
        processingLogic: 'Executes GmailApp.sendEmail and POSTs alert card to api.telegram.org for $0.',
        outputPayload: '{\n  "emailSent": true,\n  "telegramNotified": true,\n  "totalTime": "1.9 seconds"\n}',
        latency: '~290ms',
        statusUptime: '99.98%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'GmailApp + HTTPS POST to api.telegram.org',
          endpoint: 'https://api.telegram.org/bot<TOKEN>/sendMessage',
          retryPolicy: 'Retry Telegram call once on socket timeout',
          secretKeys: ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'],
          payloadSchema: 'Telegram sendMessage JSON',
          fallbackAction: 'Logs status in Google Sheet column.'
        }
      }
    ],
    aiPromptSample: `FREE SPEED-TO-LEAD SYSTEM PROMPT:
Analyze the new prospect inquiry below and return ONLY valid JSON:
{
  "score": number (0-100 fit),
  "tier": "VIP" | "STANDARD",
  "reply": "Warm 2-paragraph response referencing their specific project goal and inviting them to pick a time on my free Cal.com calendar link."
}`,
    jsonOutputSample: `{
  "score": 95,
  "tier": "VIP",
  "reply": "Hi Alex, thanks for sharing Bright Agency's ops goals! I put together two ideas on how we can automate your daily lead triage. Feel free to grab a quick 15-minute slot here: https://cal.com/yourname"
}`,
    implementationSteps: [
      'Create a free Google Form connected to a Google Sheet.',
      'Message @BotFather on Telegram to create a free bot and copy your Bot Token + Chat ID ($0 forever).',
      'Paste the onLeadFormSubmit script into Extensions -> Apps Script along with your free Gemini API key.',
      'Add an Installable Trigger: "onLeadFormSubmit" -> Event source: From spreadsheet -> On form submit.',
      'Submit a test response and watch your inbox + Telegram phone alert fire in under 3 seconds!'
    ]
  },
  {
    id: 'free-n8n-ollama-unlimited',
    categoryKey: 'free-realtime-automation',
    categoryLabel: '100% Free Real-Time AI Automations ($0/mo • No Subscription)',
    badge: 'FREE ($0/MO) • UNLIMITED N8N + OLLAMA LOCAL',
    title: 'Cloudflare Quick Tunnel (Free) -> n8n Community Edition ($0 Unlimited) -> Ollama Local AI / Groq Free -> CRM',
    subtitle:
      'Run unlimited visual 5-node AI Agent workflows 24/7 with zero per-task pricing and 100% private local LLM execution using Docker n8n + Ollama.',
    networkTopologyTitle: 'Self-Hosted n8n Community + Ollama Local Inference Pipeline ($0 Unlimited)',
    timeSaved: '20+ Hours / Week ($0 Tool Cost)',
    vaServiceValue: 'Unlimited Runs • $500–$1,500 Agency Automation',
    tools: [
      'n8n Community Edition ($0)',
      'Ollama Local AI (llama3.2 / qwen2.5)',
      'Cloudflare Quick Tunnel ($0)',
      'Google Sheets / Notion Free API'
    ],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Cloudflare Tunnel -> n8n Webhook',
        tool: 'cloudflared + n8n Webhook ($0)',
        ipAddress: '127.0.0.1',
        port: '5678',
        protocolBadge: 'Free HTTPS Tunnel',
        description:
          'Exposes your local n8n Community Edition webhook securely over HTTPS without buying a domain or server.',
        inputPayload: '{\n  "source": "Tally Free Form",\n  "payload": { "client": "Acme", "task": "NDA Summary" }\n}',
        processingLogic: 'Receives unlimited inbound webhooks with zero operation caps.',
        outputPayload: '{\n  "n8nExecutionId": "exec_unlimited_491",\n  "tunnelVerified": true\n}',
        latency: '~18ms',
        statusUptime: '99.95%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'HTTPS Webhook -> Local Docker Port 5678',
          endpoint: 'http://localhost:5678/webhook/free-ai-intake',
          retryPolicy: 'n8n Built-in Queue Retry',
          secretKeys: ['WEBHOOK_HEADER_SECRET'],
          payloadSchema: 'Arbitrary JSON',
          fallbackAction: 'Stores failed webhook payload inside n8n Execution History.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Document Text Loader',
        tool: 'n8n Extract From File ($0)',
        ipAddress: '127.0.0.1',
        port: '5678',
        protocolBadge: 'Local File Parser',
        description: 'Extracts clean text from PDFs, CSVs, or docs completely offline on your machine.',
        inputPayload: '{\n  "fileType": "pdf",\n  "sizeKB": 420\n}',
        processingLogic: 'Parses raw binary into clean UTF-8 markdown chunks.',
        outputPayload: '{\n  "extractedChars": 8420,\n  "chunkCount": 4\n}',
        latency: '~35ms',
        statusUptime: '100%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'n8n Native Node',
          endpoint: 'local://n8n/extract-pdf',
          retryPolicy: 'Local CPU step',
          secretKeys: [],
          payloadSchema: 'UTF-8 Text Chunks',
          fallbackAction: 'Falls back to plain text read.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Ollama Local AI (Llama 3.2) / Groq',
        tool: 'Ollama http://localhost:11434 ($0)',
        ipAddress: '127.0.0.1',
        port: '11434',
        protocolBadge: '100% Free Local Inference',
        description:
          'Processes sensitive client documents locally with zero API fees and zero external cloud data leakage.',
        inputPayload: '{\n  "model": "llama3.2",\n  "format": "json",\n  "stream": false\n}',
        processingLogic: 'Runs local quantized LLM weights on GPU/CPU to extract risks, dates, and action tasks.',
        outputPayload:
          '{\n  "risks": ["Auto-renewal 60-day clause"],\n  "summary": "Standard 12-month NDA with mutual confidentiality.",\n  "tokensCostUsd": 0.0\n}',
        latency: '~740ms',
        statusUptime: '100%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'Local REST POST /api/chat',
          endpoint: 'http://localhost:11434/api/chat',
          retryPolicy: 'Optional fallback to Groq Cloud Free Tier',
          secretKeys: ['NONE_REQUIRED_OFFLINE'],
          payloadSchema: 'Ollama JSON Schema Output',
          fallbackAction: 'Queues execution if laptop is sleeping.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'n8n Switch & Privacy Filter',
        tool: 'n8n IF / Switch Node ($0)',
        ipAddress: '127.0.0.1',
        port: '5678',
        protocolBadge: 'Unlimited Local Router',
        description: 'Routes confidential alerts to private Notion workspace or Telegram channel.',
        inputPayload: '{\n  "riskCount": 1\n}',
        processingLogic: 'Evaluates risk length > 0 and triggers immediate highlight badge.',
        outputPayload: '{\n  "route": "FLAG_FOR_REVIEW",\n  "priority": "HIGH"\n}',
        latency: '~1ms',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'In-memory Switch',
          endpoint: 'local://n8n/switch',
          retryPolicy: 'Deterministic',
          secretKeys: [],
          payloadSchema: 'Boolean condition',
          fallbackAction: 'Default pass-through.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Notion Database + Discord Notify',
        tool: 'Notion Free API + Discord Webhook',
        ipAddress: '10.10.3.5',
        port: '443',
        protocolBadge: 'Zero-Cost CRM Dispatch',
        description: 'Creates structured Notion database card and posts notification in team Discord for $0.',
        inputPayload: '{\n  "notionTitle": "NDA Review — Acme",\n  "status": "Reviewed Locally"\n}',
        processingLogic: 'Commits Notion page properties and notifies Discord webhook.',
        outputPayload: '{\n  "notionCreated": true,\n  "totalWorkflowCost": "$0.00"\n}',
        latency: '~145ms',
        statusUptime: '99.98%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'HTTPS POST to api.notion.com + discord.com/api/webhooks',
          endpoint: 'https://api.notion.com/v1/pages',
          retryPolicy: 'n8n Auto-Retry 3x',
          secretKeys: ['NOTION_TOKEN (Free Integration)'],
          payloadSchema: 'Notion Page Payload',
          fallbackAction: 'Exports summary JSON to local disk backup.'
        }
      }
    ],
    aiPromptSample: `OLLAMA LOCAL PROMPT (Runs Inside n8n Community Edition at $0 Cost):
Analyze the confidential document below locally and return strictly valid JSON:
{
  "document_type": string,
  "key_dates": string[],
  "potential_risks": string[],
  "executive_summary": "3 concise bullet sentences"
}`,
    jsonOutputSample: `{
  "document_type": "Service Retainer Agreement",
  "key_dates": ["Effective: 2026-12-01", "Renewal: 2027-12-01"],
  "potential_risks": ["60-day written cancellation notice required"],
  "executive_summary": "Annual VA services agreement at $1,500/mo with net-7 invoice terms."
}`,
    implementationSteps: [
      'Install Ollama free from ollama.com and run `ollama run llama3.2` in your terminal.',
      'Start n8n Community Edition via Docker (`docker run -it --rm -p 5678:5678 docker.n8n.io/n8nio/n8n`).',
      'Run `cloudflared tunnel --url http://localhost:5678` to get a free public HTTPS webhook URL.',
      'Drag Webhook -> Ollama Chat Model -> Notion / Discord nodes inside n8n.',
      'Execute unlimited AI automations 100% locally with zero monthly subscription costs!'
    ]
  },
  {
    id: 'free-sheets-bulk-ai-enrichment',
    categoryKey: 'free-realtime-automation',
    categoryLabel: '100% Free Real-Time AI Automations ($0/mo • No Subscription)',
    badge: 'FREE ($0/MO) • GOOGLE SHEETS =ASK_AI()',
    title: 'Google Sheets Row Edit -> Free =ASK_AI() Apps Script -> Groq Llama 3.3 -> Clean CRM & Personalized Hooks',
    subtitle:
      'Turns Google Sheets into a real-time B2B Lead Enricher, E-Commerce SEO Writer, and Personalized Cold Email Generator without paid add-ons.',
    networkTopologyTitle: 'Google Sheets Real-Time =ASK_AI() -> Groq Llama 3.3 Enrichment Pipeline',
    timeSaved: '14+ Hours / Week ($0 Tool Cost)',
    vaServiceValue: 'Replaces $49/mo Paid Sheet Add-ons',
    tools: ['Google Sheets ($0)', 'Apps Script Custom Function', 'Groq Cloud Free API (Llama 3.3)'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Sheet Row / Formula Invocation',
        tool: 'Google Sheets =ASK_AI()',
        ipAddress: '10.10.4.1',
        port: '443',
        protocolBadge: 'Cell Evaluation Event',
        description: 'Triggered automatically whenever a VA pastes new prospect bios, URLs, or product SKUs into Google Sheets.',
        inputPayload: '{\n  "cell": "C2",\n  "formula": "=ASK_AI(\\"Write custom 1-line opener:\\", A2:B2)"\n}',
        processingLogic: 'Serializes cell range values and instruction argument to Apps Script function.',
        outputPayload: '{\n  "company": "Summit Roofing",\n  "snippet": "Serving Austin since 2012 — free roof inspections"\n}',
        latency: '~15ms',
        statusUptime: '100%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Google Sheets Custom Function Hook',
          endpoint: 'sheets.googleapis.com -> ASK_AI()',
          retryPolicy: 'Re-evaluates cleanly on edit',
          secretKeys: [],
          payloadSchema: 'String instruction + Range input',
          fallbackAction: 'Returns empty string when source cells are blank.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Row Payload Trimmer & Guard',
        tool: 'Apps Script Data Normalizer',
        ipAddress: '10.10.4.2',
        port: '443',
        protocolBadge: 'Input Sanitizer',
        description: 'Flattens 2D spreadsheet arrays into clean text and prevents blank-cell waste.',
        inputPayload: '{\n  "rawRange": [["Summit Roofing", "Austin TX"]]\n}',
        processingLogic: 'Joins non-empty cell values cleanly before sending HTTP request.',
        outputPayload: '{\n  "cleanInput": "Summit Roofing | Austin TX"\n}',
        latency: '~3ms',
        statusUptime: '100%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'In-memory array serializer',
          endpoint: 'local://range-flatten',
          retryPolicy: 'Local',
          secretKeys: [],
          payloadSchema: 'String',
          fallbackAction: 'Returns blank early if all cells empty.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Groq Llama 3.3 70B (Sub-Second Free)',
        tool: 'Groq Free API',
        ipAddress: '10.10.4.3',
        port: '443',
        protocolBadge: 'Groq LPU Inference ($0)',
        description: 'Ultra-fast Llama 3.3 inference completes bulk spreadsheet cells at 500+ tokens/sec on Groq free tier.',
        inputPayload: '{\n  "model": "llama-3.3-70b-versatile",\n  "temperature": 0.2,\n  "max_tokens": 200\n}',
        processingLogic: 'Strictly suppresses intro chatter and returns only the requested cell value.',
        outputPayload:
          '{\n  "cellResult": "Loved seeing Summit Roofing has served Austin homeowners since 2012 — are you automating after-hours roof inspection requests yet?"\n}',
        latency: '~240ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST OpenAI-Compatible Endpoint',
          endpoint: 'https://api.groq.com/openai/v1/chat/completions',
          retryPolicy: 'Fallback notice on rate limits',
          secretKeys: ['GROQ_API_KEY (Free console.groq.com)'],
          payloadSchema: 'ChatCompletion Choice Text',
          fallbackAction: 'Returns readable retry message inside cell.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Length & Format Validator',
        tool: 'Apps Script Cell Formatter',
        ipAddress: '10.10.4.4',
        port: '443',
        protocolBadge: 'Output Trimmer',
        description: 'Strips trailing quotes and newlines so every Google Sheet row stays aligned.',
        inputPayload: '{\n  "rawContent": "\\"Loved seeing...\\""\n}',
        processingLogic: 'Removes outer quotes and trims excess whitespace.',
        outputPayload: '{\n  "cleanCellText": "Loved seeing Summit Roofing..."\n}',
        latency: '~1ms',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'Local Regex String Cleaner',
          endpoint: 'local://clean-cell',
          retryPolicy: 'Local',
          secretKeys: [],
          payloadSchema: 'String',
          fallbackAction: 'Pass-through trimmed string.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Write Back Directly Into Spreadsheet Cell',
        tool: 'Google Sheets Cell Output',
        ipAddress: '10.10.4.5',
        port: '443',
        protocolBadge: 'Instant Sheet Sync',
        description: 'Populates the generated hook, category tag, or SEO description straight into the column for free.',
        inputPayload: '{\n  "targetCell": "C2",\n  "value": "Loved seeing Summit Roofing..."\n}',
        processingLogic: 'Commits text value into Google Sheet ready for mail merge or Shopify CSV export.',
        outputPayload: '{\n  "status": "CELL_UPDATED",\n  "monthlyAddOnCost": "$0.00"\n}',
        latency: '~10ms',
        statusUptime: '100%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Native Google Sheets Return',
          endpoint: 'sheets.googleapis.com',
          retryPolicy: 'Native',
          secretKeys: [],
          payloadSchema: 'Spreadsheet Scalar Cell',
          fallbackAction: 'None needed.'
        }
      }
    ],
    aiPromptSample: `=ASK_AI("Extract clean Company Name and write a 1-sentence personalized cold email compliment based on this bio:", A2)`,
    jsonOutputSample: `"Summit Roofing | Loved seeing your Austin team has been helping homeowners since 2012 — are your website quote requests routed into instant SMS alerts yet?"`,
    implementationSteps: [
      'Open Google Sheets -> Extensions -> Apps Script ($0 tool cost).',
      'Create a free API key on console.groq.com and store it in Script Properties as GROQ_API_KEY.',
      'Paste the ASK_AI function from Guide "FREE AI AUTOMATION #02" and hit Save.',
      'Type =ASK_AI("your instruction", A2) in any cell and drag down to enrich hundreds of rows for free!',
      'Copy -> Paste Values Only (Ctrl+Shift+V) once generated to freeze your outputs.'
    ]
  },
  {
    id: 'free-receipt-ocr-bookkeeping',
    categoryKey: 'free-realtime-automation',
    categoryLabel: '100% Free Real-Time AI Automations ($0/mo • No Subscription)',
    badge: 'FREE ($0/MO) • VISION RECEIPT OCR BOOKKEEPER',
    title: 'Gmail Receipt Attachment -> Google Drive Folder ($0) -> Gemini Free Vision OCR -> Accounting Google Sheet',
    subtitle:
      'Extracts PDF and JPG receipts automatically from Gmail, files them in Google Drive, and logs Date, Vendor, Tax, and Total into an expense ledger for $0.',
    networkTopologyTitle: 'Gmail Receipt Archive & Multimodal Vision OCR Bookkeeping Flow ($0/Mo)',
    timeSaved: '8+ Hours / Month ($0 Tool Cost)',
    vaServiceValue: 'Replaces $39/mo Receipt Scanner SaaS',
    tools: ['Gmail Attachments', 'Google Drive Archive', 'Gemini 2.5 Flash Free Vision', 'Google Sheets'],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Gmail Invoice & Receipt Scanner',
        tool: 'GmailApp.search() Free Cron',
        ipAddress: '10.10.5.1',
        port: '443',
        protocolBadge: 'Attachment Poller',
        description: 'Finds unread or unlogged emails containing PDF or image invoices/receipts.',
        inputPayload: '{\n  "query": "has:attachment (invoice OR receipt) -label:OCR-Logged"\n}',
        processingLogic: 'Filters attachments matching application/pdf or image/* MIME types.',
        outputPayload: '{\n  "fileName": "aws_invoice_nov.pdf",\n  "mimeType": "application/pdf",\n  "sizeKB": 148\n}',
        latency: '~95ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'Native Apps Script GmailApp',
          endpoint: 'gmail.googleapis.com',
          retryPolicy: 'Next hourly run',
          secretKeys: [],
          payloadSchema: 'GmailAttachment[]',
          fallbackAction: 'Skips non-receipt signatures/logos.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Archive Original Proof in Drive',
        tool: 'Google Drive DriveApp ($0)',
        ipAddress: '10.10.5.2',
        port: '443',
        protocolBadge: 'Audit Proof Archive',
        description: 'Saves the raw receipt PDF/JPG into the client bookkeeping folder and gets its auditable Drive URL.',
        inputPayload: '{\n  "folderId": "RECEIPTS_FOLDER_ID",\n  "file": "aws_invoice_nov.pdf"\n}',
        processingLogic: 'Creates permanent Drive file and base64-encodes bytes for Gemini Vision inspection.',
        outputPayload: '{\n  "driveUrl": "https://drive.google.com/file/d/...",\n  "base64Ready": true\n}',
        latency: '~160ms',
        statusUptime: '99.99%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'Native DriveApp Binary Write',
          endpoint: 'drive.googleapis.com',
          retryPolicy: 'Apps Script Retry',
          secretKeys: ['RECEIPTS_FOLDER_ID'],
          payloadSchema: 'Drive File + Base64 Blob',
          fallbackAction: 'Logs Drive failure cleanly.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Gemini Vision Multimodal Extractor',
        tool: 'Gemini 2.5 Flash Free Vision ($0)',
        ipAddress: '10.10.5.3',
        port: '443',
        protocolBadge: 'Free Multimodal Vision OCR',
        description: 'Reads scanned receipts and multi-page PDFs with structured JSON line-item math extraction.',
        inputPayload: '{\n  "inline_data": { "mime_type": "application/pdf", "data": "<base64>" }\n}',
        processingLogic: 'Extracts exact vendor, ISO date, expense category, subtotal, tax, and total.',
        outputPayload:
          '{\n  "date": "2026-11-15",\n  "vendor": "Amazon Web Services",\n  "category": "Software",\n  "subtotal": 24.00,\n  "tax": 0.00,\n  "total": 24.00,\n  "currency": "USD"\n}',
        latency: '~890ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST Multimodal Part Payload',
          endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
          retryPolicy: 'Retries once on HTTP 503',
          secretKeys: ['GEMINI_API_KEY'],
          payloadSchema: '{ date, vendor, category, subtotal, tax, total, currency }',
          fallbackAction: 'Logs "Manual Check" row with Drive URL so file is never lost.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Expense Category & Math Check',
        tool: 'Bookkeeping Validator',
        ipAddress: '10.10.5.4',
        port: '443',
        protocolBadge: 'Accounting Validation',
        description: 'Verifies numeric totals and routes receipt metadata to the client Expenses tab.',
        inputPayload: '{\n  "total": 24.00,\n  "vendor": "Amazon Web Services"\n}',
        processingLogic: 'Ensures total > 0 and formats clean row columns.',
        outputPayload: '{\n  "validRow": true\n}',
        latency: '~2ms',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'Local JS Check',
          endpoint: 'local://validate-receipt',
          retryPolicy: 'Local',
          secretKeys: [],
          payloadSchema: 'Spreadsheet Row Array',
          fallbackAction: 'Marks Flagged = TRUE if subtotal + tax != total.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Append Row to Expenses Sheet',
        tool: 'SpreadsheetApp.appendRow() ($0)',
        ipAddress: '10.10.5.5',
        port: '443',
        protocolBadge: 'Ledger Commit + Label',
        description: 'Appends Date, Vendor, Category, Totals, and clickable Drive File URL into Google Sheets.',
        inputPayload: '{\n  "sheetName": "Expenses",\n  "label": "OCR-Logged"\n}',
        processingLogic: 'Writes accounting row and applies OCR-Logged Gmail label to prevent duplicates.',
        outputPayload: '{\n  "logged": true,\n  "cost": "$0.00"\n}',
        latency: '~95ms',
        statusUptime: '99.99%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'Native SpreadsheetApp + GmailApp',
          endpoint: 'sheets.googleapis.com',
          retryPolicy: 'Wait until next trigger if lock timeout',
          secretKeys: [],
          payloadSchema: '8-Column Accounting Row',
          fallbackAction: 'Does not apply OCR-Logged label until row write succeeds.'
        }
      }
    ],
    aiPromptSample: `FREE MULTIMODAL VISION RECEIPT PROMPT:
Inspect the attached PDF or image receipt and return strictly valid JSON:
{
  "date": "YYYY-MM-DD",
  "vendor": "Merchant Name",
  "category": "Software" | "Travel" | "Hardware" | "Meals" | "Other",
  "subtotal": number,
  "tax": number,
  "total": number,
  "currency": "USD"
}`,
    jsonOutputSample: `{
  "date": "2026-11-15",
  "vendor": "Namecheap / Cloudflare",
  "category": "Software",
  "subtotal": 12.98,
  "tax": 0.00,
  "total": 12.98,
  "currency": "USD"
}`,
    implementationSteps: [
      'Create an empty "Receipts" folder in Google Drive and copy its Folder ID from the URL.',
      'Open an Accounting Google Sheet -> Extensions -> Apps Script and paste Guide #05 script.',
      'Add GEMINI_API_KEY (free) and RECEIPTS_FOLDER_ID to Script Properties.',
      'Add an Hourly Time-Driven Trigger for `extractReceiptsToSheet`.',
      'Watch every PDF/JPG invoice automatically file itself into Drive and appear cleanly inside Sheets!'
    ]
  },
  {
    id: 'free-cloudflare-edge-chatbot-github-audit',
    categoryKey: 'free-realtime-automation',
    categoryLabel: '100% Free Real-Time AI Automations ($0/mo • No Subscription)',
    badge: 'FREE ($0/MO) • CLOUDFLARE EDGE AI & SITE CARE',
    title: 'Website Visitor / GitHub Cron ($0) -> Cloudflare Worker Edge ($0 • 100k/day) -> Groq Free AI -> Discord/Telegram',
    subtitle:
      'Power a 24/7 website FAQ & Lead Capture bot AND automated daily SEO/uptime site audits completely free with Cloudflare Workers + GitHub Actions.',
    networkTopologyTitle: 'Cloudflare Workers Free Edge + GitHub Actions Daily Audit Pipeline ($0)',
    timeSaved: '10+ Hours / Week ($0 Server Cost)',
    vaServiceValue: 'Zero-Cost SaaS Stack for Freelancers & Web Devs',
    tools: [
      'Cloudflare Workers Free (100k req/day)',
      'GitHub Actions Free Cron',
      'Groq Llama 3.3 Free API',
      'Discord / Telegram Webhook ($0)'
    ],
    nodes: [
      {
        step: '01',
        type: 'TRIGGER',
        title: 'Edge HTTP / Daily Cron Event',
        tool: 'Cloudflare Edge + GitHub Cron ($0)',
        ipAddress: '10.10.6.1',
        port: '443',
        protocolBadge: 'Global Anycast Ingress',
        description: 'Receives live website visitor questions or fires scheduled daily SEO/uptime scans across client URLs.',
        inputPayload: '{\n  "type": "VISITOR_FAQ",\n  "question": "Do you offer weekly VA retainers?"\n}',
        processingLogic: 'Validates CORS origin and routes payload inside Cloudflare global edge worker (<30ms).',
        outputPayload: '{\n  "validatedOrigin": true,\n  "region": "Global Edge"\n}',
        latency: '~15ms',
        statusUptime: '99.99%',
        iconType: 'webhook',
        detailedSpecs: {
          protocol: 'HTTPS Edge Request / GitHub Cron',
          endpoint: 'https://your-bot.workers.dev',
          retryPolicy: 'Cloudflare Global Redundancy',
          secretKeys: ['NONE_PUBLIC_ENDPOINT'],
          payloadSchema: '{ question, email }',
          fallbackAction: 'Returns HTTP 429 cleanly if abused.'
        }
      },
      {
        step: '02',
        type: 'ENRICH',
        title: 'Context Grounding & Rate Guard',
        tool: 'In-Worker FAQ & HTML Inspector',
        ipAddress: '10.10.6.2',
        port: '443',
        protocolBadge: 'Zero-Hallucination Context',
        description: 'Injects your verified pricing, services, and turnaround times right into the edge worker memory.',
        inputPayload: '{\n  "questionLength": 36\n}',
        processingLogic: 'Slices input safely to 1,000 chars and attaches verified FAQ constraints.',
        outputPayload: '{\n  "contextReady": true\n}',
        latency: '~2ms',
        statusUptime: '100%',
        iconType: 'search',
        detailedSpecs: {
          protocol: 'V8 Isolate Memory',
          endpoint: 'edge://inject-faq',
          retryPolicy: 'Local',
          secretKeys: [],
          payloadSchema: 'Safe Question + Grounded FAQ String',
          fallbackAction: 'Truncates oversized strings.'
        }
      },
      {
        step: '03',
        type: 'AI BRAIN',
        title: 'Groq Free Edge AI Inference',
        tool: 'Groq Cloud Free API ($0)',
        ipAddress: '10.10.6.3',
        port: '443',
        protocolBadge: 'Sub-300ms Edge Reply',
        description: 'Keeps your API key hidden in Cloudflare Secrets while answering visitors accurately in real time.',
        inputPayload: '{\n  "model": "llama-3.3-70b-versatile"\n}',
        processingLogic: 'Generates grounded answer strictly citing available packages and booking link.',
        outputPayload: '{\n  "answer": "Yes! Weekly Executive VA retainers start at $49/week — book a 15-minute intro call directly on our Services page."\n}',
        latency: '~280ms',
        statusUptime: '99.95%',
        iconType: 'brain',
        detailedSpecs: {
          protocol: 'HTTPS POST with Cloudflare Env Secret',
          endpoint: 'https://api.groq.com/openai/v1/chat/completions',
          retryPolicy: 'Fallback message on timeout',
          secretKeys: ['GROQ_API_KEY'],
          payloadSchema: 'Answer String',
          fallbackAction: 'Displays direct contact email if upstream AI is offline.'
        }
      },
      {
        step: '04',
        type: 'ROUTER',
        title: 'Lead Email Capture Check',
        tool: 'Email Presence Branch',
        ipAddress: '10.10.6.4',
        port: '443',
        protocolBadge: 'Lead Alert Gate',
        description: 'Detects when a visitor leaves an email address or when an uptime check detects non-200 status.',
        inputPayload: '{\n  "hasEmail": true\n}',
        processingLogic: 'Triggers Discord/Telegram webhook only when actionable lead or incident occurs.',
        outputPayload: '{\n  "notifyTeam": true\n}',
        latency: '~1ms',
        statusUptime: '100%',
        iconType: 'router',
        detailedSpecs: {
          protocol: 'Edge Condition Check',
          endpoint: 'edge://lead-gate',
          retryPolicy: 'Local',
          secretKeys: [],
          payloadSchema: 'Boolean',
          fallbackAction: 'Always returns AI answer to visitor.'
        }
      },
      {
        step: '05',
        type: 'ACTION',
        title: 'Return Edge JSON + Discord Notify',
        tool: 'Cloudflare Response + Discord ($0)',
        ipAddress: '10.10.6.5',
        port: '443',
        protocolBadge: 'Real-Time Chat + Webhook',
        description: 'Replies cleanly to the frontend chat UI and dispatches qualified inquiries straight to Discord.',
        inputPayload: '{\n  "answer": "Yes! Weekly VA retainers start at $49/week..."\n}',
        processingLogic: 'Returns JSON answer and asynchronously notifies team Discord channel.',
        outputPayload: '{\n  "status": "DELIVERED",\n  "monthlyServerBill": "$0.00"\n}',
        latency: '~45ms',
        statusUptime: '99.99%',
        iconType: 'action',
        detailedSpecs: {
          protocol: 'HTTPS JSON Response + Discord Webhook',
          endpoint: 'https://discord.com/api/webhooks/...',
          retryPolicy: 'Single async notify',
          secretKeys: ['DISCORD_WEBHOOK_URL'],
          payloadSchema: '{ content }',
          fallbackAction: 'Still serves live chat answer even if Discord webhook is unconfigured.'
        }
      }
    ],
    aiPromptSample: `CLOUDFLARE WORKER EDGE SYSTEM PROMPT:
You are the 24/7 Support & Lead Assistant for [Business Name].
Use ONLY the verified services, turnaround times, and pricing listed in <verified_context>.
Never invent unverified discounts or guarantees. If unsure, invite the visitor to leave their email for a fast human reply.`,
    jsonOutputSample: `{
  "answer": "Yes! You can deploy custom VA operations workflows starting at $49/week. Leave your email below or visit #/services to book directly.",
  "leadForwardedToDiscord": true
}`,
    implementationSteps: [
      'Sign up for a free Cloudflare Workers account (workers.cloudflare.com — 100,000 free requests/day).',
      'Create a new Worker, paste the worker.js code from Guide "FREE AI AUTOMATION #09", and save your free GROQ_API_KEY in Worker Settings -> Variables & Secrets.',
      'Optional: create a free Discord Channel Webhook and paste DISCORD_WEBHOOK_URL into Secrets.',
      'Call your `*.workers.dev` URL from any static portfolio or WordPress form.',
      'For automated site SEO & uptime care, drop the GitHub Actions workflow from Guide #10 into `.github/workflows/` ($0 forever).'
    ]
  }
];

export const FREE_REALTIME_WORKFLOW_STRATEGIES: Record<string, WorkflowStrategy> = {
  'free-gmail-triage-apps-script': {
    planTitle: '$0 Forever Gmail Auto-Triage & Draft Rollout (Google Apps Script)',
    planOverview:
      'Deploy an autonomous Gmail Inbox Gatekeeper inside Google Workspace with zero Zapier/Make subscription fees using free Google Apps Script + Gemini/Groq free API tiers.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Apps Script Project Setup ($0)',
        duration: 'Minutes 1 – 3',
        objective: 'Create a free Google Apps Script container bound to your Gmail account.',
        tasks: [
          'Open script.google.com and click New Project.',
          'Obtain a free Google AI Studio API key at aistudio.google.com (no credit card required).',
          'Save GEMINI_API_KEY inside Project Settings -> Script Properties.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Triage Logic & Draft Safety Gate',
        duration: 'Minutes 4 – 6',
        objective: 'Configure priority labels and draft-only reply rules so zero unreviewed emails ever go out.',
        tasks: [
          'Copy the autoTriageUnreadInbox function from FREE AI AUTOMATION #01.',
          'Customize the 4 label names to match your client workflow (VIP, Meeting, Invoice, Newsletter).',
          'Test run once manually inside Apps Script to grant Gmail OAuth permission.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: '5-Minute Real-Time Trigger Activation',
        duration: 'Minutes 7 – 10',
        objective: 'Enable autonomous 24/7 scanning with zero manual maintenance.',
        tasks: [
          'Open Triggers (Clock Icon) -> Add Trigger -> Time-driven -> Every 5 minutes.',
          'Open Gmail Inbox and confirm new unread messages automatically receive priority labels and ready-to-send Drafts.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Google Apps Script',
        url: 'https://script.google.com',
        category: 'Free Cloud Runner ($0)',
        description: 'Native Google Workspace JavaScript runner with free timed triggers and built-in GmailApp/Sheet/Drive APIs.',
        role: 'Zero-Cost Execution Engine'
      },
      {
        name: 'Google AI Studio (Gemini Free)',
        url: 'https://aistudio.google.com',
        category: 'Free LLM API ($0)',
        description: 'Official free-tier API access to Gemini 2.5 Flash for JSON classification, drafting, and Vision OCR.',
        role: 'Free Cognitive AI'
      },
      {
        name: 'Groq Cloud (Free API)',
        url: 'https://console.groq.com',
        category: 'Ultra-Fast Free LLM',
        description: 'Sub-second free API tier running Llama 3.3 70B with OpenAI-compatible JSON mode.',
        role: 'Free High-Speed Backup'
      },
      {
        name: 'Telegram Bot API',
        url: 'https://core.telegram.org/bots/api',
        category: 'Free Instant Push Alerts',
        description: '100% free push notifications to phone or desktop when VIP leads or urgent tickets arrive.',
        role: 'Mobile Notification Channel'
      }
    ],
    proTips: [
      'Always keep replies in Gmail Drafts (`createDraftReply`) rather than calling `sendEmail` on cold inbound threads — human-in-the-loop review takes 3 seconds and guarantees 100% accuracy.',
      'Combine Gmail Apps Script triage with `GmailApp.getAliases()` if a Virtual Assistant manages multiple shared client inboxes.',
      'Pitch this zero-cost automation inside your Executive VA proposals so clients save $50+/mo on third-party tools!'
    ],
    progressionMilestones: [
      { stage: 'Minute 10', target: 'First Unread Threads Auto-Labeled & Drafted', roiImpact: '$0/mo software cost' },
      { stage: 'Day 07', target: 'Inbox Zero Maintained in 15 Mins/Day', roiImpact: '10+ Hours / Week saved' },
      { stage: 'Month 01', target: 'Productized for Multiple Executive VA Clients', roiImpact: '$400–$800/mo VA Retainer Ready' }
    ]
  },
  'free-speed-to-lead-form-telegram': {
    planTitle: '$0 Forever 3-Second Speed-to-Lead & Telegram Bot',
    planOverview:
      'Capture leads from a free Google Form or Tally form, qualify them instantaneously with Gemini Free AI, send a personalized email with your booking link, and ping Telegram in under 3 seconds.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Free Form & Telegram Bot Setup',
        duration: 'Minutes 1 – 5',
        objective: 'Set up your free intake form and Telegram notification bot.',
        tasks: [
          'Create a Google Form linked to a Google Sheet.',
          'Message @BotFather on Telegram (`/newbot`) to generate a free Bot Token and Chat ID.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Real-Time onFormSubmit Script',
        duration: 'Minutes 6 – 10',
        objective: 'Connect Gemini 2.5 Flash Free API inside Extensions -> Apps Script.',
        tasks: [
          'Save GEMINI_API_KEY, TELEGRAM_BOT_TOKEN, and TELEGRAM_CHAT_ID in Script Properties.',
          'Paste `onLeadFormSubmit(e)` from Guide #03 and install the "On form submit" trigger.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'End-to-End Live Test',
        duration: 'Minutes 11 – 15',
        objective: 'Verify sub-3-second Gmail reply and Telegram mobile alert.',
        tasks: [
          'Submit a test inquiry and verify the custom email lands immediately with your free Cal.com booking link.',
          'Confirm Telegram buzzes on your phone with the VIP lead score and summary.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Google AI Studio (Gemini Free)',
        url: 'https://aistudio.google.com',
        category: 'Free LLM API ($0)',
        description: 'Official free-tier API key for fast lead scoring and personalized replies.',
        role: 'Lead Qualifier Brain'
      },
      {
        name: 'Telegram Bot API',
        url: 'https://core.telegram.org/bots/api',
        category: 'Free Mobile Alerts',
        description: 'Unlimited real-time VIP lead alerts sent straight to your phone.',
        role: 'Instant Push Notifier'
      },
      {
        name: 'Cal.com Free Plan',
        url: 'https://cal.com',
        category: 'Free Scheduling',
        description: 'Free calendar booking link included automatically in AI responses.',
        role: 'Discovery Call Scheduler'
      },
      {
        name: 'Google Apps Script',
        url: 'https://script.google.com',
        category: 'Free Real-Time Trigger',
        description: 'Runs `onFormSubmit` instantaneously with zero monthly task caps.',
        role: 'Real-Time Orchestrator'
      }
    ],
    proTips: [
      'Always include a free Cal.com or Google Calendar Appointment Schedule URL in the prompt so prospects book immediately while interest is hot.',
      'Replicate this exact free Google Form + Telegram stack for local dentists, roofers, and agencies who refuse to pay $99/mo CRM fees.'
    ],
    progressionMilestones: [
      { stage: 'Minute 15', target: 'Sub-3s Form-to-Telegram Pipeline Active', roiImpact: 'Zero missed leads' },
      { stage: 'Week 01', target: 'First Client Discovery Calls Auto-Booked', roiImpact: '$0/mo SaaS overhead' },
      { stage: 'Month 01', target: 'Offer $350 Setup to Local Service Businesses', roiImpact: '100% pure profit margin' }
    ]
  },
  'free-n8n-ollama-unlimited': {
    planTitle: '$0 Unlimited Visual Workflows: n8n Community + Ollama Local AI',
    planOverview:
      'Run full enterprise-grade 5-node AI automations on your own laptop, desktop, or Oracle Cloud Always-Free VM with zero monthly subscriptions and 100% offline data privacy.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Install Ollama Local AI ($0)',
        duration: 'Minutes 1 – 5',
        objective: 'Run open-source Llama 3.2 or Qwen 2.5 locally on CPU or GPU.',
        tasks: [
          'Download Ollama from ollama.com (Windows/Mac/Linux).',
          'Execute `ollama run llama3.2` in terminal to spin up localhost:11434.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Boot n8n Community Edition ($0 Unlimited)',
        duration: 'Minutes 6 – 10',
        objective: 'Start your visual node workflow engine via Docker or npx.',
        tasks: [
          'Run Docker command `docker run -it --rm -p 5678:5678 docker.n8n.io/n8nio/n8n`.',
          'Open localhost:5678 and add an AI Agent or HTTP Request node pointing to Ollama or Groq Free API.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Expose Public Webhooks via Free Cloudflare Tunnel',
        duration: 'Minutes 11 – 15',
        objective: 'Connect Tally, Notion, Discord, and Google Sheets live.',
        tasks: [
          'Run `cloudflared tunnel --url http://localhost:5678` for a free instant HTTPS URL.',
          'Connect external webhooks and execute unlimited workflow runs forever.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Ollama (Free Local AI)',
        url: 'https://ollama.com',
        category: 'Offline AI Runtime ($0)',
        description: 'Run Llama 3.2, Gemma, Qwen 2.5, and Mistral locally with zero API fees and complete privacy.',
        role: 'Private Local LLM Engine'
      },
      {
        name: 'n8n Community Edition',
        url: 'https://github.com/n8n-io/n8n',
        category: 'Open-Source Automation',
        description: 'Unlimited self-hosted workflows, visual node editor, and native AI agent integrations.',
        role: 'Visual Node Orchestrator'
      },
      {
        name: 'Cloudflare Quick Tunnel',
        url: 'https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/',
        category: 'Free Webhook Ingress',
        description: 'Free HTTPS public webhook URL forwarding safely to your local n8n instance.',
        role: 'Encrypted Tunnel Gateway'
      },
      {
        name: 'Notion Free API',
        url: 'https://www.notion.so/my-integrations',
        category: 'Free Database / CRM',
        description: 'Free team workspace and REST API to store structured AI outputs.',
        role: 'Free Knowledge & CRM DB'
      }
    ],
    proTips: [
      'When handling client NDAs, medical/legal PDFs, or accounting sheets, running Ollama locally means not a single byte leaves the computer.',
      'For older laptops without GPUs, swap the Ollama URL for Groq Cloud Free API (`console.groq.com`) inside the exact same n8n workflow!'
    ],
    progressionMilestones: [
      { stage: 'Minute 15', target: 'n8n + Ollama Running Live at $0/mo', roiImpact: 'Unlimited node executions' },
      { stage: 'Week 02', target: 'Private NDA & PDF Summarizers Deployed', roiImpact: 'Zero data privacy risk' },
      { stage: 'Month 01', target: 'Package Turnkey Self-Hosted Client Stacks', roiImpact: '$500–$1,500 Setup Revenue' }
    ]
  },
  'free-sheets-bulk-ai-enrichment': {
    planTitle: '$0 Forever Google Sheets =ASK_AI() Lead & SKU Enricher',
    planOverview:
      'Replace $49/mo paid spreadsheet AI add-ons permanently using a free Google Apps Script custom formula connected to Groq Llama 3.3 Free API.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Create Free Groq API Key ($0)',
        duration: 'Minutes 1 – 2',
        objective: 'Get ultra-fast Llama 3.3 70B inference with no monthly subscription.',
        tasks: [
          'Sign up free at console.groq.com and create an API key.',
          'Open Google Sheets -> Extensions -> Apps Script -> Project Settings -> Script Properties -> Add GROQ_API_KEY.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Add =ASK_AI() Formula',
        duration: 'Minutes 3 – 4',
        objective: 'Install your custom spreadsheet AI formula.',
        tasks: [
          'Paste the `ASK_AI(instruction, cellInput)` function from Guide FREE AI AUTOMATION #02 into Code.gs and Save.',
          'Type `=ASK_AI("Draft 1-line hook:", A2)` in your outreach column.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Bulk Enrich & Freeze Values',
        duration: 'Minutes 5 – 8',
        objective: 'Enrich leads or Shopify SKUs cleanly without repeat API calls.',
        tasks: [
          'Drag the formula down across 50–100 rows at a time.',
          'Highlight -> Copy -> Paste Special -> Values Only (`Ctrl+Shift+V`) to lock your finished data.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Groq Cloud (Free API)',
        url: 'https://console.groq.com',
        category: 'Free Sub-Second LLM',
        description: 'OpenAI-compatible free API running Llama 3.3 70B at 500+ tokens/second.',
        role: 'Bulk Enrichment Engine'
      },
      {
        name: 'Google Apps Script',
        url: 'https://script.google.com',
        category: 'Free Sheet Runner',
        description: 'Turns any JavaScript function into a native `=ASK_AI()` spreadsheet formula at $0.',
        role: 'Formula Bridge'
      }
    ],
    proTips: [
      'Always use Paste Special -> Values Only after batch enrichment so opening the Sheet later does not recalculate already completed rows.',
      'Offer clean B2B Lead Enrichment lists (100 researched leads + custom opening lines) on Upwork using this exact $0 formula!'
    ],
    progressionMilestones: [
      { stage: 'Minute 05', target: '=ASK_AI() Live Inside Google Sheets', roiImpact: '$0/mo add-on cost' },
      { stage: 'Hour 01', target: '100+ Leads or Products Enriched Automatically', roiImpact: '14+ Hours Saved/Week' },
      { stage: 'Month 01', target: 'Sell Lead & Catalog Cleanup Services', roiImpact: '$300–$750/project revenue' }
    ]
  },
  'free-receipt-ocr-bookkeeping': {
    planTitle: '$0 Forever Gmail Receipt & Invoice OCR Auto-Bookkeeper',
    planOverview:
      'Extract PDF/JPG receipts from Gmail, archive originals in Google Drive, and append accounting rows in Google Sheets using Gemini Free Vision API.',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Create Drive Receipts Folder ($0)',
        duration: 'Minutes 1 – 2',
        objective: 'Set up audit-proof Google Drive receipt archiving.',
        tasks: [
          'Create a Google Drive folder named "Receipts Archive" and copy the ID from its URL.',
          'Store `RECEIPTS_FOLDER_ID` and free `GEMINI_API_KEY` inside Script Properties.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Deploy Gemini Vision Script',
        duration: 'Minutes 3 – 5',
        objective: 'Extract ISO dates, vendor names, subtotal, tax, and totals from PDFs and images automatically.',
        tasks: [
          'Paste `extractReceiptsToSheet()` from Guide FREE AI AUTOMATION #05 into Expenses Google Sheet -> Apps Script.',
          'Run once manually to verify row formatting and Drive link creation.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Activate Hourly Bookkeeping Cron',
        duration: 'Minutes 6 – 8',
        objective: 'Run hands-free bookkeeping reconciliation 24/7.',
        tasks: [
          'Add an Hourly Time-Driven Trigger for `extractReceiptsToSheet`.',
          'Enjoy an automatically categorized Expenses spreadsheet with direct proof links for tax season.'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Google AI Studio (Gemini Free)',
        url: 'https://aistudio.google.com',
        category: 'Free Multimodal Vision',
        description: 'Native PDF and receipt image OCR extraction via Gemini 2.5 Flash free API tier.',
        role: 'Document Vision Parser'
      },
      {
        name: 'Google Apps Script',
        url: 'https://script.google.com',
        category: 'Free Workspace Bridge',
        description: 'Connects Gmail attachments, Google Drive storage, and Google Sheets for $0.',
        role: 'Zero-Cost Automator'
      }
    ],
    proTips: [
      'Always archive the original PDF/image in Google Drive and save `file.getUrl()` in Column H so CPAs and clients have 1-click audit proof.',
      'Replaces $39/mo paid receipt scanners like Dext or Hubdoc for small freelance businesses!'
    ],
    progressionMilestones: [
      { stage: 'Minute 08', target: 'Receipts Auto-Filing into Drive + Sheets', roiImpact: '$0/mo SaaS bill' },
      { stage: 'Month 01', target: 'Tax-Ready Monthly Expense Ledger Generated', roiImpact: '8+ Hours Saved/Month' },
      { stage: 'Quarter 01', target: 'Upsell Automated Bookkeeping Ops to VA Clients', roiImpact: '+$300/mo Client Retainer Value' }
    ]
  },
  'free-cloudflare-edge-chatbot-github-audit': {
    planTitle: '$0 Forever Cloudflare Edge Chatbot + GitHub Actions Daily Care Bot',
    planOverview:
      'Run a global 24/7 website FAQ & Lead Bot (100k requests/day free on Cloudflare Workers) plus automated daily SEO & uptime monitoring on GitHub Actions ($0/mo).',
    phases: [
      {
        phase: 'PHASE 01',
        name: 'Deploy Cloudflare Worker ($0 Free Tier)',
        duration: 'Minutes 1 – 5',
        objective: 'Create a global serverless API proxy keeping your free Groq API key safe.',
        tasks: [
          'Sign in at workers.cloudflare.com -> Create Worker -> paste code from Guide FREE AI AUTOMATION #09.',
          'Add `GROQ_API_KEY` and optional `DISCORD_WEBHOOK_URL` under Settings -> Variables & Secrets.'
        ]
      },
      {
        phase: 'PHASE 02',
        name: 'Connect Static Portfolio / Client Site',
        duration: 'Minutes 6 – 10',
        objective: 'Connect any HTML, React, or WordPress contact widget to your `*.workers.dev` URL.',
        tasks: [
          'Send a POST request `{ question, email }` from your frontend chat/inquiry widget.',
          'Verify grounded answers return in <300ms and Discord alerts fire cleanly.'
        ]
      },
      {
        phase: 'PHASE 03',
        name: 'Schedule Free GitHub Actions SEO & Uptime Check',
        duration: 'Minutes 11 – 15',
        objective: 'Automate morning client website checks with zero server costs.',
        tasks: [
          'Save `.github/workflows/site-audit.yml` from Guide #10 into any public repo.',
          'Add `GROQ_API_KEY` and `DISCORD_WEBHOOK` in GitHub Repository Secrets -> test via Run Workflow!'
        ]
      }
    ],
    recommendedWebsites: [
      {
        name: 'Cloudflare Workers Free',
        url: 'https://workers.cloudflare.com',
        category: 'Free Edge Serverless',
        description: '100,000 free requests per day across 300+ global data centers — $0/month forever.',
        role: 'Zero-Cost API Backend'
      },
      {
        name: 'GitHub Actions Free',
        url: 'https://github.com/features/actions',
        category: 'Free Cloud Cron Runner',
        description: 'Automated daily Ubuntu runners checking client uptime, SSL, and SEO meta tags.',
        role: 'Daily Website Care Bot'
      },
      {
        name: 'Groq Cloud (Free API)',
        url: 'https://console.groq.com',
        category: 'Sub-Second Free AI',
        description: 'Powers instant visitor FAQ replies and daily SEO summaries at $0 cost.',
        role: 'Edge Inference Brain'
      }
    ],
    proTips: [
      'Include the automated daily SEO & uptime Discord/Email report inside your $49/mo Website Care Plans so clients see proof of value every week!',
      'Using Cloudflare Workers Secrets guarantees your AI API key is never exposed in browser network inspect tools.'
    ],
    progressionMilestones: [
      { stage: 'Minute 15', target: 'Edge Chatbot & Daily Site Audit Live', roiImpact: '$0/mo hosting & monitor bills' },
      { stage: 'Week 02', target: '24/7 Visitor Lead Capture Running Automatically', roiImpact: '10+ Hours Saved/Week' },
      { stage: 'Month 01', target: 'Bundled into Client Web Hosting Care Retainers', roiImpact: '$250–$600/setup + Recurring Care' }
    ]
  }
};
