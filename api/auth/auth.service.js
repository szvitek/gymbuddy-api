const { User, validate } = require('./user.model');
const makeError = require('../../lib/makeError');

function login(context) {
  const { user: userDoc } = context;
  const user = userDoc.serialize();
  const token = userDoc.generateAuthToken(user);
  return { user, token };
}

async function register(context) {
  const { body: userDTO } = context;
  const { error } = validate(userDTO);
  if (error) return makeError(error.details[0].message, 400);

  const existingUser = await User.findOne({ email: userDTO.email });
  if (existingUser) return makeError('User already registered', 400);

  const user = new User(userDTO);
  return user.save();
}

module.exports = { login, register };
