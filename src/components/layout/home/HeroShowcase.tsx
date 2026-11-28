import React, { useCallback, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  ArrowUp,
  Bookmark,
  CalendarCheck,
  Check,
  Globe,
  Heart,
  Mail,
  Megaphone,
  MessageCircle,
  MousePointer2,
  Play,
  Search,
  Send,
  Target,
  ThumbsUp,
  TrendingUp,
  UserPlus,
  Zap,
} from 'lucide-react';
import { useCountUp, useInView, useInterval, usePrefersReducedMotion } from '../../../hooks/motion';
import './HeroShowcase.css';

const ORBIT_ICONS = [Search, Megaphone, Mail, Heart, Target, Globe, Play, ThumbsUp];

const TOASTS = [
  { Icon: UserPlus, title: 'New lead captured', meta: 'Website contact form', tone: 'teal' },
  { Icon: CalendarCheck, title: 'Strategy call booked', meta: 'Tomorrow · 11:00 AM', tone: 'blue' },
  { Icon: TrendingUp, title: '+246 new followers', meta: 'Instagram · last hour', tone: 'navy' },
  { Icon: Mail, title: 'Newsletter delivered', meta: '41% open rate', tone: 'teal' },
] as const;

/** Rank sequence for the SEO card: climbs to #1, holds, then replays. */
const RANKS = [9, 7, 5, 3, 2, 1, 1, 1, 1, 1];

const CHANNELS = [
  { name: 'Social', value: 82 },
  { name: 'Search', value: 68 },
  { name: 'Ads', value: 91 },
];

const LINE = 'M0 95 C20 92 28 86 40 88 S68 96 80 92 S108 72 120 70 S150 78 160 74 S188 52 200 50 S230 60 240 56 S268 32 280 28 S308 20 320 18';
const PREV = 'M0 102 C40 100 80 98 120 92 S200 86 240 80 S300 72 320 68';

const fmt = (n: number) => n.toLocaleString('en-US');

