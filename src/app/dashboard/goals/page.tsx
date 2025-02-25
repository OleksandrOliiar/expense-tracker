import CreateGoalSheet from "./components/CreateGoalSheet";
import GoalsServer from "./components/GoalsServer";

const Goals = () => {
  return (
    <div className="px-4">
      <div className="flex items-center gap-2 justify-end mb-6">
        <CreateGoalSheet />
      </div>
      <GoalsServer />
    </div>
  );
};

export default Goals;