import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Banknote, Minus, Plus } from "lucide-react";

type TypeFilterProps = {
  value: "incomes" | "expenses";
  onChange: (value: "incomes" | "expenses") => void;
};

const TypeFilter = ({ value, onChange }: TypeFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange} defaultValue="incomes">
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
        <SelectItem value="incomes">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Incomes
          </div>
        </SelectItem>
        <SelectItem value="expenses">
          <div className="flex items-center gap-2">
            <Minus className="w-4 h-4" /> Expenses
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TypeFilter;
