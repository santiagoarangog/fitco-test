import React from "react";
import PropTypes from "prop-types";

import { AntCheckbox } from "./styled";

// Import subcomponents
import CheckboxGroup from "./Group";

const Checkbox = ({
  label,
  helper,
  error,
  disabled,
  onChange,
  colorLabel,
  ...rest
}) => {
  return (
    <>
      <AntCheckbox
        error={error ? 1 : 0}
        disabled={disabled}
        onChange={onChange}
        colorLabel={colorLabel}
        helper={helper}
        {...rest}
      >
        {label}
      </AntCheckbox>
    </>
  );
};

Checkbox.defaultProps = {
  error: false,
  disabled: false,
};

Checkbox.propTypes = {
  label: PropTypes.any,
  helper: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  colorLabel: PropTypes.string,
};

// Set subcomponents
Checkbox.Group = CheckboxGroup;

export default Checkbox;
