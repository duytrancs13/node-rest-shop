import api, { IResponse } from "./http-common";

class CourseService {
  getCourse = async (courseId: string) => {
    const res = await api.get<IResponse>(`/course/${courseId}`);
    return res.data;
  };

  getCourses = async () => {
    const res = await api.get<IResponse>("/course");
    return res.data;
  };

  getMyCourse = async () => {
    const res = await api.get<IResponse>("/my-course");
    return res.data;
  };

  getCurriculum = async (courseId: string) => {
    const res = await api.get<IResponse>(`/curriculum/${courseId}`);
    return res.data;
  };
}

const courseService = new CourseService();

export default courseService;
