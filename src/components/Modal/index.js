import React from "react";
import PropTypes from "prop-types";

import { ModalHeader } from "./Header";
import { ModalBody } from "./Body";
import { ModalFooter } from "./Footer";

import { CustomModal } from "./styles";

export const Modal = ({
  children,
  open,
  onCancel,
  padding,
  align,
  width,
  radius,
  ...rest
}) => {
  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      padding={padding}
      align={align}
      width={width}
      radius={radius}
      footer={[]}
      {...rest}
    >
      {children}
    </CustomModal>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

Modal.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  radius: PropTypes.string,
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  padding: PropTypes.string,
  align: PropTypes.string,
};