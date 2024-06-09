import React from "react";
import { useNavigate } from "react-router-dom";

import { CourseI } from "types/course";
import formatCurrency from "utils/format-currency";
import { PATH_MY_COURSE } from "utils/constant";

import Text from "components/text";

import "./style.scss";

interface CardMyCourseProps {
  course: CourseI;
}

const owlClass = "card-my-course";

const CardMyCourse: React.FC<CardMyCourseProps> = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className={owlClass} onClick={() => navigate(`${PATH_MY_COURSE}/${course._id}`)}>
      <img width={112} height={112} alt="..." src={course.imagePath} />

      <div className={`${owlClass}__caption`}>
        <Text strong size="xlg-18">
          {course.title}
        </Text>
        <Text className={`${owlClass}__caption__price`} strong>
          {formatCurrency("vi", course.price)}
        </Text>
        <Text>{`Ngày mua: ${Date.now()}`}</Text>
      </div>
    </div>
  );
};

export default CardMyCourse;
