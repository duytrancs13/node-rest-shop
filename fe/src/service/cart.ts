import api, { IResponse } from "./http-common";

class CartService {
  addToCart = async (payload: { courseId: string }) => {
    const res = await api.post<IResponse>(
      `/cart/add-to-cart`,
      JSON.stringify(payload)
    );
    return res.data;
  };

  removeToCart = async (payload: { courseId: string }) => {
    const res = await api.post<IResponse>(
      `/cart/remove-to-cart`,
      JSON.stringify(payload)
    );
    return res.data;
  };

  getCart = async () => {
    const res = await api.get<IResponse>("/cart");
    return res.data;
  };
}

const cartService = new CartService();

export default cartService;
