import GoalsServer from "./components/GoalsServer";
import DashboardNavigation from "../components/DashboardNavigation";
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
        <GoalsServer name={searchParams.name} />
      </div>
    </>
  );
};

export default Goals;
