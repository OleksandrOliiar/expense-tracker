"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getUserBanks } from "../actions/getUserBanks";
import BankCard from "./BankCard";
import NoBanksMessage from "./NoBanksMessage";
import NoSearchResults from "./NoSearchResults";
import Search from "@/components/Search";
import PlaidLink from "./PlaidLink";

const BanksClient = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ["banks", "list", { name }],
    queryFn: () => getUserBanks({ name }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data?.length && !name && !searchParams.get("status"))
    return <NoBanksMessage />;

  return (
    <>
      <div className="flex justify-between flex-wrap items-center mb-6 gap-4">
        <div className="max-w-[350px]">
          <Search queryKey="name" id="bank-name" label="Search by name..." />
        </div>
        <PlaidLink />
      </div>
      {data && data?.length > 0 ? (
        <div className="flex flex-wrap items-stretch gap-4">
          {data.map((bank) => (
            <BankCard key={bank.id} bank={bank} />
          ))}
        </div>
      ) : (
        <NoSearchResults />
      )}
    </>
  );
};

export default BanksClient;
