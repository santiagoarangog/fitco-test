import React from "react";
import PropTypes from "prop-types";
import { theme } from "../../styles/theme";
import { Text } from "../../styles/Common";

import { AntDatePicker } from "./styles";

const DateRangePicker = ({
  helper,
  error,
  width,
  label,
  sizeLabel,
  weightLabel,
  colorLabel,
  helperColor,
  helperSize,
  ...rest
}) => (
  <div style={{ width }}>
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
    <AntDatePicker error={error ? 1 : 0} {...rest} />
    {helper && (
      <Text
        size={helperSize || theme.fonts.size.xs}
        color={helperColor || theme.colors.red}
        mt="2px"
      >
        {helper}
      </Text>
    )}
  </div>
);

DateRangePicker.propTypes = {
  helper: PropTypes.string,
  error: PropTypes.bool,
  width: PropTypes.string,
  label: PropTypes.string,
  sizeLabel: PropTypes.string,
  weightLabel: PropTypes.string,
  colorLabel: PropTypes.string,
  helperColor: PropTypes.string,
  helperSize: PropTypes.string,
};

export default DateRangePicker;
