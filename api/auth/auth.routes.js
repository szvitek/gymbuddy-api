const { Router } = require('express');
const passport = require('passport');
const auth = require('./auth.controller');
const makeCallback = require('../../lib/makeCallback');
const router = Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false, failWithError: true }),
  makeCallback(auth.login)
);
router.post('/register', makeCallback(auth.register));

module.exports = router;
