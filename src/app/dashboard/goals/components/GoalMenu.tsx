import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import DeleteGoalDialog from "./DeleteGoalDialog";
import EditGoalSheet from "./EditGoalSheet";
import { EditGoalSchema } from "../validations/editGoalSchema";

type GoalMenuProps = {
  goal: EditGoalSchema;
};

const GoalMenu = ({ goal }: GoalMenuProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    setDropdownOpen(false);
  };

  return (
    <>
      <DropdownMenu modal={false} open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => setEditSheetOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDeleteClick}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteGoalDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        goalId={goal.id}
      />
      <EditGoalSheet
        goal={goal}
        open={editSheetOpen}
        onOpenChange={setEditSheetOpen}
      />
    </>
  );
};

export default GoalMenu; 