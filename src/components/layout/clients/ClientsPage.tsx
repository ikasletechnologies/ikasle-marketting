import React from 'react';
import { ClientMapSection } from './ClientMapSection';

interface ClientsPageProps {
  onNavigate?: (section: string) => void;
}

/** /clients — the brands IKASLĒ works with, and where. */
export const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate }) => (
  <main className="clients-page">
    <ClientMapSection onNavigate={onNavigate} />
  </main>
);

export default ClientsPage;
