const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  transaction: [
    {
      courses: [
        {
          courseId: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      partnerCode: {
        type: String,
        required: true,
      },
      orderId: {
        type: String,
        required: true,
      },
      requestId: {
        type: String,
        required: true,
      },
      extraData: {
        type: String,
      },
      amount: {
        type: Number,
        required: true,
      },
      transId: {
        type: String,
        required: true,
      },
      payType: {
        type: String,
        required: true,
      },
      responseTime: {
        type: Number,
        required: true,
      },
      lastUpdated: {
        type: Number,
        required: true,
      },
    },
  ],
});

const MomoPaymentTransaction = mongoose.model(
  "MomoPaymentTransaction",
  schema,
  "momoPaymentTransaction"
);

module.exports = MomoPaymentTransaction;
