const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../api/auth/user.model');

module.exports = function (app) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findByEmail(email);
    if (!user) {
      return done(null, false);
    }

    try {
      const match = await user.verifyPassword(password);
      if (match) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  app.use(passport.initialize());
};
