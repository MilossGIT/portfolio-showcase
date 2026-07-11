'use client'

import { motion } from 'framer-motion'
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
    y = 24,
    duration = 0.55,
}: FadeInViewProps) {
    return (
        <motion.div
            className={cn('w-full', className)}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}
