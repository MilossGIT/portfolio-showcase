'use client'

import { Github, Linkedin } from 'lucide-react'
import { Button } from '../ui/Button'
import { SOCIAL_LINKS } from '@/lib/constants'
import { HeroBackground } from '../animations/HeroBackground'

function scrollToSection(id: string) {
    const element = document.getElementById(id)
    if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
}

export function Hero() {
    return (
        <section className="relative z-10 flex flex-col justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 lg:min-h-screen lg:pb-24">
            <HeroBackground />

            <div className="container relative z-10 mx-auto w-full min-w-0 max-w-6xl">
                <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:text-left xl:gap-20">
                    <div className="relative order-1 shrink-0 lg:order-2">
                        <div className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80 flex items-center justify-center">
                            <div className="absolute -inset-[3px] rounded-full ring-beam opacity-80" />
                            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
                                <img
                                    src="/images/profile.jpg"
                                    alt="Miloš Minić"
                                    className="profile-photo-inner w-full h-full object-cover scale-110 translate-y-3 sm:translate-y-4"
                                    style={{ objectPosition: '50% 18%' }}
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="32" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EMM%3C/text%3E%3C/svg%3E'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="order-2 w-full min-w-0 flex-1 space-y-6 lg:order-1 max-w-2xl">
                        <div className="group touch-accent-group space-y-3.5">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Product-Minded Engineer
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                                    🤖 AI-Powered Tools &amp; Automation
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                                Miloš Minić
                            </h1>
                            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                                Building AI-powered tools, modern web applications, and streamlined digital products with TypeScript, React, Next.js, and LLM APIs.
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start pt-1">
                            <Button
                                onClick={() => scrollToSection('contact')}
                                variant="primary"
                                size="lg"
                                className="group w-full sm:w-auto"
                            >
                                Get in touch
                                <span className="inline-block ml-2 transition-transform group-hover:translate-x-0.5">
                                    →
                                </span>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => scrollToSection('projects')}
                                className="accent-hover-outline w-full hover:!bg-transparent sm:w-auto"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                View Projects
                            </Button>
                        </div>

                        <div className="flex justify-center gap-5 lg:justify-start">
                            <a
                                href={SOCIAL_LINKS.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="accent-hover-icon"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="accent-hover-icon"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
