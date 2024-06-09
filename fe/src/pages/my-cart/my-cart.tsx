import React, { useCallback, useRef, useState } from "react";

import { useAppSelector } from "components/hooks";
import { RootState } from "store";

import Layout from "components/layout";

import Text from "components/text";
import Image from "components/image";
import Button from "components/button";
import RemoveToCartBtn from "components/remove-to-cart-btn";
import Spin from "components/spin";

import payment from "service/payment";
import { CourseI } from "types/course";
import formatCurrency from "utils/format-currency";
import { CODE } from "service/http-common";
import { INVALID_TOKEN } from "constant/number";

import "./style.scss";

interface MyCartProps {}

const owlClass = "my-cart";

const MyCart: React.FC<MyCartProps> = () => {
  const { cart, isLoadingCart } = useAppSelector(
    (state: RootState) => state.cart
  );
  const [isPaymentMomo, setIsPaymentMomo] = useState<boolean>(false);
  const isPaymentMomoRef = useRef<boolean>(false);

  const onPaymentMOMO = useCallback(async () => {
    try {
      if (isPaymentMomo || isPaymentMomoRef?.current || !cart) return;

      setIsPaymentMomo(true);
      isPaymentMomoRef.current = true;

      const paymentResp = await payment.requestPaymentMomo({
        price: cart.priceTotal,
        courses: cart?.courses?.map((c) => c._id) || [],
      });

      if (paymentResp?.error_code !== CODE.SUCCESS) {
        // retry
        if (paymentResp?.error_code === INVALID_TOKEN) {
          const retryPaymentResp = await payment.requestPaymentMomo({
            price: cart.priceTotal,
            courses: cart?.courses?.map((c) => c._id) || [],
          });

          setIsPaymentMomo(false);
          isPaymentMomoRef.current = false;

          if (retryPaymentResp?.error_code !== CODE.SUCCESS) {
            alert("Đã có lỗi xảy ra!!!");
            return;
          }
          window.location.href = retryPaymentResp?.data;
          return;
        }
        alert(paymentResp.message);
        return;
      }

      setIsPaymentMomo(false);
      isPaymentMomoRef.current = false;

      window.location.href = paymentResp?.data;
    } catch (error) {
      setIsPaymentMomo(false);
      isPaymentMomoRef.current = false;
      alert("Đã có lỗi xảy ra!!!");
    }
  }, [cart, isPaymentMomo]);

  return (
    <Layout>
      <div className={owlClass}>
        {(() => {
          if (isLoadingCart) return <Spin />;
          if (!cart?.courses?.length) return <Text>Giỏ hàng trống</Text>;

          return (
            <>
              <div className={`${owlClass}__header`}>
                <Text center size="xlg-24" strong>
                  GIỎ HÀNG
                </Text>
              </div>
              <div className={`${owlClass}__body`}>
                {cart.courses.map((course: CourseI) => (
                  <div className={`${owlClass}__body__course`} key={course._id}>
                    <div className={`${owlClass}__body__course__img`}>
                      <Image
                        width={164}
                        height={164}
                        srcImage={course.imagePath}
                      />
                    </div>
                    <div className={`${owlClass}__body__course__info`}>
                      <div className={`${owlClass}__body__course__info__left`}>
                        <Text
                          size="xlg-18"
                          strong
                          color="primary"
                          className={`${owlClass}__body__course__info__left__name`}
                        >
                          {course.title}
                        </Text>
                        <div
                          className={`${owlClass}__body__course__info__left__price`}
                        >
                          <Text>Giá: </Text>{" "}
                          <Text strong>
                            {formatCurrency("vi", course.price || 0)}
                          </Text>
                        </div>
                      </div>
                      <RemoveToCartBtn
                        isRequestingPayment={isPaymentMomo}
                        courseId={course._id}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className={`${owlClass}__footer`}>
                <div className={`${owlClass}__footer__divide`} />
                <div className={`${owlClass}__footer__total-price`}>
                  <Text strong size="xlg-18">
                    Tổng
                  </Text>
                  <Text strong size="xlg-18">
                    {formatCurrency("vi", cart.priceTotal)}
                  </Text>
                </div>
                <div className={`${owlClass}__footer__payment`}>
                  <Button block color="momo" onClick={onPaymentMOMO}>
                    {isPaymentMomo ? <Spin isXSmall /> : "THANH TOÁN MOMO"}
                  </Button>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </Layout>
  );
};

export default MyCart;
