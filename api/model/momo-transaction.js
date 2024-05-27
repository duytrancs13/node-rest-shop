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
  courses: {
    type: Schema.Types.Array,
    required: true,
  },
});

const MomoTransaction = mongoose.model(
  "MomoTransaction",
  schema,
  "momoTransaction"
);

module.exports = MomoTransaction;
