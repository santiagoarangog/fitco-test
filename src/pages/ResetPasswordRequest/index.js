import React, { useState } from "react";
import toast from "react-hot-toast";
import { Col, Row, Text, Div } from "../../styles/Common";
import { Card } from "../../components/Card";
import { theme } from "../../styles/theme";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import useSendEmailResetPassword from "./hooks/useSendEmailResetPassword";
import { validateEmailRequired } from "../../utilities/validations";
import { PageWrapper } from "./styles";
import logo from "../../assets/images/fitco-logo.png";
import { SelectLanguage } from "../../components/SelectLanguage";
import { useTranslation } from "react-i18next";

export const ResetPasswordRequest = () => {
  const lng = localStorage.getItem("lng") || "es";
  const { t } = useTranslation(["common", "resetPassReq"]);

  const resetPassword = useSendEmailResetPassword();
  const { isLoading } = resetPassword;
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorValidation, setErrorValidation] = useState("");

  const [forceUpdate, setForceUpdate] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setError(false);
    setForceUpdate(!forceUpdate);
  };

  const handleSend = () => {
    toast.remove();
    const validation = validateEmailRequired.email.validate(email, {
      abortEarly: false,
    });

    if (validation.error) {
      setError(true);
      setErrorValidation(t("common:invalidEmail"));
      setForceUpdate(!forceUpdate);
    } else {
      resetPassword.reset();
      resetPassword.mutate(
        { email: email },
        {
          onSuccess: (res) => {
            toast.success(t(`resetPassReq:${res.data.result.code}`));
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
          <Card width="478px">
            <Row width="100%" m="62.82px 0 40px 0" justify="center">
              <img alt="logo" src={logo} width="70px" height="70px" />
            </Row>
            <Row width="100%" m="16px 0 40px 0" justify="center">
              <Text
                weight={theme.fonts.weight.medium}
                size={theme.fonts.size.h4}
                color={theme.colors.blue}
              >
                {t("resetPassReq:resetTitle")}
              </Text>
            </Row>
            <Row m="0 0 32px 0" width="359px" height="48px">
              <Text
                size={theme.fonts.size.default}
                color={theme.colors.gray500}
              >
                {t("resetPassReq:text")}
              </Text>
            </Row>
            <Row width="100%" m="0 0 40px 0">
              <Input
                label={t("common:email")}
                id="email"
                width="100%"
                onChange={handleChange}
                error={error}
                helper={error ? errorValidation : ""}
              />
            </Row>

            <Row justify="center" m="0 0 65px 0">
              <Button
                onClick={handleSend}
                width="243px"
                loading={isLoading}
              >
                {t("resetPassReq:reset")}
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
