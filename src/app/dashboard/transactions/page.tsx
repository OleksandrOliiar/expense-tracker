import CreateTransactionSheet from "./components/CreateTransactionSheet";
import TransactionsServer from "./components/TransactionsServer";

type TransactionsProps = {
  searchParams: {
    payee?: string;
    startDate?: string;
    endDate?: string;
    categories?: string;
    type?: "income" | "expense" | "all";
  };
};

const Transactions = ({ searchParams }: TransactionsProps) => {
  return (
    <div className="px-4">
      <div className="flex items-center gap-2 justify-end">
        <CreateTransactionSheet type="income" />
        <CreateTransactionSheet type="expense" />
      </div>
      <TransactionsServer
        payee={searchParams.payee}
        startDate={searchParams.startDate}
        endDate={searchParams.endDate}
        categories={searchParams.categories}
        type={searchParams.type}
      />
    </div>
  );
};

export default Transactions;
