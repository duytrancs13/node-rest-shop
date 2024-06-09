import React, { useCallback, useMemo } from "react";

import "./style.scss";

interface ButtonProps {
  type?: "submit" | "reset";
  style?: React.CSSProperties;
  isDisabled?: boolean;
  isLoading?: boolean;
  block?: boolean;
  children: React.ReactNode;
  color?: "white" | "primary" | "momo" | "vn-pay";
  onClick?: () => void;
}

const owlClass = "button";

const Button: React.FC<ButtonProps> = ({
  type,
  style,
  isDisabled,
  isLoading,
  block,
  color,
  children,
  onClick,
}) => {
  const finalOwlClass = useMemo(() => {
    let className = owlClass;
    if (isDisabled) {
      className += ` ${owlClass}--disabled`;
    }
    if (isLoading) {
      className += ` ${owlClass}--loading`;
    }

    if (color) {
      className += ` ${owlClass}--${color}`;
    }

    if (block) {
      className += ` ${owlClass}--block`;
    }

    return className;
  }, [isDisabled, color, block, isLoading]);

  const onClickBtn = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  return (
    <button
      className={finalOwlClass}
      style={style}
      type={type || "button"}
      disabled={isDisabled}
      onClick={onClickBtn}
    >
      {children}
    </button>
  );
};

export default Button;
