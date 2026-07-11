'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { FadeInView } from '../animations/FadeInView'

interface SectionHeaderProps {
    badge?: string
    badgeIcon?: LucideIcon
    title: string
    subtitle?: string
    className?: string
}

export function SectionHeader({
    badge,
    badgeIcon: BadgeIcon,
    title,
    subtitle,
    className,
}: SectionHeaderProps) {
    return (
        <FadeInView className={cn('mb-16 text-left', className)}>
            {badge && (
                <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />}
                    {badge}
                </p>
            )}
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-5 leading-tight">
                {title}
            </h2>
            {subtitle && (
                <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
            )}
        </FadeInView>
    )
}
