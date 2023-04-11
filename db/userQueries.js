const pool = require("./dbConnection");
const bcrypt = require("bcrypt");

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results.rows[0]);
      }
    );
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results.rows[0]);
    });
  });
};

const createUser = async (user, callback) => {
  const { email, password, lastName, firstName } = user;

  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  pool.query(
    "INSERT INTO users VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *",
    [email, passwordHashed, lastName, firstName],
    (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    }
  );
};

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
};
