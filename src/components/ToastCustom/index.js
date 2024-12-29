import React from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { CustomStyle } from "./styles";
import { Text } from "../../styles/Common";
import { theme } from "../../styles/theme";
import { Button } from "../Button";
import { Link } from "../Link";
import { CloseIcon } from "../../assets/icons";

export const ToastCustom = ({ message, color, background, onClick }) => {
  return (
    <CustomStyle background={background}>
      <Text
        color={color || theme.colors.default}
        size={theme.fonts.size.sm}
        style={{ width: "774px" }}
      >
        {message}
      </Text>
      <Button
        width="213px"
        height="45px"
        background={theme.colors.notification.background}
        color={theme.colors.notification.text}
        border={theme.colors.notification.text}
        weight={theme.fonts.weight.regular}
        onClick={onClick}
      >
        Completar información
      </Button>
      <Link
        height="100%"
        onClick={() => toast.remove()}
        icon={<CloseIcon fill={theme.colors.notification.text} />}
      />
    </CustomStyle>
  );
};

ToastCustom.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
  onClick: PropTypes.func,
};
