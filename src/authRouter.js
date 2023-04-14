const authRouter = require("express").Router();
const passport = require("passport");
const { createUser, getUserByEmail } = require("../db");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

authRouter.get("/authenticate", ensureAuthenticated, (req, res) => {
  const { id, email, last_name, first_name } = req.user;
  res.status(200).json({ id, email, last_name, first_name });
});

authRouter.post("/register", async (req, res) => {
  const user = req.body;

  const userInDb = await getUserByEmail(user.email);

  if (userInDb) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  createUser(user, (err, results) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.status(201).json(results.rows[0]);
  });
});

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  const { id, email, last_name, first_name } = req.user;

  const user = {
    id,
    email,
    last_name,
    first_name,
  };

  res.status(200).json(user);
});

authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
});

//* Error handler
authRouter.use((err, req, res, next) => {
  res.status(500).json({ message: err });
});

module.exports = authRouter;
