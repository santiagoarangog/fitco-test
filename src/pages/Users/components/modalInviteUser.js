import React, { useState } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { theme } from "../../../styles/theme";
import { Modal } from "../../../components/Modal";
import { useTranslation } from "react-i18next";
import { Div, Text } from "../../../styles/Common";
import { Button } from "../../../components/Button";
import { Col, Row } from "antd";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select2";
import useCreateUser from "../hooks/useCreateUser";
import { validateInviteUserForm } from "../../../utilities/validations";
import { Link } from "../../../components/Link";

export const ModalInviteUser = ({
  showModal,
  handleClose,
  userForm,
  handleChange,
  handleSelect,
  errorForm,
  setErrorForm
}) => {
  const { t } = useTranslation("users");
  const invite = useCreateUser();
  const [forceUpdate, setForceUpdate] = useState(false);

  const roleOptions = [
    { label: "Manager", value: "Manager" },
  ];

  const handleInvite = () => {
    const payload = {
      ...userForm,
      role: userForm.role !== null ? [userForm.role] : null,
    }
    const validation = validateInviteUserForm.validate(payload, {
      abortEarly: false,
    });
    if (validation.error) {
      const newErrorForm = errorForm;
      validation.error.details.forEach((ele) => {
        newErrorForm[ele.context.label].error = true;
        newErrorForm[ele.context.label].message = t("invalidFormat");        
        setErrorForm(newErrorForm);
        setForceUpdate(!forceUpdate);
      });
    } else {
      invite.reset();
      invite.mutate(payload, 
        {
          onSuccess: () => {
            handleClose();
          },
          onError: (err) => {
            toast.error(err.response.data.result.code.message);
          },        
        }
      )
    }
  };

  return (
    <Modal open={showModal} onCancel={handleClose} width={"478px"}>
      <Modal.Header
        padding={"20px 0px 0px 41px"}
        title={t("inviteUsers")}
        weightTitle={theme.fonts.weight.medium}
        sizeTitle={theme.fonts.size.h5i}
      />
      <Modal.Body
        margin="0px 0 32px 0"
        align={"center"}
        padding="20px 0px 0px 41px"
      >
        <Row gutter={[24,24]} style={{ width: "100%" }}>
          <Col md={24}>
            <Text color={theme.colors.gray500}>
              {t("inviteUserMessage")}
            </Text>
          </Col>
          <Col md={24}>
            <Input 
              id="name"
              label={t("fullName")}
              value={userForm.name}
              onChange={handleChange}
              error={errorForm.name.error}
              helper={errorForm.name.error ? errorForm.name.message : ""}
            />
          </Col>
          <Col md={24}>
            <Input 
              id="email"
              label={t("email")}
              value={userForm.email}
              onChange={handleChange}
              error={errorForm.email.error}
              helper={errorForm.email.error ? errorForm.email.message : ""}
            />
          </Col>
          <Col md={24}>
            <Select 
              label={t("role")}
              placeholder={t("selectRole")}
              options={roleOptions}
              value={userForm.role}
              onChange={(e) => handleSelect(e, "role")}
              width={"100%"}
              error={errorForm.role.error}
              helper={errorForm.role.error ? errorForm.role.message : ""}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer align="center" justify="center">
        <Div direction="column" align="center" justify="center" gap="24px">
          <Button 
            width={"167px"} 
            onClick={handleInvite}
            loading={invite.isLoading}
          >
            {t("sendInvitation")}
          </Button>
          <Link onClick={handleClose}>
            {t("cancel")}
          </Link>
        </Div>
      </Modal.Footer>
  </Modal>
  )
};

ModalInviteUser.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  userForm: PropTypes.object,
  handleChange: PropTypes.func,
  handleSelect: PropTypes.func,
  errorForm: PropTypes.object,
  setErrorForm: PropTypes.func
};
