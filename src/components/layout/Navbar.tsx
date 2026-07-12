'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { NAV_LINKS } from '@/lib/constants'
import { DevLogo } from './DevLogo'
import { cn } from '@/lib/utils'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        let frame = 0
        let lastScrolled = window.scrollY > 0
        let lastActive = ''

        const updateScrollState = () => {
            frame = 0

            const scrolled = window.scrollY > 0
            if (scrolled !== lastScrolled) {
                lastScrolled = scrolled
                setIsScrolled(scrolled)
            }

            const sections = NAV_LINKS.map((link) => link.href.replace('#', ''))
            let nextActive = ''
            for (const id of [...sections].reverse()) {
                const el = document.getElementById(id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= 120) {
                        nextActive = id
                        break
                    }
                }
            }

            if (nextActive !== lastActive) {
                lastActive = nextActive
                setActiveSection(nextActive)
            }
        }

        const handleScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(updateScrollState)
        }

        updateScrollState()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (frame) window.cancelAnimationFrame(frame)
        }
    }, [])

    const handleNavClick = (href: string) => {
        if (href.startsWith('http')) {
            window.open(href, '_blank', 'noopener noreferrer')
        } else {
            const id = href.replace('#', '')
            const element = document.getElementById(id)

            if (element) {
                setIsOpen(false)
                setTimeout(() => {
                    const headerHeight = 64
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                }, 300)
            }
        }
    }

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 isolate transition-all duration-300',
                'border-b border-border/50 bg-background/90 backdrop-blur-md',
                isScrolled && 'bg-background/95 shadow-sm'
            )}
        >
            <nav className="container mx-auto w-full min-w-0 max-w-6xl">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="shrink-0 no-underline text-inherit outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                    >
                        <DevLogo />
                    </Link>

                    <div className="hidden md:flex md:items-center md:gap-1">
                        {NAV_LINKS.map((link) => {
                            const sectionId = link.href.replace('#', '')
                            const isActive = activeSection === sectionId
                            return (
                                <button
                                    key={link.name}
                                    onClick={() => handleNavClick(link.href)}
                                    className={cn(
                                        'accent-hover-text relative px-3 py-2 text-sm',
                                        isActive
                                            ? 'nav-link-active'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    {link.name}
                                    {isActive && <span className="nav-link-underline" />}
                                </button>
                            )
                        })}
                        <div className="ml-2 flex items-center border-l border-border pl-4">
                            <ThemeToggle />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-md p-2 text-foreground hover:bg-muted transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden border-t border-border/60"
                        >
                            <div className="py-3 px-4 space-y-1">
                                {NAV_LINKS.map((link) => {
                                    const sectionId = link.href.replace('#', '')
                                    const isActive = activeSection === sectionId
                                    return (
                                        <button
                                            key={link.name}
                                            onClick={() => handleNavClick(link.href)}
                                            className={cn(
                                                'accent-hover-text flex w-full px-3 py-2 rounded-md text-sm hover:bg-muted',
                                                isActive
                                                    ? 'nav-link-active'
                                                    : 'text-muted-foreground'
                                            )}
                                        >
                                            {link.name}
                                        </button>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}
