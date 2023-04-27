const shoppingCartRouter = require("express").Router();
const {
  getShoppingCart,
  deleteItemFromShoppingCart,
  addItemToShoppingCart,
  updateItemQuantityInShoppingCart,
  deleteAllItemsFromShoppingCart,
} = require("../db");
const getDeviceType = require("./helpers/getDeviceType");
const { ensureAuthenticated } = require("./middlewares");

shoppingCartRouter.use(ensureAuthenticated);

//* Get shopping cart
shoppingCartRouter.get("/", async (req, res) => {
  try {
    const { id } = req.user;
    const device = getDeviceType({ device: req.device });

    const shoppingCart = await getShoppingCart({ device, userId: id });

    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Delete item from shopping cart
shoppingCartRouter.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { id } = req.user;

    await deleteItemFromShoppingCart({
      productId,
      userId: id,
    });

    const shoppingCart = await getShoppingCart({ userId: id });

    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Delete all items from shopping cart
shoppingCartRouter.delete("/", async (req, res) => {
  try {
    const { id } = req.user;

    await deleteAllItemsFromShoppingCart({
      userId: id,
    });

    const shoppingCart = await getShoppingCart({ userId: id });

    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Add item to shopping cart
shoppingCartRouter.post("/", async (req, res) => {
  try {
    const { id } = req.user;
    const { productId, quantity } = req.body;

    await addItemToShoppingCart({
      userId: id,
      productId,
      quantity,
    });

    const shoppingCart = await getShoppingCart({ userId: id });

    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Update item quantity in shopping cart
shoppingCartRouter.put("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { id } = req.user;
    const { quantity } = req.body;

    await updateItemQuantityInShoppingCart({
      userId: id,
      productId,
      quantity,
    });

    const shoppingCart = await getShoppingCart({ userId: id });

    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = shoppingCartRouter;
