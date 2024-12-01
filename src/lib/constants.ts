import { Github } from 'lucide-react';

export const CONTACT_EMAIL = 'minicm034@gmail.com';
export const PHONE_NUMBER = '+38630368261';

export const SOCIAL_LINKS = {
    github: 'https://github.com/MilossGIT',
    linkedin: 'https://www.linkedin.com/in/milos-minic-0302b96b/',
};

export const NAV_LINKS = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    {
        name: 'Projects',
        href: '#projects',
    },
    { name: 'Contact', href: '#contact' },
] as const;

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
            'Frontend-focused engineer specializing in the development of custom widget products',
            'Utilizing JavaScript, TypeScript, React, and modern web technologies',
            'Conducting end-to-end integration of complex systems',
            'Requirements analysis and technical communication',
            'Using APIs and Git efficiently for seamless integration processes',
            'Working in an Agile Environment',
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
