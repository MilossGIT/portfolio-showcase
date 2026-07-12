'use client'

import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { EXPERIENCE } from '@/lib/constants'
import { FadeInView } from '../animations/FadeInView'

export function Experience() {
    return (
        <section className="relative section-spacing">
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
                            <div className="group touch-accent-group grid gap-4 py-10 sm:grid-cols-[160px_1fr] sm:gap-16 sm:py-14">
                                <div className="experience-date">
                                    {experience.date}
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-foreground leading-snug">
                                        {experience.title}
                                    </h3>
                                    <p className="experience-company">
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
                                            <span key={tag} className="skill-tag">
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
