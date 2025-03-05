import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const GoalCardSkeleton = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-6 w-[60%]" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Description skeleton */}
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[70%]" />

        {/* Radial Chart skeleton */}
        <div className="flex items-center justify-center my-6">
          <div className="relative">
            <Skeleton className="h-[180px] w-[180px] rounded-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        {/* Dates and Days Remaining skeleton */}
        <div className="space-y-2 mt-2">
          <div className="flex justify-between">
            <div>
              <Skeleton className="h-3 w-14 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="text-right">
              <Skeleton className="h-3 w-14 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <Skeleton className="h-1.5 w-full mt-2" />
          <div className="flex justify-center">
            <Skeleton className="h-3 w-28 mt-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCardSkeleton;
