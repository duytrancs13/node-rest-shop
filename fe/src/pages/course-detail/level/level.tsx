import React from "react";

import Text from "components/text";
import Image from "components/image";

import "./style.scss";

interface LevelProps {}

const owlClass = "level";

const Level: React.FC<LevelProps> = () => (
  <div className={owlClass}>
    <Text center size="xlg-48" strong>
      Khóa Học Dành Cho
    </Text>
    {[1, 2, 3].map((idx) => (
      <div key={idx} className={`${owlClass}__item`}>
        <div className={`${owlClass}__item__left`}>
          <Image
            srcImage="https://cdn.motiondesign.school/uploads/2021/06/Pipeline.png"
            width={64}
            height={64}
          />
        </div>
        <div className={`${owlClass}__item__right`}>
          <Text
            size="xlg-18"
            strong
            className={`${owlClass}__item__right__title`}
          >
            Lorem, ipsum dolor sit amet consectetur.
          </Text>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore,
            dignissimos reprehenderit fuga incidunt dicta quia accusantium
            officia excepturi placeat nihil mollitia voluptatum reiciendis ad
            quaerat id magni! Ea, saepe neque?
          </Text>
        </div>
      </div>
    ))}
  </div>
);

export default Level;
