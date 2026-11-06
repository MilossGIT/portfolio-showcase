'use client'

import { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FadeInViewProps {
    children: React.ReactNode
    className?: string
    delay?: number
    y?: number
    duration?: number
}

export function FadeInView({
    children,
    className,
    delay = 0,
    y = 20,
    duration = 0.45,
}: FadeInViewProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Server-rendered and pre-hydration: fully visible (opacity: 1), zero flash, zero LCP delay
    if (!mounted) {
        return <div className={cn('w-full', className)}>{children}</div>
    }

    return (
        <m.div
            className={cn('w-full', className)}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </m.div>
    )
}
