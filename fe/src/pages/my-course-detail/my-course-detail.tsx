import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "components/layout";
import Text from "components/text";
import Chapter from "components/chapter/chapter";

import { ChapterI, CurriculumI } from "types/course";
import courseService from "service/course";

import "./style.scss";
import Spin from "components/spin";
import { INVALID_TOKEN } from "constant/number";
import { CODE } from "service/http-common";

interface MyCourseDetailProps {}

const owlClass = "my-course-detail";

const MyCourseDetail: React.FC<MyCourseDetailProps> = () => {
  const { courseId } = useParams();

  const [isLoadingCurriculum, setIsLoadingCurriculum] =
    useState<boolean>(false);

  const [curriculum, setDetailMyCourse] = useState<
    CurriculumI | null | "EMPTY"
  >(null);

  const getCurriculum = useCallback(async () => {
    if (!courseId || isLoadingCurriculum) return;
    try {
      setIsLoadingCurriculum(true);
      
      const getCurriculumResp = await courseService.getCurriculum(courseId);

      console.log("getCurriculumResp: ", getCurriculumResp);


      // retry
      if (getCurriculumResp?.error_code === INVALID_TOKEN) {
        const retryGetCurriculumResp = await courseService.getCurriculum(courseId);
        if (!retryGetCurriculumResp) {
          setDetailMyCourse("EMPTY");
        }
  
        setDetailMyCourse(retryGetCurriculumResp.data);
        setIsLoadingCurriculum(false);
        return;
      }

      if (!getCurriculumResp) {
        setDetailMyCourse("EMPTY");
      }

      setDetailMyCourse(getCurriculumResp.data);
      setIsLoadingCurriculum(false);
    } catch (error) {
      console.log("error: ", error);
      
      setDetailMyCourse("EMPTY");
      setIsLoadingCurriculum(false);
    }
  }, [courseId, isLoadingCurriculum]);

  useEffect(() => {
    getCurriculum();
  }, [courseId]);

  return (
    <Layout>
      {(() => {
        if (isLoadingCurriculum) return <Spin />;
        if (curriculum === "EMPTY") return <Text>Không tìm thấy khoá học</Text>;
        if (!curriculum) return null;

        return (
          <div className={owlClass}>
            <div className={`${owlClass}__container`}>
              <Text size="xlg-60">{curriculum.title}</Text>
              <div className={`${owlClass}__container__video`}>
                <div>
                  <iframe
                    title="video"
                    width={420}
                    height={315}
                    src="https://youtu.be/tbgFUbwmwXI"
                  />
                </div>
              </div>
              <div className={`${owlClass}__container__curriculum`}>
                <Text size="xlg-24">Giáo trình</Text>
                <div
                  className={`${owlClass}__container__curriculum__download-file`}
                  onClick={() => (window.location.href = curriculum.slide)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="das__icon"
                  >
                    <g fill="#FFF" fillRule="nonzero">
                      <path d="M4.47 8.182l5.454 6.363 5.455-6.363h-4.546V0H9.015v8.182z"></path>
                      <path d="M17.197 18.182H2.652v-5.455H.833v6.364c0 .502.408.909.91.909h16.363a.91.91 0 0 0 .91-.91v-6.363h-1.819v5.455z"></path>
                    </g>
                  </svg>
                  <Text>Tải slide bài giảng khoá Typography Basics</Text>
                </div>
                {!!curriculum.chapters?.length &&
                  curriculum.chapters.map((chapter: ChapterI) => (
                    <Chapter
                      key={chapter._id}
                      header={chapter.title}
                      lessons={chapter.lessons}
                    />
                  ))}
              </div>
            </div>
          </div>
        );
      })()}
    </Layout>
  );
};

export default MyCourseDetail;
