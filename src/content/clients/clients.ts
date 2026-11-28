/**
 * Client brands and the regions IKASLĒ serves.
 * Areas come from each client's own website (contact page / footer), checked Nov 2026.
 */

export type RegionId = 'india' | 'usa' | 'canada' | 'uk' | 'europe' | 'australia';

export interface Client {
  name: string;
  /** Logo path under /public. */
  src: string;
  url: string;
  region: RegionId;
  /** City, plus area when the client's site lists one. */
  location: string;
  industry: string;
}

export const CLIENTS: Client[] = [
  {
    name: 'Aadhan Caterers',
    src: '/clientlogo/aadhancaterers.jpeg',
    url: 'https://www.google.com/search?q=Aadhan+Caterers+Coimbatore',
    region: 'india',
    location: 'Coimbatore',
    industry: 'Catering',
  },
  {
    name: 'Acme Bricks',
    src: '/clientlogo/acme-bricks.webp',
    url: 'https://acmebricks.in',
    region: 'india',
    location: 'Vellanaipatti, Coimbatore',
    industry: 'Construction materials',
  },
  {
    name: 'Akvinz',
    src: '/clientlogo/akvinz.png',
    url: 'https://akvinz.com',
    region: 'india',
    location: 'Coimbatore',
    industry: 'Water purifiers',
  },
  {
    name: 'Get Events',
    src: '/clientlogo/get-events.png',
    url: 'https://www.getcorporateevents.com',
    region: 'india',
    location: 'Malumichampatti, Coimbatore',
    industry: 'Events & promotions',
  },
  {
    name: 'Giftery',
    src: '/clientlogo/giftery.png',
    url: 'https://gifterys.com',
    region: 'india',
    location: 'R.S. Puram, Coimbatore',
    industry: 'Corporate gifting',
  },
  {
    name: 'Rent-O-Mate',
    src: '/clientlogo/rent-o-mate.png',
    url: 'https://rentomate.life',
    region: 'india',
    location: 'Uppilipalayam, Coimbatore',
    industry: 'Appliance rentals',
  },
  {
    name: 'Uzhavar Connect',
    src: '/clientlogo/uzhavar-connect.webp',
    url: 'https://uzhavarconnect.com',
    region: 'india',
    location: 'Edayarpalayam, Coimbatore',
    industry: 'Agriculture & farm services',
  },
];

export interface Region {
  id: RegionId;
  name: string;
  /** Where the pin sits (longitude, latitude). */
  lon: number;
  lat: number;
  /** Shown under the region name. */
  place: string;
  /** IKASLĒ's home base: arcs are drawn from here. */
  hq?: boolean;
}

/** Same list as "Countries we serve" in the footer. */
export const REGIONS: Region[] = [
  { id: 'india', name: 'India', lon: 76.96, lat: 11.02, place: 'Coimbatore, Tamil Nadu', hq: true },
  { id: 'usa', name: 'United States', lon: -98.5, lat: 39.5, place: 'North America' },
  { id: 'canada', name: 'Canada', lon: -106, lat: 57, place: 'North America' },
  { id: 'uk', name: 'United Kingdom', lon: -1.8, lat: 52.8, place: 'Europe' },
  { id: 'europe', name: 'European Union', lon: 10.4, lat: 50.5, place: 'Europe' },
  { id: 'australia', name: 'Australia', lon: 134, lat: -25, place: 'Oceania' },
];

export const clientsIn = (region: RegionId): Client[] => CLIENTS.filter((c) => c.region === region);
