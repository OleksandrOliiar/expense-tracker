"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { generateLinkToken } from "../actions/generateLinkToken";
import { toast } from "sonner";
import { usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";
import { Button } from "@/components/ui/button";
import { exchangePublicToken } from "../actions/exchangePublicToken";
import { useQueryClient } from "@tanstack/react-query";
import { checkSubscription } from "../actions/checkSubscription";
import {
  selectSetChangePlanDialogOpen,
  selectSetSubscribeDialogOpen,
  useDialogs,
} from "../../store/dialogs";

const PlaidLink = () => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const setChangePlanDialogOpen = useDialogs(selectSetChangePlanDialogOpen);
  const setSubscribeDialogOpen = useDialogs(selectSetSubscribeDialogOpen);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (publicToken) => {
    try {
      toast.info("Wait for a moment, we are syncing your data...");
      await exchangePublicToken(publicToken);
      toast.success("Data synced successfully");

      queryClient.invalidateQueries({ queryKey: ["banks", "list"] });
    } catch (error) {
      toast.error("Error exchanging public token");
    }
  }, [queryClient]);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  const handleOpen = () => {
    startTransition(async () => {
      try {
        const { data, error } = await checkSubscription();

        if (error === "LIMIT_REACHED") {
          setChangePlanDialogOpen(true);
          return;
        } else if (error === "SUBSCRIPTION_REQUIRED") {
          setSubscribeDialogOpen(true);
          return;
        }

        if (data) {
          open();
        }
      } catch (error) {
        toast.error("Error opening Plaid link");
      }
    });
  };

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
    <Button onClick={handleOpen} disabled={!ready || isPending}>
      {ready && !isPending ? "Connect Bank" : "Loading..."}
    </Button>
  );
};

export default PlaidLink;
