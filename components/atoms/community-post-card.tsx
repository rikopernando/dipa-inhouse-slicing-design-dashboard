import { IconHeart, IconMessage } from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { CommunityPost } from '@/types/dashboard';
import { Typography } from './typography';
import { Forward } from 'lucide-react';

interface CommunityPostCardProps {
  post: CommunityPost;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export function CommunityPostCard({ post, onLike, onComment, onShare }: CommunityPostCardProps) {
  return (
    <Card className="bg-input w-[262px] shrink-0">
      <CardHeader className="flex flex-row items-center gap-3 pb-0">
        <Avatar className="size-9">
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <Typography variant="small">{post.author.name}</Typography>
          <Typography variant="muted" className="text-xs">
            {post.timestamp}
          </Typography>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <Typography variant="p" className="line-clamp-3 text-sm text-white">
          {post.content}
        </Typography>
      </CardContent>
      <div className="flex items-center px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLike?.(post.id)}
          className="flex items-center gap-1"
        >
          <IconHeart className="text-muted-foreground size-4" />
          <Typography variant="small" className="text-grayscale-50">
            {post.likes}
          </Typography>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onComment?.(post.id)}
          className="flex items-center gap-1"
        >
          <IconMessage className="text-muted-foreground size-4" />
          <Typography variant="small" className="text-grayscale-50">
            {post.comments}
          </Typography>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onShare?.(post.id)}>
          <Forward className="text-muted-foreground size-4" />
        </Button>
      </div>
    </Card>
  );
}
