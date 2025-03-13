"use client";

import { Button } from "@/components/ui/button";
import { LoginLink, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

const StartTrackingButton = () => {
  const router = useRouter();
  const { isAuthenticated } = useKindeAuth();

  if (isAuthenticated) {
    return (
      <Button
        size="lg"
        className="mt-10"
        onClick={() => router.push("/dashboard")}
      >
        Start Tracking for Free
      </Button>
    );
  }

  return (
    <LoginLink>
      <Button
        size="lg"
        className="mt-10"
        onClick={() => router.push("/dashboard")}
      >
        Start Tracking for Free
      </Button>
    </LoginLink>
  );
};

export default StartTrackingButton;
