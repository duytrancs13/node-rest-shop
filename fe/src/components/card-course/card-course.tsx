import React from "react";
import { useNavigate } from "react-router-dom";

import { CourseI } from "types/course";
import formatCurrency from "utils/format-currency";
import { PATH_COURSE } from "utils/constant";

import Text from "components/text";

import "./style.scss";

interface CardCourseProps {
  course: CourseI;
}

const owlClass = "card-course";

const CardCourse: React.FC<CardCourseProps> = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className={owlClass}>
      <div className={`${owlClass}__thumb`}>
        <img
          className={`${owlClass}__thumb__img`}
          src={course.imagePath}
          alt=""
        />
      </div>
      <Text className={`${owlClass}__level`} color="secondary" strong>
        {`Trình độ - ${course.level}`}
      </Text>
      <div className={`${owlClass}__caption`}>
        <Text strong size="xlg-24">
          {course.title}
        </Text>
        <Text className={`${owlClass}__caption__description`}>
          {course.description}
        </Text>
      </div>
      <div className={`${owlClass}__bottom`}>
        <Text className={`${owlClass}__bottom__price`} strong size="xlg-24">
          {formatCurrency("vi", course.price)}
        </Text>

        <Text
          size="md"
          className={`${owlClass}__bottom__learn-more`}
          onClick={() => navigate(`${PATH_COURSE}/${course._id}`)}
        >
          Chi tiết
        </Text>
      </div>
    </div>
  );
};

export default CardCourse;
