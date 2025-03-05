import { Calculator, CircleDollarSign, Target } from "lucide-react";
import CreateBudgetSheet from "./CreateBudgetSheet";

const NoBudgetsMessage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
        <div className="bg-primary/10 p-4 rounded-full">
          <CircleDollarSign className="h-12 w-12 text-primary" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">No budgets yet</h3>
          <p className="text-muted-foreground max-w-sm">
            Start managing your finances by creating your first budget.
          </p>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <CreateBudgetSheet title="Create your first budget" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4">
          <div className="bg-muted/60 rounded-lg p-4 text-left">
            <Calculator className="h-5 w-5 mb-4 text-primary" />
            <h4 className="font-medium mb-1">Track Expenses</h4>
            <p className="text-sm text-muted-foreground">
              Monitor your spending habits and stay on top of your finances.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <Target className="h-5 w-5 mb-4 text-primary" />
            <h4 className="font-medium mb-1">Achieve Financial Goals</h4>
            <p className="text-sm text-muted-foreground">
              Set financial objectives and work towards achieving them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoBudgetsMessage;
