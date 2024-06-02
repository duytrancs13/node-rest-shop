const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
    match: /^(\S+$)/g,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "user");

const validUser = () => {
  const MIN_USERNAME = 3;
  const MIN_PASSWORD = 3;
  const MAX_PASSWORD = 12;

  const NOT_CONTAIN_WHITE_SPACE = "có chứa ký tự khoảng trắng";
  const REQUIRED = "Vui lòng điền thông tin";
  const EMPTY = "bị rỗng";

  const NOT_WHITESPACE_RegExp = new RegExp("^\\S*$");

  return {
    username: Joi.string()
      .required()
      .min(MIN_USERNAME)
      .pattern(NOT_WHITESPACE_RegExp)
      .messages({
        "string.empty": `Tên người dùng ${EMPTY}`,
        "any.required": `${REQUIRED} tên người dùng`,
        "string.min": `Tên người dùng it hơn ${MIN_USERNAME} ký tự`,
        "string.pattern.base": `Tên người dùng ${NOT_CONTAIN_WHITE_SPACE}`,
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.empty": `Email ${EMPTY}`,
        "any.required": `${REQUIRED} email`,
        "string.email": `Email không đúng định dạng`,
      }),
    password: Joi.string()
      .required()
      .pattern(NOT_WHITESPACE_RegExp)
      .min(MIN_PASSWORD)
      .max(MAX_PASSWORD)
      .messages({
        "string.empty": `Password ${EMPTY}`,
        "any.required": `${REQUIRED} password`,
        "string.min": `Mật khẩu ít hơn ${MIN_PASSWORD} ký tự`,
        "string.max": `Mật khẩu nhiều hơn ${MAX_PASSWORD} ký tự`,
        "string.pattern.base": `Password ${NOT_CONTAIN_WHITE_SPACE}`,
      }),
  };
};

const validateSignUp = (payload) => {
  const schema = Joi.object(validUser());
  return schema.validate(payload);
};

const validateSignIn = (payload) => {
  const { email, password } = validUser();
  const schema = Joi.object({ email, password });
  return schema.validate(payload);
};

const validateEmail = (payload) => {
  const { email } = validUser();
  const schema = Joi.object({ email });
  return schema.validate(payload);
};

const validateResetPassword = (payload) => {
  const { password } = validUser();
  const schema = Joi.object({ password });
  return schema.validate(payload);
};

module.exports = {
  User,
  validateSignUp,
  validateSignIn,
  validateEmail,
  validateResetPassword,
};
