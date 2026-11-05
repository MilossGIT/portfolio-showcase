'use client'

import { useEffect, useRef } from 'react'
import { ClientOnly } from '@/components/ui/ClientOnly'
import { StarfieldWarp } from './StarfieldWarp'

function HeroLightFade({ children }: { children: React.ReactNode }) {
    const layerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const layer = layerRef.current
        if (!layer) return

        const supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()')
        if (supportsScrollTimeline) return

        let frame = 0

        const updateOpacity = () => {
            frame = 0
            const progress = Math.min(1, window.scrollY / window.innerHeight)
            const opacity =
                progress <= 0.5
                    ? 1 - (1 - 0.35) * (progress / 0.5)
                    : 0.35 - 0.35 * ((progress - 0.5) / 0.5)
            layer.style.opacity = String(opacity)
        }

        const onScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(updateOpacity)
        }

        updateOpacity()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (frame) window.cancelAnimationFrame(frame)
        }
    }, [])

    return (
        <div
            ref={layerRef}
            className="pointer-events-none fixed inset-x-0 top-0 z-0 h-screen overflow-hidden hero-scroll-fade"
            aria-hidden
        >
            {children}
        </div>
    )
}

export function HeroBackground() {
    return (
        <HeroLightFade>
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
                <div className="hero-radial-glow" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80" />

                <ClientOnly>
                    <StarfieldWarp />
                </ClientOnly>

                <div className="hero-noise absolute inset-0 opacity-[0.01] dark:opacity-[0.02]" />
            </div>
        </HeroLightFade>
    )
}
