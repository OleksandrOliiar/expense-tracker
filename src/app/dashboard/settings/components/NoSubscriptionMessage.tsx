import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import Link from "next/link";

const NoSubscriptionMessage = () => {
  return (
    <div className="w-full mb-8">
      <div>
        <div className="flex flex-col items-center justify-center text-center py-6 space-y-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <CreditCard className="h-12 w-12 text-primary" />
          </div>

          <div className="space-y-2 max-w-md">
            <h3 className="text-xl font-bold tracking-tight">
              Upgrade to unlock premium features
            </h3>
            <p className="text-muted-foreground">
              Get access to advanced features like connecting multiple bank
              accounts, detailed analytics, and more with our premium plans.
            </p>
          </div>

          <Button asChild>
            <Link href="/#pricing">View Plans</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoSubscriptionMessage;
