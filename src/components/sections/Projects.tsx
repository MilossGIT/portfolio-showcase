import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { FeaturedProjectSpotlight } from '../animations/FeaturedProjectSpotlight'
import { ProjectPaginatedGrid } from '../animations/ProjectPaginatedGrid'
import { FadeInView } from '../animations/FadeInView'
import { GitHubProject } from '@/types'
import { Github } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'

interface ProjectsProps {
    initialProjects?: GitHubProject[]
}

export function Projects({ initialProjects = [] }: ProjectsProps) {
    return (
        <section className="relative overflow-x-clip section-spacing">
            <Container className="max-w-6xl">
                <SectionHeader
                    title="Open Source Projects"
                    subtitle={`${initialProjects.length} selected repositories, updated live from GitHub`}
                />

                <FadeInView delay={0.1}>
                    <FeaturedProjectSpotlight projects={initialProjects} />
                </FadeInView>
            </Container>

            {initialProjects.length > 0 && (
                <FadeInView
                    delay={0.2}
                    className="relative z-10 mt-16 overflow-x-clip overflow-y-visible border-t border-border pt-14 sm:mt-20 sm:pt-16 lg:mt-24 lg:pt-20"
                >
                    <ProjectPaginatedGrid projects={initialProjects} />
                </FadeInView>
            )}

            <div className="container mx-auto mt-12 flex justify-center px-4 sm:mt-16">
                <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <Github className="h-4 w-4" />
                    View all on GitHub
                    <span aria-hidden="true" className="text-muted-foreground">↗</span>
                </a>
            </div>
        </section>
    )
}
