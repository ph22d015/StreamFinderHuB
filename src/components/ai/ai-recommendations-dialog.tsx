'use client';

import type * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generatePersonalizedRecommendations, type PersonalizedRecommendationsInput, type PersonalizedRecommendationsOutput } from '@/ai/flows/generate-personalized-recommendations';
import { Loader2, Sparkles } from 'lucide-react';

interface AiRecommendationsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AiRecommendationsDialog({ isOpen, onOpenChange }: AiRecommendationsDialogProps) {
  const [viewingHistory, setViewingHistory] = useState('');
  const [contentType, setContentType] = useState<'movie' | 'tv series' | 'any'>('any');
  const [platformPreferences, setPlatformPreferences] = useState('');
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendations(null);

    if (!viewingHistory.trim()) {
      toast({
        title: "Viewing history required",
        description: "Please enter some titles you've watched.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    const input: PersonalizedRecommendationsInput = {
      viewingHistory,
      contentType,
      streamingPlatformPreferences: platformPreferences || undefined,
    };

    try {
      const result = await generatePersonalizedRecommendations(input);
      setRecommendations(result);
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center">
            <Sparkles className="mr-2 h-6 w-6 text-primary" />
            AI Content Recommendations
          </DialogTitle>
          <DialogDescription className="mt-1 text-muted-foreground">
            Tell us what you&apos;ve watched, and we&apos;ll suggest something new!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-1">
          <div>
            <Label htmlFor="viewingHistory" className="text-sm font-medium">Viewing History</Label>
            <Input
              id="viewingHistory"
              value={viewingHistory}
              onChange={(e) => setViewingHistory(e.target.value)}
              placeholder="e.g., Breaking Bad, The Office, Inception"
              className="mt-1"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">Comma-separated list of titles.</p>
          </div>

          <div>
            <Label htmlFor="contentType" className="text-sm font-medium">Content Type</Label>
            <Select
              value={contentType}
              onValueChange={(value: 'movie' | 'tv series' | 'any') => setContentType(value)}
            >
              <SelectTrigger id="contentType" className="w-full mt-1">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="movie">Movie</SelectItem>
                <SelectItem value="tv series">TV Series</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="platformPreferences" className="text-sm font-medium">Platform Preferences (Optional)</Label>
            <Input
              id="platformPreferences"
              value={platformPreferences}
              onChange={(e) => setPlatformPreferences(e.target.value)}
              placeholder="e.g., Netflix, Hulu"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">Comma-separated list of preferred platforms.</p>
          </div>

          <DialogFooter className="sm:justify-between items-center pt-4">
             <DialogClose asChild>
                <Button type="button" variant="outline">
                    Cancel
                </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} className="min-w-[120px]">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get Recommendations
            </Button>
          </DialogFooter>
        </form>

        {recommendations && (
          <div className="mt-6 p-4 border-t border-border">
            <h3 className="text-lg font-semibold mb-2 text-primary">Here are your recommendations:</h3>
            <p className="text-sm mb-1"><strong className="font-medium">Titles:</strong> {recommendations.recommendations}</p>
            <p className="text-sm"><strong className="font-medium">Reasoning:</strong> {recommendations.reasoning}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
