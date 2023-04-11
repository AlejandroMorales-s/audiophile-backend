const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { query } = require("../db");

passport.use(
  new LocalStrategy((email, password, done) => {
    query(
      `SELECT * FROM users WHERE email = ${email}`,
      async (err, { rows }) => {
        if (err) return done(err);

        const user = rows[0];

        if (!user) return done(null, false);

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) return done(null, user);

        return done(null, false);
      }
    );
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  query(`SELECT * FROM users WHERE id = ${id}`, (err, { rows }) => {
    if (err) return done(err);

    return done(null, rows[0]);
  });
});
