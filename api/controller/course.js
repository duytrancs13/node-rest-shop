const { STATUS, MESSAGE } = require("../constant/response");
const Course = require("../model/course");
const DetailCourse = require("../model/detail-course");

exports.getCourses = async (request, response, next) => {
  try {
    const courses = await Course.find();
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: courses,
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};

exports.getCourseById = async (request, response, next) => {
  const courseId = request.params.courseId;
  try {
    const course = await DetailCourse.findById(courseId);
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: !!course ? course : "",
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};
