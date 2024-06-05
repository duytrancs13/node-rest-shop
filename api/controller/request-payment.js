const { STATUS, MESSAGE } = require("../constant/response");
const MomoTransaction = require("../model/momo-transaction");
const MomoPaymentTransaction = require("../model/momo-payment-transaction");
const MOMO_ERROR = require("../constant/momo-error");

const https = require("https");
const crypto = require("crypto");

const baseOptions = {
  hostname: "test-payment.momo.vn",
  port: 443,
};

var accessKey = "NJ5sQyRQD54lurxH";
var secretKey = "gZn6sSi6Uw605rodeyfVJwoGHGRNU7X9";

exports.requestPayment = async (request, response, next) => {
  const userId = request.decodedToken._id;
  const price = request.body.price;

  var partnerCode = "MOMOCKJ020230627";
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var ipnUrl = (redirectUrl = `${process.env.FE_BASE_URL}/ket-qua-thanh-toan`);
  var requestType = "captureWallet";
  var orderInfo = "Thanh toán qua cổng MoMo";
  var amount = price.toString();
  var extraData = ""; //pass empty value if your merchant does not have stores

  var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  //json object send to MoMo endpoint
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
  //Create the HTTPS objects
  const options = {
    ...baseOptions,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  //Send the request and get the response
  const req = https.request(options, (res) => {
    res.setEncoding("utf8");
    res.on("data", async (body) => {
      try {
        const rawBody = JSON.parse(body);
        console.log("rawBody: ", rawBody);
        if (rawBody?.resultCode !== MESSAGE.SUCCESS.code) {
          const errorCode =
            MOMO_ERROR.find(
              (momoError) => momoError.code === rawBody.resultCode
            ) || MESSAGE.MOMO_ERROR;

          return response.status(STATUS.SUCCESS).json({
            error_code: errorCode.code,
            message: errorCode.message,
            data: "",
          });
        }
        // store transaction ID
        const momoTransaction = await MomoTransaction.findOne({ userId });
        if (!momoTransaction) {
          await new MomoTransaction({
            userId,
            transactionId: rawBody.requestId,
            courses: request.body.courses,
          }).save();
        } else {
          const updateOps = {
            transactionId: rawBody.requestId,
            courses: request.body.courses,
          };

          // ADD MORE
          await MomoTransaction.findOneAndUpdate(
            { userId },
            { $set: updateOps }
          );
        }

        return response.status(STATUS.SUCCESS).json({
          error_code: MESSAGE.SUCCESS.code,
          message: MESSAGE.SUCCESS.message,
          data: rawBody.payUrl,
        });
      } catch (error) {
        return response.status(STATUS.ERROR).json({
          error_code: MESSAGE.SERVER.code,
          message: MESSAGE.SERVER.message,
          data: "",
        });
      }
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
  });

  req.on("error", (e) => {
    return response.status(STATUS.ERROR).json({
      error_code: MESSAGE.MOMO_ERROR.code,
      message: MESSAGE.MOMO_ERROR.message,
      data: "",
    });
  });
  req.write(requestBody);
  req.end();
};

exports.resultPayment = async (request, response, next) => {
  const userId = request.decodedToken._id;
  const bill = request.body;

  if (!bill || +bill.resultCode !== MESSAGE.SUCCESS.code) {
    const errorCode =
      MOMO_ERROR.find((momoError) => momoError.code === +bill.resultCode) ||
      MESSAGE.MOMO_ERROR;

    return response.status(STATUS.SUCCESS).json({
      error_code: errorCode.code,
      message: errorCode.message,
      data: "",
    });
  }

  const orderId = bill.orderId;
  const requestId = bill.requestId;
  const partnerCode = bill.partnerCode;
  var rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}`;

  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const lang = bill.lang || "vi";
  // Check status transaction
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
    res.on("data", async (body) => {
      try {
        const rawBody = JSON.parse(body);

        console.log("rawBody: ", rawBody);

        if (rawBody?.resultCode !== MESSAGE.SUCCESS.code) {
          const errorCode =
            MOMO_ERROR.find(
              (momoError) => momoError.code === rawBody.resultCode
            ) || MESSAGE.MOMO_ERROR;

          return response.status(STATUS.SUCCESS).json({
            error_code: errorCode.code,
            message: errorCode.message,
            data: "",
          });
        }

        const momoTransaction = await MomoTransaction.findOne({
          userId,
          transactionId: requestId,
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
          transaction: {
            courses: momoTransaction.courses,
            partnerCode: rawBody.partnerCode,
            orderId: rawBody.orderId,
            requestId: rawBody.requestId,
            extraData: rawBody.extraData,
            amount: +rawBody.amount,
            transId: rawBody.transId,
            payType: rawBody.payType,
            responseTime: rawBody.responseTime,
            lastUpdated: rawBody.lastUpdated,
          },
        };
        if (!momoPaymentTransaction) {
          await new MomoPaymentTransaction(newMomoPaymentTransaction).save();
        } else {
          const updateOps = {
            transaction: [
              ...momoPaymentTransaction.transaction,
              newMomoPaymentTransaction,
            ],
          };

          // ADD MORE
          await MomoPaymentTransaction.findOneAndUpdate(
            { userId },
            { $set: updateOps }
          );
        }

        // Upgrade service
        request.coursesFromPayment = momoTransaction.courses;
        next();
      } catch (error) {
        console.log(error);
      }
    });
  });

  req.on("error", function (e) {
    return response.status(STATUS.ERROR).json({
      error_code: MESSAGE.MOMO_ERROR.code,
      message: MESSAGE.MOMO_ERROR.message,
      data: "",
    });
  });

  // write data to request body
  req.write(requestBody);
  req.end();
};
