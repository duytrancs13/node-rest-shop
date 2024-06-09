import React from "react";

import Image from "components/image";
import Text from "components/text";

import "./style.scss";

interface WhoIsPhongProps {}

const owlClass = "responsibility";

const Responsibility: React.FC<WhoIsPhongProps> = () => (
  <div className={owlClass}>
    <Text color="white" size="xlg-32" strong>
      Triết lý giảng dạy
    </Text>
    <Text color="white" className={`${owlClass}__description`}>
      Tập trung vào chất lượng giảng viên, chất lượng giáo trình, và trải nghiệm
      học tập, DAS muốn mang tới cho các bạn học một môi trường đầy cảm hứng để
      phát triển tường tận khả năng của mình.
    </Text>

    <div className={`${owlClass}__content`}>
      <div className={`${owlClass}__content__note`}>
        <Image
          className={`${owlClass}__content__note__background`}
          srcImage="https://das.info.vn/static/media/responsibility.312fe3dd.png"
        />
        <Text
          size="xlg-24"
          strong
          className={`${owlClass}__content__note__text`}
        >
          Thu hẹp khoảng cách giữa bạn và công việc mơ ước
        </Text>
      </div>

      <div
        className={`${owlClass}__content__side ${owlClass}__content__side--left`}
      >
        <Image
          className={`${owlClass}__content__side__image`}
          srcImage="https://das.info.vn/static/media/redundant.04412b40.png"
        />
        <Text
          size="xlg-32"
          strong
          className={`${owlClass}__content__side__title`}
        >
          Loại bỏ sự thừa thải
        </Text>
        <Text
          color="white"
          size="xlg-18"
          className={`${owlClass}__content__side__description`}
        >
          Để tìm được các kiến thức về thiết kế đồ hoạ trên mạng là không khó.
          Nhưng để chắt lọc, sắp xếp, xác minh thì không phải là việc dễ dàng.
          Sự nhiễu loạn thông tin ở thời đại này dễ mang đến cho ta những tư duy
          sai lầm về ngành. DAS thấu hiểu điều này, và chỉ giảng dạy những gì
          quan trọng cho sự nghiệp các bạn.
        </Text>
      </div>
      <div
        className={`${owlClass}__content__side ${owlClass}__content__side--right`}
      >
        <Image
          className={`${owlClass}__content__side__image`}
          srcImage="https://das.info.vn/static/media/mindset.4af9bffa.png"
        />
        <Text
          size="xlg-32"
          strong
          className={`${owlClass}__content__side__title`}
        >
          Tập trung vào tư duy
        </Text>
        <Text
          color="white"
          size="xlg-18"
          className={`${owlClass}__content__side__description`}
        >
          Đa số những trường đại học hay trung tâm dạy thiết kế chỉ đang tập
          trung vào thiết kế, mà quên đi người học. Các kĩ năng phần mềm có thể
          giúp trong thời gian ngắn, nhưng không đủ để phát triển lâu dài. Để
          phát triển vượt bậc, ta cần có tư duy làm nghề. DAS cam kết đẩy mạnh
          phần này trong tất cả các bài giảng, workshop, lớp học.
        </Text>
      </div>
    </div>

    <Image
      className={`${owlClass}__decoration ${owlClass}__decoration--top-left`}
      srcImage="https://das.info.vn/static/media/shadow1.33e9f0a7.svg"
    />
    <Image
      className={`${owlClass}__decoration ${owlClass}__decoration--bottom-right`}
      srcImage="https://das.info.vn/static/media/shadow2.7db06057.svg"
    />
  </div>
);

export default Responsibility;
