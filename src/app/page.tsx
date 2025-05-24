'use client';

import type * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import HeaderComponent from '@/components/layout/header';
import FilterPanel from '@/components/filter-panel';
import ContentGrid from '@/components/content/content-grid';
import AiRecommendationsDialog from '@/components/ai/ai-recommendations-dialog';
import { mockContentItems } from '@/lib/mock-data';
import type { ContentItem, Filters, PlatformName, Quality, CostCategory } from '@/types';
import { Toaster } from '@/components/ui/toaster';


export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    platforms: [],
    qualities: [],
    costCategories: [],
  });
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [footerYear, setFooterYear] = useState<string>('');

  useEffect(() => {
    // Simulate fetching data
    setAllContent(mockContentItems);
    // Set year on client-side after hydration
    setFooterYear(new Date().getFullYear().toString());
  }, []);

  const filteredContent = useMemo(() => {
    return allContent.filter((item) => {
      // Search term filter
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch && searchTerm) return false;
      
      // Platform filter
      if (filters.platforms.length > 0) {
        const itemPlatforms = item.availability.map(avail => avail.platformName);
        const hasPlatformMatch = filters.platforms.some(fp => itemPlatforms.includes(fp));
        if (!hasPlatformMatch) return false;
      }

      // Quality filter
      if (filters.qualities.length > 0) {
        const itemQualities = item.availability.flatMap(avail => avail.qualities);
        const hasQualityMatch = filters.qualities.some(fq => itemQualities.includes(fq));
        if (!hasQualityMatch) return false;
      }
      
      // Cost category filter
      if (filters.costCategories.length > 0) {
        const itemCostCategories = item.availability.map(avail => avail.costCategory);
        const hasCostCategoryMatch = filters.costCategories.some(fcc => itemCostCategories.includes(fcc));
        if (!hasCostCategoryMatch) return false;
      }

      return true;
    });
  }, [allContent, searchTerm, filters]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderComponent
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAiRecommendClick={() => setIsAiDialogOpen(true)}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 xl:w-1/5">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </aside>
          <section className="w-full lg:w-3/4 xl:w-4/5">
            <ContentGrid items={filteredContent} />
          </section>
        </div>
      </main>
      <AiRecommendationsDialog isOpen={isAiDialogOpen} onOpenChange={setIsAiDialogOpen} />
      <Toaster />
      <footer className="bg-card text-center p-4 border-t mt-auto">
        <p className="text-sm text-muted-foreground">&copy; {footerYear || new Date().getFullYear()} StreamFind. All rights reserved.</p>
      </footer>
    </div>
  );
}
