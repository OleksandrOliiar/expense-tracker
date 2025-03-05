import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash, Pencil } from "lucide-react";
import { useState } from "react";
import DeleteBudgetDialog from "./DeleteBudgetDialog";
import EditBudgetSheet from "./EditBudgetSheet";
import { UserBudget } from "../actions/getUserBudgets";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type BudgetMenuProps = {
  budget: UserBudget;
};

const BudgetMenu = ({ budget }: BudgetMenuProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    setDropdownOpen(false);
  };

  return (
    <>
      <DropdownMenu
        modal={false}
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
      >
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">Actions</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => setEditSheetOpen(true)}>
            <Pencil className="w-4 h-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDeleteClick}>
            <Trash className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteBudgetDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        budgetId={budget.id}
      />
      <EditBudgetSheet
        budget={budget}
        open={editSheetOpen}
        onOpenChange={setEditSheetOpen}
      />
    </>
  );
};

export default BudgetMenu;
