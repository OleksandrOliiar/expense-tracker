"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getUserBanks } from "../actions/getUserBanks";
import BankCard from "./BankCard";
import NoBanksMessage from "./NoBanksMessage";
import NoSearchResults from "./NoSearchResults";

const BanksClient = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? undefined;

  const { data } = useQuery({
    queryKey: ["banks", "list", { name }],
    queryFn: () => getUserBanks({ name }),
  });


  if (!data?.length && !name && !searchParams.get("status"))
    return <NoBanksMessage />;

  return (
    <>
      
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
