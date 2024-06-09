import React from "react";

import Image from "components/image";
import Text from "components/text";

import "./style.scss";

interface AchieveProps {}

const owlClass = "achieve";

const Achieve: React.FC<AchieveProps> = () => (
  <div className={owlClass}>
    <Text center size="xlg-48" strong>
      Bạn Sẽ Làm Được Gì Sau Khóa Học
    </Text>
    <div className={`${owlClass}__container`}>
      {[1, 2, 3].map((idx) => (
        <div key={idx} className={`${owlClass}__container__item`}>
          <div className={`${owlClass}__container__item__left`}>
            <Image
              srcImage="https://cdn.motiondesign.school/uploads/2021/06/Pipeline.png"
              width={92}
              height={92}
            />
          </div>
          <div className={`${owlClass}__container__item__right`}>
            <Text
              size="xlg-18"
              strong
              className={`${owlClass}__container__item__right__title`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              cumque unde maiores itaque accusamus voluptatum dolor iste
              exercitationem temporibus. Recusandae suscipit labore fugit vel
              laboriosam blanditiis officiis doloribus quae velit.
            </Text>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Achieve;
