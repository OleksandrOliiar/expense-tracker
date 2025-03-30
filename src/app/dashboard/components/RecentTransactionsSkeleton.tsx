import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RecentTransactionsSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="grow ml-2">
                <Skeleton className="w-[180px] h-3.5 rounded-xl mb-1" />
                <Skeleton className="w-[169px] h-3" />
              </div>
              <Skeleton className="w-12 h-5 rounded-xl" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsSkeleton;
