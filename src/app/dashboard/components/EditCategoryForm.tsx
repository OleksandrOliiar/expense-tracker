import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryForm from "./CategoryForm";
import { CreateCategorySchema } from "../validations/createCategorySchema";
import { editCategory } from "../actions/editCategory";
import { toast } from "sonner";

type EditCategoryFormProps = {
  defaultValues: Partial<CreateCategorySchema>;
  onCloseDialog: () => void;
  categoryId: string;
};

const EditCategoryForm = ({
  defaultValues,
  onCloseDialog,
  categoryId,
}: EditCategoryFormProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createCategoryMutation, isPending } = useMutation({
    mutationFn: editCategory,
    onSuccess: () => {
      onCloseDialog();
      toast.success("Category edited successfully");
    },
    onError: () => {
      toast.error("Failed to edit category");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", "list"] });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "categorySpending"],
      });
    },
  });

  async function onSubmit(values: CreateCategorySchema) {
    await createCategoryMutation({ ...values, id: categoryId });
  }

  return (
    <CategoryForm
      onSubmit={onSubmit}
      isPending={isPending}
      defaultValues={defaultValues}
    />
  );
};

export default EditCategoryForm;
