import * as OneSignal from "@onesignal/node-onesignal";

const configuration = OneSignal.createConfiguration({
  restApiKey: process.env.ONE_SIGNAL_API_KEY!,
});

export const oneSignalClient = new OneSignal.DefaultApi(configuration);
