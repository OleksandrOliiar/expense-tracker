"use client";

import { useEffect } from "react";
import { pusherClient } from "@/lib/pusherClient";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const PusherMessages = () => {
  const { user } = useKindeAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) return;

    pusherClient.subscribe(user.id);

    const handleBudgetsUpdated = () => {
      queryClient.invalidateQueries({ queryKey: ["budgets", "list"] });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "budgets"],
      });
    };

    const handleGoalsUpdated = () => {
      queryClient.invalidateQueries({ queryKey: ["goals", "list"] });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "goals"],
      });
    };

    pusherClient.bind("budgets-updated", handleBudgetsUpdated);
    pusherClient.bind("goals-updated", handleGoalsUpdated);

    return () => {
      pusherClient.unbind("budgets-updated", handleBudgetsUpdated);
      pusherClient.unbind("goals-updated", handleGoalsUpdated);
      pusherClient.unsubscribe(user.id);
    };
  }, [user, queryClient]);

  return null;
};

export default PusherMessages;
