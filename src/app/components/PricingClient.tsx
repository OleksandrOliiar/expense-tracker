"use client";

import { Switch } from "@/components/ui/switch";
import { Product } from "@/types/Product";
import { useMemo, useState } from "react";
import PricingItem from "./PricingItem";

type PricingClientProps = {
  products: Product[];
};

const PricingClient = ({ products }: PricingClientProps) => {
  const [isYearly, setIsYearly] = useState(false);

  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => {
          if (isYearly) {
            return product.interval === "year";
          }

          return product.interval === "month";
        })
        .sort((a, b) => (a.unitAmount ?? 0) - (b.unitAmount ?? 0)),
    [isYearly, products]
  );

  return (
    <section className="py-32">
      <div className="container">
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
          <div className="flex flex-col items-stretch gap-6 md:flex-row">
            {filteredProducts.map((plan, index) => (
              <PricingItem key={index} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingClient;
