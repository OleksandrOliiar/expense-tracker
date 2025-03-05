import { Goal, ListTodo, TableProperties } from "lucide-react";
import CreateCategoryDialog from "./CreateCategoryDialog";

const NoCategoriesMessage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
        <div className="bg-primary/10 p-4 rounded-full">
          <Goal className="h-12 w-12 text-primary" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">
            No categories yet
          </h3>
          <p className="text-muted-foreground max-w-sm">
            Begin organizing your finances by creating your first category.
          </p>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <CreateCategoryDialog title="Create your first category" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4">
          <div className="bg-muted/60 rounded-lg p-4 text-left">
            <ListTodo className="h-5 w-5 mb-4 text-primary" />
            <h4 className="font-medium mb-1">Organize Your Finances</h4>
            <p className="text-sm text-muted-foreground">
              Easily categorize your expenses and income for a clear financial
              picture
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <TableProperties className="h-5 w-5 mb-4 text-primary" />
            <h4 className="font-medium mb-1">Track Your Spending</h4>
            <p className="text-sm text-muted-foreground">
              Create categories to group similar expenses and get a clear
              picture of your spending habits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoCategoriesMessage;
