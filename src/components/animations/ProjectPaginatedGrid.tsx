'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CarouselProjectTile } from './CarouselProjectTile'
import { GitHubProject } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectPaginatedGridProps {
    projects: GitHubProject[]
}

const SCROLL_SETTLE_MS = 120

type GridBreakpoint = 'mobile' | 'tablet' | 'desktop'

interface GridConfig {
    breakpoint: GridBreakpoint
    pageSize: number
}

function getGridConfig(width: number): GridConfig {
    if (width >= 768) {
        return { breakpoint: 'desktop', pageSize: 6 }
    }
    if (width >= 640) {
        return { breakpoint: 'tablet', pageSize: 4 }
    }
    return { breakpoint: 'mobile', pageSize: 3 }
}

function useGridConfig(): GridConfig {
    const [config, setConfig] = useState<GridConfig>(() =>
        typeof window !== 'undefined'
            ? getGridConfig(window.innerWidth)
            : { breakpoint: 'desktop', pageSize: 6 }
    )

    useEffect(() => {
        const update = () => setConfig(getGridConfig(window.innerWidth))
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    return config
}

function getDisplayProjects(projects: GitHubProject[]): GitHubProject[] {
    const nonFeatured = projects.filter((p) => !p.featured)
    return nonFeatured.length > 0 ? nonFeatured : projects
}

function chunkProjects(
    projects: GitHubProject[],
    pageSize: number
): GitHubProject[][] {
    const pages: GitHubProject[][] = []
    for (let i = 0; i < projects.length; i += pageSize) {
        pages.push(projects.slice(i, i + pageSize))
    }
    return pages
}

export function ProjectPaginatedGrid({ projects }: ProjectPaginatedGridProps) {
    const items = getDisplayProjects(projects)
    const { pageSize, breakpoint } = useGridConfig()
    const pages = useMemo(
        () => chunkProjects(items, pageSize),
        [items, pageSize]
    )
    const scrollerRef = useRef<HTMLDivElement>(null)
    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [page, setPage] = useState(0)

    const totalPages = pages.length
    const showNav = totalPages > 1

    const syncPageFromScroll = useCallback(() => {
        const scroller = scrollerRef.current
        if (!scroller || scroller.clientWidth === 0) return

        const index = Math.round(scroller.scrollLeft / scroller.clientWidth)
        setPage(Math.max(0, Math.min(totalPages - 1, index)))
    }, [totalPages])

    const scrollToPage = useCallback(
        (index: number) => {
            const scroller = scrollerRef.current
            if (!scroller) return

            const clamped = Math.max(0, Math.min(totalPages - 1, index))
            scroller.scrollTo({
                left: scroller.clientWidth * clamped,
                behavior: 'smooth',
            })
            setPage(clamped)
        },
        [totalPages]
    )

    const goPrev = useCallback(() => {
        scrollToPage(page - 1)
    }, [page, scrollToPage])

    const goNext = useCallback(() => {
        scrollToPage(page + 1)
    }, [page, scrollToPage])

    useEffect(() => {
        setPage(0)
        scrollerRef.current?.scrollTo({ left: 0, behavior: 'instant' })
    }, [pageSize])

    useEffect(() => {
        const scroller = scrollerRef.current
        if (!scroller) return

        const handleScroll = () => {
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current)
            }
            scrollTimerRef.current = setTimeout(
                syncPageFromScroll,
                SCROLL_SETTLE_MS
            )
        }

        const handleScrollEnd = () => {
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current)
                scrollTimerRef.current = null
            }
            syncPageFromScroll()
        }

        scroller.addEventListener('scroll', handleScroll, { passive: true })
        scroller.addEventListener('scrollend', handleScrollEnd)

        return () => {
            scroller.removeEventListener('scroll', handleScroll)
            scroller.removeEventListener('scrollend', handleScrollEnd)
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current)
            }
        }
    }, [syncPageFromScroll, totalPages])

    useEffect(() => {
        setPage((p) => Math.min(p, Math.max(0, totalPages - 1)))
    }, [totalPages])

    if (items.length === 0) return null

    return (
        <div className="mx-auto max-w-6xl px-2 sm:px-4">
            <div
                className={cn(
                    showNav && 'flex items-center gap-2 sm:gap-3 md:gap-4'
                )}
            >
                {showNav && (
                    <button
                        type="button"
                        onClick={goPrev}
                        disabled={page === 0}
                        className="project-strip-nav shrink-0"
                        aria-label="Previous projects"
                    >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                )}

                <div
                    ref={scrollerRef}
                    className={cn(
                        'project-swipe-track no-scrollbar min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth',
                        showNav && 'flex'
                    )}
                >
                    {pages.map((pageItems, pageIndex) => (
                        <div
                            key={`${breakpoint}-page-${pageIndex}`}
                            className="w-full shrink-0 snap-start"
                            aria-hidden={pageIndex !== page}
                        >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-7">
                                {pageItems.map((project) => (
                                    <div
                                        key={project.name}
                                        className="min-w-0"
                                    >
                                        <CarouselProjectTile project={project} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {showNav && (
                    <button
                        type="button"
                        onClick={goNext}
                        disabled={page >= totalPages - 1}
                        className="project-strip-nav shrink-0"
                        aria-label="Next projects"
                    >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                )}
            </div>
        </div>
    )
}
