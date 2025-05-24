'use client';

import type * as React from 'react';
import { Button } from '@/components/ui/button';
import { StreamFindLogoIcon } from '@/components/icons';
import SearchBar from '@/components/search-bar';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAiRecommendClick: () => void;
}

export default function HeaderComponent({ searchTerm, onSearchChange, onAiRecommendClick }: HeaderProps) {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StreamFindLogoIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">StreamFind</h1>
        </div>
        <div className="flex-grow max-w-xl mx-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>
        <Button onClick={onAiRecommendClick} variant="outline">
          <Sparkles className="mr-2 h-4 w-4" />
          AI Recommendations
        </Button>
      </div>
    </header>
  );
}
