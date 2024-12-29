import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { theme } from "../../../../styles/theme";
import { Modal } from "../../../../components/Modal";
import { Col, Row, Text } from "../../../../styles/Common";
import FinancingIcon from "../../../../assets/icons/Financing.svg";
import SaleIcon from "../../../../assets/icons/sale.svg";
import { CustomCard } from "../../../../components/Card/styles";
import { Radio } from "../../../../components/Radio";
import { useNavigate } from "react-router-dom";

const ProjectTypeOptions = [
  { key: "financing", icon: FinancingIcon, label: "modalUpload.financing" },
  { key: "sale", icon: SaleIcon, label: "modalUpload.sale" },
];

const ProjectDetailOptions = [
  {
    key: "solar",
    label: "modalUpload.solar",
    financingTypes: ["constructionFinancing", "operationalRefinancing"],
    saleTypes: ["preRtBCOD", "InOperation"],
  },
  {
    key: "eolic",
    label: "modalUpload.eolic",
    financingTypes: ["constructionFinancing", "operationalRefinancing"],
    saleTypes: ["preRtBCOD", "InOperation"],
  },
  { key: "selfConsumption", label: "modalUpload.selfConsum", noAction: true },
];

export const ModalUploadNewProject = ({ showModal, handleCloseModal }) => {
  const { t } = useTranslation("projects");
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [selectedDetail, setSelectedDetail] = useState("");

  const handleSelectType = (type) => setSelectedType(type);
  const handleSelectDetail = (detail) => {
    if (
      !ProjectDetailOptions.find((option) => option.key === detail).noAction
    ) {
      setSelectedDetail(detail);
    }
  };

  const getProjectTypeLabel = () =>
    t(selectedType ? `modalUpload.${selectedType}` : "");

  const handleCreate = (detailType) => {
    const getFinancingType = (financingType) => {
      switch (financingType) {
        case "constructionFinancing":
          return "construction";
        case "operationalRefinancing":
          return "financed";
        case "preRtBCOD":
          return "RtBCOD";
        case "InOperation":
          return "operation";
      }
    };
    const financingType = getFinancingType(detailType);
    navigate(
      `/projects/new-project?objective=${selectedType}&projectType=${selectedDetail}&financingType=${financingType}`
    );
  };

  const getCardHeight = () => {
    return selectedType === "financing" ? "67px" : "37px";
  };

  return (
    <Modal open={showModal} onCancel={handleCloseModal} radius={"20px"}>
      <Modal.Body
        margin="28px 0 0px 0"
        align={"center"}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Col width="100%" height="100%">
          <Row width="100%" m="0 0 15px 0">
            <Text
              size={theme.fonts.size.h5i}
              color={theme.colors.blue}
              weight={theme.fonts.weight.medium}
            >
              {t("modalUpload.title")}
            </Text>
          </Row>
          <Row width="100%" m="0 0 32px 0">
            {ProjectTypeOptions.map(({ key, icon, label }) => (
              <CustomCard
                key={key}
                width="50%"
                style={{
                  border: theme.colors.gray100 + " solid",
                  backgroundColor:
                    selectedType === key ? theme.colors.light : "transparent",
                  cursor: "pointer",
                }}
                align="center"
                padding="15px"
                margin="0 10px 0px 0px"
                onClick={() => handleSelectType(key)}
              >
                <img
                  src={icon}
                  alt="Icon"
                  style={{
                    opacity: 1,
                    backgroundColor: theme.colors.light,
                    borderRadius: "50%",
                  }}
                />
                <Text
                  size={theme.fonts.size.default}
                  color={theme.colors.gray300}
                  mt={"1rem"}
                >
                  {t(label)}
                </Text>
              </CustomCard>
            ))}
          </Row>
          {selectedType && (
            <>
              <Row width="100%" m="0 0 15px 0">
                <Text
                  size={theme.fonts.size.h5i}
                  color={theme.colors.blue}
                  weight={theme.fonts.weight.medium}
                >
                  {t("modalUpload.indicate")}
                </Text>
              </Row>
              <Row width="100%" m="0 0 32px 0">
                <Radio.Group name="projectDetail" gap="48px">
                  {ProjectDetailOptions.filter(
                    (option) =>
                      selectedType === "financing" ||
                      option.key !== "selfConsumption"
                  ).map(({ key, label, noAction }) => (
                    <Col key={key} width="100%" height="100%">
                      <Radio
                        label={t(label)}
                        value={key}
                        onClick={() => handleSelectDetail(key)}
                        disabled={noAction}
                      ></Radio>
                      {key === "selfConsumption" && (
                        <Text
                          size={theme.fonts.size.xs}
                          color={theme.colors.green}
                          align="center"
                        >
                          {t("modalUpload.comingSoon")}
                        </Text>
                      )}
                    </Col>
                  ))}
                </Radio.Group>
              </Row>
            </>
          )}
          {selectedType &&
            selectedDetail &&
            !ProjectDetailOptions.find(
              (option) => option.key === selectedDetail
            ).noAction && (
              <>
                <Row width="100%" m="0 0 15px 0">
                  <Text
                    size={theme.fonts.size.h5i}
                    color={theme.colors.blue}
                    weight={theme.fonts.weight.medium}
                  >
                    {t("modalUpload.projectType", {
                      value: getProjectTypeLabel().toLocaleLowerCase(),
                    })}
                  </Text>
                </Row>
                <Row width="100%" gap="17px">
                  {ProjectDetailOptions.find(
                    ({ key }) => key === selectedDetail
                  )[`${selectedType}Types`]?.map((type) => (
                    <CustomCard
                      key={type}
                      width="193px"
                      height={getCardHeight()}
                      style={{
                        border: theme.colors.green + " 1px solid",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      align="center"
                      padding="5px"
                      onClick={() => handleCreate(type)}
                    >
                      <Text
                        size={theme.fonts.size.default}
                        color={theme.colors.green}
                      >
                        {t(`modalUpload.type.${type}`)}
                      </Text>
                    </CustomCard>
                  ))}
                </Row>
              </>
            )}
        </Col>
      </Modal.Body>
    </Modal>
  );
};

ModalUploadNewProject.propTypes = {
  showModal: PropTypes.bool, 
  handleCloseModal: PropTypes.func, 
};