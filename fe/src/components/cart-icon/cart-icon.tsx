import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { onFetchCart } from "store/cart";
import { useAppDispatch, useAppSelector } from "components/hooks";

import Text from "components/text";

import ROUTES from "routes";

import "./style.scss";
import { RootState } from "store";

interface CartIconProps {}

const owlClass = "cart-icon";

const CartIcon: React.FC<CartIconProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state: RootState) => state.profile);

  const { isAddingCart, cart } = useAppSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    if (profile && !cart) {
      dispatch(onFetchCart());
    }
  }, [profile, cart]);

  return (
    <div className={owlClass} onClick={() => navigate(ROUTES.MY_CART.path)}>
      <svg
        width="20"
        height="24"
        role="img"
        aria-labelledby="cart_icon cart_icon_desc"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
      >
        <title id="cart_icon">Cart</title>
        <desc id="cart_icon_desc">Cart icon</desc>
        <path
          d="M19.6 20.746L18.226 5.271a.661.661 0 00-.657-.604h-2.827A4.745 4.745 0 0010 0a4.745 4.745 0 00-4.74 4.667H2.431a.658.658 0 00-.657.604L.4 20.746c0 .02-.004.04-.004.059C.396 22.567 2.01 24 3.998 24h12.005c1.988 0 3.602-1.433 3.602-3.195 0-.02 0-.04-.005-.059zM10 1.326a3.42 3.42 0 013.416 3.341H6.584A3.42 3.42 0 0110 1.325zm6.003 21.349H3.998c-1.247 0-2.258-.825-2.277-1.84L3.036 5.997h2.218V8.01a.66.66 0 00.663.662.66.66 0 00.663-.662V5.998h6.836V8.01a.66.66 0 00.663.662.66.66 0 00.662-.662V5.998h2.219l1.32 14.836c-.02 1.016-1.035 1.84-2.277 1.84z"
          fill="#000"
        ></path>
      </svg>
      <Text size="xs" className={`${owlClass}__qty`}>
        {isAddingCart ? "..." : cart?.courses?.length || 0}
      </Text>
    </div>
  );
};

export default CartIcon;
