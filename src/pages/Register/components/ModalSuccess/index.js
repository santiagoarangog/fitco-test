import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Col, Row, Text } from "../../../../styles/Common";
import { Modal } from "../../../../components/Modal";
import { theme } from "../../../../styles/theme";
import { LikeIcon } from "../../../../assets/icons";

const ModalSuccess = ({ showModal, handleCloseModal }) => {
  const { t } = useTranslation("register");

  return (
    <Modal open={showModal} onCancel={handleCloseModal}>
      <Modal.Header
        icon={
          <LikeIcon
            stroke={theme.colors.green}
            width={"50px"}
            height={"50px"}
          />
        }
        iconBackground={theme.colors.green100}
        iconWidth={"50px"}
        iconHeight={"50px"}
        align="-webkit-center"
        padding={"20px 63px 0px 63px"}
        title={t("successSignUp")}
        weightTitle={theme.fonts.weight.semibold}
      />
      <Modal.Body
        margin="28px 0 32px 0"
        align={"center"}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Col width="100%" height="100%" align="center" justify="center">
          <Row width="100%" m="0 0 32px 0">
            <Text size={theme.fonts.size.default} color={theme.colors.gray500}>
              {t("modalText")}
            </Text>
          </Row>
        </Col>
      </Modal.Body>
    </Modal>
  );
};

ModalSuccess.propTypes = {
  showModal: PropTypes.bool, 
  handleCloseModal: PropTypes.func, 
  handleAction: PropTypes.func,
};
export default ModalSuccess;
