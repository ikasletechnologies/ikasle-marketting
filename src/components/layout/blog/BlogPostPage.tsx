import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock, FileQuestion, Link2, Share2 } from 'lucide-react';
import { BLOG_POSTS, blogPostPath, getPostBySlug, readingMinutes } from '../../../content/blog/posts';
import { getBlogPostMeta } from '../../../seo/pages';
import { applyPageMeta } from '../../../seo/applyMeta';
import NewsletterSignup from '../../ui/NewsletterSignup';
import { Markdown } from './Markdown';
import { parseMarkdown } from './markdownParser';
import { AppLink, PostCover } from './BlogParts';
import { formatPostDate } from './blogMeta';
import './Blog.css';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

const SHARE_TARGETS = [
  { label: 'LinkedIn', href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { label: 'X', href: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { label: 'Facebook', href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { label: 'WhatsApp', href: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
] as const;

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Fallback for browsers/contexts without the async clipboard API (e.g. plain http).
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  }
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const post = getPostBySlug(slug);
  const [copied, setCopied] = useState(false);

  // This page owns its <head> tags (App skips blog posts), so it sets them itself.
  // (App remounts this page per URL, so local state such as `copied` starts fresh.)
  useEffect(() => {
    applyPageMeta(getBlogPostMeta(slug));
  }, [slug]);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const toc = useMemo(
    () => (post ? parseMarkdown(post.body).flatMap((block) => (block.type === 'heading' && block.level === 2 ? [{ id: block.id, text: block.text.replace(/[*`]/g, '') }] : [])) : []),
    [post],
  );

  const related = useMemo(() => {
    if (!post) return [];
    const others = BLOG_POSTS.filter((item) => item.slug !== post.slug);
    return [...others.filter((item) => item.category === post.category), ...others.filter((item) => item.category !== post.category)].slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <main className="blog-page">
        <section className="blog-container blog-missing">
          <FileQuestion size={44} aria-hidden="true" />
          <h1>We couldn’t find that article.</h1>
          <p>It may have moved or the link may be mistyped.</p>
          <AppLink href="/blogs" onNavigate={onNavigate} className="blog-button primary"><ArrowLeft size={18} aria-hidden="true" /> Back to the blog</AppLink>
        </section>
      </main>
    );
  }

  const url = window.location.origin + blogPostPath(post.slug);
  const canNativeShare = typeof navigator.share === 'function';
  const scrollToHeading = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <main className="blog-page">
      <article className="blog-article">
        <header className="blog-article-header">
          <div className="blog-container blog-article-header-inner">
            <nav className="blog-breadcrumb" aria-label="Breadcrumb">
              <AppLink href="/" onNavigate={onNavigate}>Home</AppLink>
              <span aria-hidden="true">/</span>
              <AppLink href="/blogs" onNavigate={onNavigate}>Blog</AppLink>
              <span aria-hidden="true">/</span>
              <AppLink href={`/blogs?category=${encodeURIComponent(post.category)}`} onNavigate={onNavigate}>{post.category}</AppLink>
            </nav>
            <span className="blog-tag">{post.category}</span>
            <h1>{post.title}</h1>
            <p className="blog-article-excerpt">{post.excerpt}</p>
            <div className="blog-meta">
              <span>{post.author}</span>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              <span><Clock size={14} aria-hidden="true" /> {readingMinutes(post)} min read</span>
            </div>
          </div>
        </header>

        <div className="blog-container blog-article-layout">
          <aside className="blog-toc" aria-label="On this page">
            {toc.length > 1 && (
              <>
                <p>On this page</p>
                <ol>
                  {toc.map((item) => (
                    <li key={item.id}><button type="button" onClick={() => scrollToHeading(item.id)}>{item.text}</button></li>
                  ))}
                </ol>
              </>
            )}
          </aside>

          <div className="blog-prose">
            <Markdown source={post.body} onInternalLink={onNavigate} />

            <ul className="blog-card-tags blog-article-tags" aria-label="Tags">
              {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>

            <div className="blog-share" aria-label="Share this article">
              <span className="blog-share-label"><Share2 size={16} aria-hidden="true" /> Share</span>
              {SHARE_TARGETS.map((target) => (
                <a key={target.label} className="blog-share-button" href={target.href(url, post.title)} target="_blank" rel="noopener noreferrer">
                  {target.label}
                </a>
              ))}
              <button type="button" className="blog-share-button" onClick={async () => setCopied(await copyText(url))}>
                {copied ? <><Check size={15} aria-hidden="true" /> Copied</> : <><Link2 size={15} aria-hidden="true" /> Copy link</>}
              </button>
              {canNativeShare && (
                <button
                  type="button"
                  className="blog-share-button"
                  onClick={() => navigator.share({ title: post.title, text: post.excerpt, url }).catch(() => undefined)}
                >
                  More…
                </button>
              )}
              <span className="blog-sr" role="status">{copied ? 'Link copied to clipboard' : ''}</span>
            </div>
          </div>
        </div>
      </article>

      <section className="blog-container blog-related" aria-labelledby="blog-related-title">
        <div className="blog-related-head">
          <h2 id="blog-related-title">Keep reading</h2>
          <AppLink href="/blogs" onNavigate={onNavigate} className="blog-read">All articles <ArrowRight size={16} aria-hidden="true" /></AppLink>
        </div>
        <div className="blog-grid blog-grid-related">
          {related.map((item) => (
            <article key={item.slug} className="blog-card">
              <AppLink href={blogPostPath(item.slug)} onNavigate={onNavigate} className="blog-card-link">
                <PostCover category={item.category} />
                <div className="blog-card-body">
                  <span className="blog-tag">{item.category}</span>
                  <h3>{item.title}</h3>
                  <div className="blog-meta">
                    <time dateTime={item.publishedAt}>{formatPostDate(item.publishedAt)}</time>
                    <span><Clock size={14} aria-hidden="true" /> {readingMinutes(item)} min read</span>
                  </div>
                </div>
              </AppLink>
            </article>
          ))}
        </div>
        <div className="blog-newsletter">
          <NewsletterSignup source="blog-post" />
        </div>
      </section>
    </main>
  );
};

export default BlogPostPage;
