const mongoose = require("mongoose");

const Schema = mongoose.Schema

const resetPasswordTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
		required: true,
  },
  token: {
    type: String,
		required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60, // 30 days
  }
});

const ResetPasswordToken = mongoose.model("ResetPasswordToken", resetPasswordTokenSchema, "resetPasswordToken");

module.exports = ResetPasswordToken;
