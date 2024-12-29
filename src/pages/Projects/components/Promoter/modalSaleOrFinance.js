import React from "react";
import PropTypes from "prop-types";
import { Modal } from "../../../../components/Modal";
import saleIcon from "../../../../assets/icons/sale.svg";
import { theme } from "../../../../styles/theme";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/Button";
import { Link } from "../../../../components/Link";
import { Div, Text } from "../../../../styles/Common";

export const ModalSaleOrFinance = ({
  showModal,
  handleClose,
  objective,
  handleComplete
}) => {
  const { t } = useTranslation("projectTable");

  return (
    <Modal open={showModal} onCancel={handleClose} width={"478px"}>
      <Modal.Header
        icon={
          <img
            alt="sale"
            src={saleIcon}
            width={"50px"}
            height={"50px"}
          />
        }
        iconBackground={theme.colors.green100}
        iconWidth={"50px"}
        iconHeight={"50px"}
        align="-webkit-center"
        padding={"20px 63px 0px 63px"}
        title={objective === "financing" ? t("wantFinance") : t("wantSell")}
        weightTitle={theme.fonts.weight.medium}
      />
      <Modal.Body
        margin="28px 0 36px 0"
      >
        <Text size={theme.fonts.size.default} color={theme.colors.gray500} style={{ textAlign: "center" }}>
          {t("objectiveMessage")}
        </Text>
      </Modal.Body>
      <Modal.Footer width="100%" justify="center">
        <Div direction="column" align="center" gap="16px">
          <Button width={"243px"} onClick={handleComplete}>
            {t("complete")}
          </Button>
          <Link onClick={handleClose}>
            {t("cancel")}
          </Link>
        </Div>
      </Modal.Footer>
    </Modal>
  )
};

ModalSaleOrFinance.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  objective: PropTypes.string,
  handleComplete: PropTypes.func,
};