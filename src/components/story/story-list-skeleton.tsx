import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function StoryListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex gap-4">
            <div className="text-xl text-muted-foreground font-semibold w-8 text-center pt-1">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
