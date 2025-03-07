import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserBanks } from "../actions/getUserBanks";
import BanksClient from "./BanksClient";

type BanksServerProps = {
  name?: string;
};

const BanksServer = async ({ name }: BanksServerProps) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["banks", "list", name],
    queryFn: () => getUserBanks(name),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BanksClient />
    </HydrationBoundary>
  );
};

export default BanksServer;
