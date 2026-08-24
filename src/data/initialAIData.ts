import { CMSItem } from '../types';

export const INITIAL_AI_ITEMS: CMSItem[] = [
  {
    id: 'ai-topic-1',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Guide',
    title: 'What Is Artificial Intelligence & How Does It Work?',
    category: 'AI FUNDAMENTALS',
    status: 'PUBLISHED',
    visible: true,
    description: 'A comprehensive beginner guide explaining Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI in clear, actionable terms.',
    fullContent: `
### Understanding Artificial Intelligence (AI)

Artificial Intelligence (AI) refers to the simulation of human intelligence processes by computer systems. These processes include learning (the acquisition of information and rules for using it), reasoning (using rules to reach approximate or definite conclusions), and self-correction.

#### Core Branches of AI

1. **Machine Learning (ML):** Algorithms that improve automatically through experience and data analysis.
2. **Deep Learning:** A subset of ML based on artificial neural networks inspired by the human brain structure.
3. **Generative AI:** Systems capable of creating new text, code, images, audio, or video based on learned patterns (e.g., ChatGPT, Claude, Gemini, Midjourney).
4. **Natural Language Processing (NLP):** Enables computers to understand, interpret, and manipulate human spoken or written language.

#### Practical Tools & Applications
- **Text & Writing:** ChatGPT, Claude, Gemini
- **Coding & Dev:** GitHub Copilot, Cursor, Antigravity
- **Design & Media:** Midjourney, DALL-E 3, ElevenLabs
`,
    buttonText: 'READ FULL GUIDE →',
    badge: 'MUST READ',
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ai-topic-2',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Article',
    title: 'The AI Era: How AI Is Transforming Work, Freelancing & Business',
    category: 'AI ERA',
    status: 'PUBLISHED',
    visible: true,
    description: 'Explore how Artificial Intelligence is reshaping modern work, remote careers, digital marketing, and virtual assistance in the global digital economy.',
    fullContent: `
### Navigating the AI Era

The digital world has entered a fundamental shift. AI is not replacing human professionals; rather, professionals who leverage AI tools effectively are replacing those who do not.

#### Key Shifts across Industries

- **Software Engineering:** AI pair-programmers speed up development by 300%, allowing developers to focus on architecture and problem-solving.
- **Virtual Assistance:** VAs use AI to automate email management, data organization, research, and client reporting.
- **Freelancing & Content Creation:** Freelancers craft higher quality proposals, conduct deep market research, and produce multimedia content in a fraction of the time.
- **Business Operations:** AI chatbots provide 24/7 client support while automated workflows manage lead generation.
`,
    buttonText: 'EXPLORE AI ERA →',
    badge: 'TRENDING',
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ai-topic-3',
    pageOwner: 'ai',
    homeFeatured: true,
    contentType: 'Tutorial',
    title: 'AI Automation Workflows: Combining AI with APIs & No-Code Systems',
    category: 'AI AUTOMATION',
    status: 'PUBLISHED',
    visible: true,
    description: 'Step-by-step guide to building automated AI workflows for email processing, customer inquiry routing, and content pipelines.',
    fullContent: `
### Building Intelligent AI Automations

Traditional automation executes static if-this-then-that rules. AI automation adds a cognitive decision engine capable of processing unstructured data, interpreting client intent, and generating contextual responses.

#### Step-by-Step AI Automation Architecture

1. **Trigger:** Receive incoming email or web form inquiry.
2. **AI Processing:** Send message body to LLM API (Gemini/OpenAI) with custom prompt instructions.
3. **Intent Classification & Response:** AI categorizes intent (Billing, Technical, Lead) and generates draft response.
4. **Action:** Save lead to database, send automated response, or alert team via Slack.
`,
    buttonText: 'LEARN AUTOMATION →',
    badge: 'TUTORIAL',
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ai-topic-4',
    pageOwner: 'ai',
    homeFeatured: false,
    contentType: 'Guide',
    title: 'Essential AI Tools for Virtual Assistants & Remote Professionals',
    category: 'AI FOR VIRTUAL ASSISTANTS',
    status: 'PUBLISHED',
    visible: true,
    description: 'Top AI tools and prompt frameworks designed to supercharge Virtual Assistant productivity, email management, and client scheduling.',
    fullContent: `
### Supercharging VA Productivity with AI

Virtual Assistants can leverage specialized AI platforms to deliver top-tier support to clients while saving hours every week.

#### Essential AI Stack for VAs

- **Email & Communication:** AI drafting assistants for rapid inbox triage and professional client correspondence.
- **Calendar & Scheduling:** Motion, Reclaim.ai for smart meeting management and time-blocking.
- **Research & Summarization:** Perplexity AI for rapid market intelligence and executive briefing notes.
- **Content & Graphics:** Canva Magic Studio and Grammarly Go for quick visual assets and proofreading.
`,
    buttonText: 'VIEW VA TOOLS →',
    badge: 'VA GUIDE',
    sortOrder: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ai-topic-5',
    pageOwner: 'ai',
    homeFeatured: false,
    contentType: 'Article',
    title: 'How AI Can Influence People: Opportunities, Algorithms & Ethics',
    category: 'AI INFLUENCE',
    status: 'PUBLISHED',
    visible: true,
    description: 'A balanced educational overview of how recommendation algorithms, generative models, and AI decision systems shape human behavior, information, and choice.',
    fullContent: `
### Understanding AI Influence on Human Behavior

Artificial Intelligence exerts subtle yet profound influence on daily decisions through personalization algorithms, social media feeds, search engine rankings, and conversational models.

#### Key Dimensions of AI Influence

- **Personalized Recommendations:** Streaming services, e-commerce, and social feeds curate information based on behavioral prediction models.
- **Generative AI & Search:** AI summaries shape how users discover knowledge and form opinions.
- **Ethical Opportunities:** AI enhances accessibility, delivers personalized education, and streamlines complex decision-making.
- **Ethical Risks:** Potential echo chambers, algorithmic bias, privacy concerns, and deepfake misinformation require human oversight and critical thinking.
`,
    buttonText: 'READ BALANCED ANALYSIS →',
    badge: 'ETHICS & PERSPECTIVE',
    sortOrder: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ai-topic-6',
    pageOwner: 'ai',
    homeFeatured: false,
    contentType: 'Guide',
    title: 'AI Safety, Responsible AI Use & Data Privacy Standards',
    category: 'AI SAFETY',
    status: 'PUBLISHED',
    visible: true,
    description: 'Best practices for ethical AI deployment, safeguarding client data, avoiding hallucinations, and maintaining human oversight.',
    fullContent: `
### Responsible AI & Privacy Protection

As AI integration accelerates, adhering to data privacy and safety protocols is essential for businesses, freelancers, and virtual assistants.

#### Golden Rules for Safe AI Usage

1. **Never Input Sensitive Personal/Client Data:** Avoid feeding private passwords, financial credentials, or confidential NDA details into public models.
2. **Always Verify Outputs:** AI can produce plausible-sounding inaccuracies ("hallucinations"). Always double-check facts and code before publishing.
3. **Maintain Human-in-the-Loop:** Treat AI as an assistant, not a substitute for critical thinking and final editorial approval.
`,
    buttonText: 'SAFETY CHECKLIST →',
    badge: 'SECURITY',
    sortOrder: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
