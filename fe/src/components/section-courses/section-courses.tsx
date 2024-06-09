import React from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "store";
import { useAppSelector } from "components/hooks";

import CardCourse from "components/card-course";
import Button from "components/button";
import Text from "components/text";
import Spin from "components/spin";

import ROUTES from "routes";

import "./style.scss";

const owlClass = "section-courses";

interface SectionCoursesProps {}

const SectionCourses: React.FC<SectionCoursesProps> = () => {
  const navigate = useNavigate();
  const { courses, isLoadingCourses } = useAppSelector(
    (state: RootState) => state.course
  );
  return (
    <div className={owlClass}>
      <div className={`${owlClass}__container`}>
        <Text size="xlg-32" color="white" center>
          Các khoá học
        </Text>

        <div className={`${owlClass}__container__courses`}>
          {(() => {
            if (isLoadingCourses) {
              return <Spin />;
            }

            if (!courses) return null;

            if (!courses.length) {
              return <Text color="white">Không tìm thấy khoá học</Text>;
            }

            return courses.slice(0, 3).map((course) => (
              <div
                className={`${owlClass}__container__courses__course`}
                key={course._id}
              >
                <CardCourse course={course} />
              </div>
            ));
          })()}
        </div>
        <div className={`${owlClass}__container__cta`}>
          <Button onClick={() => navigate(ROUTES.COURSES.path)}>
            Khoá học khác
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionCourses;
