import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import CreateCategoryForm from "../../components/CreateCategoryForm";
import { useState } from "react";

const AddCategoryDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-normal"
          type="button"
        >
          <Plus className="h-4 w-4" />
          Add new category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle>Create category</DialogTitle>
        </AlertDialogHeader>
        <CreateCategoryForm onCloseDialog={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
