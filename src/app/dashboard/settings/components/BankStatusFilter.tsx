"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useState } from "react";

const BankStatusFilter = () => {
  const { setQueryParams, queryParams } = useQueryParams<{ status: string }>();
  const [status, setStatus] = useState(() => {
    return queryParams.get("status") || "all";
  });

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setQueryParams({ status: value });
  };

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
        <SelectItem value="all">All</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default BankStatusFilter;
