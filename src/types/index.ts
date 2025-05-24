import type { LucideIcon } from 'lucide-react';

export type PlatformName = 'Netflix' | 'Hulu' | 'Amazon Prime Video' | 'Disney+' | 'HBO Max' | 'Apple TV+';
export type Quality = 'SD' | 'HD' | '4K';
export type ContentItemType = 'Movie' | 'Web Series' | 'TV Show';
export type CostCategory = 'Free' | 'Under $10' | '$10-$15' | '$15+' | 'Varies';


export interface PlatformAvailability {
  platformId: string;
  platformName: PlatformName;
  qualities: Quality[];
  subscriptionCostDisplay: string; // e.g., "$9.99/month" or "Included with Prime"
  costCategory: CostCategory;
  contentUrl?: string; // Direct link to content on platform
}

export interface ContentItem {
  id: string;
  title: string;
  type: ContentItemType;
  description: string;
  posterUrl: string;
  dataAiHint?: string;
  genres: string[];
  releaseYear: number;
  rating?: number; // e.g., 8.5
  availability: PlatformAvailability[];
}

export interface StreamingPlatform {
  id: string;
  name: PlatformName;
  logo?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>; // Can be Lucide or custom SVG
  baseSubscriptionCost: string;
}

export interface Filters {
  platforms: PlatformName[];
  qualities: Quality[];
  costCategories: CostCategory[];
}
