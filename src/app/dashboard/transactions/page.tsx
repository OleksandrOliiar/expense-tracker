import { columns } from "./components/Columns";
import { DataTable } from "./components/DataTable";
import { payments } from "./data";
import CreateTransactionSheet from "./components/CreateTransactionSheet";

const Transactions = () => {
  return (
    <div className="px-4">
      <div className="flex items-center gap-2 justify-end">
        <CreateTransactionSheet type="income" />
        <CreateTransactionSheet type="expense" />
      </div>
      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default Transactions;
