const userQueries = require("./userQueries");
const productsQueries = require("./productsQueries");
const shoppingCartQueries = require("./shoppingCartQueries");
const wishlistQueries = require("./wishlistQueries");

module.exports = {
  ...userQueries,
  ...productsQueries,
  ...shoppingCartQueries,
  ...wishlistQueries,
};
