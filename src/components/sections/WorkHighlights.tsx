'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { WORK_HIGHLIGHTS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function WorkCard({
    work,
    index,
}: {
    work: (typeof WORK_HIGHLIGHTS)[number]
    index: number
}) {
    const baseDelay = index * 0.12

    const cardClass = cn(
        'surface-card rounded-lg p-8 space-y-5',
        'transition-colors duration-300',
        'hover:border-foreground/20 hover:shadow-lg'
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                duration: 0.6,
                delay: baseDelay,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -5 }}
            className={cardClass}
        >
            <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    {work.company}
                </p>
                <h3 className="text-xl font-medium text-foreground tracking-tight leading-snug">
                    {work.title}
                </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{work.description}</p>

            <p className="text-sm text-foreground leading-relaxed">{work.impact}</p>

            <div className="flex flex-wrap gap-2">
                {work.tags.map((tag, tagIndex) => (
                    <motion.span
                        key={tag}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{
                            duration: 0.35,
                            delay: baseDelay + 0.25 + tagIndex * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                        {tag}
                    </motion.span>
                ))}
            </div>

            {work.url && (
                <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-foreground transition-opacity hover:opacity-70"
                >
                    <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    Visit live site
                </a>
            )}
        </motion.div>
    )
}

export function WorkHighlights() {
    return (
        <section className="relative py-24 sm:py-32">
            <Container className="max-w-6xl">
                <SectionHeader
                    badge="Professional Work"
                    title="Work & Highlights"
                    subtitle="Selected projects and contributions from my professional career — the work I'm most proud of."
                />

                <div className="grid gap-12 md:grid-cols-2">
                    {WORK_HIGHLIGHTS.map((work, index) => (
                        <WorkCard key={work.title} work={work} index={index} />
                    ))}
                </div>
            </Container>
        </section>
    )
}
