'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { NAV_LINKS } from '@/lib/constants'
import { DevLogo } from './DevLogo'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (href: string) => {
        if (href.startsWith('http')) {
            window.open(href, '_blank', 'noopener noreferrer')
        } else {
            const element = document.querySelector(href)
            element?.scrollIntoView({ behavior: 'smooth' })
        }
        setIsOpen(false)
    }

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-200
        ${isScrolled
                    ? 'bg-[#ffffff]/80 border-b border-[#e1e4e8] dark:bg-[#0d1117]/80 dark:border-[#30363d] backdrop-blur-sm'
                    : 'bg-transparent'
                }`}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="outline-none focus-visible:ring-2 focus-visible:ring-[#0366d6] rounded-lg"
                    >
                        <DevLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {NAV_LINKS.map((link) => (
                            <motion.button
                                key={link.name}
                                onClick={() => handleNavClick(link.href)}
                                className="relative text-sm font-medium text-[#24292e] dark:text-[#c9d1d9] hover:text-[#0366d6] dark:hover:text-[#58a6ff] transition-colors"
                                whileHover={{ y: -1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {link.name}
                            </motion.button>
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-md p-2 text-[#24292e] dark:text-[#c9d1d9] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] transition-colors"
                            aria-label="Toggle menu"
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: isOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </motion.div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden border-t border-[#e1e4e8] dark:border-[#30363d]"
                        >
                            <div className="py-3 px-4 space-y-1">
                                {NAV_LINKS.map((link) => (
                                    <motion.button
                                        key={link.name}
                                        onClick={() => handleNavClick(link.href)}
                                        className="flex w-full px-3 py-2 text-[#24292e] dark:text-[#c9d1d9] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] rounded-md transition-colors"
                                        whileHover={{ x: 4 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        {link.name}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}