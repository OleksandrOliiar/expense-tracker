import DashboardNavigation from "../components/DashboardNavigation";
import BudgetsServer from "./components/BudgetsServer";

type BudgetsProps = {
  searchParams: {
    name?: string;
  };
};

const Budgets = ({ searchParams }: BudgetsProps) => {
  return (
    <>
      <header className="px-4 mb-8">
        <DashboardNavigation title="Budgets" />
      </header>
      <div className="px-4">
        <BudgetsServer name={searchParams.name} />
      </div>
    </>
  );
};

export default Budgets;
