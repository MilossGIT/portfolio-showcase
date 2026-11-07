import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import { Github, Linkedin, FileText } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'
import { HeroBackground } from '../animations/HeroBackground'

export function Hero() {
    const hasCv = fs.existsSync(path.join(process.cwd(), 'public/cv.pdf'))

    return (
        <section
            aria-label="Introduction"
            className="relative z-10 flex flex-col justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 lg:min-h-screen lg:pb-24"
        >
            <HeroBackground />

            <div className="container relative z-10 mx-auto w-full min-w-0 max-w-6xl">
                <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:text-left xl:gap-20">
                    <div className="relative order-1 shrink-0 lg:order-2">
                        <div className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80 flex items-center justify-center">
                            <div className="absolute -inset-[3px] rounded-full ring-beam opacity-80" />
                            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
                                <Image
                                    src="/images/profile.jpg"
                                    alt="Miloš Minić - Product Engineer"
                                    width={400}
                                    height={400}
                                    priority
                                    sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 288px"
                                    className="profile-photo-inner w-full h-full object-cover scale-110 translate-y-3 sm:translate-y-4"
                                    style={{ objectPosition: '50% 18%' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="order-2 w-full min-w-0 flex-1 space-y-6 lg:order-1 max-w-2xl">
                        <div className="group touch-accent-group space-y-3.5">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                                    Product Engineer
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                                    AI-Powered Tools &amp; Automation
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
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-lg font-medium transition-all h-11 px-5 text-sm sm:px-8 sm:text-base bg-primary text-primary-foreground hover:opacity-90 shadow-sm group w-full sm:w-auto"
                            >
                                Get in touch
                                <span className="inline-block ml-2 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                                    →
                                </span>
                            </a>

                            <a
                                href="#projects"
                                className="accent-hover-outline inline-flex items-center justify-center rounded-lg font-medium transition-all h-11 px-5 text-sm sm:px-8 sm:text-base border border-border bg-transparent hover:!bg-transparent text-foreground w-full sm:w-auto"
                            >
                                <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                                View Projects
                            </a>

                            {hasCv && (
                                <a
                                    href="/cv.pdf"
                                    download
                                    className="accent-hover-outline inline-flex items-center justify-center rounded-lg font-medium transition-all h-11 px-5 text-sm sm:px-8 sm:text-base border border-border bg-transparent hover:!bg-transparent text-foreground w-full sm:w-auto"
                                    aria-label="Download CV"
                                >
                                    <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                                    Download CV
                                </a>
                            )}
                        </div>

                        <div className="flex justify-center gap-5 lg:justify-start">
                            <a
                                href={SOCIAL_LINKS.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="accent-hover-icon"
                                aria-label="GitHub profile"
                            >
                                <Github className="h-5 w-5" aria-hidden="true" />
                            </a>
                            <a
                                href={SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="accent-hover-icon"
                                aria-label="LinkedIn profile"
                            >
                                <Linkedin className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
