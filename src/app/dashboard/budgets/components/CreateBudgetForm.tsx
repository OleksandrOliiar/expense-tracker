import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateBudgetSchema } from "../validations/createBudgetSchema";
import BudgetForm from "./BudgetForm";
import { createBudget } from "../actions/createBudget";

type CreateBudgetFormProps = {
  onSheetClose: () => void;
};

const CreateBudgetForm = ({ onSheetClose }: CreateBudgetFormProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createBudgetMutation, isPending } = useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      onSheetClose();
      toast.success("Budget added successfully");
    },
    onError: () => {
      toast.error("Failed to add budget");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets", "list"],
      });
    },
  });

  const handleSubmit = async (data: CreateBudgetSchema) => {
    await createBudgetMutation(data);
  };

  return (
    <BudgetForm
      onSubmit={handleSubmit}
      isPending={isPending}
      defaultValues={{}}
    />
  );
};

export default CreateBudgetForm;
