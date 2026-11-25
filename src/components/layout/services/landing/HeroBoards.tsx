import React from 'react';
import {
  BadgeCheck, Check, Globe, Heart, Mail, MapPin, MessageCircle, MousePointer2, Music, Navigation, Phone, Rocket, Save,
  Search, Send, ShoppingCart,
} from 'lucide-react';
import './HeroBoards.css';

/**
 * Service-specific hero illustrations. Each board takes the page's visual title and four labels,
 * so the hero shows the actual work behind that service. Motion is CSS-only (loops pause for
 * prefers-reduced-motion through the page's global rule).
 */
export interface BoardProps { title: string; items: string[] }

const d = (seconds: number) => ({ '--d': `${seconds}s` }) as React.CSSProperties;
const COLORS = ['#0875bc', '#11b9b0', '#35d7d0', '#7fb8e6'];

const Head: React.FC<{ title: string; tag?: string }> = ({ title, tag }) => (
  <div className="sl-board-head"><span><i /><i /><i /></span><b>{title}</b>{tag && <em>{tag}</em>}</div>
);

/* ---------------------------------------------------------------- Digital */

export const PersonaBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Research" />
    <div className="hb-persona">
      {[0, 1].map((p) => (
        <div className="hb-persona-card" key={p}>
          <i className={`hb-avatar a${p}`} />
          <span className="hb-line w80 dark" /><span className="hb-line w50" />
          <div className="hb-tags">{items.slice(p * 2, p * 2 + 2).map((t, j) => <em key={t} className="hb-loop-pop" style={d(0.4 + p * 0.8 + j * 0.4)}>{t}</em>)}</div>
        </div>
      ))}
    </div>
    <div className="hb-compare">
      {['You', 'Competitor A', 'Competitor B'].map((n, i) => (
        <div key={n} className={i === 0 ? 'is-you' : ''}><small>{n}</small><span><i className="hb-grow-x" style={{ width: `${[88, 62, 46][i]}%`, ...d(i * 0.3) }} /></span></div>
      ))}
    </div>
    <Search className="hb-lens" />
  </>
);

export const AdsBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <div className="sl-search-bar"><Search /><span className="hb-type">{title}</span><i className="sl-caret hb-caret" /></div>
    <div className="hb-ad is-you">
      <small><b>Sponsored</b> · {items[1]}</small>
      <strong>{items[0]}</strong>
      <span className="hb-line w90" />
      <div className="hb-sitelinks"><em>{items[2]}</em><em>{items[3]}</em></div>
    </div>
    <div className="hb-ad"><small><b>Sponsored</b> · competitor.com</small><span className="hb-line w70 dark" /><span className="hb-line w90" /></div>
    <MousePointer2 className="hb-cursor" />
    <div className="hb-toast"><Check />Conversion tracked</div>
  </>
);

export const VideoBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <div className="hb-player">
      <span className="hb-play" />
      <b className="hb-adtag">Ad · {title}</b>
      <em className="hb-skip">Skip ad ›</em>
      <div className="hb-progress"><i /></div>
    </div>
    <div className="hb-banners">
      {items.slice(0, 3).map((t, i) => <div key={t} className={`hb-banner b${i} hb-loop-pop`} style={d(0.3 + i * 0.5)}><i /><small>{t}</small></div>)}
    </div>
    <small className="hb-caption">{items[3]}</small>
  </>
);

export const LeadFormBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <div className="sl-post-head"><i /><div><b>{title}</b><small>Sponsored</small></div><span>•••</span></div>
    <div className="hb-ad-media"><span className="hb-shine" /></div>
    <div className="hb-form">
      {items.slice(0, 2).map((t, i) => <label key={t}><small>{t}</small><span><i style={d(0.8 + i * 0.6)} /></span></label>)}
      <button type="button" tabIndex={-1}>{items[3]}<Check /></button>
    </div>
  </>
);

export const ArticleBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Draft" />
    <div className="hb-doc">
      <div className="hb-doc-main">
        <span className="hb-h1line" />
        {items.slice(0, 3).map((t, i) => (
          <div key={t} className="hb-sec">
            <div><b className="hb-loop-pop" style={d(0.4 + i * 0.7)}>H2</b><em>{t}</em></div>
            <span className="hb-line w90 hb-grow-x" style={d(0.6 + i * 0.7)} /><span className="hb-line w70 hb-grow-x" style={d(0.8 + i * 0.7)} />
          </div>
        ))}
      </div>
      <div className="hb-doc-side">
        <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="17" className="hb-rbg" /><circle cx="22" cy="22" r="17" className="hb-rfill" pathLength={1} /></svg>
        <small>{items[3]}</small>
      </div>
    </div>
  </>
);

