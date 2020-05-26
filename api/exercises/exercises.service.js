const { Exercise, muscleGroups, validate } = require('./exercise.model');
const makeError = require('../../lib/makeError');

function groups(context) {
  return muscleGroups;
}

async function create(context) {
  const {
    body: createExDTO,
    user: { _id: userId }
  } = context;
  const { error } = validate(createExDTO);
  if (error) return makeError(error.details[0].message, 400);

  const ex = new Exercise({ ...createExDTO, user: userId });
  await ex.save();

  // todo: not return version key?
  return ex
    .populate('user', '-password -__v')
    .populate('categories', '-__v')
    .execPopulate();
}

function findAll(context) {
  const {
    user: { _id: userId }
  } = context;

  // todo: conditional populate by query maybe?
  // todo: maybe it would be a good idea to add a Model method to get public fields
  return Exercise.find({ user: userId })
    .select('-__v')
    .populate('user', '-password -__v')
    .populate('categories', '-__v -user');
}

async function findOne(context) {
  const {
    params: { id },
    user: { _id: userId }
  } = context;

  const ex = await Exercise.findOne({ _id: id, user: userId })
    .select('-__v')
    .populate('user', '-password -__v')
    .populate('categories', '-__v -user');
  if (!ex) return makeError('Exercise not found', 404);
  return ex;
}

async function update(context) {
  const {
    params: { id },
    body: updateExDTO,
    user: { _id: userId }
  } = context;

  // todo: disabled due to the method is patch and not sending all required field
  // todo: use PUT instead or create an update validatior with optional fields
  // const { error } = validate(updateExDTO);
  // if (error) return makeError(error.details[0].message, 400);

  const ex = await Exercise.findOneAndUpdate(
    { _id: id, user: userId },
    updateExDTO,
    { new: true }
  )
    .select('-__v')
    .populate('user', '-password -__v')
    .populate('categories', '-__v -user');
  if (!ex) return makeError('Exercise not found', 404);
  return ex;
}

async function remove(context) {
  const {
    params: { id },
    user: { _id: userId }
  } = context;

  const ex = await Exercise.findOneAndDelete({ _id: id, user: userId })
    .select('-__v')
    .populate('user', '-password -__v')
    .populate('categories', '-__v -user');
  if (!ex) return makeError('Exercise not found', 404);

  return ex;
}

module.exports = { groups, create, findAll, findOne, update, remove };
