import mongoose from "mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { cartProducts, address } = await req.json();
  //   const stripeSession = await stripe.checkout.sessions.create({
  //     line_items: [],
  //     mode: "payment",
  //     success_url: "",
  //     cancel_url: ",",
  //     metadata: { orderId: null },
  //     shipping_options: [
  //       {
  //         shipping_rate_data: {
  //           display_name: "Delivery fee",
  //           type: "fixed amount",
  //           fixed_amount: { amount: 500, currency: "USD" },
  //         },
  //       },
  //     ],
  //   });
}
