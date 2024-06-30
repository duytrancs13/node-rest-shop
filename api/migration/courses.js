const mongoose = require("mongoose");

const { config } = require("dotenv");

const {
  COURSES,
  MORE_DETAIL_COURSES,
  CURRICULUM,
} = require("../constant/courses");
const DetailCourse = require("../model/detail-course");
const Curriculum = require("../model/curriculum");

config();

mongoose.connect(process.env.DB);

const migrateCourses = async () => {
  console.log("Uploading...");
  for (let i = 0; i < COURSES.length; i++) {
    try {
      const courseResp = await COURSES[i].save();
      if (courseResp) {
        const { bannerSection, ...resMoreDetailCourse } =
          MORE_DETAIL_COURSES[i];
        const { downloadSlideLink, ...resCurriculum } = CURRICULUM[i];
        await new DetailCourse({
          courseId: courseResp._id,
          bannerSection: {
            coverBackground: bannerSection.coverBackground,
            ...courseResp,
          },
          ...resMoreDetailCourse,
          introduceCourseSection: {
            title: courseResp.title,
            ...resCurriculum,
            chapters: resCurriculum.chapters.map(({ title, lessons }) => ({
              title: title,
              lessons: lessons.map(({ sessionLink, ...resLessons }) => ({
                ...resLessons,
              })),
            })),
          },
        }).save();

        await new Curriculum({
          title: courseResp.title,
          courseId: courseResp._id,
          ...CURRICULUM[i],
        }).save();
      }

      if (i === COURSES.length - 1) {
        console.log("Migrated successfully");
        exit();
      }
    } catch (error) {
      console.log("Migrated error: ", error);
    }
  }
};

migrateCourses();

function exit() {
  mongoose.disconnect();
}
