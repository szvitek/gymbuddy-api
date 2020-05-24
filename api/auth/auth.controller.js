const authService = require('./auth.service');

function login(context) {
  return authService.login(context);
}

async function register(context) {
  const user = await authService.register(context);
  return authService.login({ user });
}

module.exports = { login, register };
