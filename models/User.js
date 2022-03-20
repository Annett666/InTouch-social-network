const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const privatePaths = require("mongoose-private-paths");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("users", userSchema);
