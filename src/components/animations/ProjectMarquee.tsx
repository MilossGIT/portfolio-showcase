'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ProjectCard } from './ProjectCard'
import { GitHubProject } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectMarqueeProps {
    projects: GitHubProject[]
}

const MIN_MARQUEE_ITEMS = 6
const MOBILE_SIDE_SPACER = 'shrink-0 w-[calc(50%-9rem)]'

export function ProjectMarquee({ projects }: ProjectMarqueeProps) {
    const scrollerRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())
    const [reducedMotion, setReducedMotion] = useState(false)
    const [hoverCount, setHoverCount] = useState(0)
    const [activeCard, setActiveCard] = useState<string | null>(null)
    const isPaused = hoverCount > 0

    const handleHoverChange = (hovered: boolean) => {
        setHoverCount((count) => (hovered ? count + 1 : Math.max(0, count - 1)))
    }

    const setCardRef = useCallback((name: string, el: HTMLDivElement | null) => {
        if (el) {
            cardRefs.current.set(name, el)
        } else {
            cardRefs.current.delete(name)
        }
    }, [])

    const centerCard = useCallback((name: string) => {
        const card = cardRefs.current.get(name)
        const scroller = scrollerRef.current
        if (!card || !scroller) return

        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const targetScroll = cardCenter - scroller.clientWidth / 2
        scroller.scrollTo({ left: targetScroll, behavior: 'smooth' })
    }, [])

    const handleActivate = useCallback(
        (name: string) => {
            setActiveCard(name)
            centerCard(name)
        },
        [centerCard]
    )

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    const marqueeProjects = projects.filter((project) => !project.featured)
    const displayProjects =
        marqueeProjects.length > 0 ? marqueeProjects : projects

    if (displayProjects.length === 0) return null

    if (reducedMotion || displayProjects.length < MIN_MARQUEE_ITEMS) {
        return (
            <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
                {displayProjects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </div>
        )
    }

    const row = [...displayProjects, ...displayProjects]

    return (
        <>
            <div className="relative overflow-x-clip py-8 md:hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-background to-transparent" />

                <div
                    ref={scrollerRef}
                    className="no-scrollbar flex touch-accent-group snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4"
                >
                    <div aria-hidden className={MOBILE_SIDE_SPACER} />
                    {displayProjects.map((project) => (
                        <ProjectCard
                            key={`mobile-${project.name}`}
                            ref={(el) => setCardRef(project.name, el)}
                            project={project}
                            variant="compact"
                            isActive={activeCard === project.name}
                            onActivate={() => handleActivate(project.name)}
                        />
                    ))}
                    <div aria-hidden className={MOBILE_SIDE_SPACER} />
                </div>
            </div>

            <div className="relative hidden overflow-x-clip py-8 sm:py-10 md:block">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

                <div
                    className={cn(
                        'flex w-max items-center gap-6 px-4 animate-marquee',
                        isPaused && '[animation-play-state:paused]'
                    )}
                >
                    {row.map((project, i) => (
                        <ProjectCard
                            key={`marquee-${project.name}-${i}`}
                            project={project}
                            variant="compact"
                            onHoverChange={handleHoverChange}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
