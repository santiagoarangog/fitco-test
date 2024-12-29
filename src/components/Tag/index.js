import React from "react";
import PropTypes from "prop-types";

import { CustomTag } from "./styles";

export const Tag = ({
  children,
  background,
  bordered,
  closable,
  closeIcon,
  color,
  icon,
  onClose,
  weight,
  width,
  ...rest
}) => {
  return (
    <CustomTag
      background={background}
      bordered={bordered}
      closable={closable}
      closeIcon={closeIcon}
      color={color}
      icon={icon}
      onClose={onClose}
      weight={weight}
      width={width}
      {...rest}
    >
      {children}
    </CustomTag>
  );
};

Tag.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
  bordered: PropTypes.bool,
  closable: PropTypes.bool,
  closeIcon: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  onClose: PropTypes.func,
  weight: PropTypes.string,
  width: PropTypes.string,
};