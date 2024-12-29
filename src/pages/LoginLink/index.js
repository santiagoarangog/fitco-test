import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Div, Text } from "../../styles/Common";
import { Card } from "../../components/Card";
import { theme } from "../../styles/theme";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { validateEmailRequired } from "../../utilities/validations";
import { PageWrapper } from "./styles";
import logo from "../../assets/images/alter-logo-blue.svg";
import { useTranslation } from "react-i18next";
import { SelectLanguage } from "../../components/SelectLanguage";
import useSendEmail from "./hooks/useSendEmail";

export const LoginLink = () => {
  const { t } = useTranslation(["login", "common"]);
  const navigate = useNavigate();
  const sendEmail = useSendEmail();
  const { isLoading } = sendEmail;
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
      setErrorValidation(t("invalidEmail"));
      setForceUpdate(!forceUpdate);
    } else {
      sendEmail.reset();
      sendEmail.mutate(
        { email: email, lang: localStorage.getItem("lng") },
        {
          onSuccess: () => {
            navigate("/");
            toast.success(t("sendSuccess"));
          },
          onError: (err) => {
            toast.error(t(`common:${err?.response?.data?.result?.code}`)) ||
              "Ha ocurrido un error al envíar el email, por favor intenta nuevamente.";
          },
        }
      );
    }
  };

  return (
    <PageWrapper>
      <Div style={{ position: "absolute", top: "36px", right: "48px" }}>
        <SelectLanguage
          isWhite={true}
          color={theme.colors.white}
          backgroundColor={"#FFFFFF3C"}
        />
      </Div>
      <Card
        width="478px"
        height="568px"
        padding={"62.82px 0 65px 0"}
        justify={"center"}
        align={"center"}
      >
        <img alt="logo" src={logo} />
        <Text
          color={theme.colors.blue}
          weight={theme.fonts.weight.medium}
          size={theme.fonts.size.h4}
          mt={"40px"}
          style={{ width: "242px" }}
        >
          {t("loginLinkTitle")}
        </Text>
        <Text
          color={theme.colors.gray500}
          mt={"31px"}
          mb={"32px"}
          style={{ width: "359px" }}
        >
          {t("loginLinkMessage")}
        </Text>
        <Input
          label={t("email")}
          id="email"
          width="359px"
          onChange={handleChange}
          error={error}
          helper={error ? errorValidation : ""}
        />
        <Button
          onClick={handleSend}
          width="159px"
          loading={isLoading}
          style={{ marginTop: "40px" }}
        >
          {t("sendLink")}
        </Button>
      </Card>
      <Div style={{ position: "absolute", bottom: "33px" }}>
        <Text size={theme.fonts.size.sm} color={theme.colors.white}>
          {t("poweredBy")}
        </Text>
      </Div>
    </PageWrapper>
  );
};
