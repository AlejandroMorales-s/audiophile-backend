//* Import required modules and functions
const userRouter = require("express").Router();
const { verifyPassword, verifyIfEmailExists } = require("./middlewares");
const { updatePassword, updateEmail, updateFullname } = require("../db");

//* Route to update user password
userRouter.put("/update-password", verifyPassword, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { id } = req.user;

    //* Update the user's password in the database
    const userWithPasswordUpdated = await updatePassword({
      newPassword,
      userId: id,
    });

    res.json(userWithPasswordUpdated);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Route to update user email
userRouter.put(
  "/update-email",
  verifyPassword,
  verifyIfEmailExists,
  async (req, res) => {
    try {
      const { newEmail } = req.body;
      const { id } = req.user;

      //* Update the user's email in the database
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

//* Route to update user fullname
userRouter.put("/update-fullname", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const { id } = req.user;

    //* Update the user's fullname in the database
    const updatedUser = await updateFullname({
      firstName,
      lastName,
      userId: parseInt(id),
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//* Export the router
module.exports = userRouter;
