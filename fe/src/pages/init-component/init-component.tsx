import React from "react";

import Layout from "components/layout";

import "./style.scss";

interface InitCompProps {}

const InitComp: React.FC<InitCompProps> = () => (
  <Layout>
    <h1
      style={{
        textAlign: "center",
      }}
    >
      Init page
    </h1>
  </Layout>
);

export default InitComp;
