# 🏗️ Architecture Documentation

## Overview

This project is built following modern React and Next.js best practices, utilizing the App Router architecture with a focus on performance, maintainability, and developer experience.

## Architecture Principles

### 1. Atomic Design Pattern

Components are organized following Brad Frost's Atomic Design methodology:

- **Atoms** - Basic building blocks (Typography, ErrorState, etc.)
- **Molecules** - Simple component groups (SearchInput, etc.)
- **Organisms** - Complex UI sections (Header, etc.)

### 2. Separation of Concerns

- **API Layer** (`/api`) - All external API interactions
- **Components** (`/components`) - Pure UI components
- **Hooks** (`/hooks`) - Reusable logic and state management
- **Lib** (`/lib`) - Utility functions and constants
- **Types** (`/types`) - TypeScript type definitions

### 3. Server-First Architecture

Leveraging Next.js 15 App Router for:

- Server Components by default
- Client Components only when necessary ('use client')
- ISR for optimal performance
- SSG for static content

## Data Flow

### Home Page

```
Server (ISR) → fetchData() → Initial Data
     ↓
Client Component → useData hook
     ↓
React Query (pages 2+) → Cached Data
     ↓
UI Rendering
```

**Key Features:**

- Memoized computed values (useMemo)
- Stable function references (useCallback)
- Custom hooks for complex logic
- Optimistic UI updates

## Performance Optimizations

### 1. ISR (Incremental Static Regeneration)

**Home Page:**

- Pre-rendered at build time
- Revalidates every 30 minutes
- Zero client-side fetches on first page

### 3. Image Optimization

```typescript
// next.config.ts
{
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
}
```

## Error Handling

### Error Boundaries

```
app/error.tsx (Root)
  ↓
Try/Catch in Server Components
  ↓
React Query Error States
  ↓
ErrorState Component
```

### Error Recovery

1. **Root Error Boundary** - Catches all React errors
2. **Not Found** - Custom 404 page
3. **API Errors** - Handled by React Query with retry logic
4. **Network Errors** - User-friendly error messages

## Routing Structure

```
/ (Home)
  ├── ISR: 30 minutes
  ├── Server Component
  └── Client Component

```

## Styling Architecture

### Tailwind CSS Configuration

- Custom theme via CSS variables
- Dark mode support (class-based)
- Responsive design utilities

### Component Styling Strategy

1. **Utility-First** - Tailwind classes directly in JSX
2. **CVA (Class Variance Authority)** - For component variants
3. **CSS Variables** - For theme colors
4. **Responsive** - Mobile-first approach

### Theme System

```css
:root {
  /* Light theme variables */
}

.dark {
  /* Dark theme variables */
}
```

Managed by `next-themes`:

- Persistent theme selection
- System preference detection
- No flash on page load

## Build Process

### Development

```bash
yarn dev
  ↓
Next.js Dev Server (Turbopack)
  ↓
Hot Module Replacement
  ↓
TypeScript Type Checking
  ↓
ESLint
```

### Production

```bash
yarn build
  ↓
TypeScript Compilation
  ↓
Static Page Generation
  ↓
ISR Setup
  ↓
Image Optimization
  ↓
Code Splitting
  ↓
Minification
```

## Deployment Architecture

### Vercel (Recommended)

```
Git Push → GitHub
  ↓
Vercel Build
  ↓
Edge Network Distribution
  ↓
ISR at Edge
  ↓
Automatic Scaling
```

### Key Features:

- Zero-config deployment
- Edge Functions
- Image Optimization CDN
- Analytics
- Preview deployments

## Future Considerations

### Scalability

- Add Redis for caching
- Implement virtual scrolling for large lists
- Add service worker for offline support

### Monitoring

- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- User analytics (Google Analytics)

## Best Practices Implemented

✅ **TypeScript** - Full type safety
✅ **ESLint** - Code quality
✅ **Atomic Design** - Component organization
✅ **Custom Hooks** - Logic reusability
✅ **Memoization** - Performance optimization
✅ **Error Boundaries** - Graceful error handling
✅ **Accessibility** - WCAG compliance
✅ **SEO** - Meta tags and Open Graph
✅ **ISR** - Optimal data freshness
✅ **React Query** - Smart data fetching

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
