import React from "react";
import PropTypes from "prop-types";
import { Div, Text } from "../../styles/Common";
import { theme } from "../../styles/theme";
import { CloseIcon } from "../../assets/icons";
import { CustomDrawer } from "./styles";

const Drawer = ({ children, padding, title, width, ...rest }) => {
  return (
    <CustomDrawer 
      closeIcon={<CloseIcon fill={theme.colors.gray200} style={{ position: 'absolute', right: "15px", top: "16px" }} />} 
      width={width || "450px"}
      padding={padding}
      {...rest}
    >
      <Div direction={"column"} width="100%" height="100%">
        <Text color={theme.colors.blue} size={theme.fonts.size.h5} weight={theme.fonts.weight.medium}>
          {title}
        </Text>
        {children}
      </Div>
    </CustomDrawer>
  );
};

Drawer.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  padding: PropTypes.string, 
  title: PropTypes.string
};

export default Drawer;
