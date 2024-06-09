import React, { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "components/hooks";
import { onAddToCart } from "store/cart";
import { RootState } from "store";

import Button from "components/button";

import "./style.scss";
interface AddToCartBtnProps {
  courseId: string;
  isExistedCourse?: boolean;
}

const owlClass = "add-to-cart";

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({ courseId }) => {
  const dispatch = useAppDispatch();
  const { myCourse } = useAppSelector(
    (state: RootState) => state.course
  );

  const { isAddingCart, cart } = useAppSelector(
    (state: RootState) => state.cart
  );

  const isBought = useMemo(
    () => !!myCourse?.find((c) => c._id === courseId),
    [cart, courseId]
  );

  const isAddToCart = useMemo(
    () => !!cart?.courses?.find((c) => c._id === courseId),
    [cart, courseId]
  );

  const onClick = useCallback(() => {
    if (!courseId) return;
    dispatch(onAddToCart(courseId));
  }, [courseId]);

  return (
    <Button
      color="primary"
      isDisabled={isAddToCart || isBought}
      isLoading={isAddingCart}
      onClick={onClick}
    >
      {(() => {
        if (isBought) return "Đã mua";

        if (isAddToCart) {
          return "Đã thêm vào giỏ hàng";
        }

        return "Thêm vào giỏ hàng";
      })()}
    </Button>
  );
};
export default AddToCartBtn;
