import { Github } from 'lucide-react';

export const CONTACT_EMAIL = 'minicm034@gmail.com';
export const PERSONAL_WEBSITE = 'https://www.milosminic.net/';
export const LOCATION_ADDRESS = 'Ljubljana, Slovenia';

export const SOCIAL_LINKS = {
    github: 'https://github.com/MilossGIT',
    linkedin: 'https://www.linkedin.com/in/milos-minic-0302b96b/',
};

export const NAV_LINKS = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#work' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
] as const;

export const FEATURED_REPO_NAMES = [
    'unidep',
    'relay-http',
    'AI-Powered-Email-Response-Generator',
    'PDF-Helper',
    'macOS-Window-Position-Utility',
    'Portfolio-Illustration',
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
    'unidep':
        'Cross-language dependency installer designed to simplify environment setup and tooling consistency.',
    'relay-http':
        'HTTP client for terminal and browser workflows built for quick local testing and debugging.',
    'AI-Powered-Email-Response-Generator':
        'Chrome extension that uses an LLM to draft contextual Gmail replies in a chosen tone.',
    'PDF-Helper':
        'Utility tool for manipulating, extracting, and processing PDF files efficiently.',
    'macOS-Window-Position-Utility':
        'Lightweight macOS utility to manage and snap window positions with keyboard shortcuts.',
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
        title: 'Kind Cadence',
        company: 'Cycling Readiness Coach',
        url: 'https://kindcadence.app/',
        description:
            'A cycling readiness coach that recommends rides from Strava and health data, focusing on pacing and recovery.',
        tags: ['Mobile App', 'Strava API', 'Health Data', 'Coaching', 'Recovery'],
        impact: 'Calm, evidence-based guidance that helps riders recover better and ride more intelligently.',
        role: undefined as string | undefined,
        outcome: undefined as string | undefined,
        image: undefined as string | undefined,
    },
    {
        title: 'Lokacija.net',
        company: 'Real Estate Portal',
        url: 'https://lokacija.net/',
        description:
            'A Django/PostgreSQL real-estate portal for Slovenia and the Adriatic region with location-first, SEO-friendly URLs.',
        tags: ['Django', 'Python', 'PostgreSQL', 'SEO', 'Real Estate'],
        impact: 'Location-first architecture powering property search across Slovenia and the Adriatic region.',
        role: undefined as string | undefined,
        outcome: undefined as string | undefined,
        image: undefined as string | undefined,
    },
    {
        title: 'Ormarich',
        company: 'E-commerce Storefront',
        url: 'https://www.ormarich.hr/',
        description:
            'A live Next.js storefront with Stripe checkout, webhook-driven inventory updates, and admin product management.',
        tags: ['Next.js', 'Stripe', 'Vercel KV', 'E-Commerce', 'Webhooks'],
        impact: 'Production store delivering a polished shopping experience with reliable inventory sync.',
        role: undefined as string | undefined,
        outcome: undefined as string | undefined,
        image: undefined as string | undefined,
    },
    {
        title: 'Savez za kliničku hipnoterapiju (ZKH)',
        company: 'Multilingual Association Platform',
        url: 'https://www.standardi-hipnoterapije.org/sr',
        description:
            'A trilingual association site on Next.js and Payload CMS 3, with DeepL translation workflows for blog content and institutional pages.',
        tags: ['Next.js', 'Payload CMS', 'i18n', 'DeepL', 'SEO'],
        impact: 'A multilingual experience that keeps content management simple while maintaining SEO and editorial quality.',
        role: undefined as string | undefined,
        outcome: undefined as string | undefined,
        image: undefined as string | undefined,
    },
];

export interface CaseStudyItem {
    id: string
    title: string
    context: string
    claim: string
    stack?: string[]
    inProduction?: string
    metrics?: { label: string; value: string }[]
}

