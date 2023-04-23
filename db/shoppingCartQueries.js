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

const getShoppingCart = ({ user_id }) => {
  return new Promise((resolve, reject) => {
    pool.query(`${baseQuery} WHERE user_id = $1`, [user_id], (err, results) => {
      if (err) return reject(err.message);
      resolve(results.rows);
    });
  });
};

const deleteItemFromShoppingCart = ({ product_id, user_id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
       DELETE FROM shopping_cart 
       WHERE product_id = $1
         AND user_id = $2      
      `,
      [product_id, user_id],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

const deleteAllItemsFromShoppingCart = ({ user_id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        DELETE FROM shopping_cart
        WHERE user_id = $1
      `,
      [user_id],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

const addItemToShoppingCart = ({ user_id, product_id, quantity }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        INSERT INTO shopping_cart
        VALUES ($1, $2, $3)
      `,
      [user_id, product_id, quantity],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

const updateItemQuantityInShoppingCart = ({
  user_id,
  product_id,
  quantity,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        UPDATE shopping_cart
        SET quantity = $3
        WHERE user_id = $1
          AND product_id = $2
      `,
      [user_id, product_id, quantity],
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
