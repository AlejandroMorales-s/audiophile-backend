const { createUser, getUserByEmail, getUserById } = require("./userQueries");
const { getAllProducts } = require("./productsQueries");

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllProducts,
};
