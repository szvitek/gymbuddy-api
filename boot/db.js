const mongoose = require('mongoose');
const { mongoUrl } = require('../config');

mongoose.Promise = Promise;

module.exports = async function () {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`connected to mongodb: ${mongoUrl}`);
  } catch (err) {
    // todo create global unhandldedPromiseRejection handler
    console.error(err);
    process.exit(1);
  }
};
