import React from "react";

import Layout from "components/layout";

import SectionHero from "components/section-hero";
import SectionAuthor from "components/section-author";
// import Responsibility from "components/responsibility";

import "./style.scss";
import SectionCourses from "components/section-courses";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => (
  <Layout>
    <SectionHero />
    <SectionAuthor />
    <SectionCourses />
  </Layout>
);

export default Home;
