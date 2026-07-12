'use client'

import { forwardRef, useState } from 'react'
import { ExternalLink, Github, Star } from 'lucide-react'
import { GitHubProject } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
    project: GitHubProject
    variant?: 'compact' | 'default'
    className?: string
    isActive?: boolean
    onHoverChange?: (hovered: boolean) => void
    onActivate?: () => void
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

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
    function ProjectCard(
        {
            project,
            variant = 'default',
            className,
            isActive = false,
            onHoverChange,
            onActivate,
        },
        ref
    ) {
        const [isHovered, setIsHovered] = useState(false)

        const langClass = project.language
            ? languageColors[project.language] ?? 'text-muted-foreground'
            : 'text-muted-foreground'

        const isCompact = variant === 'compact'

        const handleEnter = () => {
            setIsHovered(true)
            onHoverChange?.(true)
        }

        const handleLeave = () => {
            setIsHovered(false)
            onHoverChange?.(false)
        }

        const handleActivate = (event: React.SyntheticEvent) => {
            if ((event.target as HTMLElement).closest('a')) return
            onActivate?.()
        }

        return (
            <div
                ref={ref}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onClick={handleActivate}
                className={cn(
                    'surface-card group relative flex flex-col rounded-lg transition-all duration-300',
                    isCompact &&
                        'w-[min(18rem,calc(100vw-2.5rem))] shrink-0 snap-center sm:w-72',
                    !isCompact && 'w-full min-w-0',
                    isCompact && (isHovered || isActive) && 'z-20',
                    isActive &&
                        isCompact &&
                        'scale-[1.05] shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]',
                    isHovered && isCompact && !isActive && 'z-10',
                    className
                )}
            >
                <div className={cn('flex flex-1 flex-col', isCompact ? 'p-5' : 'p-6')}>
                    <div className="mb-3 flex items-start gap-3">
                        <Github className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                            <h3
                                className={cn(
                                    'line-clamp-1 font-medium text-foreground',
                                    isCompact ? 'text-sm' : 'text-base'
                                )}
                            >
                                {project.name}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                {project.language && (
                                    <span className={cn('text-xs', langClass)}>
                                        {project.language}
                                    </span>
                                )}
                                {project.stars > 0 && (
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Star className="h-3 w-3" />
                                        {project.stars}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <p
                        className={cn(
                            'flex-1 text-muted-foreground',
                            isCompact ? 'line-clamp-3 text-xs' : 'line-clamp-3 text-sm'
                        )}
                    >
                        {project.description ?? 'Open-source project on GitHub.'}
                    </p>

                    {project.topics.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {project.topics.slice(0, isCompact ? 3 : 5).map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-4 flex items-center gap-3 border-t border-border/50 pt-4">
                        <a
                            href={project.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-medium text-foreground transition-opacity hover:opacity-70"
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
                                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                                aria-label={`Visit ${project.name} live demo`}
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Live
                            </a>
                        )}
                    </div>
                </div>
            </div>
        )
    }
)
