import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateBudgetSchema } from "../validations/createBudgetSchema";
import BudgetForm from "./BudgetForm";
import { createBudget } from "../actions/createBudget";
import { useDialogs } from "../../store/dialogs";

type CreateBudgetFormProps = {
  onSheetClose: () => void;
};

const CreateBudgetForm = ({ onSheetClose }: CreateBudgetFormProps) => {
  const queryClient = useQueryClient();
  const { setSubscribeDialogOpen } = useDialogs();

  const { mutateAsync: createBudgetMutation, isPending } = useMutation({
    mutationFn: createBudget,
    onSuccess: (result) => {
      if ("error" in result) {
        if (result.error === "LIMIT_REACHED") {
          setSubscribeDialogOpen(true);
        } else {
          toast.error(result.message || "Failed to add budget");
        }
        return;
      }

      onSheetClose();
      toast.success("Budget added successfully");
    },
    onError: (error) => {
      console.error("Budget creation error:", error);
      toast.error("Failed to add budget");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["budgets", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard", "budgets"],
      })
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
