'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { CarouselProjectTile } from './CarouselProjectTile'
import { GitHubProject } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectPaginatedGridProps {
    projects: GitHubProject[]
}

const SCROLL_SETTLE_MS = 120
const PAGE_SIZE = 6

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
    const pages = useMemo(
        () => chunkProjects(items, PAGE_SIZE),
        [items]
    )
    const scrollerRef = useRef<HTMLDivElement>(null)
    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [page, setPage] = useState(0)
    const [showAllMobile, setShowAllMobile] = useState(false)

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
                            key={`page-${pageIndex}`}
                            className="w-full shrink-0 snap-start"
                            inert={pageIndex !== page ? true : undefined}
                        >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-7">
                                {pageItems.map((project, itemIndex) => (
                                    <div
                                        key={project.name}
                                        className={cn(
                                            'min-w-0',
                                            itemIndex >= 3 && !showAllMobile && 'hidden sm:block'
                                        )}
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

            {items.length > 3 && (
                <div className="mt-6 flex justify-center sm:hidden">
                    <button
                        type="button"
                        onClick={() => setShowAllMobile((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-expanded={showAllMobile}
                    >
                        <span>{showAllMobile ? 'Show fewer projects' : `Show all projects (${items.length})`}</span>
                        <ChevronDown
                            className={cn(
                                'h-3.5 w-3.5 transition-transform duration-200',
                                showAllMobile && 'rotate-180'
                            )}
                            aria-hidden="true"
                        />
                    </button>
                </div>
            )}
        </div>
    )
}
