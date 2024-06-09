import React from "react";

import Text from "components/text";

import "./style.scss";
import { ChapterI } from "types/course";
import Chapter from "components/chapter";

interface CurriculumProps {}

const owlClass = "curriculum";

const Curriculum: React.FC<CurriculumProps> = () => (
  <div className={owlClass}>
    <Text center size="xlg-48" strong>
      Bài học trong khóa
    </Text>
    <div>
      {[
        {
          title: "Chuong 1",
          lessons: [
            {
              name: "Bai 4",
              linkUrl: "",
              duration: "06:00",
              _id: "664b713858121a97093b563a",
            },
            {
              name: "Bai 5",
              linkUrl: "",
              duration: "07:00",
              _id: "664b713858121a97093b563b",
            },
            {
              name: "Bai 6",
              linkUrl: "",
              duration: "08:00",
              _id: "664b713858121a97093b563c",
            },
          ],
          _id: "664b713858121a97093b5639",
        },
        {
          title: "Chuong 2",
          lessons: [
            {
              name: "Bai 4",
              linkUrl: "",
              duration: "06:00",
              _id: "664b713858121a97093b563e",
            },
            {
              name: "Bai 5",
              linkUrl: "",
              duration: "07:00",
              _id: "664b713858121a97093b563f",
            },
            {
              name: "Bai 6",
              linkUrl: "",
              duration: "08:00",
              _id: "664b713858121a97093b5640",
            },
          ],
          _id: "664b713858121a97093b563d",
        },
      ].map((chapter: ChapterI) => (
        <Chapter
          key={chapter._id}
          header={chapter.title}
          lessons={chapter.lessons}
        />
      ))}
    </div>
  </div>
);

export default Curriculum;
