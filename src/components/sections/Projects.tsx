'use client'

import { useState, useEffect } from 'react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { FeaturedProjectSpotlight } from '../animations/FeaturedProjectSpotlight'
import { ProjectMarquee } from '../animations/ProjectMarquee'
import { FadeInView } from '../animations/FadeInView'
import { PROJECTS } from '@/lib/constants'
import { staticProjectsToGitHub } from '@/lib/github'
import { GitHubProject } from '@/types'

interface ProjectsProps {
    initialProjects?: GitHubProject[]
}

function ProjectSkeleton() {
    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <div className="h-64 animate-pulse rounded-xl bg-muted shimmer" />
            <div className="flex gap-6 overflow-hidden">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-48 w-72 shrink-0 animate-pulse rounded-lg bg-muted shimmer"
                    />
                ))}
            </div>
        </div>
    )
}

export function Projects({ initialProjects = [] }: ProjectsProps) {
    const [projects, setProjects] = useState<GitHubProject[]>(initialProjects)
    const [loading, setLoading] = useState(initialProjects.length === 0)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (initialProjects.length > 0) return

        async function loadProjects() {
            try {
                const response = await fetch('/api/github')
                if (!response.ok) throw new Error('API error')
                const data = await response.json()
                setProjects(data.repos)
            } catch {
                setError(true)
                setProjects(staticProjectsToGitHub(PROJECTS))
            } finally {
                setLoading(false)
            }
        }
        loadProjects()
    }, [initialProjects.length])

    return (
        <section className="relative overflow-x-clip py-16 sm:py-24 lg:py-32">
            <Container className="max-w-6xl">
                <SectionHeader
                    title="Open Source Projects"
                    subtitle={
                        loading
                            ? 'Loading repositories from GitHub...'
                            : error
                              ? 'Showing curated projects'
                              : `${projects.length} public repositories — continuously updated from GitHub`
                    }
                />

                {loading ? (
                    <ProjectSkeleton />
                ) : (
                    <FadeInView delay={0.1}>
                        <FeaturedProjectSpotlight projects={projects} />
                    </FadeInView>
                )}
            </Container>

            {!loading && projects.length > 0 && (
                <FadeInView delay={0.2} className="relative z-10 mt-12 overflow-x-clip border-t border-border pt-10 sm:mt-16 sm:pt-12">
                    <ProjectMarquee projects={projects} />
                </FadeInView>
            )}
        </section>
    )
}
