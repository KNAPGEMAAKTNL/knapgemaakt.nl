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
		slug: "website-laten-maken-kosten",
		title: "Wat Kost een Website Laten Maken in 2026?",
		publishDate: "2026-01-20",
	},
	{
		slug: "wordpress-vs-moderne-alternatieven",
		title: "WordPress vs Moderne Alternatieven",
		publishDate: "2026-01-18",
	},
	{
		slug: "website-voor-zzp",
		title: "Website voor ZZP'ers",
		publishDate: "2026-01-15",
	},
	{
		slug: "zelf-website-maken-of-laten-maken",
		title: "Zelf Website Maken of Laten Maken?",
		publishDate: "2026-01-12",
	},
];

export function getAllBlogPosts(): BlogPostMeta[] {
	return blogPosts;
}
