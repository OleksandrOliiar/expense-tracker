import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTransactionSchema,
  createTransactionSchema,
} from "../validations/createTransactionSchema";
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
import CategoryPicker from "./CategoryPicker";
import { useState } from "react";
import { toast } from "sonner";
import { getUserCategories } from "../../categories/actions/getUserCategories";
import { Category } from "@/db/types";

type TransactionFormProps = {
  onSubmit: (data: CreateTransactionSchema) => Promise<void>;
  isPending: boolean;
  defaultValues?: Partial<CreateTransactionSchema>;
  type: "income" | "expense";
};

const TransactionForm = ({
  onSubmit,
  isPending,
  defaultValues,
  type,
}: TransactionFormProps) => {
  const sanitizedDefaultValues = {
    ...defaultValues,
    amount:
      defaultValues?.amount !== undefined ? Number(defaultValues.amount) : 0,
    date: defaultValues?.date ? new Date(defaultValues.date) : new Date(),
    categoryId: defaultValues?.categoryId ?? null,
    notes: defaultValues?.notes ?? "",
    payee: defaultValues?.payee ?? null,
  };

  const form = useForm<CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: sanitizedDefaultValues,
  });

  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = async ({ amount, ...data }: CreateTransactionSchema) => {
    if (defaultValues) {
      if (
        Number(defaultValues?.amount) === amount &&
        defaultValues.categoryId === data.categoryId &&
        defaultValues.notes === data.notes &&
        new Date(defaultValues?.date ?? "").toISOString() ===
          data.date.toISOString() &&
        defaultValues.payee === data.payee
      ) {
        toast.info("Please commit any changes");

        return;
      }
    }

    const numericAmount = Number(amount);
    await onSubmit({
      amount: type === "income" ? numericAmount : -numericAmount,
      ...data,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="amount"
          render={({ field: { value, onChange, ...rest }, ...props }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  value={value === undefined ? "" : Math.abs(Number(value))}
                  onChange={(e) => {
                    const numericValue =
                      e.target.value === "" ? 0 : Number(e.target.value);
                    onChange(numericValue);
                  }}
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
          name="payee"
          render={({ field: { value, onChange, ...rest }, ...props }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  value={value ?? ""}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  {...rest}
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field: { value, onChange }, ...props }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategoryPicker value={value ?? ""} onChange={onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
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
                        <span>Pick a date</span>
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
                      setCalendarOpen(false);
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {form.formState.isSubmitting ? "Submitting..." : `Submit`}
        </Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
