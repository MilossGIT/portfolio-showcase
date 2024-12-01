'use client'

import { Github, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '@/lib/constants'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-[#e1e4e8] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#0d1117]">
            <div className="container mx-auto px-4 py-8 md:py-6">
                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-4 md:flex-row md:gap-8"
                    >
                        <p className="text-sm text-[#586069] dark:text-[#8b949e]">
                            © {currentYear} Miloš Minić. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href={SOCIAL_LINKS.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#24292e] dark:text-[#c9d1d9] hover:text-[#0366d6] dark:hover:text-[#58a6ff] transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#24292e] dark:text-[#c9d1d9] hover:text-[#0366d6] dark:hover:text-[#58a6ff] transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm text-[#586069] dark:text-[#8b949e]"
                    >
                        <a
                            href="mailto:minicm034@gmail.com"
                            className="hover:text-[#0366d6] dark:hover:text-[#58a6ff] transition-colors"
                        >
                            minicm034@gmail.com
                        </a>
                    </motion.div>
                </div>
            </div>
        </footer>
    )
}