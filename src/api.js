const apiRouter = require("express").Router();

apiRouter.use("/auth", require("./authRouter"));
apiRouter.use("/products", require("./productsRouter"));
apiRouter.use("/sentiment-analysis", require("./sentimentAnalysisRouter"));
apiRouter.use("/shopping-cart", require("./shoppingCartRouter"));
apiRouter.use("/wishlist", require("./wishlistRouter"));

module.exports = apiRouter;
