import Search from "@/components/Search";
import CreateGoalSheet from "./components/CreateGoalSheet";
import GoalsServer from "./components/GoalsServer";

type GoalsProps = {
  searchParams: {
    name?: string;
  };
};

const Goals = ({ searchParams }: GoalsProps) => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center gap-2 mb-6">
        <Search id="name" label="Search" queryKey="name" />
        <CreateGoalSheet />
      </div>
      <GoalsServer name={searchParams.name} />
    </div>
  );
};

export default Goals;