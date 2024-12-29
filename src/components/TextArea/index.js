import React from "react";
import PropTypes from "prop-types";
import { Text } from "../../styles/Common";
import { theme } from "../../styles/theme";

import { CustomTextArea } from "./styles";

export const TextArea = ({
  placeholder,
  suffix,
  helper,
  error,
  disabled,
  onChange,
  onPressEnter,
  width,
  label,
  sizeLabel,
  weightLabel,
  colorLabel,
  autoComplete,
  helperColor,
  background,
  mt,
  helperSize,
  ...rest
}) => {
  return (
    <div style={{ width }}>
      <Text
        weight={weightLabel}
        size={sizeLabel || theme.fonts.size.sm}
        color={error ? theme.colors.red : colorLabel || theme.colors.gray200}
        mt={mt}
        mb="8px"
        align="left"
      >
        {label}
      </Text>
      <CustomTextArea
        placeholder={placeholder}
        suffix={suffix}
        status={error ? "error" : ""}
        disabled={disabled}
        onChange={onChange}
        onPressEnter={onPressEnter}
        autoComplete={autoComplete}
        background={background}
        {...rest}
      />
      {helper && (
        <Text
          align="left"
          size={helperSize || theme.fonts.size.xs}
          color={helperColor || theme.colors.red}
          mt="2px"
        >
          {helper}
        </Text>
      )}
    </div>
  );
};

TextArea.propTypes = {
  placeholder: PropTypes.string,
  suffix: PropTypes.string,
  helper: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  width: PropTypes.string,
  label: PropTypes.string,
  sizeLabel: PropTypes.string,
  weightLabel: PropTypes.string,
  colorLabel: PropTypes.string,
  autoComplete: PropTypes.string,
  helperColor: PropTypes.string,
  background: PropTypes.string,
  mt: PropTypes.string,
  helperSize: PropTypes.string,
};
