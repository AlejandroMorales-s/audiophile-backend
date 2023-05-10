const pool = require("./dbConnection");

const createOrder = ({ pricing, products, shippingInfo, userId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        INSERT INTO orders VALUES (
          DEFAULT,
          $1,
          $2,
          $3,
          $4
        )
        RETURNING products, pricing
      `,
      [userId, products, pricing, shippingInfo],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};
const getOrders = ({ userId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        SELECT * 
        FROM orders
        WHERE user_id = $1
      `,
      [userId],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  createOrder,
  getOrders,
};