export const InboxBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Inbox" />
    <ul className="hb-inbox">
      {items.map((t, i) => (
        <li key={t} className={`hb-loop-pop${i === 0 ? ' is-new' : ''}`} style={d(i * 0.35)}>
          <i style={{ background: COLORS[i] }} />
          <div><b>YourBrand</b><small>{t}</small></div>
          <em>{['Now', '2h', '1d', '3d'][i]}</em>
        </li>
      ))}
    </ul>
    <Mail className="hb-fly" />
  </>
);

export const PipelineBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="CRM" />
    <div className="hb-kanban">
      {items.slice(0, 3).map((col, i) => (
        <div key={col} className="hb-col">
          <small>{col}</small>
          <span className="hb-kcard" /><span className="hb-kcard short" />{i < 2 && <span className="hb-kcard" />}
        </div>
      ))}
      <span className="hb-kcard hb-mover"><i />{items[3]}</span>
    </div>
  </>
);

export const AbTestBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Live test" />
    <div className="hb-ab">
      {[0, 1].map((v) => (
        <div key={v} className={`hb-variant${v ? ' is-win' : ''}`}>
          <small>{items[v]}</small>
          <div className="hb-wire"><span /><span className="w70" /><i /><span className="w50" /></div>
          <div className="hb-meter"><i style={{ width: v ? '86%' : '44%' }} /></div>
          <em>{items[2]}</em>
          {v === 1 && <b className="hb-winner">{items[3]}</b>}
        </div>
      ))}
    </div>
  </>
);

export const AnalyticsBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Live" />
    <div className="hb-kpis">
      {items.slice(0, 3).map((t, i) => <div key={t}><small>{t}</small><span><i className="hb-grow-x" style={{ width: `${[72, 56, 84][i]}%`, ...d(i * 0.3) }} /></span></div>)}
    </div>
    <svg viewBox="0 0 400 130" className="hb-chart">
      {[30, 65, 100].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} />)}
      <path className="hb-l2" pathLength={1} d="M0 118 C70 114 110 100 160 103 S250 86 300 82 S370 68 400 64" />
      <path className="hb-l1" pathLength={1} d="M0 104 C60 96 90 70 140 78 S230 48 280 44 S360 20 400 14" />
      <circle className="hb-pulse-dot" cx="400" cy="14" r="5" />
    </svg>
    <div className="hb-legend"><i />{items[3]}<i className="b" />Previous period</div>
  </>
);

export const TrackingBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Debug view" />
    <ul className="hb-events">
      {items.map((t, i) => (
        <li key={t} className="hb-loop-pop" style={d(i * 0.7)}>
          <code>{t}</code>
          <span className="hb-event-dest">GA4 · Ads{i % 2 ? ' · Meta' : ''}</span>
          <em><Check />Fired</em>
        </li>
      ))}
    </ul>
    <div className="hb-toast hb-toast--static"><Check />Tracking verified</div>
  </>
);

/* ---------------------------------------------------------------- Social */

export const PillarsBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Strategy" />
    <div className="hb-pillars">
      <svg viewBox="0 0 42 42" className="hb-donut">
        {[[35, 0], [25, -35], [22, -60], [18, -82]].map(([len, off], i) => (
          <circle key={i} cx="21" cy="21" r="15.9" pathLength={100} style={{ stroke: COLORS[i], strokeDasharray: `${len} ${100 - len}`, strokeDashoffset: off + 25, ...d(i * 0.3) }} />
        ))}
      </svg>
      <ul>{items.map((t, i) => <li key={t} className="hb-loop-pop" style={d(0.3 + i * 0.3)}><i style={{ background: COLORS[i] }} />{t}</li>)}</ul>
    </div>
    <div className="hb-platforms">{['IG', 'FB', 'in', 'YT'].map((p, i) => <span key={p} className="hb-loop-pop" style={d(1.4 + i * 0.2)}>{p}</span>)}</div>
  </>
);

