'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative h-8 w-14 rounded-full bg-gradient-to-r from-[#f1f8ff] to-[#e1e4e8] dark:from-[#21262d] dark:to-[#30363d] p-1 transition-colors"
            aria-label="Toggle theme"
        >
            <motion.div
                className="relative h-6 w-6 rounded-full bg-gradient-to-r from-[#0366d6] to-[#2ea44f] dark:from-[#58a6ff] dark:to-[#238636]"
                layout
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                animate={{ x: theme === 'dark' ? 24 : 0 }}
            >
                {/* Sun Icon */}
                <motion.div
                    className="absolute inset-0 h-6 w-6 p-1 text-white"
                    animate={{ opacity: theme === 'dark' ? 0 : 1, scale: theme === 'dark' ? 0.5 : 1 }}
                >
                    <Sun className="h-full w-full" />
                </motion.div>

                {/* Moon Icon */}
                <motion.div
                    className="absolute inset-0 h-6 w-6 p-1 text-white"
                    animate={{ opacity: theme === 'dark' ? 1 : 0, scale: theme === 'dark' ? 1 : 0.5 }}
                >
                    <Moon className="h-full w-full" />
                </motion.div>
            </motion.div>
        </motion.button>
    )
}