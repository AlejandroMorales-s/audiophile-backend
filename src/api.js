const apiRouter = require("express").Router();

const { ensureAuthenticated } = require("./middlewares");

apiRouter.use("/auth", require("./authRouter"));
apiRouter.use("/products", require("./productsRouter"));
apiRouter.use("/sentiment-analysis", require("./sentimentAnalysisRouter"));
apiRouter.use("/payment", require("./stripeRouter"));

//* Apply ensureAuthenticated middleware to the routers that require authentication
apiRouter.use(
  "/shopping-cart",
  ensureAuthenticated,
  require("./shoppingCartRouter")
);
apiRouter.use("/wishlist", ensureAuthenticated, require("./wishlistRouter"));
apiRouter.use("/user", ensureAuthenticated, require("./userRouter"));
apiRouter.use("/orders", ensureAuthenticated, require("./ordersRouter"));

module.exports = apiRouter;
