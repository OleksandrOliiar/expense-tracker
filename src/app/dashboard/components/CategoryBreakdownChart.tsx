"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// Fix the type definition to allow null values for categoryId and categoryName
type CategoryData = {
  categoryId: string | null;
  categoryName: string | null;
  categoryIcon: string | null;
  amount: string;
}[];

const CategoryBreakdownChart = ({
  data,
  isLoading,
}: {
  data?: CategoryData;
  isLoading: boolean;
}) => {
  // Transform data for chart and handle nulls
  const chartData = data?.map((category) => ({
    name: category.categoryName || "Uncategorized",
    value: Number(category.amount),
    icon: category.categoryIcon,
  }));

  // Create a color array (you can customize these colors)
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))",
  ];

  // Chart config
  const chartConfig = {
    categories: {
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  // Custom tooltip component to ensure text is visible
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-md p-2 shadow-md">
          <p className="text-sm font-medium mb-1">{payload[0].name}</p>
          <p className="text-sm text-foreground">
            <span className="font-medium">Amount:</span>{" "}
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Skeleton className="h-[200px] w-[200px] rounded-full" />
      </div>
    );
  }

  return (
    <>
      {data && data?.length > 0 ? (
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 30, left: 0 }}>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) =>
                  percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
                }
              >
                {chartData &&
                  chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "20px",
                  marginBottom: "10px",
                }}
                iconSize={10}
                formatter={(value) => (
                  <span
                    style={{ color: "var(--foreground)", margin: "0 10px" }}
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
        <div className="flex h-[300px] items-center justify-center text-muted-foreground">
          <p className="-mt-12"> No category data available for this period</p>
        </div>
      )}
    </>
  );
};

export default CategoryBreakdownChart;
