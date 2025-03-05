import { Goal, TrendingUp, Milestone } from "lucide-react";
import CreateGoalSheet from "./CreateGoalSheet";

const NoGoalsMessage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
        <div className="bg-primary/10 p-4 rounded-full">
          <Goal className="h-12 w-12 text-primary" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">No goals yet</h3>
          <p className="text-muted-foreground max-w-sm">
            Start tracking your savings progress by creating your first
            financial goal.
          </p>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <CreateGoalSheet title="Create your first goal" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4">
          <div className="bg-muted/60 rounded-lg p-4 text-left">
            <TrendingUp className="h-5 w-5 mb-4 text-primary" />
            <h4 className="font-medium mb-1">Track Progress</h4>
            <p className="text-sm text-muted-foreground">
              Visualize your savings journey with beautiful charts
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <Milestone className="h-5 w-5 mb-4 text-primary" />
            <h4 className="font-medium mb-1">Stay Motivated</h4>
            <p className="text-sm text-muted-foreground">
              Set deadlines and celebrate milestones along the way
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoGoalsMessage;
