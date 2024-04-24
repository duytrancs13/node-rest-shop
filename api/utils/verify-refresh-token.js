const jwt = require("jsonwebtoken");
const UserToken = require("../model/user-token");
const { MESSAGE } = require("../constant");

module.exports = async (refreshToken) => {
  try {
   const decodedRefreshToken = await UserToken.findOne({ token: refreshToken });
    if (!decodedRefreshToken) {
      return Promise.reject({
        message: MESSAGE.INVALID_REFRESH_TOKEN.message,
        error_code: MESSAGE.INVALID_REFRESH_TOKEN.code,
      });
    }

    const verifyRefreshTokenResp = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
    return verifyRefreshTokenResp;
  } catch (error) {
    return Promise.reject({
      message: MESSAGE.SERVER.message,
      error_code: MESSAGE.SERVER.code,
    });
  }
};
