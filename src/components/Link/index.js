import React from "react";
import PropTypes from "prop-types";

import { CustomLink } from "./styles";

export const Link = ({
  children,
  color,
  backgroundhover,
  onClick,
  size,
  weight,
  ...rest
}) => {
  return (
    <CustomLink
      type="link"
      backgroundhover={backgroundhover}
      color={color}
      onClick={onClick}
      size={size}
      weight={weight}
      {...rest}
    >
      {children}
    </CustomLink>
  );
};

Link.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  onClick: PropTypes.func,
  weight: PropTypes.string,
  height: PropTypes.string,
  radius: PropTypes.string,
  backgroundhover: PropTypes.string,
  size: PropTypes.string
};