import React, { useMemo } from "react";

import "./style.scss";

const owlClass = "text";

export type Color =
  | "primary"
  | "secondary"
  | "white"
  | "link-primary"
  | "error";
export type Size =
  | "xs"
  | "sm"
  | "md"
  | "xlg-18"
  | "xlg-20"
  | "xlg-22"
  | "xlg-24"
  | "xlg-28"
  | "xlg-32"
  | "xlg-36"
  | "xlg-40"
  | "xlg-48"
  | "xlg-52"
  | "xlg-56"
  | "xlg-60"
  | "xlg-72";

interface TextProps {
  ref?: any;
  size?: Size;
  color?: Color;

  strong?: boolean;
  center?: boolean;
  delete?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  uppercase?: boolean;
  cursor?: boolean;

  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (e?: any) => void;
}

const Text: React.FC<TextProps> = ({
  ref,
  size,
  color,
  strong,
  center,
  delete: deleteText,
  underline,
  lineThrough,
  uppercase,
  cursor,
  className,
  style,
  children,
  onClick,
}) => {
  const styleClass = useMemo(() => {
    let style = owlClass;
    if (color) {
      style = style + ` ${owlClass}--${color}`;
    }

    if (size) {
      style = style + ` ${owlClass}--${size}`;
    }

    if (strong) {
      style = style + ` ${owlClass}--strong`;
    }
    if (center) {
      style = style + ` ${owlClass}--center`;
    }
    if (deleteText) {
      style = style + ` ${owlClass}--delete`;
    }
    if (underline) {
      style = style + ` ${owlClass}--underline`;
    }
    if (lineThrough) {
      style = style + ` ${owlClass}--line-through`;
    }

    if (uppercase) {
      style = style + ` ${owlClass}--uppercase`;
    }

    if (cursor) {
      style = style + ` ${owlClass}--cursor`;
    }

    if (className) {
      style = style + ` ${className}`;
    }

    return style;
  }, [
    className,
    deleteText,
    size,
    strong,
    color,
    underline,
    lineThrough,
    uppercase,
    center,
    cursor,
  ]);
  return (
    <p
      ref={ref}
      style={style}
      className={styleClass}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </p>
  );
};

export default Text;
