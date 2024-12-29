import React from "react";
import PropTypes from "prop-types";

import { Wrapper } from "./styles";

export const ModalBody = ({
  margin,
  padding,
  maxHeight,
  align,
  children,
  ...rest
}) => {
  return (
    <Wrapper
      margin={margin}
      padding={padding}
      maxHeight={maxHeight}
      aling={align}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

ModalBody.propTypes = {
  children: PropTypes.node,
  margin: PropTypes.string,
  padding: PropTypes.string,
  maxHeight: PropTypes.string,
  align: PropTypes.string,
};