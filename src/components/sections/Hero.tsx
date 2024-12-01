'use client'

import { motion } from 'framer-motion'
import { ArrowDownIcon, Github, Linkedin } from 'lucide-react'
import { Button } from '../ui/Button'
import { SOCIAL_LINKS } from '@/lib/constants'
import ParticleBackground from '../animations/ParticleBackground'
import TextReveal from '../animations/TextReveal'

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center">
            <ParticleBackground />

            <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text content */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <TextReveal
                                    text="Hi, I'm"
                                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#24292e] dark:text-[#c9d1d9]"
                                />
                                <TextReveal
                                    text="Miloš Minić"
                                    delay={0.3}
                                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0366d6] dark:text-[#58a6ff]"
                                />
                            </div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-lg sm:text-xl text-[#586069] dark:text-[#8b949e] max-w-2xl mx-auto lg:mx-0"
                        >
                            A Software Engineer passionate about creating exceptional digital experiences
                            and solving complex challenges with modern web technologies.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <Button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                variant="primary"
                                className="group"
                            >
                                Get in touch
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="inline-block ml-2"
                                >
                                    →
                                </motion.span>
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => window.open(SOCIAL_LINKS.github, '_blank')}
                                className="group"
                            >
                                <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                View Projects
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="flex gap-4 justify-center lg:justify-start"
                        >
                            <a
                                href={SOCIAL_LINKS.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#586069] hover:text-[#0366d6] dark:text-[#8b949e] dark:hover:text-[#58a6ff] transition-colors transform hover:scale-110"
                            >
                                <Github className="h-6 w-6" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#586069] hover:text-[#0366d6] dark:text-[#8b949e] dark:hover:text-[#58a6ff] transition-colors transform hover:scale-110"
                            >
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            delay: 0.5
                        }}
                        className="relative"
                    >
                        <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0366d6] to-[#2ea44f] animate-pulse" />
                            <img
                                src="/images/profile.jpg"
                                alt="Miloš Minić"
                                className="absolute inset-1 rounded-full object-cover border-2 border-white dark:border-[#30363d]"
                                onError={(e) => {
                                    e.currentTarget.src = '/api/placeholder/400/400'
                                }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1.5,
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <a
                        href="#about"
                        className="flex flex-col items-center gap-2 text-sm text-[#586069] dark:text-[#8b949e] hover:text-[#0366d6] dark:hover:text-[#58a6ff] transition-colors"
                    >
                        Scroll down
                        <ArrowDownIcon className="h-4 w-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}