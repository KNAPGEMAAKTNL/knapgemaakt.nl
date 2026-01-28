/**
 * Blog post metadata for sitemap generation
 *
 * Note: This file is used by sitemap.xml.ts which can't access Astro Content Collections.
 * Keep this in sync with actual blog posts in src/content/blog/
 */

export interface BlogPostMeta {
	slug: string;
	title: string;
	publishDate: string; // ISO date string
}

/**
 * List of all published blog posts
 * Update this when adding new posts
 */
export const blogPosts: BlogPostMeta[] = [
	{
		slug: "ideal-wordt-wero",
		title: "iDEAL wordt Wero: Wat betekent dit voor jouw webshop?",
		publishDate: "2026-01-29",
	},
];

export function getAllBlogPosts(): BlogPostMeta[] {
	return blogPosts;
}
