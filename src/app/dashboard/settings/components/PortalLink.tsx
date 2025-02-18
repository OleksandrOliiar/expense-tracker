"use client";

import { Button } from "@/components/ui/button";
import { createPortalLink } from "../actions/createPortalLink";
import { useTransition } from "react";

const PortalLink = () => {
  const [isPending, startTransition] = useTransition();

  const handleCreatePortalLink = () => {
    startTransition(async () => {
      const url = await createPortalLink();
      window.location.assign(url);
    });
  };

  return (
    <Button onClick={handleCreatePortalLink}>
      {isPending ? "Loading..." : "Manage Subscription"}
    </Button>
  );
};

export default PortalLink;
