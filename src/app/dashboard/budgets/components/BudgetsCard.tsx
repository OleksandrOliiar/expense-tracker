import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { PieChart } from "lucide-react";
import { UserBudget } from "../actions/getUserBudgets";
import BudgetMenu from "./BudgetMenu";
import Image from "next/image";

type BudgetsCardProps = {
  budget: UserBudget;
};

const BudgetsCard = ({ budget }: BudgetsCardProps) => {
  // Calculate budget progress
  const currentAmount = Number(budget.currentAmount || 0);
  const targetAmount = Number(budget.targetAmount || 0);
  const progress =
    targetAmount > 0
      ? Math.min(Math.round((currentAmount / targetAmount) * 100), 100)
      : 0;
  const remaining = Math.max(targetAmount - currentAmount, 0);

  // Determine progress color based on percentage spent
  const getProgressColor = () => {
    if (progress > 90) return "bg-red-500";
    if (progress > 75) return "bg-orange-500";
    return "bg-emerald-500";
  };

  // Format dates if they exist
  const startDate = budget.startDate ? new Date(budget.startDate) : null;
  const endDate = budget.endDate ? new Date(budget.endDate) : null;

  let icon;
  if (budget.category?.icon) {
    if (budget.category.icon.includes("https")) {
      icon = (
        <Image
          src={budget.category.icon}
          alt={budget.category.name}
          height={16}
          width={16}
        />
      );
    } else {
      icon = <span>{budget.category.icon}</span>;
    }
  }

  return (
    <Card className="w-full overflow-hidden ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium">{budget.title}</CardTitle>
        </div>

        <BudgetMenu budget={budget} />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Display category if it exists */}
        {budget.category?.name && (
          <div className="inline-flex gap-2 items-center rounded-full bg-muted px-3 py-1 text-xs font-medium">
            <span>{icon}</span>
            <span> {budget.category.name}</span>
          </div>
        )}

        {/* Budget description if it exists */}
        {budget.description && (
          <p className="text-sm text-muted-foreground">{budget.description}</p>
        )}

        {/* Budget progress section */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Amount</span>
            <span className="font-medium">
              ${currentAmount.toLocaleString()}
            </span>
          </div>

          <Progress
            value={progress}
            className={cn("h-2", getProgressColor())}
          />

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Limit</span>
            <span className="font-medium">
              ${targetAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Remaining amount */}
        <div className="rounded-md bg-muted p-3 text-center">
          <p className="text-xs text-muted-foreground">Remaining</p>
          <p
            className={cn(
              "text-xl font-bold",
              remaining <= 0 ? "text-red-500" : "text-emerald-500"
            )}
          >
            ${remaining.toLocaleString()}
          </p>
        </div>

        {/* Completion status */}
        {budget.isCompleted && (
          <div className="inline-block w-full rounded-full border text-red-500 px-3 py-1 text-xs font-medium text-center">
            Exceeded
          </div>
        )}

        {/* Date information */}
        {(startDate || endDate) && (
          <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
            {startDate && <span>From: {format(startDate, "MMM d, yyyy")}</span>}
            {endDate && <span>To: {format(endDate, "MMM d, yyyy")}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetsCard;
