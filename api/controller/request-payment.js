const { STATUS, MESSAGE } = require("../constant/response");
const MomoTransaction = require("../model/momo-transaction");

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

const REDIRECT_URL = "https://phonglam.surge.sh/result-payment";

exports.requestPayment = async (request, response, next) => {
  const price = request.body.price;
  const userId = request.decodedToken._id;

  var partnerCode = "MOMOCKJ020230627";
  var accessKey = "NJ5sQyRQD54lurxH";
  var secretKey = "gZn6sSi6Uw605rodeyfVJwoGHGRNU7X9";
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var orderInfo = "pay with MoMo";

  var ipnUrl = (redirectUrl = REDIRECT_URL);
  var amount = price.toString();
  var requestType = "captureWallet";

  var extraData = ""; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

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
    lang: "en",
  });
  //Create the HTTPS objects
  const https = require("https");
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
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
        console.log("error---: ", error);
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

  if (+bill.resultCode !== MESSAGE.SUCCESS.code) {
    const errorCode =
      MOMO_ERROR.find((momoError) => momoError.code === +bill.resultCode) ||
      MESSAGE.MOMO_ERROR;

    return response.status(STATUS.SUCCESS).json({
      error_code: errorCode.code,
      message: errorCode.message,
      data: "",
    });
  }

  const userId = request.decodedToken._id;
  const momoTransaction = await MomoTransaction.findOne({
    userId,
    transactionId: request.body.requestId,
  });

  console.log("momoTransaction: ", momoTransaction);

  if (!momoTransaction) {
    return response.status(STATUS.SUCCESS).json({
      error_code: MESSAGE.INVALID_INPUT.code,
      message: MESSAGE.INVALID_INPUT.message,
      data: "",
    });
  }
  request.coursesFromPayment = momoTransaction.courses;
  next();
};
