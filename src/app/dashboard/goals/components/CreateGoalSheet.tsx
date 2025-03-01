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

const CreateGoalSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add Goal</Button>
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