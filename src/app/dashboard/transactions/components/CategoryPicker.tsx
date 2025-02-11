import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { getUserCategories } from "../../categories/actions/getUserCategories";

const CategoryPicker = () => {
  const { setValue, control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories", "list"],
    queryFn: () => getUserCategories(),
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <FormField
        control={control}
        name="categoryId"
        render={({ field: { onChange, value, ...rest } }) => (
          <>
            <FormItem>
              <FormLabel>Category</FormLabel>
              <PopoverTrigger asChild>
                <Input
                  placeholder="Search categories"
                  {...rest}
                  value={
                    categories?.find((category) => category.id === value)?.name
                  }
                  className="text-start"
                />
              </PopoverTrigger>
              <FormMessage />
            </FormItem>
            <PopoverContent>
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {categories?.map((category) => (
                    <CommandItem
                      key={category.id}
                      onSelect={() => {
                        onChange(category.id);
                        setIsOpen(false);
                      }}
                    >
                      {category.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </>
        )}
      />
    </Popover>
  );
};

export default CategoryPicker;
