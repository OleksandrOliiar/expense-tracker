import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTransaction } from "../actions/createTransaction";
import { CreateTransactionSchema } from "../validations/createTransactionSchema";
import TransactionForm from "./TransactionForm";

type CreateTransactionFormProps = {
  type: "income" | "expense";
  onSheetClose: () => void;
};

const CreateTransactionForm = ({
  type,
  onSheetClose,
}: CreateTransactionFormProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createTransactionMutation, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      onSheetClose();
      toast.success(`${type} added successfully`);
    },
    onError: () => {
      toast.error(`Failed to add ${type}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", "list"],
      });
    },
  });

  const handleSubmit = async (data: CreateTransactionSchema) => {
    await createTransactionMutation(data);
  };

  return (
    <TransactionForm
      onSubmit={handleSubmit}
      isPending={isPending}
      defaultValues={{ type }}
    />
  );
};

export default CreateTransactionForm;
