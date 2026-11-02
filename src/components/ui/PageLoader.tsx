import React from 'react';
import faviconImg from '../../assets/favicon.png';
import './PageLoader.css';

interface PageLoaderProps {
  visible: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ visible }) => (
  <div
    className={'page-loader' + (visible ? ' is-visible' : '')}
    role="status"
    aria-live="polite"
    aria-label="Loading page"
    aria-hidden={!visible}
  >
    <div className="page-loader-card">
      <span className="page-loader-mark">
        <span className="page-loader-ring" />
        <img src={faviconImg} alt="Ikasle Marketing" />
      </span>
      <span className="page-loader-label">Loading</span>
    </div>
  </div>
);

export default PageLoader;