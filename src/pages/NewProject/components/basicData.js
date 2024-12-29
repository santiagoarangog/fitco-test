import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Row, Col, Text, Div } from "../../../styles/Common";
import { theme } from "../../../styles/theme";
import { Input } from "../../../components/Input";
import { Radio } from "../../../components/Radio";
import { Select } from "../../../components/Select2";
import { useTranslation } from "react-i18next";
import { getUserInfo, socialStatusOptions } from "../../../utilities/helpers";

const BasicData = ({
  basicInfo,
  setBasicInfo,
  handleChange,
  handleRadio,
  handleSelect,
  handleChangeNumber
}) => {
  const { t } = useTranslation(["newProject"]);
  const { search } = useLocation();
  const objective = new URLSearchParams(search).get("objective");
  const projectType = new URLSearchParams(search).get("projectType");
  const financingType = new URLSearchParams(search).get("financingType");
  const role = getUserInfo().role[0];

  return (
    <>
      <Text
        weight={theme.fonts.weight.medium}
        size={theme.fonts.size.h6}
        color={theme.colors.blue}
        mb="32px"
      >
        {t("basicData")}
      </Text>
      <Row gap="22.5px">
        <Col width="50%">
          {role === "Manager" && (
            <Row m=" 0px 0px 32px 0px">
              <Input
                sizeLabel={theme.fonts.size.default}
                weightLabel={theme.fonts.weight.regular}
                label={t("teaserName")}
                id="teaserName"
                onChange={(e) => handleChange(e, basicInfo, setBasicInfo)}
                width="100%"
                value={basicInfo.teaserName}
              />
            </Row>
          )}
          <Row m=" 0px 0px 32px 0px">
            <Input
              sizeLabel={theme.fonts.size.default}
              weightLabel={theme.fonts.weight.regular}
              label={t("projectName")}
              id="projectName"
              onChange={(e) => handleChange(e, basicInfo, setBasicInfo)}
              width="100%"
              value={basicInfo.projectName}
            />
          </Row>
          {objective !== "sale" && (
            <>
              <Row m=" 0px 0px 16px 0px">
                <Text
                  weight={theme.fonts.weight.regular}
                  size={theme.fonts.size.default}
                  color={theme.colors.gray200}
                  align="left"
                >
                  {t("offers")}
                </Text>
              </Row>
              <Row m=" 0px 0px 35px 0px">
                <Radio.Group
                  name="purchase"
                  gap="48px"
                  onChange={(e) => handleRadio(e, basicInfo, setBasicInfo)}
                  value={basicInfo.purchase}
                >
                  <Radio label="Si" value={true}></Radio>
                  <Radio label="No" value={false}></Radio>
                </Radio.Group>
              </Row>
            </>
          )}
        </Col>
        <Div height="334px" width="1px" background={theme.colors.gray100} />
        <Col width="50%">
          <Row m=" 0px 0px 32px 0px">
            <Select
              sizeLabel={theme.fonts.size.default}
              weightLabel={theme.fonts.weight.regular}
              borderColor={theme.colors.gray100}
              height="45px"
              color={theme.colors.gray300}
              label={t("status")}
              id="societyStatus"
              onChange={(value, item) =>
                handleSelect(
                  value,
                  item,
                  "societyStatus",
                  basicInfo,
                  setBasicInfo
                )
              }
              width="358px"
              options={socialStatusOptions}
              value={basicInfo.societyStatus}
            />
          </Row>
          {!(
            objective === "financing" &&
            projectType === "eolic" &&
            financingType === "RtBCOD"
          ) && (
            <Row>
              <Input
                sizeLabel={theme.fonts.size.default}
                weightLabel={theme.fonts.weight.regular}
                label={t("numberMG")}
                id="numberMG"
                onChange={(e) => handleChangeNumber(e, basicInfo, setBasicInfo)}
                width="100%"
                value={basicInfo.numberMG}
              />
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

BasicData.propTypes = {
  basicInfo: PropTypes.object,
  setBasicInfo: PropTypes.func,
  handleChange: PropTypes.func,
  handleRadio: PropTypes.func,
  handleSelect: PropTypes.func,
  handleChangeNumber: PropTypes.func,
};

export default BasicData;
