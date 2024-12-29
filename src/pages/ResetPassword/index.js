/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Text, Div } from "../../styles/Common";
import { Card } from "../../components/Card";
import { theme } from "../../styles/theme";
import { Button } from "../../components/Button";
import useResetPassword from "./hooks/useResetPassword";
import useValidateToken from "./hooks/useValidateToken";
import { validateResetPassword } from "../../utilities/validations";
import { PageWrapper } from "./styles";
import logo from "../../assets/images/alter-logo-blue.svg";
import { SelectLanguage } from "../../components/SelectLanguage";
import { useTranslation } from "react-i18next";
import { Password } from "../../components/Password";
import { getUserInfo } from "../../utilities/helpers";

export const ResetPassword = () => {
  const { t } = useTranslation(["common", "resetPassword"]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let email = urlParams.get("email");
  email = email.replace(/\s/g, "+");
  const tokenEmail = new URLSearchParams(search).get("tokenEmail");
  const [tokenPassword, setTokenPassword] = useState();
  const tokenNewUser = new URLSearchParams(search).get("newUser");

  const changePassword = useResetPassword();
  const { isLoading } = changePassword;

  const validateToken = useValidateToken();
  const {
    data,
    isSuccess: isSuccessToken,
    isError: isErrorToken,
  } = validateToken;

  useEffect(() => {
    if (email && tokenEmail) {
      validateToken.mutate({
        email: email,
        token: tokenEmail,
      });
    }
  }, []);

  useEffect(() => {
    if (isErrorToken) {
      toast.error(t("common:invalidToken"));
      navigate("/reset-password-request");
    }
    if (isSuccessToken) {
      setTokenPassword(data.data.result.data);
    }
  }, [isSuccessToken, isErrorToken]);

  const [passwordForm, setPasswordForm] = useState({
    password: "",
    repeatPassword: "",
  });
  const [errorForm, setErrorForm] = useState({
    password: {
      error: false,
      message: "",
    },
    repeatPassword: {
      error: false,
      message: "",
    },
  });

  const [forceUpdate, setForceUpdate] = useState(false);

  const handleChange = (event) => {
    const { value, id } = event.target;

    const newErrorForm = errorForm;
    newErrorForm[id].error = false;
    newErrorForm[id].message = "";
    setErrorForm(newErrorForm);

    const newForm = passwordForm;
    newForm[id] = value;
    setPasswordForm(newForm);
    setForceUpdate(!forceUpdate);
  };

  const handleChangePassword = () => {
    toast.remove();
    const validation = validateResetPassword.validate(passwordForm, {
      abortEarly: false,
    });
    if (validation.error) {
      const newErrorForm = errorForm;
      validation.error.details.forEach((ele) => {
        newErrorForm[ele.context.label].error = true;
        switch (ele.context.label) {
          case "password":
            newErrorForm[ele.context.label].message = t(
              "common:invalidPassword"
            );
            break;
          case "repeatPassword":
            newErrorForm[ele.context.label].message = t("common:equalPassword");
            break;
        }
        setErrorForm(newErrorForm);
        setForceUpdate(!forceUpdate);
      });
    } else {
      changePassword.reset();
      changePassword.mutate(
        {
          formData: {
            email: email || getUserInfo().email,
            password: passwordForm.password,
            confirmPassword: passwordForm.repeatPassword,
          },
          token: tokenPassword,
        },
        {
          onSuccess: () => {
            navigate("/");
          },
          onError: (err) => {
            toast.error(t(`common:${err.response.data.result.code}`));
          },
        }
      );
    }
  };

  return (
    <>
      <PageWrapper>
        <Div style={{ position: "absolute", top: "36px", right: "48px" }}>
          <SelectLanguage
            isWhite={true}
            color={theme.colors.white}
            backgroundColor={"#FFFFFF3C"}
          />
        </Div>
        <Col height="100%" align="center" justify="center" m="100px 0 0 0">
          <Card width="478px" height="585px">
            <Row width="100%" m="62.82px 0 40px 0" justify="center">
              <img alt="logo" src={logo} width="234.61px" height="51.18px" />
            </Row>
            <Row width="398px" m="0px 0 9px 0" height="45px">
              <Text
                weight={theme.fonts.weight.medium}
                size={theme.fonts.size.h4}
                color={theme.colors.blue}
              >
                {tokenNewUser
                  ? t("resetPassword:assignPassword")
                  : t("resetPassword:changeTitle")}
              </Text>
            </Row>
            <Row m="0 0 31px 0" width="359px" height="48px" justify="center">
              <Text
                size={theme.fonts.size.default}
                color={theme.colors.gray500}
              >
                {tokenNewUser
                  ? `${t("resetPassword:textNewUser")} ${email}`
                  : `${t("resetPassword:text")} ${email}`}
              </Text>
            </Row>
            <Row width="100%" m="0px 0 23px 0">
              <Password
                id="password"
                label={t("resetPassword:newPassword")}
                width="100%"
                onChange={handleChange}
                error={errorForm.password.error}
                helper={
                  errorForm.password.error ? errorForm.password.message : ""
                }
              />
            </Row>
            <Row width="100%" m="0 0 35px 0">
              <Password
                id="repeatPassword"
                label={t("resetPassword:repeatPassword")}
                width="100%"
                onChange={handleChange}
                error={errorForm.repeatPassword.error}
                helper={
                  errorForm.repeatPassword.error
                    ? errorForm.repeatPassword.message
                    : ""
                }
                onPressEnter={handleChangePassword}
              />
            </Row>
            <Row justify="center" m="0 0 53px 0">
              <Button
                onClick={handleChangePassword}
                width="243px"
                loading={isLoading}
              >
                {t("resetPassword:change")}
              </Button>
            </Row>
          </Card>
          <Row justify="center" m="47px 0 33px 0">
            <Text size={theme.fonts.size.sm} color={theme.colors.white}>
              {t("common:poweredBy")}
            </Text>
          </Row>
        </Col>
      </PageWrapper>
    </>
  );
};
