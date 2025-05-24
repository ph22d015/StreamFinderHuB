import type { ContentItem, StreamingPlatform, PlatformName, Quality, CostCategory } from '@/types';
import { Tv, Clapperboard, Film, Youtube, MonitorPlay, Drama } from 'lucide-react'; // Using Drama as placeholder for Hulu/Generic

const getPlatformIcon = (name: PlatformName): React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon | undefined => {
  switch (name) {
    case 'Netflix':
      return Youtube; // Placeholder
    case 'Amazon Prime Video':
      return MonitorPlay; // Placeholder
    case 'Disney+':
      return Film; // Placeholder
    case 'Hulu':
        return Drama; // Placeholder
    default:
      return undefined;
  }
};


export const ALL_PLATFORMS: PlatformName[] = ['Netflix', 'Hulu', 'Amazon Prime Video', 'Disney+', 'HBO Max', 'Apple TV+'];
export const ALL_QUALITIES: Quality[] = ['SD', 'HD', '4K'];
export const ALL_COST_CATEGORIES: CostCategory[] = ['Free', 'Under $10', '$10-$15', '$15+', 'Varies'];


export const streamingPlatforms: StreamingPlatform[] = [
  { id: 'netflix', name: 'Netflix', logo: getPlatformIcon('Netflix'), baseSubscriptionCost: '$9.99 - $19.99/month' },
  { id: 'hulu', name: 'Hulu', logo: getPlatformIcon('Hulu'), baseSubscriptionCost: '$7.99 - $14.99/month' },
  { id: 'primevideo', name: 'Amazon Prime Video', logo: getPlatformIcon('Amazon Prime Video'), baseSubscriptionCost: '$8.99/month or included with Prime' },
  { id: 'disneyplus', name: 'Disney+', logo: getPlatformIcon('Disney+'), baseSubscriptionCost: '$7.99/month' },
  { id: 'hbomax', name: 'HBO Max', logo: undefined, baseSubscriptionCost: '$14.99/month' },
  { id: 'appletvplus', name: 'Apple TV+', logo: undefined, baseSubscriptionCost: '$6.99/month' },
];

export const mockContentItems: ContentItem[] = [
  {
    id: '1',
    title: 'Stellar Odyssey',
    type: 'Movie',
    description: 'A thrilling journey across galaxies to find a new home for humanity.',
    posterUrl: 'https://placehold.co/300x450.png',
    dataAiHint: 'sci-fi movie',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    releaseYear: 2023,
    rating: 8.8,
    availability: [
      { platformId: 'netflix', platformName: 'Netflix', qualities: ['HD', '4K'], subscriptionCostDisplay: '$15.49/mo', costCategory: '$15+', contentUrl: '#' },
      { platformId: 'primevideo', platformName: 'Amazon Prime Video', qualities: ['HD', '4K'], subscriptionCostDisplay: 'Rent $3.99 / Buy $14.99', costCategory: 'Varies', contentUrl: '#' },
    ],
  },
  {
    id: '2',
    title: 'The Last Kingdom Chronicles',
    type: 'Web Series',
    description: 'Epic tales of warriors and kings in a land divided by conflict and ambition.',
    posterUrl: 'https://placehold.co/300x450.png',
    dataAiHint: 'historical series',
    genres: ['Action', 'Drama', 'History'],
    releaseYear: 2022,
    rating: 9.1,
    availability: [
      { platformId: 'hbomax', platformName: 'HBO Max', qualities: ['HD', '4K'], subscriptionCostDisplay: '$14.99/mo', costCategory: '$10-$15', contentUrl: '#' },
    ],
  },
  {
    id: '3',
    title: 'Comedy Central Standups',
    type: 'TV Show',
    description: 'Hilarious stand-up specials from the world\'s best comedians.',
    posterUrl: 'https://placehold.co/300x450.png',
    dataAiHint: 'comedy show',
    genres: ['Comedy'],
    releaseYear: 2020,
    rating: 7.5,
    availability: [
      { platformId: 'hulu', platformName: 'Hulu', qualities: ['HD'], subscriptionCostDisplay: '$7.99/mo', costCategory: 'Under $10', contentUrl: '#' },
      { platformId: 'netflix', platformName: 'Netflix', qualities: ['HD'], subscriptionCostDisplay: '$9.99/mo', costCategory: 'Under $10', contentUrl: '#' },
    ],
  },
  {
    id: '4',
    title: 'Mystery Manor',
    type: 'Movie',
    description: 'A detective uncovers dark secrets in an isolated, eerie mansion.',
    posterUrl: 'https://placehold.co/300x450.png',
    dataAiHint: 'mystery movie',
    genres: ['Mystery', 'Thriller'],
    releaseYear: 2024,
    rating: 8.2,
    availability: [
      { platformId: 'appletvplus', platformName: 'Apple TV+', qualities: ['4K'], subscriptionCostDisplay: '$6.99/mo', costCategory: 'Under $10', contentUrl: '#' },
    ],
  },
  {
    id: '5',
    title: 'Tech Titans',
    type: 'Web Series',
    description: 'The rise and fall of visionary entrepreneurs in the competitive world of technology.',
    posterUrl: 'https://placehold.co/300x450.png',
    dataAiHint: 'tech documentary',
    genres: ['Documentary', 'Biography', 'Drama'],
    releaseYear: 2023,
    availability: [
      { platformId: 'disneyplus', platformName: 'Disney+', qualities: ['HD', '4K'], subscriptionCostDisplay: '$7.99/mo', costCategory: 'Under $10', contentUrl: '#' },
      { platformId: 'primevideo', platformName: 'Amazon Prime Video', qualities: ['HD'], subscriptionCostDisplay: 'Included with Prime', costCategory: 'Varies', contentUrl: '#' },
    ],
  },
   {
    id: '6',
    title: 'Galactic Guardians',
    type: 'Movie',
    description: 'A band of misfits defends the galaxy from an ancient evil.',
    posterUrl: 'https://placehold.co/300x450.png',
    dataAiHint: 'space opera',
    genres: ['Sci-Fi', 'Action', 'Comedy'],
    releaseYear: 2021,
    rating: 7.9,
    availability: [
      { platformId: 'disneyplus', platformName: 'Disney+', qualities: ['HD', '4K'], subscriptionCostDisplay: '$7.99/mo', costCategory: 'Under $10', contentUrl: '#' },
    ],
  },
  {
    id: '7',
    title: 'Culinary Journeys',
    type: 'TV Show',
    description: 'Explore the diverse and delicious cuisines from around the globe.',
    posterUrl: 'https://placehold.co/300x450.png',
    dataAiHint: 'food travel',
    genres: ['Documentary', 'Food'],
    releaseYear: 2022,
    rating: 8.5,
    availability: [
      { platformId: 'netflix', platformName: 'Netflix', qualities: ['HD', '4K'], subscriptionCostDisplay: '$15.49/mo', costCategory: '$15+', contentUrl: '#' },
      { platformId: 'hulu', platformName: 'Hulu', qualities: ['HD'], subscriptionCostDisplay: 'With Ads $7.99/mo', costCategory: 'Under $10', contentUrl: '#' },
    ],
  },
];
