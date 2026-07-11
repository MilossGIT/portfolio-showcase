'use client'

import { useEffect, useState } from 'react'
import { ProjectCard } from './ProjectCard'
import { GitHubProject } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectMarqueeProps {
    projects: GitHubProject[]
}

const MIN_MARQUEE_ITEMS = 6

export function ProjectMarquee({ projects }: ProjectMarqueeProps) {
    const [reducedMotion, setReducedMotion] = useState(false)
    const [hoverCount, setHoverCount] = useState(0)
    const isPaused = hoverCount > 0

    const handleHoverChange = (hovered: boolean) => {
        setHoverCount((count) => (hovered ? count + 1 : Math.max(0, count - 1)))
    }

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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4 max-w-6xl mx-auto">
                {displayProjects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </div>
        )
    }

    const row = [...displayProjects, ...displayProjects]

    return (
        <div className="relative py-10 overflow-x-hidden overflow-y-visible">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent" />

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
    )
}