export const ProfileBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <div className="hb-profile-top">
      <i className="hb-ring-avatar" />
      <div className="hb-stats">{['Posts', 'Followers', 'Following'].map((s) => <div key={s}><span className="hb-line w60 dark" /><small>{s}</small></div>)}</div>
    </div>
    <b className="hb-name">{title}<BadgeCheck className="hb-verified" /></b>
    <span className="hb-line w90" /><span className="hb-line w70" />
    <div className="hb-actions"><span>Follow</span><span>Message</span><span>Contact</span></div>
    <div className="hb-highlights">
      {items.map((t, i) => <div key={t}><i style={{ background: `linear-gradient(140deg, ${COLORS[i]}, #071d35)` }} /><small>{t}</small><Check className="hb-ok hb-loop-pop" style={d(0.6 + i * 0.5)} /></div>)}
    </div>
  </>
);

export const QueueBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Scheduler" />
    <ul className="hb-queue">
      {items.map((t, i) => (
        <li key={t}>
          <i className={`hb-thumb t${i}`} />
          <div><b>{t}</b><span className="hb-line w70" /></div>
          <em className="hb-status" style={d(0.8 + i * 0.9)}><span>Scheduled</span><span>Published</span></em>
        </li>
      ))}
    </ul>
  </>
);

const CAL: Record<number, number> = { 1: 0, 3: 1, 6: 2, 8: 0, 10: 3, 12: 1, 15: 0, 17: 2, 19: 1, 22: 3, 24: 0, 26: 2 };
export const CalendarBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="This month" />
    <div className="hb-cal">
      {'MTWTFSS'.split('').map((day, i) => <small key={i}>{day}</small>)}
      {Array.from({ length: 28 }, (_, i) => (
        <span key={i}>{CAL[i] !== undefined && <i className="hb-loop-pop" style={{ background: COLORS[CAL[i]], ...d(i * 0.12) }} />}</span>
      ))}
    </div>
    <div className="hb-cal-legend">{items.map((t, i) => <em key={t}><i style={{ background: COLORS[i] }} />{t}</em>)}</div>
  </>
);

export const CarouselBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Carousel" />
    <div className="hb-car">
      <div className="hb-car-track">
        {items.map((t, i) => <div key={t} className={`hb-slide s${i}`}><small>{i + 1}/{items.length}</small><b>{t}</b><span className="hb-line w70 light" /><span className="hb-line w50 light" /></div>)}
      </div>
    </div>
    <div className="hb-dots">{items.map((t, i) => <i key={t} style={d(i * 1.5)} />)}</div>
  </>
);

export const ReelBoard: React.FC<BoardProps> = ({ title, items }) => (
  <div className="hb-reel-wrap">
    <div className="hb-reel">
      <div className="hb-reel-bar"><i /></div>
      <span className="hb-reel-play" />
      <div className="hb-reel-side"><Heart /><MessageCircle /><Send /></div>
      <div className="hb-reel-cap"><b>{title}</b><small><Music /><span className="hb-marquee"><span>Original audio · {title} · Original audio</span></span></small></div>
      {[0, 1, 2].map((i) => <span key={i} className="hb-heart" style={d(i * 0.8)}><Heart /></span>)}
    </div>
    <ul className="hb-reel-stats">
      {items.map((t, i) => <li key={t}><small>{t}</small><span><i className="hb-grow-x" style={{ width: `${[90, 74, 60, 48][i]}%`, ...d(i * 0.3) }} /></span></li>)}
    </ul>
  </div>
);

export const ChatBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Messages" />
    <div className="hb-chat">
      {items.map((t, i) => <p key={t} className={`hb-loop-pop ${i % 2 ? 'out' : 'in'}`} style={d(i * 1)}>{t}</p>)}
      <span className="hb-typing"><i /><i /><i /></span>
    </div>
  </>
);

export const CreatorsBoard: React.FC<BoardProps> = ({ title, items }) => (
  <div className="hb-creators">
    <svg viewBox="0 0 400 260" preserveAspectRatio="none" aria-hidden="true" className="hb-bg-svg">
      {[70, 200, 330].map((x) => <path key={x} className="hb-link-line" pathLength={1} d={`M200 70 C200 120 ${x} 110 ${x} 150`} />)}
    </svg>
    <div className="hb-brand-dot">{title}</div>
    {items.slice(0, 3).map((t, i) => (
      <div key={t} className={`hb-creator c${i}${i === 1 ? ' is-match' : ''}`}>
        <i style={{ background: `linear-gradient(140deg, ${COLORS[i]}, #ffd27a)` }} />
        <b>{t}</b>
        <span><i className="hb-grow-x" style={{ width: `${[64, 88, 52][i]}%`, ...d(i * 0.3) }} /></span>
        {i === 1 && <em className="hb-match hb-loop-pop" style={d(1.4)}>{items[3]}</em>}
      </div>
    ))}
  </div>
);

