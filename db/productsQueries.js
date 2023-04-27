const pool = require("./dbConnection");

const baseQuery = `
  SELECT 
    products.*, 
    product_details.includes, 
    product_details.features,
    product_image.image_url
  FROM products 
  JOIN product_details 
    ON products.id = product_details.product_id
  JOIN product_image
    ON products.id = product_image.product_id
    AND product_image.image_url LIKE '%' || $1 || '%'
  `;

const getAllProducts = ({ device }) => {
  return new Promise((resolve, reject) => {
    pool.query(baseQuery, [device], (err, results) => {
      if (err) return reject(err.message);
      resolve(results.rows);
    });
  });
};

const getProductById = ({ productId, device }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `${baseQuery} WHERE products.id = $2`,
      [device, productId],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

const getProductsByCategory = ({ device, category }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `${baseQuery} WHERE category = $2`,
      [device, category],
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
