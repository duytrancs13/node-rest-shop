const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  introduceVideo: {
    embedCodeSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  },
  downloadSlideLink: {
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
          sessionLink: {
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
