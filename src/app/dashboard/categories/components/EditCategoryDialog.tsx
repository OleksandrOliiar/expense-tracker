import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import EditCategoryForm from "../../components/EditCategoryForm";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";

type EditCategoryDialogProps = {
  name: string;
  categoryId: string;
};

const EditCategoryDialog = ({ name, categoryId }: EditCategoryDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil /> Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <EditCategoryForm
          defaultValues={{
            name,
          }}
          onCloseDialog={() => setOpen(false)}
          categoryId={categoryId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
