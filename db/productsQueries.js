const pool = require("./dbConnection");

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM products", (err, results) => {
      if (err) return reject(err.message);
      resolve(results.rows);
    });
  });
};

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM products WHERE id = $1", [id], (err, results) => {
      if (err) return reject(err.message);
      resolve(results.rows);
    });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
};
