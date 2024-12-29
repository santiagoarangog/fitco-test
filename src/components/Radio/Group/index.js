import React from "react";
import PropTypes from "prop-types";
import { Radio } from "antd";
import { Div, Text } from "../../../styles/Common";
import { theme } from "../../../styles/theme";

const RadioGroup = ({
  name,
  value,
  gap,
  direction,
  disabled,
  helper,
  error,
  onChange,
  children,
  ...rest
}) => {
  return (
    <>
      <Radio.Group
        name={name}
        defaultValue={value}
        disabled={disabled}
        onChange={onChange}
        error={error}
        {...rest}
      >
        <Div gap={gap} direction={direction}>
          {children}
        </Div>
      </Radio.Group>
      {helper && (
        <Text
          size={theme.fonts.size.xs}
          color={theme.colors.red}
          m='2px 20px 0 20px'
        >
          {helper}
        </Text>
      )}
    </>
  );
};

RadioGroup.defaultProps = {
  name: "default",
  gap: 8,
  direction: "row",
  disabled: false,
  error: false,
};

RadioGroup.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string | PropTypes.number,
  gap: PropTypes.string,
  direction: PropTypes.string,
  disabled: PropTypes.bool,
  helper: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default RadioGroup;
