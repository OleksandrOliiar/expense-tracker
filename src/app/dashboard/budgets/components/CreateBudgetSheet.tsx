"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Plus } from "lucide-react";
import CreateBudgetForm from "./CreateBudgetForm";

type CreateBudgetSheetProps = {
  title?: string;
};

const CreateBudgetSheet = ({ title = "Budget" }: CreateBudgetSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> {title}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add New Budget</SheetTitle>
        </SheetHeader>
        <CreateBudgetForm onSheetClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default CreateBudgetSheet;
