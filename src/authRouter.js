const authRouter = require("express").Router();
const passport = require("passport");
const { createUser, getUserByEmail } = require("../db");

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

authRouter.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.status(200).json(req.user);
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = authRouter;
