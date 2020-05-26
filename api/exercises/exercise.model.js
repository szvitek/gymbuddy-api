const { Schema, model } = require('mongoose');
const Joi = require('@hapi/joi');

const muscleGroups = 'Abs,Back,Biceps,Chest,Core,Legs,Shoulders,Triceps'.split(
  ','
);

const exerciseSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  description: {
    type: String
  },
  muscleGroups: [
    {
      type: String,
      enum: muscleGroups,
      required: true
    }
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

function validateExercise(exercise) {
  const schema = Joi.object({
    name: Joi.string().min(3).trim().required(),
    description: Joi.string(),
    muscleGroups: Joi.array()
      .items(Joi.string().valid(...muscleGroups))
      .min(1)
      .required(),
    categories: Joi.array().items(Joi.objectId()).min(1).required(),
    userId: Joi.objectId().required()
  });

  return schema.validate(exercise);
}

const Exercise = model('Exercise', exerciseSchema);

exports.Exercise = Exercise;
exports.validate = validateExercise;
exports.muscleGroups = muscleGroups;
