const userService = require('./users.service');

function me(context) {
  return userService.me(context);
}

module.exports = { me };
