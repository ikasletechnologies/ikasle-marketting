import React from 'react';

interface State {
  error: Error | null;
}

/**
 * Catches render errors and failed lazy-chunk loads for one page (e.g. a tab left
 * open across a deploy requests a chunk that no longer exists) so the header,
 * footer and navigation keep working. Remount it per route with `key`.
 */
export class RouteErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('Page failed to render:', error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '140px 16px 80px', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-dark-navy)', margin: '0 0 12px' }}>This page didn’t load.</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 24px' }}>
            Your connection may have dropped, or the site was just updated. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{ height: 46, padding: '0 22px', border: 0, borderRadius: 999, background: 'var(--color-primary)', color: '#fff', font: 'inherit', fontWeight: 600, cursor: 'pointer' }}
          >
            Reload page
          </button>
        </div>
      </main>
    );
  }
}
