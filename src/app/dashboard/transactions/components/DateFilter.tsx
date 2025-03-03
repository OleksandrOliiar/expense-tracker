"use client";

import { addDays, format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";

function DateFilter({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { setQueryParams, queryParams } = useQueryParams();

  const [calendarDate, setCalendarDate] = React.useState<DateRange | undefined>(
    () => {
      const result: DateRange = {
        from: undefined,
        to: undefined,
      };

      const startDate = queryParams.get("startDate");
      const endDate = queryParams.get("endDate");

      if (startDate) {
        result.from = new Date(startDate);
      }

      if (endDate) {
        result.to = new Date(endDate);
      }

      return result;
    }
  );

  const debouncedCalendarDate = useDebouncedValue(calendarDate, 300);

  React.useEffect(() => {
    const startDate = debouncedCalendarDate?.from?.toISOString().split("T")[0];
    
    const endDate = debouncedCalendarDate?.to
      ? addDays(debouncedCalendarDate?.to, 2).toISOString().split("T")[0]
      : undefined;

    setQueryParams({
      startDate,
      endDate,
    });
  }, [debouncedCalendarDate]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !calendarDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {calendarDate?.from ? (
              calendarDate.to ? (
                <>
                  {format(calendarDate.from, "LLL dd, y")} -{" "}
                  {format(calendarDate.to, "LLL dd, y")}
                </>
              ) : (
                format(calendarDate.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 pr-4" align="end">
          <div className="flex items-center gap-2 flex-wrap">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={calendarDate?.from}
              selected={calendarDate}
              onSelect={setCalendarDate}
              numberOfMonths={2}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateFilter;
