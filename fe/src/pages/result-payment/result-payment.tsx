import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { onFetchCart } from "store/cart";
import { onFetchMyCourse } from "store/course";
import { useAppDispatch } from "components/hooks";

import Layout from "components/layout";
import Image from "components/image";
import Text from "components/text";
import Spin from "components/spin";
import Button from "components/button";

import paymentService from "service/payment";
import ROUTES from "routes";
import { CODE } from "service/http-common";

import "./style.scss";
import { INVALID_TOKEN } from "constant/number";

interface ResultPaymentProps {}

const owlClass = "result-payment";

const ResultPayment: React.FC<ResultPaymentProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const billing = Object.fromEntries(searchParams.entries());
  const [resultPayment, setResultPayment] = useState<{
    error_code: number;
    title: string;
    message: string;
  } | null>(null);

  const checkBilling = useCallback(async () => {
    if (!Object.values(billing).length) {
      return;
    }
    setIsLoading(true);
    try {
      const resultPaymentResp = await paymentService.resultPayment(billing);

      // retry
      if (resultPaymentResp?.error_code === INVALID_TOKEN) {
        const retryResultPaymentResp = await paymentService.resultPayment(
          billing
        );
        setIsLoading(false);
        const { data, ...resRetryResultPaymentResp } = retryResultPaymentResp;
        setResultPayment({
          ...resRetryResultPaymentResp,
          title:
            resRetryResultPaymentResp.error_code !== CODE.SUCCESS
              ? "Giao dịch không thành công"
              : "Thanh toán thành công",
        });
        if (resRetryResultPaymentResp.error_code === CODE.SUCCESS) {
          dispatch(onFetchCart());
          dispatch(onFetchMyCourse());
        }
        return;
      }

      const { data, ...resResultPaymentResp } = resultPaymentResp;
      setResultPayment({
        ...resResultPaymentResp,
        title:
          resResultPaymentResp.error_code !== CODE.SUCCESS
            ? "Giao dịch không thành công"
            : "Thanh toán thành công",
      });
      if (resResultPaymentResp.error_code === CODE.SUCCESS) {
        dispatch(onFetchCart());
        dispatch(onFetchMyCourse());
      }

      setIsLoading(false);
    } catch (error) {
      setResultPayment(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkBilling();
  }, []);

  return (
    <Layout>
      <div className={owlClass}>
        {(() => {
          if (isLoading)
            return (
              <>
                <Spin />
                <Text size="xlg-24" strong>
                  Giao dịch đang xử lý
                </Text>
                <Text>Vui lòng đợi trong giây lát...</Text>
              </>
            );
          if (!resultPayment) return null;

          return (
            <>
              <Image
                srcImage={
                  resultPayment.error_code !== CODE.SUCCESS
                    ? "https://res-zalo.zadn.vn/upload/media/2023/10/26/icon_error_1698314518681_601268.svg"
                    : "https://res-zalo.zadn.vn/upload/media/2023/10/27/icon_done_1698402680431_44543.svg"
                }
                width={92}
                height={92}
              />

              <Text size="xlg-24" strong>
                {resultPayment.title}
              </Text>
              <Text>{resultPayment.message}</Text>
              {resultPayment.error_code === CODE.SUCCESS && (
                <Button
                  color="primary"
                  onClick={() => {
                    navigate(ROUTES.MY_COURSE.path);
                  }}
                >
                  Khoá học của bạn
                </Button>
              )}
            </>
          );
        })()}
      </div>
    </Layout>
  );
};
export default ResultPayment;
