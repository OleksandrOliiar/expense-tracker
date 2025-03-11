import { getProducts } from "@/actions/getProducts";
import PricingClient from "./PricingClient";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserSubscription } from "@/lib/stripe";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const PricingServer = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products", "list"],
    queryFn: () => getProducts(),
  });

  const { isAuthenticated } = getKindeServerSession();

  let currentSubscriptionId = null;
  let stripeCustomerId = null;

  if (await isAuthenticated()) {
    const subscription = await getUserSubscription();

    if (subscription) {
      currentSubscriptionId = subscription.stripePriceId;
      stripeCustomerId = subscription.stripeCustomerId;
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PricingClient
        currentSubscriptionId={currentSubscriptionId}
        stripeCustomerId={stripeCustomerId}
      />
    </HydrationBoundary>
  );
};

export default PricingServer;
