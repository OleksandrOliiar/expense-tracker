import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateBudgetSchema,
  createBudgetSchema,
} from "../validations/createBudgetSchema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import CategoryPicker from "../../components/CategoryPicker";
import { UserBudget } from "../actions/getUserBudgets";

type BudgetFormProps = {
  onSubmit: (data: CreateBudgetSchema) => Promise<void>;
  isPending: boolean;
  defaultValues?: Partial<UserBudget>;
};

const BudgetForm = ({
  onSubmit,
  isPending,
  defaultValues,
}: BudgetFormProps) => {
  const [startOpen, setStartOpen] = useState(false);
  const [dueOpen, setDueOpen] = useState(false);

  const form = useForm<CreateBudgetSchema>({
    resolver: zodResolver(createBudgetSchema),
    // @ts-ignore
    defaultValues: {
      ...defaultValues,
      targetAmount: defaultValues?.targetAmount
        ? Number(defaultValues.targetAmount)
        : 0,
      startDate: defaultValues?.startDate
        ? new Date(defaultValues.startDate)
        : undefined,
      endDate: defaultValues?.endDate
        ? new Date(defaultValues.endDate)
        : undefined,
      categoryId: defaultValues?.category?.id ?? undefined,
    },
  });

  const handleSubmit = async (data: CreateBudgetSchema) => {
    if (defaultValues) {
      if (
        data.title === defaultValues.title &&
        Number(data.targetAmount) === Number(defaultValues.targetAmount) &&
        data.startDate?.toString() === defaultValues.startDate?.toString() &&
        data.endDate?.toString() === defaultValues.endDate?.toString() &&
        data.description === defaultValues.description &&
        data.categoryId === defaultValues.category?.id
      ) {
        toast.info("Please commit any changes");
        return;
      }
    }

    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 mt-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetAmount"
          render={({ field: { value, onChange, ...rest }, ...props }) => (
            <FormItem>
              <FormLabel>Limit</FormLabel>
              <FormControl>
                <Input
                  value={`${value}`}
                  onChange={(e) => onChange(Number(e.target.value))}
                  {...rest}
                  {...props}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover open={startOpen} onOpenChange={setStartOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(value) => {
                      field.onChange(value);
                      setStartOpen(false);
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover open={dueOpen} onOpenChange={setDueOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(value) => {
                      field.onChange(value);
                      setDueOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategoryPicker
                  value={value ?? ""}
                  onChange={onChange}
                  width="100%"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {form.formState.isSubmitting ? "Saving..." : "Save Budget"}
        </Button>
      </form>
    </Form>
  );
};

export default BudgetForm;
