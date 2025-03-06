import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditGoalSchema } from "../validations/editGoalSchema";
import { editGoal } from "../actions/editGoal";
import { toast } from "sonner";
import GoalForm from "./GoalForm";
import { CreateGoalSchema } from "../validations/createGoalSchema";

type EditGoalFormProps = {
  goal: {
    title: string;
    targetAmount: string;
    currentAmount: string;
    id: string;
    description?: string | null;
    endDate: Date;
    startDate: Date;
  };
  onSheetClose: () => void;
};

const EditGoalForm = ({ goal, onSheetClose }: EditGoalFormProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: editGoalMutation, isPending } = useMutation({
    mutationFn: editGoal,
    onSuccess: () => {
      toast.success("Goal updated successfully");
      onSheetClose();
    },
    onError: () => {
      toast.error("Failed to update goal");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals", "list"],
      });
    },
  });

  const handleSubmit = async (data: CreateGoalSchema) => {
    editGoalMutation({
      ...data,
      id: goal.id,
    });
  };

  return (
    <GoalForm
      onSubmit={handleSubmit}
      isPending={isPending}
      defaultValues={goal}
    />
  );
};

export default EditGoalForm;
