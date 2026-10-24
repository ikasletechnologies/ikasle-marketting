import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import logoImg from '../../../assets/logo-clean.png';
import './Header.css';

export interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onCtaClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab = 'Home',
  onTabChange,
  onCtaClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = ['Home', 'About', 'Services', 'Blogs', 'Contact'];

  const handleNavClick = (link: string) => {
    setMobileMenuOpen(false);
    if (onTabChange) {
      onTabChange(link);
    }
  };

  return (
    <header className="header-wrapper">
      <div className="header-container">
        {/* Brand Logo with Original Icon */}
        <a
          href="#home"
          className="header-logo-link"
          onClick={() => handleNavClick('Home')}
          title="Ikasle Marketing"
        >
          <img
            src={logoImg}
            alt="Ikasle Marketing"
            className="header-logo-img"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <button
              key={link}
              type="button"
              className={`nav-link ${activeTab === link ? 'active' : ''}`}
              onClick={() => handleNavClick(link)}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            type="button"
            className="header-cta-btn"
            onClick={onCtaClick}
          >
            <span>Let's Talk</span>
            <ArrowRight size={17} className="header-cta-arrow" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
