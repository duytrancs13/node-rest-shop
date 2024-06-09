import React from "react";

import { RootState } from "store";
import {  useAppSelector } from "components/hooks";

import Layout from "../../components/layout";
import Text from "components/text";
import Spin from "components/spin";
import CardMyCourse from "components/card-my-course";

import "./style.scss";

interface CoursesProps {}

const owlClass = "my-course";

const Courses: React.FC<CoursesProps> = () => {

  const { myCourse, isLoadingMyCourse } = useAppSelector(
    (state: RootState) => state.course
  );

  return (
    <Layout>
      <div className={owlClass}>
        <h1
          style={{
            textAlign: "center",
          }}
        >
          KHOÁ HỌC CỦA TÔI
        </h1>
        <div className={`${owlClass}__container`}>
          {(() => {
            if (isLoadingMyCourse) {
              return <Spin />;
            }
            if (!myCourse) return null;

            if (!myCourse.length) {
              return <Text>Không tìm thấy khoá học</Text>;
            }

            return (
              <div className={`${owlClass}__container__courses`}>
                {myCourse.map((course) => (
                  <CardMyCourse key={course._id} course={course} />
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
