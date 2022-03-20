const bodyParser = require("./body-parser");
const errors = require("./errors");
const catchMongooseErrors = require("./catch-mongoose-errors");
const passwordInit = require("./passport-init");
const static = require("./static");

module.exports = [
  bodyParser,
  errors,
  catchMongooseErrors,
  passwordInit,
  static,
];
