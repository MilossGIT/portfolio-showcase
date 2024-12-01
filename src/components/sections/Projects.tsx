'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Container } from '../ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'

interface Project {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    github?: string;
    link?: string;
}

const PROJECTS: Project[] = [
    {
        title: 'Vintify',
        description: 'A full-stack e-commerce web application designed to connect sellers with customers interested in purchasing second-hand pieces.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express'],
        github: 'https://github.com/MilossGIT/Vintify',
    },
    {
        title: 'Custom Widget Development',
        description: 'Frontend development of custom widget products at Sportradar, focusing on user experience and performance.',
        tags: ['TypeScript', 'JavaScript', 'CSS', 'API Integration'],
    },
    {
        title: 'Payment Processing System',
        description: 'Developed secure and user-friendly payment forms with robust validation at CCBill.',
        tags: ['Frontend Development', 'Payment Systems', 'Security'],
    },
]

export function Projects() {
    return (
        <section id="projects" className="py-24 sm:py-32 bg-[#ffffff] dark:bg-[#0d1117]">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-[#24292e] dark:text-[#c9d1d9] text-center mb-16">
                        Featured Projects
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {PROJECTS.map((project: Project, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full bg-white dark:bg-[#161b22] border-[#e1e4e8] dark:border-[#30363d] hover:border-[#0366d6] dark:hover:border-[#58a6ff] transition-colors">
                                    <CardHeader>
                                        <CardTitle className="text-[#24292e] dark:text-[#c9d1d9]">{project.title}</CardTitle>
                                        <CardDescription className="text-[#586069] dark:text-[#8b949e]">
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 text-xs rounded-full bg-[#f1f8ff] text-[#0366d6] dark:bg-[#1f6feb]/10 dark:text-[#58a6ff]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-4">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#586069] hover:text-[#0366d6] dark:text-[#8b949e] dark:hover:text-[#58a6ff] transition-colors"
                                                    aria-label={`View ${project.title} on GitHub`}
                                                >
                                                    <Github className="h-5 w-5" />
                                                </a>
                                            )}
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#586069] hover:text-[#0366d6] dark:text-[#8b949e] dark:hover:text-[#58a6ff] transition-colors"
                                                    aria-label={`Visit ${project.title} website`}
                                                >
                                                    <ExternalLink className="h-5 w-5" />
                                                </a>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}