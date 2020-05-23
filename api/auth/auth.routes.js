const { Router } = require('express');
const { login } = require('./auth.controller');
const makeCallback = require('../../lib/makeCallback');
const router = Router();

router.get('/login', makeCallback(login));

module.exports = router;
