const catService = require('./categories.service');

function create(context) {
  return catService.create(context);
}

function findAll(context) {
  return catService.findAll(context);
}

function findOne(context) {
  return catService.findOne(context);
}

function update(context) {
  return catService.update(context);
}

function remove(context) {
  return catService.remove(context);
}

module.exports = { create, findAll, findOne, update, remove };
