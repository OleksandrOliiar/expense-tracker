"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

type MonthlyBalanceData = {
  currentMonth: {
    income: string;
    expenses: string;
    balance: string;
    label: string;
  };
  previousMonth: {
    income: string;
    expenses: string;
    balance: string;
    label: string;
  };
  changes: {
    income: number;
    expenses: number;
    balance: number;
  };
};

const MonthlyBalanceChart = ({ data }: { data: MonthlyBalanceData }) => {
  // Transform data for chart
  const chartData = [
    {
      name: data.previousMonth.label,
      Income: Number(data.previousMonth.income),
      Expenses: Number(data.previousMonth.expenses),
    },
    {
      name: data.currentMonth.label,
      Income: Number(data.currentMonth.income),
      Expenses: Number(data.currentMonth.expenses),
    },
  ];

  // Check if all values are zero
  const hasNoData = chartData.every(item => 
    item.Income === 0 && item.Expenses === 0
  );

  // Chart configuration
  const chartConfig = {
    Income: {
      color: "hsl(var(--chart-1))",
    },
    Expenses: {
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      {hasNoData ? (
        <div className="flex h-full w-full text-base items-center justify-center flex-col text-muted-foreground">
          <p>No transaction data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              width={60}
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), ""]}
              labelStyle={{ color: "var(--foreground)" }}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
                fontSize: "12px"
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={30}
              iconSize={10}
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Bar 
              dataKey="Income" 
              fill={chartConfig.Income.color} 
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            />
            <Bar 
              dataKey="Expenses" 
              fill={chartConfig.Expenses.color} 
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default MonthlyBalanceChart;
