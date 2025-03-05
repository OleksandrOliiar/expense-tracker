import BudgetsServer from "./components/BudgetsServer";

type BudgetsProps = {
  searchParams: {
    name?: string;
  };
};

const Budgets = ({ searchParams }: BudgetsProps) => {
  return (
    <div className="px-4">
      <BudgetsServer name={searchParams.name} />
    </div>
  );
};

export default Budgets;
