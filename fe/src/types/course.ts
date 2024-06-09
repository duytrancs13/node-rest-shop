export interface CourseI {
  imagePath: string;
  level: string;
  title: string;
  description: string;
  price: number;
  _id: string;
}

export interface DetailCourseI {
  courseId: string;
  description: string;
  level: string;
  price: number;
  title: string;
  videos: Array<string>;
  _id: string;
}

export interface LessonI {
  name: string;
  linkUrl: string;
  duration: string;
  _id: string;
}

export interface ChapterI {
  title: string;
  _id: string;
  lessons: Array<LessonI>
} 

export interface CurriculumI {
  _id: string;
  courseId: string;
  title: string;
  slide: string;
  chapters: Array<ChapterI>;
}
