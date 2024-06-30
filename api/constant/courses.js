const mongoose = require("mongoose");

const Course = require("../model/course");
const DetailCourse = require("../model/detail-course");

const COURSES = [
  new Course({
    _id: new mongoose.Types.ObjectId(),
    thumb:
      "https://das-public.s3-ap-southeast-1.amazonaws.com/files/course/inw4cd-jL3yj/thumbnail_QBbvX3AOwXCCOuDiIxO9p",
    title: "Làm chủ màu sắc",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis et ea distinctio nam, similique sequi fugiat quasi voluptate, laborum harum quisquam quia quaerat veritatis iure! Quam tempore rem cumque dolorem?",
    price: 1000,
  }),
  new Course({
    _id: new mongoose.Types.ObjectId(),
    thumb:
      "https://das-public.s3-ap-southeast-1.amazonaws.com/files/course/LTigVMAyTZ2n/thumbnail_HLTn4h-yV7Adh0QG6kxTe",
    title: "Portfolio & CV xin việc",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis et ea distinctio nam, similique sequi fugiat quasi voluptate, laborum harum quisquam quia quaerat veritatis iure! Quam tempore rem cumque dolorem?",
    price: 2000,
  }),
  new Course({
    _id: new mongoose.Types.ObjectId(),
    thumb:
      "https://das-public.s3-ap-southeast-1.amazonaws.com/files/course/X26fe2WFaGd4/thumbnail_lMnQz5CIn5WPuFTZ7jCJm",
    title: "Brand Identity: The Complete Kit",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis et ea distinctio nam, similique sequi fugiat quasi voluptate, laborum harum quisquam quia quaerat veritatis iure! Quam tempore rem cumque dolorem?",
    price: 3000,
  }),
  new Course({
    _id: new mongoose.Types.ObjectId(),
    thumb:
      "https://das-public.s3-ap-southeast-1.amazonaws.com/files/course/yQC8kCEYqWdz/thumbnail_2Yai4b12QlJ5A5Csd9NOF",
    title: "Typography Basics",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis et ea distinctio nam, similique sequi fugiat quasi voluptate, laborum harum quisquam quia quaerat veritatis iure! Quam tempore rem cumque dolorem?",
    price: 4000,
  }),
];

