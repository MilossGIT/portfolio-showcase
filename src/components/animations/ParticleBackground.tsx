'use client'

import { useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let particles: Particle[] = []
        let animationFrameId: number
        let mouseX = 0
        let mouseY = 0

        // Colors matching GitHub's theme
        const colors = [
            'rgba(3, 102, 214, 0.5)',     // GitHub blue
            'rgba(46, 164, 79, 0.5)',     // GitHub green
            'rgba(88, 166, 255, 0.5)',    // GitHub light blue
        ]

        const initParticles = () => {
            particles = []
            const particleCount = 75 // Number of particles

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 3 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)]
                })
            }
        }

        const drawParticle = (p: Particle) => {
            if (!ctx) return
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = p.color
            ctx.fill()
        }

        const drawLines = (p1: Particle, particles: Particle[]) => {
            particles.forEach((p2: Particle) => {
                const dx = p1.x - p2.x
                const dy = p1.y - p2.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Increased connection distance
                if (distance < 150) {
                    if (!ctx) return
                    ctx.beginPath()
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)

                    // Gradient line color
                    const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
                    gradient.addColorStop(0, p1.color)
                    gradient.addColorStop(1, p2.color)

                    ctx.strokeStyle = gradient
                    ctx.lineWidth = 0.5
                    ctx.stroke()
                }
            })
        }

        const animate = () => {
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach(p => {
                // Add slight mouse interaction
                const dx = mouseX - p.x
                const dy = mouseY - p.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 200) {
                    p.vx += dx * 0.00001
                    p.vy += dy * 0.00001
                }

                p.x += p.vx
                p.y += p.vy

                // Keep particles within bounds with smoother transition
                if (p.x < 0 || p.x > canvas.width) {
                    p.vx *= -0.8
                    p.x = p.x < 0 ? 0 : canvas.width
                }
                if (p.y < 0 || p.y > canvas.height) {
                    p.vy *= -0.8
                    p.y = p.y < 0 ? 0 : canvas.height
                }

                drawParticle(p)
                drawLines(p, particles)
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initParticles()
        }

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX
            mouseY = event.clientY
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        animate()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.8 }} // Increased opacity
        />
    )
}