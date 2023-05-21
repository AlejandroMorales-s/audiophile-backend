const productsRouter = require("express").Router();
const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} = require("../db");
const getDeviceType = require("./helpers/getDeviceType");

//* Get all products
productsRouter.get("/", async (req, res) => {
  const device = getDeviceType({ device: req.device });

  try {
    const products = await getAllProducts({ device });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Get a single product by id
productsRouter.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  const device = getDeviceType({ device: req.device });

  try {
    const product = await getProductById({
      device,
      productId: parseInt(productId),
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Unhandled error" });
  }
});

//* Get products by category
productsRouter.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  const device = getDeviceType({ device: req.device });

  try {
    const products = await getProductsByCategory({ device, category });

    if (!products.length) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = productsRouter;