const MORE_DETAIL_COURSES = [
  {
    bannerSection: {
      coverBackground:
        "https://das-public.s3-ap-southeast-1.amazonaws.com/files/course/inw4cd-jL3yj/header_SFoKK9hQznA55ANU2k2AE",
    },
    overviewSection: [
      {
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum repellendus illum dicta. Error tenetur eveniet, voluptatibus facilis blanditiis mollitia sunt corporis? Delectus unde laboriosam cupiditate libero ratione possimus recusandae blanditiis.",
        illustration:
          "https://das-public.s3-ap-southeast-1.amazonaws.com/images/5kvyWM-Co2L9UQFYu7eTU",
      },
      {
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum repellendus illum dicta. Error tenetur eveniet, voluptatibus facilis blanditiis mollitia sunt corporis? Delectus unde laboriosam cupiditate libero ratione possimus recusandae blanditiis.",
        illustration:
          "https://das-public.s3-ap-southeast-1.amazonaws.com/images/QYFvy0cyz9wcp57I-yAWw",
      },
    ],
  },
  {
    bannerSection: {
      coverBackground:
        "https://das-public.s3-ap-southeast-1.amazonaws.com/files/course/LTigVMAyTZ2n/header_gtjjmWVwy623PuzMYIo9L",
    },
    overviewSection: [
      {
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum repellendus illum dicta. Error tenetur eveniet, voluptatibus facilis blanditiis mollitia sunt corporis? Delectus unde laboriosam cupiditate libero ratione possimus recusandae blanditiis.",
        illustration:
          "https://das-public.s3-ap-southeast-1.amazonaws.com/images/xddqFyivWD9j7mJQbYNTC",
      },
      {
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum repellendus illum dicta. Error tenetur eveniet, voluptatibus facilis blanditiis mollitia sunt corporis? Delectus unde laboriosam cupiditate libero ratione possimus recusandae blanditiis.",
        illustration:
          "https://das-public.s3-ap-southeast-1.amazonaws.com/images/ctAfVMBoILO80ML6nCxzz",
      },
    ],
  },
  {
    bannerSection: {
      coverBackground:
        "https://das-public.s3-ap-southeast-1.amazonaws.com/files/course/X26fe2WFaGd4/header_DBw74oProee4i7vxRFX4e",
    },
    overviewSection: [
      {
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum repellendus illum dicta. Error tenetur eveniet, voluptatibus facilis blanditiis mollitia sunt corporis? Delectus unde laboriosam cupiditate libero ratione possimus recusandae blanditiis.",
        illustration:
          "https://das-public.s3-ap-southeast-1.amazonaws.com/images/TCSkvNLUDZ6mihgmNLnvd",
      },
      {
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum repellendus illum dicta. Error tenetur eveniet, voluptatibus facilis blanditiis mollitia sunt corporis? Delectus unde laboriosam cupiditate libero ratione possimus recusandae blanditiis.",
        illustration:
          "https://das-public.s3-ap-southeast-1.amazonaws.com/images/Q_XU-3rOX4w0lvXH9bokB",
      },
    ],
  },
  {
    bannerSection: {
      coverBackground:
        "https://das-public.s3-ap-southeast-1.amazonaws.com/files/course/yQC8kCEYqWdz/header_glrTkXySlxia3hBfhpd-d",
    },
    overviewSection: [
      {
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum repellendus illum dicta. Error tenetur eveniet, voluptatibus facilis blanditiis mollitia sunt corporis? Delectus unde laboriosam cupiditate libero ratione possimus recusandae blanditiis.",
        illustration:
          "https://das-public.s3-ap-southeast-1.amazonaws.com/images/xMMGdXfl61OjeyYRnvEvl",
      },
      {
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum repellendus illum dicta. Error tenetur eveniet, voluptatibus facilis blanditiis mollitia sunt corporis? Delectus unde laboriosam cupiditate libero ratione possimus recusandae blanditiis.",
        illustration:
          "https://das-public.s3-ap-southeast-1.amazonaws.com/images/R5Lg58dMt2XKlQnQeG9RR",
      },
    ],
  },
];

