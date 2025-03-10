import { getProducts } from "@/actions/getProducts";
import PricingClient from "./PricingClient";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserSubscription } from "@/lib/stripe";

const PricingServer = async () => {
  const products = await getProducts();
  const { isAuthenticated } = getKindeServerSession();

  let currentSubscriptionId = null;

  if (await isAuthenticated()) {
    const subscription = await getUserSubscription();

    if (subscription) {
      currentSubscriptionId = subscription.stripePriceId;
    }
  }

  return (
    <PricingClient
      products={products}
      currentSubscriptionId={currentSubscriptionId}
    />
  );
};

export default PricingServer;