export const HeroShowcase: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, seen] = useInView(rootRef);
  const reduced = usePrefersReducedMotion();
  const live = inView && !reduced;

  const [state, setState] = useState({ tick: 0, visitors: 0, likes: 0, leads: 0 });

  const onTick = useCallback(() => {
    setState((s) => ({
      tick: s.tick + 1,
      visitors: s.visitors + 3 + Math.floor(Math.random() * 14),
      likes: s.likes + 1 + Math.floor(Math.random() * 6),
      leads: s.leads + (Math.random() > 0.6 ? 1 : 0),
    }));
  }, []);
  useInterval(onTick, live ? 1400 : null);

  const visitors = useCountUp(48392, seen) + state.visitors;
  const leads = useCountUp(1284, seen, 1400) + state.leads;
  const likes = useCountUp(12840, seen, 1800) + state.likes;
  const rank = reduced ? 1 : RANKS[state.tick % RANKS.length];
  const toastIndex = reduced ? 0 : Math.floor(state.tick / 2) % TOASTS.length;
  const toast = TOASTS[toastIndex];

  return (
    <div className={`hx-root${inView ? '' : ' hx-paused'}`} ref={rootRef} aria-hidden="true">
      <div className="hx-stage">
        {/* Orbiting channels */}
        <div className="hx-orbit">
          <div className="hx-orbit-ring hx-orbit-ring--outer" />
          <div className="hx-orbit-ring hx-orbit-ring--inner" />
          <div className="hx-orbit-spin">
            {ORBIT_ICONS.map((Icon, i) => (
              <span
                key={i}
                className="hx-orb"
                style={{ '--a': `${(360 / ORBIT_ICONS.length) * i}deg` } as CSSProperties}
              >
                <span className="hx-orb-inner">
                  <Icon />
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Main dashboard */}
        <div className="hx-card hx-dash" style={{ '--d': '200ms' } as CSSProperties}>
          <div className="hx-dash-top">
            <span className="hx-dots"><i /><i /><i /></span>
            <span className="hx-dash-title">Campaign performance</span>
            <span className="hx-live"><i />Live</span>
          </div>

          <div className="hx-kpis">
            <div className="hx-kpi">
              <small>Visitors today</small>
              <b>{fmt(visitors)}</b>
              <em><ArrowUp />38%</em>
            </div>
            <div className="hx-kpi">
              <small>New leads</small>
              <b>{fmt(leads)}</b>
              <em><ArrowUp />24%</em>
            </div>
            <div className="hx-kpi">
              <small>Click rate</small>
              <b>6.8%</b>
              <em><ArrowUp />1.2</em>
            </div>
          </div>

          <div className="hx-chart">
            <svg viewBox="-8 -10 336 132">
              <defs>
                <linearGradient id="hx-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#00a99d" stopOpacity="0.32" />
                  <stop offset="1" stopColor="#00a99d" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="hx-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#2178a7" />
                  <stop offset="1" stopColor="#00c2b2" />
                </linearGradient>
              </defs>
              {[20, 50, 80, 110].map((y) => (
                <line key={y} x1="0" x2="320" y1={y} y2={y} className="hx-grid" />
              ))}
              <path d={PREV} className="hx-prev" />
              <path d={`${LINE} L320 120 L0 120 Z`} fill="url(#hx-area)" className="hx-area" />
              <path d={LINE} pathLength={1} className="hx-line" />
              <circle cx="320" cy="18" r="11" className="hx-pulse" />
              <circle cx="320" cy="18" r="5" className="hx-dot" />
            </svg>
            <span className="hx-tip"><TrendingUp />+38% this week</span>
          </div>

          <div className="hx-dash-foot">
            <div className="hx-channels">
              {CHANNELS.map(({ name, value }, i) => (
                <div className="hx-ch" key={name}>
                  <span>{name}</span>
                  <div className="hx-ch-bar">
                    <i style={{ '--v': `${value}%`, '--i': i } as CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
            <div className="hx-boost">
              <span className="hx-boost-a"><Zap />Boost campaign</span>
              <span className="hx-boost-b"><Check />Boosted</span>
              <i className="hx-ripple" />
              <MousePointer2 className="hx-cursor" />
            </div>
          </div>
        </div>

        {/* Social post */}
        <div className="hx-card hx-social" style={{ '--d': '420ms' } as CSSProperties}>
          <div className="hx-social-head">
            <span className="hx-avatar" />
            <div>
              <b>Your Brand</b>
              <small>Sponsored</small>
            </div>
          </div>
          <div className="hx-social-media">
            <span className="hx-sun" />
            <span className="hx-hill hx-hill--1" />
            <span className="hx-hill hx-hill--2" />
            <span className="hx-social-tag">New launch</span>
          </div>
          <div className="hx-social-actions">
            <span className="hx-heart">
              <Heart />
              <i /><i /><i />
            </span>
            <MessageCircle />
            <Send />
            <Bookmark className="hx-bookmark" />
          </div>
          <p className="hx-likes"><b>{fmt(likes)}</b> likes</p>
        </div>

        {/* SEO rank */}
        <div className="hx-card hx-seo" style={{ '--d': '560ms' } as CSSProperties}>
          <div className="hx-seo-head">
            <span className="hx-seo-icon"><Search /></span>
            <small>Search ranking</small>
          </div>
          <p className="hx-seo-query">“digital marketing agency”</p>
          <div className="hx-seo-rank">
            <b key={rank} className={rank === 1 ? 'is-top' : ''}>#{rank}</b>
            <span className={`hx-seo-up${rank === 1 ? ' is-top' : ''}`}>
              <ArrowUp />
              {rank === 1 ? 'Top spot' : `${9 - rank} spots`}
            </span>
          </div>
        </div>

        {/* Lead notifications */}
        <div className="hx-toast-wrap" style={{ '--d': '700ms' } as CSSProperties}>
          <div key={toastIndex} className={`hx-card hx-toast hx-toast--${toast.tone}`}>
            <span className="hx-toast-icon"><toast.Icon /></span>
            <div>
              <b>{toast.title}</b>
              <small>{toast.meta}</small>
            </div>
            <span className="hx-toast-time">now</span>
          </div>
        </div>

        {/* Conversion goal ring */}
        <div className="hx-card hx-goal" style={{ '--d': '840ms' } as CSSProperties}>
          <svg viewBox="0 0 44 44" className="hx-goal-ring">
            <circle cx="22" cy="22" r="18" className="hx-goal-track" />
            <circle cx="22" cy="22" r="18" pathLength={100} className="hx-goal-value" />
          </svg>
          <div>
            <small>Conversion goal</small>
            <b>82%</b>
            <span>Ahead of target</span>
          </div>
        </div>

        {/* Ambient sparkles */}
        <div className="hx-sparkles">
          {Array.from({ length: 7 }, (_, i) => (
            <i key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroShowcase;
