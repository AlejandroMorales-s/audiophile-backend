const { getUserByEmail } = require("../../db");

const verifyIfEmailExists = async (req, res, next) => {
  const { newEmail } = req.body;

  const userInDatabase = await getUserByEmail(newEmail);

  if (!userInDatabase) return next();

  res.status(400).json({ message: "Email already taken" });
};

module.exports = verifyIfEmailExists;
