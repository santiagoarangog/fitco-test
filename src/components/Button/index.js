import React from "react";
import PropTypes from "prop-types";

import { CustomButton } from "./styles";
import { theme } from "../../styles/theme";

export const Button = ({
  children,
  width,
  background,
  color,
  border,
  onClick,
  weight,
  height,
  radius,
  hBackground,
  disabled,
  variant,
  ...rest
}) => {
  return (
    variant === "outlined" ? (
      <CustomButton
        width={width}
        background={theme.colors.transparent}
        color={theme.colors.green}
        border={theme.colors.green}
        onClick={onClick}
        weight={weight}
        height={height}
        radius={radius}
        hBackground={theme.colors.transparent}
        disabled={disabled}
        {...rest}
      >
        {children}
      </CustomButton>
    ) : (
      <CustomButton
        width={width}
        background={background}
        color={color}
        border={border}
        onClick={onClick}
        weight={weight}
        height={height}
        radius={radius}
        hBackground={hBackground || theme.colors.green}
        disabled={disabled}
        {...rest}
      >
        {children}
      </CustomButton>
    )
  );
};

Button.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  onClick: PropTypes.func,
  weight: PropTypes.string,
  height: PropTypes.string,
  radius: PropTypes.string,
  hBackground: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
};