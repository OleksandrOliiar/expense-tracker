"use client";

import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

type Props = {
  id: string;
  label: string;
  queryKey: string;
};

export default function Search({ label, id, queryKey }: Props) {
  const { setQueryParams, queryParams } = useQueryParams();
  const [query, setQuery] = useState(queryParams.get(queryKey));

  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    setQueryParams({ [queryKey]: debouncedQuery });
  }, [debouncedQuery, setQueryParams, queryKey]);

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Input
        placeholder={label}
        id={id}
        value={query ?? ""}
        onChange={(e) => setQuery(e.target.value)}
        startIcon={SearchIcon}
        className="h-9"
      />
    </div>
  );
}
