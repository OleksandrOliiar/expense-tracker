"use client";

import OneSignal from "react-onesignal";
import { useEffect } from "react";

const Notifications = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID!,
        notifyButton: {
          enable: true,
        },
        serviceWorkerPath: "/OneSignalSDK-v16-ServiceWorker/OneSignalSDKWorker.js",
        allowLocalhostAsSecureOrigin: true
      }).then(() => {
        console.log("OneSignal initialized successfully");
        // Check if user is subscribed
      }).then((isEnabled) => {
        console.log("Push notifications enabled:", isEnabled);
      }).catch(err => {
        console.error("OneSignal initialization error:", err);
      });
    }
  }, []);

  return null;
};

export default Notifications;