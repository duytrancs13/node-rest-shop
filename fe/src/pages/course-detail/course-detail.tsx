import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "components/layout";
import Text from "components/text";
import Introduce from "./introduce";

import { DetailCourseI } from "types/course";
import course from "service/course";

import "./style.scss";
import Achieve from "./achieve";
import Level from "./level";
import Curriculum from "./curriculum";

interface CourseDetailProps {}

const owlClass = "course-detail";

const CourseDetail: React.FC<CourseDetailProps> = () => {
  const { courseId } = useParams();

  const [isLoadingDetailCourse, setIsLoadingDetailCourse] =
    useState<boolean>(false);

  const [detailCourse, setDetailCourse] = useState<
    DetailCourseI | null | "EMPTY"
  >(null);

  const getCourse = useCallback(async () => {
    if (!courseId || isLoadingDetailCourse) return;
    try {
      setIsLoadingDetailCourse(true);
      const getCourseReps = await course.getCourse(courseId);

      if (!getCourseReps) {
        setDetailCourse("EMPTY");
      }

      setDetailCourse(getCourseReps.data);
      setIsLoadingDetailCourse(false);
    } catch (error) {
      setDetailCourse("EMPTY");
      setIsLoadingDetailCourse(false);
    }
  }, [courseId, isLoadingDetailCourse]);

  useEffect(() => {
    getCourse();
  }, [courseId]);

  return (
    <Layout>
      {(() => {
        if (detailCourse === "EMPTY")
          return <Text>Không tìm thấy khoá học</Text>;
        return (
          <div className={owlClass}>
            <Introduce
              isLoadingDetailCourse={isLoadingDetailCourse}
              detailCourse={detailCourse}
            />
            <Achieve />
            <Level />
            <Curriculum />
          </div>
        );
      })()}
    </Layout>
  );
};

export default CourseDetail;