const CURRICULUM = [
  {
    introduceVideo: {
      embedCodeSrc: "https://www.youtube.com/embed/abPmZCZZrFA",
      title: "SƠN TÙNG M-TP | ĐỪNG LÀM TRÁI TIM ANH ĐAU | OFFICIAL MUSIC VIDEO"
    },
    downloadSlideLink: "link download slide",
    chapters: [
      {
        title: "Chương 1",
        lessons: [
          {
            name: "Bài 1",
            sessionLink: "https://youtu.be/FN7ALfpGxiI",
            duration: "03:00",
          },
          {
            name: "Bài 2",
            sessionLink: "https://youtu.be/W1EywtvRYe8",
            duration: "04:00",
          },
          {
            name: "Bài 3",
            sessionLink: "https://youtu.be/knW7-x7Y7RE",
            duration: "05:00",
          },
        ],
      },
      {
        title: "Chương 2",
        lessons: [
          {
            name: "Bài 1",
            sessionLink: "https://youtu.be/FN7ALfpGxiI",
            duration: "03:00",
          },
          {
            name: "Bài 2",
            sessionLink: "https://youtu.be/W1EywtvRYe8",
            duration: "04:00",
          },
          {
            name: "Bài 3",
            sessionLink: "https://youtu.be/knW7-x7Y7RE",
            duration: "05:00",
          },
        ],
      },
    ],
  },
  {
    introduceVideo: {
      embedCodeSrc: "https://www.youtube.com/embed/xypzmu5mMPY",
      title: "SƠN TÙNG M-TP | MUỘN RỒI MÀ SAO CÒN | OFFICIAL MUSIC VIDEO"
    },
    downloadSlideLink: "link download slide",
    chapters: [
      {
        title: "Chương 1",
        lessons: [
          {
            name: "Bài 1",
            sessionLink: "https://youtu.be/FN7ALfpGxiI",
            duration: "03:00",
          },
          {
            name: "Bài 2",
            sessionLink: "https://youtu.be/W1EywtvRYe8",
            duration: "04:00",
          },
          {
            name: "Bài 3",
            sessionLink: "https://youtu.be/knW7-x7Y7RE",
            duration: "05:00",
          },
        ],
      },
      {
        title: "Chương 2",
        lessons: [
          {
            name: "Bài 1",
            sessionLink: "https://youtu.be/FN7ALfpGxiI",
            duration: "03:00",
          },
          {
            name: "Bài 2",
            sessionLink: "https://youtu.be/W1EywtvRYe8",
            duration: "04:00",
          },
          {
            name: "Bài 3",
            sessionLink: "https://youtu.be/knW7-x7Y7RE",
            duration: "05:00",
          },
        ],
      },
    ],
  },
  {
    introduceVideo: {
      embedCodeSrc: "https://www.youtube.com/embed/FN7ALfpGxiI",
      title: "NƠI NÀY CÓ ANH | OFFICIAL MUSIC VIDEO | SƠN TÙNG M-TP"
    },
    downloadSlideLink: "link download slide",
    chapters: [
      {
        title: "Chương 1",
        lessons: [
          {
            name: "Bài 1",
            sessionLink: "https://youtu.be/FN7ALfpGxiI",
            duration: "03:00",
          },
          {
            name: "Bài 2",
            sessionLink: "https://youtu.be/W1EywtvRYe8",
            duration: "04:00",
          },
          {
            name: "Bài 3",
            sessionLink: "https://youtu.be/knW7-x7Y7RE",
            duration: "05:00",
          },
        ],
      },
      {
        title: "Chương 2",
        lessons: [
          {
            name: "Bài 1",
            sessionLink: "https://youtu.be/FN7ALfpGxiI",
            duration: "03:00",
          },
          {
            name: "Bài 2",
            sessionLink: "https://youtu.be/W1EywtvRYe8",
            duration: "04:00",
          },
          {
            name: "Bài 3",
            sessionLink: "https://youtu.be/knW7-x7Y7RE",
            duration: "05:00",
          },
        ],
      },
    ],
  },
  {
    introduceVideo: {
      embedCodeSrc: "https://www.youtube.com/embed/zoEtcR5EW08",
      title: "SƠN TÙNG M-TP | CHÚNG TA CỦA TƯƠNG LAI | OFFICIAL MUSIC VIDEO"
    },
    downloadSlideLink: "link download slide",
    chapters: [
      {
        title: "Chương 1",
        lessons: [
          {
            name: "Bài 1",
            sessionLink: "https://youtu.be/FN7ALfpGxiI",
            duration: "03:00",
          },
          {
            name: "Bài 2",
            sessionLink: "https://youtu.be/W1EywtvRYe8",
            duration: "04:00",
          },
          {
            name: "Bài 3",
            sessionLink: "https://youtu.be/knW7-x7Y7RE",
            duration: "05:00",
          },
        ],
      },
      {
        title: "Chương 2",
        lessons: [
          {
            name: "Bài 1",
            sessionLink: "https://youtu.be/FN7ALfpGxiI",
            duration: "03:00",
          },
          {
            name: "Bài 2",
            sessionLink: "https://youtu.be/W1EywtvRYe8",
            duration: "04:00",
          },
          {
            name: "Bài 3",
            sessionLink: "https://youtu.be/knW7-x7Y7RE",
            duration: "05:00",
          },
        ],
      },
    ],
  },
];

module.exports = { COURSES, MORE_DETAIL_COURSES, CURRICULUM };
