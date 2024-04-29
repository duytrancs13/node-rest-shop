const mongoose = require("mongoose");

const Course = require("../model/course");
const DetailCourse = require("../model/detail-course");

const COURSES = [
  new Course({
    _id: new mongoose.Types.ObjectId(),
    imagePath:
      "https://cdn.motiondesign.school/uploads/2022/09/motion-beast-2.png",
    level: "BASIC",
    title: "Motion Beast 1",
    description:
      "A must-see course for any Motion Designer. It lays the foundation for all aspects of modern motion design and covers every topic from AE basics to character rigging, frame by frame animation in Animate and 3D in Blender.",
    price: 1000000,
  }),
  new Course({
    _id: new mongoose.Types.ObjectId(),
    imagePath:
      "https://cdn.motiondesign.school/uploads/2022/09/motion-beast-2.png",
    level: "BASIC",
    title: "Motion Beast 2",
    description:
      "A must-see course for any Motion Designer. It lays the foundation for all aspects of modern motion design and covers every topic from AE basics to character rigging, frame by frame animation in Animate and 3D in Blender.",
    price: 2000000,
  }),
  new Course({
    _id: new mongoose.Types.ObjectId(),
    imagePath:
      "https://cdn.motiondesign.school/uploads/2022/09/motion-beast-2.png",
    level: "BASIC",
    title: "Motion Beast 3",
    description:
      "A must-see course for any Motion Designer. It lays the foundation for all aspects of modern motion design and covers every topic from AE basics to character rigging, frame by frame animation in Animate and 3D in Blender.",
    price: 3000000,
  }),
];

const MORE_DETAIL_COURSES = [
  {
    videos: ["video 1 course 1"],
  },
  { videos: ["video 1 course 2", "video 2 course 2"] },

  { videos: ["video 1 course 3", "video 2 course 3", "video 3 course 3"] },
];

module.exports = { COURSES, MORE_DETAIL_COURSES };
