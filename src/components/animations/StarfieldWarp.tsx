'use client'

import { useEffect, useRef } from 'react'

interface Star {
    x: number
    y: number
    z: number
}

export function StarfieldWarp() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animId: number
        let isVisible = true
        let W = 0
        let H = 0
        const DPR = Math.min(window.devicePixelRatio || 1, 2)
        const speed = 0.75
        const intensity = 1.35

        const mouse = {
            x: 0,
            y: 0,
            sx: 0,
            sy: 0,
            moved: false,
        }

        const isSmallScreen = window.innerWidth < 768
        // Cap stars to <150 on mobile, 240 on desktop
        const starCount = isSmallScreen ? 110 : 240
        const stars: Star[] = []
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
                z: Math.random() * 0.9 + 0.1,
            })
        }

        const handleResize = () => {
            const rect = canvas.getBoundingClientRect()
            W = rect.width
            H = rect.height
            canvas.width = W * DPR
            canvas.height = H * DPR
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
            if (!mouse.moved) {
                mouse.x = mouse.sx = W / 2
                mouse.y = mouse.sy = H / 2
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
            mouse.moved = true
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const render = () => {
            if (!isVisible) return

            // Smooth cursor easing for gentle parallax
            mouse.sx += (mouse.x - mouse.sx) * 0.06
            mouse.sy += (mouse.y - mouse.sy) * 0.06

            ctx.clearRect(0, 0, W, H)

            // Dark-mode optimized theme colors: emerald and blue
            const colEmerald = '52, 211, 153'
            const colBlue = '96, 165, 250'

            // Vanishing point leans smoothly with cursor
            const cx = W / 2 + (mouse.sx - W / 2) * 0.18
            const cy = H / 2 + (mouse.sy - H / 2) * 0.18

            for (const s of stars) {
                const prevZ = s.z
                if (!prefersReducedMotion) {
                    s.z -= 0.0035 * speed
                }

                const px = cx + (s.x / s.z) * W * 0.5
                const py = cy + (s.y / s.z) * H * 0.5

                if (s.z <= 0.02 || px < -20 || px > W + 20 || py < -20 || py > H + 20) {
                    s.x = (Math.random() - 0.5) * 2
                    s.y = (Math.random() - 0.5) * 2
                    s.z = 1
                    continue
                }

                const ox = cx + (s.x / prevZ) * W * 0.5
                const oy = cy + (s.y / prevZ) * H * 0.5

                const color = s.x > 0 ? colBlue : colEmerald
                const alpha = Math.min(1, Math.max(0.08, (1 - s.z) * 0.85 * intensity))
                const width = Math.min(2.5, Math.max(0.6, (1 - s.z) * 2))

                ctx.strokeStyle = `rgba(${color}, ${alpha})`
                ctx.lineWidth = width
                ctx.beginPath()
                ctx.moveTo(ox, oy)
                ctx.lineTo(px, py)
                ctx.stroke()
            }

            // Only schedule next frame if motion is enabled
            if (!prefersReducedMotion && isVisible) {
                animId = requestAnimationFrame(render)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        if (!prefersReducedMotion) {
            window.addEventListener('mousemove', handleMouseMove, { passive: true })
        }

        // Auto pause when off-screen
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting
            if (isVisible && !prefersReducedMotion) {
                cancelAnimationFrame(animId)
                animId = requestAnimationFrame(render)
            }
        })
        observer.observe(canvas)

        // Pause completely when tab is hidden
        const handleVisibilityChange = () => {
            isVisible = !document.hidden
            if (isVisible && !prefersReducedMotion) {
                cancelAnimationFrame(animId)
                animId = requestAnimationFrame(render)
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Render initial frame (static for reduced-motion, starting loop for normal)
        render()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            observer.disconnect()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full pointer-events-none"
            aria-hidden="true"
        />
    )
}
