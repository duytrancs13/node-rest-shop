// pages
import Home from "./pages/home";
import About from "./pages/about";
import Portfolio from "pages/portfolio";
import Courses from "./pages/courses";
import Blogs from "./pages/blogs";
import Contact from "./pages/contact";
import SignUp from "pages/sign-up";
import SignIn from "pages/sign-in";
import ResetPassword from "pages/reset-password";
import CourseDetail from "pages/course-detail";
import MyCart from "pages/my-cart";
import MyCourse from "pages/my-course";
import MyCourseDetail from "pages/my-course-detail";
import ResultPayment from "pages/result-payment";
import { PATH_COURSE, PATH_MY_COURSE } from "utils/constant";

const ROUTES = {
  HOME: { key: "home", path: "/", element: <Home /> },
  WHO_ARE_YOU: { key: "phong-la-ai", path: "/phong-la-ai", element: <About /> },
  PORTFOLIO: { key: "portfolio", path: "/portfolio", element: <Portfolio /> },
  DETAIL_COURSE: {
    key: "chi-tiet-khoa-hoc",
    path: `${PATH_COURSE}/:courseId`,
    element: <CourseDetail />,
  },
  COURSES: { key: "khoa-hoc", path: PATH_COURSE, element: <Courses /> },
  BLOGS: { key: "blogs", path: "/blogs", element: <Blogs /> },
  Contact: { key: "contact", path: "/lien-he", element: <Contact /> },
  SIGN_IN: {
    key: "sign-in",
    path: "/dang-nhap",
    label: "Đăng nhập",
    element: <SignIn />,
  },
  SIGN_UP: {
    key: "sign-up",
    path: "/dang-ky",
    label: "Đăng ký",
    element: <SignUp />,
  },
  RESET_PASSWORD: {
    key: "reset-password",
    path: "/quen-mat-khau",
    label: "QUÊN MẬT KHẨU",
    element: <ResetPassword />,
  },

  MY_CART: {
    key: "my-cart",
    path: "/gio-hang",
    label: "GIỎ HÀNG",
    element: <MyCart />,
  },

  MY_COURSE: {
    key: "my-course",
    path: `${PATH_MY_COURSE}`,
    label: "KHOÁ HỌC CỦA TÔI",
    element: <MyCourse />,
  },

  DETAIL_MY_COURSE: {
    key: "detail-my-course",
    path: `${PATH_MY_COURSE}/:courseId`,
    label: "KHOÁ HỌC CỦA TÔI",
    exact: true,
    element: <MyCourseDetail />,
  },
  RESULT_PAYMENT: {
    key: "ket-qua-thanh-toan",
    path: `/ket-qua-thanh-toan`,
    label: "KẾT QUẢ THANH TOÁN",
    element: <ResultPayment />,
  },
};

export default ROUTES;
