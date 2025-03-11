"use client";

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
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { getProPlans } from "../actions/getProPlans";
import { upgradeSubscription } from "../actions/upgradeSubscription";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ChangePlanDialog = ({ open, onClose }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isYearly, setIsYearly] = useState(false);

  const { data: proPlan, isLoading } = useQuery({
    queryKey: ["products", "pro"],
    enabled: open,
    queryFn: () => getProPlans(),
    select(data) {
      if (!data) return null;

      return data.find(
        (product) => product.interval === (isYearly ? "year" : "month")
      );
    },
  });

  const handleUpgrade = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(async () => {
      if (!proPlan) return;

      try {
        await upgradeSubscription(proPlan?.priceId);
        toast.success("Subscription upgraded successfully");
        onClose();
      } catch (error) {
        console.log("Failed to upgrade subscription: ", error);
        toast.error("Failed to upgrade subscription");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle>Upgrade to Pro</DialogTitle>
          <DialogDescription>
            You've reached the limit of your current plan
          </DialogDescription>
          <div className="flex items-center justify-center gap-2 text-sm pt-2">
            Monthly
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
            />
            Yearly
          </div>
        </DialogHeader>

        {isLoading ? (
          <Skeleton className="h-[168px] rounded-lg" />
        ) : (
          <div className="my-2 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Pro plan</h3>
              <div>
                <span className="font-bold text-sm">
                  ${((proPlan?.unitAmount ?? 0) / 100).toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {proPlan?.description}
            </p>
            <ul className="space-y-1.5 mt-4">
              {proPlan?.marketingFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-1.5">
                  <CheckCircle2 className="size-3.5 text-primary mt-0.5" />
                  <span className="text-sm">{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpgrade}
            disabled={isPending}
            className="bg-primary hover:bg-primary/90"
          >
            {isPending ? "Loading..." : "Upgrade"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePlanDialog;
