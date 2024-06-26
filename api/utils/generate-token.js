const jwt = require("jsonwebtoken");

const UserToken = require("../model/user-token");

module.exports = async (user) => {
  try {
    const payload = {
      _id: user._id,
      role: user.role || "user",
    };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "3h",
      }
    );
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "30day",
    });

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) {
      await UserToken.deleteOne();
    }

    await new UserToken({
      userId: user._id,
      token: refreshToken,
    }).save();

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};
