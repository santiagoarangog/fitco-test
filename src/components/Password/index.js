import React from "react";
import PropTypes from "prop-types";
import { Text } from "../../styles/Common";
import { theme } from "../../styles/theme";
import { passwordLength } from "../../utilities/helpers";

import { CustomInputPassword } from "./styles";

export const Password = ({
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
  ...rest
}) => {
  return (
    <div style={{ width }}>
      <Text
        weight={weightLabel}
        size={sizeLabel || theme.fonts.size.sm}
        color={colorLabel || theme.colors.gray200}
        mt="2px"
        mb="8px"
        align="left"
      >
        {label}
      </Text>
      <CustomInputPassword
        placeholder={placeholder}
        suffix={suffix}
        status={error ? "error" : ""}
        disabled={disabled}
        onChange={onChange}
        onPressEnter={onPressEnter}
        maxLength={passwordLength}
        autoComplete="off"
        {...rest}
      />
      {helper && (
        <Text size={theme.fonts.size.xs} color={theme.colors.red} mt="2px">
          {helper}
        </Text>
      )}
    </div>
  );
};

Password.propTypes = {
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
};