'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, BookOpen } from 'lucide-react'
import { Container } from '../ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { PROJECTS } from '@/lib/constants'

interface ProjectDetails {
    title: string
    description: string
    readmeContent?: string
    isReadmeOpen?: boolean
}

export function Projects() {
    const [projectDetails, setProjectDetails] = useState<{ [key: string]: ProjectDetails }>({})

    useEffect(() => {
        const fetchReadme = async (url: string, title: string) => {
            try {
                const response = await fetch(url)
                if (response.ok) {
                    const content = await response.text()
                    setProjectDetails(prev => ({
                        ...prev,
                        [title]: {
                            ...prev[title],
                            readmeContent: content,
                            isReadmeOpen: false
                        }
                    }))
                }
            } catch (error) {
                console.error(`Error fetching README for ${title}:`, error)
            }
        }

        PROJECTS.forEach(project => {
            if (project.readmeUrl) {
                fetchReadme(project.readmeUrl, project.title)
            }
        })
    }, [])

    const toggleReadme = (title: string) => {
        setProjectDetails(prev => ({
            ...prev,
            [title]: {
                ...prev[title],
                isReadmeOpen: !prev[title]?.isReadmeOpen
            }
        }))
    }

    return (
        <section id="projects" className="py-24 sm:py-32">
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
                        {PROJECTS.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full bg-white dark:bg-[#161b22] border-[#e1e4e8] dark:border-[#30363d] hover:border-[#0366d6] dark:hover:border-[#58a6ff] transition-colors">
                                    <CardHeader>
                                        <CardTitle className="text-[#24292e] dark:text-[#c9d1d9]">
                                            {project.title}
                                        </CardTitle>
                                        <CardDescription className="text-[#586069] dark:text-[#8b949e]">
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 text-xs rounded-full bg-[#f1f8ff] text-[#0366d6] dark:bg-[#1f6feb]/10 dark:text-[#58a6ff]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-4 mt-4">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#586069] hover:text-[#0366d6] dark:text-[#8b949e] dark:hover:text-[#58a6ff] transition-colors"
                                                aria-label={`View ${project.title} on GitHub`}
                                            >
                                                <Github className="h-5 w-5" />
                                            </a>
                                            {projectDetails[project.title]?.readmeContent && (
                                                <button
                                                    onClick={() => toggleReadme(project.title)}
                                                    className="text-[#586069] hover:text-[#0366d6] dark:text-[#8b949e] dark:hover:text-[#58a6ff] transition-colors flex items-center gap-2"
                                                    aria-label={`${projectDetails[project.title]?.isReadmeOpen ? 'Hide' : 'Show'} README`}
                                                >
                                                    <BookOpen className="h-5 w-5" />
                                                    {projectDetails[project.title]?.isReadmeOpen ? 'Hide' : 'View'} README
                                                </button>
                                            )}
                                        </div>

                                        {projectDetails[project.title]?.isReadmeOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-4 p-4 bg-[#f6f8fa] dark:bg-[#21262d] rounded-lg overflow-auto max-h-96"
                                            >
                                                <pre className="text-sm text-[#24292e] dark:text-[#c9d1d9] whitespace-pre-wrap">
                                                    {projectDetails[project.title]?.readmeContent}
                                                </pre>
                                            </motion.div>
                                        )}
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