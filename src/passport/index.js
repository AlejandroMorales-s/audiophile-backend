const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { getUserByEmail, getUserById } = require("../../db");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      const user = await getUserByEmail(email);

      if (!user) return done("User not found", false);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) return done(null, user);

      return done("Passwords don't match", false);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await getUserById(id);

  if (user) return done(null, user);

  return done(null, false);
});
