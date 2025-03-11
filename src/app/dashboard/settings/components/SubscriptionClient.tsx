"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock, Package } from "lucide-react";
import { getUserSubscription } from "../actions/getUserSubscription";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
import NoSubscriptionMessage from "./NoSubscriptionMessage";

const SubscriptionClient = () => {
  const {
    data: subscription,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subscription", "details"],
    queryFn: () => getUserSubscription(),
  });

  if (isLoading) return <div>Loading subscription details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!subscription) return <NoSubscriptionMessage />;

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Package className="h-4 w-4 mr-2" />
              <span className="text-sm">Plan</span>
            </div>
            <p className="font-medium">
              {subscription.productName || "Unknown Plan"}
            </p>
            {subscription.priceAmount &&
              subscription.currency &&
              subscription.interval && (
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(
                    subscription.priceAmount,
                    subscription.currency
                  )}{" "}
                  / {subscription.interval}
                </p>
              )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <CalendarClock className="h-4 w-4 mr-2" />
              <span className="text-sm">Billing Period</span>
            </div>
            {subscription.currentPeriodStart &&
            subscription.currentPeriodEnd ? (
              <>
                <p className="font-medium">
                  {formatDate(subscription.currentPeriodStart)} -{" "}
                  {formatDate(subscription.currentPeriodEnd)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {subscription.cancelAtPeriodEnd
                    ? "Cancels at period end"
                    : `Renews on ${formatDate(subscription.currentPeriodEnd)}`}
                </p>
              </>
            ) : (
              <p className="font-medium">Not available</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionClient;
