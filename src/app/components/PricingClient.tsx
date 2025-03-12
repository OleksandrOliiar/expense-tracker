"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import ProductsList from "./ProductsList";

type PricingClientProps = {
  currentSubscriptionId: string | null;
  stripeCustomerId: string | null;
};

const PricingClient = ({
  currentSubscriptionId,
  stripeCustomerId,
}: PricingClientProps) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-32 px-4" id="pricing">
      <div className="container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty text-4xl font-bold lg:text-6xl">
            Pricing
          </h2>
          <p className="text-muted-foreground lg:text-xl">
            Check out our affordable pricing plans
          </p>
          <div className="flex items-center gap-3 text-lg">
            Monthly
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
            />
            Yearly
          </div>
          <ProductsList
            currentSubscriptionId={currentSubscriptionId}
            stripeCustomerId={stripeCustomerId}
            isYearly={isYearly}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingClient;
