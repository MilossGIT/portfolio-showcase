import { Github } from 'lucide-react';

export const CONTACT_EMAIL = 'minicm034@gmail.com';
// export const PHONE_NUMBER = '+38630368261';

export const SOCIAL_LINKS = {
    github: 'https://github.com/MilossGIT',
    linkedin: 'https://www.linkedin.com/in/milos-minic-0302b96b/',
};

export const NAV_LINKS = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#work' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
] as const;

export const FEATURED_REPO_NAMES = [
    'AI-Powered-Email-Response-Generator',
    'unidep',
    'relay-http',
    'Ticket-Notifier',
    'portfolio-showcase',
];

// Early learning exercises and the profile README: kept on GitHub, not featured here.
export const HIDDEN_REPO_NAMES = [
    'MilossGIT',
    'contribute',
    'Password-Generator',
    'Web-Calculator-JS',
    'Modal-Popup-JS',
    'Tic-Tac-Toe-JS-Game',
    'ProjectDrivers.html',
    'Project_LandingPage',
    'Project_OnboardingForm',
    'UserAuthLoginForm',
    'SearchBarWithFiltering',
    'price-comparison-table',
    'React-Currency-Converter',
];

// Shown when a repository has no description on GitHub.
export const REPO_DESCRIPTIONS: Record<string, string> = {
    'AI-Powered-Email-Response-Generator':
        'Chrome extension that uses an LLM to draft contextual Gmail replies in a chosen tone.',
    'portfolio-showcase':
        'This site: Next.js 14, TypeScript and Tailwind CSS, with live GitHub data and dark mode.',
    'Portfolio-Illustration':
        'Portfolio site for an illustrator with an interactive gallery, animations and contact form.',
    'Events7':
        'Analytics dashboard for tracking app events, with location-based permissions for ad events.',
    'Crypto-wallet':
        'React crypto wallet dashboard with real-time prices, portfolio tracking and transactions.',
    'modern-cv-generator':
        'React app for building a professional CV in a form-based editor and exporting it to PDF.',
};

export const WORK_HIGHLIGHTS = [
    {
        title: 'AI Knowledge Assistant & Workflow Hub',
        company: 'Sportradar · internal tool',
        description:
            'Recurring setup and integration questions in team Slack channels, turned into a self-serve hub: 35 interactive workflow diagrams and an AI assistant built on curated team answers and the public documentation. It always cites its source, declines below a confidence threshold, and escalates to a company AI agent through a least-privilege service token.',
        tags: ['LLM', 'Retrieval', 'LLM Evaluation', 'Node.js', 'Kubernetes', 'Playwright'],
        impact: 'Shipped as a production service with SSO, a built-in CMS for non-developers, and CI running a 51-question answer evaluation',
    },
    {
        title: 'Client Activation Automation',
        company: 'Sportradar · internal tool',
        description:
            'A five-step manual client activation runbook spanning an admin system, two GitHub repositories, Slack and Jira, automated end to end with batch runs, dry-run and live modes, and human approval gates. A companion tool generates client onboarding packs, using an LLM to draft client-specific guide text.',
        tags: ['TypeScript', 'React', 'Jira', 'GitHub', 'Slack', 'Anthropic API'],
        impact: '100+ client activations in its first two months: 101 orders, 31 infrastructure pull requests and 99 Jira handovers',
    },
    {
        title: 'Real Estate Portal — Location-First Architecture',
        company: 'Lokacija.net',
        url: 'https://lokacija.net/',
        description:
            'A Django-based real estate platform where locations (cities, districts, streets) are first-class database entities with permanent, SEO-friendly URLs. The backend controls all routing, hierarchy validation, and SEO logic.',
        tags: ['Django', 'Python', 'PostgreSQL', 'SEO', 'Real Estate'],
        impact: 'Location-first architecture powering property search across Slovenia and the Adriatic region',
    },
    {
        title: 'Cycling Readiness Coach',
        company: 'Kind Cadence',
        url: 'https://kindcadence.app/',
        description:
            'A cycling readiness coach that answers one question: "What is the best ride for me today?" Not another activity tracker — Kind Cadence interprets your data and provides calm, evidence-based guidance, like an experienced cycling coach who understands your habits.',
        tags: ['Mobile App', 'Strava API', 'Health Data', 'Coaching', 'Recovery'],
        impact: 'Readiness, pacing, and recovery guidance shaped around how you actually ride and rest',
    },
    {
        title: 'Ormarich E-commerce',
        company: 'Ormarich',
        url: 'https://www.ormarich.hr/',
        description:
            'Production storefront for Ormarich with Stripe payments, inventory updates via webhooks, and admin product management backed by Vercel KV.',
        tags: ['Next.js', 'Stripe', 'Vercel KV', 'E-Commerce', 'Webhooks'],
        impact: 'Live kids concept shop with Stripe checkout and real-time inventory sync',
    },
    {
        title: 'Multilingual Federation Site',
        company: 'ZKH · Savez za kliničku hipnoterapiju',
        url: 'https://www.standardi-hipnoterapije.org/sr',
        description:
            'Clinical hypnotherapy association website in Slovenian, Croatian and Serbian. Payload CMS 3 for institutional pages and blog posts, SEO helpers, and optional DeepL auto-translation on publish.',
        tags: ['Next.js', 'Payload CMS', 'i18n', 'DeepL', 'SEO'],
        impact: 'Trilingual institutional site with CMS-driven content and auto-translation workflow',
    },
];

