import * as PusherPushNotifications from "@pusher/push-notifications-web";
import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    authEndpoint: "/api/pusher/auth",
    authTransport: "ajax",
    auth: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  }
);

export const beamsClient = new PusherPushNotifications.Client({
  instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID!,
});