'use client'

import { ExternalLink, Github, Star } from 'lucide-react'
import { GitHubProject } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
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

export function ProjectCard({ project, className }: ProjectCardProps) {
    const langClass = project.language
        ? languageColors[project.language] ?? 'text-muted-foreground'
        : 'text-muted-foreground'

    const description =
        project.description ?? 'Open-source project on GitHub.'

    return (
        <div
            className={cn(
                'surface-card group relative box-border flex w-full min-w-0 flex-col rounded-lg transition-colors duration-300',
                className
            )}
        >
            <div className="flex h-full w-full min-w-0 max-w-full flex-col overflow-hidden p-6">
                <div className="w-full min-w-0 max-w-full shrink-0 overflow-hidden">
                    <div className="flex min-w-0 items-start gap-3 overflow-hidden">
                        <Github className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0 flex-1 overflow-hidden">
                            <h3 className="truncate text-base font-medium text-foreground">
                                {project.name}
                            </h3>
                            <div className="mt-1 flex min-w-0 max-w-full items-center gap-2 overflow-hidden">
                                {project.language && (
                                    <span
                                        className={cn(
                                            'shrink-0 text-xs',
                                            langClass
                                        )}
                                    >
                                        {project.language}
                                    </span>
                                )}
                                {project.stars > 0 && (
                                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                                        <Star className="h-3 w-3" />
                                        {project.stars}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-3 line-clamp-3 min-w-0 flex-1 overflow-hidden text-sm text-muted-foreground">
                    {description}
                </p>

                {project.topics.length > 0 && (
                    <div className="mt-3 flex w-full min-w-0 max-w-full shrink-0 flex-wrap gap-1.5 overflow-hidden">
                        {project.topics.slice(0, 5).map((tag) => (
                            <span
                                key={tag}
                                className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto w-full min-w-0 max-w-full shrink-0 overflow-hidden border-t border-border/50 pt-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <a
                            href={project.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-foreground transition-opacity hover:opacity-70"
                            aria-label={`View ${project.name} on GitHub`}
                        >
                            <Github className="h-3.5 w-3.5" />
                            GitHub
                        </a>
                        {project.homepage && (
                            <a
                                href={project.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                                aria-label={`Visit ${project.name} live demo`}
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Live
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
