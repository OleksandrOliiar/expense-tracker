import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCategory } from "../actions/createCategory";
import { CreateCategorySchema } from "../validations/createCategorySchema";
import CategoryForm from "./CategoryForm";

type CreateCategoryFormProps = {
  onCloseDialog: () => void;
};

const CreateCategoryForm = ({ onCloseDialog }: CreateCategoryFormProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createCategoryMutation, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      onCloseDialog();
      toast.success("Category created successfully");
    },
    onError: () => {
      toast.error("Failed to create category");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", "list"] });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "categorySpending"],
      });
    },
  });

  async function onSubmit(values: CreateCategorySchema) {
    await createCategoryMutation(values);
  }

  return <CategoryForm onSubmit={onSubmit} isPending={isPending} />;
};

export default CreateCategoryForm;
