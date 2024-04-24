const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
		required: true,
  },
  username: {
    type: String,
    required: true,
    match: /^(\S+$)/g
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "user");

module.exports = User;
