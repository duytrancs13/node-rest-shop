import React from "react";

import "./style.scss";
import Layout from "../../components/layout";

interface AboutProps {}

const About: React.FC<AboutProps> = () => (
  <Layout>
    <h1
      style={{
        textAlign: "center",
      }}
    >
      PHONG LA AI
    </h1>
  </Layout>
);

export default About;
