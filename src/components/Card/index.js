import React from "react";
import PropTypes from "prop-types";
import { CustomCard } from "./styles";

export const Card = ({ children, width, height, padding, justify, align, shadow, ...rest }) => {
  return (
    <CustomCard
      width={width}
      height={height}
      padding={padding}
      justify={justify}
      align={align}
      shadow={shadow}
      {...rest}
    >
      {children}
    </CustomCard>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  shadow: PropTypes.string
};