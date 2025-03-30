import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContentModal,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AddCategoryDialog from "../transactions/components/AddCategoryDialog";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getPickerCategories } from "../actions/getPickerCategories";

export interface CategoryPickerProps<Multiple extends boolean = false> {
  /** Currently selected value */
  value: Multiple extends true ? string[] : string;
  /** Callback when selection changes */
  onChange: (value: Multiple extends true ? string[] : string) => void;
  /** Whether to show the add category dialog */
  showAddCategory?: boolean;
  /** Whether to allow multiple categories to be selected */
  multiple?: Multiple;
  width?: string;
}

type Category = {
  id: string;
  name: string;
  icon: string | null;
  transactionsCount: number;
};

export default function CategoryPicker<Multiple extends boolean = false>({
  value,
  onChange,
  showAddCategory = true,
  multiple = false as Multiple,
  width = "auto",
}: CategoryPickerProps<Multiple>) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "categories-picker",
      debouncedSearchTerm ? debouncedSearchTerm : undefined,
    ],
    queryFn: () =>
      getPickerCategories(
        debouncedSearchTerm ? debouncedSearchTerm : undefined
      ),
    enabled: open,
  });

  const categoriesList = useMemo(() => data ?? [], [data]);

  useEffect(() => {
    if (multiple) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(
        (categoriesList ?? []).find((category) => {
          return category.id === value;
        }) ?? null
      );
    }
  }, [value, multiple, categoriesList]);

  const handleSelect = (currentValue: string) => {
    if (multiple) {
      // Type assertion needed since TypeScript can't infer properly in this context
      const valueArray = value as string[];
      const newValue = valueArray.includes(currentValue)
        ? valueArray.filter((v) => v !== currentValue)
        : [...valueArray, currentValue];
      (onChange as (value: string[]) => void)(newValue);
    } else {
      const newValue = currentValue === value ? "" : currentValue;
      (onChange as (value: string) => void)(newValue);
      setOpen(false);
    }
  };

  const getIcon = (icon: string | null, name: string) => {
    if (icon && icon.includes("https")) {
      return <Image src={icon} alt={name} width={16} height={16} />;
    } else {
      return <span>{icon}</span>;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          style={{ width: width }}
        >
          {multiple ? (
            <div>
              {(value as string[]).length > 0
                ? (value as string[]).length === 1
                  ? "1 category selected"
                  : `${(value as string[]).length} categories selected`
                : "Select categories..."}
            </div>
          ) : selectedCategory ? (
            <div className="flex items-center gap-2">
              {getIcon(selectedCategory.icon, selectedCategory.name)}
              <span>{selectedCategory.name}</span>
            </div>
          ) : (
            "Select category..."
          )}
          <ChevronsUpDown className="opacity-50" size={10} />
        </Button>
      </PopoverTrigger>
      <PopoverContentModal className="p-0 max-w-[275px]">
        <Command shouldFilter={false}>
          <div className="relative border-b w-full">
            <CommandInput
              placeholder="Search categories..."
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            {isLoading && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
          </div>

          {/* Add Category Button */}
          {showAddCategory && (
            <div className="p-1 border-b">
              <AddCategoryDialog />
            </div>
          )}

          <CommandList>
            {error && (
              <div className="p-4 text-destructive text-center">
                {error instanceof Error
                  ? error.message
                  : "Failed to load categories"}
              </div>
            )}

            {!isLoading && !error && categoriesList?.length === 0 && (
              <CommandEmpty>No categories found</CommandEmpty>
            )}

            <CommandGroup>
              {isLoading ? (
                <DefaultLoadingSkeleton />
              ) : (
                categoriesList?.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.id}
                    onSelect={() => handleSelect(category.id)}
                    className={cn("!cursor-pointer hover:bg-accent", {
                      "bg-accent": multiple
                        ? (value as string[]).includes(category.id)
                        : value === category.id,
                    })}
                  >
                    <div className="flex items-center gap-2">
                      {getIcon(category.icon, category.name)}
                      <span>{category.name}</span>
                      <span className="text-muted-foreground">
                        ({category.transactionsCount})
                      </span>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-3 w-3",
                        multiple
                          ? (value as string[]).includes(category.id)
                            ? "opacity-100"
                            : "opacity-0"
                          : value === category.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContentModal>
    </Popover>
  );
}

function DefaultLoadingSkeleton() {
  return (
    <CommandGroup>
      {[1, 2, 3].map((i) => (
        <CommandItem key={i} disabled>
          <div className="flex items-center gap-2 w-full">
            <div className="h-3 w-3 rounded-full animate-pulse bg-muted" />
            <div className="h-4 w-24 animate-pulse bg-muted rounded" />
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
