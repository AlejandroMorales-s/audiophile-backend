const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./src/passport");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000, secure: false, sameSite: "none" },
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//* Body parser middleware
app.use(bodyParser.json());

app.use("/", require("./src/api"));

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
