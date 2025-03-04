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
  const [isRange, setIsRange] = React.useState(true);

  // Range mode state
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

  // Single date mode state
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(() => {
    const date = queryParams.get("date");
    return date ? new Date(date) : undefined;
  });

  const debouncedCalendarDate = useDebouncedValue(calendarDate, 300);
  const debouncedSingleDate = useDebouncedValue(singleDate, 300);

  React.useEffect(() => {
    if (isRange) {
      const startDate = debouncedCalendarDate?.from
        ?.toISOString()
        .split("T")[0];
      const endDate = debouncedCalendarDate?.to
        ? addDays(debouncedCalendarDate.to, 2).toISOString().split("T")[0]
        : undefined;

      setQueryParams({
        date: undefined,
        startDate,
        endDate,
      });
    } else {
      const date = debouncedSingleDate
        ? addDays(debouncedSingleDate, 1).toISOString().split("T")[0]
        : undefined;

      setQueryParams({
        date,
        startDate: undefined,
        endDate: undefined,
      });
    }
  }, [debouncedCalendarDate, debouncedSingleDate, isRange, setQueryParams]);

  const handleReset = () => {
    if (isRange) {
      setCalendarDate(undefined);
    } else {
      setSingleDate(undefined);
    }
  };

  // Handle mode toggle
  const handleModeToggle = () => {
    // When switching modes, try to preserve the selected date if possible
    if (isRange && calendarDate?.from) {
      setSingleDate(calendarDate.from);
    } else if (!isRange && singleDate) {
      setCalendarDate({
        from: singleDate,
        to: undefined,
      });
    }
    setIsRange(!isRange);
  };

  // Determine what to display in the button
  const displayDate = isRange
    ? calendarDate?.from
      ? calendarDate.to
        ? `${format(calendarDate.from, "LLL dd, y")} - ${format(
            calendarDate.to,
            "LLL dd, y"
          )}`
        : format(calendarDate.from, "LLL dd, y")
      : "Pick a date"
    : singleDate
    ? format(singleDate, "LLL dd, y")
    : "Pick a date";

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !displayDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {typeof displayDate === "string" ? (
              <span>{displayDate}</span>
            ) : (
              displayDate
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 pr-4" align="end">
          <div className="flex items-center gap-2 flex-wrap">
            {isRange ? (
              <Calendar
                initialFocus
                mode={"range"}
                defaultMonth={calendarDate?.from}
                selected={calendarDate}
                onSelect={setCalendarDate}
                numberOfMonths={2}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            ) : (
              <Calendar
                initialFocus
                mode="single"
                defaultMonth={singleDate}
                selected={singleDate}
                onSelect={setSingleDate}
                numberOfMonths={1}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            )}
          </div>
          <div className="flex justify-end gap-2 pb-4">
            <Button
              className="w-[100px]"
              variant="outline"
              onClick={handleModeToggle}
            >
              {isRange ? "Single" : "Range"}
            </Button>
            <Button
              disabled={isRange ? !calendarDate : !singleDate}
              className="w-[100px]"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateFilter;