/* ---------------------------------------------------------------- SEO */

export const AuditBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Audit" />
    <div className="hb-audit">
      <div className="hb-gauge">
        <svg viewBox="0 0 120 70"><path className="hb-gbg" d="M10 62 A50 50 0 0 1 110 62" /><path className="hb-gfill" pathLength={1} d="M10 62 A50 50 0 0 1 110 62" /></svg>
        <b>Site health</b>
      </div>
      <ul>{items.map((t, i) => <li key={t} className="hb-loop-pop" style={d(0.4 + i * 0.5)}><span className={i === 2 ? 'warn' : 'ok'}>{i === 2 ? '!' : <Check />}</span>{t}</li>)}</ul>
    </div>
  </>
);

const INTENT = [['Commercial', 'c'], ['Local', 'l'], ['Informational', 'i'], ['Transactional', 't']];
export const KeywordsBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Research" />
    <div className="hb-kw hb-kw-head"><small>Keyword</small><small>Volume</small><small>Intent</small></div>
    {items.map((t, i) => (
      <div className="hb-kw hb-loop-pop" key={t} style={d(i * 0.5)}>
        <b>{t}</b>
        <span><i style={{ width: `${[92, 70, 56, 38][i]}%` }} /></span>
        <em className={INTENT[i][1]}>{INTENT[i][0]}</em>
      </div>
    ))}
  </>
);

export const VitalsBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Site health" />
    <div className="hb-vitals">
      {items.slice(0, 3).map((t, i) => (
        <div key={t}>
          <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="17" className="hb-rbg" /><circle cx="22" cy="22" r="17" className="hb-rfill" pathLength={1} style={d(i * 0.4)} /></svg>
          <b>{t}</b><small>Good</small>
        </div>
      ))}
    </div>
    <div className="hb-tree">
      <span className="hb-root">/</span>
      <div>{['/services', '/blog', '/about'].map((p, i) => <span key={p}>{p}<Check className="hb-loop-pop" style={d(0.8 + i * 0.4)} /></span>)}</div>
      <em>{items[3]}</em>
    </div>
  </>
);

export const SnippetBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title="Search preview" tag="Optimised" />
    <div className="hb-serp">
      <small><Globe />yourbrand.com › services</small>
      <b className="hb-type">{title}</b>
      <span className="hb-line w90" /><span className="hb-line w70" />
    </div>
    <div className="hb-onpage">{items.map((t, i) => <span key={t} className="hb-loop-pop" style={d(0.6 + i * 0.5)}><Check />{t}</span>)}</div>
  </>
);

export const MapBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <div className="hb-map">
      <svg viewBox="0 0 400 190" preserveAspectRatio="none" aria-hidden="true" className="hb-bg-svg">
        <path d="M0 60 H400 M0 140 H400 M90 0 V190 M250 0 V190 M0 10 L400 170" />
        <path className="hb-river" d="M0 100 C80 80 150 130 230 105 S340 70 400 90" />
      </svg>
      {[[18, 30], [70, 22], [80, 70], [36, 78]].map(([x, y], i) => <MapPin key={i} className="hb-pin hb-loop-pop" style={{ left: `${x}%`, top: `${y}%`, ...d(0.3 + i * 0.3) }} />)}
      <div className="hb-you-pin"><span className="hb-pin-pulse" /><MapPin /></div>
      <div className="hb-map-card"><b>{title}</b><span>★★★★★</span><small>{items[0]}</small></div>
    </div>
    <div className="hb-chiprow">{items.slice(1).map((t, i) => <em key={t} className="hb-loop-pop" style={d(1 + i * 0.3)}>{t}</em>)}</div>
  </>
);

