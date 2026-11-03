import React from 'react';
import { AlertTriangle, Info, Lightbulb } from 'lucide-react';
import { highlight } from './highlight';
import { isSafeHref, parseMarkdown } from './markdownParser';

/**
 * Minimal Markdown renderer for blog articles (IKAS-202).
 *
 * Supported: ## / ### headings, paragraphs, - and 1. lists, pipe tables, ``` fenced
 * code (with language), > quotes, > [!TIP|NOTE|WARNING] Title callouts, --- rules,
 * and inline **bold**, *italic*, `code` and [links](/path).
 *
 * Output is built from React elements (never innerHTML), and links are limited to
 * http(s), mailto, site-relative and #anchor URLs, so content cannot inject markup.
 */

interface InlineOptions {
  onInternalLink?: (path: string) => void;
}

const INLINE = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)|(\[[^\]]+\]\([^)\s]+\))/g;

function renderInline(text: string, options: InlineOptions = {}, keyPrefix = 'i'): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(INLINE)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const token = match[0];
    const key = `${keyPrefix}-${index++}`;
    if (match[1]) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (match[2]) {
      nodes.push(<strong key={key}>{renderInline(token.slice(2, -2), options, key)}</strong>);
    } else if (match[3]) {
      nodes.push(<em key={key}>{renderInline(token.slice(1, -1), options, key)}</em>);
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      const label = link?.[1] ?? token;
      const href = link?.[2] ?? '';
      if (!link || !isSafeHref(href)) {
        nodes.push(label);
      } else if (href.startsWith('/')) {
        nodes.push(
          <a
            key={key}
            href={href}
            onClick={(event) => {
              if (!options.onInternalLink || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
              event.preventDefault();
              options.onInternalLink(href);
            }}
          >
            {label}
          </a>,
        );
      } else {
        nodes.push(
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>,
        );
      }
    }
    last = start + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const CALLOUT_ICONS = { tip: Lightbulb, note: Info, warning: AlertTriangle } as const;

interface MarkdownProps extends InlineOptions {
  source: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ source, onInternalLink }) => {
  const blocks = React.useMemo(() => parseMarkdown(source), [source]);
  const options = { onInternalLink };

  return (
    <>
      {blocks.map((block, b) => {
        const key = `b${b}`;
        switch (block.type) {
          case 'heading': {
            const Tag = block.level === 2 ? 'h2' : 'h3';
            return <Tag key={key} id={block.id}>{renderInline(block.text, options, key)}</Tag>;
          }
          case 'paragraph':
            return <p key={key}>{renderInline(block.text, options, key)}</p>;
          case 'list': {
            const Tag = block.ordered ? 'ol' : 'ul';
            return (
              <Tag key={key}>
                {block.items.map((item, n) => <li key={n}>{renderInline(item, options, `${key}-${n}`)}</li>)}
              </Tag>
            );
          }
          case 'code':
            return (
              <figure key={key} className="md-code">
                {block.lang && <figcaption>{block.lang}</figcaption>}
                <pre><code className={block.lang ? `language-${block.lang}` : undefined}>{highlight(block.code, block.lang)}</code></pre>
              </figure>
            );
          case 'quote':
            return <blockquote key={key}>{renderInline(block.text, options, key)}</blockquote>;
          case 'callout': {
            const Icon = CALLOUT_ICONS[block.kind];
            return (
              <aside key={key} className={`md-callout md-callout-${block.kind}`} role="note">
                <Icon aria-hidden="true" />
                <div>
                  {block.title && <strong>{renderInline(block.title, options, key)}</strong>}
                  {block.text && <p>{renderInline(block.text, options, `${key}-t`)}</p>}
                </div>
              </aside>
            );
          }
          case 'table':
            return (
              <div key={key} className="md-table">
                <table>
                  <thead><tr>{block.head.map((cell, c) => <th key={c} scope="col">{renderInline(cell, options, `${key}-h${c}`)}</th>)}</tr></thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r}>{row.map((cell, c) => <td key={c}>{renderInline(cell, options, `${key}-${r}-${c}`)}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'rule':
            return <hr key={key} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default Markdown;
