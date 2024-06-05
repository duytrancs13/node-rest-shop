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
module.exports = { MOMO_ERROR };
