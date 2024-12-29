import React from "react";
import PropTypes from "prop-types";

import { Wrapper } from "./styled";

const CheckboxGroup = ({
  gap,
  direction,
  helper,
  error,
  asPills,
  children,
  ...rest
}) => {
  return (
    <>
      <Wrapper 
        gap={gap} 
        direction={direction} 
        asPills={asPills} 
        helper={helper}
        error={error}
        {...rest}
      >
        {children}
      </Wrapper>
    </>
  );
};

CheckboxGroup.defaultProps = {
  gap: 8,
  asPills: false,
};

CheckboxGroup.propTypes = {
  gap: PropTypes.number,
  direction: PropTypes.oneOf(["row", "column"]),
  helper: PropTypes.string,
  error: PropTypes.bool,
  asPills: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default CheckboxGroup;
