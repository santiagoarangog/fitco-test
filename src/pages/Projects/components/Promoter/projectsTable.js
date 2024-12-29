import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { Div, Text } from "../../../../styles/Common";
import { theme } from "../../../../styles/theme";
import Card from "../../../../components/CardDropdown";
// import DownloadWhite from '../../../../assets/icons/Download-white.svg';
// import Chat from '../../../../assets/icons/Chat.svg';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd";
import {
  downloadFile,
  getToken,
  projectStatusPromoter,
} from "../../../../utilities/helpers";
import { StatusLabel } from "../styles";
import { axiosClient } from "../../../../core/services/axiosInstance";
import { ProjectsCards } from "./projectsCards";
import { IdentifyProjectsCards } from "./identifyProjectsCard";
import { EmptyProject } from "./emptyProject";
import { CloseIcon } from "../../../../assets/icons";

export const ProjectsTable = ({ 
  projects, 
  activeKey, 
  payload,
  setPageSize,
  pageSize,
  isLoading,
  totalProjects,
  setSearchTerm,
  handleReFetch,
  isSearch,
  setIsSearch
}) => {
  const { t, i18n } = useTranslation(["projectTable", "projectsTabsView"]);
  const lang = i18n.language;
  const navigate = useNavigate();

  const handleUpload = (name, id) => {
    navigate(`/projects/documents?projectName=${name}&projectId=${id}`);
  };

  const handleProjectDetail = (projectId) => {
    navigate(`/projects/project-detail?projectId=${projectId}`);
  };

  const handleProjectEdit = (
    projectId,
    objective,
    projectType,
    financingType,
    projectName
  ) => {
    navigate(
      `/projects/edit-project?objective=${objective}&projectType=${projectType}&financingType=${financingType}&projectId=${projectId}&projectName=${projectName}`
    );
  };

  const formatName = (name) => {
    const trimmedName = name?.length > 20 ? name.substring(0, 20) : name;
    if (trimmedName) {
      return trimmedName.padEnd(20, "");
    } else {
      return trimmedName;
    }
  };

  // const panelInfo = [
  //     {
  //         label: 'invitations',
  //         value: 0,
  //     },
  //     {
  //         label: 'offers',
  //         value: 0,
  //     },
  //     {
  //         label: 'assignments',
  //         value: 0,
  //     },
  //     {
  //         label: 'advisorReports',
  //         value: 0,
  //     }
  // ];

  const typeLabel = (label) => {
    switch (label) {
      case "financing":
        return "Financiación";
      case "sale":
        return "Venta";
      default:
        break;
    }
  };
  const rtbDateLabel = (instance, kind) => {
    const labels = {
      financing: {
        construction: "estimatedRtBDate",
        financed: "startUp",
      },
      sale: {
        RtBCOD: "estimatedRtBDate",
        operation: "startUp",
      },
    };

    return labels[instance]?.[kind] ? t(labels[instance][kind]) : undefined;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return theme.colors.gray300;
      case 2:
        return theme.colors.blue;
      default:
        return theme.colors.gray300;
    }
  };

  const handleDownloadTeaser = (teaserId) => {
    downloadFile(
      `teaser/${teaserId}/pdf?lang=${lang}`,
      "Teaser",
      axiosClient,
      getToken()
    );
  };

  const handleDownloadTermsheet = (projectId) => {
    downloadFile(
      `documentation/download/${projectId}/6`,
      "Termsheet",
      axiosClient,
      getToken()
    );
  };

  const handleGoFinancialModel = (projectId, name) => {
    navigate(`/projects/financial-model/${projectId}?projectName=${name}`);
  };

  const currentTotal = (tabSelected) => {
    switch (tabSelected) {
      case "created":
        return totalProjects.totalCreated;
      case "drafted":
        return totalProjects.totalDrafted;
      case "identified":
        return totalProjects.totalIdentified;
      default:
        break;
    }
  };

  return (
    <Div direction="column">
      {isSearch && projects.length === 0 && (
        <Col width="100%" justify="center" align="center" m="24px 0">
          <Text color={theme.colors.gray500} size={theme.fonts.size.h6}>
            {t("projectsTabsView:nosearch")}
          </Text>
          <Row justify="center" align="center">
            <Text
              color={theme.colors.green}
              size={theme.fonts.size.h6}
              weight={theme.fonts.weight.medium}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSearchTerm("");
                handleReFetch();
                setIsSearch(false);
              }}
            >
              {t("projectsTabsView:cleanSearch")}
            </Text>
            <CloseIcon fill={theme.colors.green} />
          </Row>
        </Col>
      )}
      {isLoading ? (
        <Div width="100%" height="100%" justify="center" align="center">
          <ReactLoading color={theme.colors.green} />
        </Div>
      ) : (
        projects.length > 0 ? (
          <>
            {projects.map((project, index) => (
              <Card key={index} p="0px" m="1rem 0 0 0">
                {activeKey !== "2" && project.status && (
                  <Row style={{ textAlign: "-webkit-right", marginBottom: "1px" }}>
                    <Col md={24}>
                      <StatusLabel color={getStatusColor(project.status)}>
                        <Text
                          color={theme.colors.white}
                          size={theme.fonts.size.sm}
                          weight={theme.fonts.weight.medium}
                        >
                          {t(projectStatusPromoter[project.status])}
                        </Text>
                      </StatusLabel>
                    </Col>
                  </Row>
                )}
                {activeKey === "3" ? (
                  <IdentifyProjectsCards
                    project={project}
                    formatName={formatName}
                    typeLabel={typeLabel}
                    rtbDateLabel={rtbDateLabel}
                  />
                ) : (
                  <ProjectsCards
                    project={project}
                    formatName={formatName}
                    typeLabel={typeLabel}
                    rtbDateLabel={rtbDateLabel}
                    handleProjectEdit={handleProjectEdit}
                    handleProjectDetail={handleProjectDetail}
                    handleUpload={handleUpload}
                    handleDownloadTeaser={handleDownloadTeaser}
                    handleDownloadTermsheet={handleDownloadTermsheet}
                    handleGoFinancialModel={handleGoFinancialModel}
                    activeKey={activeKey}
                  />
                )}
              </Card>
            ))}
            {projects.length !== 0 && (
              <Div width="100%" justify="center" m="24px 0 40px 0">
                <Text
                  color={theme.colors.green}
                  size={theme.fonts.size.h6}
                  weight={theme.fonts.weight.medium}
                  style={{
                    cursor: payload.limit >= currentTotal(payload.selectedTab)
                      ? null
                      : "pointer",
                  }}
                  onClick={
                    payload.limit >= currentTotal(payload.selectedTab)
                      ? null
                      : () => setPageSize(pageSize + 5)
                  }
                >
                  {payload.limit >= currentTotal(payload.selectedTab)
                  ? t("projectsTabsView:noProjects")
                  : t("projectsTabsView:loadProjects")}
                </Text>
              </Div>
            )}
          </>
        ) : (
          !isSearch && <EmptyProject />
        )
      )}
    </Div>
  );
};

ProjectsTable.propTypes = {
  projects: PropTypes.array,
  activeKey: PropTypes.string,
  payload: PropTypes.object,
  setPageSize: PropTypes.func,
  pageSize: PropTypes.number,
  isLoading: PropTypes.bool,
  totalProjects: PropTypes.object,
  setSearchTerm: PropTypes.func,
  handleReFetch: PropTypes.func,
  isSearch: PropTypes.bool,
  setIsSearch: PropTypes.func
};
