const jwt = require("jsonwebtoken");

const UserToken = require("../model/user-token");

module.exports = async (user) => {
  try {
    const payload = {
      _id: user._id,
      role: user.role,
    };
    // ACCESS_TOKEN_PRIVATE_KEY
    const accessToken = jwt.sign(payload, "kanye_west", {
      expiresIn: "3h",
    });
    // REFRESH_TOKEN_PRIVATE_KEY
    const refreshToken = jwt.sign(payload, "justin_bieber", {
      expiresIn: "30d",
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
