const { STATUS, MESSAGE } = require("../constant/response");
const Curriculum = require("../model/curriculum");

exports.getCurriculum = async (request, response, next) => {
  try {
    const courseId = request.params.courseId;
    const courses = await Curriculum.findOne({ courseId });
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
