const { Router } = require('express');
const auth = require('./auth.controller');
const makeCallback = require('../../lib/makeCallback');
const { login } = require('../../middlewares/passport');

const router = Router();

router.post('/login', login, makeCallback(auth.login));
router.post('/register', makeCallback(auth.register));

module.exports = router;
