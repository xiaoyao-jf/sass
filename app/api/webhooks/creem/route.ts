import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { verifyCreemWebhookSignature } from "@/utils/creem/verify-signature";
import { CreemWebhookEvent } from "@/types/creem";
import {
  createOrUpdateCustomer,
  createOrUpdateSubscription,
  addCreditsToCustomer,
} from "@/utils/supabase/subscriptions";

const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  console.log("🎯 Webhook received at:", new Date().toISOString());
  
  try {
    const body = await request.text();
    console.log("📋 Webhook body:", body.substring(0, 500) + (body.length > 500 ? '...' : ''));

    const headersList = headers();
    const signature = (await headersList).get("creem-signature") || "";
    console.log("🔐 Signature present:", !!signature);

    // Verify the webhook signature
    if (
      !signature ||
      !verifyCreemWebhookSignature(body, signature, CREEM_WEBHOOK_SECRET)
    ) {
      console.error("❌ Invalid webhook signature");
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const event = JSON.parse(body) as CreemWebhookEvent;
    console.log("🎪 Event type:", event.eventType);
    console.log("📦 Event object keys:", Object.keys(event.object || {}));

    // Handle different event types
    switch (event.eventType) {
      case "checkout.completed":
        console.log("💳 Processing checkout.completed");
        await handleCheckoutCompleted(event);
        break;
      case "subscription.active":
        console.log("✅ Processing subscription.active");
        await handleSubscriptionActive(event);
        break;
      case "subscription.paid":
        console.log("💰 Processing subscription.paid");
        await handleSubscriptionPaid(event);
        break;
      case "subscription.canceled":
        console.log("❌ Processing subscription.canceled");
        await handleSubscriptionCanceled(event);
        break;
      case "subscription.expired":
        console.log("⏰ Processing subscription.expired");
        await handleSubscriptionExpired(event);
        break;
      case "subscription.trialing":
        console.log("🆓 Processing subscription.trialing");
        await handleSubscriptionTrialing(event);
        break;
      default:
        console.log(
          `❓ Unhandled event type: ${event.eventType} ${JSON.stringify(event)}`
        );
    }

    console.log("✅ Webhook processing completed successfully");
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("💥 Error processing webhook:", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
}

async function handleCheckoutCompleted(event: CreemWebhookEvent) {
  const checkout = event.object;
  console.log("💳 Processing completed checkout:", JSON.stringify(checkout, null, 2));
  console.log("🔍 Checkout metadata:", checkout.metadata);
  console.log("👤 Customer info:", checkout.customer);
  console.log("🛒 Order info:", checkout.order);

  try {
    // Check if user_id is in metadata
    if (!checkout.metadata?.user_id) {
      console.error("❌ Missing user_id in checkout metadata");
      throw new Error("Missing user_id in checkout metadata");
    }

    // Create or update customer
    console.log("👥 Creating/updating customer...");
    const customerId = await createOrUpdateCustomer(
      checkout.customer,
      checkout.metadata?.user_id // Make sure to pass user_id in metadata when creating checkout
    );
    console.log("✅ Customer created/updated with ID:", customerId);

    // Check if this is a credit purchase
    if (checkout.metadata?.product_type === "credits") {
      console.log("💰 Adding credits to customer...");
      await addCreditsToCustomer(
        customerId,
        checkout.metadata?.credits,
        checkout.order.id,
        `Purchased ${checkout.metadata?.credits} credits`
      );
      console.log("✅ Credits added successfully");
    }
    // If subscription exists, create or update it
    else if (checkout.subscription) {
      console.log("📋 Creating/updating subscription...");
      await createOrUpdateSubscription(checkout.subscription, customerId);
      console.log("✅ Subscription created/updated successfully");
    } else {
      console.log("ℹ️ No subscription found in checkout");
    }
  } catch (error) {
    console.error("💥 Error handling checkout completed:", error);
    throw error;
  }
}

async function handleSubscriptionActive(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing active subscription:", subscription);

  try {
    // Create or update customer
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );

    // Create or update subscription
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription active:", error);
    throw error;
  }
}

async function handleSubscriptionPaid(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing paid subscription:", subscription);

  try {
    // Update subscription status and period
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription paid:", error);
    throw error;
  }
}

async function handleSubscriptionCanceled(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing canceled subscription:", subscription);

  try {
    // Update subscription status
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription canceled:", error);
    throw error;
  }
}

async function handleSubscriptionExpired(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing expired subscription:", subscription);

  try {
    // Update subscription status
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription expired:", error);
    throw error;
  }
}

async function handleSubscriptionTrialing(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing trialing subscription:", subscription);

  try {
    // Update subscription status
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription trialing:", error);
    throw error;
  }
}
