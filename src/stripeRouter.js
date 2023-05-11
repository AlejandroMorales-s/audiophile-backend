const calculateOrderAmount = require("./helpers/calculateOrderAmount");

const stripeRouter = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

stripeRouter.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://audiophile-ecommerce-chi.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items).grandTotal * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = stripeRouter;
