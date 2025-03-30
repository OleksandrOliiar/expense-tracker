import { Suspense } from "react";
import DashboardNavigation from "../components/DashboardNavigation";
import BudgetsServer from "./components/BudgetsServer";
import BudgetsSkeleton from "./components/BudgetsSkeleton";

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
        <Suspense fallback={<BudgetsSkeleton />}>
          <BudgetsServer name={searchParams.name} />
        </Suspense>
      </div>
    </>
  );
};

export default Budgets;
