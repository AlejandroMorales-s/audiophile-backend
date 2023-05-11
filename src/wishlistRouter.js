const wishlistRouter = require("express").Router();

const { getWishlist, addToWishlist, deleteFromWishlist } = require("../db");

//* Get wishlist
wishlistRouter.get("/", async (req, res) => {
  try {
    const { id } = req.user;

    const wishlist = await getWishlist({ userId: id });

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Add to wishlist
wishlistRouter.post("/:productId", async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;

    await addToWishlist({
      userId: id,
      productId,
    });

    const wishlist = await getWishlist({ userId: id });

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Delete from wishlist
wishlistRouter.delete("/:productId", async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;

    await deleteFromWishlist({ userId: id, productId });

    const wishlist = await getWishlist({ userId: id });

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = wishlistRouter;
