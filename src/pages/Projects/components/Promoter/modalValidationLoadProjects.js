import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../../components/Modal";
import { theme } from "../../../../styles/theme";
import { Col, Row, Text } from "../../../../styles/Common";
import { Time } from "../../../../assets/icons";
import { Button } from "../../../../components/Button";
import { Link } from "../../../../components/Link";

export const ModalValidationLoadProjects = ({ showModal, handleCloseModal, handleShowModalUploadProject }) => {
    const { t } = useTranslation("projects");

    return (
        <Modal open={showModal} onCancel={handleCloseModal}>
            <Modal.Header
                iconBackground={theme.colors.green100}
                iconWidth={"50px"}
                iconHeight={"50px"}
                icon={<Time width="50px" height="50px" />}
                align="-webkit-center"
                padding={"20px 63px 0px 63px"}
                title={t("modalValidationLoadProjects.title")}
                weightTitle={theme.fonts.weight.semibold}
            />
            <Modal.Body
                margin="28px 0 32px 0"
                align={"center"}
                style={{ display: "flex", justifyContent: "center" }}
            >
                <Col width="100%" height="100%" >
                    <Row width="100%" m="0 0 32px 0" justify="center" align="center">
                        <Text size={theme.fonts.size.h6} color={theme.colors.gray500}>
                            {t("modalValidationLoadProjects.description")}
                        </Text>
                    </Row>
                    <Col width="100%" justify="center" align="center" style={{ gap: "24px" }} >
                        <Button
                            width={"273px"}
                            onClick={handleShowModalUploadProject}
                        >
                            {t('modalValidationLoadProjects.btnCreateProject')}
                        </Button>
                        <Link onClick={handleCloseModal}
                        >{t("modalValidationLoadProjects.backHome")}</Link>
                    </Col>
                </Col>

            </Modal.Body>
        </Modal>
    );
}

ModalValidationLoadProjects.propTypes = {
    showModal: PropTypes.bool, 
    handleCloseModal: PropTypes.func, 
    handleShowModalUploadProject: PropTypes.func,
  };