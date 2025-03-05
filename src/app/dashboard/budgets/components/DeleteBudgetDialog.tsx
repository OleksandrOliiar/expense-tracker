import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DeleteBudgetButton from "./DeleteBudgetButton";

type DeleteBudgetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budgetId: string;
};

const DeleteBudgetDialog = ({
  open,
  onOpenChange,
  budgetId,
}: DeleteBudgetDialogProps) => {
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  const handleClose = () => {
    handleOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            budget and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <DeleteBudgetButton budgetId={budgetId} onClose={handleClose} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBudgetDialog;
