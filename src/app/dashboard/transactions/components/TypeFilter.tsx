import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Banknote, List, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const TypeFilter = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const [value, setValue] = useState(() => {
    const type = queryParams.get("type");
    return type ? type : "all";
  });

  useEffect(() => {
    setQueryParams({ type: value });
  }, [value, setQueryParams]);

  return (
    <Select value={value} onValueChange={setValue} defaultValue="all">
      <SelectTrigger className="w-fit">
        <SelectValue
          placeholder={
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4" /> Type
            </div>
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="income">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Incomes
          </div>
        </SelectItem>
        <SelectItem value="expense">
          <div className="flex items-center gap-2">
            <Minus className="w-4 h-4" /> Expenses
          </div>
        </SelectItem>
        <SelectItem value="all">
          <div className="flex items-center gap-2">
            <List className="w-4 h-4" /> All
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TypeFilter;
