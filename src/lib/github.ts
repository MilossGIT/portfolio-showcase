import { GitHubProject } from '@/types'

const GITHUB_USERNAME = 'MilossGIT'

interface GitHubApiRepo {
    name: string
    description: string | null
    html_url: string
    language: string | null
    stargazers_count: number
    topics: string[]
    updated_at: string
    homepage: string | null
    archived: boolean
    fork: boolean
}

function toGitHubProject(repo: GitHubApiRepo, featured = false): GitHubProject {
    return {
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics ?? [],
        updatedAt: repo.updated_at,
        homepage: repo.homepage || null,
        previewImage: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
        featured,
    }
}

export async function fetchGitHubRepos(featuredNames: string[] = []): Promise<GitHubProject[]> {
    const headers: HeadersInit = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    }

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        {
            headers,
            next: { revalidate: 3600 },
        }
    )

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos: GitHubApiRepo[] = await response.json()

    return repos
        .filter((repo) => !repo.archived)
        .map((repo) =>
            toGitHubProject(repo, featuredNames.includes(repo.name))
        )
        .sort((a, b) => {
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        })
}

export function staticProjectsToGitHub(
    projects: Array<{
        title: string
        description: string
        tags: string[]
        github: string
    }>
): GitHubProject[] {
    return projects.map((project) => {
        const repoName = project.github.split('/').pop() ?? project.title
        return {
            name: repoName,
            description: project.description,
            htmlUrl: project.github,
            language: project.tags[0] ?? null,
            stars: 0,
            topics: project.tags,
            updatedAt: new Date().toISOString(),
            homepage: null,
            previewImage: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repoName}`,
            featured: true,
        }
    })
}
