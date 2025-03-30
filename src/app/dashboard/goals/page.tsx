import GoalsServer from "./components/GoalsServer";
import DashboardNavigation from "../components/DashboardNavigation";
import GoalsSkeleton from "./components/GoalsSkeleton";
import { Suspense } from "react";
import Search from "@/components/Search";
import CreateGoalSheet from "./components/CreateGoalSheet";

type GoalsProps = {
  searchParams: {
    name?: string;
  };
};

const Goals = ({ searchParams }: GoalsProps) => {
  return (
    <>
      <header className="px-4 mb-8">
        <DashboardNavigation title="Goals" />
      </header>
      <div className="px-4">
        <div className="flex justify-between items-center gap-2 mb-6">
          <Search id="name" label="Search" queryKey="name" />
          <CreateGoalSheet />
        </div>
        <Suspense fallback={<GoalsSkeleton />}>
          <GoalsServer name={searchParams.name} />
        </Suspense>
      </div>
    </>
  );
};

export default Goals;
