import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import logoImg from '../../../assets/logo-clean.png';
import { ROUTES, isServiceSection, sectionFromPath, normalise } from '../../../routes';
import './Header.css';

type ServiceGroup = { title: string; target: string; items: { label: string; target: string }[] };

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: 'Digital Marketing', target: 'Digital Marketing', items: [
      { label: 'Digital Marketing Strategy', target: 'Digital Marketing Strategy' },
      { label: 'Audience & Competitor Research', target: 'Audience & Competitor Research' },
      { label: 'Google Search Ads', target: 'Google Search Ads' },
      { label: 'Display & YouTube Advertising', target: 'Display & YouTube Advertising' },
      { label: 'Meta Advertising', target: 'Meta Advertising' },
      { label: 'Content Marketing', target: 'Content Marketing' },
      { label: 'Email Marketing', target: 'Email Marketing' },
      { label: 'Lead Generation & Nurturing', target: 'Lead Generation & Nurturing' },
      { label: 'Landing Pages & CRO', target: 'Landing Pages & CRO' },
      { label: 'Analytics & Conversion Tracking', target: 'Analytics & Conversion Tracking' },
    ],
  },
  {
    title: 'Social Media Marketing', target: 'Social Media Marketing', items: [
      { label: 'Social Media Strategy', target: 'Social Media Strategy' },
      { label: 'Profile Setup & Optimisation', target: 'Profile Setup & Optimisation' },
      { label: 'Social Media Management', target: 'Social Media Management' },
      ...[
        'Content Planning & Calendars', 'Creative Posts & Carousels', 'Reels & Short-Form Video',
        'Community Management', 'Social Media Advertising', 'Influencer & Creator Campaigns', 'Social Analytics & Reporting',
      ].map((label) => ({ label, target: 'Social Media Marketing' })),
    ],
  },
  {
    title: 'SEO & Search Growth', target: 'SEO & Search Growth', items: [
      'SEO Audit & Strategy', 'Keyword & Search Intent Research', 'Technical SEO', 'On-Page SEO',
      'Local SEO', 'Google Business Profile', 'SEO Content & Topic Planning',
      'Off-Page SEO & Digital PR', 'E-Commerce SEO', 'Search Analytics & Reporting',
    ].map((label) => ({ label, target: 'SEO & Search Growth' })),
  },
  {
    title: 'Brand Growth & Creative', target: 'Brand Growth & Creative', items: [
      'Brand Discovery & Audit', 'Brand Strategy & Positioning', 'Brand Messaging & Voice',
      'Logo & Visual Identity', 'Brand Guidelines & Templates', 'Marketing Collateral Design',
      'Website & Landing Page Design', 'Creative Campaigns & Storytelling',
      'Brand Experience & Consistency', 'Brand Launch & Refresh',
    ].map((label) => ({ label, target: 'Brand Growth & Creative' })),
  },
];

export interface HeaderProps { activeTab?: string; onTabChange?: (tab: string) => void; onCtaClick?: () => void; }

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onCtaClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);
  const [desktopServicesDismissed, setDesktopServicesDismissed] = useState(false);
  const navLinks = ['Home', 'About', 'Services', 'Blogs', 'Contact'];

  const currentPath = typeof window !== 'undefined' ? normalise(window.location.pathname) : '/';
  const effectiveSection = activeTab ?? sectionFromPath(currentPath);

  const isLinkActive = (link: string): boolean => {
    if (link === 'Services') {
      return (
        effectiveSection === 'Services' ||
        isServiceSection(effectiveSection) ||
        currentPath === '/services' ||
        currentPath.startsWith('/services/')
      );
    }
    if (link === 'Home') {
      return (
        (effectiveSection === 'Home' || !effectiveSection) &&
        (currentPath === '/' || currentPath === '' || ROUTES[effectiveSection] === '/')
      );
    }
    const linkLower = link.toLowerCase();
    const pathLower = currentPath.toLowerCase();
    return (
      effectiveSection.toLowerCase() === linkLower ||
      pathLower === `/${linkLower}` ||
      pathLower.startsWith(`/${linkLower}/`)
    );
  };

  const isCategoryActive = (group: ServiceGroup): boolean => {
    if (effectiveSection === group.title || effectiveSection === group.target) return true;
    if (group.items.some((i) => i.label === effectiveSection || i.target === effectiveSection)) return true;
    const groupPath = ROUTES[group.target];
    if (groupPath && (currentPath === groupPath || currentPath.startsWith(groupPath + '/'))) return true;
    return false;
  };

  const isSubItemActive = (item: { label: string; target: string }): boolean => {
    if (effectiveSection === item.label) return true;
    const itemPath = ROUTES[item.label];
    if (itemPath && (currentPath === itemPath || currentPath === `${itemPath}/`)) return true;
    return false;
  };

  const handleNavClick = (link: string) => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileCategoryOpen(null);
    onTabChange?.(link);
  };

  return (
    <header className="header-wrapper">
      <div className="header-container">
        <button type="button" className="header-logo-link" onClick={() => handleNavClick('Home')} title="Ikasle Marketing">
          <img src={logoImg} alt="Ikasle Marketing" className="header-logo-img" />
        </button>

        <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Primary navigation">
          {navLinks.map((link) => link !== 'Services' ? (
            <button key={link} type="button" className={`nav-link ${isLinkActive(link) ? 'active' : ''}`} onClick={() => handleNavClick(link)}>{link}</button>
          ) : (
            <div className={`services-nav-item ${mobileServicesOpen ? 'mobile-expanded' : ''} ${desktopServicesDismissed ? 'desktop-dismissed' : ''}`} key={link}>
              <div className="services-nav-trigger-row" onMouseEnter={() => setDesktopServicesDismissed(false)}>
                <button type="button" className={`nav-link services-trigger ${isLinkActive('Services') ? 'active' : ''}`} onClick={() => handleNavClick('Services')} aria-haspopup="true">
                  Services <ChevronDown aria-hidden="true" />
                </button>
                <button type="button" className="mobile-services-toggle" onClick={() => setMobileServicesOpen((open) => !open)} aria-label="Toggle services menu" aria-expanded={mobileServicesOpen}><ChevronDown /></button>
              </div>

              <div className="services-dropdown">
                <div className="services-groups">
                  {SERVICE_GROUPS.map((group) => {
                    const categoryActive = isCategoryActive(group);
                    return (
                      <div className={`services-category ${mobileCategoryOpen === group.title ? 'mobile-expanded' : ''}`} key={group.title}>
                        <div className="category-row">
                          <button type="button" className={`category-link ${categoryActive ? 'active' : ''}`} onClick={() => handleNavClick(group.target)}><span>{group.title}</span><ChevronRight /></button>
                          <button type="button" className="mobile-category-toggle" onClick={() => setMobileCategoryOpen((open) => open === group.title ? null : group.title)} aria-label={`Toggle ${group.title} services`}><ChevronDown /></button>
                        </div>
                        <div className="services-submenu">
                          <p>{group.title}</p>
                          {group.items.map((item) => (
                            <button
                              type="button"
                              key={item.label}
                              className={isSubItemActive(item) ? 'active' : ''}
                              onClick={() => handleNavClick(item.target)}
                            >
                              {item.label}<ArrowRight />
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="header-cta-btn" onClick={onCtaClick}><span>Let's Talk</span><ArrowRight size={17} className="header-cta-arrow" /></button>
          <button type="button" className="mobile-menu-btn" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
