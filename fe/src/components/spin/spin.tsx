import React, { useMemo } from "react";

import "./style.scss";

interface SpinProps {
  isSmall?: boolean;
  isXSmall?: boolean;
  style?: React.CSSProperties;
}

const owlClass = "spin";

const Spin: React.FC<SpinProps> = ({ isSmall, isXSmall, style }) => {
  const styleClass = useMemo(() => {
    let style = owlClass;
    if (isSmall) {
      style = style + ` ${owlClass}--small`;
    }
    if (isXSmall) {
      style = style + ` ${owlClass}--x-small`;
    }

    return style;
  }, [isSmall, isXSmall]);
  return <div style={style} className={styleClass} />;
};

export default Spin;
