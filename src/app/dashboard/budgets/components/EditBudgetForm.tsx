import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserBudget } from "../actions/getUserBudgets";
import { editBudget } from "../actions/editBudget";
import { CreateBudgetSchema } from "../validations/createBudgetSchema";
import BudgetForm from "./BudgetForm";

type EditBudgetFormProps = {
  budget: UserBudget;
  onSheetClose: () => void;
};

const EditBudgetForm = ({ budget, onSheetClose }: EditBudgetFormProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: editBudgetMutation, isPending } = useMutation({
    mutationFn: editBudget,
    onSuccess: () => {
      toast.success("Budget updated successfully");
      onSheetClose();
    },
    onError: () => {
      toast.error("Failed to update budget");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets", "list"],
      });
    },
  });

  const handleSubmit = async (data: CreateBudgetSchema) => {
    editBudgetMutation({
      ...data,
      id: budget.id,
    });
  };

  return (
    <BudgetForm
      onSubmit={handleSubmit}
      isPending={isPending}
      defaultValues={budget}
    />
  );
};

export default EditBudgetForm;
