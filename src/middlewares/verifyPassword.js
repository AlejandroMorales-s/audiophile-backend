const bcrypt = require("bcrypt");

const verifyPassword = async (req, res, next) => {
  const { currentPassword } = req.body;
  const { password } = req.user;

  const passwordMatch = await bcrypt.compare(currentPassword, password);

  if (passwordMatch) return next();

  return res.status(400).json({ message: "Wrong password" });
};

module.exports = verifyPassword;
