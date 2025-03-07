import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BankStatus, getUserBanks } from "../actions/getUserBanks";
import BanksClient from "./BanksClient";

type BanksServerProps = {
  name?: string;
  status?: string;
};

const BanksServer = async ({ name, status }: BanksServerProps) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["banks", "list", { name, status }],
    queryFn: () => getUserBanks({ name, status: status as BankStatus }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BanksClient />
    </HydrationBoundary>
  );
};

export default BanksServer;
