import { Skeleton } from '@/components/ui/skeleton';

/**
 * Home Page Loading State
 * Displayed while home page data is being fetched
 */
export default function HomeLoading() {
  return (
    <div className="container mx-auto px-6 py-8 md:py-12">
      {/* Hero Skeleton */}
      <div className="mb-8 md:mb-12">
        <Skeleton className="mb-4 h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>

      {/* Section Title Skeleton */}
      <Skeleton className="mb-6 h-10 w-48" />
    </div>
  );
}
