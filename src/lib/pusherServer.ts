import PushNotificationsServer from "@pusher/push-notifications-server";
import PusherServer from "pusher";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export const beamsServer = new PushNotificationsServer({
  instanceId: "f199e784-472b-4bd6-a7fe-d908e3a48b04",
  secretKey: "79933E6CA61C2A8941BC60962465B63D1ED4A63EE80E3D11E21065928EF46FEA",
});
