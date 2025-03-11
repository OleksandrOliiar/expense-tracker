import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserSubscription } from "../actions/getUserSubscription";
import SubscriptionClient from "./SubscriptionClient";
import PortalLink from "./PortalLink";

const SubscriptionServer = async () => {
  const queryClient = new QueryClient();

  const subscription = await queryClient.fetchQuery({
    queryKey: ["subscription", "details"],
    queryFn: () => getUserSubscription(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Subscription
        </h2>
        {subscription && <PortalLink />}
      </div>
      <SubscriptionClient />
    </HydrationBoundary>
  );
};

export default SubscriptionServer;
