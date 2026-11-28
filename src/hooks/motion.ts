import { useEffect, useState, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

/** True when the visitor asked the OS for reduced motion. */
export const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );

/**
 * Tracks whether an element is on screen.
 * Returns [inView, seen] — `seen` latches true after the first appearance.
 */
export const useInView = (ref: RefObject<Element | null>): [boolean, boolean] => {
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setSeen(true);
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return [inView, seen];
};

/** Eased count from 0 to `target` once `run` turns true. */
export const useCountUp = (target: number, run: boolean, duration = 1600): number => {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run || reduced) return;
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [run, reduced, target, duration]);

  return reduced ? target : value;
};

/** setInterval that only runs while `ms` is a number. */
export const useInterval = (callback: () => void, ms: number | null) => {
  useEffect(() => {
    if (ms === null) return;
    const id = window.setInterval(callback, ms);
    return () => window.clearInterval(id);
  }, [callback, ms]);
};
