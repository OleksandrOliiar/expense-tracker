import { createCheckoutUrl } from "@/actions/createCheckoutUrl";
import { createPortalUrl } from "@/actions/createPortalUrl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Product } from "@/types/Product";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowRight, CircleCheck, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface PricingItemProps {
  plan: Product;
  isCurrent: boolean;
  hasPlan: boolean;
  stripeCustomerId: string | null;
}

const PricingItem = ({
  plan,
  isCurrent,
  hasPlan,
  stripeCustomerId,
}: PricingItemProps) => {
  const router = useRouter();
  const { isAuthenticated } = useKindeAuth();
  const [isPending, startTransition] = useTransition();

  const isFree = plan.priceId === "free";

  const handleClick = async () => {
    startTransition(async () => {
      if (!isAuthenticated) {
        router.push("/api/auth/login");
        return;
      }

      if (isFree) {
        return;
      }

      if (hasPlan && stripeCustomerId) {
        const { success, data } = await createPortalUrl(stripeCustomerId);

        if (!success || !data) {
          toast.error("Failed to create portal url");
          return;
        }

        window.location.assign(data);
        return;
      }

      const { success, data } = await createCheckoutUrl(plan.priceId);

      if (!success || !data) {
        toast.error("Failed to create checkout url");
        return;
      }

      window.location.assign(data);
    });
  };

  let button = null;
  if (!isFree) {
    button = (
      <Button className="w-full" onClick={handleClick} disabled={isPending}>
        {isAuthenticated
          ? hasPlan
            ? "Manage subscription"
            : "Continue"
          : "Continue"}
        <ArrowRight className="ml-2 size-4" />
      </Button>
    );
  }

  return (
    <Card
      className={cn("flex w-80 flex-col justify-between text-left relative", {
        "border-primary shadow-md": isCurrent,
      })}
    >
      {isCurrent && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Current Plan
        </div>
      )}
      <CardHeader
        className={cn({
          "pt-6": isCurrent,
        })}
      >
        <CardTitle className="mb-1">
          <p>{plan.name}</p>
        </CardTitle>
        <p className="text-sm text-muted-foreground pb-2">{plan.description}</p>
        <span className="text-4xl font-bold">
          ${(plan.unitAmount ?? 0) / 100}
        </span>
      </CardHeader>
      <CardContent>
        <Separator className="mb-6" />
        {plan.name === "Pro" && (
          <p className="mb-3 font-semibold">Everything in Plus, and:</p>
        )}
        <ul className="space-y-4">
          {plan.marketingFeatures.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              {isCurrent ? (
                <CheckCircle2 className="size-4 text-primary" />
              ) : (
                <CircleCheck className="size-4" />
              )}
              <span>{feature.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">{button}</CardFooter>
    </Card>
  );
};

export default PricingItem;
