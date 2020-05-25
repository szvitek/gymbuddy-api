const { Category, validate } = require('./category.model');
const makeError = require('../../lib/makeError');

function create(context) {
  const {
    body: createCatDTO,
    user: { _id: userId }
  } = context;
  const { error } = validate(createCatDTO);
  if (error) return makeError(error.details[0].message, 400);

  const cat = new Category({ ...createCatDTO, user: userId });
  return cat.save();
}

function findAll(context) {
  const {
    user: { _id: userId }
  } = context;

  return Category.find({ user: userId }).sort('name').select('-__v');
}

async function findOne(context) {
  const {
    params: { id },
    user: { _id: userId }
  } = context;

  const cat = await Category.findOne({ _id: id, user: userId });
  if (!cat) return makeError('Category not found', 404);
  return cat;
}

async function update(context) {
  const {
    params: { id },
    body: updateCatDTO,
    user: { _id: userId }
  } = context;

  const { error } = validate(updateCatDTO);
  if (error) return makeError(error.details[0].message, 400);

  const cat = await Category.findOneAndUpdate(
    { _id: id, user: userId },
    updateCatDTO,
    { new: true }
  );
  if (!cat) return makeError('Category not found', 404);
  return cat;
}

async function remove(context) {
  const {
    params: { id },
    user: { _id: userId }
  } = context;

  const cat = await Category.findOneAndDelete({ _id: id, user: userId });
  if (!cat) return makeError('Category not found', 404);

  return cat;
}

module.exports = { create, findAll, findOne, update, remove };
