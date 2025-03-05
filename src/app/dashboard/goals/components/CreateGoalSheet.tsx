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
import CreateGoalForm from "./CreateGoalForm";
import { Plus } from "lucide-react";

type CreateGoalSheetProps = {
  title?: string;
};

const CreateGoalSheet = ({ title = "Goal" }: CreateGoalSheetProps) => {
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
          <SheetTitle>Add New Goal</SheetTitle>
        </SheetHeader>
        <CreateGoalForm onSheetClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default CreateGoalSheet;
