'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Star } from 'lucide-react'
import { GitHubProject } from '@/types'
import { cn } from '@/lib/utils'
import { ClientOnly } from '@/components/ui/ClientOnly'

interface FeaturedProjectSpotlightProps {
    projects: GitHubProject[]
    intervalMs?: number
}

function SpotlightContent({
    projects,
}: FeaturedProjectSpotlightProps) {
    const featured = projects.filter((p) => p.featured)
    const pool = featured.length > 0 ? featured : projects.slice(0, 5)

    const [currentIndex, setCurrentIndex] = useState(0)

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % pool.length)
    }, [pool.length])

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + pool.length) % pool.length)
    }, [pool.length])

    if (pool.length === 0) return null

    const current = pool[currentIndex]

    return (
        <div className="relative mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="surface-card overflow-hidden rounded-xl p-5 sm:p-8"
                >
                    <div className="mb-6 flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                Featured repository
                            </p>
                            <h3 className="break-words text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                {current.name}
                            </h3>
                            {current.language && (
                                <span className="mt-2 inline-block text-sm text-muted-foreground">
                                    {current.language}
                                </span>
                            )}
                        </div>
                        <Github className="h-5 w-5 shrink-0 text-muted-foreground" />
                    </div>

                    <p className="mb-6 text-muted-foreground leading-relaxed">
                        {current.description ?? 'An open-source project from my GitHub.'}
                    </p>

                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        {current.stars > 0 && (
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Star className="h-4 w-4" />
                                {current.stars} stars
                            </span>
                        )}
                        {current.topics.slice(0, 5).map((topic) => (
                            <span
                                key={topic}
                                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href={current.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            <Github className="h-4 w-4" />
                            View on GitHub
                        </a>
                        {current.homepage && (
                            <a
                                href={current.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {pool.length > 1 && (
                <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                        onClick={goPrev}
                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Previous project"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex gap-2">
                        {pool.map((project, index) => (
                            <button
                                key={project.name}
                                onClick={() => setCurrentIndex(index)}
                                className={cn(
                                    'h-1.5 rounded-full transition-all duration-300',
                                    index === currentIndex
                                        ? 'w-6 bg-foreground'
                                        : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                )}
                                aria-label={`Go to ${project.name}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={goNext}
                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Next project"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    )
}

function SpotlightFallback({ projects }: FeaturedProjectSpotlightProps) {
    const featured = projects.filter((p) => p.featured)
    const current = featured.length > 0 ? featured[0] : projects[0]
    if (!current) return null

    return (
        <div className="relative mx-auto max-w-3xl">
            <div className="surface-card overflow-hidden rounded-xl p-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Featured repository
                </p>
                <h3 className="break-words text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {current.name}
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                    {current.description ?? 'An open-source project from my GitHub.'}
                </p>
            </div>
        </div>
    )
}

export function FeaturedProjectSpotlight(props: FeaturedProjectSpotlightProps) {
    return (
        <ClientOnly fallback={<SpotlightFallback {...props} />}>
            <SpotlightContent {...props} />
        </ClientOnly>
    )
}
