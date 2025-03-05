import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import EditGoalForm from "./EditGoalForm";

type EditGoalSheetProps = {
  goal: {
    title: string;
    targetAmount: string;
    currentAmount: string;
    id: string;
    description?: string | null;
    endDate?: string | null;
    startDate?: string | null;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditGoalSheet = ({ goal, open, onOpenChange }: EditGoalSheetProps) => {
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
          <SheetTitle>Edit Goal</SheetTitle>
        </SheetHeader>
        <EditGoalForm goal={goal} onSheetClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default EditGoalSheet;
