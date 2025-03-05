"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CreateCategoryForm from "../../components/CreateCategoryForm";
import { Plus } from "lucide-react";

interface CreateCategoryDialogProps {
  title?: string;
}

const CreateCategoryDialog = ({
  title = "Category",
}: CreateCategoryDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
        </DialogHeader>
        <CreateCategoryForm onCloseDialog={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
