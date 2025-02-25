import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGoal } from "../actions/deleteGoal";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type DeleteGoalButtonProps = {
  goalId: string;
  onClose: () => void;
};

const DeleteGoalButton = ({
  goalId,
  onClose,
}: DeleteGoalButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteGoalMutation, isPending } = useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      toast.success("Goal deleted successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to delete goal");
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ["goals", "list"],
      });
    },
  });

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => deleteGoalMutation(goalId)}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteGoalButton; 