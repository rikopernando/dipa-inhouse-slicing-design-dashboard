'use client';

import { CommunityPostCard } from '@/components/atoms/community-post-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CommunityPost } from '@/types/dashboard';

interface CommunityFeedProps {
  posts: CommunityPost[];
}

export function CommunityFeed({ posts }: CommunityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {posts.map((post) => (
              <CommunityPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
