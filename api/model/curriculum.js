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
  title: {
    type: String,
    required: true,
  },
  slide: {
    type: String,
    required: true,
  },
  chapters: [
    {
      title: {
        type: String,
        required: true,
      },
      lessons: [
        {
          name: {
            type: String,
            required: true,
          },
          linkUrl: {
            type: String,
            required: true,
          },
          duration: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const Course = mongoose.model("Curriculum", schema, "curriculum");

module.exports = Course;
