const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  courseId: {
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
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  videos: {
    type: Schema.Types.Array,
    default: [],
  },
});

const DetailCourse = mongoose.model("DetailCourse", schema, "detailCourse");

module.exports = DetailCourse;
