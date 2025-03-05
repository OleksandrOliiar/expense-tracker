import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { differenceInDays, format } from "date-fns";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import GoalMenu from "./GoalMenu";

type GoalCardProps = {
  goal: {
    title: string;
    targetAmount: string;
    currentAmount: string;
    id: string;
    description?: string | null;
    endDate?: string | null;
    startDate?: string | null;
  };
};

const GoalCard = ({ goal }: GoalCardProps) => {
  const currentAmount = Number(goal.currentAmount || 0);
  const targetAmount = Number(goal.targetAmount);
  const progress = Math.min(
    Math.round((currentAmount / targetAmount) * 100),
    100
  );

  // Chart data
  const chartData = [
    { name: "progress", value: progress, fill: "var(--color-progress)" },
  ];

  // Chart colors
  const chartConfig = {
    progress: {
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  // Calculate days remaining if start and due dates exist
  const startDate = goal.startDate ? new Date(goal.startDate) : null;
  const endDate = goal.endDate ? new Date(goal.endDate) : null;

  let daysProgress = 0;
  let daysRemaining = 0;
  let totalDays = 0;

  if (startDate && endDate) {
    const today = new Date();
    totalDays = differenceInDays(endDate, startDate);
    const daysPassed = differenceInDays(today, startDate);
    daysRemaining = differenceInDays(endDate, today);
    daysProgress = Math.min(Math.round((daysPassed / totalDays) * 100), 100);
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{goal.title}</CardTitle>
        <GoalMenu goal={goal} />
      </CardHeader>
      <CardContent className="space-y-4">
        {goal.description && (
          <p className="text-sm text-muted-foreground">{goal.description}</p>
        )}

        {/* Radial Chart - Full Width */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={360 * (progress / 100)}
            innerRadius={70}
            outerRadius={90}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[75, 65]}
            />
            <RadialBar
              dataKey="value"
              background={{ fill: "hsl(var(--muted))" }}
              cornerRadius={10}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <>
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {progress}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-xs"
                          >
                            ${currentAmount.toLocaleString()} of $
                            {targetAmount.toLocaleString()}
                          </tspan>
                        </text>
                      </>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>

        {/* Dates and Days Remaining */}
        {(startDate || endDate) && (
          <div className="space-y-2 mt-2">
            <div className="flex justify-between text-sm">
              {startDate && (
                <div>
                  <p className="text-xs text-muted-foreground">Started</p>
                  <p className="font-medium">
                    {format(startDate, "MMM d, yyyy")}
                  </p>
                </div>
              )}

              {endDate && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Due by</p>
                  <p className="font-medium">
                    {format(endDate, "MMM d, yyyy")}
                  </p>
                </div>
              )}
            </div>

            {startDate && endDate && daysRemaining > 0 && (
              <>
                <Progress value={daysProgress} className="h-1.5" />
                <p className="text-xs text-center text-muted-foreground">
                  {daysRemaining} days remaining
                </p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalCard;
