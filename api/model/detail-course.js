const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  bannerSection: {
    coverBackground: {
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
  },
  overviewSection: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    illustration: {
      type: String,
      required: true,
    },
  }],
  introduceCourseSection: {
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
            duration: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ]
  }
});

const DetailCourse = mongoose.model("DetailCourse", schema, "detailCourse");

module.exports = DetailCourse;
