import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserGoals } from "../actions/getUserGoals";
import GoalsClient from "./GoalsClient";

const GoalsServer = async ({ name }: { name?: string }) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["goals", "list", { name }],
    queryFn: () => getUserGoals({ name }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoalsClient />
    </HydrationBoundary>
  );
};

export default GoalsServer; 