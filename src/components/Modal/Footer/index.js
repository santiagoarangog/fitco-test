import React from "react";
import PropTypes from "prop-types";
import { Div } from "../../../styles/Common";

export const ModalFooter = ({ children, ...rest }) => {
  return <Div {...rest}>{children}</Div>;
};

ModalFooter.propTypes = {
  children: PropTypes.node,
};