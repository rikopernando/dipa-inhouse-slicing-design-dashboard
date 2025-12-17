import { IconHeart, IconMessage, IconShare } from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { CommunityPost } from '@/types/dashboard';

interface CommunityPostCardProps {
  post: CommunityPost;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export function CommunityPostCard({ post, onLike, onComment, onShare }: CommunityPostCardProps) {
  return (
    <Card className="w-[280px] shrink-0 sm:w-[320px]">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <Avatar className="size-10">
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{post.author.name}</span>
          <span className="text-muted-foreground text-xs">{post.timestamp}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-muted-foreground line-clamp-3 text-sm">{post.content}</p>
      </CardContent>
      <div className="flex items-center justify-between border-t pt-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLike?.(post.id)}
          className="flex items-center gap-1"
        >
          <IconHeart className="size-4" />
          <span className="text-xs">{post.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onComment?.(post.id)}
          className="flex items-center gap-1"
        >
          <IconMessage className="size-4" />
          <span className="text-xs">{post.comments}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onShare?.(post.id)}>
          <IconShare className="size-4" />
        </Button>
      </div>
    </Card>
  );
}
