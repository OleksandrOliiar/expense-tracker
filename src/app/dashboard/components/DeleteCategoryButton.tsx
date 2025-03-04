import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../actions/deleteCategory";
import { toast } from "sonner";

type DeleteCategoryButtonProps = {
  categoryId: string;
  onDialogClose: () => void;
};

const DeleteCategoryButton = ({
  categoryId,
  onDialogClose,
}: DeleteCategoryButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategoryMutation, isPending } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      onDialogClose();
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", "list"] });
    },
  });

  const handleDelete = () => {
    deleteCategoryMutation(categoryId);
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteCategoryButton;
