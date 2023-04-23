const productsRouter = require("express").Router();
const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} = require("../db");

//* Get all products
productsRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Get a single product by id
productsRouter.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await getProductById({ productId });

    if (!product.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Get products by category
productsRouter.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const products = await getProductsByCategory({ category });

    if (!products.length) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = productsRouter;
