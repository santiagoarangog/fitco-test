import React from "react";
import { useDispatch } from "react-redux";
import { ModuleContainer } from "../../styles/Common";
import { ProjectsList } from "./components/Promoter/projectsList";
import { getUserInfo } from "../../utilities/helpers";

export const Projects = () => {
  const dispatch = useDispatch();
  const { role } = getUserInfo();

  const pageContent = (userRole) => {
    switch (userRole) {
      case "USER":
        return (
          <ModuleContainer padding={"0px"}>
            <ProjectsList />
          </ModuleContainer>
        );
      default:
        return (
          <ModuleContainer
            direction="column"
            padding={"29px 69px 30px 32px"}
          ></ModuleContainer>
        );
    }
  };

  return pageContent(role);
};
