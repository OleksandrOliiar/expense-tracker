"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DeleteGoalButton from "./DeleteGoalButton";

type DeleteGoalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalId: string;
};

const DeleteGoalDialog = ({
  open,
  onOpenChange,
  goalId,
}: DeleteGoalDialogProps) => {
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
            This action cannot be undone. This will permanently delete your goal 
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <DeleteGoalButton
            goalId={goalId}
            onClose={handleClose}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGoalDialog; 