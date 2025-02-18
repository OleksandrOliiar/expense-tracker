type MarketingFeature = {
  name?: string;
};

export type Interval = "month" | "year";

export type Product = {
  priceId: string;
  name: string;
  description: string | null;
  unitAmount: number | null;
  currency: string;
  marketingFeatures: MarketingFeature[];
  interval: Interval;
};
