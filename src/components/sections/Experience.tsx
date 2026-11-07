import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { EXPERIENCE } from '@/lib/constants'
import { FadeInView } from '../animations/FadeInView'

export function Experience() {
    const featuredExperience = EXPERIENCE.slice(0, 3)
    const earlierExperience = EXPERIENCE.slice(3)

    return (
        <section className="relative section-spacing">
            <Container className="max-w-6xl">
                <SectionHeader
                    badge="Career"
                    title="Experience"
                    subtitle="A career spanning frontend engineering, enterprise integrations, AI automation, and customer-facing product delivery."
                />

                <div>
                    {featuredExperience.map((experience, index) => (
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

                    {earlierExperience.length > 0 && (
                        <FadeInView delay={0.25} y={15}>
                            <details className="group/details border-t border-border pt-6">
                                <summary className="flex cursor-pointer items-center justify-between rounded py-2 text-sm font-medium text-foreground hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <span>View earlier roles ({earlierExperience.length})</span>
                                    <span className="text-muted-foreground transition-transform duration-200 group-open/details:rotate-180" aria-hidden="true">
                                        ↓
                                    </span>
                                </summary>
                                <div className="divide-y divide-border/60 pt-4">
                                    {earlierExperience.map((exp) => (
                                        <div key={exp.title + exp.company} className="py-6 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                                                <h4 className="font-medium text-foreground">{exp.title}</h4>
                                                <span className="text-xs font-mono text-muted-foreground">{exp.date}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{exp.company} · {exp.location}</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed pt-1">{exp.description[0]}</p>
                                            <div className="flex flex-wrap gap-1.5 pt-2">
                                                {exp.tags.map((tag) => (
                                                    <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        </FadeInView>
                    )}
                </div>
            </Container>
        </section>
    )
}
