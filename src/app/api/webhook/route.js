// import { Order } from "@/models/Order";

// const stripe = require("stripe")(process.env.STRIPE_SK);

// export async function POST(req) {
//   const sig = req.headers.get("stripe-signature");
//   let event;

//   try {
//     const reqBuffer = await req.text();
//     const signSecret = process.env.STRIPE_SIGN_SECRET;
//     event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
//   } catch (e) {
//     console.error("stripe error");
//     console.error(e.message);
//     // return Response.json(e, { status: 400 });
//     return new Response(JSON.stringify({ error: e.message }), { status: 400 });
//   }

//   if (event.type === "checkout.session.completed") {
//     console.log({ orderId: event?.data?.object?.metadata?.orderId });
//     const orderId = event?.data?.object?.metadata?.orderId;
//     const isPaid = event?.data?.object?.payment_status === "paid";
//     if (isPaid) {
//       await Order.updateOne({ _id: orderId }, { paid: true });
//     }
//   }
//   return Response.json("ok", { status: 200 });
// }
import { Order } from "@/models/Order";
import mongoose from "mongoose";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET; // Correct spelling
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error("Stripe webhook signature verification failed.");
    console.error(e.message);
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    const isPaid = session.payment_status === "paid";

    console.log(`Event received: ${event.type}`);
    console.log(`Order ID: ${orderId}`);
    console.log(`Payment status: ${session.payment_status}`);

    if (isPaid) {
      try {
        await mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        await Order.updateOne({ _id: orderId }, { paid: true });
        console.log(`Order ${orderId} marked as paid.`);
      } catch (err) {
        console.error(`Error updating order ${orderId}:`, err);
      }
    }
  }

  return new Response(JSON.stringify({ status: "success" }), { status: 200 });
}
