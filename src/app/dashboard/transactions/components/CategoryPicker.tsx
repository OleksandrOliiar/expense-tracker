import { useState, useEffect, useCallback } from "react";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserCategories } from "../../categories/actions/getUserCategories";

import { cn } from "@/lib/utils";
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
import AddCategoryDialog from "./AddCategoryDialog";

export interface CategoryPickerProps {
  /** Currently selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
}

export default function CategoryPicker({
  value,
  onChange,
}: CategoryPickerProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  // Fetch categories using useQuery
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", "list", debouncedSearchTerm],
    queryFn: () => getUserCategories(debouncedSearchTerm || undefined),
  });

  const selectedCategory = categories.find((category) => category.id === value);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    onChange(newValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {selectedCategory ? (
            <div>{selectedCategory.name}</div>
          ) : (
            "Select category..."
          )}
          <ChevronsUpDown className="opacity-50" size={10} />
        </Button>
      </PopoverTrigger>
      <PopoverContentModal className="p-0 max-w-[250px]">
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
          <div className="p-1 border-b">
            <AddCategoryDialog />
          </div>

          <CommandList>
            {error && (
              <div className="p-4 text-destructive text-center">
                {error instanceof Error
                  ? error.message
                  : "Failed to load categories"}
              </div>
            )}

            {!isLoading && !error && categories.length === 0 && (
              <CommandEmpty>No categories found</CommandEmpty>
            )}

            <CommandGroup>
              {isLoading && categories.length === 0 ? (
                <DefaultLoadingSkeleton />
              ) : (
                categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.id}
                    onSelect={handleSelect} // Empty to prevent default behavior
                    className={cn("!cursor-pointer hover:bg-accent", {
                      "bg-accent": value === category.id,
                    })}
                  >
                    <div className="flex items-center gap-2">
                      {category.name}
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-3 w-3",
                        value === category.id ? "opacity-100" : "opacity-0"
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
