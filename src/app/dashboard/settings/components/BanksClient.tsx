"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserBanks } from "../actions/getUserBanks";
import BankCard from "./BankCard";
import { useSearchParams } from "next/navigation";

const BanksClient = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ["banks", "list", name],
    queryFn: () => getUserBanks(name),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {data?.map((bank) => (
        <BankCard key={bank.id} bank={bank} />
      ))}
    </div>
  );
};

export default BanksClient;
