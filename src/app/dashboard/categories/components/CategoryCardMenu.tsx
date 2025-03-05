import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditCategoryDialog from "./EditCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

type CategoryCardMenuProps = {
  id: string;
  name: string;
  icon: string | null;
};

const CategoryCardMenu = ({ id, name, icon }: CategoryCardMenuProps) => {
  return (
    <DropdownMenu>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Options"
                className="rounded-full"
              >
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Actions</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
        <EditCategoryDialog name={name} categoryId={id} icon={icon} />
        <DeleteCategoryDialog categoryId={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryCardMenu;
