const jwt = require("jsonwebtoken");

const { STATUS, MESSAGE } = require("../constant/response");

module.exports = async (request, response, next) => {
  const token = request.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.NOT_FOUND_TOKEN.code,
      message: MESSAGE.NOT_FOUND_TOKEN.message,
      data: "",
    });
  }
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    request.decodedToken = decodedToken;
    next();
  } catch (error) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.INVALID_TOKEN.code,
      message: MESSAGE.INVALID_TOKEN.message,
      data: "",
    });
  }
};