export const CASE_STUDIES: CaseStudyItem[] = [
    {
        id: 'knowledge-assistant',
        title: 'Knowledge Assistant',
        context: 'Sportradar · Internal AI Tooling',
        claim: 'Retrieval-grounded knowledge assistant with source citations.',
        inProduction:
            'Node.js services behind SSO on Kubernetes, covered by Playwright tests and LLM evaluation checks in CI.',
    },
    {
        id: 'runbook-automation',
        title: 'Multi-System Runbook Automation',
        context: 'Sportradar · Workflow Automation',
        claim: 'Multi-system runbook automation across GitHub, Slack, and Jira.',
        stack: ['GitHub', 'Slack', 'Jira integrations'],
        inProduction: '100+ automated runs.',
    },
];

export const SKILL_CATEGORIES = {
    'AI / LLM': [
        'LLM APIs',
        'RAG',
        'Agentic Coding Tools',
        'MCP Integrations',
        'Prompt Engineering',
        'LLM Evaluation',
        'Workflow Automation',
    ],
    'Frontend': [
        'TypeScript',
        'JavaScript',
        'React',
        'Next.js',
        'Tailwind CSS',
        'Vue.js',
        'CSS/SCSS',
    ],
    'Backend': [
        'Node.js',
        'Python',
        'REST APIs',
        'Express.js',
        'Django',
        'SSO Integration',
    ],
    'Data': [
        'PostgreSQL',
        'SQLite',
        'MongoDB',
    ],
    'DevOps & Testing': [
        'Playwright',
        'Jest',
        'Docker',
        'Kubernetes',
        'GitLab CI/CD',
        'Git',
    ],
} as const;

export const SKILLS = Object.values(SKILL_CATEGORIES).flat();

export const EDUCATION = [
    {
        school: 'Cubes School of Programming',
        degree: 'Certificate in Programming, JavaScript & React.js',
        location: 'Belgrade',
        date: '2019',
        description: 'JavaScript & React.js',
        project: {
            name: 'Vintify',
            description: 'A full-stack second-hand marketplace connecting sellers and buyers in one storefront experience.',
        },
    },
    {
        school: 'The College of Hotel Management',
        degree: "Bachelor's Degree",
        location: 'Belgrade',
        date: '2010 - 2018',
    },
];

export const EXPERIENCE = [
    {
        title: 'Software Engineer',
        company: 'Sportradar',
        location: 'Ljubljana',
        date: 'April 2022 - Present',
        description: [
            'Deliver end-to-end client integrations of widget products for betting and media clients, covering requirements analysis, configuration, and technical communication with clients and product teams.',
            'Develop frontends in JavaScript, TypeScript, React, and Sass/SCSS and integrate them with REST APIs and complex backends while working with product, QA, and engineering teams around releases.',
            'Identify repetitive manual work in team processes and build AI-powered tools to automate it, including a knowledge assistant grounded in team and documentation sources.',
            'Ship production Node.js services behind company SSO on Kubernetes, with usage statistics, Slack feedback, and CI running Playwright suites and LLM evaluation checks.',
            'Automate client activations, onboarding packs, and diagnostics tooling to reduce operational friction and improve support coverage.',
        ],
        tags: ['React', 'TypeScript', 'JavaScript', 'REST APIs', 'AI Automation', 'Node.js', 'Playwright', 'Kubernetes'],
    },
    {
        title: 'MSE Tier 2',
        company: 'CCBill',
        location: 'Belgrade',
        date: 'Sept 2017 - April 2022',
        description: [
            'Built secure, user-friendly payment forms and deployed them to production.',
            'Resolved payment processing errors and reduced their incidence through robust validation.',
            'Worked closely with clients to understand their business needs and align technical delivery.',
            'Maintained high reliability in production environments while supporting issue resolution and client communication.',
        ],
        tags: ['Frontend Development', 'JavaScript', 'Responsive Design', 'Technical Support', 'Validation'],
    },
    {
        title: 'Web Developer',
        company: 'BG Wireless',
        location: 'Belgrade',
        date: 'June 2016 - Sept 2017',
        description: [
            'Maintained websites and content systems while improving UX and responsive design across devices.',
            'Managed wireless network infrastructure alongside digital maintenance and deployments.',
            'Implemented design updates and quality improvements that created a more cohesive user experience.',
        ],
        tags: ['HTML5', 'CSS', 'JavaScript', 'Responsive Design', 'UX'],
    },
    {
        title: 'Junior Frontend Developer',
        company: 'Queens Trade d.o.o.',
        location: 'Belgrade',
        date: 'June 2015 - Dec 2016',
        description: [
            'Coded responsive, cross-browser banner layouts in HTML and CSS for client campaigns.',
            'Helped raise click-through rates through visually polished and conversion-focused ad assets.',
            'Worked closely with clients and internal teams to meet campaign goals and ensure consistent browser compatibility.',
        ],
        tags: ['HTML', 'CSS', 'Responsive Design', 'Banner Ads'],
    },
    {
        title: 'Software Support Engineer L2',
        company: 'NCR',
        location: 'Belgrade',
        date: 'Oct 2014 - June 2015',
        description: [
            'Provided second-level support for complex issues and escalations on retail systems including POS, ESB, and SCOM.',
            'Supported customer environments with server optimization and virtualization work.',
            'Troubleshot and resolved production issues to reduce downtime and improve service reliability.',
        ],
        tags: ['Technical Support', 'POS Systems', 'Server Optimization', 'Virtualization'],
    },
];

