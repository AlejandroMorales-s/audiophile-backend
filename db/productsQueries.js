const pool = require("./dbConnection");

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM products", (error, results) => {
      if (error) return reject(error.message);
      resolve(results.rows);
    });
  });
};

module.exports = {
  getAllProducts,
};
