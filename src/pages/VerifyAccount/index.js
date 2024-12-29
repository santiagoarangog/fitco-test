import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Div, Text } from "../../styles/Common";
import { Card } from "../../components/Card";
import { theme } from "../../styles/theme";
import logo from "../../assets/images/alter-logo-blue.svg";
import { useTranslation } from "react-i18next";
import { SelectLanguage } from "../../components/SelectLanguage";
import { PageWrapper } from "../LoginLink/styles";
import { setLocalUser } from "../../core/services/axiosInstance";
import toast from "react-hot-toast";
import useVerifyAccount from "./hooks/useVerifyAccount";

export const VerifyAccount = () => {
  const { t } = useTranslation(["login", "common"]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const lang = new URLSearchParams(search).get("lang");
  const tokenEmail = new URLSearchParams(search).get("tokenEmail");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let email = urlParams.get('email');
  email = email.replace(/\s/g, '+');
  const verify = useVerifyAccount();

  useEffect(() => {
    localStorage.setItem("lng", lang);
    verify.reset();
    verify.mutate(
      { email: email, token: tokenEmail },
      {
        onSuccess: (res) => {
          setLocalUser(res.data.result.data);
          navigate("/projects");
        },
        onError: (err) => {
          toast.error(t(`common:${err?.response?.data?.result?.code}`)) ||
            "No ha sido posible iniciar sesión, por favor intenta nuevamente";
          navigate("/");
        },
      }
    );
  }, []);

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
        height="368px"
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
          {t("verifyAccount")}
        </Text>
        <Text
          color={theme.colors.gray500}
          mt={"31px"}
          mb={"32px"}
          style={{ width: "359px" }}
        >
          {t("loadingLogin")}
        </Text>
      </Card>
      <Div style={{ position: "absolute", bottom: "33px" }}>
        <Text size={theme.fonts.size.sm} color={theme.colors.white}>
          {t("poweredBy")}
        </Text>
      </Div>
    </PageWrapper>
  );
};
