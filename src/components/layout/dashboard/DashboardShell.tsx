import React from 'react';
import { ChartColumn, Info, Users } from 'lucide-react';
import './Dashboard.css';

interface DashboardShellProps {
  active: 'Leads Dashboard' | 'Campaigns Dashboard';
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  onNavigate: (section: string) => void;
  children: React.ReactNode;
}

const TABS = [
  { section: 'Leads Dashboard', label: 'Lead pipeline', icon: Users, href: '/dashboard/leads' },
  { section: 'Campaigns Dashboard', label: 'Campaign performance', icon: ChartColumn, href: '/dashboard/campaigns' },
] as const;

export const DashboardShell: React.FC<DashboardShellProps> = ({ active, title, subtitle, actions, onNavigate, children }) => (
  <main className="dash">
    <div className="dash-container">
      <nav className="dash-tabs" aria-label="Dashboards">
        {TABS.map(({ section, label, icon: Icon, href }) => (
          <a
            key={section}
            href={href}
            className={`dash-tab${active === section ? ' active' : ''}`}
            aria-current={active === section ? 'page' : undefined}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
              event.preventDefault();
              onNavigate(section);
            }}
          >
            <Icon size={17} aria-hidden="true" /> {label}
          </a>
        ))}
      </nav>
      <header className="dash-header">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {actions && <div className="dash-header-actions">{actions}</div>}
      </header>
      <p className="dash-demo" role="note">
        <Info size={16} aria-hidden="true" /> Showing demo data. Connect <code>leadService</code> to your CRM or ad accounts to see live figures.
      </p>
      {children}
    </div>
  </main>
);
