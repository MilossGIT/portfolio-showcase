'use client'

import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { EXPERIENCE } from '@/lib/constants'
import { FadeInView } from '../animations/FadeInView'

export function Experience() {
    return (
        <section className="relative py-16 sm:py-24 lg:py-32">
            <Container className="max-w-6xl">
                <SectionHeader
                    badge="Career"
                    title="Work Experience"
                    subtitle="A journey through frontend engineering, integrations, and building products that scale."
                />

                <div>
                    {EXPERIENCE.map((experience, index) => (
                        <FadeInView
                            key={experience.title + experience.company}
                            delay={index * 0.08}
                            y={20}
                            className={index > 0 ? 'border-t border-border' : undefined}
                        >
                            <div className="grid gap-4 py-8 sm:grid-cols-[160px_1fr] sm:gap-16 sm:py-12">
                                <div className="text-sm text-muted-foreground shrink-0 leading-relaxed">
                                    {experience.date}
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-foreground leading-snug">
                                        {experience.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                        {experience.company} · {experience.location}
                                    </p>
                                    <ul className="mt-5 space-y-3">
                                        {experience.description.map((item, itemIndex) => (
                                            <li
                                                key={itemIndex}
                                                className="text-sm text-muted-foreground leading-relaxed"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {experience.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeInView>
                    ))}
                </div>
            </Container>
        </section>
    )
}
