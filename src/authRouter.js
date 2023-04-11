const { createUser, getUserByEmail } = require("../db");
const authRouter = require("express").Router();

authRouter.post("/register", async (req, res) => {
  const user = req.body;

  const userInDb = await getUserByEmail(user.email);

  if (userInDb) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  createUser(user, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
      return;
    }
    res
      .status(201)
      .json({ message: "User created with id: " + results.rows[0].id });
  });
});

module.exports = authRouter;
