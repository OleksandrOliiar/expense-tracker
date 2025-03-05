import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BudgetsCardSkeleton = () => {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-6 w-[60%]" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Category skeleton */}
        <Skeleton className="h-6 w-32 rounded-full" />

        {/* Description skeleton */}
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[75%]" />

        {/* Budget progress section skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>

          <Skeleton className="h-2 w-full" />

          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Remaining amount skeleton */}
        <div className="rounded-md bg-muted p-3 text-center">
          <Skeleton className="h-3 w-20 mx-auto mb-2" />
          <Skeleton className="h-7 w-28 mx-auto" />
        </div>

        {/* Completion status skeleton */}
        <Skeleton className="h-6 w-full rounded-full" />

        {/* Date information skeleton */}
        <div className="flex justify-between pt-2 border-t">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-32" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetsCardSkeleton;
