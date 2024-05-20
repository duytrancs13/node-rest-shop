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

const CURRICULUM = [
  {
    title: "Beast 1",
    slide: "link download slide",
    chapters: [
      {
        title: "Chuong 1",
        lessons: [
          {
            name: "Bai 1",
            linkUrl: "https://youtu.be/FN7ALfpGxiI",
            duration: "03:00",
          },
          {
            name: "Bai 2",
            linkUrl: "https://youtu.be/W1EywtvRYe8",
            duration: "04:00",
          },
          {
            name: "Bai 3",
            linkUrl: "https://youtu.be/knW7-x7Y7RE",
            duration: "05:00",
          },
        ],
      },
      {
        title: "Chuong 2",
        lessons: [
          {
            name: "Bai 1",
            linkUrl: "link url bai 1",
            duration: "03:00",
          },
          {
            name: "Bai 2",
            linkUrl: "link url bai 2",
            duration: "04:00",
          },
          {
            name: "Bai 3",
            linkUrl: "link url bai 3",
            duration: "05:00",
          },
        ],
      },
    ],
  },
  {
    title: "Beast 2",
    slide: "link download slide",
    chapters: [
      {
        title: "Chuong 1",

        lessons: [
          {
            name: "Bai 4",
            linkUrl: "https://youtu.be/Bhg-Gw953b0",
            duration: "06:00",
          },
          {
            name: "Bai 5",
            linkUrl: "https://youtu.be/j8U06veqxdU",
            duration: "07:00",
          },
          {
            name: "Bai 6",
            linkUrl: "https://youtu.be/WX7dUj14Z00",
            duration: "08:00",
          },
        ],
      },
      {
        title: "Chuong 2",
        lessons: [
          {
            name: "Bai 4",
            linkUrl: "link url bai 4",
            duration: "06:00",
          },
          {
            name: "Bai 5",
            linkUrl: "link url bai 5",
            duration: "07:00",
          },
          {
            name: "Bai 6",
            linkUrl: "link url bai 6",
            duration: "08:00",
          },
        ],
      },
    ],
  },
  {
    title: "Beast 3",
    slide: "link download slide",
    chapters: [
      {
        title: "Chuong 1",
        lessons: [
          {
            name: "Bai 1",
            linkUrl: "https://youtu.be/Ztrj8UIDMQY",
            duration: "03:00",
          },
          {
            name: "Bai 2",
            linkUrl: "https://youtu.be/z3qOnZIqRVs",
            duration: "04:00",
          },
          {
            name: "Bai 3",
            linkUrl: "https://youtu.be/sinhZ1l54K8",
            duration: "05:00",
          },
        ],
      },
      {
        title: "Chuong 2",
        lessons: [
          {
            name: "Bai 4",
            linkUrl: "link url bai 4",
            duration: "06:00",
          },
          {
            name: "Bai 5",
            linkUrl: "link url bai 5",
            duration: "07:00",
          },
          {
            name: "Bai 6",
            linkUrl: "link url bai 6",
            duration: "08:00",
          },
        ],
      },
    ],
  },
];

module.exports = { COURSES, MORE_DETAIL_COURSES, CURRICULUM };
