"use client";

import { useCallback, useEffect, useState } from "react";
import { generateLinkToken } from "../actions/generateLinkToken";
import { toast } from "sonner";
import { usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";
import { Button } from "@/components/ui/button";
import { exchangePublicToken } from "../actions/exchangePublicToken";

const PlaidLink = () => {
  const [token, setToken] = useState<string | null>(null);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (publicToken) => {
    try {
      await exchangePublicToken(publicToken);
    } catch (error) {
      toast.error("Error exchanging public token");
    }
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  useEffect(() => {
    (async () => {
      try {
        const { link_token } = await generateLinkToken();
        setToken(link_token);
      } catch (error) {
        toast.error("Error generating link token");
      }
    })();
  }, []);

  return (
    <Button onClick={() => open()} disabled={!ready}>
      {ready ? "Connect Bank" : "Loading..."}
    </Button>
  );
};

export default PlaidLink;
