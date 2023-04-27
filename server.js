const express = require("express");
const cors = require("cors");
const session = require("express-session");
const device = require("express-device");
const passport = require("passport");
require("./src/passport");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: { "Access-Control-Allow-Origin": "*" },
  })
);

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 172800000, secure: false, sameSite: "none" },
  saveUninitialized: false,
  resave: false,
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessionConfig.cookie.secure = true;
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

//* JSON parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(device.capture());

app.use("/", require("./src/api"));

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
