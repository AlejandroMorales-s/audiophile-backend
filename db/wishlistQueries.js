const pool = require("./dbConnection");

const baseQuery = `
  SELECT 
    p.name,
    p.price,
    p.id AS product_id
  FROM wishlist wl
  JOIN products p
    ON wl.product_id = p.id
`;

const getWishlist = ({ userId }) => {
  return new Promise((resolve, reject) => {
    pool.query(`${baseQuery} WHERE user_id = $1`, [userId], (err, results) => {
      if (err) return reject(err.message);
      resolve(results.rows);
    });
  });
};

const addToWishlist = ({ userId, productId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO wishlist VALUES($1, $2) RETURNING *`,
      [userId, productId],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

const deleteFromWishlist = ({ userId, productId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
       DELETE FROM wishlist
       WHERE user_id = $1 
        AND product_id = $2
      `,
      [userId, productId],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getWishlist,
  addToWishlist,
  deleteFromWishlist,
};
