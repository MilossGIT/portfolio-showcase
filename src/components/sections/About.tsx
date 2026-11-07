import { SKILL_CATEGORIES, EDUCATION } from '@/lib/constants'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeInView } from '../animations/FadeInView'

export function About() {
    return (
        <section id="about" aria-labelledby="about-heading" className="relative section-spacing scroll-mt-16">
            <Container className="max-w-6xl">
                <SectionHeader
                    id="about-heading"
                    title="Profile"
                    subtitle="Product engineer with 10+ years in web development, building frontend products and AI tools that automate engineering workflows."
                />

                <FadeInView delay={0.05} className="mb-14 max-w-3xl">
                    <ul className="space-y-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        <li className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                            <span>
                                <strong className="font-medium text-foreground">AI &amp; workflow automation:</strong> A retrieval-grounded knowledge assistant with source citations, and runbook automation across GitHub, Slack and Jira (100+ automated runs).
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                            <span>
                                <strong className="font-medium text-foreground">Production systems:</strong> Node.js services on Kubernetes behind company SSO, covered by Playwright tests and LLM evaluation checks in CI.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                            <span>
                                <strong className="font-medium text-foreground">Idea to production:</strong> Products taken from architecture to launch with TypeScript, React and Next.js, including four live products.
                            </span>
                        </li>
                    </ul>
                </FadeInView>

                <div className="max-w-3xl space-y-14 sm:space-y-20">
                    <FadeInView delay={0.1}>
                        <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
                            Skills &amp; Technologies
                        </h3>
                        <div className="space-y-6">
                            {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
                                <div key={category} className="space-y-2.5">
                                    <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                        {category}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill) => (
                                            <span key={skill} className="skill-tag text-xs sm:text-sm px-3 py-1 text-foreground">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeInView>

                    <FadeInView delay={0.15}>
                        <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
                            Education &amp; Certifications
                        </h3>
                        <div className="education-timeline">
                            {EDUCATION.map((edu, index) => (
                                <FadeInView key={edu.school} delay={0.1 + index * 0.08} y={16}>
                                    <div className="group touch-accent-group relative">
                                        <div className="education-timeline-dot" />
                                        <h4 className="font-medium text-foreground leading-snug">{edu.school}</h4>
                                        <p className="education-degree">{edu.degree}</p>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{edu.location}</span>
                                            <span>·</span>
                                            <span>{edu.date}</span>
                                        </div>
                                        {edu.description && (
                                            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                                {edu.description}
                                            </p>
                                        )}
                                        {edu.project && (
                                            <p className="mt-4 text-sm text-foreground leading-relaxed">
                                                <span className="text-muted-foreground">Final project: </span>
                                                {edu.project.name} — {edu.project.description}
                                            </p>
                                        )}
                                    </div>
                                </FadeInView>
                            ))}
                        </div>
                    </FadeInView>
                </div>
            </Container>
        </section>
    )
}
