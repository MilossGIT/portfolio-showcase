'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ProjectCard } from './ProjectCard'
import { GitHubProject } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectMarqueeProps {
    projects: GitHubProject[]
}

const MIN_MARQUEE_ITEMS = 6
const MOBILE_CARD_HALF = '10rem'
const MOBILE_SIDE_SPACER = `shrink-0 w-[calc(50%-${MOBILE_CARD_HALF})]`
const SCROLL_SETTLE_MS = 180

export function ProjectMarquee({ projects }: ProjectMarqueeProps) {
    const scrollerRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())
    const scrollLockRef = useRef(false)
    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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

    const marqueeProjects = projects.filter((project) => !project.featured)
    const displayProjects =
        marqueeProjects.length > 0 ? marqueeProjects : projects

    const syncActiveToCenter = useCallback(() => {
        const scroller = scrollerRef.current
        if (!scroller) return

        const center = scroller.scrollLeft + scroller.clientWidth / 2
        let closestName: string | null = null
        let closestDistance = Number.POSITIVE_INFINITY

        for (const project of displayProjects) {
            const card = cardRefs.current.get(project.name)
            if (!card) continue

            const cardCenter = card.offsetLeft + card.offsetWidth / 2
            const distance = Math.abs(cardCenter - center)

            if (distance < closestDistance) {
                closestDistance = distance
                closestName = project.name
            }
        }

        if (closestName) {
            setActiveCard(closestName)
        }
    }, [displayProjects])

    const releaseScrollLock = useCallback(() => {
        scrollLockRef.current = false
        syncActiveToCenter()
    }, [syncActiveToCenter])

    const centerCard = useCallback((name: string) => {
        const card = cardRefs.current.get(name)
        const scroller = scrollerRef.current
        if (!card || !scroller) return

        scrollLockRef.current = true
        card.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        })
    }, [])

    const handleActivate = useCallback(
        (name: string) => {
            if (scrollLockRef.current && activeCard === name) return

            setActiveCard(name)
            centerCard(name)
        },
        [activeCard, centerCard]
    )

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    useEffect(() => {
        const scroller = scrollerRef.current
        if (!scroller) return

        const handleScrollSettled = () => {
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current)
            }
            scrollTimerRef.current = setTimeout(releaseScrollLock, SCROLL_SETTLE_MS)
        }

        const handleScrollEnd = () => {
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current)
                scrollTimerRef.current = null
            }
            releaseScrollLock()
        }

        scroller.addEventListener('scroll', handleScrollSettled, { passive: true })
        scroller.addEventListener('scrollend', handleScrollEnd)

        return () => {
            scroller.removeEventListener('scroll', handleScrollSettled)
            scroller.removeEventListener('scrollend', handleScrollEnd)
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current)
            }
        }
    }, [releaseScrollLock, displayProjects.length])

    useEffect(() => {
        if (displayProjects.length === 0) return
        if (activeCard) return

        const first = displayProjects[0]?.name
        if (first) {
            setActiveCard(first)
        }
    }, [activeCard, displayProjects])

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
            <div className="relative overflow-x-clip overflow-y-visible py-10 md:hidden">
                <div className="pointer-events-none absolute inset-y-4 left-0 z-20 w-12 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-4 right-0 z-20 w-12 bg-gradient-to-l from-background to-transparent" />

                <div
                    ref={scrollerRef}
                    className="no-scrollbar flex touch-accent-group snap-x snap-proximity items-center gap-6 overflow-x-auto overflow-y-visible scroll-smooth px-4 py-6"
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
