const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
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
  store: new pgSession({
    conString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    tableName: "sessions",
  }),
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
