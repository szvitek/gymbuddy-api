const express = require('express');
const auth = require('../api/auth/auth.routes');
const users = require('../api/auth/users.routes');
const cat = require('../api/categories/categories.routes');
const error = require('../middlewares/error');
const { jwt } = require('../middlewares/passport');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use('/api/users', jwt, users);
  app.use('/api/categories', jwt, cat);
  app.use(error);
};
