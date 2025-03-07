import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateBank } from "../actions/deactivateBank";
import { toast } from "sonner";

type DeactivateBankButtonProps = {
  itemId: string;
  onDialogClose: () => void;
};

const DeactivateBankButton = ({
  itemId,
  onDialogClose,
}: DeactivateBankButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deactivateBank(itemId),
    onSuccess: () => {
      toast.success("Bank deactivated successfully");
      onDialogClose();
    },
    onError: () => {
      toast.error("Failed to deactivate bank");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["banks", "list"] });
    },
  });

  return (
    <Button
      variant="destructive"
      onClick={() => mutate()}
      disabled={isPending}
    >
      {isPending ? "Deactivating..." : "Deactivate"}
    </Button>
  );
};

export default DeactivateBankButton;
