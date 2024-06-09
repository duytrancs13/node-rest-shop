import React, { useEffect, useRef, useState } from "react";

import Text from "components/text";
import Player from "components/player";

import "./style.scss";

interface ChapterProps {
  header: React.ReactNode;
  lessons: Array<{
    name: string;
    duration: string;
    linkUrl: string;
  }>;
}

const owlClass = "chapter";

const Chapter: React.FC<ChapterProps> = ({ header, lessons }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const bodyRef = useRef<HTMLDivElement | null>(null);
  const bodyContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bodyRef?.current && bodyContentRef?.current) {
      if (isOpen) {
        const height = bodyContentRef.current.clientHeight;
        bodyRef.current.setAttribute("style", `height: ${height}px`);
      } else {
        bodyRef.current.setAttribute("style", `height: ${0}px`);
      }
    }
  }, [isOpen]);
  return (
    <div className={owlClass}>
      <div className={`${owlClass}__header`} onClick={() => setIsOpen(!isOpen)}>
        <div className={`${owlClass}__header__left`}>
          <Text size="xlg-18" strong>
            {header}
          </Text>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className={`${owlClass}__header__icon ${owlClass}__header__icon--close`}
        >
          <path
            fill="#FFF"
            fillRule="nonzero"
            d="M6.09 16l6.955-6.955a1.476 1.476 0 0 0 0-2.09L6.089 0 4 2.09 9.91 8 4 13.91 6.09 16z"
          ></path>
        </svg>
      </div>
      <div ref={bodyRef} className={`${owlClass}__body`}>
        <div ref={bodyContentRef} className={`${owlClass}__body__content`}>
          {lessons.map((lesson) => (
            <div
              key={lesson.name}
              className={`${owlClass}__body__content__lesson`}
            >
              <div className={`${owlClass}__body__content__lesson__left`}>
                {!!lesson.linkUrl && (
                  <div
                    className={`${owlClass}__body__content__lesson__left__icon`}
                  >
                    <Player linkUrl={lesson.linkUrl} />
                  </div>
                )}
                <Text size="xlg-18">{lesson.name}</Text>
              </div>
              <Text>{lesson.duration}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chapter;