const GBP_ICONS = [Phone, Navigation, Globe, Save];
export const ListingBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <div className="hb-gbp-photos"><i /><i /><i /></div>
    <b className="hb-gbp-name">{title}</b>
    <div className="hb-stars"><span className="hb-star-fill">★★★★★</span><small>Google reviews</small></div>
    <small className="hb-gbp-cat">Local business · <span>Open now</span></small>
    <div className="hb-gbp-actions">
      {items.map((t, i) => { const Icon = GBP_ICONS[i % 4]; return <span key={t} style={d(i * 0.6)}><Icon />{t}</span>; })}
    </div>
  </>
);

export const ClusterBoard: React.FC<BoardProps> = ({ title, items }) => {
  const nodes: [number, number][] = [[70, 60], [330, 60], [70, 190], [330, 190], [200, 20], [200, 228]];
  return (
    <svg viewBox="0 0 400 250" className="hb-cluster" aria-hidden="true">
      {nodes.map(([x, y], i) => <line key={i} className="hb-cl-line" x1="200" y1="125" x2={x} y2={y} pathLength={1} style={d(i * 0.2)} />)}
      {nodes.map(([x, y], i) => <circle key={`n${i}`} className="hb-cl-node hb-loop-pop" cx={x} cy={y} r={i < 4 ? 9 : 6} style={d(0.4 + i * 0.2)} />)}
      <circle className="hb-cl-core" cx="200" cy="125" r="34" />
      <text x="200" y="121" textAnchor="middle" className="hb-cl-core-t">{title.split(' ')[0]}</text>
      <text x="200" y="137" textAnchor="middle" className="hb-cl-core-t">{title.split(' ').slice(1).join(' ')}</text>
      {items.map((t, i) => <text key={t} x={nodes[i][0]} y={nodes[i][1] + (i < 2 ? -16 : 26)} textAnchor="middle" className="hb-cl-label">{t}</text>)}
    </svg>
  );
};

export const BacklinksBoard: React.FC<BoardProps> = ({ title, items }) => {
  const ys = [40, 100, 160, 220];
  return (
    <div className="hb-backlinks">
      <svg viewBox="0 0 400 260" aria-hidden="true" className="hb-bg-svg">
        {ys.map((y) => <path key={y} className="hb-bl-path" d={`M150 ${y} C230 ${y} 240 130 300 130`} />)}
      </svg>
      {items.map((t, i) => <span key={t} className="hb-site" style={{ top: `${(ys[i] / 260) * 100}%` }}><Globe />{t}</span>)}
      {ys.map((y, i) => <i key={y} className="hb-bl-dot" style={{ offsetPath: `path('M150 ${y} C230 ${y} 240 130 300 130')`, ...d(i * 0.7) } as React.CSSProperties} />)}
      <div className="hb-target"><b>{title}</b><small>Authority</small><span><i /></span></div>
    </div>
  );
};

export const ProductsBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Store" />
    <div className="hb-products">
      {items.map((t, i) => (
        <div key={t} className="hb-prod">
          <i className={`p${i}`} />
          <b>{t}</b>
          <small>★★★★★</small>
          <span className="hb-price" />
        </div>
      ))}
    </div>
    <div className="hb-cart"><ShoppingCart /><b className="hb-cart-count">+1</b></div>
  </>
);

/* ---------------------------------------------------------------- Brand */

export const NotesBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Insights" />
    <div className="hb-notes">{items.map((t, i) => <p key={t} className={`n${i} hb-drop`} style={d(i * 0.6)}>“{t}”</p>)}</div>
    <Search className="hb-lens" />
  </>
);

export const QuadrantBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Market map" />
    <div className="hb-quad">
      <span className="hb-qx" /><span className="hb-qy" />
      <small className="t">{items[0]}</small><small className="b">{items[1]}</small><small className="l">{items[2]}</small><small className="r">{items[3]}</small>
      {[[22, 30], [30, 70], [70, 74], [62, 62], [18, 58]].map(([x, y], i) => <i key={i} className="hb-comp" style={{ left: `${x}%`, top: `${y}%` }} />)}
      <b className="hb-you">You</b>
    </div>
  </>
);

export const HouseBoard: React.FC<BoardProps> = ({ title, items }) => (
  <div className="hb-house">
    <div className="hb-roof hb-stack" style={d(1.2)}><small>Core message</small><b>{title}</b></div>
    <div className="hb-cols">{items.slice(0, 3).map((t, i) => <div key={t} className="hb-stack" style={d(0.6 + i * 0.15)}><small>Pillar {i + 1}</small>{t}</div>)}</div>
    <div className="hb-base hb-stack" style={d(0.2)}><small>Voice</small>{items[3]}</div>
  </div>
);

