const { ObjectId } = require('mongoose').Types;
const makeError = require('../lib/makeError');

module.exports = function (req, res, next) {
  if (!ObjectId.isValid(req.params.id)) {
    return makeError('Invalid ID', 400);
  }

  next();
};
