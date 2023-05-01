// @ts-expect-error
import analytics from "@segment/analytics-next";

analytics.track("User Signed Up", {
  plan: "Pro",
  revenue: 99.99,
});
