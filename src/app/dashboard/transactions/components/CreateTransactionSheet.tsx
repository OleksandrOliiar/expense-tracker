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
import CreateTransactionForm from "./CreateTransactionForm";
import { Plus } from "lucide-react";

type CreateTransactionSheetProps = {
  type: "income" | "expense";
};

const CreateTransactionSheet = ({ type }: CreateTransactionSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus /> {type}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader className="mb-6">
          <SheetTitle>Add {type}</SheetTitle>
        </SheetHeader>
        <CreateTransactionForm
          type={type}
          onSheetClose={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CreateTransactionSheet;
