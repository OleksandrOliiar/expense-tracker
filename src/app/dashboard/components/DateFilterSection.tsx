"use client";

import DateFilter from "./DateFilter";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { usePeriod } from "../hooks/usePeriod";
import { format } from "date-fns";
import { useMemo } from "react";

const DateFilterSection = () => {
  const periodData = usePeriod();

  const period = useMemo(() => {
    return {
      current: {
        startDate: format(periodData.currentPeriod.startDate, "LLL dd, y"),
        endDate: format(periodData.currentPeriod.endDate, "LLL dd, y"),
      },
      previous: {
        startDate: format(periodData.previousPeriod.startDate, "LLL dd, y"),
        endDate: format(periodData.previousPeriod.endDate, "LLL dd, y"),
      },
    };
  }, [periodData]);

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">
                Financial Summary
              </h2>
            </div>
            <p className="text-sm font-medium text-foreground">
              {period.current.startDate} to {period.current.endDate}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Compared to {period.previous.startDate} to{" "}
              {period.previous.endDate}
            </p>
          </div>
          <DateFilter className="w-full sm:w-auto max-w-[280px]" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DateFilterSection;
