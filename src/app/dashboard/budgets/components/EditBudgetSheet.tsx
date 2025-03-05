import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import EditBudgetForm from "./EditBudgetForm";
import { UserBudget } from "../actions/getUserBudgets";

type EditBudgetSheetProps = {
  budget: UserBudget;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditBudgetSheet = ({
  budget,
  open,
  onOpenChange,
}: EditBudgetSheetProps) => {
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="overflow-y-scroll"
      >
        <SheetHeader>
          <SheetTitle>Edit Budget</SheetTitle>
        </SheetHeader>
        <EditBudgetForm
          budget={budget}
          onSheetClose={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EditBudgetSheet;
