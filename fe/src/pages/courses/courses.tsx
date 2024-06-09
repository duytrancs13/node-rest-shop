import React, { useEffect } from "react";

import { RootState } from "store";
import { useAppDispatch, useAppSelector } from "components/hooks";
import { onFetchCourses } from "store/course";

import Layout from "../../components/layout";
import Text from "components/text";
import SkeletonCard from "components/skeleton-card";

import "./style.scss";
import CardCourse from "components/card-course";
import Spin from "components/spin";

interface CoursesProps {}

const owlClass = "courses";

const Courses: React.FC<CoursesProps> = () => {
  const dispatch = useAppDispatch();

  const { courses, isLoadingCourses } = useAppSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    if (!courses) {
      dispatch(onFetchCourses());
    }
  }, [courses]);
  return (
    <Layout>
      <div className={owlClass}>
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Thêm bộ filter sau
        </h1>
        <div className={`${owlClass}__container`}>
          {(() => {
            if (isLoadingCourses) {
              return <Spin />;
            }
            if (!courses) return null;

            if (!courses.length) {
              return <Text>Không tìm thấy khoá học</Text>;
            }

            return (
              <div className={`${owlClass}__container__courses`}>
                {courses.map((course) => (
                  <div
                    className={`${owlClass}__container__courses__course`}
                    key={course._id}
                  >
                    <CardCourse course={course} />
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
