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
};

const CategoryCardMenu = ({ id, name }: CategoryCardMenuProps) => {
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
          <TooltipContent side="bottom">Options</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        <EditCategoryDialog name={name} categoryId={id} />
        <DeleteCategoryDialog categoryId={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryCardMenu;
