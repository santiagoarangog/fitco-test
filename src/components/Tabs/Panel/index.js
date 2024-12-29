import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const TabsPanel = ({ tab, disabled, children, ...rest }) => {
  return (
    <TabPane tab={tab} disabled={disabled} {...rest}>
      {children}
    </TabPane>
  )
}

TabsPanel.propTypes = {
  tab: PropTypes.any,
  disabled: PropTypes.any,
  children: PropTypes.any,
}

export default TabsPanel
