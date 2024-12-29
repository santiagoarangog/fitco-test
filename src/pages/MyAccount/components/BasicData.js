import React from "react";
import PropTypes from "prop-types";
import { Card, WrapperInitials } from "./styles";
import { Div, Text } from "../../../styles/Common";
import { useTranslation } from "react-i18next";
import { theme } from "../../../styles/theme";
import { getInitials, getUserInfo } from "../../../utilities/helpers";
import { Input } from "../../../components/Input";
import { Link } from "../../../components/Link";
import lock from "../../../assets/icons/Lock.svg";
import { useNavigate } from "react-router-dom";

export const BasicData = ({ userData, handleChange }) => {
  const { t } = useTranslation("myAccount");
  const navigate = useNavigate();
  const userName = getUserInfo().name;
  const userRol = getUserInfo().role[0];

  const handleChangePassword = () => {
    navigate("/my-account/change-password");
  };

  return (
    <Card width="325px" height="551px">
      <Div p="27px 0 0 31px">
        <Text
          color={theme.colors.blue}
          weight={theme.fonts.weight.medium}
          size={theme.fonts.size.h5}
        >
          {userRol === "Investor" ? t("investorData") : t("basicData")}
        </Text>
      </Div>
      <Div direction="column" justify="center" align="center" m="32px 0 0 0">
        <WrapperInitials>
          <Text
            color={theme.colors.green}
            weight={theme.fonts.weight.semibold}
            size={theme.fonts.size.h5}
          >
            {getInitials(userName)}
          </Text>
        </WrapperInitials>
        <Text
          color={theme.colors.gray300}
          size={theme.fonts.size.h6}
          weight={theme.fonts.weight.medium}
          mb="6px"
        >
          {userName}
        </Text>
        <Text color={theme.colors.gray300} size={theme.fonts.size.xs} mb="68px">
          {`${t("createAt")} 12/01/2022`}
        </Text>
        <Div direction="column" gap="32px" width="264px">
          <Input
            label={t("changeName")}
            id="name"
            value={userData.name}
            sizeLabel={theme.fonts.size.default}
            onChange={handleChange}
            width={"100%"}
          />
          {userRol === "Investor" ? (
            <Input
              label={t("position")}
              id="role"
              value={userRol}
              sizeLabel={theme.fonts.size.default}
              width={"100%"}
              disabled={true}
            />
          ) : (
            <Input
              label={t("changePhone")}
              id="phone"
              value={userData.phone}
              sizeLabel={theme.fonts.size.default}
              onChange={handleChange}
              width={"100%"}
            />
          )}
        </Div>
        <Div m="28px 0 0 0">
          <Link
            onClick={handleChangePassword}
            size={theme.fonts.size.sm}
            icon={<img alt="lock" src={lock} />}
          >
            {t("changePassword")}
          </Link>
        </Div>
      </Div>
    </Card>
  );
};

BasicData.propTypes = {
  userData: PropTypes.object,
  handleChange: PropTypes.func,
};
