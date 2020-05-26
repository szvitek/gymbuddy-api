const exService = require('./exercises.service');

function groups() {
  return exService.groups();
}

function create(context) {
  return exService.create(context);
}

function findAll(context) {
  return exService.findAll(context);
}

function findOne(context) {
  return exService.findOne(context);
}

function update(context) {
  return exService.update(context);
}

function remove(context) {
  return exService.remove(context);
}

module.exports = { create, findAll, groups, findOne, update, remove };
