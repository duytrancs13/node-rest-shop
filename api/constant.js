export const STATUS = {
  SUCCESS: 200,
  ERROR: 500,
};

export const MESSAGE = {
  SUCCESS: {
    code: 0,
    message: "Successfully",
  },
  SERVER: {
    code: 500,
    message: "Đã có lỗi xảy ra",
  },
  // ACCOUNT
  EXIST_EMAIL: {
    code: 409,
    message: "Email đã tồn tại",
  },
};
