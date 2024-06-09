import api, { IResponse } from "./http-common";

class PaymentService {
  requestPayment = async (payload: {
    amount: number;
    courses: Array<string>;
  }) => {
    const res = await api.post<IResponse>(
      `/request-payment`,
      JSON.stringify(payload)
    );
    return res.data;
  };
  requestPaymentMomo = async (payload: {
    price: number;
    courses: Array<string>;
  }) => {
    const res = await api.post<IResponse>(
      `/request-payment`,
      JSON.stringify(payload)
    );
    return res.data;
  };

  resultPayment = async (payload: Object) => {
    const res = await api.post<IResponse>(
      `/result-payment`,
      JSON.stringify(payload)
    );
    return res.data;
  };
}

const paymentService = new PaymentService()

export default paymentService;
