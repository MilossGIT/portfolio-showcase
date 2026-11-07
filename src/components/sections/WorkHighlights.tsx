import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeInView } from '../animations/FadeInView'
import { WORK_HIGHLIGHTS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function WorkCard({
    work,
    index,
}: {
    work: (typeof WORK_HIGHLIGHTS)[number]
    index: number
}) {
    const cardClass = cn(
        'surface-card rounded-lg p-5 space-y-4 sm:p-8 sm:space-y-5 h-full flex flex-col justify-between'
    )

    return (
        <FadeInView delay={index * 0.1} y={24} className="h-full">
            <div className={cardClass}>
                <div className="space-y-4 sm:space-y-5">
                    {work.image && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-border/40 bg-muted/20">
                            <Image
                                src={work.image}
                                alt={work.imageAlt || `${work.title} homepage`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
                                className="object-cover"
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                            />
                        </div>
                    )}

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
                        {work.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {(work.role || work.outcome) && (
                        <div className="border-t border-border/50 pt-3 text-xs leading-relaxed text-muted-foreground space-y-1">
                            {work.role && (
                                <p>
                                    <span className="font-medium text-foreground">Role:</span> {work.role}
                                </p>
                            )}
                            {work.outcome && (
                                <p>
                                    <span className="font-medium text-foreground">Outcome:</span> {work.outcome}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {work.url && (
                    <div className="pt-2">
                        <a
                            href={work.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="accent-hover-text group/live inline-flex items-center gap-1.5 text-sm text-foreground"
                            aria-label={`Visit live site for ${work.title}`}
                        >
                            <ExternalLink className="h-3.5 w-3.5 transition-all duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5 group-active/live:-translate-y-0.5 group-active/live:translate-x-0.5" aria-hidden="true" />
                            Visit live site
                        </a>
                    </div>
                )}
            </div>
        </FadeInView>
    )
}

export function WorkHighlights() {
    return (
        <section id="work" aria-labelledby="work-heading" className="relative section-spacing scroll-mt-16">
            <Container className="max-w-6xl">
                <SectionHeader
                    id="work-heading"
                    badge="Professional Work"
                    title="Work &amp; Highlights"
                    subtitle="Selected client and production projects."
                />

                <div className="grid gap-10 md:grid-cols-2 lg:gap-12">
                    {WORK_HIGHLIGHTS.map((work, index) => (
                        <WorkCard key={work.title} work={work} index={index} />
                    ))}
                </div>
            </Container>
        </section>
    )
}
