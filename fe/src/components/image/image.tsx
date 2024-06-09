import React from "react";

import "./style.scss";

interface ImageProps {
  width?: number;
  height?: number;

  srcImage: string;
  defaultImage?: string;
  style?: React.CSSProperties;
  className?: string;

  onClick?: (e?: any) => void;
}

const owlClass = "image";

const Image: React.FC<ImageProps> = ({
  width,
  height,
  srcImage,
  defaultImage,
  style,
  className,
  onClick,
}) => (
  <img
    className={className ? `${owlClass} ${className}` : owlClass}
    style={
      onClick
        ? {
            ...style,
            cursor: "pointer",
          }
        : style
    }
    width={width}
    height={height}
    src={srcImage}
    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
      ((e.target as HTMLImageElement).src = defaultImage || "")
    }
    alt="..."
    onClick={(e) => {
      if (onClick) {
        onClick(e);
      }
    }}
  />
);

export default Image;
