import React, { useEffect, useRef, useState } from 'react';
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
      { label: 'Content Planning & Calendars', target: 'Content Planning' },
      { label: 'Creative Posts & Carousels', target: 'Creative Posts & Carousels' },
      ...[
        'Reels & Short-Form Video', 'Community Management', 'Social Media Advertising',
        'Influencer & Creator Campaigns', 'Social Analytics & Reporting',
      ].map((label) => ({ label, target: label })),
    ],
  },
  {
    title: 'SEO & Search Growth', target: 'SEO & Search Growth', items: [
      ...[
        'SEO Audit & Strategy', 'Keyword & Search Intent Research', 'Technical SEO', 'On-Page SEO',
        'Local SEO', 'Google Business Profile', 'SEO Content & Topic Planning',
        'Off-Page SEO & Digital PR', 'E-Commerce SEO', 'Search Analytics & Reporting',
      ].map((label) => ({ label, target: label })),
    ],
  },
  {
    title: 'Brand Growth & Creative', target: 'Brand Growth & Creative', items: [
      'Brand Discovery & Audit', 'Brand Strategy & Positioning', 'Brand Messaging & Voice',
      'Logo & Visual Identity', 'Brand Guidelines & Templates', 'Marketing Collateral Design',
      'Website & Landing Page Design', 'Creative Campaigns & Storytelling',
      'Brand Experience & Consistency', 'Brand Launch & Refresh',
    ].map((label) => ({ label, target: label })),
  },
];

export interface HeaderProps { activeTab?: string; onTabChange?: (tab: string) => void; onCtaClick?: () => void; }

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onCtaClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);
  const [desktopServicesDismissed, setDesktopServicesDismissed] = useState(false);
  // Desktop sub-menu shown on hover. Switching categories waits briefly so a diagonal
  // move from a category towards its sub-menu doesn't open the rows it passes over.
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);
  const switchTimer = useRef<number | undefined>(undefined);
  const clearSwitch = () => window.clearTimeout(switchTimer.current);
  useEffect(() => clearSwitch, []);

  const hoverOn = (title: string) => {
    clearSwitch();
    if (hoverCategory === null) setHoverCategory(title);
    else if (hoverCategory !== title) switchTimer.current = window.setTimeout(() => setHoverCategory(title), 160);
  };
  const closeDropdown = () => { clearSwitch(); setHoverCategory(null); };
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
    // Match on target (the route key), not label: e.g. "Content Planning & Calendars" → "Content Planning".
    if (effectiveSection === item.target) return true;
    const itemPath = ROUTES[item.target];
    if (itemPath && (currentPath === itemPath || currentPath === `${itemPath}/`)) return true;
    return false;
  };

  const handleNavClick = (link: string) => {
    // Close the desktop dropdown after a choice: hide it until the pointer returns to
    // the Services trigger, and drop focus so it isn't held open by the clicked button.
    setDesktopServicesDismissed(true);
    closeDropdown();
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
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

              <div className="services-dropdown" onMouseLeave={closeDropdown}>
                <div className="services-groups">
                  {SERVICE_GROUPS.map((group) => {
                    const categoryActive = isCategoryActive(group);
                    return (
                      <div
                        className={`services-category ${mobileCategoryOpen === group.title ? 'mobile-expanded' : ''} ${hoverCategory === group.title ? 'hover-open' : ''}`}
                        key={group.title}
                        onMouseEnter={() => hoverOn(group.title)}
                      >
                        <div className="category-row">
                          <button type="button" className={`category-link ${categoryActive ? 'active' : ''}`} onClick={() => handleNavClick(group.target)}><span>{group.title}</span><ChevronRight /></button>
                          <button type="button" className="mobile-category-toggle" onClick={() => setMobileCategoryOpen((open) => open === group.title ? null : group.title)} aria-label={`Toggle ${group.title} services`}><ChevronDown /></button>
                        </div>
                        <div className="services-submenu" onMouseEnter={clearSwitch}>
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
