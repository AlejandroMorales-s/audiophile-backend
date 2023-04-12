const userQueries = require("./userQueries");
const productsQueries = require("./productsQueries");

module.exports = {
  ...userQueries,
  ...productsQueries,
};