export const SKILLS = [
    'LLM APIs (Anthropic, OpenAI)',
    'Agentic coding (Claude Code, Cursor)',
    'Retrieval-grounded assistants',
    'LLM evaluation',
    'MCP',
    'TypeScript',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'Python / Django',
    'PostgreSQL',
    'Tailwind CSS',
    'CSS/SCSS',
    'Playwright',
    'Docker / Kubernetes',
    'GitLab CI/CD',
    'REST APIs',
];

export const EDUCATION = [
    {
        school: 'The College of Hotel Management',
        degree: "Bachelor's Degree",
        location: 'Belgrade',
        date: '2010 - 2018',
    },
    {
        school: 'Cubes School of Programming',
        degree: 'Certificate in Programming',
        location: 'Belgrade',
        date: '2019',
        description: 'JavaScript & React.js',
        project: {
            name: 'Vintify',
            description: 'A full-stack e-commerce web application designed to connect sellers with customers interested in purchasing second-hand pieces.',
        },
    },
];

export const EXPERIENCE = [
    {
        title: 'Software Integration Engineer',
        company: 'Sportradar',
        location: 'Ljubljana',
        date: 'April 2022 - Present',
        description: [
            'Deliver end-to-end client integrations of widget products for betting and media clients: requirements analysis, configuration and technical communication with clients and product teams.',
            'Develop frontends in JavaScript, TypeScript, React and Sass/SCSS and integrate them with REST APIs and complex backends, working with product, QA and engineering teams around releases.',
            'Identified recurring setup and integration questions in team Slack channels and built a self-serve hub with an AI assistant that cites its sources and declines below a confidence threshold, plus a built-in CMS for non-developers.',
            'Mapped a five-step manual client activation runbook across an admin system, GitHub, Slack and Jira and automated it end to end; it handled 100+ activations in its first two months.',
            'Built LLM-generated client onboarding packs, plus Playwright and Chrome-extension diagnostics tooling for client integrations.',
            'Use agentic AI coding tools (e.g. Claude Code, Cursor) in an engineer-led workflow, and share AI tooling and practices with the team.',
        ],
        tags: ['TypeScript', 'React', 'LLM APIs', 'Node.js', 'Playwright', 'Kubernetes'],
    },
    {
        title: 'MSE Tier 2',
        company: 'CCBill',
        location: 'Belgrade',
        date: 'Sept 2017 - April 2022',
        description: [
            'Built secure, user-friendly payment forms and deployed them to production.',
            'Resolved payment processing errors and reduced their incidence through robust validation.',
            'Worked with clients to understand their business needs.',
        ],
        tags: ['JavaScript', 'Payments', 'Validation', 'Client Communication'],
    },
    {
        title: 'Web Developer',
        company: 'BG Wireless',
        location: 'Belgrade',
        date: 'June 2016 - Sept 2017',
        description: [
            'Website maintenance, responsive design and UX improvements.',
            'Managed wireless network infrastructure.',
        ],
        tags: ['HTML5', 'CSS', 'JavaScript', 'Responsive Design'],
    },
    {
        title: 'Junior Frontend Developer',
        company: 'Queens Trade d.o.o.',
        location: 'Belgrade',
        date: 'June 2015 - Dec 2016',
        description: [
            'Coded responsive, cross-browser banner layouts in HTML and CSS that helped raise click-through rates for client campaigns.',
        ],
        tags: ['HTML', 'CSS', 'Responsive Design'],
    },
    {
        title: 'Software Support Engineer L2',
        company: 'NCR',
        location: 'Belgrade',
        date: 'Oct 2014 - June 2015',
        description: [
            'Second-level support for complex issues and escalations on retail systems (POS, ESB, SCOM), server optimization and virtualization.',
        ],
        tags: ['Technical Support', 'POS Systems', 'Virtualization'],
    }
];

// Fallback when the GitHub API is unavailable.
export const PROJECTS = [
    {
        title: 'AI Email Response Generator',
        description: 'Chrome extension that uses an LLM to draft contextual Gmail replies in a chosen tone.',
        tags: ['TypeScript', 'LLM', 'Chrome Extension'],
        github: 'https://github.com/MilossGIT/AI-Powered-Email-Response-Generator',
    },
    {
        title: 'unidep',
        description: 'One command to detect and install dependencies across Python, Node.js, Rust and system package managers.',
        tags: ['Python', 'CLI', 'Automation'],
        github: 'https://github.com/MilossGIT/unidep',
    },
    {
        title: 'relay-http',
        description: 'Send HTTP requests from your terminal or browser with clear, structured output.',
        tags: ['JavaScript', 'CLI', 'HTTP'],
        github: 'https://github.com/MilossGIT/relay-http',
    },
    {
        title: 'Ticket Notifier',
        description: 'Monitors theatre ticket availability and sends email alerts when it changes.',
        tags: ['JavaScript', 'Node.js', 'Automation'],
        github: 'https://github.com/MilossGIT/Ticket-Notifier',
    },
];
