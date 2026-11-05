'use client'

import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                forcedTheme="dark"
                enableSystem={false}
                disableTransitionOnChange
                storageKey="portfolio-theme"
            >
                {children}
            </ThemeProvider>
        </MotionConfig>
    )
}
