const mongoose = require("mongoose");

const { config } = require("dotenv");

const { COURSES, MORE_DETAIL_COURSES } = require("../constant/courses");
const DetailCourse = require("../model/detail-course");

config();

mongoose.connect(process.env.DB);

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
