import React from "react";
import PropTypes from "prop-types";
import { Card, WrapperTag } from "./styles";
import { useTranslation } from "react-i18next";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import search from "../../../assets/icons/Search.svg";
import { AutoComplete, Col, Row } from "antd";
import { theme } from "../../../styles/theme";
import { Div, Text } from "../../../styles/Common";
import close from "../../../assets/icons/close-tag.svg";
import mw from "../../../assets/icons/mw.svg";

export const CompanyData = ({
  countriesOptions,
  userData,
  handleSelect,
  country,
  handleChangeCountry,
  handleChangeCompany,
  handleDelete,
  handleUpdate,
  loading,
}) => {
  const { t } = useTranslation("myAccount");

  return (
    <Card width="80%" height="auto" p="27px 44px 42px 41px">
      <Text
        color={theme.colors.blue}
        weight={theme.fonts.weight.medium}
        size={theme.fonts.size.h5}
        mb="36px"
      >
        {t("companyData")}
      </Text>
      <Input
        label={t("companyName")}
        sizeLabel={theme.fonts.size.default}
        value={userData.company.name}
        width={"100%"}
        disabled
        style={{ marginBottom: "32px" }}
      />
      <AutoComplete
        options={countriesOptions}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={handleChangeCountry}
        onSelect={handleSelect}
        value={country}
      >
        <Input
          label={t("companyCountries")}
          sizeLabel={theme.fonts.size.default}
          options={countriesOptions}
          suffix={<img alt="search" src={search} />}
          width={"100%"}
        />
      </AutoComplete>

      <Div m="60px 0 0 0" gap="16px">
        {userData?.company?.countries?.map((ele, indx) => (
          <WrapperTag key={indx}>
            <Text color={theme.colors.gray300} size={theme.fonts.size.sm}>
              {ele}
            </Text>
            <img
              alt="close"
              src={close}
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(indx)}
            />
          </WrapperTag>
        ))}
      </Div>
      <Row style={{ justifyContent: "space-between", margin: "32px 0 36px 0" }}>
        <Col>
          <Input
            label={t("years")}
            sizeLabel={theme.fonts.size.default}
            id={"experiencesYears"}
            value={userData.company.experiencesYears}
            onChange={handleChangeCompany}
            width={"174px"}
          />
        </Col>
        <Col>
          <Input
            label={t("projects")}
            sizeLabel={theme.fonts.size.default}
            id={"completedProjects"}
            value={userData.company.completedProjects}
            onChange={handleChangeCompany}
            width={"208px"}
          />
        </Col>
        <Col>
          <Input
            suffix={<img alt="mw" src={mw} />}
            label={t("totalMW")}
            sizeLabel={theme.fonts.size.default}
            id={"totalMW"}
            value={userData.company.totalMW}
            onChange={handleChangeCompany}
            width={"213px"}
          />
        </Col>
      </Row>
      <Button onClick={handleUpdate} loading={loading}>
        {t("saveChanges")}
      </Button>
    </Card>
  );
};

CompanyData.propTypes = {
  countriesOptions: PropTypes.array,
  userData: PropTypes.object,
  handleSelect: PropTypes.func,
  country: PropTypes.string,
  handleChangeCountry: PropTypes.func,
  handleChangeCompany: PropTypes.func,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
  loading: PropTypes.bool,
};
