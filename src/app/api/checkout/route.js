import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/models/MenuItem";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { cartProducts, address } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
      userEmail,
      ...address,
      cartProducts,
      paid: false,
    });

    const stripeLineItems = [];
    for (const cartProduct of cartProducts) {
      const productInfo = await MenuItem.findById(cartProduct._id);
      if (!productInfo) {
        continue; // Skip if product info is not found
      }

      let productPrice = productInfo.basePrice;
      if (cartProduct.size) {
        const size = productInfo.sizes.find(
          (size) => size._id.toString() === cartProduct.size._id.toString()
        );
        if (size) {
          productPrice += size.price;
        }
      }

      if (cartProduct.extras?.length > 0) {
        for (const cartProductExtra of cartProduct.extras) {
          const extraThingInfo = productInfo.extraIngredientPrices.find(
            (extra) => extra._id.toString() === cartProductExtra._id.toString()
          );
          if (extraThingInfo) {
            productPrice += extraThingInfo.price;
          }
        }
      }

      const productName = productInfo.name;

      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: productName,
          },
          unit_amount: productPrice * 100,
        },
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: userEmail,
      success_url:
        `${process.env.NEXTAUTH_URL}` +
        "orders/" +
        orderDoc._id.toString() +
        "?clear-cart=1",
      cancel_url: `${process.env.NEXTAUTH_URL}/cart?cancel=1`,
      metadata: { orderId: orderDoc._id.toString() },
      payment_intent_data: {
        metadata: { orderId: orderDoc._id.toString() },
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "USD" },
          },
        },
      ],
    });

    return new Response(JSON.stringify({ url: stripeSession.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /api/checkout:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
