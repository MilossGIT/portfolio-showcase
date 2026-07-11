'use client'

import { Github, Linkedin } from 'lucide-react'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/lib/constants'
import { FadeInView } from '../animations/FadeInView'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-border">
            <FadeInView y={12} duration={0.45}>
                <div className="container mx-auto w-full min-w-0 max-w-6xl px-4 py-8">
                    <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
                        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                            <p className="text-sm text-muted-foreground">
                                © {currentYear} Miloš Minić. All rights reserved.
                            </p>
                            <div className="flex items-center gap-4">
                                <a
                                    href={SOCIAL_LINKS.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-4 w-4" />
                                </a>
                                <a
                                    href={SOCIAL_LINKS.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="break-all text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {CONTACT_EMAIL}
                        </a>
                    </div>
                </div>
            </FadeInView>
        </footer>
    )
}
