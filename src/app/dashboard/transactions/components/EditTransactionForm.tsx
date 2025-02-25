import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditTransactionSchema } from "../validations/editTransactionSchema";
import { editTransaction } from "../actions/editTransaction";
import { toast } from "sonner";
import TransactionForm from "./TransactionForm";
import { CreateTransactionSchema } from "../validations/createTransactionSchema";

type EditTransactionFormProps = {
  transaction: EditTransactionSchema;
  onSheetClose: () => void;
};

const EditTransactionForm = ({
  transaction,
  onSheetClose,
}: EditTransactionFormProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: editTransactionMutation, isPending } = useMutation({
    mutationFn: editTransaction,
    onSuccess: () => {
      toast.success("Transaction updated successfully");
      onSheetClose();
    },
    onError: () => {
      toast.error("Failed to update transaction");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", "list"],
      });
    },
  });

  const handleSubmit = async (data: CreateTransactionSchema) => {
    editTransactionMutation({
      ...data,
      id: transaction.id,
    });
  };

  return (
    <TransactionForm
      onSubmit={handleSubmit}
      isPending={isPending}
      defaultValues={transaction}
      type={transaction.amount > 0 ? "income" : "expense"}
    />
  );
};

export default EditTransactionForm;
