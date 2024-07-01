const { STATUS, MESSAGE } = require("../constant/response");
const MomoTransaction = require("../model/momo-transaction");
const MomoPaymentTransaction = require("../model/momo-payment-transaction");
const { MOMO_ERROR } = require("../constant/momo-error");

const https = require("https");
const crypto = require("crypto");

const baseOptions = {
  hostname: process.env.MOMO_HOST_NAME,
  port: process.env.MOMO_PORT,
};

var accessKey = process.env.MOMO_ACCESS_KEY;
var secretKey = process.env.MOMO_SECRET_KEY;
var partnerCode = process.env.MOMO_PARTNER_CODE;

const createMomoTransaction = (price) =>
  new Promise(async (resolve, reject) => {
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var ipnUrl = (redirectUrl = `${process.env.FE_URL}/ket-qua-thanh-toan`);
    var requestType = "captureWallet";
    var orderInfo = "Thanh toán qua cổng MoMo";
    var amount = price.toString();
    var extraData = "";

    var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,

      signature: signature,
      lang: "vi",
    });
    const options = {
      ...baseOptions,
      path: "/v2/gateway/api/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };

    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      res.on("data", async (body) => resolve(JSON.parse(body)));
      res.on("end", () => {
        console.log("No more data in response.");
      });
    });

    req.on("error", (e) => {
      reject(e);
    });
    req.write(requestBody);
    req.end();
  });

const checkStatusMomoTransaction = (bill) =>
  new Promise((resolve, reject) => {
    const orderId = bill.orderId;
    const requestId = bill.requestId;
    const partnerCode = bill.partnerCode;
    const lang = bill.lang || "vi";

    var rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}`;

    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode,
      requestId,
      orderId,
      lang,
      signature,
    });

    const options = {
      ...baseOptions,
      path: "/v2/gateway/api/query",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };
    var req = https.request(options, (res) => {
      res.setEncoding("utf8");
      res.on("data", async (body) => resolve(JSON.parse(body)));
    });

    req.on("error", (e) => {
      reject(e);
    });

    // write data to request body
    req.write(requestBody);
    req.end();
  });

exports.requestPayment = async (request, response, next) => {
  const userId = request.decodedToken._id;
  const totalPrice = request.totalPrice;
  const coursesInCart = request.coursesInCart;

  if (!totalPrice || !coursesInCart.length) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.INVALID_INPUT.code,
      message: MESSAGE.INVALID_INPUT.message,
      data: "",
    });
  }

  try {
    const createMomoTransactionResp = await createMomoTransaction(
      totalPrice.toString()
    );

    if (createMomoTransactionResp?.resultCode !== MESSAGE.SUCCESS.code) {
      const errorCode =
        MOMO_ERROR.find(
          (momoError) => momoError.code === createMomoTransactionResp.resultCode
        ) || MESSAGE.MOMO_ERROR;

      return response.status(STATUS.SUCCESS).json({
        error_code: errorCode.code,
        message: errorCode.message,
        data: "",
      });
    }

    const coursesInfo = coursesInCart.map((c) => ({
      courseId: c._id,
      thumb: c.thumb,
      title: c.title,
      price: c.price,
    }));

    // store transaction ID
    const momoTransaction = await MomoTransaction.findOne({ userId });
    if (!momoTransaction) {
      await new MomoTransaction({
        userId,
        transactionId: createMomoTransactionResp.requestId,
        courses: coursesInfo,
      }).save();
    } else {
      const updateOps = {
        transactionId: createMomoTransactionResp.requestId,
        courses: coursesInfo,
      };

      // ADD MORE
      await MomoTransaction.findOneAndUpdate({ userId }, { $set: updateOps });
    }

    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.SUCCESS.code,
      message: MESSAGE.SUCCESS.message,
      data: createMomoTransactionResp.payUrl,
    });
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.MOMO_ERROR.code,
      message: MESSAGE.MOMO_ERROR.message,
      data: "",
    });
  }
};

exports.resultPayment = async (request, response, next) => {
  const userId = request.decodedToken._id;
  const bill = request.body;

  if (!bill || !bill.requestId || +bill.resultCode !== MESSAGE.SUCCESS.code) {
    const errorCode =
      MOMO_ERROR.find((momoError) => momoError.code === +bill.resultCode) ||
      MESSAGE.MOMO_ERROR;

    return response.status(STATUS.SUCCESS).json({
      error_code: errorCode.code,
      message: errorCode.message,
      data: "",
    });
  }

  try {
    const checkStatusMomoTransactionResp = await checkStatusMomoTransaction(
      bill
    );

    if (checkStatusMomoTransactionResp?.resultCode !== MESSAGE.SUCCESS.code) {
      const errorCode =
        MOMO_ERROR.find(
          (momoError) =>
            momoError.code === checkStatusMomoTransactionResp.resultCode
        ) || MESSAGE.MOMO_ERROR;

      return response.status(STATUS.SUCCESS).json({
        error_code: errorCode.code,
        message: errorCode.message,
        data: "",
      });
    }

    const momoTransaction = await MomoTransaction.findOne({
      userId,
      transactionId: bill.requestId,
    });

    if (!momoTransaction) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.INVALID_INPUT.code,
        message: MESSAGE.INVALID_INPUT.message,
        data: "",
      });
    }

    // TO DO: STORE BILL to DATABASE
    const momoPaymentTransaction = await MomoPaymentTransaction.findOne({
      userId,
    });

    const newMomoPaymentTransaction = {
      userId,
      transaction: [{
        courses: momoTransaction.courses,
        amount: +checkStatusMomoTransactionResp.amount,

        partnerCode: checkStatusMomoTransactionResp.partnerCode,
        orderId: checkStatusMomoTransactionResp.orderId,
        requestId: checkStatusMomoTransactionResp.requestId,
        extraData: checkStatusMomoTransactionResp.extraData,
        transId: checkStatusMomoTransactionResp.transId,
        payType: checkStatusMomoTransactionResp.payType,
        responseTime: checkStatusMomoTransactionResp.responseTime,
        lastUpdated: checkStatusMomoTransactionResp.lastUpdated,
      }],
    };

    let receiptInfo = {
      totalPrice: +checkStatusMomoTransactionResp.amount,
      courses: momoTransaction.courses,
      createdTime: checkStatusMomoTransactionResp.lastUpdated,
      transactionId: checkStatusMomoTransactionResp.transId,
      paymentMethod: "MOMO",
    };

    if (!momoPaymentTransaction) {
      await new MomoPaymentTransaction(newMomoPaymentTransaction).save();
    } else if (
      momoPaymentTransaction?.transaction?.find(
        ({ transId }) =>
          transId.toString() ===
          checkStatusMomoTransactionResp.transId.toString()
      )
    ) {
      return response.status(STATUS.SUCCESS).json({
        error_code: MESSAGE.SUCCESS.code,
        message: MESSAGE.SUCCESS.message,
        data: receiptInfo,
      });
    } else {
      const updateOps = {
        transaction: [
          ...(momoPaymentTransaction.transaction || []),
          ...newMomoPaymentTransaction.transaction,
        ],
      };
      // ADD MORE
      await MomoPaymentTransaction.findOneAndUpdate(
        { userId },
        { $set: updateOps }
      );
    }
    // Upgrade service
    request.receiptInfo = receiptInfo;

    next();
  } catch (error) {
    response.status(STATUS.ERROR).json({
      error_code: MESSAGE.MOMO_ERROR.code,
      message: MESSAGE.MOMO_ERROR.message,
      data: "",
    });
  }
};
