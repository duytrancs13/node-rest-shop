const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { STATUS, MESSAGE } = require("../constant/response");
const generateToken = require("../utils/generate-token");

const User = require("../model/user");
const UserToken = require("../model/user-token");

const ResetPasswordToken = require("../model/reset-password-token");
const sendEmail = require("../utils/send-email");

exports.signUp = async (request, response, next) => {
  try {
    // TODO: Check valid email, password here

    const user = await User.findOne({ email: request.body.email });
    if (user) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.EXIST_EMAIL.code,
        message: MESSAGE.EXIST_EMAIL.message,
        data: "",
      });
    }

    const hashPassword = await bcrypt.hash(request.body.password, 10);
    await new User({
      _id: new mongoose.Types.ObjectId(),
      username: request.body.username,
      email: request.body.email,
      password: hashPassword,
      role: ROLE.ADMIN,
    }).save();

    response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: "",
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};

exports.signIn = async (request, response, next) => {
  // TODO: Check valid email, password here

  try {
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.NOT_EXIST_EMAIL.code,
        message: MESSAGE.NOT_EXIST_EMAIL.message,
        data: "",
      });
    }

    const verifiedPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!verifiedPassword) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.INCORRECT_PASSWORD.code,
        message: MESSAGE.INCORRECT_PASSWORD.message,
        data: "",
      });
    }

    const { accessToken, refreshToken } = await generateToken(user);

    response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};

exports.getUserInfo = async (request, response, next) => {
  const decodedToken = request.decodedToken;

  try {
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return response.status(STATUS.SUCCESS).json({
        message: MESSAGE.SUCCESS.message,
        error_code: MESSAGE.SUCCESS.code,
        data: null,
      });
    }
    response.status(STATUS.SUCCESS).json({
      message: MESSAGE.SUCCESS.message,
      error_code: MESSAGE.SUCCESS.code,
      data: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      message: MESSAGE.SERVER.message,
      error_code: MESSAGE.SERVER.code,
      data: "",
    });
  }
};

exports.logout = async (request, response, next) => {
  const refreshToken = request.body.refreshToken;
  if (!refreshToken) {
    return response.status(STATUS.SUCCESS).json({
      message: MESSAGE.NOT_FOUND_REFRESH_TOKEN.message,
      error_code: MESSAGE.NOT_FOUND_REFRESH_TOKEN.code,
      data: "",
    });
  }
  const userToken = await UserToken.findOne({ token: refreshToken });
  if (!userToken) {
    return response.status(STATUS.SUCCESS).json({
      message: MESSAGE.SUCCESS.message,
      error_code: MESSAGE.SUCCESS.code,
      data: "",
    });
  }
  await userToken.deleteOne();
  response.status(200).json({
    message: MESSAGE.SUCCESS.message,
    error_code: MESSAGE.SUCCESS.code,
    data: "",
  });
};

exports.verifyEmail = async (request, response, next) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.NOT_EXIST_EMAIL.code,
        message: MESSAGE.NOT_EXIST_EMAIL.message,
        data: "",
      });
    }

    let resetPasswordToken = await ResetPasswordToken.findOne({
      userId: user._id,
    });

    if (!resetPasswordToken) {
      resetPasswordToken = await new ResetPasswordToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    await sendEmail(user.email, "Token", resetPasswordToken.token);
    response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: {
        userId: user._id,
      },
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};

exports.resetPassword = async (request, response, next) => {
  try {
    const user = await User.findById(request.body.userId);

    if (!user) return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.INVALID_USER.code,
      message: MESSAGE.INVALID_USER.message,
      data: "",
    });

    const resetPasswordToken = await ResetPasswordToken.findOne({
      userId: user._id,
      token: request.body.token,
    });


    if (!resetPasswordToken) return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.INVALID_TOKEN.code,
      message: MESSAGE.INVALID_TOKEN.message,
      data: "",
    });

    user.password = await bcrypt.hash(request.body.newPassword, 10);
    await user.save();
    await resetPasswordToken.deleteOne();

    response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: "",
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};
