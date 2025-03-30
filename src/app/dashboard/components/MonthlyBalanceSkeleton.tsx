import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MonthlyBalanceSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Period Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[250px] w-full rounded-md" />
        <div className="mt-4 flex justify-center gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyBalanceSkeleton;