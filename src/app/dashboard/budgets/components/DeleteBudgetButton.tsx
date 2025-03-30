import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget } from "../actions/deleteBudget";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type DeleteBudgetButtonProps = {
  budgetId: string;
  onClose: () => void;
};

const DeleteBudgetButton = ({ budgetId, onClose }: DeleteBudgetButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteBudgetMutation, isPending } = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      toast.success("Budget deleted successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to delete budget");
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["budgets", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard", "budgets"],
      });
    },
  });

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => deleteBudgetMutation(budgetId)}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteBudgetButton;
