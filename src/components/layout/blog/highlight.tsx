import React from 'react';

/**
 * Tiny token-based syntax highlighter for blog code blocks: comments, strings,
 * numbers, keywords, JSON keys and URL query parameters. Returns React nodes
 * (no innerHTML), and unknown languages render as plain text.
 */

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'new', 'class', 'import', 'export',
  'from', 'async', 'await', 'try', 'catch', 'throw', 'typeof', 'true', 'false', 'null', 'undefined', 'this',
]);

type Rule = [className: string, pattern: RegExp];

const RULES: Record<string, Rule[]> = {
  js: [
    ['tok-comment', /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
    ['tok-string', /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/y],
    ['tok-number', /\b\d+(?:\.\d+)?\b/y],
    ['tok-word', /[A-Za-z_$][\w$]*/y],
  ],
  json: [
    ['tok-key', /"(?:\\.|[^"\\\n])*"(?=\s*:)/y],
    ['tok-string', /"(?:\\.|[^"\\\n])*"/y],
    ['tok-number', /-?\b\d+(?:\.\d+)?\b/y],
    ['tok-keyword', /\b(?:true|false|null)\b/y],
  ],
  url: [
    ['tok-key', /(?<=[?&])[\w.-]+(?==)/y],
    ['tok-string', /(?<==)[^&\s]+/y],
    ['tok-punct', /[?&=]/y],
  ],
};

const ALIASES: Record<string, string> = { javascript: 'js', ts: 'js', typescript: 'js', jsx: 'js', tsx: 'js', bash: 'url', sh: 'url', url: 'url', json: 'json' };

export function highlight(code: string, lang: string): React.ReactNode {
  const rules = RULES[ALIASES[lang] ?? lang];
  if (!rules) return code;

  const nodes: React.ReactNode[] = [];
  let plain = '';
  let pos = 0;
  const flush = () => {
    if (plain) nodes.push(plain);
    plain = '';
  };

  outer: while (pos < code.length) {
    for (const [className, pattern] of rules) {
      pattern.lastIndex = pos;
      const match = pattern.exec(code);
      if (match && match[0].length) {
        let cls = className;
        if (cls === 'tok-word') {
          if (!KEYWORDS.has(match[0])) {
            plain += match[0];
            pos += match[0].length;
            continue outer;
          }
          cls = 'tok-keyword';
        }
        flush();
        nodes.push(<span key={pos} className={cls}>{match[0]}</span>);
        pos += match[0].length;
        continue outer;
      }
    }
    plain += code[pos];
    pos += 1;
  }
  flush();
  return nodes;
}
