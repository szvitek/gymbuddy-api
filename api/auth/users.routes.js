const { Router } = require('express');
const users = require('./users.controller');
const makeCallback = require('../../lib/makeCallback');

const router = Router();

router.get('/me', makeCallback(users.me));

module.exports = router;
