const productsRouter = require("express").Router();
const { getAllProducts } = require("../db");

productsRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = productsRouter;
