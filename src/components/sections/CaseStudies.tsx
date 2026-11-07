import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeInView } from '../animations/FadeInView'
import { CASE_STUDIES } from '@/lib/constants'

export function CaseStudies() {
    return (
        <section id="case-studies" aria-labelledby="case-studies-heading" className="relative section-spacing scroll-mt-16">
            <Container className="max-w-6xl">
                <SectionHeader
                    id="case-studies-heading"
                    badge="AI Systems"
                    title="Case Studies"
                    subtitle="Internal AI tooling and automation systems built at Sportradar."
                />

                <div className="mb-8 text-xs font-mono text-muted-foreground">
                    <span aria-hidden="true">ℹ️ </span>Internal systems and details are anonymized.
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
                    {CASE_STUDIES.map((study, index) => (
                        <FadeInView key={study.id} delay={index * 0.1} y={20} className="h-full">
                            <div className="surface-card flex h-full flex-col justify-between rounded-lg p-6 sm:p-8 space-y-5">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                                            {study.context}
                                        </p>
                                        <h3 className="text-xl font-medium text-foreground tracking-tight leading-snug">
                                            {study.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-3 text-sm leading-relaxed">
                                        {study.problem && (
                                            <div>
                                                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                                                    Problem
                                                </span>
                                                <p className="text-muted-foreground text-xs sm:text-sm">{study.problem}</p>
                                            </div>
                                        )}
                                        {study.approach ? (
                                            <div>
                                                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
                                                    Approach
                                                </span>
                                                <p className="text-foreground text-xs sm:text-sm leading-relaxed">{study.approach}</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                                                    System
                                                </span>
                                                <p className="text-foreground">{study.claim}</p>
                                            </div>
                                        )}
                                        {study.result && (
                                            <div>
                                                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-0.5">
                                                    Result
                                                </span>
                                                <p className="text-foreground font-medium text-xs sm:text-sm">{study.result}</p>
                                            </div>
                                        )}

                                        {study.stack && study.stack.length > 0 && (
                                            <div>
                                                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                                                    Integrations
                                                </span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {study.stack.map((item) => (
                                                        <span
                                                            key={item}
                                                            className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {study.inProduction && (
                                            <div>
                                                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                                                    In production
                                                </span>
                                                <p className="text-muted-foreground">{study.inProduction}</p>
                                            </div>
                                        )}

                                        {study.metrics && study.metrics.length > 0 && (
                                            <div className="pt-2">
                                                <div className="grid grid-cols-2 gap-3 border-t border-border/50 pt-3">
                                                    {study.metrics.map((metric) => (
                                                        <div key={metric.label}>
                                                            <div className="text-lg font-semibold text-foreground">
                                                                {metric.value}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {metric.label}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
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
