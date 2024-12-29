import React from "react";
import PropTypes from "prop-types";
import { AntTabs } from "./styled";
import TabsPanel from "./Panel";

const Tabs = ({
  defaultActiveKey,
  position,
  centered,
  size,
  type,
  gutter,
  activeKey,
  onChange,
  children,
  color,
}) => {
  return (
    <AntTabs
      defaultActiveKey={defaultActiveKey}
      activeKey={activeKey}
      tabPosition={position}
      centered={centered}
      size={size}
      type={type}
      tabBarGutter={gutter}
      onChange={onChange}
      color={color}
    >
      {children}
    </AntTabs>
  );
};

Tabs.defaultProps = {
  defaultTab: "1",
  position: "top",
  centered: false,
  size: "default",
  type: "line",
};

Tabs.propTypes = {
  defaultActiveKey: PropTypes.string,
  defaultTab: PropTypes.string,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  centered: PropTypes.bool,
  size: PropTypes.oneOf(["default", "small", "large"]),
  type: PropTypes.oneOf(["line", "card"]),
  gutter: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.node,
  activeKey: PropTypes.string,
  color: PropTypes.string,
};

Tabs.Panel = TabsPanel;

export default Tabs;
