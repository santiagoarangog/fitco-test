import React from "react";
import PropTypes from "prop-types";

import { WrapperButton } from "./styles";

export const IconButton = ({
  onClick,
  icon,
  width,
  height,
  background,
  rotate,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  return (
    <WrapperButton
      onClick={handleClick}
      width={width}
      height={height}
      background={background}
      rotate={rotate}
      disabled={disabled}
    >
      <img alt="icon" src={icon} />
    </WrapperButton>
  );
};

IconButton.propTypes = {
  width: PropTypes.string,
  background: PropTypes.string,
  onClick: PropTypes.func,
  height: PropTypes.string,
  icon: PropTypes.string,
  rotate: PropTypes.bool,
  disabled: PropTypes.bool,
};
