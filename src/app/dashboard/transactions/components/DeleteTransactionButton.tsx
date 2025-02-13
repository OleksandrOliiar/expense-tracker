import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../actions/deleteTransaction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type DeleteTransactionButtonProps = {
  transactionId: string;
  onClose: () => void;
};

const DeleteTransactionButton = ({
  transactionId,
  onClose,
}: DeleteTransactionButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTransactionMutation, isPending } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["transactions", "list"],
      });
    },
  });

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => deleteTransactionMutation(transactionId)}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteTransactionButton;
