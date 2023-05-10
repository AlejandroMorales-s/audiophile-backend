const userQueries = require("./userQueries");
const productsQueries = require("./productsQueries");
const shoppingCartQueries = require("./shoppingCartQueries");
const wishlistQueries = require("./wishlistQueries");
const ordersQueries = require("./ordersQueries");

module.exports = {
  ...userQueries,
  ...productsQueries,
  ...shoppingCartQueries,
  ...wishlistQueries,
  ...ordersQueries,
};
