import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "components/hooks";
import { onRemoveToCart } from "store/cart";

import "./style.scss";
import Text from "components/text";
import { RootState } from "store";
import Spin from "components/spin";

interface RemoveToCartBtnProps {
  courseId: string;
  isRequestingPayment: boolean;
}

const owlClass = "remove-to-cart";

const RemoveToCartBtn: React.FC<RemoveToCartBtnProps> = ({ courseId, isRequestingPayment }) => {
  const dispatch = useAppDispatch();

  const { isRemovingCartId } = useAppSelector((state: RootState) => state.cart);

  const onClick = useCallback(() => {
    if (!courseId || isRequestingPayment) return;
    dispatch(onRemoveToCart(courseId));
  }, [courseId, isRequestingPayment]);

  return (
    <Text className={owlClass} color="error" cursor onClick={onClick}>
      {isRemovingCartId === courseId ? <Spin isXSmall /> : "Xoá"}
    </Text>
  );
};
export default RemoveToCartBtn;
