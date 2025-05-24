'use client';

import type * as React from 'react';
import type { PlatformAvailability, Quality } from '@/types';
import { platformIcons, qualityIcons, SDIcon, HDIcon, FourKIcon } from '@/components/icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PlatformDisplayProps {
  availability: PlatformAvailability[];
}

const QualityIconComponent: React.FC<{ quality: Quality }> = ({ quality }) => {
  const Icon = qualityIcons[quality] || SDIcon; // Fallback to SDIcon
  if (!Icon) return null;

  // Explicitly handle Lucide vs. custom SVG
  // @ts-ignore TODO: fix this type error later
  if (Icon.displayName === 'LucideIcon' || typeof Icon === 'function' && 'displayName' in Icon && Icon.displayName?.includes("Icon")) {
    // @ts-ignore
    const LucideIconComponent = Icon as React.ElementType;
    return <LucideIconComponent className="h-5 w-5 inline-block" />;
  } else {
     // @ts-ignore
    const CustomIconComponent = Icon as React.ElementType;
    return <CustomIconComponent className="h-5 w-5 inline-block" />;
  }
};


export default function PlatformDisplay({ availability }: PlatformDisplayProps) {
  if (!availability || availability.length === 0) {
    return <p className="text-sm text-muted-foreground">Not available on tracked platforms.</p>;
  }

  return (
    <TooltipProvider>
      <div className="space-y-2 mt-2">
        {availability.map((platformAvail) => {
          const PlatformIcon = platformIcons[platformAvail.platformName];
          return (
            <div key={platformAvail.platformId} className="flex items-center space-x-2 p-2 border rounded-md bg-secondary/50 hover:bg-secondary/70 transition-colors">
              {PlatformIcon && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={platformAvail.contentUrl || '#'} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                       <PlatformIcon className="h-6 w-6 text-foreground" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{platformAvail.platformName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <div className="flex-grow">
                <p className="text-sm font-medium text-foreground">
                  {platformAvail.platformName}
                </p>
                <div className="flex items-center space-x-1 mt-0.5">
                  {platformAvail.qualities.map((q) => (
                    <Badge key={q} variant="outline" className="text-xs px-1.5 py-0.5">
                      {q}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground whitespace-nowrap">{platformAvail.subscriptionCostDisplay}</p>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
