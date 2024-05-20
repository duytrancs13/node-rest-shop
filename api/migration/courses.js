const mongoose = require("mongoose");

const { config } = require("dotenv");

const { COURSES, MORE_DETAIL_COURSES, CURRICULUM } = require("../constant/courses");
const DetailCourse = require("../model/detail-course");
const Curriculum = require("../model/curriculum");

config();

mongoose.connect("mongodb+srv://duytrancs13:hipesoqa@node-tuts.k3ee6rq.mongodb.net/p-studio?retryWrites=true&w=majority");

const migrateCourses = async () => {
  for (let i = 0; i < COURSES.length; i++) {
    try {
      const courseResp = await COURSES[i].save();
      if (courseResp) {
        await new DetailCourse({
          ...MORE_DETAIL_COURSES[i],
          _id: new mongoose.Types.ObjectId(),
          courseId: courseResp._id,
          level: courseResp.level,
          title: courseResp.title,
          description: courseResp.description,
          price: courseResp.price,
        }).save();

        await new Curriculum({
          ...CURRICULUM[i],
          _id: new mongoose.Types.ObjectId(),
          courseId: courseResp._id,
        }).save();
      }
      if (i === COURSES.length - 1) exit();
    } catch (error) {
      console.log("COURSE error: ", error);
    }
  }
};

migrateCourses();

function exit() {
  mongoose.disconnect();
}
