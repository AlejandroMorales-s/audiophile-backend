const pool = require("./dbConnection");
const bcrypt = require("bcrypt");

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results.rows[0]);
      }
    );
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results.rows[0]);
    });
  });
};

const createUser = async (user, callback) => {
  const { email, password, lastName, firstName } = user;

  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  pool.query(
    `
     INSERT INTO users VALUES (
      DEFAULT, 
      $1, 
      $2, 
      $3, 
      $4) 
     RETURNING id, email, last_name, first_name
    `,
    [email, passwordHashed, lastName, firstName],
    (err, results) => {
      if (err) {
        callback(err.message, null);
        return;
      }
      callback(null, results);
    }
  );
};

const updatePassword = async ({ userId, newPassword }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        UPDATE users
        SET password = $2
        WHERE id = $1
        RETURNING id, email, last_name, first_name
      `,
      [userId, newPassword],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

const updateEmail = async ({ userId, newEmail }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        UPDATE users
        SET email = $2
        WHERE id = $1
        RETURNING id, email, last_name, first_name
      `,
      [userId, newEmail],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

const updateFullname = async ({ userId, firstName, lastName }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
        UPDATE users
        SET 
         first_name = $2, 
         last_name = $3
        WHERE id = $1
        RETURNING id, email, last_name, first_name
      `,
      [userId, firstName, lastName],
      (err, results) => {
        if (err) return reject(err.message);
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  updatePassword,
  updateEmail,
  updateFullname,
};
