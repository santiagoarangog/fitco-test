import React from "react";
import PropTypes from "prop-types";
import { Text } from "../../../styles/Common";
import { theme } from "../../../styles/theme";

import { Wrapper, WrapperIcon } from "./styles";

export const ModalHeader = ({
  icon,
  title,
  subtitle,
  align,
  margin,
  padding,
  hasBorder,
  iconWidth,
  iconHeight,
  iconBackground,
  iconBorderColor,
  sizeTitle,
  colorTitle,
  weightTitle,
  ...rest
}) => {
  return (
    <Wrapper
      align={align}
      margin={margin}
      padding={padding}
      hasBorder={hasBorder}
      {...rest}
    >
      {icon && typeof icon === "string" && (
        <WrapperIcon
          iconBorderColor={iconBorderColor}
          style={{ background: iconBackground }}
        >
          <img alt="icon" src={icon} width={iconWidth} height={iconHeight} />
        </WrapperIcon>
      )}
      {icon && typeof icon !== "string" && (
        <WrapperIcon
          iconBorderColor={iconBorderColor}
          style={{ background: iconBackground }}
        >
          {icon}
        </WrapperIcon>
      )}
      {title && (
        <Text
          size={sizeTitle || theme.fonts.size.h4}
          color={colorTitle || theme.colors.blue}
          weight={weightTitle || theme.fonts.weight.medium}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text size={theme.fonts.size.xs} color={theme.colors.blue}>
          {subtitle}
        </Text>
      )}
    </Wrapper>
  );
};

ModalHeader.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  align: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  hasBorder: PropTypes.bool,
  iconWidth: PropTypes.string,
  iconHeight: PropTypes.string,
  iconBackground: PropTypes.string,
  iconBorderColor: PropTypes.string,
  sizeTitle: PropTypes.string,
  colorTitle: PropTypes.string,
  weightTitle: PropTypes.string,
};