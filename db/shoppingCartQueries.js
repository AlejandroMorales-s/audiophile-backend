const pool = require("./dbConnection");

const baseQuery = `
  SELECT 
    p.name,
    p.price,
    p.id AS product_id,
    sc.quantity
  FROM shopping_cart sc
  JOIN products p
    ON sc.product_id = p.id
`;

const getShoppingCart = ({ userId }) => {
  return new Promise((resolve, reject) => {
    pool.query(`${baseQuery} WHERE user_id = $1`, [userId], (err, results) => {
      if (err) return reject(err.message);
      resolve(results.rows);
    });
  });
};

const deleteItemFromShoppingCart = ({ productId, userId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
       DELETE FROM shopping_cart 
       WHERE product_id = $1
         AND user_id = $2      
      `,
      [productId, userId],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

const deleteAllItemsFromShoppingCart = ({ userId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        DELETE FROM shopping_cart
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

const addItemToShoppingCart = ({ userId, productId, quantity }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        INSERT INTO shopping_cart
        VALUES ($1, $2, $3)
      `,
      [userId, productId, quantity],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

const updateItemQuantityInShoppingCart = ({ userId, productId, quantity }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        UPDATE shopping_cart
        SET quantity = $3
        WHERE user_id = $1
          AND product_id = $2
      `,
      [userId, productId, quantity],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getShoppingCart,
  deleteItemFromShoppingCart,
  deleteAllItemsFromShoppingCart,
  addItemToShoppingCart,
  updateItemQuantityInShoppingCart,
};
