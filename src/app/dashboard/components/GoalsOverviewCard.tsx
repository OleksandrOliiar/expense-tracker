import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

type Goal = {
  id: string;
  title: string;
  currentAmount: string;
  targetAmount: string;
  startDate: Date;
  endDate: Date;
  description: string | null;
};

const GoalsOverviewCard = ({ goals }: { goals: Goal[] }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Savings Goals</CardTitle>
        <Link
          href="/dashboard/goals"
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.length > 0 ? (
            goals.map((goal) => {
              const currentAmount = Number(goal.currentAmount);
              const targetAmount = Number(goal.targetAmount);
              const progressPercentage = Math.min(
                Math.round((currentAmount / targetAmount) * 100),
                100
              );

              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{goal.title}</span>
                    <span className="text-sm">
                      {formatCurrency(currentAmount)} /{" "}
                      {formatCurrency(targetAmount)}
                    </span>
                  </div>
                  <Progress value={progressPercentage} />
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No active savings goals
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsOverviewCard;
