import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Banknote } from "lucide-react";
import { useEffect, useState } from "react";

const TypeFilter = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const [value, setValue] = useState(() => {
    const type = queryParams.get("type");
    return type ? type : "all";
  });

  useEffect(() => {
    setQueryParams({ type: value });
  }, [value]);

  return (
    <Select value={value} onValueChange={setValue} defaultValue="all">
      <SelectTrigger className="w-[120px]">
        <SelectValue
          placeholder={
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4" /> Type
            </div>
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="income">Incomes</SelectItem>
        <SelectItem value="expense">Expenses</SelectItem>
        <SelectItem value="all">All</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TypeFilter;
