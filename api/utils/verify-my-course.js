const { STATUS, MESSAGE } = require("../constant/response");
const MyCourse = require("../model/my-course");

module.exports = async (request, response, next) => {
  try {
    const userId = request.decodedToken._id;
    const courseId = request.params.courseId;
    const myCourse = await MyCourse.findOne({ userId });

    if (
      !myCourse ||
      !myCourse.courses.length ||
      !myCourse.courses?.find((c) => c === courseId)
    ) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.NOT_PURCHASED_COURSE.code,
        message: MESSAGE.NOT_PURCHASED_COURSE.message,
        data: "",
      });
    }
    next();
  } catch (error) {
    return response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};
