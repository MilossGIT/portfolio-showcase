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
    'Portfolio-Illustration',
    'Ticket-Notifier',
    'Events7',
    'portfolio-showcase',
];

export const WORK_HIGHLIGHTS = [
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
            'Clinical hypnotherapy association website with Slovenian at / (no prefix), Croatian (/hr), and Serbian (/sr). Payload CMS 3 for institutional pages and blog posts, SEO helpers, and optional DeepL auto-translation when publishing content.',
        tags: ['Next.js', 'Payload CMS', 'i18n', 'DeepL', 'SEO'],
        impact: 'Trilingual institutional site with CMS-driven content and auto-translation workflow',
    },
    {
        title: 'Sportradar Widget Products',
        company: 'Sportradar',
        description:
            'Frontend-focused development of custom sports data widget products using React, TypeScript, and modern web technologies for real-time integration.',
        tags: ['React', 'TypeScript', 'JavaScript', 'RESTful APIs', 'Widgets'],
        impact: 'End-to-end integration of complex sports data systems for global clients',
    },
    {
        title: 'Secure Payment Forms',
        company: 'CCBill',
        description:
            'Development and deployment of secure, user-friendly payment forms with robust validation to reduce payment processing errors.',
        tags: ['JavaScript', 'Frontend Development', 'Responsive Design', 'Validation'],
        impact: 'Successfully deployed payment forms to production, reducing payment errors through robust validation',
    },
    {
        title: 'Vintify E-Commerce Platform',
        company: 'Cubes School of Programming',
        description:
            'A full-stack e-commerce web application connecting sellers with customers interested in purchasing second-hand pieces.',
        tags: ['React', 'JavaScript', 'Full-Stack', 'E-Commerce'],
        impact: 'Capstone project demonstrating full-stack development skills',
    },
    {
        title: 'Responsive Web Experiences',
        company: 'BG Wireless',
        description:
            'Website maintenance, content management, and responsive design implementation to improve user experience across devices.',
        tags: ['HTML5', 'CSS', 'JavaScript', 'Responsive Design'],
        impact: 'Created visually appealing, cohesive designs with improved cross-device experience',
    },
];

export const SKILLS = [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Tailwind CSS',
    'CSS/SCSS',
    'HTML5',
    'RESTful APIs',
    'Git',
    'Responsive Design',
    'Agile',
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
            'Develop and maintain production-ready React and TypeScript widgets for enterprise clients.',
            'Build and integrate frontend solutions with REST APIs and complex backend systems.',
            'Design and integrate AI-powered solutions to automate internal processes and improve team efficiency.',
            'Collaborate with product, QA, and engineering teams to deliver reliable customer-facing features.',
            'Troubleshoot and resolve integration issues while supporting successful product releases.',
        ],
        tags: ['React.js', 'TypeScript', 'JavaScript', 'RESTful APIs', 'Git', 'Agile'],
    },
    {
        title: 'MSE Tier 2',
        company: 'CCBill',
        location: 'Belgrade',
        date: 'Sept 2017 - April 2022',
        description: [
            'Frontend development of secure and user-friendly payment forms',
            'Successfully deployed payment forms to production environment',
            'Identifying issues and responding to payment processing errors promptly',
            'Reducing payment errors through robust validation',
            'Conducted detailed discussions with clients to understand business needs',
        ],
        tags: ['Frontend Development', 'JavaScript', 'Responsive Design', 'Technical Support'],
    },
    {
        title: 'Web Developer',
        company: 'BG Wireless',
        location: 'Belgrade',
        date: 'June 2016 - Sept 2017',
        description: [
            'Maintaining website and content management',
            'Implementation of responsive design and improving user experience',
            'Created visually appealing and cohesive designs',
            'Managing network wireless infrastructure',
        ],
        tags: ['HTML5', 'CSS', 'JavaScript', 'Responsive Design'],
    },
    {
        title: 'Junior Frontend Developer',
        company: 'Queens Trade d.o.o.',
        location: 'Belgrade',
        date: 'June 2015 - Dec 2016',
        description: [
            'Coded responsive and visually appealing banner layouts using HTML and CSS',
            'Ensuring cross-browser compatibility',
            'Increasing click-through rates for client advertising campaigns',
            'Received positive client feedback for attention to detail',
        ],
        tags: ['HTML', 'CSS', 'Responsive Design'],
    },
    {
        title: 'Software Support Engineer L2',
        company: 'NCR',
        location: 'Belgrade',
        date: 'Oct 2014 - June 2015',
        description: [
            'Second-level technical support for customers with complex technical issues and escalations',
            'Supported retail software systems (POS, ESB, SCOM)',
            'Proficient in POS systems, server optimization, and virtualization',
        ],
        tags: ['Technical Support', 'POS Systems', 'Server Optimization', 'Virtualization'],
    }
];

export const PROJECTS = [
    {
        title: 'Ticket Notifier',
        description: 'A real-time notification system for ticket updates and availability tracking.',
        tags: ['JavaScript', 'Node.js', 'APIs', 'Real-time Updates'],
        github: 'https://github.com/MilossGIT/TicketNotifier',
        readmeUrl: 'https://raw.githubusercontent.com/MilossGIT/TicketNotifier/main/README.md'
    },
    {
        title: 'Portfolio Illustration',
        description: 'A creative portfolio showcase with custom illustrations and animations.',
        tags: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
        github: 'https://github.com/MilossGIT/PortfolioIllustration',
        readmeUrl: 'https://raw.githubusercontent.com/MilossGIT/PortfolioIllustration/main/README.md'
    },
    {
        title: 'Events7',
        description: 'Event management and organization platform with intuitive user interface.',
        tags: ['React', 'MongoDB', 'Express', 'Node.js'],
        github: 'https://github.com/MilossGIT/Events7',
        readmeUrl: 'https://raw.githubusercontent.com/MilossGIT/Events7/main/README.md'
    }
];
