import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import Link from "next/link";

const NoRecentTransactions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6 space-y-4 text-center">
          <div className="bg-primary/10 p-3 rounded-full">
            <Receipt className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground">No recent transactions</p>
          <Button asChild>
            <Link href="/dashboard/transactions/new">Add Transaction</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoRecentTransactions;