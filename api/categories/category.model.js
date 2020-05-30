const { Schema, model } = require('mongoose');
const Joi = require('@hapi/joi');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    user: Joi.objectId(),
    _id: Joi.objectId()
  });

  return schema.validate(category);
}

const Category = model('Category', categorySchema);

exports.Category = Category;
exports.validate = validateCategory;
