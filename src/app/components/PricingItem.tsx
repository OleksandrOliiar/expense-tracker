import { createCheckoutUrl } from "@/actions/createCheckoutUrl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/Product";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowRight, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface PricingItemProps {
  plan: Product;
}

const PricingItem = ({ plan }: PricingItemProps) => {
  const router = useRouter();
  const { isAuthenticated } = useKindeAuth();
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      if (!isAuthenticated) {
        router.push("/api/auth/login");
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

  return (
    <Card className="flex w-80 flex-col justify-between text-left">
      <CardHeader>
        <CardTitle>
          <p>{plan.name}</p>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
        <span className="text-4xl font-bold">
          {plan.unitAmount ? `$${plan.unitAmount / 100}` : "Free"}
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
              <CircleCheck className="size-4" />
              <span>{feature.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" onClick={handleClick} disabled={isPending}>
          {isAuthenticated ? "Manage" : "Continue"}
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingItem;
