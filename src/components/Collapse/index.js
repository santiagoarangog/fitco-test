import React from "react";
import PropTypes from "prop-types";
import { Divider } from "antd";
import arrowUp from "../../assets/icons/arrow-up-dark.svg";
import arrowDown from "../../assets/icons/arrow-down-dark.svg";
import { theme } from "../../styles/theme";

import { CustomCollapse } from "./styles";

const { Panel } = CustomCollapse;

export const Collapse = ({
  panels,
  width,
  group,
  background,
  activeKey,
  handlePanelChange,
  headerHeight,
  fontSize,
  fontWeight,
  fontColor,
  customIcon,
  radius,
  marginBottom,
}) => {
  return (
    <CustomCollapse
      accordion
      activeKey={activeKey}
      onChange={handlePanelChange}
      expandIcon={({ isActive }) =>
        customIcon ? (
          customIcon
        ) : isActive ? (
          <img alt="arrow-up" src={arrowUp} />
        ) : (
          <img alt="arrow-down" src={arrowDown} />
        )
      }
      expandIconPosition={"end"}
      style={{
        background: background ? background : theme.colors.white,
        border: "none",
        width: width,
        borderRadius: radius ? radius : "15px",
      }}
      width={width}
      group={group}
      headerHeight={headerHeight}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontColor={fontColor}
    >
      {panels.map((ele, indx) => (
        <Panel
          id={indx}
          key={ele.key}
          header={ele.header}
          extra={ele.extra}
          collapsible={ele.collapsible}
          style={{
            marginBottom: marginBottom || "24px",
            padding: "10px 0px",
            background: theme.colors.white,
            border: `1px solid ${theme.colors.white}`,
            borderBottom:
              ele.key !== activeKey[0]
                ? `1px solid ${theme.colors.gray100}`
                : "none",
          }}
        >
          <Divider
            style={{ margin: "0px", background: theme.colors.gray100 }}
          />
          {ele.panel}
        </Panel>
      ))}
    </CustomCollapse>
  );
};

Collapse.propTypes = {
  panels: PropTypes.array,
  width: PropTypes.string,
  group: PropTypes.bool,
  background: PropTypes.string,
  activeKey: PropTypes.string,
  handlePanelChange: PropTypes.func,
  headerHeight: PropTypes.string,
  fontColor: PropTypes.string,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.string,
  customIcon: PropTypes.any,
  radius: PropTypes.string,
  marginBottom: PropTypes.string,
};
