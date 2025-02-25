import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EditGoalSchema } from "../validations/editGoalSchema";
import GoalMenu from "./GoalMenu";
import { format } from "date-fns";

type GoalCardProps = {
  goal: EditGoalSchema;
};

const GoalCard = ({ goal }: GoalCardProps) => {
  const currentAmount = Number(goal.currentAmount || 0);
  const targetAmount = Number(goal.targetAmount);
  const progress = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{goal.title}</CardTitle>
        <GoalMenu goal={goal} />
      </CardHeader>
      <CardContent className="space-y-3">
        {goal.description && <p className="text-sm text-muted-foreground">{goal.description}</p>}
        
        <div className="flex justify-between text-sm mb-1">
          <span>${currentAmount.toLocaleString()}</span>
          <span>${targetAmount.toLocaleString()}</span>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="text-right text-sm text-muted-foreground">
          {progress}% complete
        </div>
      </CardContent>
      
      {goal.dueDate && (
        <CardFooter className="text-sm text-muted-foreground pt-0">
          Due by: {format(new Date(goal.dueDate), "PPP")}
        </CardFooter>
      )}
    </Card>
  );
};

export default GoalCard; 