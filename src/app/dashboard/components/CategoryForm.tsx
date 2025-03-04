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
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { SmilePlus } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

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
  const { theme } = useTheme();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

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
        onSubmit={(e) => {
          e.stopPropagation();
          form.handleSubmit(submitHandler)(e);
        }}
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
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Popover open={isEmojiPickerOpen} modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "font-normal w-full justify-start h-10",
                        !field.value && "text-muted-foreground"
                      )}
                      onClick={() => setIsEmojiPickerOpen(true)}
                    >
                      {field.value ? (
                        <>
                          <span className="text-xl">{field.value}</span> Change
                          icon
                        </>
                      ) : (
                        <>
                          {" "}
                          <SmilePlus className="w-4 h-4" /> Pick an icon
                        </>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  sideOffset={-200}
                  className="w-full"
                >
                  <Picker
                    data={data}
                    onEmojiSelect={(emoji: { native: string }) => {
                      field.onChange(emoji.native);
                      setIsEmojiPickerOpen(false);
                    }}
                    theme={theme}
                    autoFocus
                    emojiSize={20}
                  />
                </PopoverContent>
              </Popover>
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
