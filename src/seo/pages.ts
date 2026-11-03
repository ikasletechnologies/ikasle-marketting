/**
 * Meta for blog posts and the full list of indexable pages. Separate from meta.ts so
 * the article bodies are only bundled with the blog chunk, not the app shell.
 */
import { NOT_FOUND_SECTION, PRIVATE_SECTIONS, ROUTES } from '../routes.ts';
import { BLOG_POSTS, blogPostPath, getPostBySlug } from '../content/blog/posts.ts';
import { DEFAULT_OG_IMAGE, SITE_NAME, getSectionMeta, titleFor, type PageMeta } from './meta.ts';

/** Meta for /blogs/<slug>; unknown slugs get a noindex "not found" entry. */
export function getBlogPostMeta(slug: string): PageMeta {
  const post = getPostBySlug(slug);
  if (!post) return { ...getSectionMeta(NOT_FOUND_SECTION), title: titleFor('Article not found') };
  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    path: blogPostPath(post.slug),
    image: DEFAULT_OG_IMAGE,
    type: 'article',
    noindex: false,
    publishedAt: post.publishedAt,
  };
}

/** Every indexable page: used for the sitemap and for prerendered meta tags. */
export function getPublicPages(): PageMeta[] {
  const sections = Object.keys(ROUTES)
    .filter((section) => !PRIVATE_SECTIONS.has(section))
    .map(getSectionMeta);
  return [...sections, ...BLOG_POSTS.map((post) => getBlogPostMeta(post.slug))];
}
