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
        <section className="relative z-10 min-h-screen pt-28 md:pt-36 pb-20 flex flex-col justify-center">
            <HeroBackground />

            <div className="container px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
                <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
                    <div className="flex-1 space-y-8 text-left">
                        <div className="space-y-4">
                            <p className="text-sm uppercase tracking-widest text-muted-foreground">
                                Software Engineer
                            </p>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-foreground leading-[1.05]">
                                Miloš Minić
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed mt-2">
                                Shipping production-grade digital products at scale — from
                                complex integrations to polished experiences people rely on
                                every day.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={() => scrollToSection('contact')}
                                variant="primary"
                                size="lg"
                                className="group"
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
                            >
                                <Github className="mr-2 h-4 w-4" />
                                View Projects
                            </Button>
                        </div>

                        <div className="flex gap-5 pt-2">
                            <a
                                href={SOCIAL_LINKS.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div className="relative shrink-0">
                        <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 relative">
                            <img
                                src="/images/profile.jpg"
                                alt="Miloš Minić"
                                className="w-full h-full rounded-full object-cover ring-1 ring-border shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="32" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EMM%3C/text%3E%3C/svg%3E'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
