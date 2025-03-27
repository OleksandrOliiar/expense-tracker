import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const SummaryCard = ({
  title,
  value,
  previousValue,
  percentageChange,
  isPositiveGood,
  className,
}: {
  title: string;
  value: string;
  previousValue: string;
  percentageChange: number;
  isPositiveGood: boolean;
  className?: string;
}) => {
  const isPositiveChange = percentageChange > 0;
  const isGood = isPositiveGood ? isPositiveChange : !isPositiveChange;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-sm font-semibold tracking-tight text-muted-foreground">
          {title}
        </CardTitle>
        {isPositiveChange ? (
          <ArrowUpIcon
            className={cn(
              "h-4 w-4",
              isGood ? "text-green-500" : "text-red-500"
            )}
          />
        ) : (
          <ArrowDownIcon
            className={cn(
              "h-4 w-4",
              isGood ? "text-green-500" : "text-red-500"
            )}
          />
        )}
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-2xl font-bold tracking-tight mb-2">
          {formatCurrency(Number(value))}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            vs {formatCurrency(Number(previousValue))}
          </p>
          <span
            className={cn(
              "text-xs font-medium",
              isGood ? "text-green-500" : "text-red-500"
            )}
          >
            {Math.abs(percentageChange)}%{" "}
            <span className="hidden sm:inline">
              {isPositiveChange ? "increase" : "decrease"}
            </span>
            <span className="inline sm:hidden">
              {isPositiveChange ? "↑" : "↓"}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
