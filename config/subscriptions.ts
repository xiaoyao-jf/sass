import { ProductTier } from "@/types/subscriptions";

export const SUBSCRIPTION_TIERS: ProductTier[] = [
  {
    name: "Business",
    id: "tier-pro",
    productId: "prod_4q9raYL0MfMiJlGpXjhixk", // $29 monthly subscription
    priceMonthly: "$29",
    description: "Ideal for growing businesses and development teams.",
    features: [
      "Everything in Starter",
      "Multi-currency payments",
      "Priority support",
      "Advanced analytics",
      "Custom branding options",
      "API usage dashboard",
    ],
    featured: true,
    discountCode: "",
  },
];

export const CREDITS_TIERS: ProductTier[] = [
  // 暂时清空，先测试订阅
];
