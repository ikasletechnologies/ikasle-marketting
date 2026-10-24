import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { FAQ_GROUPS, PRIVACY, TERMS, type LegalDocument } from './legalContent';
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
