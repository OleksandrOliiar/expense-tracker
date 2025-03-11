"use client";

import { createCheckoutUrl } from "@/actions/createCheckoutUrl";
import { getProducts } from "@/actions/getProducts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SubscribeDialog = ({ open, onClose }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "list"],
    enabled: open,
    queryFn: () => getProducts(),
    select(data) {
      if (!data) return [];

      return data
        .filter(
          (product) =>
            product.interval === (isYearly ? "year" : "month") &&
            product.priceId !== "free"
        )
        .sort((a, b) => (a.unitAmount ?? 0) - (b.unitAmount ?? 0));
    },
  });

  const handleSubscribe = () => {
    if (!selectedPlan) return;

    startTransition(async () => {
      const { success, data } = await createCheckoutUrl(
        selectedPlan,
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings`,
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings`
      );

      if (!success || !data) {
        toast.error("Failed to create checkout url");
        return;
      }

      window.location.assign(data);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle>Choose a plan</DialogTitle>
          <DialogDescription>
            Subscribe to unlock premium features
          </DialogDescription>
          <div className="flex items-center justify-center gap-2 text-sm pt-2">
            Monthly
            <Switch
              checked={isYearly}
              onCheckedChange={() => {
                setIsYearly(!isYearly);
                setSelectedPlan(null);
              }}
            />
            Yearly
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-3 py-2">
            <Skeleton className="h-[125px] rounded-lg" />
            <Skeleton className="h-[125px] rounded-lg" />
          </div>
        ) : (
          <div className="space-y-3 py-2">
            {products?.map((plan) => (
              <div
                key={plan.priceId}
                className={cn(
                  "rounded-lg border p-3 cursor-pointer transition-colors",
                  selectedPlan === plan.priceId
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/30"
                )}
                onClick={() => setSelectedPlan(plan.priceId)}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full border-2",
                        selectedPlan === plan.priceId
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      )}
                    />
                    <h3 className="font-semibold">{plan.name}</h3>
                  </div>
                  <div>
                    <span className="font-bold text-sm">
                      ${((plan.unitAmount ?? 0) / 100).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                </div>
                <ul className="space-y-1 mt-2 pl-5">
                  {plan.marketingFeatures.slice(0, 3).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-1.5 text-sm"
                    >
                      <CheckCircle2
                        className={cn(
                          "size-3.5 mt-[2.5px]",
                          plan.name === "Pro" ? "text-primary" : ""
                        )}
                      />
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2 ">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={handleSubscribe}
            disabled={isPending || !selectedPlan}
          >
            {isPending ? "Processing..." : "Subscribe"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeDialog;
