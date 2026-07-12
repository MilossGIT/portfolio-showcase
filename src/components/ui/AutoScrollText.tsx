'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface AutoScrollTextProps {
    text: string
    className?: string
    textClassName?: string
}

export function AutoScrollText({
    text,
    className,
    textClassName = 'text-sm leading-relaxed text-muted-foreground',
}: AutoScrollTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [shouldScroll, setShouldScroll] = useState(false)
    const [scrollDistance, setScrollDistance] = useState(0)

    useEffect(() => {
        const container = containerRef.current
        const track = trackRef.current
        if (!container || !track) return

        const measure = () => {
            const overflow = track.scrollHeight - container.clientHeight
            const hasOverflow = overflow > 2

            setShouldScroll(hasOverflow)
            setScrollDistance(hasOverflow ? overflow : 0)
        }

        const rafId = requestAnimationFrame(measure)

        const observer = new ResizeObserver(() => {
            requestAnimationFrame(measure)
        })
        observer.observe(container)
        observer.observe(track)

        return () => {
            cancelAnimationFrame(rafId)
            observer.disconnect()
        }
    }, [text])

    const duration = Math.min(24, Math.max(10, text.length / 12))

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative w-full min-w-0 max-w-full overflow-hidden py-0.5',
                className
            )}
        >
            <div
                ref={trackRef}
                className={cn(
                    'auto-scroll-text-track motion-reduce:transform-none',
                    shouldScroll && 'is-scrolling'
                )}
                style={
                    shouldScroll
                        ? ({
                              '--scroll-distance': `-${scrollDistance}px`,
                              '--scroll-duration': `${duration}s`,
                          } as React.CSSProperties)
                        : undefined
                }
            >
                <p className={textClassName}>{text}</p>
            </div>
            {shouldScroll && (
                <>
                    <div
                        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-3 bg-gradient-to-b from-card to-transparent"
                        aria-hidden
                    />
                    <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3 bg-gradient-to-t from-card to-transparent"
                        aria-hidden
                    />
                </>
            )}
        </div>
    )
}
