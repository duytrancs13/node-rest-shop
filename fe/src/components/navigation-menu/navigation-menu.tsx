import React, { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

// components
import Image from "components/image";
import Text from "components/text";

// utils

import "./style.scss";
import Header from "components/header";
import { BREADCRUMB } from "utils/constant";

interface NavigationMenuProps {
  children: React.ReactNode;
}

const owlClass = "navigation-menu";

const NavigationMenu: React.FC<NavigationMenuProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback((e?: any) => {
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      {(() => {
        return (
          isOpen !== null &&
          createPortal(
            <div
              className={`${owlClass} ${
                isOpen ? `${owlClass}--open` : `${owlClass}--close`
              }`}
            >
              <div className={`${owlClass}__title`}>
                <Header
                  navigationMenuIcon={
                    <Image
                      className={`${owlClass}__title__icon`}
                      srcImage="https://res-zalo.zadn.vn/upload/media/2024/1/25/close_1706173451511_98411.svg"
                      width={24}
                      height={24}
                      style={{
                        marginLeft: 16,
                      }}
                      onClick={(e: any) => onClose(e)}
                    />
                  }
                />
              </div>
              <div className={`${owlClass}__body`}>
                {BREADCRUMB.map((breadcrumb) => (
                  <Text
                    strong
                    onClick={() => navigate(breadcrumb.navigate)}
                    className={
                      location.pathname === breadcrumb.navigate
                        ? `${owlClass}__body__item ${owlClass}__body__item--activate`
                        : `${owlClass}__body__item`
                    }
                  >
                    {breadcrumb.label}
                  </Text>
                ))}
              </div>
            </div>,
            document.body
          )
        );
      })()}
    </>
  );
};

export default NavigationMenu;
