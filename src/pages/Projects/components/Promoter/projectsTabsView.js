import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "../../../../components/Tabs";
import { ProjectsTable } from "./projectsTable";
import { Div } from "../../../../styles/Common";
import { useTranslation } from "react-i18next";

export const ProjectsTabsView = ({
  projects,
  totalProjects,
  payload,
  setPayload,
  activeKey,
  setActiveKey,
  setProjectsData,
  setPageSize,
  pageSize,
  isLoading,
  setSearchTerm,
  handleReFetch,
  isSearch,
  setIsSearch
}) => {
  const { t } = useTranslation("projectsTabsView");
  const [forceUpdate, setForceUpdate] = useState(false);

  const tabs = (tab) => {
    switch (tab) {
      case "1":
        return "created";
      default:
        break;
    }
  };

  const handleTabChange = (key) => {
    setActiveKey(key);
    setProjectsData([]);
    setPayload({
      ...payload,
      selectedTab: tabs(key),
    });
    setForceUpdate(!forceUpdate);
  };

  const panels = [
    {
      tab: `${t("projectsCreated")} (${totalProjects.totalCreated})`,
      key: "1",
      type: "created",
      disabled: false,
    }
  ];

  return (
    <Div style={{ flexDirection: "column", width: "100%" }}>
      <Tabs
        defaultActiveKey="1"
        onChange={handleTabChange}
        activeKey={activeKey}
      >
        {panels.map((panel) => (
          <Tabs.Panel tab={panel.tab} key={panel.key} disabled={panel.disabled}>
            <ProjectsTable 
              projects={projects} 
              activeKey={activeKey} 
              payload={payload}
              setPageSize={setPageSize}
              pageSize={pageSize}
              isLoading={isLoading}
              totalProjects={totalProjects}
              setSearchTerm={setSearchTerm}
              handleReFetch={handleReFetch}
              isSearch={isSearch}
              setIsSearch={setIsSearch}
            />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Div>
  );
};

ProjectsTabsView.propTypes = {
  projects: PropTypes.array,
  totalProjects: PropTypes.number,
  payload: PropTypes.object,
  setPayload: PropTypes.func,
  activeKey: PropTypes.string,
  setActiveKey: PropTypes.func,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  setProjectsData: PropTypes.func,
  setPageSize: PropTypes.func,
  pageSize: PropTypes.number,
  isLoading: PropTypes.bool,
  handleReFetch: PropTypes.func,
  isSearch: PropTypes.bool,
  setIsSearch: PropTypes.func
};
