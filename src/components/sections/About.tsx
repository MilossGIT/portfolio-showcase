'use client'

import { SKILLS, EDUCATION } from '@/lib/constants'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeInView } from '../animations/FadeInView'

export function About() {
    return (
        <section className="relative section-spacing">
            <Container className="max-w-6xl">
                <SectionHeader
                    title="About Me"
                    subtitle="A Software Engineer passionate about crafting exceptional web experiences. I specialize in React, TypeScript, and Next.js — combining technical precision with seamless user experiences."
                />

                <div className="max-w-3xl space-y-14 sm:space-y-20">
                    <FadeInView delay={0.1}>
                        <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-5">
                            Skills & Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {SKILLS.map((skill) => (
                                <span key={skill} className="skill-tag text-sm px-3.5 py-1.5 text-foreground">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </FadeInView>

                    <FadeInView delay={0.15}>
                        <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
                            Education & Certifications
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
