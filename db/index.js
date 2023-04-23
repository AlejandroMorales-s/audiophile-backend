const userQueries = require("./userQueries");
const productsQueries = require("./productsQueries");
const shoppingCartQueries = require("./shoppingCartQueries");

module.exports = {
  ...userQueries,
  ...productsQueries,
  ...shoppingCartQueries,
};
