const apiRouter = require("express").Router();

apiRouter.use("/auth", require("./authRouter"));
apiRouter.use("/products", require("./productsRouter"));

module.exports = apiRouter;
