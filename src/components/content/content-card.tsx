'use client';

import type * as React from 'react';
import Image from 'next/image';
import type { ContentItem } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PlatformDisplay from '@/components/platform-display';
import { Star } from 'lucide-react';

interface ContentCardProps {
  item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0 relative">
        <Image
          src={item.posterUrl}
          alt={`Poster for ${item.title}`}
          width={300}
          height={450}
          className="object-cover w-full h-auto aspect-[2/3]"
          data-ai-hint={item.dataAiHint || "movie poster"}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 line-clamp-2 leading-tight">{item.title}</CardTitle>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{item.releaseYear}</span>
          <Badge variant="secondary" className="capitalize">{item.type}</Badge>
          {item.rating && (
            <span className="flex items-center">
              <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
              {item.rating.toFixed(1)}
            </span>
          )}
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-2">
          {item.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1 mb-3">
          {item.genres.map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">{genre}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <PlatformDisplay availability={item.availability} />
      </CardFooter>
    </Card>
  );
}
