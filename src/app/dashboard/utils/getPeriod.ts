import { Period } from "../actions/getDashboardData";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  subDays,
  parseISO,
} from "date-fns";
import { DashboardSearchParams } from "../page";

export const getPeriod = ({
  date: dateParam,
  startDate: startDateParam,
  endDate: endDateParam,
}: DashboardSearchParams) => {
  let currentPeriod: Period;
  let previousPeriod: Period;

  if (dateParam) {
    // Single date mode
    const selectedDate = parseISO(dateParam);
    const prevDate = subDays(selectedDate, 30); // Compare with 30 days before

    currentPeriod = {
      startDate: prevDate,
      endDate: selectedDate,
    };

    previousPeriod = {
      startDate: subDays(prevDate, 30),
      endDate: prevDate,
    };
  } else if (startDateParam && endDateParam) {
    // Date range mode
    const startDate = parseISO(startDateParam);
    const endDate = parseISO(endDateParam);

    // Calculate the duration in days
    const durationInDays = Math.round(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    currentPeriod = {
      startDate,
      endDate,
    };

    previousPeriod = {
      startDate: subDays(startDate, durationInDays),
      endDate: subDays(endDate, durationInDays),
    };
  } else {
    // Default: current month and previous month
    const currentMonth = new Date();
    currentPeriod = {
      startDate: startOfMonth(currentMonth),
      endDate: endOfMonth(currentMonth),
    };

    const previousMonth = subMonths(currentMonth, 1);
    previousPeriod = {
      startDate: startOfMonth(previousMonth),
      endDate: endOfMonth(previousMonth),
    };
  }

  return { currentPeriod, previousPeriod };
};
