import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditTransactionSchema } from "../validations/editTransactionSchema";
import EditTransactionForm from "./EditTransactionForm";

type EditTransactionSheetProps = {
  transaction: EditTransactionSchema;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditTransactionSheet = ({
  transaction,
  open,
  onOpenChange,
}: EditTransactionSheetProps) => {
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="overflow-y-scroll"
      >
        <SheetHeader className="mb-6">
          <SheetTitle>Edit Transaction</SheetTitle>
        </SheetHeader>
        <EditTransactionForm
          transaction={transaction}
          onSheetClose={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EditTransactionSheet;
