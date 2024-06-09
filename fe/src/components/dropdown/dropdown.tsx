import React from "react";

import "./style.scss";

interface DropdownProps {
  children: React.ReactNode;
  subMenu: Array<{
    item: React.ReactNode;
    onChoose: () => void;
  }>;
}

const owlClass = "dropdown";

const Dropdown: React.FC<DropdownProps> = ({ children, subMenu }) => (
  <div className={owlClass}>
    {children}
    <div className={`${owlClass}__content`}>
      {subMenu.map(({ item, onChoose }, idx) => (
        <div
          key={`${item?.toString()}-${idx}`}
          className={`${owlClass}__content__item`}
          onClick={onChoose}
        >
          {item}
        </div>
      ))}
    </div>
  </div>
);

export default Dropdown;
