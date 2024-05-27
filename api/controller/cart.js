const mongoose = require("mongoose");

const { STATUS, MESSAGE } = require("../constant/response");
const Cart = require("../model/cart");
const Course = require("../model/course");
const MyCourse = require("../model/my-course");

exports.getCart = async (request, response, next) => {
  try {
    const decodedToken = request.decodedToken;
    const cart = await Cart.findOne({ userId: decodedToken._id });
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: cart ? cart.courses : [],
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
    // ADD NEW
    const decodedToken = request.decodedToken;

    const cart = await Cart.findOne({ userId: decodedToken._id });
    if (!cart) {
      await new Cart({
        userId: decodedToken._id,
        courses: [course],
      }).save();
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.SUCCESS.code,
        message: MESSAGE.SUCCESS.message,
        data: [course],
      });
    }

    const courses = cart.courses;
    const isExistedCourse = courses.find((c) => c._id.toString() === courseId);

    if (isExistedCourse) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.EXIST_COURSE.code,
        message: MESSAGE.EXIST_COURSE.message,
        data: "",
      });
    }

    const updateOps = {
      courses: [...courses, course],
    };

    // ADD MORE
    await Cart.findOneAndUpdate(
      { userId: decodedToken._id },
      { $set: updateOps }
    );

    response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: updateOps.courses,
    });
  } catch (error) {
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
      data: [],
    });
  }

  const decodedToken = request.decodedToken;
  const cart = await Cart.findOne({ userId: decodedToken._id });
  if (!cart) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.NOT_EXIST_CART.code,
      message: MESSAGE.NOT_EXIST_CART.message,
      data: [],
    });
  }

  const courses = cart.courses;
  const isExistedCourse = courses.find((c) => c._id.toString() === courseId);
  if (!isExistedCourse) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.NOT_EXIST_COURSE.code,
      message: MESSAGE.NOT_EXIST_COURSE.message,
      data: [],
    });
  }

  // check delete cart
  if (
    courses.length === 1 &&
    courses.find((c) => c._id.toString() === courseId)
  ) {
    await Cart.findOneAndDelete({ userId: decodedToken._id });
    response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: [],
    });
  } else {
    // update
    const finalCourses = courses.filter((c) => c._id.toString() !== courseId);
    const updateOps = {
      courses: finalCourses,
    };
    // REMOVE
    await Cart.findOneAndUpdate(
      { userId: decodedToken._id },
      { $set: updateOps }
    );
    response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: finalCourses,
    });
  }
};

exports.verifyCart = async (request, response, next) => {
  const courses = request.body.courses[0].split(",");
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

    next();
  });
};
