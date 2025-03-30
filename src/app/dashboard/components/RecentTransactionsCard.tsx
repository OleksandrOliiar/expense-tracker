import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { PieChart } from "lucide-react";

type Transaction = {
  id: string;
  amount: string;
  name: string | null;
  date: Date;
  category: {
    name: string;
    id: string;
    icon: string | null;
  } | null;
};

const RecentTransactionsCard = ({ transactions }: { transactions?: Transaction[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-3">
                  {transaction.category?.icon ? (
                    <Image 
                      src={transaction.category.icon} 
                      alt={transaction.category?.name || ""} 
                      width={32} 
                      height={32} 
                      className="rounded-full" 
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <PieChart className="h-4 w-4" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {transaction.name || "Unnamed Transaction"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.category?.name || "Uncategorized"} • {format(new Date(transaction.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${Number(transaction.amount) < 0 ? "text-red-500" : "text-green-500"}`}>
                  {Number(transaction.amount) < 0 ? "-" : "+"}
                  {formatCurrency(Math.abs(Number(transaction.amount)))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No recent transactions
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsCard;