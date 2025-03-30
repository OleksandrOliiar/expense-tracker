import { Suspense } from "react";
import DashboardNavigation from "../components/DashboardNavigation";
import BudgetsServer from "./components/BudgetsServer";
import BudgetsSkeleton from "./components/BudgetsSkeleton";
import Search from "@/components/Search";
import CreateBudgetSheet from "./components/CreateBudgetSheet";

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
        <div className="flex justify-between items-center gap-2 mb-6">
          <Search id="name" label="Search" queryKey="name" />
          <CreateBudgetSheet />
        </div>
        <Suspense fallback={<BudgetsSkeleton />}>
          <BudgetsServer name={searchParams.name} />
        </Suspense>
      </div>
    </>
  );
};

export default Budgets;
