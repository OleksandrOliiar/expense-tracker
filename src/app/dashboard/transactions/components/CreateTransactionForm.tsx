import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTransactionSchema,
  createTransactionSchema,
} from "../validations/createTransactionSchema";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../actions/createTransaction";
import { toast } from "sonner";
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

type CreateTransactionFormProps = {
  type: "income" | "expense";
  onSheetClose: () => void;
};

const CreateTransactionForm = ({
  type,
  onSheetClose,
}: CreateTransactionFormProps) => {
  const queryClient = useQueryClient();

  const form = useForm<CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type,
    },
  });

  const { mutate: createTransactionMutation, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      onSheetClose();
      form.reset();
      toast.success(`${type} added successfully`);
    },
    onError: () => {
      toast.error(`Failed to add ${type}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", "list"],
      });
    },
  });

  const handleSubmit = (data: CreateTransactionSchema) => {
    createTransactionMutation(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field: { value, onChange, ...rest }, ...props }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
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
          name="payee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CategoryPicker />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
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
                    onSelect={field.onChange}
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
                <Textarea {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Adding..." : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateTransactionForm;
