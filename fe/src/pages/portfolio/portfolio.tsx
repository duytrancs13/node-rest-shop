import React from "react";

import Layout from "components/layout";

import "./style.scss";

interface PortfolioProps {}

const Portfolio: React.FC<PortfolioProps> = () => (
  <Layout>
    <h1
      style={{
        textAlign: "center",
      }}
    >
      Portfolio page
    </h1>
  </Layout>
);

export default Portfolio;
