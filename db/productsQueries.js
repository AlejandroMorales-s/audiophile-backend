const pool = require("./dbConnection");

const baseQuery = `
  SELECT 
    products.*, 
    product_details.includes, 
    product_details.features 
  FROM products 
  JOIN product_details 
    ON products.id = product_details.product_id
  `;

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    pool.query(baseQuery, (err, results) => {
      if (err) return reject(err.message);
      resolve(results.rows);
    });
  });
};

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`${baseQuery} WHERE products.id = $1`, [id], (err, results) => {
      if (err) return reject(err.message);
      resolve(results.rows);
    });
  });
};

const getProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `${baseQuery} WHERE category = $1`,
      [category],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
};
