import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PowerOff } from "lucide-react";
import { deactivateBank } from "../actions/deactivateBank";
import { toast } from "sonner";

type DeactivateBankButtonProps = {
  itemId: string;
};

const DeactivateBankButton = ({ itemId }: DeactivateBankButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deactivateBank(itemId),
    onSuccess: () => {
      toast.success("Bank deactivated successfully");
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
      size="sm"
      onClick={() => mutate()}
      disabled={isPending}
    >
      <PowerOff className="mr-1 h-4 w-4" />
      {isPending ? "Deactivating..." : "Deactivate"}
    </Button>
  );
};

export default DeactivateBankButton;
