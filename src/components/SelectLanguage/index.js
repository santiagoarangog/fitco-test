import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import arrowDown from "../../assets/icons/arrow-down.svg";
import arrowDownWhite from "../../assets/icons/arrow-down-white.svg";
import { theme } from "../../styles/theme";
import { setLanguage } from "../../core/store/common";

import { CustomSelect } from "./styles";

export const SelectLanguage = ({ backgroundColor, isWhite, color }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { language } = useSelector((state) => state.common);

  const optionProps = {
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.default,
    color: theme.colors.gray300,
    fontWeight: theme.fonts.weight.regular,
  };

  useEffect(() => {
    localStorage.setItem("lng", language)
  }, [language]);

  const handleLanguage = (lng) => {
    const { value } = lng;
    i18n.changeLanguage(value);
    localStorage.setItem("lng", value)
    dispatch(setLanguage(value))
  };

  return (
    <CustomSelect
      backgroundColor={backgroundColor}
      color={color}
      value={localStorage.getItem("lng")}
      onChange={handleLanguage}
      optionLabelProp="customLabel"
      labelInValue
      suffixIcon={
        <img alt="arrow" src={isWhite ? arrowDownWhite : arrowDown} style={{ alignSelf: 'baseline' }} />
      }
    >
      <CustomSelect.Option
        value="es"
        customLabel="ESP"
        style={{ ...optionProps }}
      >
        Español
      </CustomSelect.Option>
      <CustomSelect.Option
        value="en"
        customLabel="ENG"
        style={{ ...optionProps }}
      >
        Inglés
      </CustomSelect.Option>
    </CustomSelect>
  );
};

SelectLanguage.propTypes = {
  backgroundColor: PropTypes.string, 
  isWhite: PropTypes.bool, 
  color: PropTypes.string,
};