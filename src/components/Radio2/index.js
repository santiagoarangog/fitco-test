import React from "react";
import PropTypes from "prop-types";

import RadioGroup from "./Group";
import { Text } from "../../styles/Common";
import { theme } from "../../styles/theme";

import { AntRadio } from "./styles";
export const Radio = ({
  value,
  label,
  helper,
  error,
  disabled,
  onChange,
  ...rest
}) => {
  return (
    <div>
      <AntRadio
        value={value}
        error={error ? 1 : 0}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      >
        {label}
      </AntRadio>
      {helper && (
        <Text
          size={theme.fonts.size.xs}
          color={theme.colors.red}
          m="2px 20px 0 20px"
        >
          {helper}
        </Text>
      )}
    </div>
  );
};

Radio.Group = RadioGroup;

Radio.propTypes = {
  value: PropTypes.string | PropTypes.number | PropTypes.bool,
  label: PropTypes.string,
  helper: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};