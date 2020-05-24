const makeError = require('../../lib/makeError');
const { User, validate } = require('./user.model');

function login(context) {
  const { user } = context;
  return user.login();
}

async function register(context) {
  const { body } = context;
  const { error } = validate(body);
  if (error) return makeError(error.details[0].message, 400);

  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) return makeError('User already registered', 400);

  const user = new User(body);
  await user.save();
  return user.login();
}

module.exports = { login, register };
