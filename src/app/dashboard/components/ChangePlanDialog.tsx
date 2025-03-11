"use client";

import { getPortalUrl } from "@/actions/getPortalUrl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/actions/getProducts";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ChangePlanDialog = ({ open, onClose }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isYearly, setIsYearly] = useState(false);

  const { data: proPlan, isLoading } = useQuery({
    queryKey: ["products", "list"],
    enabled: open,
    queryFn: () => getProducts(),
    select(data) {
      if (!data) return null;

      return data.find(
        (product) =>
          product.productId ===
            process.env.NEXT_PUBLIC_STRIPE_PRO_SUBSCRIPTION_ID &&
          product.interval === (isYearly ? "year" : "month")
      );
    },
  });

  const handleUpgrade = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const result = await getPortalUrl();
        window.location.assign(result);
      } catch (error) {
        console.log("Failed to get portal url: ", error);
        toast.error("Failed to get portal url");
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[400px] max-h-[85vh] overflow-y-auto">
        <AlertDialogHeader className="space-y-2">
          <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
          <AlertDialogDescription>
            You've reached the limit of your current plan
          </AlertDialogDescription>
          <div className="flex items-center justify-center gap-2 text-sm pt-2">
            Monthly
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
            />
            Yearly
          </div>
        </AlertDialogHeader>

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

        <AlertDialogFooter className="flex justify-end gap-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleUpgrade}
            disabled={isPending}
            className="bg-primary hover:bg-primary/90"
          >
            {isPending ? "Loading..." : "Upgrade"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangePlanDialog;
