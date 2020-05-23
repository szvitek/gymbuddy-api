const makeError = require('../../lib/makeError');

function login() {
  // do async stuff
  const isLoginValid = true;

  if (isLoginValid) {
    return { login: 'works' };
  }
  throw new Error('aaa'); // global error handler will catch
  // return makeError('invalid login', 401);
}

module.exports = { login };
