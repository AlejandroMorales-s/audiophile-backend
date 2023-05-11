const calculateOrderAmount = require("./helpers/calculateOrderAmount");

const stripeRouter = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

stripeRouter.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;

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
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = stripeRouter;
