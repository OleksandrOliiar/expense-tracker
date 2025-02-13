import CreateTransactionSheet from "./components/CreateTransactionSheet";
import TransactionsServer from "./components/TransactionsServer";

const Transactions = () => {
  return (
    <div className="px-4">
      <div className="flex items-center gap-2 justify-end">
        <CreateTransactionSheet type="income" />
        <CreateTransactionSheet type="expense" />
      </div>
      <TransactionsServer />
    </div>
  );
};

export default Transactions;
