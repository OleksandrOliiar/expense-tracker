import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CreateCategorySchema,
  createCategorySchema,
} from "../validations/createCategorySchema";
import { toast } from "sonner";

type CategoryFormProps = {
  defaultValues?: Partial<CreateCategorySchema>;
  isPending: boolean;
  onSubmit: (data: CreateCategorySchema) => Promise<void>;
};

const CategoryForm = ({
  defaultValues,
  isPending,
  onSubmit,
}: CategoryFormProps) => {
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues,
  });

  function submitHandler(values: CreateCategorySchema) {
    if (
      values.icon === defaultValues?.icon &&
      values.name === defaultValues?.name
    ) {
      toast.info("Please make some changes");

      return;
    }

    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
