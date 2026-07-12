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
        <section className="relative z-10 flex flex-col justify-center pt-24 pb-20 sm:pt-28 sm:pb-28 md:pt-36 lg:min-h-screen lg:pb-36">
            <HeroBackground />

            <div className="container relative z-10 mx-auto w-full min-w-0 max-w-6xl">
                <div className="flex flex-col items-center gap-8 text-center sm:gap-10 lg:flex-row lg:items-center lg:gap-20 lg:text-left xl:gap-24">
                    <div className="relative order-1 shrink-0 lg:order-2">
                        <div className="touch-accent-group relative h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-72 xl:w-72">
                            <img
                                src="/images/profile.jpg"
                                alt="Miloš Minić"
                                className="profile-photo"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="32" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EMM%3C/text%3E%3C/svg%3E'
                                }}
                            />
                        </div>
                    </div>

                    <div className="order-2 w-full min-w-0 flex-1 space-y-6 sm:space-y-8 lg:order-1">
                        <div className="group touch-accent-group space-y-3 sm:space-y-4">
                            <p className="accent-text-hover text-xs uppercase tracking-widest text-muted-foreground sm:text-sm">
                                Software Engineer
                            </p>
                            <h1 className="text-4xl font-semibold tracking-tight text-foreground leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                                Miloš Minić
                            </h1>
                            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 lg:text-xl">
                                Shipping production-grade digital products at scale — from
                                complex integrations to polished experiences people rely on
                                every day.
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
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
