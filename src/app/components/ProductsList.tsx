import { useQuery } from "@tanstack/react-query";
import PricingItem from "./PricingItem";
import { getProducts } from "@/actions/getProducts";

type ProductsListProps = {
  currentSubscriptionId: string | null;
  stripeCustomerId: string | null;
  isYearly: boolean;
};

const ProductsList = ({
  currentSubscriptionId,
  stripeCustomerId,
  isYearly,
}: ProductsListProps) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "list"],
    queryFn: () => getProducts(),
    select(data) {
      if (!data) return [];

      const result = data
        .filter((product) => {
          if (isYearly) {
            return product.interval === "year";
          }

          return product.interval === "month";
        })
        .sort((a, b) => (a.unitAmount ?? 0) - (b.unitAmount ?? 0));

      result.unshift({
        currency: "usd",
        description:
          "Ideal for casual users to track basic finances at no cost",
        interval: isYearly ? "year" : "month",
        name: "Free Tier",
        priceId: "free",
        unitAmount: 0,
        marketingFeatures: [
          {
            name: "Limited number of budgets",
          },
          {
            name: "Limited number of goals",
          },
          {
            name: "Manual transaction entry only",
          },
        ],
      });

      return result;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!products) return <div>No products found</div>;

  return (
    <div className="flex flex-col items-stretch gap-6 md:flex-row">
      {products.map((plan, index) => (
        <PricingItem
          key={index}
          isCurrent={plan.priceId === currentSubscriptionId}
          plan={plan}
          hasPlan={!!currentSubscriptionId}
          stripeCustomerId={stripeCustomerId}
        />
      ))}
    </div>
  );
};

export default ProductsList;
