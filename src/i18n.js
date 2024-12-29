import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonEN from "./locales/en/common.json";
import commonES from "./locales/es/common.json";
import loginEN from "./locales/en/login.json";
import loginES from "./locales/es/login.json";
import resgisterEN from "./locales/en/register.json";
import resgisterES from "./locales/es/register.json";
import resetPassReqEN from "./locales/en/resetPassReq.json";
import resetPassReqES from "./locales/es/resetPassReq.json";
import myAccountEN from "./locales/en/myAccount.json";
import myAccountES from "./locales/es/myAccount.json";
import resetPasswordEN from "./locales/en/resetPassword.json";
import resetPasswordES from "./locales/es/resetPassword.json";
import projectsEN from "./locales/en/projects.json";
import projectsES from "./locales/es/projects.json";
import newProjectEN from "./locales/en/newProject.json";
import newProjectES from "./locales/es/newProject.json";
import projectDetailES from "./locales/es/projectDetail.json";
import projectDetailEN from "./locales/en/projectDetail.json";

import ProjectsTableManagerES from "./locales/es/projectTableManager.json";
import ProjectsTableManagerEN from "./locales/en/projectTableManager.json";

import projectTableES from "./locales/es/projectTable.json";
import ProjectsTableEN from "./locales/en/projectTable.json";

import projectsTabsViewES from "./locales/es/projectsTabsView.json";
import projectsTabsViewEN from "./locales/en/projectsTabsView.json";

import usersEN from "./locales/en/users.json";
import usersES from "./locales/es/users.json";

const lng = localStorage.getItem("lng") || "es";

const resources = {
  en: {
    common: commonEN,
    login: loginEN,
    register: resgisterEN,
    resetPassReq: resetPassReqEN,
    myAccount: myAccountEN,
    resetPassword: resetPasswordEN,
    projects: projectsEN,
    newProject: newProjectEN,
    projectDetail: projectDetailEN,
    projectTable: ProjectsTableEN,
    projectTableManager: ProjectsTableManagerEN,
    projectsTabsView: projectsTabsViewEN,
    users: usersEN,
  },
  es: {
    common: commonES,
    login: loginES,
    register: resgisterES,
    resetPassReq: resetPassReqES,
    myAccount: myAccountES,
    resetPassword: resetPasswordES,
    projects: projectsES,
    newProject: newProjectES,
    projectDetail: projectDetailES,
    projectTable: projectTableES,
    projectTableManager: ProjectsTableManagerES,
    projectsTabsView: projectsTabsViewES,
    users: usersES,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: lng,
  fallbackLng: lng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
