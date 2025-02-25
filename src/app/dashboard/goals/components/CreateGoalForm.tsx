import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createGoal } from "../actions/createGoal";
import { CreateGoalSchema } from "../validations/createGoalSchema";
import GoalForm from "./GoalForm";

type CreateGoalFormProps = {
  onSheetClose: () => void;
};

const CreateGoalForm = ({
  onSheetClose,
}: CreateGoalFormProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createGoalMutation, isPending } = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      onSheetClose();
      toast.success("Goal added successfully");
    },
    onError: () => {
      toast.error("Failed to add goal");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals", "list"],
      });
    },
  });

  const handleSubmit = async (data: CreateGoalSchema) => {
    await createGoalMutation(data);
  };

  return (
    <GoalForm
      onSubmit={handleSubmit}
      isPending={isPending}
      defaultValues={{}}
    />
  );
};

export default CreateGoalForm; 