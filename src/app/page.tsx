import { About } from '@/components/sections/About'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { WorkHighlights } from '@/components/sections/WorkHighlights'
import { FEATURED_REPO_NAMES, PROJECTS } from '@/lib/constants'
import { fetchGitHubRepos, staticProjectsToGitHub } from '@/lib/github'
import { GitHubProject } from '@/types'

async function getProjects(): Promise<GitHubProject[]> {
    try {
        return await fetchGitHubRepos(FEATURED_REPO_NAMES)
    } catch {
        return staticProjectsToGitHub(PROJECTS)
    }
}

export default async function Home() {
    const initialProjects = await getProjects()

    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <Hero />

            <div className="relative z-10 bg-background section-divider">
                <About />
            </div>

            <div className="relative z-10 bg-background section-divider">
                <Experience />
            </div>

            <div className="relative z-10 bg-background section-divider">
                <WorkHighlights />
            </div>

            <div className="relative z-10 bg-background section-divider">
                <CaseStudies />
            </div>

            <div className="relative z-10 bg-background section-divider">
                <Projects initialProjects={initialProjects} />
            </div>

            <div className="relative z-10 bg-background section-divider">
                <Contact />
            </div>
        </div>
    )
}
