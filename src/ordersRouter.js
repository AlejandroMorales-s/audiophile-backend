const ordersRouter = require("express").Router();

const calculateOrderAmount = require("./helpers/calculateOrderAmount");
const { getShoppingCart, createOrder, getOrders } = require("../db");
const getDeviceType = require("./helpers/getDeviceType");

ordersRouter.get("/", async (req, res) => {
  try {
    const { id } = req.user;

    const data = await getOrders({ userId: id });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

ordersRouter.get("/order-amount", async (req, res) => {
  try {
    const { id } = req.user;
    const device = getDeviceType({ device: req.device });

    const shoppingCart = await getShoppingCart({ device, userId: id });
    const orderAmount = calculateOrderAmount(shoppingCart);

    res.send(orderAmount);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

ordersRouter.post("/create-order", async (req, res) => {
  try {
    const { id } = req.user;
    const orderData = req.body;
    orderData.userId = id;

    const data = await createOrder(orderData);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = ordersRouter;
