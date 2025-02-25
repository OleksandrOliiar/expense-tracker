import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditGoalSchema } from "../validations/editGoalSchema";
import EditGoalForm from "./EditGoalForm";

type EditGoalSheetProps = {
  goal: EditGoalSchema;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditGoalSheet = ({
  goal,
  open,
  onOpenChange,
}: EditGoalSheetProps) => {
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SheetHeader>
          <SheetTitle>Edit Goal</SheetTitle>
        </SheetHeader>
        <EditGoalForm
          goal={goal}
          onSheetClose={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EditGoalSheet; 