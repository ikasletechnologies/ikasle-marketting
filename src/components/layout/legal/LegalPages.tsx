import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ROUTES } from '../../../routes';
import { BLOG_POSTS, blogPostPath } from '../../../content/blog/posts';
import { COOKIES, FAQ_GROUPS, PRIVACY, TERMS, type LegalDocument } from './legalContent';
import './LegalPages.css';

interface LegalHeroProps {
  overline: string;
  title: string;
  intro: string;
  current: string;
  onHomeClick?: () => void;
}

const LegalHero: React.FC<LegalHeroProps> = ({ overline, title, intro, current, onHomeClick }) => (
  <section className="legal-hero" aria-labelledby="legal-hero-title">
    <div className="legal-hero-inner">
      <span className="legal-hero-overline">{overline}</span>
      <h1 id="legal-hero-title">{title}</h1>
      <p>{intro}</p>
      <nav className="legal-breadcrumb" aria-label="Breadcrumb">
        <button type="button" onClick={onHomeClick}>Home</button>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{current}</span>
      </nav>
    </div>
  </section>
);

interface PageProps {
  onHomeClick?: () => void;
  onContactClick?: () => void;
}

const LegalDocumentPage: React.FC<PageProps & { doc: LegalDocument }> = ({ doc, onHomeClick, onContactClick }) => (
  <main className="legal-page">
    <LegalHero
      overline={doc.overline}
      title={doc.title}
      intro={doc.intro}
      current={doc.title}
      onHomeClick={onHomeClick}
    />

    <div className="legal-body">
      <aside className="legal-toc" aria-label="On this page">
        <h2>On this page</h2>
        <ol>
          {doc.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </aside>

      <article className="legal-content">
        <p className="legal-updated">Last updated: {doc.updated}</p>
        {doc.sections.map((section, index) => (
          <section className="legal-section" id={section.id} key={section.id}>
            <h2>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {section.title}
            </h2>
            {section.body?.map((text) => <p key={text}>{text}</p>)}
            {section.list && (
              <ul>
                {section.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}

        <div className="legal-help">
          <p>Have a question about this page?</p>
          <button type="button" onClick={onContactClick}>
            <span>Contact us</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  </main>
);

export const PrivacyPolicyPage: React.FC<PageProps> = (props) => <LegalDocumentPage doc={PRIVACY} {...props} />;

export const TermsPage: React.FC<PageProps> = (props) => <LegalDocumentPage doc={TERMS} {...props} />;

export const CookiePolicyPage: React.FC<PageProps> = (props) => <LegalDocumentPage doc={COOKIES} {...props} />;

export const FaqPage: React.FC<PageProps> = ({ onHomeClick, onContactClick }) => (
  <main className="legal-page">
    <LegalHero
      overline="HELP"
      title="Frequently asked questions"
      intro="Quick answers about working with IKASLĒ Marketing, our services and how we work."
      current="FAQ"
      onHomeClick={onHomeClick}
    />

    <div className="legal-body legal-body--single">
      <div className="legal-content faq-content">
        {FAQ_GROUPS.map((group) => (
          <section className="faq-group" key={group.title} aria-label={group.title}>
            <h2>{group.title}</h2>
            {group.items.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <ChevronDown size={20} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </section>
        ))}

        <div className="legal-help">
          <p>Still have a question?</p>
          <button type="button" onClick={onContactClick}>
            <span>Start a Conversation</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </main>
);

const SITEMAP_GROUPS: { title: string; prefix?: string; names?: string[] }[] = [
  { title: 'Main Pages', names: ['Home', 'About', 'Services', 'Clients', 'Blogs', 'Careers', 'Contact'] },
  { title: 'Digital Marketing', prefix: '/services/digital-marketing' },
  { title: 'Social Media Marketing', prefix: '/services/social-media-marketing' },
  { title: 'SEO & Search Growth', prefix: '/services/seo-search-growth' },
  { title: 'Brand Growth & Creative', prefix: '/services/brand-growth-creative' },
  { title: 'Help & Legal', names: ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', 'FAQ', 'Sitemap'] },
];

export const SitemapPage: React.FC<PageProps & { onNavigate?: (to: string) => void }> = ({
  onHomeClick,
  onNavigate,
}) => (
  <main className="legal-page">
    <LegalHero
      overline="SITE DIRECTORY"
      title="Sitemap"
      intro="A complete overview of every public page, service, blog article, and resource on IKASLĒ Marketing."
      current="Sitemap"
      onHomeClick={onHomeClick}
    />

    <div className="sitemap-directory">
        {SITEMAP_GROUPS.map((group) => {
          const items = group.names
            ? group.names.map((name) => ({ name, path: ROUTES[name] }))
            : Object.entries(ROUTES)
                .filter(([, p]) => p === group.prefix || p.startsWith(`${group.prefix}/`))
                .map(([name, p]) => ({ name, path: p }));
          return (
            <section className="sitemap-card" key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => {
                        if (!onNavigate || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                        e.preventDefault();
                        onNavigate(item.path);
                      }}
                    >
                      {item.name}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="sitemap-card sitemap-card--wide">
          <h2>Blog Articles</h2>
          <ul>
            {BLOG_POSTS.map((post) => {
              const p = blogPostPath(post.slug);
              return (
                <li key={post.slug}>
                  <a
                    href={p}
                    onClick={(e) => {
                      if (!onNavigate || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      onNavigate(p);
                    }}
                  >
                    {post.title}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="legal-help sitemap-xml">
          <p>Looking for the XML sitemap?</p>
          <a
            href="/sitemap.xml"
          >
            <span>View /sitemap.xml</span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
    </div>
  </main>
);
