import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { theme } from "../../../../styles/theme";
import { Modal } from "../../../../components/Modal";
import { Input } from "../../../../components/Input";
import { Col, Row, Text } from "../../../../styles/Common";
import { nameLength } from "../../../../utilities/helpers";
import { Button } from "../../../../components/Button";
import useSendCorporativeEmail from "../../hooks/useSendCorporativeEmail";
import { Link } from "../../../../components/Link";


const ModalLoadProjects = ({ showModal, handleCloseModal, handleShowModalValidationLoadProjects }) => {
    const { t } = useTranslation("projects");
    const sendCorporativeEmail = useSendCorporativeEmail();
    const [data, setData] = useState({
        company: "",
    });

    const [errorForm, setErrorForm] = useState({
        company: { error: false, message: "" },
    });

    const handleChange = (event) => {
        const { value, id } = event.target;
        setErrorForm(prevState => ({
            ...prevState,
            [id]: { error: false, message: "" }
        }));
        setData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSendCorporateEmail = () => {
        let hasError = false;
        const newErrorForm = { ...errorForm };
        Object.keys(data).forEach(key => {
            if (!data[key]) {
                newErrorForm[key] = { error: true, message: t("common:requiredField") };
                hasError = true;
            }
        });
       
        setErrorForm(newErrorForm);
        if (!hasError) {
            const formData = {
                companyName: data.company,
            }
            sendCorporativeEmail.mutate(
                formData,
                {
                    onSuccess: () => {
                        handleShowModalValidationLoadProjects();
                    },
                    onError: (err) => {
                        toast.error(t(`common:${err?.response?.data?.result?.code}`)) ||
                            "No ha sido posible enviar la información, por favor intenta nuevamente";
                    },
                }
            );
        }
    }

    return (
        <Modal open={showModal} onCancel={handleCloseModal}>
            <Modal.Header
                iconBackground={theme.colors.green100}
                iconWidth={"50px"}
                iconHeight={"50px"}
                align="-webkit-center"
                padding={"20px 63px 0px 63px"}
                title={t("modalLoad.title")}
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
                            {t("modalLoad.description")}
                        </Text>
                    </Row>
                    <Row width="100%" m="0 0 32px 0">
                        <Input
                            label={t("common:company")}
                            id="company"
                            onChange={handleChange}
                            error={errorForm.company.error}
                            helper={errorForm.company.message}
                            maxLength={nameLength}
                            width="100%"
                        />
                    </Row>
                    <Col width="100%" justify="center" align="center" style={{ gap: "24px" }} >
                        <Button width={"250px"} onClick={handleSendCorporateEmail}
                        >{t("modalLoad.loadProjectText")}</Button>
                        <Link onClick={handleCloseModal}
                        >{t("modalLoad.cancel")} </Link>
                    </Col>
                </Col>
            </Modal.Body>
        </Modal>
    );
};

ModalLoadProjects.propTypes = {
    showModal: PropTypes.bool, 
    handleCloseModal: PropTypes.func, 
    handleShowModalValidationLoadProjects: PropTypes.func,
  };
export default ModalLoadProjects;
