//* Import required modules and functions
const authRouter = require("express").Router();
const passport = require("passport");
const { createUser, getUserByEmail } = require("../db");
const { ensureAuthenticated } = require("./middlewares");

//* Route to authenticate and retrieve user data
authRouter.get("/authenticate", ensureAuthenticated, (req, res) => {
  const userData = req.user;
  delete userData.password;

  res.json(userData);
});

//* Route to handle user login
authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  const userData = req.user;
  delete userData.password;

  res.json(userData);
});

//* Route to register a new user
authRouter.post("/register", async (req, res, next) => {
  const userData = req.body;

  //* Check if the user already exists in the database
  const userInDb = await getUserByEmail({ email: userData.email });

  if (userInDb) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  //* Create a new user in the database
  await createUser({ userData });

  //* Run passport.authenticate("local") middleware
  passport.authenticate("local", (err, user, info) => {
    console.log(err, user, info);
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //* If authentication succeeds, you can manually log in the user
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      //* User is successfully logged in
      return res.json(user);
    });
  })(req, res, next);
});

//* Route to handle user logout
authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
});

//* Error handler middleware
authRouter.use((err, req, res, next) => {
  res.status(500).json({ message: err });
});

//* Export the router
module.exports = authRouter;
