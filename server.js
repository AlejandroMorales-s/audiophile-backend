const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

//* Body parser middleware
app.use(bodyParser.json());

// app.use("/", require("./src/api"));

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
