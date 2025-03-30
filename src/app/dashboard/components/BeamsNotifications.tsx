"use client";

import { beamsClient } from "@/lib/pusherClient";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import { toast } from "sonner";

const BeamsNotifications = () => {
  const { user, isLoading } = useKindeAuth();

  useEffect(() => {
    if (!("Notification" in window)) {
      console.error("This browser does not support notifications");
      return;
    }

    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoading || !user?.id) return;
    
    beamsClient
      .getUserId()
      .then((userId) => {
        if (userId !== user.id) {
          beamsClient.stop();
        }
      })
      .catch(() => {
        toast.error("Failed to initialize notifications");
      });
      
    return () => {
      beamsClient.stop()
    };
  }, [user?.id, isLoading]);

  return null;
};

export default BeamsNotifications;
