const { User, validate } = require('./user.model');

function me(context) {
  const {
    user: { _id }
  } = context;
  return User.findById(_id).select('-password -__v');
}

module.exports = { me };
