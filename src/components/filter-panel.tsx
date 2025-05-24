'use client';

import type * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { PlatformName, Quality, CostCategory, Filters } from '@/types';
import { ALL_PLATFORMS, ALL_QUALITIES, ALL_COST_CATEGORIES } from '@/lib/mock-data';

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (newFilters: Filters) => void;
}

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const handlePlatformChange = (platform: PlatformName, checked: boolean) => {
    const newPlatforms = checked
      ? [...filters.platforms, platform]
      : filters.platforms.filter((p) => p !== platform);
    onFiltersChange({ ...filters, platforms: newPlatforms });
  };

  const handleQualityChange = (quality: Quality, checked: boolean) => {
    const newQualities = checked
      ? [...filters.qualities, quality]
      : filters.qualities.filter((q) => q !== quality);
    onFiltersChange({ ...filters, qualities: newQualities });
  };

  const handleCostCategoryChange = (category: CostCategory, checked: boolean) => {
    const newCostCategories = checked
      ? [...filters.costCategories, category]
      : filters.costCategories.filter((c) => c !== category);
    onFiltersChange({ ...filters, costCategories: newCostCategories });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Filter Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Platform</h3>
          <div className="space-y-2">
            {ALL_PLATFORMS.map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform}`}
                  checked={filters.platforms.includes(platform)}
                  onCheckedChange={(checked) => handlePlatformChange(platform, !!checked)}
                />
                <Label htmlFor={`platform-${platform}`} className="font-normal text-sm text-muted-foreground">
                  {platform}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Quality</h3>
          <div className="space-y-2">
            {ALL_QUALITIES.map((quality) => (
              <div key={quality} className="flex items-center space-x-2">
                <Checkbox
                  id={`quality-${quality}`}
                  checked={filters.qualities.includes(quality)}
                  onCheckedChange={(checked) => handleQualityChange(quality, !!checked)}
                />
                <Label htmlFor={`quality-${quality}`} className="font-normal text-sm text-muted-foreground">
                  {quality}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Subscription Cost</h3>
          <div className="space-y-2">
            {ALL_COST_CATEGORIES.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cost-${category}`}
                  checked={filters.costCategories.includes(category)}
                  onCheckedChange={(checked) => handleCostCategoryChange(category, !!checked)}
                />
                <Label htmlFor={`cost-${category}`} className="font-normal text-sm text-muted-foreground">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
