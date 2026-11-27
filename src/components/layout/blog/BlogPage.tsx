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

  const showSpotlight = category === 'All' && !debouncedQuery && posts.length > 0;
  const [spotlight, ...feedPosts] = showSpotlight ? posts : [undefined, ...posts];

  const clearFilters = () => {
    setCategory('All');
    setQuery('');
  };

  return (
    <main className="blog-page">
      {/* Split Editorial Hero */}
      <section className="blog-hero">
        <div className="blog-hero-pattern" aria-hidden="true" />
        <div className="blog-orb blog-orb-one" aria-hidden="true" />
        <div className="blog-orb blog-orb-two" aria-hidden="true" />

        <div className={`blog-container blog-hero-grid${spotlight ? '' : ' is-single'}`}>
          <div className="blog-hero-copy-col">
            <p className="blog-eyebrow">
              <Sparkles size={14} aria-hidden="true" /> IKASLĒ Editorial Journal
            </p>
            <h1>
              Ideas that help brands <em>grow.</em>
            </h1>
            <p className="blog-hero-copy">
              Practical playbooks on digital marketing, social media, SEO and student acquisition — written by the team that builds and scales campaigns every day.
            </p>

            <div className="blog-search" role="search">
              <Search size={19} aria-hidden="true" />
              <label htmlFor="blog-search-input" className="blog-sr">Search articles</label>
              <input
                id="blog-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles, topics or tags..."
                maxLength={100}
                autoComplete="off"
              />
              {query && (
                <button type="button" className="blog-search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="blog-hero-stats" aria-label="Editorial highlights">
              <span><strong>{BLOG_POSTS.length}</strong> Playbooks</span>
              <span className="blog-hero-dot" aria-hidden="true" />
              <span><strong>{BLOG_CATEGORIES.length}</strong> Disciplines</span>
              <span className="blog-hero-dot" aria-hidden="true" />
              <span><strong>Actionable</strong> Guides</span>
            </div>
          </div>

          {spotlight && (
            <article className="blog-spotlight-card">
              <AppLink href={blogPostPath(spotlight.slug)} onNavigate={onNavigate} className="blog-spotlight-link">
                <PostCover category={spotlight.category} large />
                <div className="blog-spotlight-body">
                  <div className="blog-spotlight-top">
                    <span className="blog-tag">Latest Issue</span>
                    <span className="blog-spotlight-time">
                      <Clock size={13} aria-hidden="true" /> {readingMinutes(spotlight)} min read
                    </span>
                  </div>
                  <h2>{spotlight.title}</h2>
                  <p>{spotlight.excerpt}</p>
                  <div className="blog-spotlight-foot">
                    <time dateTime={spotlight.publishedAt}>{formatPostDate(spotlight.publishedAt)}</time>
                    <span className="blog-read">
                      Read article <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </AppLink>
            </article>
          )}
        </div>
      </section>

      {/* Two-Column Sidebar + Bento Magazine Feed */}
      <section className="blog-container blog-listing" aria-label="Articles">
        <div className="blog-workspace">
          <aside className="blog-sidebar" aria-label="Filter by category">
            <div className="blog-sidebar-box">
              <p className="blog-sidebar-heading">Topics</p>
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
                      <span className="blog-pill-main">
                        {Icon && <Icon size={15} aria-hidden="true" />}
                        <span>{option}</span>
                      </span>
                      <span className="blog-pill-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="blog-sidebar-cta">
              <span className="blog-sidebar-cta-tag">Need a Growth Plan?</span>
              <h3>Turn these playbooks into real pipeline.</h3>
              <p>Talk with our team about SEO, paid media, and creative campaigns tailored to your brand.</p>
              <button type="button" className="blog-sidebar-cta-btn" onClick={onContactClick}>
                Let&apos;s Talk <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </aside>

          <div className="blog-feed">
            <div className="blog-feed-bar">
              <p className="blog-results" aria-live="polite">
                Showing <strong>{posts.length}</strong> {posts.length === 1 ? 'article' : 'articles'}
                {category !== 'All' && <> in <strong>{category}</strong></>}
                {debouncedQuery && <> matching “{debouncedQuery}”</>}
              </p>
              {(category !== 'All' || debouncedQuery) && (
                <button type="button" className="blog-reset-link" onClick={clearFilters}>
                  Reset filters
                </button>
              )}
            </div>

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
              <div className="blog-bento-grid">
                {feedPosts.map((post, idx) => {
                  if (!post) return null;
                  const isWide = feedPosts.length >= 3 && idx % 3 === 2;
                  const num = String(idx + 1).padStart(2, '0');
                  return (
                    <article
                      key={post.slug}
                      className={`blog-card${isWide ? ' blog-card-wide' : ''}`}
                    >
                      <AppLink href={blogPostPath(post.slug)} onNavigate={onNavigate} className="blog-card-link">
                        <PostCover category={post.category} large={isWide} />
                        <div className="blog-card-body">
                          <div className="blog-card-head">
                            <span className="blog-tag">{post.category}</span>
                            <span className="blog-card-num">{num}</span>
                          </div>
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
                          <ul className="blog-card-tags" aria-label="Tags">
                            {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
                          </ul>
                          <div className="blog-meta">
                            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                            <span><Clock size={14} aria-hidden="true" /> {readingMinutes(post)} min read</span>
                            <span className="blog-card-arrow">Read <ArrowRight size={14} aria-hidden="true" /></span>
                          </div>
                        </div>
                      </AppLink>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="blog-newsletter">
          <NewsletterSignup source="blog" tone="dark" />
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
