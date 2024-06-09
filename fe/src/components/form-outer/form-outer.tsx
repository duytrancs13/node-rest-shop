import React from "react";

import "./style.scss";
import Text from "components/text";

interface FormOuterProps {
  header: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const owlClass = "form-outer";

const FormOuter: React.FC<FormOuterProps> = ({ header, children, footer }) => (
  <div className={owlClass}>
    <div className={`${owlClass}__header`}>
      <Text size="xlg-28" center>
        {header}
      </Text>
    </div>
    <div className={`${owlClass}__body`}>{children} </div>
    <div className={`${owlClass}__footer`}>{footer}</div>
  </div>
);

export default FormOuter;
