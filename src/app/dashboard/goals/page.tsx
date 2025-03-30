import GoalsServer from "./components/GoalsServer";
import DashboardNavigation from "../components/DashboardNavigation";
import GoalsSkeleton from "./components/GoalsSkeleton";
import { Suspense } from "react";

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
        <Suspense fallback={<GoalsSkeleton />}>
          <GoalsServer name={searchParams.name} />
        </Suspense>
      </div>
    </>
  );
};

export default Goals;