export const BookBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <div className="hb-book">
      <div className="hb-page">
        <small>{title}</small>
        <div className="hb-clear">
          <svg viewBox="0 0 100 100"><path d="M14 8 C40 22 44 78 14 92 Z" fill="#0b4f8a" /><path d="M40 50 C44 22 64 8 92 8 C88 36 70 50 40 50Z" fill="#11b9b0" /><path d="M40 50 C70 50 88 64 92 92 C64 92 44 78 40 50Z" fill="#5fc9d6" /></svg>
        </div>
        <span className="hb-line w70" /><span className="hb-line w50" />
      </div>
      <div className="hb-page">
        <div className="hb-sw">{['#071d35', '#0875bc', '#11b9b0', '#35d7d0'].map((c) => <i key={c} style={{ background: c }} />)}</div>
        <b className="hb-aa">Aa</b>
        <span className="hb-line w90" /><span className="hb-line w70" /><span className="hb-line w50" />
      </div>
      <div className="hb-flip" />
    </div>
    <div className="hb-chiprow">{items.map((t, i) => <em key={t} className="hb-loop-pop" style={d(0.4 + i * 0.3)}>{t}</em>)}</div>
  </>
);

export const PrintBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <div className="hb-print">
      <div className="hb-brochure"><i /><i /><i /></div>
      <div className="hb-flyer"><span /><b>{title}</b><span className="hb-line w70" /><span className="hb-line w50" /><em>Book now</em></div>
      <div className="hb-bcard"><i /><span className="hb-line w60 dark" /><span className="hb-line w40" /></div>
    </div>
    <div className="hb-chiprow">{items.map((t, i) => <em key={t} className="hb-loop-pop" style={d(0.4 + i * 0.3)}>{t}</em>)}</div>
  </>
);

export const BrowserBoard: React.FC<BoardProps> = ({ title, items }) => (
  <div className="hb-web">
    <div className="hb-browser">
      <div className="hb-bbar"><span><i /><i /><i /></span><em>{title}</em></div>
      <div className="hb-webpage">
        <nav><b className="hb-logo-dot" />{items.map((t) => <small key={t}>{t}</small>)}</nav>
        <div className="hb-hero-block hb-loop-pop" style={d(0.3)}><span className="hb-line w70 dark" /><span className="hb-line w50" /><em>Get started</em></div>
        <div className="hb-cards">{[0, 1, 2].map((i) => <i key={i} className="hb-loop-pop" style={d(0.8 + i * 0.25)} />)}</div>
      </div>
    </div>
    <div className="hb-phone hb-loop-pop" style={d(1.6)}><i /><span /><span /><span /></div>
  </div>
);

export const StoryboardBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Storyboard" />
    <div className="hb-story">
      {items.map((t, i) => (
        <div key={t} className="hb-frame hb-light" style={d(i * 0.9)}>
          <div className={`hb-scene s${i}`}><i /></div>
          <small>{i + 1}. {t}</small>
        </div>
      ))}
    </div>
  </>
);

export const TouchpointsBoard: React.FC<BoardProps> = ({ title, items }) => (
  <div className="hb-tp">
    <div className="hb-tp-ring" />
    <div className="hb-tp-core"><b>{title}</b></div>
    <div className="hb-tp-orbit">
      {items.map((t, i) => <span key={t} style={{ '--a': `${i * 90}deg` } as React.CSSProperties}><em>{t}</em></span>)}
    </div>
  </div>
);

export const LaunchBoard: React.FC<BoardProps> = ({ title, items }) => (
  <>
    <Head title={title} tag="Countdown" />
    <div className="hb-launch">
      <div className="hb-pad">
        <div className="hb-count"><b>3</b><b>2</b><b>1</b></div>
        <Rocket className="hb-rocket" />
        <span className="hb-flame" />
        {[0, 1, 2, 3, 4].map((i) => <i key={i} className="hb-confetti" style={{ left: `${20 + i * 15}%`, ...d(i * 0.3) }} />)}
      </div>
      <ol>{items.map((t, i) => <li key={t} className="hb-loop-pop" style={d(0.4 + i * 0.5)}><span>{i + 1}</span>{t}</li>)}</ol>
    </div>
  </>
);
