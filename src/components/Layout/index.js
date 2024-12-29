import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { theme } from "../../styles/theme";
import { deleteLocalUser } from "../../core/services/axiosInstance";
import logo from "../../assets/images/fitco-logo.png";
import logout from "../../assets/icons/logout.svg";
import news from "../../assets/icons/News.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import { Col, Div, Text } from "../../styles/Common";
import { Link } from "../Link";
import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";
import { SelectLanguage } from "../SelectLanguage";
import {
  getInitials,
  getModule,
  getUserInfo,
} from "../../utilities/helpers";

import {
  Navbar,
  WrapperContent,
  WrapperLayout,
  Menu,
  WrapperOptions,
  WrapperColRight,
  WrapperName,
  WrapperMenu,
} from "./styles";

export const Layout = ({ children }) => {
  const { t } = useTranslation(["common", "projectTableManager"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [isDebtProjects, setIsDebtProjects] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(false);

  const { name, role } = getUserInfo();

  const handleMenu = (open) => {
    setOpenMenu(!open);
  };

  const handleLogout = () => {
    deleteLocalUser();
    navigate("/");
  };

  const options = [
    {
      name: 'Eventos',
      permission: true,
      handleClick: () => {
        navigate("/projects");
      },
      path: "/projects",
    },
    {
      name: t("users"),
      permission: role[0] === "Manager",
      handleClick: () => {
        navigate("/users");
      },
      path: "/users",
    },
  ];

  const handleMyAccount = () => {
    dispatch(setProjectInCreationInfo({}));
    navigate("/my-account");
    setOpenMenu(false);
  };

  const handleChangePassword = () => {
    dispatch(setProjectInCreationInfo({}));
    navigate("/my-account/change-password");
    setOpenMenu(false);
  };

  const externalUrlTitles =
    pathname.includes("/projects/documents") ||
    pathname.includes("/projects/info-plants") ||
    pathname.includes("/projects/edit-plant") ||
    pathname.includes("/projects/information-declaration") ||
    pathname.includes("/projects/teaser-documentation") ||
    pathname.includes("/strategies/source/") ||
    pathname.includes("/projects/deal-intel") ||
    pathname.includes("/projects/see-invitations") ||
    pathname.includes("/projects/financial-model") ||
    pathname.includes("/projects/edit-project");

  const getTitleAndSubtitle = () => {
    let title;
    let subtitle;

    switch (true) {
      case pathname.includes("/projects/documents"):
        title = projectName;
        subtitle = t("documentsMessage");
        break;
      case pathname.includes("/projects/info-plants"):
        title = plantName;
        subtitle = `${t("project")}: ${projectName}`;
        break;
      case pathname.includes("/projects/edit-plant"):
        title = plantName;
        subtitle = `${t("project")}: ${projectName}`;
        break;
      case pathname.includes("/projects/information-declaration"):
        title = projectName;
        subtitle = projectDate;
        break;
      case pathname.includes("/projects/teaser-documentation"):
        title = projectName;
        subtitle = "Asset Editor Teaser";
        break;
      case pathname.includes("/strategies/source/"):
        title = t("editSource");
        subtitle = "";
        break;
      case pathname.includes("/projects/deal-intel"):
        title = projectName;
        subtitle = "Asset Editor Teaser";
        break;
      case pathname.includes("/projects/see-invitations"):
        title = projectName;
        subtitle = t(`projectTableManager:${projectStatusManager[status]}`);
        break;
      case pathname.includes("/projects/financial-model"):
        title = t("financialModel");
        subtitle = projectName;
        break;
      case pathname.includes("/projects/edit-project"):
        title = t(getModule[pathname]);
        subtitle = projectName;
        break;
      default:
        title = undefined;
        subtitle = undefined;
    }

    return { title, subtitle };
  };

  const items = [
    {
      key: "1",
      label: (
        <Link
          color={theme.colors.gray300}
          weight={theme.fonts.weight.regular}
          style={{ margin: "5px 0" }}
          onClick={handleMyAccount}
        >
          {t("myAccount")}
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          color={theme.colors.gray300}
          weight={theme.fonts.weight.regular}
          style={{ margin: "5px 0" }}
          onClick={handleChangePassword}
        >
          {t("changePassword")}
        </Link>
      ),
    },
  ];

  return (
    <WrapperLayout>
      <Menu>
        <Col>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}>
            <img alt="logo" src={logo} width="100px" height="100px" />
            <br/>
            <Text
              color={theme.colors.white}
              weight={theme.fonts.weight.medium}
              size={theme.fonts.size.h6}
            >
              FitCo Test
            </Text>
          </div>
          <Div direction={"column"} m="235px 0 0 0" gap="16px">
            {options.map(
              (ele, indx) =>
                ele.permission && (
                  <WrapperOptions
                    key={indx}
                    onClick={ele.handleClick}
                    style={{
                      backgroundColor: pathname.includes(ele.path)
                        ? theme.colors.green
                        : "transparent",
                    }}
                  >
                    <img alt="icon" src={news} />
                    <Text
                      color={
                        pathname.includes(ele.path)
                          ? theme.colors.white
                          : theme.colors.light100
                      }
                      weight={theme.fonts.weight.medium}
                      size={theme.fonts.size.sm}
                    >
                      {ele.name}
                    </Text>
                  </WrapperOptions>
                )
            )}
          </Div>
        </Col>
        <Col>
          <hr
            style={{
              width: "100%",
              border: `1px solid ${theme.colors.gray100}`,
              opacity: 0.22,
              margin: "20.5px 0 21.5px 0",
            }}
          />
          <Link
            icon={<img alt="logout" src={logout} />}
            color={theme.colors.gray200}
            size={theme.fonts.size.sm}
            onClick={handleLogout}
          >
            {t("logout")}
          </Link>
        </Col>
      </Menu>
      <WrapperColRight>
        <Navbar>
          {externalUrlTitles ? (
            <Div direction="column">
              <Text
                color={theme.colors.blue}
                weight={theme.fonts.weight.medium}
                size={theme.fonts.size.h4}
                lineHeight={"37px"}
              >
                {getTitleAndSubtitle().title}
              </Text>
              <Text
                color={theme.colors.gray200}
                size={theme.fonts.size.sm}
                lineHeight={"21px"}
              >
                {getTitleAndSubtitle().subtitle}
              </Text>
            </Div>
          ) : (
            <Div>
              <Text
                color={theme.colors.blue}
                weight={theme.fonts.weight.medium}
                size={theme.fonts.size.h4}
              >
                {t(getModule[pathname])}
              </Text>
            </Div>
          )}
          <Div gap="39px" align="center">
            <SelectLanguage
              backgroundColor={theme.colors.white}
              isWhite={false}
            />
            <Div gap="16px" align="center">
              <Text
                color={theme.colors.green}
                style={{ textAlign: "right", width: "85px" }}
              >
                {name}
              </Text>
              <WrapperName>{getInitials(name)}</WrapperName>
              <Dropdown
                menu={{ items }}
                open={openMenu}
                overlayStyle={{ top: "12%" }}
              >
                <WrapperMenu onClick={() => handleMenu(openMenu)}>
                  <img alt="arrow-down" src={arrowDown} />
                </WrapperMenu>
              </Dropdown>
            </Div>
          </Div>
        </Navbar>
        <hr
          style={{
            width: "94%",
            border: `1px solid ${theme.colors.gray100}`,
            opacity: 1,
            margin: 0,
            alignSelf: "center",
          }}
        />
        <WrapperContent>{children}</WrapperContent>
      </WrapperColRight>
    </WrapperLayout>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
