'use client'

import { motion } from 'framer-motion'
import { SKILLS, EDUCATION } from '@/lib/constants'
import { Container } from '../ui/Container'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Code, GraduationCap, Briefcase, Languages } from 'lucide-react'

export function About() {
    return (
        <section
            id="about"
            className="relative py-24 sm:py-32 bg-gradient-to-br from-[#ffffff] to-[#f6f8fa] dark:from-[#0d1117] dark:to-[#161b22]">
            <div className="absolute inset-0 dark:bg-grid-white/5 bg-grid-black/5" />
            <Container className="relative z-10">
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
                            className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#2188ff] to-[#0366d6]"
                        >
                            About Me
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 text-lg text-[#24292e] dark:text-[#c9d1d9] max-w-3xl mx-auto"
                        >
                            As a Software Engineer with a passion for crafting exceptional web experiences, I thrive on building innovative solutions that bridge creativity and functionality. My expertise lies in modern web technologies, particularly React, TypeScript, and Next.js, where I combine technical precision with an eye for seamless user experiences.

                            I specialize in translating complex requirements into elegant code while maintaining a strong focus on performance and scalability. Whether it's developing responsive interfaces, optimizing application performance, or implementing complex integrations, I approach each challenge with a blend of analytical thinking and creative problem-solving.                        </motion.p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Skills Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="h-full bg-white/50 dark:bg-[#161b22]/50 backdrop-blur-sm border border-[#e1e4e8] dark:border-[#30363d]">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Code className="h-6 w-6 text-[#0366d6] dark:text-[#58a6ff]" />
                                        Skills & Technologies
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        {SKILLS.map((skill, index) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    delay: 0.1 * index,
                                                    type: "spring",
                                                    stiffness: 100
                                                }}
                                                viewport={{ once: true }}
                                                className="relative group"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#f1f8ff]/50 to-[#e1e4e8]/50 dark:from-[#1f6feb]/20 dark:to-[#238636]/20 rounded-lg -m-1 group-hover:from-[#f1f8ff] group-hover:to-[#e1e4e8] dark:group-hover:from-[#1f6feb]/30 dark:group-hover:to-[#238636]/30 transition-all duration-300" />
                                                <div className="relative flex items-center p-3 rounded-lg">
                                                    <div className="h-2 w-2 rounded-full bg-[#0366d6] dark:bg-[#58a6ff] mr-3" />
                                                    <span className="text-[#24292e] dark:text-[#c9d1d9]">{skill}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Education Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="h-full bg-white/50 dark:bg-[#161b22]/50 backdrop-blur-sm border border-[#e1e4e8] dark:border-[#30363d]">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <GraduationCap className="h-6 w-6 text-[#0366d6] dark:text-[#58a6ff]" />
                                        Education & Certifications
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {EDUCATION.map((edu, index) => (
                                        <motion.div
                                            key={edu.school}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 * index }}
                                            viewport={{ once: true }}
                                            className="relative group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#f1f8ff]/50 to-[#e1e4e8]/50 dark:from-[#1f6feb]/20 dark:to-[#238636]/20 rounded-lg -m-1 group-hover:from-[#f1f8ff] group-hover:to-[#e1e4e8] dark:group-hover:from-[#1f6feb]/30 dark:group-hover:to-[#238636]/30 transition-all duration-300" />
                                            <div className="relative p-4 rounded-lg">
                                                <h3 className="font-semibold text-[#24292e] dark:text-[#c9d1d9]">
                                                    {edu.school}
                                                </h3>
                                                <p className="text-[#0366d6] dark:text-[#58a6ff]">{edu.degree}</p>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-[#586069] dark:text-[#8b949e]">
                                                    <span>{edu.location}</span>
                                                    <span>•</span>
                                                    <span>{edu.date}</span>
                                                </div>
                                                {edu.description && (
                                                    <p className="mt-2 text-[#24292e] dark:text-[#c9d1d9]">{edu.description}</p>
                                                )}
                                                {edu.project && (
                                                    <div className="mt-3 p-3 bg-[#f6f8fa] dark:bg-[#21262d] rounded-lg">
                                                        <p className="font-medium text-[#0366d6] dark:text-[#58a6ff]">
                                                            Final Project: {edu.project.name}
                                                        </p>
                                                        <p className="mt-1 text-sm text-[#586069] dark:text-[#8b949e]">
                                                            {edu.project.description}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}