"use client";

import { beamsClient } from "@/lib/pusherClient";
import { useCallback, useLayoutEffect, useState } from "react";

const BeamsNotifications = () => {
  const [loading, setLoading] = useState(true);

  const initBeams = useCallback(() => {
    if (!loading) return;
    setLoading(false);
    console.log("Starting Beams client...");
    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest("hello"))
      .then(() => beamsClient.getDeviceId().then((i) => console.log(i)))
      .then(() => beamsClient.getDeviceInterests().then((i) => console.log(i)))
      .then(() => console.log("Successfully registered and subscribed!"));
  }, [loading]);

  initBeams();

  useLayoutEffect(() => {
    console.log(Notification.permission);
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted");
      }
    });
  });

  return null;
};

export default BeamsNotifications;
