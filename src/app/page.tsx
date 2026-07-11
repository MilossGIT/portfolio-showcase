import { About } from '@/components/sections/About'
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

            <div id="about" className="relative z-10 bg-background section-divider scroll-mt-16">
                <About />
            </div>

            <div id="experience" className="relative z-10 bg-background section-divider scroll-mt-16">
                <Experience />
            </div>

            <div id="work" className="relative z-10 bg-background section-divider scroll-mt-16">
                <WorkHighlights />
            </div>

            <div id="projects" className="relative z-10 bg-background section-divider scroll-mt-16">
                <Projects initialProjects={initialProjects} />
            </div>

            <div id="contact" className="relative z-10 bg-background section-divider scroll-mt-16">
                <Contact />
            </div>
        </div>
    )
}
