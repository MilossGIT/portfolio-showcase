'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { AnimatePresence, m } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const isManualScrollRef = useRef(false)
    const manualScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        let frame = 0
        let lastScrolled = window.scrollY > 0

        const updateScrollState = () => {
            frame = 0

            const scrolled = window.scrollY > 0
            if (scrolled !== lastScrolled) {
                lastScrolled = scrolled
                setIsScrolled(scrolled)
            }

            // Do not override active section while smooth scrolling to a user-clicked tab
            if (isManualScrollRef.current) return

            const sections = NAV_LINKS.map((link) => link.href.replace('#', ''))
            let nextActive = ''

            for (const id of [...sections].reverse()) {
                const el = document.getElementById(id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= 140) {
                        nextActive = id
                        break
                    }
                }
            }

            setActiveSection(nextActive)
        }

        const handleScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(updateScrollState)
        }

        updateScrollState()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (frame) window.cancelAnimationFrame(frame)
            if (manualScrollTimerRef.current) clearTimeout(manualScrollTimerRef.current)
        }
    }, [])

    const handleNavClick = (href: string) => {
        if (href.startsWith('http')) {
            window.open(href, '_blank', 'noopener noreferrer')
            return
        }

        const id = href.replace('#', '')
        const element = document.getElementById(id)

        setIsOpen(false)

        // Immediately activate clicked tab for instant 0ms visual feedback
        setActiveSection(id)

        if (element) {
            // Lock activeSection from scroll-listener override while smooth scrolling to target
            isManualScrollRef.current = true
            if (manualScrollTimerRef.current) {
                clearTimeout(manualScrollTimerRef.current)
            }
            manualScrollTimerRef.current = setTimeout(() => {
                isManualScrollRef.current = false
            }, 800)

            // Trigger smooth scrolling instantly without artificial delay
            const headerHeight = 64
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
    }

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 isolate transition-all duration-300',
                'border-b border-border/50 bg-background/95 backdrop-blur-md shadow-sm',
                isScrolled && 'bg-background shadow-md shadow-black/30'
            )}
        >
            <nav aria-label="Main navigation" className="container mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Desktop: Navigation links aligned to the left */}
                    <div className="hidden md:flex md:items-center md:gap-1 -ml-3">
                        {NAV_LINKS.map((link) => {
                            const sectionId = link.href.replace('#', '')
                            const isActive = activeSection === sectionId
                            return (
                                <button
                                    key={link.name}
                                    type="button"
                                    onClick={() => handleNavClick(link.href)}
                                    className={cn(
                                        'relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 rounded-md',
                                        isActive
                                            ? 'nav-link-active'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span
                                            className="nav-link-underline animate-in fade-in zoom-in-95 duration-150"
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            )
                        })}
                    </div>

                    {/* Desktop: Action button on the right */}
                    <div className="hidden md:flex md:items-center">
                        <button
                            type="button"
                            onClick={() => handleNavClick('#contact')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 text-black text-xs font-semibold hover:bg-emerald-400 transition-colors duration-150 shadow-sm shadow-emerald-500/20"
                        >
                            Contact
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Mobile: Direct action button on left + Burger button on right */}
                    <div className="flex md:hidden items-center justify-between w-full">
                        <button
                            type="button"
                            onClick={() => handleNavClick('#contact')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 text-black text-xs font-semibold hover:bg-emerald-400 transition-colors duration-150 shadow-sm shadow-emerald-500/20"
                        >
                            Contact
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="rounded-lg p-2 text-foreground hover:bg-muted transition-colors active:scale-95"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                            aria-controls="mobile-nav"
                        >
                            {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown: Expands naturally within the solid header with zero overlapping */}
                <AnimatePresence>
                    {isOpen && (
                        <m.div
                            id="mobile-nav"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden border-t border-border/60 overflow-hidden bg-background"
                        >
                            <div className="py-3 px-1 space-y-1">
                                {NAV_LINKS.map((link) => {
                                    const sectionId = link.href.replace('#', '')
                                    const isActive = activeSection === sectionId
                                    return (
                                        <button
                                            key={link.name}
                                            type="button"
                                            onClick={() => handleNavClick(link.href)}
                                            className={cn(
                                                'flex w-full items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors duration-150 active:bg-muted/70',
                                                isActive
                                                    ? 'text-emerald-400 bg-muted/50 font-medium'
                                                    : 'text-foreground hover:bg-muted/30'
                                            )}
                                        >
                                            <span>{link.name}</span>
                                            {isActive && (
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}
