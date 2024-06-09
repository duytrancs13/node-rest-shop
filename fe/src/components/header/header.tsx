import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/button";
import Text from "components/text";
import Dropdown from "components/dropdown";
import Image from "components/image";
import Spin from "components/spin";
import NavigationMenu from "components/navigation-menu";
import CartIcon from "components/cart-icon/cart-icon";

import ROUTES from "routes";
import { useGetPathname } from "utils/useRouter";
import { useAppDispatch, useAppSelector } from "components/hooks";
import { BREADCRUMB } from "utils/constant";
import logoImg from "../../images/logo..png";

import { RootState } from "store";
import { onFetchProfile, onLogout } from "store/profile";
import { onFetchMyCourse } from "store/course";

import "./style.scss";
interface HeaderProps {
  navigationMenuIcon: React.ReactNode;
}

const owlClass = "header";

const Header: React.FC<HeaderProps> = ({ navigationMenuIcon }) => {
  const navigate = useNavigate();
  const pathname = useGetPathname();
  const dispatch = useAppDispatch();

  const { profile, isLoadingProfile, isLoggingOut } = useAppSelector(
    (state: RootState) => state.profile
  );
  const { myCourse } = useAppSelector((state: RootState) => state.course);

  useEffect(() => {
    if (!profile) {
      getUserInfo();
    }
    if (profile && !myCourse) {
      dispatch(onFetchMyCourse());
    }
  }, [profile]);

  const getUserInfo = useCallback(async () => {
    if (pathname === ROUTES.SIGN_IN.path || pathname === ROUTES.SIGN_UP.path)
      return;
    dispatch(onFetchProfile());
  }, []);

  const logout = useCallback(async () => {
    if (profile) {
      dispatch(onLogout());
    }
  }, [profile]);

  return (
    <div className={owlClass}>
      <Image srcImage={logoImg} onClick={() => navigate(ROUTES.HOME.path)} />

      <ul className={`${owlClass}__breadcrumb`}>
        {BREADCRUMB.map((breadcrumb) => (
          <li
            key={breadcrumb.label}
            className={`${owlClass}__breadcrumb__item`}
            onClick={() => navigate(breadcrumb.navigate)}
          >
            <Text
              className={
                pathname === breadcrumb.navigate
                  ? `${owlClass}__breadcrumb__item__text ${owlClass}__breadcrumb__item__text--activate`
                  : `${owlClass}__breadcrumb__item__text`
              }
              color={
                pathname === breadcrumb.navigate ? "link-primary" : "white"
              }
              cursor
              strong
            >
              {breadcrumb.label}
            </Text>
          </li>
        ))}
      </ul>

      <div className={`${owlClass}__right`}>
        {(() => {
          if (isLoadingProfile) {
            return <Spin isSmall />;
          }

          if (profile) {
            return (
              <Dropdown
                subMenu={[
                  {
                    item: (
                      <Text strong center>
                        {ROUTES.MY_COURSE.label}
                      </Text>
                    ),
                    onChoose: () => navigate(ROUTES.MY_COURSE.path),
                  },
                  {
                    item: isLoggingOut ? (
                      <Spin isXSmall />
                    ) : (
                      <Text strong center>
                        Đăng xuất
                      </Text>
                    ),
                    onChoose: logout,
                  },
                ]}
              >
                <Text color="primary" cursor strong center>
                  {profile?.username || profile?.email}
                </Text>
              </Dropdown>
            );
          }

          return (
            <>
              <Button
                color="primary"
                onClick={() => {
                  if (pathname !== ROUTES.SIGN_UP.path) {
                    navigate(ROUTES.SIGN_UP.path);
                  }
                }}
              >
                {ROUTES.SIGN_UP.label}
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  if (pathname !== ROUTES.SIGN_IN.path) {
                    navigate(ROUTES.SIGN_IN.path);
                  }
                }}
              >
                {ROUTES.SIGN_IN.label}
              </Button>
            </>
          );
        })()}
        <CartIcon />
        <NavigationMenu>
          <div className={`${owlClass}__right__navigate-icon`}>
            {navigationMenuIcon}
          </div>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Header;
