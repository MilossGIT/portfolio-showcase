'use client'

import { forwardRef } from 'react'
import { ExternalLink, Github, Star } from 'lucide-react'
import { GitHubProject } from '@/types'
import { cn } from '@/lib/utils'

interface CarouselProjectTileProps {
    project: GitHubProject
    className?: string
}

const languageColors: Record<string, string> = {
    TypeScript: 'text-blue-500',
    JavaScript: 'text-yellow-600 dark:text-yellow-500',
    Python: 'text-green-600 dark:text-green-500',
    Java: 'text-orange-600',
    'C#': 'text-purple-600',
    Go: 'text-cyan-600',
    Rust: 'text-orange-700',
    HTML: 'text-red-500',
    CSS: 'text-blue-400',
}

export const CarouselProjectTile = forwardRef<
    HTMLDivElement,
    CarouselProjectTileProps
>(function CarouselProjectTile({ project, className }, ref) {
    const langClass = project.language
        ? languageColors[project.language] ?? 'text-muted-foreground'
        : 'text-muted-foreground'

    const topics = project.topics.slice(0, 2)

    return (
        <div
            ref={ref}
            className={cn(
                'project-grid-card surface-card box-border flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-lg transition-colors duration-300',
                className
            )}
        >
            <div className="flex h-full min-h-0 flex-col gap-2 p-4 sm:gap-2.5 sm:p-5">
                <div className="flex shrink-0 items-start gap-2.5">
                    <Github className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground sm:h-5 sm:w-5" />
                    <h3 className="min-w-0 flex-1 truncate text-base font-semibold text-foreground">
                        {project.name}
                    </h3>
                </div>

                <p className="min-h-[3rem] shrink-0 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {project.description?.trim() ||
                        'An open-source project from my GitHub.'}
                </p>

                <div className="flex shrink-0 items-center gap-2">
                    {project.language ? (
                        <span className={cn('shrink-0 text-sm', langClass)}>
                            {project.language}
                        </span>
                    ) : (
                        <span className="invisible text-xs" aria-hidden>
                            —
                        </span>
                    )}
                    {project.stars > 0 ? (
                        <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-3.5 w-3.5" />
                            {project.stars}
                        </span>
                    ) : (
                        <span className="invisible text-xs" aria-hidden>
                            —
                        </span>
                    )}
                </div>

                <div className="flex h-7 shrink-0 items-center gap-1.5 overflow-hidden">
                    {topics.length > 0 ? (
                        topics.map((tag) => (
                            <span
                                key={tag}
                                className="shrink-0 truncate rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="invisible text-xs" aria-hidden>
                            —
                        </span>
                    )}
                </div>

                <div className="mt-auto flex shrink-0 items-center gap-3 border-t border-border/50 pt-2">
                    <a
                        href={project.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="accent-hover-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                        aria-label={`View ${project.name} on GitHub`}
                    >
                        <Github className="h-4 w-4" />
                    </a>
                    {project.homepage ? (
                        <a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="accent-hover-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                            aria-label={`Visit ${project.name} live demo`}
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    ) : (
                        <span
                            className="invisible h-8 w-8 shrink-0"
                            aria-hidden
                        />
                    )}
                </div>
            </div>
        </div>
    )
})
