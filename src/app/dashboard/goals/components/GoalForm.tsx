import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateGoalSchema,
  createGoalSchema,
} from "../validations/createGoalSchema";
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

type GoalFormProps = {
  onSubmit: (data: CreateGoalSchema) => Promise<void>;
  isPending: boolean;
  defaultValues?: Partial<CreateGoalSchema>;
};

const GoalForm = ({
  onSubmit,
  isPending,
  defaultValues,
}: GoalFormProps) => {
  const form = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      currentAmount: 0,
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: CreateGoalSchema) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Name</FormLabel>
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
              <FormLabel>Target Amount</FormLabel>
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
          name="currentAmount"
          render={({ field: { value, onChange, ...rest }, ...props }) => (
            <FormItem>
              <FormLabel>Current Amount</FormLabel>
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
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
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
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
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
          {form.formState.isSubmitting ? "Saving..." : "Save Goal"}
        </Button>
      </form>
    </Form>
  );
};

export default GoalForm; 