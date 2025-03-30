import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../actions/deleteTransaction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type DeleteTransactionButtonProps = {
  transactionIds: string[];
  onClose: () => void;
};

const DeleteTransactionButton = ({
  transactionIds,
  onClose,
}: DeleteTransactionButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTransactionMutation, isPending } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success("Deleted successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to delete");
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["transactions", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard", "recentTransactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard", "monthlyBalance"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard", "categorySpending"],
      });
    },
  });

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => deleteTransactionMutation(transactionIds)}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteTransactionButton;