export const PROJECTS = [
    {
        title: 'unidep',
        description: 'A cross-language dependency installer designed to simplify environment setup and tooling consistency.',
        tags: ['CLI', 'Dependencies', 'Tooling'],
        github: 'https://github.com/MilossGIT/unidep',
        readmeUrl: 'https://raw.githubusercontent.com/MilossGIT/unidep/main/README.md'
    },
    {
        title: 'relay-http',
        description: 'An HTTP client for terminal and browser workflows built for quick local testing and debugging.',
        tags: ['HTTP', 'Developer Tools', 'Testing'],
        github: 'https://github.com/MilossGIT/relay-http',
        readmeUrl: 'https://raw.githubusercontent.com/MilossGIT/relay-http/main/README.md'
    },
    {
        title: 'AI-Powered-Email-Response-Generator',
        description: 'Chrome extension that uses an LLM to draft contextual Gmail replies in a chosen tone.',
        tags: ['Chrome Extension', 'AI Tools', 'Automation'],
        github: 'https://github.com/MilossGIT/AI-Powered-Email-Response-Generator',
        readmeUrl: 'https://raw.githubusercontent.com/MilossGIT/AI-Powered-Email-Response-Generator/main/README.md'
    },
    {
        title: 'PDF-Helper',
        description: 'Utility tool for manipulating, extracting, and processing PDF files efficiently.',
        tags: ['Utility', 'Automation', 'TypeScript'],
        github: 'https://github.com/MilossGIT/PDF-Helper',
        readmeUrl: 'https://raw.githubusercontent.com/MilossGIT/PDF-Helper/main/README.md'
    },
    {
        title: 'macOS-Window-Position-Utility',
        description: 'Lightweight macOS utility to manage and snap window positions with keyboard shortcuts.',
        tags: ['macOS', 'Swift', 'Productivity'],
        github: 'https://github.com/MilossGIT/macOS-Window-Position-Utility',
        readmeUrl: 'https://raw.githubusercontent.com/MilossGIT/macOS-Window-Position-Utility/main/README.md'
    },
    {
        title: 'Portfolio-Illustration',
        description: 'Portfolio site for an illustrator with an interactive gallery, animations and contact form.',
        tags: ['React', 'Next.js', 'Tailwind CSS'],
        github: 'https://github.com/MilossGIT/Portfolio-Illustration',
        readmeUrl: 'https://raw.githubusercontent.com/MilossGIT/Portfolio-Illustration/main/README.md'
    }
];
