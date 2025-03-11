import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createGoal } from "../actions/createGoal";
import { CreateGoalSchema } from "../validations/createGoalSchema";
import GoalForm from "./GoalForm";
import { useDialogs } from "../../store/dialogs";

type CreateGoalFormProps = {
  onSheetClose: () => void;
};

const CreateGoalForm = ({ onSheetClose }: CreateGoalFormProps) => {
  const queryClient = useQueryClient();
  const { setSubscribeDialogOpen } = useDialogs();

  const { mutateAsync: createGoalMutation, isPending } = useMutation({
    mutationFn: createGoal,
    onSuccess: (result) => {
      if ("error" in result) {
        if (result.error === "LIMIT_REACHED") {
          setSubscribeDialogOpen(true);
        } else {
          toast.error(result.message || "Failed to add goal");
        }
        return;
      }

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

  return <GoalForm onSubmit={handleSubmit} isPending={isPending} />;
};

export default CreateGoalForm;
