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
  instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID!,
  secretKey: "2661D9C98D9052D8A49D0091521CD8B8541962FB0806187F7B33DA84D8E96D57",
});
