import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserGoals } from "../actions/getUserGoals";
import GoalsClient from "./GoalsClient";

const GoalsServer = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["goals", "list"],
    queryFn: () => getUserGoals(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoalsClient />
    </HydrationBoundary>
  );
};

export default GoalsServer; 