const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const {
  ensureAuthenticated,
  verifyPassword,
  verifyIfEmailExists,
} = require("./middlewares");
const { updatePassword, updateEmail, updateFullname } = require("../db");

userRouter.use(ensureAuthenticated);

//* Update user password
userRouter.put("/update-password", verifyPassword, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { id } = req.user;

    const salt = await bcrypt.genSalt(10);
    const newPasswordHashed = await bcrypt.hash(newPassword, salt);

    const userWithPasswordUpdated = await updatePassword({
      newPassword: newPasswordHashed,
      userId: id,
    });

    res.json(userWithPasswordUpdated);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Update user email
userRouter.put(
  "/update-email",
  verifyPassword,
  verifyIfEmailExists,
  async (req, res) => {
    try {
      const { newEmail } = req.body;
      const { id } = req.user;

      const userWithEmailUpdated = await updateEmail({
        newEmail,
        userId: id,
      });

      res.json(userWithEmailUpdated);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

//* Update user fullname
userRouter.put("/update-fullname", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const { id } = req.user;

    const updatedUser = await updateFullname({
      firstName,
      lastName,
      userId: id,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = userRouter;
