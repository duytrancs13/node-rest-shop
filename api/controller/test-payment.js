const mongoose = require("mongoose");

const Course = require("../model/course");
const Cart = require("../model/cart");
const MyCourse = require("../model/my-course");

const { STATUS, MESSAGE } = require("../constant/response");

exports.requestPayment = async (request, response, next) => {
  const courses = request.body.courses;
  const userId = request.decodedToken._id;

  if (!Array.isArray(courses) || !courses.length) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.INVALID_INPUT.code,
      message: MESSAGE.INVALID_INPUT.message,
      data: "",
    });
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.NOT_EXIST_CART.code,
      message: MESSAGE.NOT_EXIST_CART.message,
      data: "",
    });
  }
  const coursesInCart = cart.courses;
  if (!coursesInCart.length) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.NOT_EXIST_COURSE_IN_CART.code,
      message: MESSAGE.NOT_EXIST_COURSE_IN_CART.message,
      data: "",
    });
  }

  const myCourse = await MyCourse.findOne({ userId });
  console.log("myCourse: ", myCourse);

  // Check valid courses
  courses.forEach(async (courseId) => {
    const course = mongoose.Types.ObjectId.isValid(courseId)
      ? await Course.findById(courseId)
      : null;

    if (!course) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.INVALID_COURSE.code,
        message: MESSAGE.INVALID_COURSE.message,
        data: "",
      });
    }

    if (
      !coursesInCart.find((c) => c._id.toString() === course._id.toString())
    ) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.INVALID_INPUT.code,
        message: MESSAGE.INVALID_INPUT.message,
        data: "",
      });
    }

    if (myCourse?.courses?.find((myC) => myC === course._id.toString())) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.EXIST_COURSE_IN_MY_COURSE.code,
        message: MESSAGE.EXIST_COURSE_IN_MY_COURSE.message,
        data: "",
      });
    }
  });

  console.log("handling request payment...");
  setTimeout(() => {
    request.coursesFromPayment = courses;
    request.decodedToken = request.decodedToken;
    next();
  }, 1000);
};

/* test momo:
NGUYEN VAN A
9704 0000 0000 0018
03/07
OTP

test vnpay:
(vnp_TmnCode): CGXZLS0Z
(vnp_HashSecret): XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN
Ngân hàng: NCB
Số thẻ: 9704198526191432198
Tên chủ thẻ:NGUYEN VAN A
Ngày phát hành:07/15
Mật khẩu OTP:123456 */
