const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../api/auth/user.model');
const { jwtSecret } = require('../config');

module.exports = function (app) {
  const verifyLocal = async (email, password, done) => {
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return done(null, false);
      }

      const match = await user.verifyPassword(password);
      if (match) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err);
    }
  };

  const verifyJwt = async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ _id: jwtPayload.sub });
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  };

  const localConfig = { usernameField: 'email' };
  const jwtConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
  };

  passport.use(new LocalStrategy(localConfig, verifyLocal));
  passport.use(new JwtStrategy(jwtConfig, verifyJwt));

  app.use(passport.initialize());
};
