import { useSearchParams } from "next/navigation";
import { getPeriod } from "../utils/getPeriod";
import { useMemo } from "react";

export const usePeriod = () => {
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate") ?? undefined;
  const endDate = searchParams.get("endDate") ?? undefined;
  const date = searchParams.get("date") ?? undefined;

  return useMemo(
    () => getPeriod({ startDate, endDate, date }),
    [startDate, endDate, date]
  );
};
