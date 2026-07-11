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
        <FadeInView className={cn('mb-10 text-left sm:mb-16', className)}>
            {badge && (
                <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground sm:mb-4">
                    {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />}
                    {badge}
                </p>
            )}
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground leading-tight sm:mb-5 sm:text-4xl lg:text-5xl">
                {title}
            </h2>
            {subtitle && (
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {subtitle}
                </p>
            )}
        </FadeInView>
    )
}
