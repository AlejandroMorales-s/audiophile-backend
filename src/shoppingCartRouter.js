const shoppingCartRouter = require("express").Router();
const {
  getShoppingCart,
  deleteItemFromShoppingCart,
  addItemToShoppingCart,
  updateItemQuantityInShoppingCart,
  deleteAllItemsFromShoppingCart,
} = require("../db");
const { ensureAuthenticated } = require("./middlewares");

shoppingCartRouter.use(ensureAuthenticated);

//* Get shopping cart
shoppingCartRouter.get("/", async (req, res) => {
  try {
    const user_id = req.session.passport.user;

    const shoppingCart = await getShoppingCart({ user_id });

    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Delete item from shopping cart
shoppingCartRouter.delete("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const user_id = req.session.passport.user;

    await deleteItemFromShoppingCart({
      product_id,
      user_id,
    });

    const shoppingCart = await getShoppingCart({ user_id });

    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Delete all items from shopping cart
shoppingCartRouter.delete("/", async (req, res) => {
  try {
    const user_id = req.session.passport.user;

    await deleteAllItemsFromShoppingCart({
      user_id,
    });

    const shoppingCart = await getShoppingCart({ user_id });

    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Add item to shopping cart
shoppingCartRouter.post("/", async (req, res) => {
  try {
    const user_id = req.session.passport.user;
    const { product_id, quantity } = req.body;

    await addItemToShoppingCart({
      user_id,
      product_id,
      quantity,
    });

    const shoppingCart = await getShoppingCart({ user_id });

    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Update item quantity in shopping cart
shoppingCartRouter.put("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const user_id = req.session.passport.user;
    const { quantity } = req.body;

    await updateItemQuantityInShoppingCart({
      user_id,
      product_id,
      quantity,
    });

    const shoppingCart = await getShoppingCart({ user_id });

    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = shoppingCartRouter;
