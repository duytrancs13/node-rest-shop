import React from "react";

import Image from "components/image";
import Text from "components/text";
import Spin from "components/spin";
import AddToCartBtn from "components/add-to-cart-btn";

import { DetailCourseI } from "types/course";
import formatCurrency from "utils/format-currency";

import "./style.scss";

interface IntroduceProps {
  isLoadingDetailCourse: boolean;
  detailCourse: DetailCourseI | null;
}

const owlClass = "introduce";

const TEXT_1 = [
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
];

const Introduce: React.FC<IntroduceProps> = ({
  isLoadingDetailCourse,
  detailCourse,
}) => {
  return (
    <div className={owlClass}>
      <div className={`${owlClass}__container`}>
        {(() => {
          if (isLoadingDetailCourse) {
            return (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Spin />
              </div>
            );
          }
          if (!detailCourse) return null;
          return (
            <>
              <div className={`${owlClass}__container__preview`}>
                <div className={`${owlClass}__container__preview__thumb`}>
                  <Image
                    className={`${owlClass}__container__preview__thumb__img`}
                    srcImage="https://cdn.motiondesign.school/uploads/2021/06/FullHd_test.jpg"
                  />
                </div>
                <div className={`${owlClass}__container__preview__content`}>
                  {TEXT_1.map((text_1) => (
                    <div
                      className={`${owlClass}__container__preview__content__item`}
                      key={text_1}
                    >
                      <Image srcImage="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJDYXBhXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI3OC45MjIgMjc4LjkyMjsiIHZpZXdCb3g9IjAgMCAyNzguOTIyIDI3OC45MjIiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxMHB4IiB4bWxuczp4bWw9Imh0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSI+DQoJPGc+DQoJCTxwYXRoIHN0eWxlPSJmaWxsOiMyMGYzODQ7IiBkPSJNIDEyOC43NzUgMjY1LjEzNiBsIDE0Ni4zNiAtMjE0LjM5MiBjIDYuNzcyIC05LjkyNiA0LjIxNSAtMjMuNDU5IC01LjcwNiAtMzAuMjM2IEwgMjUxLjQ1OSA4LjI0NCBjIC05LjkyMSAtNi43NzIgLTIzLjQ2NCAtNC4yMjEgLTMwLjIzNiA1LjcwNiBMIDEwMC4xNzEgMTkxLjI2OCBsIC01My4xNCAtMzcuOTE2IGMgLTkuNzc5IC02Ljk3OCAtMjMuMzY2IC00LjcxIC0zMC4zNDUgNS4wNzUgbCAtMTIuNjQgMTcuNzEgYyAtNi45NzggOS43NzkgLTQuNzA1IDIzLjM2NiA1LjA3NSAzMC4zNDUgbCA4OS42NzkgNjMuOTg1IEMgMTA4LjU4IDI3Ny40NDUgMTIyLjAwNCAyNzUuMDU3IDEyOC43NzUgMjY1LjEzNiBaIj48L3BhdGg+DQoJPC9nPg0KPC9zdmc+" />
                      <Text>{text_1}</Text>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${owlClass}__container__content`}>
                <Text size="xlg-48" strong>
                  {detailCourse.title}
                </Text>
                <Text
                  className={`${owlClass}__container__content__description`}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia quisquam quos soluta nemo placeat adipisci sapiente
                  similique at ut! Alias sapiente illo rem quos quisquam
                  voluptatum iste itaque culpa laborum. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Officia quisquam quos
                  soluta nemo placeat adipisci sapiente similique at ut! Alias
                  sapiente illo rem quos quisquam voluptatum iste itaque culpa
                  laborum.
                </Text>
                <div className={`${owlClass}__container__content__details`}>
                  <div
                    className={`${owlClass}__container__content__details__block ${owlClass}__container__content__details__block--level`}
                  >
                    <Text strong>Level</Text>
                    <Text strong>{detailCourse.level}</Text>
                  </div>
                  <div
                    className={`${owlClass}__container__content__details__block`}
                  >
                    <Text strong>Lessons</Text>
                    <Text strong>5</Text>
                  </div>
                </div>
                <div className={`${owlClass}__container__content__action`}>
                  <Text size="xlg-36" strong center>
                    {formatCurrency("vi", detailCourse.price)}
                  </Text>
                  <div
                    className={`${owlClass}__container__content__action__cta`}
                  >
                    <AddToCartBtn courseId={detailCourse.courseId} />
                  </div>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default Introduce;
