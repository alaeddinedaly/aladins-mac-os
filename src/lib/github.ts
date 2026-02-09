import { Project } from '@/types/apps';

const GITHUB_USERNAME = 'alaeddinedaly';
const CACHE_KEY = 'github_repos';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface GithubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    topics: string[];
    language: string;
    created_at: string;
    updated_at: string;
    fork: boolean;
}

export const fetchGithubRepos = async (): Promise<Project[]> => {
    try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { timestamp, data } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data;
            }
        }

        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);

        if (!response.ok) {
            // If rate limit exceeded or other error, try to return cached data even if expired
            if (cachedData) {
                const { data } = JSON.parse(cachedData);
                console.warn('GitHub API failed, using cached data');
                return data;
            }
            throw new Error('Failed to fetch repositories');
        }

        const repos: GithubRepo[] = await response.json();

        // Filter out forks if desired, or keep them. For a portfolio, usually sources are better.
        // Let's keep sources only for now, or maybe all. 
        // The user didn't specify, but usually personal portfolios show personal work.
        // Let's filter out forks for now to keep it clean, or maybe include them if they are significant.
        // I'll include everything but sort by stars or updated? The API already sorts by updated.

        const projects: Project[] = repos
            .filter(repo => !repo.fork) // Optional: filter out forks
            .map((repo) => ({
                id: repo.name,
                name: repo.name.replace(/-/g, ' ').replace(/_/g, ' '), // Prettify name
                description: repo.description || 'No description available.',
                tech: repo.topics.length > 0 ? repo.topics : [repo.language || 'Code'],
                category: 'Project', // Default category
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || undefined,
                readme: '', // Will be fetched on demand
            }));

        // Save to cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: projects,
        }));

        return projects;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        // Fallback to cache if available
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            return JSON.parse(cachedData).data;
        }
        return [];
    }
};

export const fetchReadme = async (repoName: string): Promise<string> => {
    const cacheKey = `readme_${repoName}`;
    const cachedReadme = localStorage.getItem(cacheKey);

    if (cachedReadme) {
        return cachedReadme;
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`, {
            headers: {
                'Accept': 'application/vnd.github.raw+json'
            }
        });

        if (!response.ok) {
            return '# No README found';
        }

        const readme = await response.text();
        localStorage.setItem(cacheKey, readme);
        return readme;
    } catch (error) {
        console.error('Error fetching README:', error);
        return '# Error loading README';
    }
};
