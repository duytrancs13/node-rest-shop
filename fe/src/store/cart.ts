import { createSlice } from "@reduxjs/toolkit";

import { CODE } from "service/http-common";
import cart from "service/cart";
import { CourseI } from "types/course";
import { INVALID_TOKEN } from "constant/number";

interface initialStateI {
  cart: {
    courses: Array<CourseI>;
    priceTotal: number;
  } | null;
  isLoadingCart: boolean;
  isAddingCart: boolean;
  isRemovingCartId: string;
}

const initialState: initialStateI = {
  cart: null,
  isLoadingCart: false,
  isAddingCart: false,
  isRemovingCartId: "",
};

// Slice
const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchingCart: (state) => {
      state.isLoadingCart = true;
    },
    fetchedSuccessCart: (
      state,
      action: {
        payload: {
          courses: Array<CourseI>;
          priceTotal: number;
        } | null;
      }
    ) => {
      state.cart = action.payload;
      state.isLoadingCart = false;
    },
    // add
    addingToCart: (state) => {
      state.isAddingCart = true;
    },
    successAddedToCart: (
      state,
      action: {
        payload: {
          courses: Array<CourseI>;
          priceTotal: number;
        } | null;
      }
    ) => {
      state.cart = action.payload;
      state.isAddingCart = false;
    },
    errorAddedToCart: (state) => {
      state.isAddingCart = false;
    },
    // remove
    removingToCart: (
      state,
      action: {
        payload: { courseId: string };
      }
    ) => {
      state.isRemovingCartId = action.payload.courseId;
    },
    successRemovedToCart: (
      state,
      action: {
        payload: {
          courses: Array<CourseI>;
          priceTotal: number;
        } | null;
      }
    ) => {
      state.cart = action.payload;
      state.isRemovingCartId = "";
    },
    errorRemovedToCart: (state) => {
      state.isRemovingCartId = "";
    },
  },
});

// Actions
const {
  fetchingCart,
  fetchedSuccessCart,
  // add
  addingToCart,
  errorAddedToCart,
  successAddedToCart,
  // remove
  removingToCart,
  successRemovedToCart,
  errorRemovedToCart,
} = slice.actions;

export const onFetchCart =
  () =>
  async (dispatch: any): Promise<void> => {
    try {
      dispatch(fetchingCart());
      const getCartResp = await cart.getCart();

      // retry
      if (getCartResp?.error_code === INVALID_TOKEN) {
        const retryGetCartResp = await cart.getCart();
        dispatch(fetchedSuccessCart(retryGetCartResp.data));
        return;
      }

      dispatch(fetchedSuccessCart(getCartResp.data));
    } catch (error) {
      dispatch(fetchedSuccessCart(null));
    }
  };

export const onAddToCart =
  (courseId: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      dispatch(addingToCart());
      const addToCartResp = await cart.addToCart({ courseId });
      if (addToCartResp?.error_code !== CODE.SUCCESS) {
        // retry
        if (addToCartResp?.error_code === INVALID_TOKEN) {
          const retryAddToCartResp = await cart.addToCart({ courseId });
          if (retryAddToCartResp?.error_code !== CODE.SUCCESS) {
            dispatch(errorAddedToCart());
            return;
          }
          dispatch(successAddedToCart(retryAddToCartResp.data));
          return;
        }

        alert(addToCartResp.message);
        dispatch(errorAddedToCart());
        return;
      }
      dispatch(successAddedToCart(addToCartResp.data));
    } catch (error) {
      dispatch(errorAddedToCart());
      alert("Da co loi xay ra");
    }
  };

export const onRemoveToCart =
  (courseId: string) =>
  async (dispatch: any): Promise<void> => {
    try {
      dispatch(removingToCart({ courseId }));
      const removeToCartResp = await cart.removeToCart({ courseId });
      if (removeToCartResp?.error_code !== CODE.SUCCESS) {
        // retry
        if (removeToCartResp?.error_code === INVALID_TOKEN) {
          const retryRemoveToCartResp = await cart.removeToCart({ courseId });
          if (retryRemoveToCartResp?.error_code !== CODE.SUCCESS) {
            dispatch(errorRemovedToCart());
            return;
          }
          dispatch(successRemovedToCart(retryRemoveToCartResp.data));
          return;
        }

        alert(removeToCartResp.message);
        dispatch(errorRemovedToCart());
        return;
      }
      dispatch(successRemovedToCart(removeToCartResp.data));
    } catch (error) {
      dispatch(errorRemovedToCart());
      alert("Da co loi xay ra");
    }
  };

export default slice.reducer;
