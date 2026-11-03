import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Clock, Search, SearchX, Sparkles, X } from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_POSTS, blogPostPath, readingMinutes, type BlogCategory } from '../../../content/blog/posts';
import { useDebounce } from '../../../hooks/useDebounce';
import NewsletterSignup from '../../ui/NewsletterSignup';
import { AppLink, PostCover } from './BlogParts';
import { CATEGORY_ICONS, formatPostDate } from './blogMeta';
import './Blog.css';

interface BlogPageProps {
  onNavigate: (path: string) => void;
  onContactClick: () => void;
}

type Filter = 'All' | BlogCategory;

const isCategory = (value: string | null): value is BlogCategory => BLOG_CATEGORIES.includes(value as BlogCategory);

function readQuery(): { category: Filter; q: string } {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  return { category: isCategory(category) ? category : 'All', q: (params.get('q') || '').slice(0, 100) };
}

const COUNTS = BLOG_POSTS.reduce<Record<string, number>>((acc, post) => {
  acc[post.category] = (acc[post.category] || 0) + 1;
  return acc;
}, {});

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onContactClick }) => {
  const [initial] = useState(readQuery);
  const [category, setCategory] = useState<Filter>(initial.category);
  const [query, setQuery] = useState(initial.q);
  const debouncedQuery = useDebounce(query.trim().toLowerCase(), 180);

  // Mirror filters into the URL (no reload, no new history entry) so a filtered view can be shared.
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'All') params.set('category', category);
    if (debouncedQuery) params.set('q', debouncedQuery);
    const search = params.toString();
    const next = `/blogs${search ? `?${search}` : ''}`;
    if (window.location.pathname === '/blogs' && window.location.pathname + window.location.search !== next) {
      window.history.replaceState(window.history.state, '', next);
    }
  }, [category, debouncedQuery]);

  const posts = useMemo(
    () =>
      BLOG_POSTS.filter((post) => {
        if (category !== 'All' && post.category !== category) return false;
        if (!debouncedQuery) return true;
        const haystack = [post.title, post.excerpt, post.category, ...post.tags].join(' ').toLowerCase();
        return debouncedQuery.split(/\s+/).every((word) => haystack.includes(word));
      }),
    [category, debouncedQuery],
  );

  const showFeatured = category === 'All' && !debouncedQuery && posts.length > 0;
  const [featured, ...rest] = showFeatured ? posts : [undefined, ...posts];
  const clearFilters = () => {
    setCategory('All');
    setQuery('');
  };

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="blog-orb blog-orb-one" aria-hidden="true" />
        <div className="blog-orb blog-orb-two" aria-hidden="true" />
        <div className="blog-container blog-hero-inner">
          <p className="blog-eyebrow"><Sparkles size={15} aria-hidden="true" /> IKASLĒ Insights</p>
          <h1>Ideas that help brands <em>grow.</em></h1>
          <p className="blog-hero-copy">Practical guides on digital marketing, social media, SEO and student acquisition, written by the team that does the work.</p>
          <div className="blog-search" role="search">
            <Search size={20} aria-hidden="true" />
            <label htmlFor="blog-search-input" className="blog-sr">Search articles</label>
            <input
              id="blog-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles, topics or tags"
              maxLength={100}
              autoComplete="off"
            />
            {query && (
              <button type="button" className="blog-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="blog-container blog-listing" aria-label="Articles">
        <div className="blog-filters" role="group" aria-label="Filter by category">
          {(['All', ...BLOG_CATEGORIES] as Filter[]).map((option) => {
            const Icon = option === 'All' ? null : CATEGORY_ICONS[option];
            const count = option === 'All' ? BLOG_POSTS.length : COUNTS[option] || 0;
            return (
              <button
                key={option}
                type="button"
                className={`blog-pill${category === option ? ' active' : ''}`}
                aria-pressed={category === option}
                onClick={() => setCategory(option)}
              >
                {Icon && <Icon size={16} aria-hidden="true" />}
                {option}
                <span className="blog-pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        <p className="blog-results" aria-live="polite">
          {posts.length === 1 ? '1 article' : `${posts.length} articles`}
          {category !== 'All' && <> in <strong>{category}</strong></>}
          {debouncedQuery && <> matching “{debouncedQuery}”</>}
        </p>

        {posts.length === 0 ? (
          <div className="blog-empty">
            <SearchX size={40} aria-hidden="true" />
            {debouncedQuery ? (
              <>
                <h2>No articles match “{debouncedQuery}”.</h2>
                <p>Try a different word, or browse all articles.</p>
              </>
            ) : (
              <>
                <h2>No {category} articles yet.</h2>
                <p>We are working on this category. In the meantime, explore our other articles or tell us what you would like to read.</p>
              </>
            )}
            <div className="blog-empty-actions">
              <button type="button" className="blog-button primary" onClick={clearFilters}>Show all articles</button>
              <button type="button" className="blog-button ghost" onClick={onContactClick}>Suggest a topic</button>
            </div>
          </div>
        ) : (
          <div className="blog-grid">
            {featured && (
              <article className="blog-card blog-card-featured">
                <AppLink href={blogPostPath(featured.slug)} onNavigate={onNavigate} className="blog-card-link">
                  <PostCover category={featured.category} large />
                  <div className="blog-card-body">
                    <span className="blog-tag">Latest · {featured.category}</span>
                    <h2>{featured.title}</h2>
                    <p>{featured.excerpt}</p>
                    <div className="blog-meta">
                      <time dateTime={featured.publishedAt}>{formatPostDate(featured.publishedAt)}</time>
                      <span><Clock size={14} aria-hidden="true" /> {readingMinutes(featured)} min read</span>
                    </div>
                    <span className="blog-read">Read article <ArrowRight size={16} aria-hidden="true" /></span>
                  </div>
                </AppLink>
              </article>
            )}
            {rest.map((post) => post && (
              <article key={post.slug} className="blog-card">
                <AppLink href={blogPostPath(post.slug)} onNavigate={onNavigate} className="blog-card-link">
                  <PostCover category={post.category} />
                  <div className="blog-card-body">
                    <span className="blog-tag">{post.category}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <ul className="blog-card-tags" aria-label="Tags">
                      {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                    <div className="blog-meta">
                      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                      <span><Clock size={14} aria-hidden="true" /> {readingMinutes(post)} min read</span>
                    </div>
                  </div>
                </AppLink>
              </article>
            ))}
          </div>
        )}

        <div className="blog-newsletter">
          <NewsletterSignup source="blog" tone="dark" />
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
