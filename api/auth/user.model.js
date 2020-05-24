const { Schema, model } = require('mongoose');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

userSchema.pre('save', async function () {
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  return;
});

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.serialize = function () {
  const { password, __v, ...userObj } = this.toObject();
  return userObj;
};

userSchema.methods.generateAuthToken = function (payload) {
  const token = jwt.sign(payload, jwtSecret);
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required()
  });

  return schema.validate(user);
}

const User = model('User', userSchema);

exports.User = User;
exports.validate = validateUser;
