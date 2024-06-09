import React from "react";

import Layout from "../../components/layout";

import "./style.scss";

interface BLogsProps {}

const BLogs: React.FC<BLogsProps> = () => (
  <Layout>
    {" "}
    <h1
      style={{
        textAlign: "center",
      }}
    >
      BLOGS
    </h1>
  </Layout>
);

export default BLogs;
