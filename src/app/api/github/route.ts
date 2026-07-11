import { NextResponse } from 'next/server'
import { fetchGitHubRepos } from '@/lib/github'
import { FEATURED_REPO_NAMES } from '@/lib/constants'

export const revalidate = 3600

export async function GET() {
    try {
        const repos = await fetchGitHubRepos(FEATURED_REPO_NAMES)
        return NextResponse.json({ repos })
    } catch (error) {
        console.error('GitHub API route error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch GitHub repositories' },
            { status: 500 }
        )
    }
}
