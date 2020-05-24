const express = require('express');
const auth = require('../api/auth/auth.routes');
const error = require('../middlewares/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use(error);
};
