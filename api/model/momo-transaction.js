const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  courses: [
    {
      courseId: {
        type: String,
        required: true,
      },
      thumb: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

const MomoTransaction = mongoose.model(
  "MomoTransaction",
  schema,
  "momoTransaction"
);

module.exports = MomoTransaction;
