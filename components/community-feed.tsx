'use client';

import { useRef } from 'react';
import { CommunityPostCard } from '@/components/atoms/community-post-card';
import { HorizontalScrollButtons } from '@/components/molecules/horizontal-scroll-buttons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CommunityPost } from '@/types/dashboard';

interface CommunityFeedProps {
  posts: CommunityPost[];
}

export function CommunityFeed({ posts }: CommunityFeedProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="bg-input">
      <CardHeader>
        <CardTitle>Community</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div ref={scrollContainerRef} className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {posts.map((post) => (
              <CommunityPostCard key={post.id} post={post} />
            ))}
          </div>
          <HorizontalScrollButtons containerRef={scrollContainerRef} />
        </div>
      </CardContent>
    </Card>
  );
}
