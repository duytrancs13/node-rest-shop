const mongoose = require("mongoose");

const { STATUS, MESSAGE } = require("../constant/response");
const MyCourse = require("../model/my-course");
const Cart = require("../model/cart");
const Course = require("../model/course");

exports.getMyCourse = async (request, response, next) => {
  try {
    const decodedToken = request.decodedToken;
    const myCourse = await MyCourse.findOne({ userId: decodedToken._id });
    const courses = await Course.find();

    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: myCourse
        ? courses.filter((c) => myCourse.courses?.includes(c._id.toString()))
        : [],
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};

exports.addToMyCourse = async (request, response, next) => {
  const courses = request.coursesFromPayment || [];
  try {
    if (courses.length) {
      const userId = request.decodedToken._id;

      // UPDATE CART
      const cart = await Cart.findOne({ userId });
      const finalCourses = cart.courses.filter(
        (course) => !courses.includes(course._id.toString())
      );
      const updateCoursesInCart = {
        courses: finalCourses,
      };
      await Cart.findOneAndUpdate({ userId }, { $set: updateCoursesInCart });

      // ADD MY COURSE
      const myCourse = await MyCourse.findOne({ userId });
      if (!myCourse) {
        await new MyCourse({
          userId,
          courses,
        }).save();

        return response.status(STATUS.SUCCESS).json({
          error_code: MESSAGE.SUCCESS.code,
          message: MESSAGE.SUCCESS.message,
          data: courses,
        });
      }

      const updateCoursesInMyCourse = {
        courses: [...myCourse.courses, ...courses],
      };
      await MyCourse.findOneAndUpdate(
        { userId },
        { $set: updateCoursesInMyCourse }
      );
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.SUCCESS.code,
        message: MESSAGE.SUCCESS.message,
        data: "",
      });
    }
  } catch (error) {
    console.log("error: ", error);
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};
