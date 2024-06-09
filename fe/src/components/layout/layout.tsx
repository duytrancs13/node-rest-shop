import React, { useEffect } from "react";
import { RootState } from "store";

import { useAppDispatch, useAppSelector } from "components/hooks";
import { onFetchCourses } from "store/course";

import Header from "components/header";
import Image from "components/image";

import "./style.scss";
interface LayoutProps {
  children: React.ReactNode;
}

const owlClass = "layout";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { courses } = useAppSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    if (!courses) {
      dispatch(onFetchCourses());
    }
  }, [courses]);
  return (
    <div className={owlClass}>
      <div className={`${owlClass}__header`}>
        <Header
          navigationMenuIcon={
            <Image srcImage="https://res-zalo.zadn.vn/upload/media/2024/1/25/menu_1706172300927_93940.svg" />
          }
        />
      </div>
      <div className={`${owlClass}__container`}>{children}</div>
      <div className={`${owlClass}__footer`}>footer</div>
    </div>
  );
};

export default Layout;
