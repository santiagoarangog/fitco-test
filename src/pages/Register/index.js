import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PageWrapper } from "./styles";
import { Row, Col, Text, Div } from "../../styles/Common";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Password } from "../../components/Password";
import { theme } from "../../styles/theme";
import { validateRegisterForm } from "../../utilities/validations";
import useRegister from "./hooks/useRegister";
import { Link } from "../../components/Link";
import { emailLength } from "../../utilities/helpers";
import logo from "../../assets/images/fitco-logo.png";
import { SelectLanguage } from "../../components/SelectLanguage";
import ModalSuccess from "./components/ModalSuccess";

export const Register = () => {
  const { t } = useTranslation("register");
  const navigate = useNavigate();
  const register = useRegister();
  const { isLoading } = register;
  const [forceUpdate, setForceUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    phone: null,
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errorForm, setErrorForm] = useState({
    name: {
      error: false,
      message: "",
    },
    phone: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    repeatPassword: {
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

    const newLoginForm = registerForm;
    newLoginForm[id] = value;
    setRegisterForm(newLoginForm);
    setForceUpdate(!forceUpdate);
  };

  const handleRegister = () => {
    toast.remove();
    const validation = validateRegisterForm.validate(registerForm, {
      abortEarly: false,
    });
    if (validation.error) {
      const newErrorForm = errorForm;
      validation.error.details.forEach((ele) => {
        newErrorForm[ele.context.label].error = true;
        switch (ele.context.label) {
          case "name":
          case "phone":
            newErrorForm[ele.context.label].message = t("required");
            break;
          case "email":
            newErrorForm[ele.context.label].message = t("invalidEmail");
            break;
          case "password":
            newErrorForm[ele.context.label].message = t("invalidPassword");
            break;
          case "repeatPassword":
            newErrorForm[ele.context.label].message = t("equalPassword");
            break;
        }
        setErrorForm(newErrorForm);
        setForceUpdate(!forceUpdate);
      });
    } else {
      register.reset();
      register.mutate(
        {
          name: registerForm.name,
          phone: registerForm.phone,
          email: registerForm.email,
          password: registerForm.password,
          confirmPassword: registerForm.repeatPassword,
        },
        {
          onSuccess: () => {
            setShowModal(true);
          },
          onError: (err) => {
            toast.error(err.response.data.error);
          },
        }
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRegisterForm({
      name: "",
      phone: null,
      email: "",
      password: "",
      repeatPassword: "",
    });
    navigate("/");
  };

  const handleNavigate = () => {
    navigate("/projects");
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <PageWrapper>
      <ModalSuccess
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleAction={handleNavigate}
      />

      <Div
        style={{
          position: "absolute",
          top: "36px",
          left: "95%",
          transform: "translateX(-50%)",
        }}
      >
        <SelectLanguage
          isWhite={true}
          color={theme.colors.white}
          backgroundColor={"#FFFFFF3C"}
        />
      </Div>
      <Div
        style={{
          position: "absolute",
          top: "36px",
          left: "15%",
          transform: "translateX(-50%)",
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}>
          <img alt="logo" src={logo} width="100px" height="100px" />
          <br />
          <Text
            color={theme.colors.white}
            weight={theme.fonts.weight.medium}
            size={theme.fonts.size.h6}
          >
            FitCo Test
          </Text>
        </div>
      </Div>
      <Col height="100vh" justify="center" align="center">
        <Card width="478px" height="auto">
          <Row m="0 0 12px 0" justify="center">
            <Text
              color={theme.colors.blue}
              size={theme.fonts.size.h5}
              weight={theme.fonts.weight.medium}
              mt="20px"
            >
              {t("register")}
            </Text>
          </Row>
          <Row width="100%" m="21px 0 17px 0">
            <Input
              label={t("name")}
              id="name"
              onChange={handleChange}
              error={errorForm.name.error}
              helper={errorForm.name.error ? errorForm.name.message : ""}
              width="100%"
            />
          </Row>
          <Row width="100%" m="0 0 17px 0">
            <Input
              label={t("phone")}
              id="phone"
              type="number"
              onChange={handleChange}
              error={errorForm.phone.error}
              helper={errorForm.phone.error ? errorForm.phone.message : ""}
              width="100%"
            />
          </Row>
          <Row width="100%" m="0 0 17px 0">
            <Input
              label={t("email")}
              id="email"
              maxLength={emailLength}
              onChange={handleChange}
              error={errorForm.email.error}
              helper={errorForm.email.error ? errorForm.email.message : ""}
              width="100%"
            />
          </Row>
          <Row width="100%" m="0px 0 17px 0">
            <Password
              id="password"
              label={t("password")}
              width="100%"
              onChange={handleChange}
              error={errorForm.password.error}
              helper={
                errorForm.password.error ? errorForm.password.message : ""
              }
            />
          </Row>
          <Row width="100%" m="0px 0 17px 0">
            <Password
              id="repeatPassword"
              label={t("repeatPassword")}
              width="100%"
              onChange={handleChange}
              error={errorForm.repeatPassword.error}
              helper={
                errorForm.repeatPassword.error
                  ? errorForm.repeatPassword.message
                  : ""
              }
              onPressEnter={handleRegister}
            />
          </Row>
          <Row width="100%" m="0 0 10px 0" justify="center">
            <Button onClick={handleRegister} loading={isLoading}>
              {t("signUp")}
            </Button>
          </Row>
          <Row gap="5px" justify="center" align="center" p="0 0 10px 0">
            <Text size={theme.fonts.size.sm} color={theme.colors.gray300}>
              {t("account")}
            </Text>
            <Link onClick={handleLogin} size={theme.fonts.size.sm}>
              {t("login")}
            </Link>
          </Row>
        </Card>
      </Col>
      <Div style={{ position: "absolute", bottom: "5px" }}>
        <Text size={theme.fonts.size.sm} color={theme.colors.white}>
          {t("common:poweredBy")}
        </Text>
      </Div>
    </PageWrapper>
  );
};
