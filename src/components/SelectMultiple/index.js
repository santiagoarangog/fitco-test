import React from "react";
import PropTypes from "prop-types";

import { Text } from "../../styles/Common";
import { theme } from "../../styles/theme";
import { SearchIcon, ArrowDownIcon } from "../../assets/icons";

import { CustomSelect } from "./styles";

export const SelectMultiple = ({
  width,
  label,
  options,
  defaultValue,
  placeholder,
  helper,
  noborder,
  paddingx,
  islangselector,
  showSearch,
  notFoundContent,
  filterOption,
  optionFilterProp,
  optionLabelProp,
  error,
  disabled,
  onChange,
  onSearch,
  height,
  weightLabel,
  sizeLabel,
  allowClear,
  borderColor,
  colorLabel,
  suffixIcon,
  helperColor,
  arrowColor,
  ...rest
}) => {
  const handleFocusOnSearch = () => showSearch;
  const handleBlurOnSearch = () => showSearch;

  const iconToShow = showSearch ? (
    <SearchIcon />
  ) : (
    <ArrowDownIcon fill={arrowColor} />
  );

  return (
    <div style={{ width: width }}>
      {label !== "" && (
        <Text
          weight={weightLabel}
          size={sizeLabel || theme.fonts.size.sm}
          color={error ? theme.colors.red : colorLabel || theme.colors.gray200}
          mt="2px"
          mb="8px"
          align="left"
        >
          {label}
        </Text>
      )}
      <CustomSelect
        width={width}
        options={options}
        status={error ? "error" : ""}
        error={error}
        defaultValue={defaultValue}
        placeholder={placeholder}
        suffixIcon={suffixIcon || iconToShow}
        noborder={noborder}
        paddingx={paddingx}
        islangselector={islangselector ? 1 : 0}
        showSearch={showSearch}
        notFoundContent={notFoundContent}
        filterOption={filterOption}
        optionFilterProp={optionFilterProp}
        optionLabelProp={optionLabelProp}
        disabled={disabled ? 1 : 0}
        onChange={onChange}
        onSearch={onSearch}
        height={height}
        onFocus={handleFocusOnSearch}
        onBlur={handleBlurOnSearch}
        allowClear={allowClear}
        borderColor={borderColor}
        mode="multiple"
        {...rest}
      />
      {helper && (
        <Text
          size={theme.fonts.size.xs}
          color={helperColor || theme.colors.red}
          mt="2px"
        >
          {helper}
        </Text>
      )}
    </div>
  );
};

SelectMultiple.propTypes = {
  width: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  helper: PropTypes.string,
  noborder: PropTypes.bool,
  paddingx: PropTypes.string,
  islangselector: PropTypes.bool,
  showSearch: PropTypes.bool,
  notFoundContent: PropTypes.string,
  filterOption: PropTypes.func,
  optionFilterProp: PropTypes.func,
  optionLabelProp: PropTypes.func,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  height: PropTypes.string,
  weightLabel: PropTypes.string,
  sizeLabel: PropTypes.string,
  allowClear: PropTypes.string,
  borderColor: PropTypes.string,
  colorLabel: PropTypes.string,
  suffixIcon: PropTypes.string,
  helperColor: PropTypes.string,
  arrowColor: PropTypes.string,
};
