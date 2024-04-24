const STATUS = {
  SUCCESS: 200,
  ERROR: 500,
};

const MESSAGE = {
  SUCCESS: {
    code: 0,
    message: "Successfully",
  },
  SERVER: {
    code: 500,
    message: "Lỗi máy chủ nội bộ",
  },
  INVALID_TOKEN: {
    code: 403,
    message: "Token không hợp lệ",
  },
  INVALID_REFRESH_TOKEN: {
    code: 403,
    message: "Refresh token không hợp lệ",
  },
  NOT_FOUNT_TOKEN: {
    code: 404,
    message: "Không cung cấp token",
  },
  NOT_FOUNT_REFRESH_TOKEN: {
    code: 404,
    message: "Không cung cấp refresh token",
  },
  
  // SIGN UP
  EXIST_EMAIL: {
    code: 400,
    message: "Email đã tồn tại",
  },
  // SIGN_IN
  NOT_EXIST_EMAIL: {
    code: 400,
    message: "Email chưa được đăng ký",
  },
  INCORRECT_PASSWORD: {
    code: 401,
    message: "Password của bạn không đúng",
  },
  // RESET PASSWORD
  INVALID_USER: {
    code: 400,
    message: "Không định danh người dùng",
  },
};

const ROLE = {
  ADMIN : "ADMIN",
  USER: "USER"
}

module.exports = { STATUS, MESSAGE, ROLE };
