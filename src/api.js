const apiRouter = require("express").Router();

apiRouter.use("/auth", require("./authRouter"));

module.exports = apiRouter;
