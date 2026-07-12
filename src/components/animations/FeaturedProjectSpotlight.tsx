'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Star } from 'lucide-react'
import { GitHubProject } from '@/types'
import { ClientOnly } from '@/components/ui/ClientOnly'
import { AutoScrollText } from '@/components/ui/AutoScrollText'
import { cn } from '@/lib/utils'

interface FeaturedProjectSpotlightProps {
    projects: GitHubProject[]
    intervalMs?: number
}

const SPOTLIGHT_POOL_SIZE = 10

function buildSpotlightPool(projects: GitHubProject[]): GitHubProject[] {
    if (projects.length === 0) return []

    const featured = projects.filter((p) => p.featured)
    const rest = projects.filter((p) => !p.featured)

    if (featured.length > 0) {
        const merged = [...featured, ...rest]
        const unique = merged.filter(
            (project, index, list) =>
                list.findIndex((p) => p.name === project.name) === index
        )
        return unique.slice(0, SPOTLIGHT_POOL_SIZE)
    }

    return projects.slice(0, SPOTLIGHT_POOL_SIZE)
}

const spotlightCardClass = 'surface-card rounded-xl'

function SpotlightSlideContent({ project }: { project: GitHubProject }) {
    return (
        <div className="spotlight-slide-panel flex flex-col">
            <div className="relative mb-5 shrink-0 sm:mb-6">
                <Github className="absolute right-0 top-0 h-5 w-5 shrink-0 text-muted-foreground" />
                <div className="min-w-0 pr-8">
                    <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                        Featured repository
                    </p>
                    <h3 className="break-words text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                        {project.name}
                    </h3>
                    {project.language && (
                        <span className="mt-2 inline-block text-sm text-muted-foreground">
                            {project.language}
                        </span>
                    )}
                </div>
            </div>

            <AutoScrollText
                text={project.description ?? 'An open-source project from my GitHub.'}
                className="mb-5 min-h-[5.5rem] shrink-0 sm:mb-6 sm:min-h-[6rem]"
            />

            <div className="mb-5 flex min-h-8 shrink-0 flex-wrap items-center gap-2 sm:mb-6 sm:gap-3">
                {project.stars > 0 && (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        {project.stars} stars
                    </span>
                )}
                {project.topics.slice(0, 5).map((topic) => (
                    <span
                        key={topic}
                        className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                        {topic}
                    </span>
                ))}
            </div>

            <div className="mt-auto flex shrink-0 flex-wrap items-center gap-3 pt-1 sm:gap-4">
                <a
                    href={project.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                    <Github className="h-4 w-4" />
                    View on GitHub
                </a>
                {project.homepage ? (
                    <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="accent-hover-text group/live inline-flex items-center gap-2 text-sm text-muted-foreground"
                    >
                        <ExternalLink className="h-4 w-4 transition-all duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5 group-active/live:-translate-y-0.5 group-active/live:translate-x-0.5" />
                        Live Demo
                    </a>
                ) : (
                    <span className="invisible text-sm" aria-hidden>
                        Live
                    </span>
                )}
            </div>
        </div>
    )
}

function SpotlightContent({
    projects,
}: FeaturedProjectSpotlightProps) {
    const pool = buildSpotlightPool(projects)
    const scrollerRef = useRef<HTMLDivElement>(null)
    const scrollRafRef = useRef<number>(0)
    const [currentIndex, setCurrentIndex] = useState(0)

    const syncIndexFromScroll = useCallback(() => {
        const scroller = scrollerRef.current
        if (!scroller || scroller.clientWidth === 0) return

        const index = Math.round(scroller.scrollLeft / scroller.clientWidth)
        setCurrentIndex(Math.max(0, Math.min(pool.length - 1, index)))
    }, [pool.length])

    const scrollToIndex = useCallback(
        (index: number) => {
            const scroller = scrollerRef.current
            if (!scroller) return

            const clamped = Math.max(0, Math.min(pool.length - 1, index))
            scroller.scrollTo({
                left: scroller.clientWidth * clamped,
                behavior: 'smooth',
            })
        },
        [pool.length]
    )

    const goNext = useCallback(() => {
        scrollToIndex((currentIndex + 1) % pool.length)
    }, [currentIndex, pool.length, scrollToIndex])

    const goPrev = useCallback(() => {
        scrollToIndex((currentIndex - 1 + pool.length) % pool.length)
    }, [currentIndex, pool.length, scrollToIndex])

    useEffect(() => {
        const scroller = scrollerRef.current
        if (!scroller || pool.length <= 1) return

        const handleScroll = () => {
            cancelAnimationFrame(scrollRafRef.current)
            scrollRafRef.current = requestAnimationFrame(syncIndexFromScroll)
        }

        const handleScrollEnd = () => {
            cancelAnimationFrame(scrollRafRef.current)
            syncIndexFromScroll()
        }

        scroller.addEventListener('scroll', handleScroll, { passive: true })
        scroller.addEventListener('scrollend', handleScrollEnd)

        return () => {
            scroller.removeEventListener('scroll', handleScroll)
            scroller.removeEventListener('scrollend', handleScrollEnd)
            cancelAnimationFrame(scrollRafRef.current)
        }
    }, [pool.length, syncIndexFromScroll])

    if (pool.length === 0) return null

    if (pool.length === 1) {
        return (
            <div className="relative mx-auto max-w-3xl">
                <div className={cn(spotlightCardClass, 'p-5 sm:p-8')}>
                    <SpotlightSlideContent project={pool[0]} />
                </div>
            </div>
        )
    }

    return (
        <div className="relative mx-auto max-w-3xl">
            <div className={cn(spotlightCardClass, 'overflow-x-clip')}>
                <div
                    ref={scrollerRef}
                    className="spotlight-swipe-surface no-scrollbar flex snap-x snap-mandatory overflow-x-auto overflow-y-visible"
                >
                    {pool.map((project) => (
                        <div
                            key={project.name}
                            className="w-full shrink-0 snap-start snap-always p-5 sm:p-8"
                        >
                            <SpotlightSlideContent project={project} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={goPrev}
                    className="spotlight-nav-btn"
                    aria-label="Previous project"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex gap-2">
                    {pool.map((project, index) => (
                        <button
                            key={project.name}
                            type="button"
                            onClick={() => scrollToIndex(index)}
                            className={
                                index === currentIndex
                                    ? 'spotlight-dot-active'
                                    : 'spotlight-dot'
                            }
                            aria-label={`Go to ${project.name}`}
                            aria-current={
                                index === currentIndex ? 'true' : undefined
                            }
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={goNext}
                    className="spotlight-nav-btn"
                    aria-label="Next project"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}

function SpotlightFallback({ projects }: FeaturedProjectSpotlightProps) {
    const featured = projects.filter((p) => p.featured)
    const current = featured.length > 0 ? featured[0] : projects[0]
    if (!current) return null

    return (
        <div className="relative mx-auto max-w-3xl">
            <div className={cn(spotlightCardClass, 'p-5 sm:p-8')}>
                <SpotlightSlideContent project={current} />
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
