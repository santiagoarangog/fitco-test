import React, { useState } from "react";
import { ModuleContainer } from "../../styles/Common";
import { Card } from "../../components/Card";
import { Row } from "../../styles/Common";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/Button";
import { Password } from "../../components/Password";
import toast from "react-hot-toast";
import useResetPassword from "../../pages/ResetPassword/hooks/useResetPassword";
import { validateResetPassword } from "../../utilities/validations";
import { getUserInfo, getToken } from "../../utilities/helpers";
import { useNavigate } from "react-router-dom";
export const ChangePassword = () => {
  const { t } = useTranslation(["common", "resetPassword"]);
  const navigate = useNavigate();
  const changePassword = useResetPassword();
  const { isLoading } = changePassword;

  const [forceUpdate, setForceUpdate] = useState(false);

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
            email: getUserInfo().email,
            password: passwordForm.password,
            confirmPassword: passwordForm.repeatPassword,
          },
          token: getToken(),
        },
        {
          onSuccess: () => {
            toast.success(t("common:saveChanges"));
            navigate("/my-account");
          },
          onError: (err) => {
            toast.error(t(`common:${err.response.data.result.code}`));
          },
        }
      );
    }
  };

  return (
    <ModuleContainer>
      <Card width="478px" height="350px" padding="60px 40px">
        <Row width="100%" m="0px 0 23px 0">
          <Password
            id="password"
            label={t("resetPassword:newPassword")}
            width="100%"
            onChange={handleChange}
            error={errorForm.password.error}
            helper={errorForm.password.error ? errorForm.password.message : ""}
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
        <Row justify="center">
          <Button
            onClick={handleChangePassword}
            width="243px"
            loading={isLoading}
          >
            {t("resetPassword:change")}
          </Button>
        </Row>
      </Card>
    </ModuleContainer>
  );
};
