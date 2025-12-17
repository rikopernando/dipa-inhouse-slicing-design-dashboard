import type { CommunityPost } from '@/types/dashboard';

export const communityPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: 'Matthew',
      username: '@matthewjk',
      avatar: '/avatars/matthew.jpg',
    },
    content:
      "Market looks hot, but don't forget to secure your funds. I'm using cold-wallets for large bags...",
    likes: 45,
    comments: 12,
    timestamp: '2h ago',
  },
  {
    id: '2',
    author: {
      name: 'Sarah Chen',
      username: '@sarahc',
      avatar: '/avatars/sarah.jpg',
    },
    content:
      'Just staked my ETH at 18% APY! The returns are looking promising for Q1 2025. Who else is staking?',
    likes: 128,
    comments: 34,
    timestamp: '4h ago',
  },
  {
    id: '3',
    author: {
      name: 'Alex Turner',
      username: '@alexturner',
      avatar: '/avatars/alex.jpg',
    },
    content:
      'Bitcoin breaking resistance at 95k! This bull run is just getting started. HODL strong everyone! 🚀',
    likes: 256,
    comments: 67,
    timestamp: '6h ago',
  },
  {
    id: '4',
    author: {
      name: 'Emma Wilson',
      username: '@emmaw',
      avatar: '/avatars/emma.jpg',
    },
    content:
      "Diversification is key. My portfolio: 50% BTC, 30% ETH, 20% altcoins. What's your strategy?",
    likes: 89,
    comments: 23,
    timestamp: '8h ago',
  },
  {
    id: '5',
    author: {
      name: 'David Park',
      username: '@davidp',
      avatar: '/avatars/david.jpg',
    },
    content:
      'New to crypto? Start small, do your research, and never invest more than you can afford to lose. Welcome to the community!',
    likes: 172,
    comments: 45,
    timestamp: '10h ago',
  },
];
