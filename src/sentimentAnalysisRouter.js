const sentimentAnalysisRouter = require("express").Router();
const examples = require("../iaExamples");

const cohere = require("cohere-ai");

cohere.init(process.env.COHERE_API_KEY);

sentimentAnalysisRouter.post("/", async (req, res) => {
  const { inputs } = req.body;

  const response = await cohere.classify({
    model: "large",
    inputs,
    examples: examples,
  });
  res.json(response.body.classifications);
});

module.exports = sentimentAnalysisRouter;
