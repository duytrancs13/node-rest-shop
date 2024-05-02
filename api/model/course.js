const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.model("Course", schema, "courses");

module.exports = Course;
