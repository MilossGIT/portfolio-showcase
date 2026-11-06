import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { FeaturedProjectSpotlight } from '../animations/FeaturedProjectSpotlight'
import { ProjectPaginatedGrid } from '../animations/ProjectPaginatedGrid'
import { FadeInView } from '../animations/FadeInView'
import { GitHubProject } from '@/types'

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
        </section>
    )
}
