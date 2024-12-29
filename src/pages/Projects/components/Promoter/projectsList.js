import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import useGetProjects from "../../hooks/useGetProjects";
import { Div } from "../../../../styles/Common";
import { EmptyProject } from "./emptyProject";
import { ProjectsTabsView } from "./projectsTabsView";
import { theme } from "../../../../styles/theme";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import search from "../../../../assets/icons/Search.svg";
import { useTranslation } from "react-i18next";

export const ProjectsList = () => {
  const { t } = useTranslation(["projectsTabsView", "projects", "common"]);
  const [activeKey, setActiveKey] = useState("1");
  const [projectsData, setProjectsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal2, setShowModal2] = useState(false);
  const [showModalLoad, setShowModalLoad] = useState(false);
  const [initialHasProjects, setInitialHasProjects] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [totalProjects, setTotalProjects] = useState({
    totalCreated: 0,
    totalDrafted: 0,
    totalIdentified: 0,
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [fetchAction, setFetchAction] = useState(false);
  const [filterValues, setFilterValues] = useState({
    type: {
      solar: false,
      eolico: false,
    },
    instance: {
      sale: false,
      financing: false,
    },
  });
  const [confirmedFilterValues, setConfirmedFilterValues] =
    useState(filterValues);

  const currentPage = 0;
  const [pageSize, setPageSize] = useState(5);
  const [payload, setPayload] = useState({
    limit: pageSize,
    offset: currentPage,
  });

  const getProjects = useGetProjects(payload);
  const { data: dataProjects, isLoading, isSuccess } = getProjects;

  useEffect(() => {
    if (isSuccess) {
      const totalCreated = dataProjects?.data.data.items.length;
      const projects =
        totalCreated !== 0;
      setProjectsData(dataProjects?.data.data.items);
      if (!projectsData.length && !initialHasProjects) {
        setInitialHasProjects(projects);
      }
      setTotalProjects({
        totalCreated: totalCreated
      });
      setInitialLoading(false);
      setForceUpdate(!forceUpdate);
    }
  }, [isSuccess, dataProjects]);

  useEffect(() => {
    setPayload({
      ...payload,
      limit: pageSize,
      offset: currentPage,
      name: searchTerm,
    });
    setForceUpdate(!forceUpdate);
  }, [activeKey, pageSize, currentPage]);

  const handleShowModal2 = () => setShowModal2(true);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleReFetch = () => {
    setPageSize(5);
    setFetchAction(!fetchAction);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleReFetch();
      setIsSearch(!isSearch);
    }
  };

  const handleShowModalUploadProject = () => {
    handleCloseModalValidationLoadProjects();
    setShowModal2(true);
  };

  return (
    <>
      <Div
        p={"31px 69px 0px 32px"}
        style={{ flexDirection: "column", width: "100%" }}
      >
        <Div style={{ flexDirection: "column", width: "100%" }}>
          <Div
            gap="16px"
            m="0 0 39px 0"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              boxSizing: "border-box",
            }}
          >
            <Input
              sizeLabel={theme.fonts.size.xs}
              suffix={
                <img
                  alt="search"
                  src={search}
                  onClick={handleReFetch}
                  style={{ cursor: "pointer" }}
                />
              }
              width={"323px"}
              placeholder={`${t("common:search")}...`}
              style={{ borderRadius: "23px", marginTop: "-10px" }}
              mt={"-8px"}
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            {activeKey === "3" && totalProjects.totalIdentified === 0 && (
              <Button
                variant={"outlined"}
                width={"273px"}
                onClick={() => setShowModalLoad(true)}
              >
                {t("projects:empty.loadProjectText")}
              </Button>
            )}
            {initialHasProjects > 0 && (
              <>
                <Button width={"153px"} onClick={handleShowModal2}>
                  {t("newProject")}
                </Button>
              </>
            )}
          </Div>
        </Div>

        {initialLoading ? (
          <Div width="100%" height="100%" justify="center" align="center">
            <ReactLoading color={theme.colors.green} />
          </Div>
        ) : !initialHasProjects ? (
          <EmptyProject height="70vh" />
        ) : (
          <ProjectsTabsView
            projects={projectsData}
            totalProjects={totalProjects}
            payload={payload}
            setPayload={setPayload}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            setProjectsData={setProjectsData}
            setPageSize={setPageSize}
            pageSize={pageSize}
            isLoading={isLoading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleReFetch={handleReFetch}
            isSearch={isSearch}
            setIsSearch={setIsSearch}
          />
        )}
        {showModal2 && (
          <ModalValidationLoadProjects
            showModal={showModalValidationLoadProjects}
            handleCloseModal={handleCloseModalValidationLoadProjects}
            handleShowModalUploadProject={handleShowModalUploadProject}
          />
        )}
      </Div>
    </>
  );
};
