import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { PieChart } from "lucide-react";
import Link from "next/link";

type Budget = {
  id: string;
  title: string;
  currentAmount: string;
  targetAmount: string;
  startDate: Date;
  endDate: Date;
  category: {
    name: string;
    id: string;
    icon: string | null;
  } | null;
};

const BudgetsOverviewCard = ({ budgets }: { budgets?: Budget[] }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Budgets</CardTitle>
        <Link
          href="/dashboard/budgets"
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets && budgets.length > 0 ? (
            budgets.map((budget) => {
              const currentAmount = Number(budget.currentAmount);
              const targetAmount = Number(budget.targetAmount);
              const progressPercentage = Math.min(
                Math.round((currentAmount / targetAmount) * 100),
                100
              );

              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {budget.category?.icon ? (
                        <Image
                          src={budget.category.icon}
                          alt={budget.category?.name || ""}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      ) : (
                        <PieChart className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium">
                        {budget.title}
                      </span>
                    </div>
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
              No active budgets
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetsOverviewCard;
