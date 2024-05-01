const jwt = require("jsonwebtoken");

const UserToken = require("../model/user-token");
const { MESSAGE } = require("../constant/response");

module.exports = async (refreshToken) => {
  try {
    const decodedRefreshToken = await UserToken.findOne({
      token: refreshToken,
    });
    if (!decodedRefreshToken) {
      return Promise.reject({
        message: MESSAGE.INVALID_REFRESH_TOKEN.message,
        error_code: MESSAGE.INVALID_REFRESH_TOKEN.code,
      });
    }
    // REFRESH_TOKEN_PRIVATE_KEY
    const verifyRefreshTokenResp = jwt.verify(
      refreshToken,
      "justin_bieber"
    );
    return verifyRefreshTokenResp;
  } catch (error) {
    return Promise.reject({
      message: MESSAGE.SERVER.message,
      error_code: MESSAGE.SERVER.code,
    });
  }
};
