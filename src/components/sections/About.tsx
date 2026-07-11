'use client'

import { SKILLS, EDUCATION } from '@/lib/constants'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeInView } from '../animations/FadeInView'

export function About() {
    return (
        <section className="relative py-24 sm:py-32">
            <Container className="max-w-6xl">
                <SectionHeader
                    title="About Me"
                    subtitle="A Software Engineer passionate about crafting exceptional web experiences. I specialize in React, TypeScript, and Next.js — combining technical precision with seamless user experiences."
                />

                <div className="max-w-3xl space-y-16">
                    <FadeInView delay={0.1}>
                        <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-5">
                            Skills & Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {SKILLS.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-foreground/30 hover:bg-muted/50"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </FadeInView>

                    <FadeInView delay={0.15}>
                        <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
                            Education & Certifications
                        </h3>
                        <div className="space-y-10 border-l-2 border-border pl-8">
                            {EDUCATION.map((edu, index) => (
                                <FadeInView key={edu.school} delay={0.1 + index * 0.08} y={16}>
                                    <div className="relative">
                                        <div className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-foreground/20 ring-4 ring-background" />
                                        <h4 className="font-medium text-foreground leading-snug">{edu.school}</h4>
                                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{edu.degree}</p>
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
