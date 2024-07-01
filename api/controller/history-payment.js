const mongoose = require("mongoose");

const { STATUS, MESSAGE } = require("../constant/response");
const MomoPaymentTransaction = require("../model/momo-payment-transaction");

exports.getHistoryPayment = async (request, response, next) => {
  try {
    const decodedToken = request.decodedToken;
    const momoPaymentTransaction = await MomoPaymentTransaction.findOne({
      userId: decodedToken._id,
    });
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: {
        courses: momoPaymentTransaction
          ? momoPaymentTransaction.transaction.map((t) => ({
              transactionId: t.transId,
              courses: t.courses,
              totalPrice: t.amount,
              createdTime: t.lastUpdated,
              paymentMethod: t.paymentMethod,
            }))
          : [],
      },
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.SERVER.code,
      message: MESSAGE.SERVER.message,
      data: "",
    });
  }
};
