import { lazy, type ComponentType } from 'react';

/**
 * React.lazy for a module's *named* export, so each page becomes its own chunk
 * without changing how the page component is exported (IKAS-502).
 */
export function lazyNamed<P, K extends string>(load: () => Promise<Record<K, ComponentType<P>>>, name: K) {
  return lazy(async () => ({ default: (await load())[name] }));
}
