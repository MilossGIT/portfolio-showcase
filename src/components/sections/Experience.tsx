'use client'

import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { EXPERIENCE } from '@/lib/constants'
import { Briefcase, ChevronRight } from 'lucide-react'

export function Experience() {
    return (
        <section
            id="experience"
            className="relative py-24 sm:py-32 bg-[#f6f8fa] dark:bg-[#0d1117]">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-bold tracking-tight text-[#24292e] dark:text-[#c9d1d9]"
                        >
                            Work Experience
                        </motion.h2>
                    </div>

                    {/* Experience Timeline */}
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#0366d6] to-[#2ea44f] dark:from-[#58a6ff] dark:to-[#238636] hidden lg:block" />

                        <div className="space-y-8">
                            {EXPERIENCE.map((experience, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#0366d6] to-[#2ea44f] dark:from-[#58a6ff] dark:to-[#238636] opacity-75 group-hover:opacity-100 transition-opacity" />

                                        <CardHeader>
                                            <CardTitle>
                                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                                    <div className="flex items-start lg:items-center gap-4">
                                                        <div className="hidden lg:flex h-16 w-16 items-center justify-center rounded-full bg-[#f1f8ff] dark:bg-[#21262d]">
                                                            <Briefcase className="h-8 w-8 text-[#0366d6] dark:text-[#58a6ff]" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-bold text-[#24292e] dark:text-[#c9d1d9]">
                                                                {experience.title}
                                                            </h3>
                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[#0366d6] dark:text-[#58a6ff]">
                                                                <span>{experience.company}</span>
                                                                <span className="hidden sm:inline text-[#586069] dark:text-[#8b949e]">•</span>
                                                                <span className="text-[#586069] dark:text-[#8b949e]">{experience.location}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-[#586069] dark:text-[#8b949e]">
                                                        {experience.date}
                                                    </div>
                                                </div>
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent>
                                            <ul className="space-y-3 mt-4">
                                                {experience.description.map((item, itemIndex) => (
                                                    <motion.li
                                                        key={itemIndex}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 * itemIndex }}
                                                        viewport={{ once: true }}
                                                        className="flex items-start gap-3 group"
                                                    >
                                                        <ChevronRight className="h-5 w-5 mt-0.5 text-[#0366d6] dark:text-[#58a6ff] group-hover:translate-x-1 transition-transform" />
                                                        <span className="text-[#586069] dark:text-[#8b949e] group-hover:text-[#24292e] dark:group-hover:text-[#c9d1d9] transition-colors">
                                                            {item}
                                                        </span>
                                                    </motion.li>
                                                ))}
                                            </ul>

                                            <div className="flex flex-wrap gap-2 mt-6">
                                                {experience.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#f1f8ff] text-[#0366d6] dark:bg-[#1f6feb]/10 dark:text-[#58a6ff] hover:bg-[#0366d6]/10 dark:hover:bg-[#1f6feb]/20 transition-colors"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}