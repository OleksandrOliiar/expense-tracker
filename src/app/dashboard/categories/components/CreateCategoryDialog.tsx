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
import CreateCategoryForm from "./CreateCategoryForm";

const CreateCategoryDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>

      <DialogTrigger asChild>
        <Button className="w-[300px]">Create category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
        </DialogHeader>
        <CreateCategoryForm onCloseDialog={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
