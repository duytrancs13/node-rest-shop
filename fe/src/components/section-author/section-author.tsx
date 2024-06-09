import React from "react";

import "./style.scss";
import Image from "components/image";
import Text from "components/text";

interface SectionAuthorProps {}

const owlClass = "section-author";

const SectionAuthor: React.FC<SectionAuthorProps> = () => (
  <div className={owlClass}>
    <Image
      className={`${owlClass}__avatar`}
      srcImage="https://scontent.fhan4-5.fna.fbcdn.net/v/t39.30808-1/294236275_2106259659547722_225588034133829085_n.jpg?stp=c69.50.378.378a_dst-jpg_p480x480&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rcD3HH0XC64Q7kNvgH4V5Ak&_nc_ht=scontent.fhan4-5.fna&oh=00_AfBaxPu-LVTuMtdRSJN-9IcA_DC8I9tmpIU_cB7kudSSlQ&oe=6637CEA3"
      width={210}
      height={210}
    />
    <div className={`${owlClass}__info`}>
      <Text size="xlg-32" strong>
        Phong là ai?
      </Text>
      <Text strong>
        Valtteri Vilhelmi Laine, Game Artist, Art Director and Game Designer
      </Text>
      <Text>
        Valtteri Laine is a Helsinki based game artist with a decade of
        professional experience in 2D and 3D art. He is known for his
        versatility in all kinds of art & design tasks and for his love of
        quirky characters.
      </Text>
      <ul className={`${owlClass}__info__social`}>
        <li
          onClick={() =>
            window.open("https://www.facebook.com/pstudiovn", "_blank")
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.553.215l7.178 6.542c.253.23.336.584.213.902a.815.815 0 01-.765.524h-1.147v6.554c0 .26-.21.47-.47.47H9.627a.47.47 0 01-.47-.47v-3.979H6.843v3.98c0 .26-.21.47-.47.47H2.437a.47.47 0 01-.47-.47V8.182H.82a.815.815 0 01-.765-.524.815.815 0 01.213-.902L7.447.215a.817.817 0 011.106 0zm2.196.724h3.16c.26 0 .47.21.47.47V4.24L10.75.94z"
              fill="#11111C"
            ></path>
          </svg>
        </li>

        <li
          onClick={() =>
            window.open("https://www.facebook.com/lamhoang.share", "_blank")
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <path
              d="M6.105 15h2.57V8.738h1.997L11 6.25H8.676V4.527c0-.382.054-.683.219-.875.164-.218.52-.328 1.011-.328h1.313V1.11A17.273 17.273 0 009.305 1c-.985 0-1.75.3-2.325.875-.601.574-.875 1.367-.875 2.406V6.25H4v2.488h2.105V15z"
              fill="#11111C"
            ></path>
          </svg>
        </li>
      </ul>
    </div>
  </div>
);

export default SectionAuthor;
