import type { LucideIcon } from 'lucide-react';
import { MonitorPlay, Youtube, Film, Tv, Drama, Clapperboard } from 'lucide-react';

// Platform Icons
// Using Lucide icons as placeholders or generic representations.
// For a real app, you'd use official brand SVGs.

export const NetflixIcon: LucideIcon = Youtube; // Placeholder
export const HuluIcon: LucideIcon = Drama; // Placeholder
export const AmazonPrimeVideoIcon: LucideIcon = MonitorPlay; // Placeholder
export const DisneyPlusIcon: LucideIcon = Film; // Placeholder
export const HboMaxIcon: LucideIcon = Tv; // Placeholder (generic TV)
export const AppleTvPlusIcon: LucideIcon = Tv; // Placeholder (generic TV)

export const platformIcons: Record<string, LucideIcon | undefined> = {
  'Netflix': NetflixIcon,
  'Hulu': HuluIcon,
  'Amazon Prime Video': AmazonPrimeVideoIcon,
  'Disney+': DisneyPlusIcon,
  'HBO Max': HboMaxIcon,
  'Apple TV+': AppleTvPlusIcon,
};

// Quality Icons
export const SDIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground" {...props}>SD</span>
);

export const HDIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground" {...props}>HD</span>
);

export const FourKIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground" {...props}>4K</span>
);

export const qualityIcons: Record<string, LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>> = {
  'SD': SDIcon,
  'HD': HDIcon,
  '4K': FourKIcon,
};

// App Logo Icon
export const StreamFindLogoIcon: LucideIcon = Clapperboard;
