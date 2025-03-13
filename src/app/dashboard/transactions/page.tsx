import Search from "@/components/Search";
import CreateTransactionSheet from "./components/CreateTransactionSheet";
import TransactionsServer from "./components/TransactionsServer";
import DashboardNavigation from "../components/DashboardNavigation";

type TransactionsProps = {
  searchParams: {
    name?: string;
    startDate?: string;
    endDate?: string;
    categories?: string;
    type?: "income" | "expense" | "all";
    date?: string;
    page?: string;
    perPage?: string;
    sort?: string;
  };
};

const Transactions = ({ searchParams }: TransactionsProps) => {
  return (
    <>
      <header className="px-4 mb-8">
        <DashboardNavigation title="Transactions" />
      </header>
      <div className="px-4">
        <div className="flex items-center gap-2 justify-between">
          <Search queryKey="name" label="Search names..." id="name" />
          <div className="flex items-center gap-2">
            <CreateTransactionSheet type="income" />
            <CreateTransactionSheet type="expense" />
          </div>
        </div>
        <TransactionsServer
          name={searchParams.name}
          startDate={searchParams.startDate}
          endDate={searchParams.endDate}
          categories={searchParams.categories}
          type={searchParams.type}
          date={searchParams.date}
          page={searchParams.page}
          perPage={searchParams.perPage}
          sort={searchParams.sort}
        />
      </div>
    </>
  );
};

export default Transactions;
