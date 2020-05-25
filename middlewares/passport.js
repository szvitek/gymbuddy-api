const passport = require('passport');

const login = passport.authenticate('local', {
  session: false,
  failWithError: true
});
const jwt = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});

module.exports = {
  login,
  jwt
};
