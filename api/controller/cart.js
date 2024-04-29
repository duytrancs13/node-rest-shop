const mongoose = require("mongoose");

const { STATUS, MESSAGE } = require("../constant/response");
const Cart = require("../model/cart");

exports.getCart = async (request, response, next) => {
  try {
    const decodedToken = request.decodedToken;
    const cart = await Cart.findOne({ userId: decodedToken._id });
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: cart,
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};

exports.addToCart = async (request, response, next) => {
  try {
    // check input course
    const courseId = request.body.courseId;

    const course =
      mongoose.Types.ObjectId.isValid(courseId) ??
      (await Course.findById(courseId));

    if (!course) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.INVALID_COURSE.code,
        message: MESSAGE.INVALID_COURSE.message,
        data: "",
      });
    }
    // ADD NEW
    const decodedToken = request.decodedToken;

    const cart = await Cart.findOne({ userId: decodedToken._id });
    if (!cart) {
      await new Cart({
        userId: decodedToken._id,
        courses: [courseId],
      }).save();
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.SUCCESS.code,
        message: MESSAGE.SUCCESS.message,
        data: "",
      });
    }

    const courses = cart.courses;
    const isExistedCourse = courses.find((c) => c === courseId);
    if (isExistedCourse) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.EXIST_COURSE.code,
        message: MESSAGE.EXIST_COURSE.message,
        data: "",
      });
    }

    const updateOps = {
      courses: [...courses, courseId],
    };

    // ADD MORE
    await Cart.findOneAndUpdate(
      { userId: decodedToken._id },
      { $set: updateOps }
    );

    response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: "",
    });
  } catch (error) {
    console.log("error-----", error);
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};

exports.removeToCart = async (request, response, next) => {
  // check input course
  const courseId = request.body.courseId;
  const course =
    mongoose.Types.ObjectId.isValid(courseId) ??
    (await Course.findById(courseId));
  if (!course) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.INVALID_COURSE.code,
      message: MESSAGE.INVALID_COURSE.message,
      data: "",
    });
  }

  const decodedToken = request.decodedToken;
  const cart = await Cart.findOne({ userId: decodedToken._id });
  if (!cart) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.NOT_EXIST_CART.code,
      message: MESSAGE.NOT_EXIST_CART.message,
      data: "",
    });
  }

  const courses = cart.courses;
  const isExistedCourse = courses.find((c) => c === courseId);
  if (!isExistedCourse) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.NOT_EXIST_COURSE.code,
      message: MESSAGE.NOT_EXIST_COURSE.message,
      data: "",
    });
  }

  // check delete cart
  if (courses.length === 1 && courses.find((c) => c === courseId)) {
    await Cart.findOneAndDelete({ userId: decodedToken._id });
  } else {
    // update
    const updateOps = {
      courses: courses.filter((c) => c !== courseId),
    };
    // REMOVE
    await Cart.findOneAndUpdate(
      { userId: decodedToken._id },
      { $set: updateOps }
    );
  }

  response.status(STATUS.SUCCESS).json({
    error_code: MESSAGE.SUCCESS.code,
    message: MESSAGE.SUCCESS.message,
    data: "",
  });
};
