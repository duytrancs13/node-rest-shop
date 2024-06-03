const { STATUS, MESSAGE } = require("../constant/response");
const MomoTransaction = require("../model/momo-transaction");
const https = require("https");

const MOMO_ERROR = [
  {
    code: 10,
    message: "Hệ thống đang được bảo trì.",
  },
  {
    code: 11,
    message: "Truy cập bị từ chối.",
  },
  {
    code: 12,
    message: "Phiên bản API không được hỗ trợ cho yêu cầu này.",
  },
  {
    code: 13,
    message: "Xác thực doanh nghiệp thất bại.",
  },
  {
    code: 20,
    message: "Yêu cầu sai định dạng.",
  },
  {
    code: 21,
    message: "Yêu cầu bị từ chối vì số tiền giao dịch không hợp lệ.",
  },
  {
    code: 22,
    message: "Số tiền giao dịch không hợp lệ.",
  },
  {
    code: 40,
    message: "RequestId bị trùng.",
  },
  {
    code: 42,
    message: "OrderId không hợp lệ hoặc không được tìm thấy.",
  },
  {
    code: 43,
    message: "Yêu cầu bị từ chối vì xung đột trong quá trình xử lý giao dịch.",
  },
  {
    code: 45,
    message: "Trùng ItemId",
  },
  {
    code: 47,
    message:
      "Yêu cầu bị từ chối vì thông tin không hợp lệ trong danh sách dữ liệu khả dụng",
  },
  {
    code: 98,
    message: "QR Code tạo không thành công. Vui lòng thử lại sau.",
  },
  {
    code: 99,
    message: "Lỗi không xác định.",
  },
  {
    code: 1000,
    message: "Giao dịch đã được khởi tạo, chờ người dùng xác nhận thanh toán.",
  },
  {
    code: 1001,
    message:
      "Giao dịch thanh toán thất bại do tài khoản người dùng không đủ tiền.",
  },
  {
    code: 1002,
    message: "Giao dịch bị từ chối do nhà phát hành tài khoản thanh toán.",
  },
  {
    code: 1003,
    message: "Giao dịch bị đã bị hủy.",
  },
  {
    code: 1004,
    message:
      "Giao dịch thất bại do số tiền thanh toán vượt quá hạn mức thanh toán của người dùng.",
  },
  {
    code: 1005,
    message: "Giao dịch thất bại do url hoặc QR code đã hết hạn.",
  },
  {
    code: 1006,
    message: "Giao dịch thất bại do người dùng đã từ chối xác nhận thanh toán.",
  },
  {
    code: 1007,
    message:
      "Giao dịch bị từ chối vì tài khoản không tồn tại hoặc đang ở trạng thái ngưng hoạt động.",
  },
  {
    code: 1017,
    message: "Giao dịch bị hủy bởi đối tác.",
  },
  {
    code: 1026,
    message: "Giao dịch bị hạn chế theo thể lệ chương trình khuyến mãi.",
  },
  {
    code: 1080,
    message:
      "Giao dịch hoàn tiền thất bại trong quá trình xử lý. Vui lòng thử lại trong khoảng thời gian ngắn, tốt hơn là sau một giờ.",
  },
  {
    code: 1081,
    message:
      "Giao dịch hoàn tiền bị từ chối. Giao dịch thanh toán ban đầu có thể đã được hoàn.",
  },
  {
    code: 2019,
    message: "Yêu cầu bị từ chối vì orderGroupId không hợp lệ.",
  },
  {
    code: 4001,
    message:
      "Giao dịch bị hạn chế do người dùng chưa hoàn tất xác thực tài khoản.",
  },
  {
    code: 4100,
    message: "Giao dịch thất bại do người dùng không đăng nhập thành công.",
  },
  {
    code: 7000,
    message: "Giao dịch đang được xử lý.",
  },
  {
    code: 7002,
    message: "Giao dịch đang được xử lý bởi nhà cung cấp loại hình thanh toán.",
  },
  {
    code: 9000,
    message: "Giao dịch đã được xác nhận thành công.",
  },
];

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

  const crypto = require("crypto");
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

  const crypto = require("crypto");
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

        const userId = request.decodedToken._id;
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
