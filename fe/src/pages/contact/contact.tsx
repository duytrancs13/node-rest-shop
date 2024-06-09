import React from "react";

import Layout from "components/layout";

import "./style.scss";

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => (
  <Layout>
    <h1
      style={{
        textAlign: "center",
      }}
    >
      Contact page
    </h1>
  </Layout>
);

export default Contact;
