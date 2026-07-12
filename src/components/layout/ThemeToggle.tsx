'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

const trackClass =
    'accent-hover-outline flex h-8 w-14 shrink-0 items-center rounded-full border border-border bg-muted p-1 transition-all duration-300 hover:!bg-muted'

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = resolvedTheme === 'dark'

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark')
    }

    if (!mounted) {
        return <div className={trackClass} aria-hidden />
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={trackClass}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <span
                className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                    'bg-foreground text-background shadow-sm',
                    'transition-all duration-200 ease-out',
                    isDark && 'ml-auto'
                )}
            >
                {isDark ? (
                    <Moon className="h-3 w-3" strokeWidth={2.5} />
                ) : (
                    <Sun className="h-3 w-3" strokeWidth={2.5} />
                )}
            </span>
        </button>
    )
}
