import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginWrapper } from "./styles";
import { Row, Col, Text, Div } from "../../styles/Common";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Password } from "../../components/Password";
import { theme } from "../../styles/theme";
import { validateLoginForm } from "../../utilities/validations";
import useAuth from "./hooks/useAuth";
import { setLocalUser } from "../../core/services/axiosInstance";
import { Link } from "../../components/Link";
import { emailLength } from "../../utilities/helpers";
import { SelectLanguage } from "../../components/SelectLanguage";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/fitCo_logo.png";

export const Login = () => {
  const { t } = useTranslation(["common", "login"]);
  const navigate = useNavigate();
  const authentication = useAuth();
  const { isLoading } = authentication;
  const [forceUpdate, setForceUpdate] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [errorForm, setErrorForm] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleChange = (event) => {
    const { value, id } = event.target;

    const newErrorForm = errorForm;
    newErrorForm[id].error = false;
    newErrorForm[id].message = "";
    setErrorForm(newErrorForm);

    const newLoginForm = loginForm;
    newLoginForm[id] = value;
    setLoginForm(newLoginForm);
    setForceUpdate(!forceUpdate);
  };

  const handleLogin = () => {
    toast.remove();
    const validation = validateLoginForm.validate(loginForm, {
      abortEarly: false,
    });

    if (validation.error) {
      const newErrorForm = errorForm;
      validation.error.details.forEach((ele) => {
        newErrorForm[ele.context.label].error = true;
        switch (ele.context.label) {
          case "email":
            newErrorForm[ele.context.label].message = t("common:invalidEmail");
            break;
          case "password":
            newErrorForm[ele.context.label].message = t(
              "common:invalidPassword"
            );
            break;
        }
        setErrorForm(newErrorForm);
        setForceUpdate(!forceUpdate);
      });
    } else {
      authentication.reset();
      authentication.mutate(
        { email: loginForm.email, password: loginForm.password },
        {
          onSuccess: (res) => {
            setLocalUser(res.data);
            navigate("/projects");
          },
          onError: (err) => {
            toast.error(t(`common:${err.response.data.result.code}`));
          },
        }
      );
    }
  };

  const handleLoginLink = () => {
    navigate("/email-sesion");
  };

  const handleReset = () => {
    navigate("/reset-password-request");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <LoginWrapper>
      <Div style={{ position: "absolute", top: "36px", right: "48px" }}>
        <SelectLanguage
          isWhite={true}
          color={theme.colors.white}
          backgroundColor={"#FFFFFF3C"}
        />
      </Div>
      <Col height="100vh" justify="center">
        <Card width="478px" padding="0 40px" height="600px">
          <Row align="center" justify="center" m="48px 0 0 0">
            <img alt="logo" src={Logo} width="150px" height="60px" />
          </Row>
          <Row width="100%" m="36px 0 25.5px 0" justify="center">
            <Text
              weight={theme.fonts.weight.medium}
              size={theme.fonts.size.h5}
              color={theme.colors.blue}
            >
              {t("login:login")}
            </Text>
          </Row>
          <Row width="100%" m="0 0 20px 0">
            <Input
              label={t("common:email")}
              id="email"
              maxLength={emailLength}
              onChange={handleChange}
              error={errorForm.email.error}
              helper={errorForm.email.error ? errorForm.email.message : ""}
              width="100%"
            />
          </Row>
          <Row width="100%" m="0px 0 8px 0">
            <Password
              id="password"
              label={t("common:password")}
              width="100%"
              onChange={handleChange}
              error={errorForm.password.error}
              helper={
                errorForm.password.error ? errorForm.password.message : ""
              }
              onPressEnter={handleLogin}
            />
          </Row>
          <Row width="100%" m="0px 0 20px 0" justify="end">
            <Link
              size={theme.fonts.size.sm}
              weight={theme.fonts.weight.medium}
              color={theme.colors.green}
              onClick={handleReset}
            >
              {t("login:forgot")}
            </Link>
          </Row>
          <Row width="100%" m="0px 0 17.52px 0" justify="center">
            <Button
              onClick={handleLogin}
              loading={isLoading}
            >
              {t("login:getInto")}
            </Button>
          </Row>
          <Row width="100%" align="center" gap="13.35px" m="0 0 15px 0">
            <Div width="195px" height="1px" background={theme.colors.gray100} />
            <Text>{t("login:or")}</Text>
            <Div width="195px" height="1px" background={theme.colors.gray100} />
          </Row>
          <Row p="0 20px" m="0 0 15px 0" justify="center">
            <Text
              color={theme.colors.blue}
              size={theme.fonts.size.h6}
              weight={theme.fonts.weight.medium}
              align="center"
              style={{ cursor: "pointer" }}
              onClick={handleLoginLink}
            >
              {t("login:loginLink")}
            </Text>
          </Row>
          <Div
            m="12px 0 12px 0"
            width="100%"
            height="1px"
            background={theme.colors.gray100}
          />
          <Text
            color={theme.colors.gray300}
            size={theme.fonts.size.sm}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: "5px",
            }}
          >
            {t("login:notAccount")}
            <Link onClick={handleRegister} size={theme.fonts.size.sm}>
              {t("login:register")}
            </Link>
          </Text>
        </Card>
      </Col>
      <Div style={{ position: "absolute", bottom: "5px" }}>
        <Text size={theme.fonts.size.sm} color={theme.colors.white}>
          {t("common:poweredBy")}
        </Text>
      </Div>
    </LoginWrapper>
  );
};
